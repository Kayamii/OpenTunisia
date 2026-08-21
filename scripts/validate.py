#!/usr/bin/env python3
"""Validate every dataset in data/.

Runs the checks this project has always applied by hand, so a pull request can be
reviewed on its merits instead of on whether the JSON is well formed.

    python scripts/validate.py

Exits 0 when everything passes, 1 otherwise. No dependencies beyond the standard
library.
"""

import json
import os
import re
import sys
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
SOURCES = os.path.join(ROOT, "sources")

# Tunisia's bounding box, with a small margin.
LAT_MIN, LAT_MAX = 30.0, 37.7
LON_MIN, LON_MAX = 7.4, 11.7

# Datasets whose osm_id points at a *different* dataset's record (a cross-reference,
# not the record's own identity), so it must not be treated as a duplicate.
XREF_FILES = {
    "services/schools-official.json",
    "services/health-facilities-official.json",
}

# Invisible characters that break text matching and are impossible to spot in an editor.
BIDI = re.compile(r"[​-‏‪-‮⁦-⁩﻿]")

errors = []
warnings = []
def err(msg):  errors.append(msg)
def warn(msg): warnings.append(msg)


def rel(path):
    return path.replace(os.sep, "/").replace(ROOT.replace(os.sep, "/") + "/", "")


def load(path):
    try:
        with open(path, encoding="utf-8") as fh:
            return json.load(fh)
    except json.JSONDecodeError as e:
        err(f"{rel(path)}: invalid JSON, {e}")
    except UnicodeDecodeError as e:
        err(f"{rel(path)}: not valid UTF-8, {e}")
    return None


def main():
    files = sorted(glob.glob(os.path.join(DATA, "*", "*.json")))
    if not files:
        err("no datasets found under data/")
        return report()

    # ---- the geography files everything else joins to -------------------------
    gov_path = os.path.join(DATA, "geography", "governorates.json")
    dlg_path = os.path.join(DATA, "geography", "delegations.json")
    govs = load(gov_path) or []
    dlgs = load(dlg_path) or []

    gov_codes = {g["code"] for g in govs if "code" in g}
    dlg_by_geo = {d["code_geo"]: d for d in dlgs if d.get("code_geo")}

    if len(gov_codes) != 24:
        err(f"geography/governorates.json: expected 24 governorates, found {len(gov_codes)}")

    total = 0
    own_ids = {}          # (osm_type, osm_id) -> file, for real duplicate detection
    per_file = []

    for path in files:
        name = rel(path).replace("data/", "")
        recs = load(path)
        if recs is None:
            continue
        if not isinstance(recs, list):
            err(f"{name}: top level must be a JSON array")
            continue

        total += len(recs)
        n_bad_gov = n_oob = n_contra = n_bidi = 0

        for i, r in enumerate(recs):
            if not isinstance(r, dict):
                err(f"{name}[{i}]: every record must be an object")
                continue

            # governorate must exist
            gc = r.get("governorate_code")
            if gc and gc not in gov_codes:
                n_bad_gov += 1

            # coordinates must be inside Tunisia
            if "lat" in r:
                try:
                    lat, lon = float(r["lat"]), float(r["lon"])
                    if not (LAT_MIN <= lat <= LAT_MAX and LON_MIN <= lon <= LON_MAX):
                        n_oob += 1
                except (TypeError, ValueError, KeyError):
                    err(f"{name}[{i}]: lat/lon present but not numeric")

            # a delegation must sit inside the governorate the record claims
            dg = r.get("delegation_code_geo")
            if dg and gc and dg in dlg_by_geo:
                if dlg_by_geo[dg].get("governorate_code") != gc:
                    n_contra += 1

            # invisible characters silently break name matching
            for v in r.values():
                if isinstance(v, str) and BIDI.search(v):
                    n_bidi += 1
                    break

            # collect ids to detect a record published twice
            if "osm_id" in r and name not in XREF_FILES:
                key = (r.get("osm_type"), r["osm_id"])
                own_ids.setdefault(key, []).append(name)

        if n_bad_gov: err(f"{name}: {n_bad_gov} record(s) reference an unknown governorate_code")
        if n_oob:     err(f"{name}: {n_oob} record(s) have coordinates outside Tunisia")
        if n_contra:  err(f"{name}: {n_contra} record(s) name a delegation from another governorate")
        if n_bidi:    err(f"{name}: {n_bidi} record(s) contain invisible bidi characters, strip them")

        # every dataset must document where it came from
        stem = os.path.splitext(os.path.basename(path))[0]
        if not os.path.exists(os.path.join(SOURCES, stem + ".md")):
            # a few datasets are covered by one shared source document
            shared = glob.glob(os.path.join(SOURCES, "*.md"))
            covered = any(stem in open(s, encoding="utf-8").read() for s in shared)
            if not covered:
                err(f"{name}: no matching file in sources/, every dataset needs its "
                    f"origin and licence documented (expected sources/{stem}.md)")

        per_file.append((name, len(recs)))

    # a genuine duplicate is the same OSM feature published in two datasets
    dupes = {k: v for k, v in own_ids.items() if len(v) > 1}
    for key, where in list(dupes.items())[:10]:
        err(f"duplicate record {key[0]}/{key[1]} appears in: {', '.join(sorted(set(where)))}")
    if len(dupes) > 10:
        err(f".. and {len(dupes) - 10} further duplicate record(s)")

    # ---- GeoJSON boundaries ---------------------------------------------------
    for path in sorted(glob.glob(os.path.join(DATA, "*", "*.geojson"))):
        name = rel(path).replace("data/", "")
        gj = load(path)
        if gj is None:
            continue
        if gj.get("type") != "FeatureCollection":
            err(f"{name}: expected a GeoJSON FeatureCollection")
            continue
        open_rings = 0
        for f in gj.get("features", []):
            g = f.get("geometry") or {}
            polys = ([g.get("coordinates", [])] if g.get("type") == "Polygon"
                     else g.get("coordinates", []))
            for poly in polys:
                for ring in poly:
                    if len(ring) < 4 or ring[0] != ring[-1]:
                        open_rings += 1
        if open_rings:
            err(f"{name}: {open_rings} ring(s) are unclosed or too short")
        per_file.append((name, len(gj.get("features", []))))

    print(f"{'dataset':52s} {'records':>8s}")
    print("-" * 62)
    for name, n in sorted(per_file, key=lambda x: -x[1]):
        print(f"{name:52s} {n:8,}")
    print("-" * 62)
    print(f"{'TOTAL':52s} {total:8,}")
    print()
    return report()


def report():
    for w in warnings:
        print(f"warning: {w}")
    if errors:
        print(f"\n{len(errors)} problem(s) found:\n")
        for e in errors:
            print(f"  ✗ {e}")
        print("\nSee CONTRIBUTING.md for what each check means.")
        return 1
    print("✓ all checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())

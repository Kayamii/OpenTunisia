# Contributing to OpenTunisia

Thanks for helping. Corrections to a single record are as welcome as a whole new
dataset. Both make the data more useful.

---

## Before anything else: where did the data come from?

This is the one rule the project will not bend on.

**Every dataset must document its origin and its licence.** Data that is publicly
visible on a website is *not* automatically reusable. Most websites reserve their
database rights, and publishing that data here would compromise the licensing of the
whole repository, not just one file.

If a source does not state a licence, treat it as **not reusable** and leave it out.

Sources known to be usable are listed in [`sources/README.md`](sources/README.md).
Sources that must not be scraped (Google Maps, TripAdvisor, Foursquare, commercial
directories) are listed there too, with the reasoning.

---

## How to contribute

You do not need write access. The normal flow is:

1. **Fork** this repository on GitHub.
2. **Create a branch:** `git checkout -b fix-sfax-pharmacies`
3. **Make your change** in `data/`, and document the source in `sources/`.
4. **Run the validator:** `python scripts/validate.py`
5. **Commit and push** to your fork.
6. **Open a pull request** against `main`.

The validator also runs automatically on your pull request. A green tick means the
mechanical checks passed and review can focus on whether the data is *right*.

---

## The rules the validator enforces

Run it locally before opening a PR. It needs only Python 3, with no dependencies:

```bash
python scripts/validate.py
```

| Check | Why |
|---|---|
| Valid UTF-8 JSON, top-level array | Arabic and French text is expected throughout |
| `governorate_code` exists in `governorates.json` | Keeps every record joinable |
| Coordinates fall inside Tunisia | Catches swapped lat/lon, a common import bug |
| A delegation belongs to the governorate claimed | Catches a name matched to the wrong region |
| No invisible bidi characters | They are present in OSM data, invisible in every editor, and silently break name matching |
| No duplicate OSM ids across datasets | The same place must not be published twice |
| Every dataset has a file in `sources/` | See above |
| GeoJSON rings are closed | Malformed polygons break the map |

---

## Data conventions

**Format.** JSON arrays of flat objects. UTF-8. Two-space indent.

**Naming.** Lowercase with hyphens, specific: `data/services/pharmacies-tunis.json`.

**Joining.** Every point-of-interest record carries `governorate_code` (e.g. `TN-11`)
and, where known, `delegation_code_geo`. That is what lets any file join to the
geography files without a database. Keep it.

**Absent means unknown.** Omit a field rather than storing `""` or `null`. A missing
`phone` means we do not know it, not that the place has none.

**Names.** Use `name` when the source gives one primary name. Use `name_ar` /
`name_fr` / `name_en` when it distinguishes them. If a source publishes Arabic only,
use `name_ar`. Do not transliterate and present a guess as fact.

**Prefer coordinates over names.** If a source has coordinates, assign the delegation
by point-in-polygon against
[`data/geography/delegation-boundaries.geojson`](data/geography/delegation-boundaries.geojson),
not by matching text. It is far more reliable.

**Do not merge official data with OpenStreetMap data.** They are kept as separate
files on purpose: different provenance, different strengths. Where a record has been
matched to its OSM counterpart, that is a *cross-reference* (`osm_type` / `osm_id`),
not a merge.

**Statistics do not belong here.** This repository is a directory of things that exist
and can be found. Counts, budgets and yearly time series go stale and bury the useful
records. Where a statistics publication happens to contain a list of named facilities,
take the names and leave the numbers.

---

## Documenting a source

Add a Markdown file in `sources/` named after your dataset
(`data/places/beaches.json` → `sources/beaches.md`):

```markdown
# Beaches

- **Dataset file:** data/places/beaches.json
- **Source:** <who published it>
- **URL:** <link>
- **License:** <name, or "unclear" / "permission granted by ...">
- **Retrieved:** <YYYY-MM-DD>
- **Method:** <API query, manual entry, official export…>

## Notes

<Coverage, known gaps, accuracy, what you cleaned, whether it needs re-checking.>
```

Be honest about the gaps. Every existing source file states its own limitations: sparse phone
numbers, missing coordinates, governorates that do not publish. That honesty is what
makes the data trustworthy.

---

## Fixing a single record

Perfectly welcome, and no source file needed if the dataset already has one. Say in
the PR how you know. "This pharmacy closed in 2024, I live on that street" is a
better justification than a silent edit.

---

## Improving the map

The viewer lives in [`viewer/`](viewer/). It is one HTML file, one icons file and
three generated JSON files. No framework, no build step.

```bash
cd viewer && python -m http.server 8000
```

After changing anything in `data/`, regenerate the map bundle:

```bash
python viewer/build.py
```

---

## Code of conduct

Be decent. Assume good faith, critique the data rather than the person, and keep
discussion in English, French or Arabic, whichever you prefer.

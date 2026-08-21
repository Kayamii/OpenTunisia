# Delegation boundaries (GeoJSON)

- **Dataset file:** data/geography/delegation-boundaries.geojson
- **Source:** OpenStreetMap (via the Overpass API)
- **License:** Open Database License (ODbL) v1.0 — attribution to
  **© OpenStreetMap contributors** and share-alike required
- **Retrieved:** 2026-08-21
- **Method:** Overpass query for `admin_level=5` boundary relations with inline geometry,
  then member ways stitched into closed rings.

## Query used

```overpassql
[out:json][timeout:900];
area["ISO3166-1"="TN"][admin_level=2]->.tn;
relation(area.tn)["boundary"="administrative"]["admin_level"="5"];
out geom;
```

`out geom` is essential — `out skel` returns ways without relation membership, so the
polygons cannot be reassembled.

## Contents

**All 266 delegations**, as a standard `FeatureCollection`:

- 258 `Polygon`, 8 `MultiPolygon` (delegations with islands or detached parts)
- **274,257 vertices**, ~5.4 MB
- Coordinates are `[longitude, latitude]` per the GeoJSON spec, 5 decimal places (~1 m)

Each feature's `properties` carry `name_fr`, `name_ar`, `code_geo`, `governorate_code`,
`governorate` and `osm_relation_id`, so features join to `delegations.json` and
`governorates.json`.

## Why this file exists

Every point-of-interest dataset in this repository was assigned to its delegation by
point-in-polygon testing against these exact polygons. Publishing them means anyone can
**reproduce or audit that assignment**, and do their own spatial work — clipping,
choropleths, "which delegation is this point in".

## Validation

- Valid JSON; 266 features; all rings closed; no ring with fewer than 4 points.
- No vertex falls outside Tunisia's bounding box.
- Every delegation in `delegations.json` has a boundary — none missing.
- **Round-trip test:** 60 randomly sampled points-of-interest were re-located using only
  this published file. All 60 reproduced the `delegation` already stored on the record.

## Caveats

- Boundaries are community-maintained in OSM and may differ slightly from official
  cartography. They are good enough for assigning points to a delegation, and should not
  be treated as a legal or cadastral boundary.
- Only outer rings were kept. Enclaves (holes) are not represented.
- Governorate-level boundaries are not published here; they can be derived by dissolving
  delegations on `governorate_code`.

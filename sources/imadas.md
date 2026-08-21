# Imadas / Sectors (عمادة)

- **Dataset file:** data/geography/imadas.json
- **Source:** OpenStreetMap (via the Overpass API)
- **URL:** https://overpass-api.de/api/interpreter — https://www.openstreetmap.org
- **License:** Open Database License (ODbL) v1.0
- **Retrieved:** 2026-08-21
- **Method:** Overpass query for `admin_level=6` administrative relations in Tunisia.

## Query used

```overpassql
[out:json][timeout:600];
area["ISO3166-1"="TN"][admin_level=2]->.tn;
(
  relation(area.tn)["boundary"="administrative"]["admin_level"="6"];
);
out tags center;
```

## What this is

The **imada** (عمادة, also called a *secteur*) is the third tier of Tunisian
administrative division, below the delegation:

```
Governorate (24)  →  Delegation (266)  →  Imada (2,084)
```

This completes the administrative hierarchy in the repository.

## Fields

| Field | Meaning |
|---|---|
| `code_geo` | Tunisian geographic code, 6 digits (first 4 = parent delegation) |
| `name` / `name_fr` / `name_ar` | Imada name |
| `delegation` / `delegation_code_geo` | Parent delegation, joins to `delegations.json` |
| `governorate_code` / `governorate` | Parent governorate, joins to `governorates.json` |
| `lat` / `lon` | Centroid |
| `wikidata`, `osm_relation_id` | Identifiers |

## Notes

- **2,084 records**, every one linked to a delegation and governorate — none dropped.
- 2,082 were linked via their `code_geo` prefix; 2 lacked the tag and were resolved by
  point-in-polygon against delegation boundaries.
- Note that OSM uses `admin_level=6` for imadas in Tunisia and `admin_level=5` for
  delegations — the reverse of what the level numbers might suggest. This was verified
  by inspecting record counts and code lengths before export.

## Caveats

- The official number of imadas is not perfectly stable across sources, and OSM's
  coverage is community-maintained. Reconciling against an official INS list is a
  worthwhile follow-up.
- Centroids are bounding-box centers, not the imada's main settlement.
- No boundary polygons, only centroids.

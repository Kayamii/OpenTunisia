# Cultural sites, museums and festivals

- **Dataset file:** data/places/cultural-sites.json
- **Source:** data.gov.tn / openculture.gov.tn — Ministry of Cultural Affairs and its
  regional commissariats
- **License:** per record, in the `license` field (`cc-by`, `other-open`, LNDPO-TN)
- **Retrieved:** 2026-08-21
- **Method:** Geolocated CSV/XLSX publications downloaded from the portals; only rows
  with usable coordinates were kept.

## Contents

**849 geolocated records across all 24 governorates:**

| `category` | Records | What it is |
|---|---:|---|
| `cultural_institution` | 585 | Libraries, cultural centres, regional commissariats |
| `festival` | 136 | Festivals, located at their venue |
| `museum_or_site` | 116 | National museums and archaeological sites |
| `culture_house` | 12 | Maisons de culture |

**Every record has coordinates**, and 846 of 849 were assigned to a delegation by
point-in-polygon against `delegation-boundaries.geojson`. 74 source rows without usable
coordinates were skipped rather than stored without location.

## Fields

`name`, `name_ar` (where the source gives both), `category`, `subcategory` (festival
type or historical period, where published), `governorate_code`, `governorate`,
`delegation`, `delegation_code_geo`, `lat`, `lon`, `address`, `address_ar`, `license`,
`source_dataset`.

## An important distinction: festivals are events, not places

The 136 `festival` records are **recurring events**, not permanent venues. Their
coordinates mark the **venue** where the festival is held (109 also carry a venue name in
`address`).

Treat them accordingly: the point tells you where a festival happens, not that there is
something to visit at that spot year-round. Dates and programmes are **not** included —
they change annually and would go stale.

## Caveats

- Some source files are per-year publications (e.g. "festivals d'été de Sousse
  2017–2020"). Records are deduplicated on category + name + position, so a festival
  running for several years is stored once. **No year field is carried**, because the
  entry describes the festival, not one edition of it.
- Coordinate columns were inconsistently labelled across sources (`Lattitude`,
  `latitude`, `X`/`Y`, and Arabic `خط العرض` / `خط الطول`). Latitude and longitude are
  validated against Tunisia's bounding box and swapped if the source had them reversed.
- Names are French where available, Arabic otherwise.
- Coverage depends on which regional commissariats published geolocated data.

## What was deliberately excluded

The same portals publish a large volume of **cultural statistics** — subscriber counts,
activity totals, festival subsidies, budgets. None of it is included. This repository is
a directory of things that exist and can be found, not a statistics archive.

## Relationship to `places/heritage-sites.json`

39 of the 116 `museum_or_site` records sit within 120 m of a record in
`heritage-sites.json` (the OpenStreetMap file) — they describe the same physical place.

**They are deliberately not merged.** As everywhere in this repository, official data and
OpenStreetMap data are kept as independent files: the official record is authoritative
about what the Ministry recognises; the OSM record may carry extra tags. If you need one
combined list, join them on proximity yourself and decide which source wins for your use.

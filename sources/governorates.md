# Governorates

- **Dataset file:** data/geography/governorates.json
- **Source:** OpenStreetMap (via the Overpass API)
- **URL:** https://overpass-api.de/api/interpreter, https://www.openstreetmap.org
- **License:** Open Database License (ODbL) v1.0, https://opendatacommons.org/licenses/odbl/
- **Retrieved:** 2026-08-20 (OSM base timestamp 2026-08-20T22:46:05Z)
- **Method:** Overpass API query for administrative relations at `admin_level=4`
  within Tunisia, exported with tags and centroid.

## Query used

```overpassql
[out:json][timeout:120];
area["ISO3166-1"="TN"][admin_level=2]->.tn;
relation(area.tn)["admin_level"="4"]["boundary"="administrative"];
out tags center;
```

## Attribution requirement

The ODbL requires attribution and share-alike. Any use of this dataset must credit
**© OpenStreetMap contributors** and, if the data is distributed in modified form,
share it under the same license.

## Fields

| Field | Meaning |
|---|---|
| `code` | ISO 3166-2:TN code (e.g. `TN-11`) |
| `code_geo` | Tunisian national geographic code (`ref:tn:codegeo`) |
| `name_en` / `name_fr` / `name_ar` | Governorate name in English, French, Arabic |
| `population` | Population count as tagged in OSM. **See caveat below** |
| `population_year` | Census year the population figure refers to |
| `lat` / `lon` | Centroid of the governorate boundary, 5 decimal places |
| `wikidata` | Wikidata entity ID |
| `osm_relation_id` | OSM relation ID, for tracing back to the source |

## Notes

- **24 records**, matching the official ISO 3166-2:TN set exactly (verified).
- The `"Gouvernorat "` and `"ولاية "` prefixes were stripped from the French and Arabic
  names so the field holds the bare name. The originals remain in OSM.
- Three English names were normalized from OSM's tagging: `Zaghouan Governorate` →
  `Zaghouan`, `Al Kaf` → `Kef`.
- Centroids come from the Overpass `center` output. They are a bounding-box center, not
  a population-weighted center or the capital city location. Do not treat them as the
  governorate seat.

## Caveat: population data is inconsistent

The population figures come from OSM tags and mix census years. Some are from the
**2004** census, some from **2014**, and the tagging is not uniform. `population_year`
records what each figure refers to, and it should always be read alongside the number.

**These are not current population figures.** Tunisia held a census in 2024; replacing
this column with official INS (Institut National de la Statistique) figures is a good
follow-up task. Until then, treat the population column as indicative only.

## Known gaps

- No boundary polygons, only centroids. Full geometry can be fetched from OSM later if
  needed (it is much larger and belongs in a separate GeoJSON file).
- No governorate capital / seat city.
- No area in km².

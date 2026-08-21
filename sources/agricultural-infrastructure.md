# Agricultural and water infrastructure

- **Dataset file:** data/places/agricultural-infrastructure.json
- **Source:** data.gov.tn / agridata.tn. GeoJSON published by regional agricultural
  commissions and ODESYPANO
- **License:** per record, in the `license` field, `cc-zero`, `cc-by`, or
  Licence Nationale de Données Publiques Ouvertes
- **Retrieved:** 2026-08-21
- **Method:** Every GeoJSON resource in the portal catalog was enumerated via the CKAN
  API, filtered to openly licensed ones, downloaded, and its Point features extracted.

## Contents

| `category` | Records | What it is |
|---|---:|---|
| `hill_lake` | 59 | Lacs collinaires, small water-retention lakes |
| `milk_collection_centre` | 26 | Centres de collecte de lait |
| `hill_dam` | 23 | Barrages collinaires |
| `rural_water_supply` | 9 | Rural drinking-water supply points |
| `grain_collection_centre` | 8 | Centres de collecte de céréales |
| `dam` | 5 | Barrages |
| **Total** | **130** | |

**All 130 records have real coordinates** from the source GeoJSON and were located to a
delegation by point-in-polygon. All 130 are named.

## Fields

`name`, `category`, `governorate_code`, `governorate`, `delegation`,
`delegation_code_geo`, `lat`, `lon`, plus:

- `attributes`, an object holding source-specific fields (capacity, volume, area, year,
  type, condition) where the publisher provided them. Contents vary by dataset.
- `license`, the license of the specific source dataset.
- `source_dataset`, the portal dataset title the record came from.

## Caveats

- **Geographically narrow.** Coverage is concentrated in **Béja** and a few northern
  governorates, because those are the commissions that publish GeoJSON. This is not a
  national inventory of dams or milk centres.
- **26 duplicate records were removed.** Two portal datasets republish the same Béja milk
  collection centres; deduplication was done on category + name + position.
- The `attributes` object is deliberately unnormalized, the source schemas differ too
  much to force into shared columns without losing meaning.
- Publication dates are not consistently stated.

## Note on what was not used

The catalog contains 66 GeoJSON resources; 52 were openly licensed and downloaded.
14 carried `notspecified` or a portal-specific license (`otl-data.industrie.gov.tn`)
and were **not used** including an administrative-boundary dataset and industrial
zones. If those licenses are clarified, they are worth revisiting.

Most downloaded files contained polygons (municipal zone boundaries) rather than points;
only point features were extracted here. The polygons are a possible future dataset.

# Delegations (Mu'tamadiyat / Délégations)

- **Dataset file:** data/geography/delegations.json
- **Source:** OpenStreetMap (via the Overpass API)
- **URL:** https://overpass-api.de/api/interpreter, https://www.openstreetmap.org
- **License:** Open Database License (ODbL) v1.0, https://opendatacommons.org/licenses/odbl/
- **Retrieved:** 2026-08-20
- **Method:** Overpass API query for administrative relations at `admin_level=5` within
  Tunisia, exported with tags and centroid, then linked to the parent governorate.

## Query used

```overpassql
[out:json][timeout:180];
area["ISO3166-1"="TN"][admin_level=2]->.tn;
relation(area.tn)["boundary"="administrative"]["admin_level"~"^(5|7|8)$"];
out tags center;
```

All 266 results came back at `admin_level=5`; levels 7 and 8 are unused in Tunisia.

## Attribution requirement

ODbL: attribution to **© OpenStreetMap contributors** and share-alike, as with the
governorates dataset.

## Fields

| Field | Meaning |
|---|---|
| `code_geo` | Tunisian national geographic code, 4 digits (first 2 = governorate) |
| `governorate_code` | ISO code of the parent governorate, joins to `governorates.json` |
| `governorate_name_en` | Parent governorate name, denormalized for readability |
| `name_fr` / `name_ar` | Delegation name in French and Arabic |
| `hasc` | HASC administrative code where OSM has one |
| `lat` / `lon` | Centroid of the delegation boundary |
| `wikidata` | Wikidata entity ID where available |
| `osm_relation_id` | OSM relation ID |

## Notes

- **266 records.** Every record is linked to one of the 24 governorates (verified: zero
  unmatched). Counts per governorate range from 5 (Tozeur) to 21 (Tunis).
- The commonly cited figure for Tunisian delegations is ~264. This export has 266, which
  is expected: OSM's administrative divisions are maintained by the community and can
  differ slightly from the official list, and delegations have been split over time.
  **Reconciling this against an official INS list is a worthwhile follow-up.**
- The `"Délégation "` and `"معتمدية "` prefixes were stripped from the name fields.
- Linking to the parent governorate was done via the `code_geo` prefix (the first two
  digits of a delegation's code are its governorate's code).

## Data quality caveats

- **No English names.** OSM only tags `name:en` on 19 of 266 delegations, so the field
  was omitted rather than filled with guesses or transliterations. French and Arabic are
  complete for all 266.
- **Two records have no `code_geo`:** *Regueb* and *Essaida*, both untagged in OSM.
  Their parent governorate (TN-43, Sidi Bouzid) was resolved by querying OSM's
  point-in-polygon lookup (`is_in()`) against their centroids rather than by assumption.
  Regueb's HASC code `TN.SZ.RE` independently confirms Sidi Bouzid.
- **262 of 266** have a Wikidata ID; 4 do not.
- Centroids are bounding-box centers, not the delegation's main town.

## Related

Note that OSM `admin_level=6` in Tunisia holds **imadas / sectors** (the level below
delegations, ~2084 of them with 6-digit `code_geo`), not delegations. That level was
checked during this collection but not exported; it is a candidate for a future dataset.

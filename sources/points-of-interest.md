# Points of Interest (services, businesses, places)

Covers all datasets in `data/services/`, `data/businesses/` and
`data/places/populated-places.json`.

- **Source:** OpenStreetMap (via the Overpass API)
- **URL:** https://overpass-api.de/api/interpreter, https://www.openstreetmap.org
- **License:** Open Database License (ODbL) v1.0, https://opendatacommons.org/licenses/odbl/
- **Retrieved:** 2026-08-21
- **Method:** Overpass API queries per category, filtered to named features, then
  assigned to a governorate and delegation by point-in-polygon.

## Datasets produced

| File | Records | OSM tags queried |
|---|---:|---|
| `businesses/shops.json` | 4,668 | `shop=*` |
| `businesses/food-and-drink.json` | 4,603 | `amenity=restaurant\|cafe\|fast_food\|bar\|pub\|ice_cream` |
| `places/transport.json` | 4,085 | `public_transport=*`, `railway=station\|halt`, `aeroway=aerodrome\|terminal`, `highway=bus_stop`, `amenity=bus_station\|taxi\|ferry_terminal` |
| `services/education.json` | 2,856 | `amenity=school\|college\|university\|kindergarten\|library` |
| `services/public-services.json` | 1,934 | `amenity=post_office\|police\|fire_station\|townhall\|courthouse\|marketplace`, `office=government` |
| `places/places-of-worship.json` | 1,695 | `amenity=place_of_worship` |
| `places/heritage-sites.json` | 1,620 | `historic=*`, `tourism=artwork\|viewpoint\|zoo\|theme_park` |
| `services/healthcare.json` | 1,482 | `amenity=pharmacy\|hospital\|clinic\|doctors\|dentist`, `healthcare=*` |
| `businesses/tourism-and-lodging.json` | 1,471 | `tourism=hotel\|motel\|guest_house\|hostel\|museum\|attraction\|apartment` |
| `places/populated-places.json` | 1,302 | `place=city\|town\|village\|suburb\|neighbourhood` |
| `services/finance.json` | 1,170 | `amenity=bank\|atm\|bureau_de_change` |
| `places/leisure-and-sport.json` | 1,071 | `leisure=*`, `tourism=camp_site\|picnic_site` |
| `businesses/offices-and-crafts.json` | 962 | `office=*`, `craft=*` |
| `services/fuel-stations.json` | 717 | `amenity=fuel` |
| `places/natural-features.json` | 536 | `natural=beach\|spring\|peak\|cave_entrance\|oasis`, `man_made=lighthouse\|windmill\|pier` |
| `services/community-and-culture.json` | 496 | `amenity=theatre\|cinema\|arts_centre\|community_centre\|nightclub\|social_facility` |
| `services/vehicle-services.json` | 138 | `amenity=car_rental\|driving_school\|parking` |
| `services/other-facilities.json` | 287 | `amenity=prison\|veterinary\|research_institute\|food_court\|casino\|…`, long-tail `leisure`/`tourism` |
| `places/major-roads.json` | 131 | `highway=motorway\|trunk\|primary` with a `ref` or `name` |
| **Total** | **31,093** | |

Category-specific fields are included where OSM has them: `religion` and `denomination`
on places of worship, `sport` on leisure venues, `network` / `route_ref` / `iata` /
`modes` on transport, `heritage` on heritage sites, `cuisine` on food and drink,
`stars` on hotels, `dispensing` on pharmacies.

Records also carry, where tagged: `email`, `fax`, `housenumber`, `street_ar`, `city_ar`,
`wheelchair`, `internet_access`, `alt_name`, `wikipedia`, `operator_ar`, `brand_ar`,
`last_checked`, `capacity`, `levels`, `start_date`, `ele`.

### A note on `major-roads.json`

Roads are line geometry, not points, so this dataset works differently from the others.
Segments are **grouped by road reference number** (`ref`) where one exists, since a road
number is its stable identity, otherwise by name. 6,532 OSM way segments consolidate
into 131 roads. `segments` records how many source ways were merged, and
`governorate_codes` lists every governorate the road passes through (the A1 crosses 7).

`center_lat` / `center_lon` are the mean of the segment centers, a rough midpoint of the
route, **not** a meaningful location. There is no `delegation` field, since a major road
spans many. Full road geometry was not exported; it belongs in a GeoJSON file if needed.

**No record appears in two files.** Features carrying two qualifying tags (a restaurant
inside a hotel, for example) are filed once, under their primary tag. Verified: 30,806
records, 30,806 unique OSM ids.

## Attribution requirement

ODbL: credit **© OpenStreetMap contributors** and share modified distributions under the
same license.

## How records were located

Each feature was assigned to a delegation using **true point-in-polygon** testing against
delegation boundary polygons downloaded from OSM (266 polygons, ~274,000 vertices),
with the governorate derived from the delegation.

- **30,684 records (99.6%)** resolved by exact point-in-polygon → `location_precision: "exact"`
- **122 records** fell outside every polygon (points on coastlines, islands or boundary
  edges) and were assigned to the nearest delegation centroid →
  `location_precision: "nearest"`

Accuracy was verified twice against OSM's own `is_in()` lookup, on two independent random
samples of 30 records each: **30/30 correct both times**. An earlier bounding-box
approach scored only 23/30 and was discarded.

Filter on `location_precision == "exact"` if you need certainty.

## Fields

`name` is always present. `name_fr`, `name_ar`, `name_en`, `street`, `city`, `postcode`,
`phone`, `website`, `opening_hours`, `operator`, `brand`, `cuisine` are **included only
when OSM has them** absent keys mean unknown, never empty strings. `type` holds the
originating OSM tag (e.g. `amenity=pharmacy`). `osm_type` + `osm_id` trace back to source.

---

## Important limitations, please read before relying on this data

### 1. This is not a complete business directory

Only features already mapped in OpenStreetMap are included. Tunisia's OSM coverage is
real but partial: many businesses, especially outside major cities, are simply not
mapped. **Absence from this dataset does not mean a place does not exist.**

Unnamed features were excluded, roughly 26,000 of the ~57,000 raw features returned, since a nameless record is not useful in a directory. This is why the transport dataset,
for instance, holds 4,085 named stops rather than every mapped stop position.

### 2. Contact details are sparse

Across all 20,228 records:

| Field | Coverage |
|---|---|
| Name | 100% |
| Phone | ~5% |
| Website | ~3% |
| Opening hours | ~3% |
| Street address | ~10% |

Contact coverage is best in healthcare (22% phone), offices and crafts (17%) and tourism
(14% phone, 13% website). It is near zero for transport, worship and heritage sites.
**Treat this as a geolocated index of what exists and where, not as a contact
database.**

### 3. Coverage is geographically uneven

Mapping density follows OSM contributor activity, not population:

Tunis 5,755 is the most mapped; Kef 250 the least.

All 24 governorates are represented, but Tunis has roughly **23× more entries than Kef**.
Do not use these counts for any density, per-capita or comparative analysis, they
measure mapping effort, not reality.

### 4. Data may be outdated

OSM records are contributed over many years and are not systematically re-verified.
Businesses close, move and change hands. A record here reflects what a contributor
observed at some point, not verified current status.

### 5. Names are mixed-script

`name` holds the primary OSM name, which may be Arabic, French or English depending on
the contributor. `name_ar` / `name_fr` / `name_en` are populated only where explicitly
tagged (Arabic 23–93% depending on category). Do not assume `name` is in any one language.

## Reproducing this collection

Each category was a separate Overpass query of this shape:

```overpassql
[out:json][timeout:600];
area["ISO3166-1"="TN"][admin_level=2]->.tn;
(
  nwr(area.tn)["amenity"~"^(pharmacy|hospital|clinic|doctors|dentist)$"];
  nwr(area.tn)["healthcare"];
);
out tags center;
```

Boundary polygons for the spatial join came from:

```overpassql
[out:json][timeout:900];
area["ISO3166-1"="TN"][admin_level=2]->.tn;
relation(area.tn)["boundary"="administrative"]["admin_level"="5"];
out geom;
```

Queries must be split by category, a single combined query exceeds the response limit
and truncates silently, producing an invalid JSON file. The public Overpass endpoint also
rate-limits to 2 concurrent slots, so requests need retry-with-backoff.

## Suggested improvements

- Cross-check pharmacies and hospitals against Ministry of Health published lists.
- Cross-check schools against Ministry of Education lists.
- Add contact details from official sources where licensing permits.
- Improve coverage of under-mapped governorates by contributing back to OSM.

---

## `places/unnamed-branded-facilities.json`

A separate file of **334 OpenStreetMap features that have no `name` tag but do carry an
`operator`, `brand` or `network`** an ATM tagged with its bank, a fuel station tagged
with its company, a water tower tagged with its utility.

They are excluded from the main datasets, which require a name. They are published
separately because the brand still identifies them usefully, and kept clearly marked so
they are never mistaken for named records:

- `label` holds the operator/brand/network, **it is not a name**.
- `unnamed: true` is set on every record.

All 334 were located by exact point-in-polygon. Composition: parking (54), ATMs (51),
transport platforms (41), fuel stations (22), water infrastructure (36), banks (12).

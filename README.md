# OpenTunisia 🇹🇳

Open information for Tunisia.

---

## About

OpenTunisia is a community-driven, open-source project that aims to collect useful,
structured and reusable information about Tunisia in one place.

The idea is simple: a lot of practical information about Tunisia exists, but it is
scattered across websites, PDFs, social media pages and private systems. It is often
hard to find, hard to reuse, and disappears when a website goes offline.

This project tries to gather that information in a plain, open format that anyone can
read, reuse and improve — developers, researchers, students, journalists, organizations
and citizens.

**The repository now holds 49,780 records** covering all 24 governorates — from the full
administrative hierarchy down to schools, pharmacies, hotels, bus stations, museums and
water associations. Everything is plain JSON, openly licensed, and traceable to its
source.

---

## Vision

- Information about Tunisia should be **open** and freely reusable.
- Data should be stored in **simple, readable formats** (JSON, CSV, Markdown) — no
  special software required to open it.
- Every piece of data should be **traceable** to where it came from.
- Anyone should be able to contribute, whether they add one restaurant or a whole
  dataset.
- The project should stay **small and understandable**, not turn into a complicated
  system.

---

## What kind of information will be collected

Over time, the project may cover things like:

| Category | Examples |
|---|---|
| **Places** | Cities, delegations, neighborhoods, landmarks, points of interest |
| **Businesses** | Shops, restaurants, cafés, markets, local services |
| **Services** | Pharmacies, hospitals, clinics, schools, government services |
| **Geography** | Governorates, boundaries, coordinates, administrative divisions |
| **Transport** | Stations, lines, routes, public transport information |
| **Infrastructure** | Utilities, public facilities, connectivity |

Nothing here is a promise. Categories will be added when there is real data to put in
them, and the folder structure can change as the project learns what actually works.

---

## Where is the data?

All datasets live in [`data/`](data/), organized by category:

```
data/
├── places/       — cities, neighborhoods, points of interest
├── businesses/   — shops, restaurants, cafés, local businesses
├── services/     — pharmacies, hospitals, schools, government services
└── geography/    — governorates, boundaries, coordinates
```

### Explore it on a map

An interactive viewer lives in [`viewer/`](viewer/) — every coordinate-bearing record
in this repository (38,567 points across 28 layers) drawn over all 266 delegation
boundaries, with search, per-layer toggles and light/dark themes.

```bash
cd viewer && python -m http.server 8000    # then open http://localhost:8000
```

It is a single HTML file plus three generated JSON files — no build step, no framework.
Rebuild the data with `python viewer/build.py` after changing anything in `data/`.

---

### Available now

**49,780 records** across **33 datasets** (25.9 MB), plus 266 delegation boundary polygons.

| | |
|---|---|
| Total records | **49,780** |
| With coordinates | 40,941 (82%) |
| With a phone number | 4,123 (8%) |
| From OpenStreetMap | 33,932 |
| From Tunisian government open data | 15,848 |
| Governorates covered | 24 of 24 |

---

#### Geography — the full administrative hierarchy

```
Governorate (24)  ->  Delegation (266)  ->  Imada (2,084)
```

| Dataset | Records | Contents |
|---|---:|---|
| [`geography/imadas.json`](data/geography/imadas.json) | 2,084 | Imadas / sectors (*imadat*) |
| [`geography/delegations.json`](data/geography/delegations.json) | 266 | Delegations (*mu'tamadiyat*) |
| [`geography/governorates.json`](data/geography/governorates.json) | 24 | Governorates (*wilayat*) |
| [`geography/delegation-boundaries.geojson`](data/geography/delegation-boundaries.geojson) | 266 | **Boundary polygons** — 274k vertices, GeoJSON |

The polygons are the ones used to assign every record in this repository to its
delegation, so that assignment can be reproduced or audited independently.

---

#### Official government data — 15,848 records

Published by Tunisian ministries via [data.gov.tn](https://www.data.gov.tn),
agridata.tn and openculture.gov.tn. Authoritative, and far better distributed
geographically than OpenStreetMap — but most carry no coordinates.

| Dataset | Records | Publisher & notes |
|---|---:|---|
| [`services/schools-official.json`](data/services/schools-official.json) | 7,452 | **Ministry of Education** — public + private schools. 6,139 have GPS |
| [`services/water-and-agricultural-groups.json`](data/services/water-and-agricultural-groups.json) | 2,709 | **Ministry of Agriculture / CRDA** — water user associations (GDA), organic operators |
| [`services/private-specialist-doctors.json`](data/services/private-specialist-doctors.json) | 2,220 | **Ministry of Health** — private specialists. **95% have a phone number** |
| [`services/health-facilities-official.json`](data/services/health-facilities-official.json) | 1,555 | **Ministry of Health** — health centres, hospitals |
| [`places/cultural-sites.json`](data/places/cultural-sites.json) | 849 | **Ministry of Cultural Affairs** — museums, institutions, festivals. All geolocated |
| [`businesses/olive-oil-mills.json`](data/businesses/olive-oil-mills.json) | 468 | Regional agricultural commissions — olive mills (*huileries*), 11 governorates |
| [`services/social-and-training-facilities.json`](data/services/social-and-training-facilities.json) | 268 | **Ministry of Social Affairs** — welfare offices, vocational training. **92% have a phone** |
| [`places/agricultural-infrastructure.json`](data/places/agricultural-infrastructure.json) | 200 | Agricultural commissions / ODESYPANO — dams, hill lakes, collection centres |
| [`services/public-libraries.json`](data/services/public-libraries.json) | 127 | Regional cultural directorates — public libraries, 7 governorates |

---

#### Services — OpenStreetMap

| Dataset | Records | Contents |
|---|---:|---|
| [`services/education.json`](data/services/education.json) | 2,856 | Schools, universities, kindergartens, libraries |
| [`services/public-services.json`](data/services/public-services.json) | 1,934 | Post offices, police, town halls, markets |
| [`services/healthcare.json`](data/services/healthcare.json) | 1,482 | Pharmacies, clinics, doctors, dentists |
| [`services/finance.json`](data/services/finance.json) | 1,170 | Banks, ATMs, exchange offices |
| [`services/fuel-stations.json`](data/services/fuel-stations.json) | 717 | Fuel stations |
| [`services/community-and-culture.json`](data/services/community-and-culture.json) | 496 | Theatres, cinemas, community centres |
| [`services/other-facilities.json`](data/services/other-facilities.json) | 287 | Veterinary, research institutes, misc. |
| [`services/vehicle-services.json`](data/services/vehicle-services.json) | 138 | Car rental, driving schools, parking |

#### Businesses — OpenStreetMap

| Dataset | Records | Contents |
|---|---:|---|
| [`businesses/shops.json`](data/businesses/shops.json) | 4,668 | Shops of all kinds, incl. hairdressers and beauty salons |
| [`businesses/food-and-drink.json`](data/businesses/food-and-drink.json) | 4,603 | Restaurants, cafés, fast food, bars |
| [`businesses/tourism-and-lodging.json`](data/businesses/tourism-and-lodging.json) | 1,471 | Hotels, guest houses, hostels, museums |
| [`businesses/offices-and-crafts.json`](data/businesses/offices-and-crafts.json) | 962 | Company offices, NGOs, craft workshops |

#### Places — OpenStreetMap

| Dataset | Records | Contents |
|---|---:|---|
| [`places/transport.json`](data/places/transport.json) | 4,085 | Stations, metro/rail stops, bus stations, airports, ferry terminals |
| [`places/places-of-worship.json`](data/places/places-of-worship.json) | 1,695 | Mosques, churches, synagogues |
| [`places/heritage-sites.json`](data/places/heritage-sites.json) | 1,620 | Ruins, archaeological sites, monuments, castles |
| [`places/populated-places.json`](data/places/populated-places.json) | 1,302 | Cities, towns, villages, neighborhoods |
| [`places/leisure-and-sport.json`](data/places/leisure-and-sport.json) | 1,071 | Parks, stadiums, gyms, sports centres, marinas |
| [`places/natural-features.json`](data/places/natural-features.json) | 536 | Beaches, springs, peaks, caves, oases |
| [`places/unnamed-branded-facilities.json`](data/places/unnamed-branded-facilities.json) | 334 | ATMs, parking, utilities identified by brand rather than name |
| [`places/major-roads.json`](data/places/major-roads.json) | 131 | Motorways, trunk and primary roads |

---

### How the data fits together

Every point-of-interest record carries a `governorate_code` (e.g. `TN-11`) and, where
known, a `delegation_code_geo`. That means **any file joins to the geography files
without a database** — plain JSON and a text editor are enough.

No record appears in two files. Official records matched to their OpenStreetMap
counterpart carry `osm_type` / `osm_id` as a **cross-reference**, not a duplicate —
715 such links exist (697 schools, 18 health facilities).

---

## Data sources

Everything here comes from two families of source, both openly licensed. Every dataset
has a matching file in [`sources/`](sources/) recording where it came from, under what
license, when it was retrieved, and what its limitations are.

### 1. OpenStreetMap — 33,932 records

Collected through the [Overpass API](https://overpass-api.de/). Published under the
**Open Database License (ODbL)**: reuse requires attribution to
**(c) OpenStreetMap contributors** and share-alike on modified distributions.

Strong on coordinates (every record has them) and on breadth. Weak on contact details
and on evenness — coverage follows mapping activity, so Tunis has roughly 23x more
entries than Kef.

### 2. Tunisian government open data — 15,848 records

From the national portal [data.gov.tn](https://www.data.gov.tn) and its sister portals
`agridata.tn` (agriculture and water) and `openculture.gov.tn` (culture), all reachable
through a CKAN API. All 2,698 catalog datasets were enumerated; the directory-type ones
were collected.

Licenses vary **per dataset** and are recorded per record where applicable:

| License | Records |
|---|---:|
| Licence Nationale de Donnees Publiques Ouvertes | 2,949 |
| Creative Commons Attribution (CC-BY) | 2,467 |
| Other open licenses | 976 |
| ODbL / CC-Zero / stated in `sources/` | 9,456 |

Authoritative and evenly distributed by population — the official school registry covers
interior governorates that OpenStreetMap barely touches. Usually lacks coordinates.

### Sources deliberately not used

**Google Maps, TripAdvisor, Foursquare and commercial directories.** Their terms forbid
bulk extraction and redistribution, and their database contents are protected. Scraping
them would produce data this project could not legally publish — compromising the
licensing of the whole repository, not just one file.

**Statistics.** Around 1,340 openly licensed datasets on the portals are counts, budgets
and time series. They are deliberately excluded: this repository is a directory of things
that exist and can be found, not a statistics archive. See
[`sources/README.md`](sources/README.md).

---

## Data quality

Every dataset is validated on each build. Current state:

| Check | Result |
|---|---|
| Invalid governorate references | **0** |
| Coordinates outside Tunisia | **0** |
| Governorate/delegation contradictions | **0** |
| Duplicate records | **0** |

Delegation assignment was verified against OpenStreetMap's own `is_in()` lookup on two
independent random samples of 30 records: **30/30 correct both times**. The published
boundary polygons independently reproduce the stored delegation for 60/60 sampled points.

**Known limitations are documented, not hidden.** Each file in [`sources/`](sources/)
states its own gaps — sparse contact details in the OpenStreetMap files, missing
coordinates in most official files, governorates that do not publish, and population
figures that mix the 2004 and 2014 censuses.

---

## How to contribute

Contributions are welcome, including small ones.

1. **Fork** this repository.
2. **Add or improve data** in the relevant folder under `data/`.
3. **Document your source** — where did the information come from, and is it allowed to
   be shared? Add it to `sources/`.
4. **Open a pull request** describing what you added and where it came from.

You can also contribute without adding data:

- Report incorrect or outdated information by opening an issue.
- Suggest a category or a data source worth investigating.
- Improve documentation and translations.

Please only contribute information you are allowed to share. Do not copy data from a
website unless its license or terms permit it.

---

## Current status

**Phase 1 is complete.** The realistic open sources for Tunisia have been swept.

- [x] Repository structure and documentation
- [x] Full administrative hierarchy — governorates, delegations, imadas, boundary polygons
- [x] OpenStreetMap collection across places, services and businesses — 33,932 records
- [x] Official Tunisian government data — 15,848 records from six ministries
- [x] Cross-match official records against OpenStreetMap records
- [ ] Periodic refresh, and coverage for governorates that do not yet publish

### What is finished

**OpenStreetMap is exhausted** for named features in these categories — a final sweep
found roughly 290 left uncollected, and those were taken. What remains there is unnamed
geometry, which does not belong in a directory.

**The government catalog is fully enumerated.** All 2,698 datasets on data.gov.tn were
listed; the ~159 directory-type ones were collected. 269 of 274 resources downloaded;
the five that could not be retrieved are named in [`sources/README.md`](sources/README.md)
so nobody has to rediscover the gap.

**715 cross-reference links** connect official registry records to their OpenStreetMap
counterparts (697 schools, 18 health facilities), letting an authoritative record borrow
coordinates and multilingual names. Matching is deliberately conservative — ambiguous
candidates are dropped rather than guessed, and guards prevent matching sibling schools,
different school levels, or a public health centre to a private clinic.

### What would help most now

Not more bulk collection — the bottleneck has moved.

1. **Verification.** Records go stale: businesses close, doctors move. Spot-checking real
   entries against reality is the highest-value contribution.
2. **Under-mapped governorates.** Tunis has ~23x more OpenStreetMap entries than Kef.
   Closing that gap means mapping in OSM, which benefits everyone.
3. **Governorates that do not publish.** Olive mills cover 11 of 24, libraries 7 of 24.
   That closes when those administrations publish, not by collecting harder.
4. **Refresh runs.** Every query and endpoint is documented, so re-collection is a
   repeatable job rather than a research project.

## Roadmap

### Phase 1
- Set up repository
- Research available Tunisian data
- Collect first datasets
- Organize and clean data

### Phase 2
- Expand categories
- Improve data quality
- Add more contributors

### Phase 3
- Build tools/API around the data if useful

---

## License

The **code and documentation** in this repository are released under the
[MIT License](LICENSE).

**Datasets are licensed differently.** A dataset derived from another source keeps
whatever conditions that source imposes. Each dataset documents its own license and
source in `sources/`. Check the individual dataset before reusing it.

All current datasets are derived from **OpenStreetMap** and are published under the
[Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/).
If you use them, you must credit **© OpenStreetMap contributors** and share any modified
distribution under the same license.

This is not legal advice. If you plan to reuse data commercially or at scale, verify the
terms of the original source yourself.

---

Made with ❤️ for Tunisia. Contributions welcome.

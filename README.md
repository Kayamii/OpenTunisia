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

**This repository is in its early stage.** The first datasets — Tunisia's
administrative geography — are in place, and collection is ongoing.

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

### Available now

**49,780 records** from two source families: **OpenStreetMap** (ODbL) and the **Tunisian
national open data portal** data.gov.tn (CC-BY / ODbL, official ministry data).

**Official government data** — from data.gov.tn

| Dataset | Records | Source |
|---|---:|---|
| [`services/schools-official.json`](data/services/schools-official.json) | 7,452 | Ministry of Education — public + private schools |
| [`services/water-and-agricultural-groups.json`](data/services/water-and-agricultural-groups.json) | 2,709 | Water user associations (GDA), organic operators |
| [`services/private-specialist-doctors.json`](data/services/private-specialist-doctors.json) | 2,220 | Private specialist doctors - 95% have a phone number |
| [`services/health-facilities-official.json`](data/services/health-facilities-official.json) | 1,555 | Ministry of Health — health centres + hospitals |
| [`places/cultural-sites.json`](data/places/cultural-sites.json) | 849 | Museums, cultural institutions, festivals - all geolocated |
| [`businesses/olive-oil-mills.json`](data/businesses/olive-oil-mills.json) | 468 | Olive oil mills (huileries), 11 governorates |
| [`services/social-and-training-facilities.json`](data/services/social-and-training-facilities.json) | 268 | Social welfare offices, vocational training - 92% have a phone |
| [`places/agricultural-infrastructure.json`](data/places/agricultural-infrastructure.json) | 200 | Dams, hill lakes, milk and grain collection centres |
| [`services/public-libraries.json`](data/services/public-libraries.json) | 127 | Public libraries, 7 governorates |

**Geography** — the full administrative hierarchy

| Dataset | Records | Contents |
|---|---:|---|
| [`geography/imadas.json`](data/geography/imadas.json) | 2,084 | Imadas / sectors (*imadat*) |
| [`geography/delegations.json`](data/geography/delegations.json) | 266 | Delegations (*mu'tamadiyat*) |
| [`geography/governorates.json`](data/geography/governorates.json) | 24 | Governorates (*wilayat*) |
| [`geography/delegation-boundaries.geojson`](data/geography/delegation-boundaries.geojson) | 266 | **Delegation boundary polygons** (GeoJSON, 274k vertices) |

**Services** — from OpenStreetMap

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

**Businesses** — from OpenStreetMap

| Dataset | Records | Contents |
|---|---:|---|
| [`businesses/shops.json`](data/businesses/shops.json) | 4,668 | Shops of all kinds, incl. hairdressers and beauty salons |
| [`businesses/food-and-drink.json`](data/businesses/food-and-drink.json) | 4,603 | Restaurants, cafés, fast food, bars |
| [`businesses/tourism-and-lodging.json`](data/businesses/tourism-and-lodging.json) | 1,471 | Hotels, guest houses, hostels, museums |
| [`businesses/offices-and-crafts.json`](data/businesses/offices-and-crafts.json) | 962 | Company offices, NGOs, craft workshops |

**Places** — from OpenStreetMap

| Dataset | Records | Contents |
|---|---:|---|
| [`places/transport.json`](data/places/transport.json) | 4,085 | Stations, metro/rail stops, bus stations, airports, ferries |
| [`places/places-of-worship.json`](data/places/places-of-worship.json) | 1,695 | Mosques, churches, synagogues |
| [`places/heritage-sites.json`](data/places/heritage-sites.json) | 1,620 | Ruins, archaeological sites, monuments, castles |
| [`places/populated-places.json`](data/places/populated-places.json) | 1,302 | Cities, towns, villages, neighborhoods |
| [`places/leisure-and-sport.json`](data/places/leisure-and-sport.json) | 1,071 | Parks, stadiums, gyms, sports centres, marinas |
| [`places/natural-features.json`](data/places/natural-features.json) | 536 | Beaches, springs, peaks, caves, oases |
| [`places/unnamed-branded-facilities.json`](data/places/unnamed-branded-facilities.json) | 334 | ATMs, parking, utilities identified by brand not name |
| [`places/major-roads.json`](data/places/major-roads.json) | 131 | Motorways, trunk and primary roads |

Every point-of-interest record carries a `governorate_code` and `delegation_code_geo`, so
all files join to the geography datasets without any database. No record appears twice.

`delegation-boundaries.geojson` holds the actual polygons used to assign every record to
its delegation, so that assignment can be reproduced or audited independently.

> **Read this before using the data.** The OpenStreetMap files are a geolocated index of
> *what exists and where* — not a verified business directory. Phone numbers appear on
> ~4% of them, websites on ~2%, and their coverage follows mapping activity rather than
> reality (Tunis has ~23× more entries than Kef). The official government files are
> authoritative and far better distributed, but most carry no coordinates. Absence from a
> dataset does not mean a place does not exist. Full limitations are in
> [`sources/`](sources/).

---

## Data sources

Every dataset should document where its information came from. Possible sources include
OpenStreetMap, Tunisian government open-data portals, official websites, publicly
reusable datasets, and direct community contributions.

**Important:** information being publicly visible on a website does not mean it can be
copied or redistributed. Each source has its own license and terms of use, and this
project respects them.

See [`sources/README.md`](sources/README.md) for details.

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

**Phase 1 — foundation and first datasets.**

- [x] Repository structure created
- [x] Research available Tunisian data sources
- [x] Collect the first datasets — administrative geography (governorates, delegations)
- [x] Expand into places, services and businesses — 31,093 points of interest
- [x] Complete the administrative hierarchy down to imada level
- [x] Add official Tunisian government data (Ministries of Education and Health)
- [x] Cross-match official records against the OpenStreetMap records
- [ ] Extend coverage to governorates that do not yet publish open data

**715 cross-reference links** now connect official registry records to their
OpenStreetMap counterparts (697 schools, 18 health facilities), so an authoritative
record can borrow OSM's coordinates and multilingual names. Matching is conservative:
ambiguous candidates are dropped rather than guessed, and guards prevent matching sibling
schools, different school levels, or a public health centre to a private clinic.

The administrative geography layer is verified against the official ISO 3166-2:TN code
list, and every point of interest is tied to it by point-in-polygon assignment (verified 30/30
on two independent random samples).

OpenStreetMap's usable named features for Tunisia are **exhausted** for these categories.
Collection has therefore moved to **official Tunisian government sources** via
data.gov.tn, which is where the remaining value is: the official school registry alone
holds 7,452 records against OpenStreetMap's 2,856, and — unlike OSM — it is distributed
by population rather than by mapping activity, so interior governorates like Kairouan,
Sidi Bouzid and Kasserine are properly represented.

The next step is **cross-matching** the official records against the OSM ones, so a
school has both its authoritative registry entry and its coordinates.

**The next priority is quality, not quantity.** The most valuable contributions now are
cross-checking against official sources (Ministry of Health pharmacy lists, Ministry of
Education school lists) and improving coverage in under-mapped governorates.

---

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

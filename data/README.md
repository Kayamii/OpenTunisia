# Data

This folder holds the datasets of OpenTunisia.

Datasets are added gradually as they are researched, collected and verified. Nothing is
invented or filled with placeholder examples — a folder stays empty until there is real
data to put in it.

## What exists today

**42,586 records** from two source families:

- **OpenStreetMap** (ODbL) — broad coverage with coordinates
- **data.gov.tn**, the Tunisian national open data portal (CC-BY / ODbL) — official
  ministry registries, authoritative but often without coordinates

### Official government data (8,988)

| File | Records | Publisher |
|---|---:|---|
| `services/schools-official.json` | 7,452 | Ministry of Education |
| `services/health-facilities-official.json` | 1,536 | Ministry of Health |

These are kept **separate** from the OpenStreetMap files covering the same topics. They
are independent sources with different strengths, and are not merged or deduplicated
against each other.

### Geography — the full administrative hierarchy (2,374)

```
Governorate (24)  ->  Delegation (266)  ->  Imada (2,084)
```

| File | Records |
|---|---:|
| `geography/imadas.json` | 2,084 |
| `geography/delegations.json` | 266 |
| `geography/governorates.json` | 24 |

### Services — OpenStreetMap (9,080)

| File | Records |
|---|---:|
| `services/education.json` | 2,856 |
| `services/public-services.json` | 1,934 |
| `services/healthcare.json` | 1,482 |
| `services/finance.json` | 1,170 |
| `services/fuel-stations.json` | 717 |
| `services/community-and-culture.json` | 496 |
| `services/other-facilities.json` | 287 |
| `services/vehicle-services.json` | 138 |

### Businesses — OpenStreetMap (11,704)

| File | Records |
|---|---:|
| `businesses/shops.json` | 4,668 |
| `businesses/food-and-drink.json` | 4,603 |
| `businesses/tourism-and-lodging.json` | 1,471 |
| `businesses/offices-and-crafts.json` | 962 |

### Places — OpenStreetMap (10,440)

| File | Records |
|---|---:|
| `places/transport.json` | 4,085 |
| `places/places-of-worship.json` | 1,695 |
| `places/heritage-sites.json` | 1,620 |
| `places/populated-places.json` | 1,302 |
| `places/leisure-and-sport.json` | 1,071 |
| `places/natural-features.json` | 536 |
| `places/major-roads.json` | 131 |

Every point-of-interest record is tied to a governorate (`governorate_code`) and a
delegation (`delegation_code_geo`), so any file joins to the geography files without a
database. No record appears in two files.

`places/major-roads.json` is the exception: roads span many delegations, so it carries a
`governorate_codes` list instead.

### Before you rely on it

The **OpenStreetMap** files are a geolocated index of what exists and where — not a
verified business directory. Phone numbers are on ~4% of records, websites ~2%, and
coverage is uneven (Tunis has ~23x more entries than Kef) because it reflects mapping
activity, not reality.

The **official** files are authoritative and far better distributed geographically, but
most carry no coordinates and their publication dates are not stated.

Read the matching file in [`../sources/`](../sources/) before building anything on a
dataset.

---|---:|
| `geography/imadas.json` | 2,084 |
| `geography/delegations.json` | 266 |
| `geography/governorates.json` | 24 |

### Services (9,080)

| File | Records |
|---|---:|
| `services/education.json` | 2,856 |
| `services/public-services.json` | 1,934 |
| `services/healthcare.json` | 1,482 |
| `services/finance.json` | 1,170 |
| `services/fuel-stations.json` | 717 |
| `services/community-and-culture.json` | 496 |
| `services/other-facilities.json` | 287 |
| `services/vehicle-services.json` | 138 |

### Businesses (11,704)

| File | Records |
|---|---:|
| `businesses/shops.json` | 4,668 |
| `businesses/food-and-drink.json` | 4,603 |
| `businesses/tourism-and-lodging.json` | 1,471 |
| `businesses/offices-and-crafts.json` | 962 |

### Places (10,440)

| File | Records |
|---|---:|
| `places/transport.json` | 4,085 |
| `places/places-of-worship.json` | 1,695 |
| `places/heritage-sites.json` | 1,620 |
| `places/populated-places.json` | 1,302 |
| `places/leisure-and-sport.json` | 1,071 |
| `places/natural-features.json` | 536 |
| `places/major-roads.json` | 131 |

Every point-of-interest record is tied to a governorate (`governorate_code`) and a
delegation (`delegation_code_geo`), so any file joins to the geography files without a
database. No record appears in two files.

`places/major-roads.json` is the exception: roads span many delegations, so it carries a
`governorate_codes` list instead.

### Before you rely on it

These datasets are a **geolocated index of what exists and where** — not a verified
business directory. Phone numbers are on ~4% of records, websites ~2%. Coverage is
uneven (Tunis has ~23x more entries than Kef) because it reflects OSM mapping activity,
not reality. Read [`../sources/points-of-interest.md`](../sources/points-of-interest.md)
for the full limitations before building anything on this.

---|---:|
| `geography/governorates.json` | 24 |
| `geography/delegations.json` | 266 |

### Services (8,793)

| File | Records |
|---|---:|
| `services/education.json` | 2,856 |
| `services/public-services.json` | 1,934 |
| `services/healthcare.json` | 1,482 |
| `services/finance.json` | 1,170 |
| `services/fuel-stations.json` | 717 |
| `services/community-and-culture.json` | 496 |
| `services/vehicle-services.json` | 138 |

### Businesses (11,704)

| File | Records |
|---|---:|
| `businesses/shops.json` | 4,668 |
| `businesses/food-and-drink.json` | 4,603 |
| `businesses/tourism-and-lodging.json` | 1,471 |
| `businesses/offices-and-crafts.json` | 962 |

### Places (10,309)

| File | Records |
|---|---:|
| `places/transport.json` | 4,085 |
| `places/places-of-worship.json` | 1,695 |
| `places/heritage-sites.json` | 1,620 |
| `places/populated-places.json` | 1,302 |
| `places/leisure-and-sport.json` | 1,071 |
| `places/natural-features.json` | 536 |

Every point-of-interest record is tied to a governorate (`governorate_code`) and a
delegation (`delegation_code_geo`), so any file joins to the geography files without a
database. No record appears in two files.

### Before you rely on it

These datasets are a **geolocated index of what exists and where** — not a verified
business directory. Phone numbers are on ~5% of records, websites ~3%. Coverage is
uneven (Tunis has ~23x more entries than Kef) because it reflects OSM mapping activity,
not reality. Read [`../sources/points-of-interest.md`](../sources/points-of-interest.md)
for the full limitations before building anything on this.

---|---:|
| `geography/governorates.json` | 24 |
| `geography/delegations.json` | 266 |

### Services

| File | Records |
|---|---:|
| `services/healthcare.json` | 1,483 |
| `services/education.json` | 2,856 |
| `services/public-services.json` | 1,944 |
| `services/finance.json` | 1,170 |
| `services/fuel-stations.json` | 721 |

### Businesses

| File | Records |
|---|---:|
| `businesses/shops.json` | 4,674 |
| `businesses/food-and-drink.json` | 4,603 |
| `businesses/tourism-and-lodging.json` | 1,475 |

### Places

| File | Records |
|---|---:|
| `places/populated-places.json` | 1,302 |

**Total: 20,518 records.**

Every point-of-interest record is tied to a governorate (`governorate_code`) and a
delegation (`delegation_code_geo`), so any file joins to the geography files without a
database.

### Before you rely on it

These datasets are a **geolocated index of what exists and where** — not a verified
business directory. Phone numbers are on ~6% of records, websites ~3%. Coverage is
uneven (Tunis has ~25x more entries than Kef) because it reflects OSM mapping activity,
not reality. Read [`../sources/points-of-interest.md`](../sources/points-of-interest.md)
for the full limitations before building anything on this.

---|---|---|---|
| `geography/governorates.json` | 24 | OpenStreetMap | ODbL |
| `geography/delegations.json` | 266 | OpenStreetMap | ODbL |

`places/`, `businesses/` and `services/` are still empty.

The two geography files form the administrative backbone of the project. Any future
record — a pharmacy, a school, a shop — should reference a governorate by its `code`
(e.g. `TN-11`) and, where known, a delegation by its `code_geo`. That makes datasets
joinable without a database.

---

## Folders

| Folder | What goes in it |
|---|---|
| `places/` | Cities, delegations, neighborhoods, landmarks, points of interest |
| `businesses/` | Shops, restaurants, cafés, markets, local businesses |
| `services/` | Pharmacies, hospitals, clinics, schools, government services |
| `geography/` | Governorates, administrative boundaries, coordinates |

More folders can be added later if a category clearly does not fit into these.

---

## Format

Keep it simple and readable:

- **JSON** for structured records (a list of places, businesses, etc.)
- **CSV** for flat tabular data
- **Markdown** for descriptive or reference information

Use UTF-8 encoding. Arabic and French text is expected and welcome.

---

## Naming

Use lowercase file names with hyphens, and be specific:

```
data/geography/governorates.json
data/services/pharmacies-tunis.json
data/places/cities.csv
```

If a dataset covers one governorate or city, put that in the name.

---

## Every dataset needs a source

A dataset without a documented source cannot be trusted or legally reused.

When you add a dataset, add a matching entry in [`../sources/`](../sources/) that
records where the information came from and under what license it can be shared. See
[`../sources/README.md`](../sources/README.md).

# Data

This folder holds the datasets of OpenTunisia.

Datasets are added gradually as they are researched, collected and verified. Nothing is
invented or filled with placeholder examples, a folder stays empty until there is real
data to put in it.

## What exists today

**49,780 records** from two source families:

- **OpenStreetMap** (ODbL), broad coverage with coordinates
- **Tunisian government open data** via data.gov.tn and agridata.tn (CC-Zero, CC-BY,
  ODbL, LNDPO-TN), official registries, authoritative but often without coordinates

### Official government data (15,848)

| File | Records | Publisher |
|---|---:|---|
| `services/schools-official.json` | 7,452 | Ministry of Education |
| `services/health-facilities-official.json` | 1,555 | Ministry of Health |
| `businesses/olive-oil-mills.json` | 468 | Regional agricultural commissions (CRDA) |
| `places/agricultural-infrastructure.json` | 200 | Agricultural commissions / ODESYPANO |
| `services/public-libraries.json` | 127 | Regional cultural affairs directorates |
| `services/water-and-agricultural-groups.json` | 2,709 | Ministry of Agriculture / CRDA / ODESYPANO |
| `services/private-specialist-doctors.json` | 2,220 | Ministry of Health |
| `places/cultural-sites.json` | 849 | Ministry of Cultural Affairs |
| `services/social-and-training-facilities.json` | 268 | Ministry of Social Affairs / Vocational Training |

These are kept **separate** from the OpenStreetMap files covering the same topics. They
are independent sources with different strengths, and are not merged or deduplicated
against each other.

### Geography, the full administrative hierarchy (2,374)

```
Governorate (24)  ->  Delegation (266)  ->  Imada (2,084)
```

| File | Records |
|---|---:|
| `geography/imadas.json` | 2,084 |
| `geography/delegations.json` | 266 |
| `geography/governorates.json` | 24 |
| `geography/delegation-boundaries.geojson` | 266 polygons |

### Services. OpenStreetMap (9,080)

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

### Businesses. OpenStreetMap (11,704)

| File | Records |
|---|---:|
| `businesses/shops.json` | 4,668 |
| `businesses/food-and-drink.json` | 4,603 |
| `businesses/tourism-and-lodging.json` | 1,471 |
| `businesses/offices-and-crafts.json` | 962 |

### Places. OpenStreetMap (10,774)

| File | Records |
|---|---:|
| `places/transport.json` | 4,085 |
| `places/places-of-worship.json` | 1,695 |
| `places/heritage-sites.json` | 1,620 |
| `places/populated-places.json` | 1,302 |
| `places/leisure-and-sport.json` | 1,071 |
| `places/natural-features.json` | 536 |
| `places/unnamed-branded-facilities.json` | 334 |
| `places/major-roads.json` | 131 |

Every point-of-interest record is tied to a governorate (`governorate_code`) and a
delegation (`delegation_code_geo`), so any file joins to the geography files without a
database. No record appears in two files.

`places/major-roads.json` is the exception: roads span many delegations, so it carries a
`governorate_codes` list instead.

### Before you rely on it

The **OpenStreetMap** files are a geolocated index of what exists and where, not a
verified business directory. Phone numbers are on ~4% of records, websites ~2%, and
coverage is uneven (Tunis has ~23x more entries than Kef) because it reflects mapping
activity, not reality.

The **official** files are authoritative and far better distributed geographically, but
most carry no coordinates, and several cover only the governorates that chose to publish.

Read the matching file in [`../sources/`](../sources/) before building anything on a
dataset.

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

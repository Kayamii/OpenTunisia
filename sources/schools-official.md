# Schools (official — Ministry of Education)

- **Dataset file:** data/services/schools-official.json
- **Source:** Portail National des Données Ouvertes (data.gov.tn), published by the
  Ministère de l'Éducation
- **URL:** https://catalog.data.gov.tn/dataset/d400669d-34b4-4428-ac62-88488f7a69dc
  (public) and https://catalog.data.gov.tn/dataset/55e810c2-2a86-4db6-8c94-3ee2b60efc29
  (private)
- **License:** **Open Database License (ODbL)** as declared by the publisher on the
  portal (`license_id: licence-de-base-de-données-ouverte-open-database-license-odbl`)
- **Retrieved:** 2026-08-21
- **Method:** Direct CSV download from the portal's CKAN API. No scraping.

## Why this dataset exists alongside `education.json`

`services/education.json` comes from OpenStreetMap. **This file is the official
Ministry list** and is substantially more complete:

| | OSM (`education.json`) | Official (`schools-official.json`) |
|---|---:|---:|
| Records | 2,856 | 7,452 |
| Coverage driver | Contributor mapping activity | Actual national registry |

Crucially, the geographic distribution is different. OSM over-represents Tunis and the
coast. The official data is distributed by **population**: Sfax 578, Tunis 519,
Kairouan 446, Sidi Bouzid 442, Kasserine 421 — interior governorates that OSM barely
covers.

**The two files are not merged and not deduplicated against each other.** They are
independent sources with different strengths: OSM records carry coordinates, names in
multiple languages and occasional contact details; official records carry authoritative
coverage and the public/private distinction. Cross-matching them is a good future task.

## Fields

| Field | Meaning |
|---|---|
| `name_ar` | School name in Arabic (the only name the source provides) |
| `school_type` | `primary` (ابتدائي) or `secondary` (ثانوي) |
| `sector` | `public` or `private` |
| `education_district` | Regional education directorate (المندوبية الجهوية للتربية) |
| `governorate_code` / `governorate` | Joins to `governorates.json` |
| `delegation` / `delegation_code_geo` | Joins to `delegations.json` |
| `lat` / `lon` | GPS coordinates — **public schools only** |
| `address` | Street address — **private schools only** |

## Notes and caveats

- **7,452 records**: 6,139 public (with GPS) + 1,313 private (with addresses).
- **Names are Arabic-only.** The source provides no French or English names. Records use
  `name_ar` rather than `name` to make this explicit.
- **Private schools have no coordinates.** The source file provides only an address and
  delegation. They were located to a delegation by name matching, not geographically.
- **5 public schools were dropped** because their coordinates fell outside Tunisia's
  bounding box — bad data in the source.
- **4 private schools were dropped** whose delegation name could not be matched.
- Matching Arabic delegation names required normalizing diacritics, the definite article
  `ال` on every token, and **invisible Unicode bidi marks**, plus a short alias table for
  spelling variants. See `sources/README.md`.

## Validation

The Ministry labels each school with its own delegation. Comparing that label against
this project's independent point-in-polygon assignment on 793 records with coordinates:
**761 agree (95%)**.

The ~5% that differ are concentrated in dense Tunis-area boundaries (Médina, La
Goulette, Carthage, Le Kram). The likely explanation is that the Ministry field records
the *education district*, which does not always follow the geographic delegation
boundary. The `delegation` field in this dataset is the **geographic** assignment
derived from coordinates, which is consistent with every other dataset in this
repository.

## Attribution

ODbL requires attribution and share-alike. Credit the **Ministère de l'Éducation /
data.gov.tn** and share modified distributions under the same license.

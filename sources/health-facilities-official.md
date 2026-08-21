# Health facilities (official — Ministry of Health)

- **Dataset file:** data/services/health-facilities-official.json
- **Source:** Portail National des Données Ouvertes (data.gov.tn), published by the
  Ministère de la Santé
- **URLs:**
  - Basic health centres — https://catalog.data.gov.tn/dataset/74134555-7893-40c1-b078-4543a22a0772
  - Circumscription hospitals — https://catalog.data.gov.tn/dataset/a8a27221-d8ab-4097-8f83-c8b51574fcd1
- **License:** **Creative Commons Attribution (CC-BY)** as declared by the publisher
- **Retrieved:** 2026-08-21
- **Method:** Direct JSON/CSV download from the portal's CKAN API. No scraping.

## What this contains

| Source | Records |
|---|---:|
| Centres de Soins de Santé de Base (basic health centres) | 1,442 |
| Hôpitaux de circonscription (circumscription hospitals) | 94 |
| **Total** | **1,536** |

This complements `services/healthcare.json` (from OpenStreetMap), which covers
pharmacies, clinics and private practices that this official list does not include.
**The two are not merged** — they are independent sources covering different things.

## Fields

| Field | Meaning |
|---|---|
| `name` | Facility name |
| `facility_type` | e.g. `Centre de Soins de Santé de Base`, `Hôpital de circonscription` |
| `sector` | `public` (both sources are public-sector registries) |
| `governorate_code` / `governorate` | Joins to `governorates.json` |
| `delegation` / `delegation_code_geo` | Joins to `delegations.json`, where matched |
| `locality`, `postcode`, `address` | Where the source provides them |
| `phone`, `fax` | Hospitals only — digits normalized, separators stripped |

## Caveats — please read

- **No coordinates.** Neither source publishes latitude/longitude. Records are located
  administratively (governorate, and delegation where matched), not geographically.
  This is why the file has no `lat`/`lon` and no `location_precision` field.
- **1,235 of 1,536 have a delegation**; the remainder are located to governorate only,
  because their delegation string did not match confidently. Governorate is present and
  verified for **all 1,536**.
- **Only 79 records carry a phone number** — the hospital source has them, the health
  centre source does not.
- Names are in French/Latin script, often fully uppercase in the source, and are kept as
  published.
- These are **public-sector registries**. Private clinics, private pharmacies and
  individual practitioners are not included.
- The publication date of the underlying registries is not stated on the portal, so the
  data's currency is unknown. Treat it as a recent-but-undated official snapshot.

## Attribution

CC-BY requires attribution. Credit the **Ministère de la Santé / data.gov.tn**.

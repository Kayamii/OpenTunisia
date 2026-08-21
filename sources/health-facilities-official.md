# Health facilities (official. Ministry of Health)

- **Dataset file:** data/services/health-facilities-official.json
- **Source:** Portail National des Données Ouvertes (data.gov.tn), published by the
  Ministère de la Santé
- **URLs:**
  - Basic health centres, https://catalog.data.gov.tn/dataset/74134555-7893-40c1-b078-4543a22a0772
  - Circumscription hospitals, https://catalog.data.gov.tn/dataset/a8a27221-d8ab-4097-8f83-c8b51574fcd1
- **License:** **Creative Commons Attribution (CC-BY)** as declared by the publisher
- **Retrieved:** 2026-08-21
- **Method:** Direct JSON/CSV download from the portal's CKAN API. No scraping.

## What this contains

| Source | Records |
|---|---:|
| Centres de Soins de Santé de Base (basic health centres) | 1,442 |
| Hôpitaux de circonscription (circumscription hospitals) | 94 |
| Établissements publics de santé (major public hospitals) | 19 |
| **Total** | **1,555** |

The 19 *établissements publics de santé* are Tunisia's major public hospitals. La Rabta,
Hôpital d'Enfants de Tunis, Aziza Othmana and others. They arrive **with street
addresses and phone numbers**, which the other two sources lack. They were matched
against the existing records by normalized name + governorate before insertion, so no
facility is listed twice.

This complements `services/healthcare.json` (from OpenStreetMap), which covers
pharmacies, clinics and private practices that this official list does not include.
**The two are not merged** they are independent sources covering different things.

## Fields

| Field | Meaning |
|---|---|
| `name` | Facility name |
| `facility_type` | e.g. `Centre de Soins de Santé de Base`, `Hôpital de circonscription` |
| `sector` | `public` (both sources are public-sector registries) |
| `governorate_code` / `governorate` | Joins to `governorates.json` |
| `delegation` / `delegation_code_geo` | Joins to `delegations.json`, where matched |
| `locality`, `postcode`, `address` | Where the source provides them |
| `phone`, `fax` | Hospitals only, digits normalized, separators stripped |

## Caveats, please read

- **No coordinates.** Neither source publishes latitude/longitude. Records are located
  administratively (governorate, and delegation where matched), not geographically.
  This is why the file has no `lat`/`lon` and no `location_precision` field.
- **1,235 of 1,536 have a delegation**; the remainder are located to governorate only,
  because their delegation string did not match confidently. Governorate is present and
  verified for **all 1,536**.
- **98 records carry a phone number and 99 an address** the two hospital sources have
  them, the basic-health-centre source does not.
- Names are in French/Latin script, often fully uppercase in the source, and are kept as
  published.
- These are **public-sector registries**. Private clinics, private pharmacies and
  individual practitioners are not included.
- The publication date of the underlying registries is not stated on the portal, so the
  data's currency is unknown. Treat it as a recent-but-undated official snapshot.

## Attribution

CC-BY requires attribution. Credit the **Ministère de la Santé / data.gov.tn**.

---

## Cross-matching to OpenStreetMap

**18 of 1,536** official health facilities have been linked to a record in
`services/healthcare.json`, via `osm_type`, `osm_id` and `osm_match_name_similarity`.

The number is low for a real reason: this official list covers **basic health centres and
public hospitals**, while OpenStreetMap's Tunisian health coverage is mostly
**pharmacies** and private practices. The two sources largely describe different things,
which is exactly why both are kept.

Matching requires the same governorate (and same delegation where known), a name
similarity ≥ 0.6, and a ≥ 0.15 margin over the runner-up. 55 ambiguous candidates were
rejected.

### Guards

- **Facility class is never crossed.** An early version matched "CSB Hammam Lif" (a
  public basic health centre) to "Polyclinique Hammam-Lif" (a private clinic), and "CSB
  Menzel Horr" to "Clinique Menzel Horr". Clinic / hospital / CSB / pharmacy are now
  treated as distinct classes that cannot match each other.
- **One OSM feature backs at most one official record.** Two official entries had both
  matched the same hospital; the strongest link wins and the other is dropped.

All 18 surviving matches were reviewed by hand and point to distinct features.

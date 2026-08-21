# Public libraries

- **Dataset file:** data/services/public-libraries.json
- **Source:** data.gov.tn — regional cultural affairs directorates
- **License:** per record, in the `license` field (`other-open`, `cc-by`)
- **Retrieved:** 2026-08-21
- **Method:** Library names extracted from regional library-statistics publications
  (CSV/XLSX) on the national portal.

## What this is — and is not

The source publications are **statistics** about libraries (book counts, subscriber
numbers, loans), not facility directories. What is reusable from them is the **list of
library names** each region operates.

So this file is a **name-and-location index of public libraries**, not a service
directory. It has no addresses, no phone numbers, no opening hours, and no coordinates.

## Contents

**127 libraries** across 7 governorates:

Nabeul 51 · Sousse 26 · Ben Arous 19 · Tataouine 14 · Manouba 13 · Médenine 3 · Béja 1

`facility_type` distinguishes 125 `public_library` from 2 `mobile_library`
(bibliothèques ambulantes — these are vehicles, not fixed places).

## Fields

`name`, `facility_type`, `governorate_code`, `governorate`, `delegation` and
`delegation_code_geo` (where matched), `license`, `source_dataset`.

## Caveats

- **7 of 24 governorates only.** Coverage depends entirely on which regional directorates
  published statistics. This is not a national list.
- **Only 16 of 127 have a delegation.** Library names embed their locality in free text
  ("Bib Pub De Fouchana"), which does not reliably resolve to a delegation. Rather than
  force weak matches, unmatched records carry governorate only.
- **No coordinates.**
- Names are French/Latin script as published, with inconsistent abbreviation
  ("Bib", "Bib Pub", "Bibliothèque"). They are kept verbatim.
- Statistics from the source files (book counts, subscriber numbers) were **not**
  imported — they are time-series data that would go stale and are outside this
  repository's purpose.
- Deduplication was by normalized name within a governorate; the same library appearing
  in several yearly publications is stored once.

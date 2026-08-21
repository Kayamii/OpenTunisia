# Sources

Every dataset in this project should document where its information came from.

This matters for two reasons:

1. **Trust** — anyone using the data should be able to check where it originated and how
   current it is.
2. **Licensing** — data is not automatically free to reuse just because it is publicly
   visible on a website. Each source has its own terms.

---

## Possible sources

- **OpenStreetMap** — community-maintained geographic data. Published under the ODbL,
  which requires attribution and share-alike.
- **Tunisian government open-data sources** — official portals and public
  administrations. Terms vary per portal and per dataset.
- **Official websites** — ministries, municipalities, public institutions. Being public
  does not mean being reusable; check the terms.
- **Publicly reusable datasets** — datasets explicitly published under an open license
  (Creative Commons, ODbL, public domain, etc.).
- **Community contributions** — information gathered or verified directly by
  contributors, contributed under this project's license.

---

## Licensing — please read

**Do not assume information from a website can be copied or redistributed.**

Before adding data from an external source:

- Look for a license, "terms of use", or "open data" statement on the source.
- If a license exists, record it and follow its conditions (attribution, share-alike,
  non-commercial restrictions, etc.).
- If no license is stated, treat the data as **not reusable** and do not add it. Ask the
  source for permission, or find an openly licensed alternative.
- Do not scrape a website whose terms forbid it.

Facts themselves (a pharmacy exists at an address) are generally not owned by anyone,
but a compiled database can be protected. When in doubt, leave it out.

This is not legal advice.

---

## Confirmed usable sources

These have been checked and are in use.

### OpenStreetMap — ODbL

Queried through the Overpass API. Requires attribution to **(c) OpenStreetMap
contributors** and share-alike on modified distributions. Broad coverage, but reflects
contributor activity rather than reality (see `points-of-interest.md`).

### data.gov.tn — the Tunisian national open data portal

The official portal at **https://www.data.gov.tn** publishes public-sector datasets, and
its catalog is machine-readable through a standard **CKAN API** at
`https://catalog.data.gov.tn/api/3/action/`. Useful endpoints:

```
package_search?q=<term>&rows=<n>      search datasets
package_show?id=<name>                one dataset with its resource URLs
license_list                          licenses in use on the portal
```

The portal declares an explicit license per dataset. Licenses seen in use:

| `license_id` | Meaning for us |
|---|---|
| `cc-zero` | Public domain - no restrictions |
| `cc-by` / `licence-creative-commons-attribution-cc-by` | Reusable with attribution |
| `licence-de-base-de-donnees-ouverte-open-database-license-odbl` | ODbL - attribution + share-alike |
| `licence-nationale-de-donnees-publiques-ouvertes` (LNDPO-TN) | National open license |
| `other-pd`, `other-open` | Open, terms stated on the dataset page |

**Always read `license_id` on the specific dataset before using it.** The portal hosts
datasets from many ministries and municipalities, and they do not all carry the same
terms. A dataset with a blank or unrecognized license was not used.

Note: `data.gov.tn` itself has an incomplete TLS certificate chain, but
`catalog.data.gov.tn` (the CKAN backend that serves the actual data) works normally.
The portal is also intermittently slow - downloads need retry with backoff.

### openbaladiati.tn — municipal open data

Municipality-level datasets (many under `cc-zero`) surface through the same catalog
search. Coverage is per-commune and patchy, but for the communes that publish, the data
is detailed. Not yet used in this repository.

---

## Sources deliberately NOT used

**Google Maps, TripAdvisor, Foursquare, Yelp, and commercial business directories.**

Their terms of service prohibit bulk extraction and redistribution, and their database
contents are protected. Scraping them would produce data this project **cannot legally
publish** - which would compromise the licensing of the entire repository, not just the
scraped file.

This is a firm constraint, not a preference. A smaller dataset that can be freely reused
is worth more than a larger one that cannot be published.

If you want data from such a source, the correct route is to check whether they offer an
API whose terms permit redistribution, and to comply with those terms.

---

## Practical notes for contributors

### Matching Arabic place names

Joining an official Tunisian dataset to this repository's geography files by name is
harder than it looks. Names must be normalized for:

- **Diacritics** (harakat).
- **The definite article** - it appears inconsistently, and on *any* token, not just the
  first (compare the Arabic for "Sousse Jaouhara" written with and without it).
- **Letter variants** - alif forms, final ya/alif maqsura, ta marbuta vs ha.
- **Invisible Unicode bidi marks** (U+200B-U+200F, U+202A-U+202E). These are present in
  OSM data and are invisible in every editor, so a mismatch looks impossible to explain.
  306 such characters were found and removed from this repository's files.

Even after normalization a short alias table is needed for genuine spelling variants.

### Prefer coordinates over names

Where a source provides coordinates, assign the record to a delegation by
point-in-polygon rather than by name matching. It is far more reliable, and it is what
every coordinate-bearing dataset here does.

---

## How to document a source

When you add a dataset, add a Markdown file in this folder with the same name as the
dataset:

```
data/geography/governorates.json  →  sources/governorates.md
```

Use this template:

```markdown
# <dataset name>

- **Dataset file:** data/<folder>/<file>
- **Source:** <name of the source>
- **URL:** <link>
- **License:** <license name, or "unclear" / "permission granted by ...">
- **Retrieved:** <YYYY-MM-DD>
- **Method:** <how it was obtained — manual entry, official export, API, etc.>

## Notes

<Anything relevant: coverage, known gaps, how accurate it is, what was changed or
cleaned, whether it needs periodic updating.>
```

Keep it short. A few honest lines are more useful than a long vague description.

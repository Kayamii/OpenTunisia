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

### openculture.gov.tn / agridata.tn

Two further live portals whose resources are indexed in the same national catalog.
`agridata.tn` carries agricultural and water data (olive mills, GDAs, collection
centres); `openculture.gov.tn` carries cultural institutions, museums and festivals,
much of it geolocated. Both are in use here.

### openbaladiati.tn — municipal open data (DEAD)

Municipality-level datasets (pharmacies, bakeries, cafés, parking, per commune, many
under `cc-zero`) are still **indexed** in the national catalog, but the host no longer
serves them: every resource URL returns **HTTP 404**, and `app.openbaladiati.tn` does not
respond at all. 40 resources were probed; all failed.

Be careful here — the failing downloads return an **HTML error page with HTTP 200**, so a
naive fetch silently saves a web page as if it were a CSV. Always check that a downloaded
file does not begin with `<!doctype html`.

If this host is restored, it is the single best remaining source of commune-level POI
data for Tunisia.

---

## What belongs in this repository

**Things that exist and can be found.** A pharmacy, a school, a museum, a bus station, a
water user association, a doctor's practice — something a person or an application could
go to, look up, or point at on a map.

### Not included: statistics and time series

The Tunisian open data portals publish a large volume of **statistics** — around 1,340 of
the openly licensed datasets are counts, budgets, subscriber numbers, production figures,
yearly evolutions. None of it is imported here.

That is a deliberate scope decision, not an oversight:

- It goes stale. A directory entry stays useful for years; a 2019 subscriber count does
  not.
- It answers a different question. "How many libraries does Manouba have?" is a
  statistics question. "Where are they?" is what this repository is for.
- It would bury the useful data. Tens of thousands of statistical rows would swamp the
  directory records people actually come here for.

Where a statistics publication happened to contain a **list of named facilities**, the
names were extracted and the numbers left behind — see `public-libraries.md` for an
example.

If someone wants Tunisian statistics, the portals themselves serve that need well, and
`sources/README.md` documents how to query them.

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

## Collection status

The realistic open sources for Tunisia have been swept:

| Source | Status |
|---|---|
| OpenStreetMap | **Exhausted** for named features in these categories |
| data.gov.tn catalog | **All 2,698 datasets enumerated**; the ~159 directory-type ones collected |
| agridata.tn | Collected |
| openculture.gov.tn | Collected |
| openbaladiati.tn | **Dead** — all resources 404 |

Of 274 directory-type resources identified, **269 were downloaded**. Five could not be
retrieved after repeated attempts with long timeouts and retries:

- *Liste des gouvernorats en Tunisie* — HTTP 403 (and redundant; the repository already
  has all 24 governorates from OSM)
- *Liste des Institutions publiques de prise en charge* — no response
- *Liste des divisions de promotion sociale* — no response
- Two per-governorate social promotion unit files (Sousse, Mahdia) — no response

None of these would change the shape of the data; the same facility types are already
covered for other governorates. They are recorded here so a future contributor can retry
rather than rediscover the gap.

### What remains uncollected on purpose

Roughly **1,340 openly licensed datasets** on the live portals are statistics, not
directories. See "What belongs in this repository" above.

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

# Olive oil mills (huileries)

- **Dataset file:** data/businesses/olive-oil-mills.json
- **Source:** agridata.tn / data.gov.tn, regional agricultural development commissions
  (CRDA), aggregated on the national open data portal
- **URL:** https://catalog.agridata.tn, discovered via
  `https://catalog.data.gov.tn/api/3/action/package_search?q=huilerie`
- **License:** Licence Nationale de Données Publiques Ouvertes (LNDPO-TN)
- **Retrieved:** 2026-08-21
- **Method:** 34 per-governorate XLSX/XLS files downloaded from the portal and normalized
  into one schema.

## What this is

Olive oil is one of Tunisia's defining industries. Each governorate's agricultural
commission publishes its own list of mills. **This dataset merges 11 governorates'
publications into a single normalized file.**

## Two kinds of record, read this first

The source publications are inconsistent: some list individual mills by name, others
publish only per-delegation totals. Both are preserved and distinguished by the
`record_type` field:

| `record_type` | Records | Meaning |
|---|---:|---|
| `individual_mill` | 141 | One named mill, with its own capacity |
| `delegation_summary` | 327 | An aggregate count for a whole delegation |

**Do not sum the two together** you would double-count. Filter on `record_type` first.

## Fields

| Field | Meaning |
|---|---|
| `name` | Mill name or owner, individual records only |
| `record_type` | `individual_mill` or `delegation_summary` |
| `year` | Reference year of the source publication (2017–2024) |
| `governorate_code` / `governorate` | Joins to `governorates.json` |
| `delegation` / `delegation_code_geo` | Joins to `delegations.json`, where matched |
| `delegation_name_source` | The delegation string exactly as published |
| `mill_count` | Number of mills (summary rows) |
| `processing_capacity_t_per_day` | Crushing capacity, tonnes/day |
| `storage_capacity_t` | Storage capacity, tonnes |
| `mill_type` | e.g. تقليدية (traditional), as published |
| `zone` | Industrial zone or locality, where given |
| `source_dataset` | Which portal dataset the row came from |

## Caveats

- **No coordinates.** None of the source files publish latitude/longitude. Records are
  located administratively only.
- **11 of 24 governorates.** Only these publish mill lists: Sousse, Ariana, Nabeul,
  Gabès, Siliana, Médenine, Kef, Ben Arous, Monastir, Mahdia, Kasserine. Notable
  olive-producing governorates like Sfax are **missing** because they do not publish.
- **327 of 468 records have a matched delegation.** The rest kept
  `delegation_name_source` so nothing is lost.
- **Years differ between governorates** (2017 to 2024). Always read `year`, this is not
  a single-year snapshot.
- Aggregate rows labelled "المجموع" / "Total" in the sources were removed, as were
  numeric values misparsed as names. One file failed to parse and was skipped.
- Mill names are mostly Arabic; some are French.

## Attribution

LNDPO-TN requires attribution to the data producer and the date of the data used.

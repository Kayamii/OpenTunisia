# Water user associations and agricultural organizations

- **Dataset file:** data/services/water-and-agricultural-groups.json
- **Source:** agridata.tn / data.gov.tn — Ministry of Agriculture, regional commissions
  (CRDA), ODESYPANO
- **License:** Licence Nationale de Données Publiques Ouvertes (per record, in `license`)
- **Retrieved:** 2026-08-21
- **Method:** XLSX/CSV lists downloaded from the portals and normalized into one schema.

## What a GDA is

A **GDA** (Groupement de Développement Agricole / مجمع التنمية الفلاحية) is a local water
user association. They manage drinking-water supply and irrigation networks across rural
Tunisia, and are a real part of the country's infrastructure that appears in no map data.

## Contents

**2,709 records** across **all 24 governorates**:

| `category` | Records | What it is |
|---|---:|---|
| `drinking_water_gda` | 1,305 | Drinking-water user associations |
| `irrigation_gda` | 1,198 | Irrigation-network associations (public irrigated perimeters) |
| `organic_operator` | 132 | Certified organic agricultural operators |
| `mixed_gda` | 63 | Associations covering both water and irrigation |
| `extension_unit` | 8 | Cellules territoriales de vulgarisation (advisory units) |
| `dairy_processor` | 3 | Milk transformation companies |

Distribution follows rural need rather than mapping activity: Kasserine 323, Kairouan
247, Gafsa 169, Sfax 165, Sidi Bouzid 141.

## Fields

`name`, `category`, `governorate_code`, `governorate`, plus where available:
`delegation` / `delegation_code_geo`, `phone`, `lat` / `lon`, `region`, `license`,
`source_dataset`.

## Caveats

- **545 of 2,709 have a delegation.** Most source files give the governorate only.
- **Only 8 records have coordinates** (the extension units). GDAs are published without
  geography beyond an administrative label.
- **137 have a phone number.**
- Names are predominantly Arabic; organic operators and extension units are Latin script.
- Some source files are per-year snapshots; where a group appears in several files it is
  stored once, deduplicated on category + normalized name + governorate.

## A correction worth recording

An earlier build let a delegation guessed from the **record's own name** override the
governorate stated in the source, producing **70 contradictions** — a GDA named
"سيدي البشير" in a Bizerte file was assigned to Sidi El Béchir in Tunis, because the name
matches a delegation elsewhere in the country.

The rule now is: **the governorate column is authoritative.** A delegation inferred from
a name is discarded unless it sits inside that governorate. This dropped matched
delegations from 615 to 545 and brought contradictions to zero. Fewer, but correct.

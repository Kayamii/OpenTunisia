# Private specialist doctors

- **Dataset file:** data/services/private-specialist-doctors.json
- **Source:** data.gov.tn — *Annuaires des médecins spécialistes dans le secteur privé*
  (Ministry of Health)
- **License:** **Creative Commons Attribution (CC-BY)** as declared by the publisher
- **Retrieved:** 2026-08-21
- **Method:** Direct JSON download from the portal. No scraping.

## What this is

The **official public directory of private-sector specialist doctors** in Tunisia —
2,220 practitioners with their specialty, practice, address and phone number.

This is a professional directory published by the Ministry so that patients can find a
specialist. It lists practitioners in their professional capacity at their place of
practice; it contains no personal or medical information beyond what the Ministry
publishes for that purpose.

## Why it matters here

It has **the best contact coverage of any dataset in this repository**:

| | Coverage |
|---|---|
| Phone or mobile | **2,117 of 2,220 (95%)** |
| Delegation | 1,779 (80%) |
| Specialty | ~100% |

For comparison, the OpenStreetMap files carry a phone number on about 4% of records.

## Contents

**2,220 doctors across 23 governorates.** Top specialties: Gynaecology-Obstetrics 400,
Paediatrics 253, Ophthalmology 176, Radiology 138, General Surgery 133, ENT 118,
Cardiology 112.

Distribution is concentrated where private practice is: Tunis 860, Sfax 316, Sousse 168.

## Fields

`name`, `specialty`, `practice_type` (individual practice, multidisciplinary clinic,
etc.), `sector` (always `private`), `governorate_code`, `governorate`, `delegation`,
`delegation_code_geo`, `locality`, `address`, `postcode`, `phone`, `mobile`, `fax`,
`email`, `license`, `source_dataset`.

Empty values in the source are omitted rather than stored as empty strings.

## Caveats

- **No coordinates.** The source gives a postal address only. Records are located
  administratively.
- **23 of 24 governorates** — one has no private specialists listed.
- **Private sector only.** Public-hospital doctors are not included; see
  `health-facilities-official.json` for public facilities.
- Names and addresses are uppercase in the source; names are title-cased here, addresses
  are kept verbatim so they remain searchable against the original.
- The directory's compilation date is not stated on the portal. Practitioners move and
  retire — **verify before relying on a specific entry.**
- `delegation` was matched from the source's own delegation label, constrained to the
  stated governorate. Zero governorate/delegation contradictions.

## Attribution

CC-BY requires attribution. Credit the **Ministère de la Santé / data.gov.tn**.

# Social promotion units and vocational training centres

- **Dataset file:** data/services/social-and-training-facilities.json
- **Source:** data.gov.tn. Ministry of Social Affairs (unités locales de promotion
  sociale) and Ministry of Vocational Training and Employment
- **License:** per record, in the `license` field (`cc-by`, LNDPO-TN)
- **Retrieved:** 2026-08-21
- **Method:** Per-governorate XLS/XLSX lists downloaded from the portal.

## What this is

Two kinds of public facility that people genuinely need to locate:

| `facility_type` | Records | What it is |
|---|---:|---|
| `social_promotion_unit` | 153 | Local social welfare offices (الوحدة المحلية للنهوض الإجتماعي), where citizens apply for social assistance |
| `vocational_training_centre` | 79 | Vocational training establishments |
| **Total** | **232** | across **23 governorates** |

## Contact coverage is exceptional

| Field | Coverage |
|---|---|
| Phone | **222 of 232 (96%)** |
| Email | 145 (63%) |
| Address | most records |

Only the private-doctors directory beats this. For comparison, the OpenStreetMap files
carry a phone number on about 4% of records.

## Fields

`name_ar`, `facility_type`, `governorate_code`, `governorate`, `delegation` and
`delegation_code_geo` (where matched), `address_ar`, `phone`, `mobile`, `fax`, `email`,
`sector` (training centres only), `license`, `source_dataset`.

## Caveats

- **Arabic only.** The sources publish no French or Latin-script names or addresses, so
  the fields are `name_ar` and `address_ar` to make that explicit.
- **No coordinates.** Addresses are free text; records are located administratively.
- **99 of 232 have a delegation.** Matched from the address text, constrained to the
  stated governorate. Zero governorate/delegation contradictions.
- Some source files are legacy `.xls` (OLE2) and needed `xlrd` rather than `openpyxl`.
  Several were also served with a `.csv` extension despite being Excel binaries, format is detected from the file's magic bytes, not its extension.

## A cleaning note

The sources use placeholder strings such as `..................` and a lone `˗`
(U+02D7 modifier minus) where a value is unknown. Stored naively these become junk
records, one facility ended up with `"email": "˗"`.

Fields matching only punctuation, dashes or whitespace are now discarded, and emails must
match a real address pattern before being kept. This removed 20 fake email values.

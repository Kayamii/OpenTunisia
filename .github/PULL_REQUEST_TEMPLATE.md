## What does this change?

<!-- One or two sentences. e.g. "Adds 340 pharmacies for Sfax from the Ministry of
     Health open data portal" or "Corrects three schools that had swapped lat/lon". -->

## Where did the data come from?

<!-- Required for any new or changed data. Skip only for documentation or code. -->

- **Source:**
- **URL:**
- **Licence:**
- **Retrieved:** <!-- YYYY-MM-DD -->

<!-- If the licence is unclear, say so — better to discuss it than to merge data we
     cannot legally publish. See CONTRIBUTING.md. -->

## Checklist

- [ ] `python scripts/validate.py` passes locally
- [ ] Any new dataset has a matching file in `sources/`
- [ ] Ran `python viewer/build.py` if data under `data/` changed
- [ ] Records use `governorate_code`, and `delegation_code_geo` where known
- [ ] Fields that are unknown are omitted, not left empty

## Anything reviewers should know?

<!-- Known gaps, governorates not covered, records you were unsure about. Honesty
     about limitations is more useful than a clean-looking PR. -->

# AGENTS.md

Static GitHub Pages site: `index.html` renders `data/models.json`.

Refresh data: `python3 fetch.py` (needs the `hf` CLI). Constants `SCAN`, `TOP`, `DAYS` at the top of the script.

**RESPECT THE HUGGING FACE API RATE LIMITS** (https://huggingface.co/docs/hub/rate-limits). Run `fetch.py` once, never in a loop or in parallel. Do not bulk-download model cards or files without the user asking; if you must, keep it sequential or low concurrency and cache results.

`data/train_code.txt` is curated by hand (models whose card links training/fine-tuning code). Edit it, then rerun `fetch.py`.

`data/cards/<publisher>__<model>/README.md` caches the model cards of the listed models (snapshot of 2026-10-11; one model missing). Use it instead of re-downloading cards; fetch only new ids, sequentially.

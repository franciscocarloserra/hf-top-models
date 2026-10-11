"""Fetch the most-liked Hugging Face models created in the last year -> data/models.json

WARNING: RESPECT THE HUGGING FACE API RATE LIMITS.
This makes a handful of paginated calls to the public Hub API. Do not loop it,
do not run it in parallel, do not raise SCAN without reason. Once a day is plenty.
https://huggingface.co/docs/hub/rate-limits

Needs the `hf` CLI (pip install huggingface_hub).
"""
import json, subprocess, datetime, pathlib

SCAN = 4000   # top-liked models fetched before the date filter
TOP = 300
DAYS = 365

DATA = pathlib.Path(__file__).with_name("data")

print("Respect the Hugging Face API rate limits: https://huggingface.co/docs/hub/rate-limits")
out = subprocess.run(["hf", "models", "ls", "--sort", "likes", "--limit", str(SCAN),
                      "--expand", "createdAt,likes,downloads,pipeline_tag,safetensors,tags",
                      "--format", "json"], capture_output=True, text=True, check=True).stdout

today = datetime.date.today()
since = (today - datetime.timedelta(days=DAYS)).isoformat()
train = set((DATA / "train_code.txt").read_text().split())  # hand-checked: card links training code

models = []
for m in json.loads(out):
    if m["created_at"] < since:
        continue
    publisher, name = m["id"].split("/", 1)
    models.append({
        "id": m["id"],
        "publisher": publisher,
        "model": name,
        "type": m.get("pipeline_tag"),
        "params": (m.get("safetensors") or {}).get("total"),
        "likes": m["likes"],
        "downloads_30d": m["downloads"],
        "created": m["created_at"][:10],
        "train_code": m["id"] in train,
        "papers": [t[6:] for t in m.get("tags") or [] if t.startswith("arxiv:")],
    })
    if len(models) == TOP:
        break

(DATA / "models.json").write_text(json.dumps(
    {"generated": today.isoformat(), "since": since, "models": models}, indent=1))
print(len(models), "models ->", DATA / "models.json")

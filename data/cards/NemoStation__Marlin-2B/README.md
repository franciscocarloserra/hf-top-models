---
license: apache-2.0
language:
  - en
base_model: Qwen/Qwen3.5-2B
pipeline_tag: video-text-to-text
library_name: transformers
tags:
  - video
  - multimodal
  - video-captioning
  - temporal-grounding
  - qwen
  - text-generation
  - VLM
extra_gated_heading: "Access Marlin 2B"
extra_gated_description: "Marlin 2B is free to use. Please share a few details so we can keep you posted on new releases and gather feedback."
extra_gated_fields:
  Full name: text
  Affiliation or company: text
  What do you want to use Marlin for?: text
extra_gated_button_content: "Get access to Marlin 2B"
---

<img src="https://huggingface.co/datasets/NemoStation/marlin-assets/resolve/main/marlin.svg" width="40" align="left" alt="Marlin" />

<h1>&nbsp;<font size="5.5">Marlin: a tiny VLM to extract structured information from videos</font></h1>
<br clear="left"/>

Marlin is a 2B video VLM tuned for the two questions developers actually like ask their videos: **what** is happening, and **when?** It produces structured Scene + Event captions with second-precise timestamps, and resolves natural-language queries to span-grounded (start, end) ranges in the video. At 2B params, it is the strongest open model in its weight class on dense captioning (DREAM-1K, CaReBench) and natural-language temporal grounding (TimeLens-Bench), and competitive with Gemini-2.5 at a fraction of the cost.

## ✨ Key features

- 📝 **State-of-the-art dense captioning at 2B.** Tops the CaReBench leaderboard and sits between Tarsier-34B and Gemini-1.5-Pro on DREAM-1K, two of the most rigorous fine-grained video-captioning benchmarks in the community.
- ⏱️ **Best-in-class temporal grounding at 2B.** On Tencent's TimeLens-Bench (Charades / ActivityNet / QVHighlights), Marlin beats Qwen2.5-VL-7B by +6.4 mIoU and matches Gemini-2.0-Flash.
- 🔥 **Built to deploy.** 2B params, vLLM- and swift-deploy-compatible, runs on a single consumer GPU. Same canonical training prompt at inference time, no special wrappers required.
- 🛠️ **Developer-friendly.** Standard HF `transformers` API, two convenience methods (`.caption`, `.find`) that return parsed dicts, raw `.generate()` access for custom prompts, Gradio demo ready out of the box.

<p>
  <a href="https://vlm.nemostation.com/">
    <img src="https://img.shields.io/badge/▶_Try_it_live-Gradio_demo-FF6B35?style=for-the-badge" alt="Try it live"/>
  </a>
  &nbsp;
  <a href="https://nemostation.com/">
    <img src="https://img.shields.io/badge/🐟_Developed_by-NemoStation_team-7DD3FC?style=for-the-badge" alt="Developed by NemoStation team"/>
  </a>
</p>

Need Marlin tailored to your specific video processing needs? Our team can help with custom fine-tuning and integrations — [**contact us**](mailto:aryan@letsnemo.com?subject=Interested%20in%20fine-tuning%20Marlin%202B%20for%20my%20use%20case&body=Hi%20guys%2C%0A%0AI%27d%20love%20to%20chat%20about%20using%20Marlin%202B%20for%20%5Bbriefly%20describe%20your%20use%20case%5D.%0A%0AQuick%20context%3A%0A%E2%80%A2%20Use%20case%3A%0A%E2%80%A2%20Type%20of%20videos%20%2F%20volume%3A%0A%E2%80%A2%20What%20I%27d%20want%20fine-tuned%20or%20integrated%3A%0A%0ADo%20you%20have%20a%20few%20minutes%20for%20a%20call%20this%20week%3F%0A%0AThanks%21) ✉️

## Examples

<img src="https://huggingface.co/datasets/NemoStation/marlin-assets/resolve/main/caption_example.jpg" alt="Marlin caption mode example" width="100%"/>
<img src="https://huggingface.co/datasets/NemoStation/marlin-assets/resolve/main/find_example.jpg" alt="Marlin find mode example" width="100%"/>

## 🧠 Model &amp; training

**Architecture.** Marlin is a fine-tune of Qwen3.5-2B with the video-capable visual tower kept intact. The model exposes two modes (`caption` and `find`) through custom modeling code in `modeling_marlin.py`, which wraps a single canonical training prompt per mode and parses the structured output into typed Python dicts.

**Training data.** We assembled a high-quality training corpus by combining sparse public annotations (ActivityNet, LSMDC, Charades, Charades-Ego, TREC-VTT, WebVid-10M, HC-STVG, VidSTG, TimeLens) with dense re-annotations from **Gemini-3-Flash in thinking mode**, followed by targeted human review on the highest-impact splits. The teacher pipeline was tuned specifically to produce *temporally grounded atomic events and actions*, with explicit `<start-end>` boundaries per claim rather than free-form prose. The final mix is **~400K high-quality clip-level annotations** for caption mode and a separate grounding-tuned split for find mode.

**Training technique.** Two-stage post-training on a single H100. Stage 1 is supervised fine-tuning (SFT) on the curated dataset above, with a fixed canonical prompt per mode and Tarsier-schema output formatting. Stage 2 is preference optimization via **SimPO** (Simple Preference Optimization) on a teacher-distilled preference set. For each clip, candidate completions from the SFT checkpoint are scored against a stronger Gemini-3-Flash judge using a rich rubric (factual accuracy, completeness, temporal alignment), and the resulting win/lose pairs align Marlin without a reference model, making it cheaper and more stable than DPO at this scale. ✏️ Recipe paper coming soon.

## 🏆 Evaluation

Marlin is, to our knowledge, the **strongest open video VLM in its weight class** on both axes that matter for video analysis in production: fine-grained dense captioning and natural-language temporal grounding. The three-panel figure below summarises the trajectory from the Qwen3.5-2B base, through Marlin-SFT, to Marlin-SimPO (the release checkpoint) across:

- **CaReBench** — [CaReBench: A Fine-Grained Benchmark for Video Captioning and Retrieval](https://arxiv.org/abs/2501.00513)
- **DREAM-1K** — [Tarsier: Recipes for Training and Evaluating Large Video Description Models](https://arxiv.org/abs/2407.00634)
- **TimeLens-Bench** — [TimeLens: Rethinking Video Temporal Grounding with Multimodal LLMs](https://arxiv.org/abs/2512.14698)

<img src="https://huggingface.co/datasets/NemoStation/marlin-assets/resolve/main/release_marlin_3up.png" alt="Marlin 2B trajectory across CaReBench, DREAM-1K, and TimeLens-Charades" width="100%"/>

Same training pipeline on every panel; same evaluation harness across all rows. On captioning, Marlin closes the gap to its Gemini-2.5-Flash teacher to within 0.21 / 0.43 of 10. On temporal grounding, Marlin sits on the Pareto frontier in the 2B band and matches Gemini-2.5-Flash (non-thinking). Specialised 7B+ models on these benchmarks (TimeLens-7B/8B, MiMo-VL, Time-R1) still carry the upper frontier becasue they have task-specific data during training; Marlin is the strongest *general-purpose* model on these tasks at 2B.

## Quickstart

The model ships with custom modeling code that adds two convenience methods (`caption` and `find`) directly to the model object. Loading with `trust_remote_code=True` returns a ready-to-use instance:

```python
import torch
from transformers import AutoModelForCausalLM

marlin = AutoModelForCausalLM.from_pretrained(
    "NemoStation/Marlin-2B",
    trust_remote_code=True,
    dtype=torch.bfloat16,
    device_map={"": "cuda"},
)
marlin.compile()  # optional — wraps torch.compile, faster after first call
```

### Caption mode — `marlin.caption()`

```python
result = marlin.caption("video.mp4")

print(result["caption"])  # full raw caption text (Scene: ... Events: ...)
print(result["scene"])    # parsed Scene paragraph
for ev in result["events"]:
    print(f"<{ev['start']:.1f} - {ev['end']:.1f}> {ev['description']}")
```

Optional kwargs:
- `max_new_tokens=2048` (default) — generation token cap.
- `prompt=None` — override the canonical training prompt (almost always leave as `None`).
- `do_sample=False`, `temperature=1.0`, `top_p=1.0` — sampling controls.

The model was trained on dense captions of variable length and will produce as much detail as it sees fit within `max_new_tokens`.

### Find mode — `marlin.find()`

```python
result = marlin.find("video.mp4", event="a person enters the room")

print(result["raw"])        # "From 14.3 to 18.2." raw model output
print(result["span"])       # (14.3, 18.2) tuple in seconds, or None on parse failure
print(result["format_ok"])  # True if output matched the trained format
```

## System requirements

- `transformers >= 5.7.0` (for native `qwen3_5` architecture)
- `torch >= 2.11.0`
- `torchcodec` (video decoding)
- `qwen-vl-utils >= 0.0.14`
- `av` (torchcodec system dep)
- `pillow`

Install:
```bash
pip install "transformers>=5.7.0" "torch>=2.11.0" torchcodec "qwen-vl-utils>=0.0.14" av pillow
```

## Video preprocessing

The custom modeling code sets these env vars internally (matches the training-time setup). If you want to override them, set them in your shell **before** importing transformers:

| Env var | Default | What it does |
|---|---|---|
| `FORCE_QWENVL_VIDEO_READER` | `torchcodec` | Video decoder backend |
| `VIDEO_MAX_PIXELS` | `200704` | Max pixels per frame (~448×448) |
| `FPS` | `2.0` | Frame sampling rate |
| `FPS_MAX_FRAMES` | `240` | Cap on total frames (covers ~2 min videos) |
| `FPS_MIN_FRAMES` | `4` | Floor for very short videos |

## Capabilities

- **Caption** (Mode 1): produces `Scene: <paragraph>` + `Events: <X.X - Y.Y> <description>` format.
- **Find** (Mode 2): given a natural-language event query, returns `From X.X to Y.Y.`.
- **Multichunk reasoning** (limited in this checkpoint): `<think>`-style chunked-video reasoning with explicit chunk-time → source-time arithmetic. Not directly exposed via `.caption()` / `.find()` — use a raw prompt if needed.

## Training data

- **Caption mode**: ANet, LSMDC, YC2, COIN, GOT-10k/LaSOT — Gemini-generated dense captions.
- **Find mode**: HC-STVG, VidSTG, TimeLens — ground-truth spans + multichunk variants.

## Advanced — raw inference

If you want to bypass the helper methods and call `generate()` directly (e.g., for custom prompts), the standard transformers pattern works:

```python
import torch
from transformers import AutoModelForCausalLM, AutoProcessor

model = AutoModelForCausalLM.from_pretrained(
    "NemoStation/Marlin-2B",
    trust_remote_code=True,
    dtype=torch.bfloat16,
    device_map={"": "cuda"},
)
processor = AutoProcessor.from_pretrained("NemoStation/Marlin-2B", trust_remote_code=True)

messages = [{"role": "user", "content": [
    {"type": "video", "video": "video.mp4"},
    {"type": "text", "text": "Your custom prompt here"},
]}]
inputs = processor.apply_chat_template(
    messages, tokenize=True, add_generation_prompt=True,
    return_tensors="pt", return_dict=True,
).to(model.device)

with torch.inference_mode():
    out = model.generate(**inputs, max_new_tokens=512, do_sample=False)
out = out[:, inputs["input_ids"].shape[1]:]
text = processor.batch_decode(out, skip_special_tokens=True)[0]
print(text)
```

## Notes on output

The model emits a `<think>` token at the start of every response (an artifact of training with `add_non_thinking_prefix=True`). The `.caption()` and `.find()` methods strip this automatically. If you're using `generate()` directly, strip `<think>...</think>` (with or without closing tag) from the start of the output.

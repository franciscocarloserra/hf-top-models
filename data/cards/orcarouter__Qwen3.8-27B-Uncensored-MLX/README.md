---
license: apache-2.0
base_model: Qwen/Qwen3.8-27B
base_model_relation: quantized
pipeline_tag: image-text-to-text
library_name: mlx
language:
  - en
  - zh
tags:
  - abliterated
  - qwen3.8
  - qwen3_5
  - uncensored
  - ai-red-team
  - red-teaming
  - mlx
  - apple-silicon
  - quantized
  - 4-bit
  - 8-bit
  - vision-language
  - image-text-to-text
  - multimodal
  - function-calling
  - reasoning
---

<div align="center">

<a href="https://www.orcarouter.ai" target="_blank">
  <img src="https://www.orcarouter.ai/orca-logo-classic.png" alt="OrcaRouter" width="110">
</a>

<h1>Qwen3.8-27B-Uncensored-MLX</h1>

<p><em>An abliterated (refusal-removed) MLX build of Qwen's Qwen3.8-27B — 2 / 4 / 6 / 8-bit for Apple Silicon</em></p>


<!-- orcacyber-promo:start -->
<table>
<tr>
<td width="150" style="vertical-align: middle;">
<div align="center"><a href="https://www.orcarouter.ai/models/orca/orcacyber-zero-1.0"><img src="https://www.orcarouter.ai/orca-logo-classic.png" width="90" alt="OrcaCyber Zero 1.0"></a></div>
</td>
<td>
<p>🛡️ <strong>New from Orca &mdash; <a href="https://www.orcarouter.ai/models/orca/orcacyber-zero-1.0">OrcaCyber Zero 1.0</a></strong></p>
<p>Post-trained for cybersecurity: vulnerability analysis, vulnerability reproduction, red teaming &amp; offensive-security research. <strong>98.07% pass@1 on CyberGym Level&nbsp;1</strong> &middot; 1M context &middot; function calling &middot; OpenAI-compatible API.</p>
<p><a href="https://www.orcarouter.ai/models/orca/orcacyber-zero-1.0"><img src="https://img.shields.io/badge/Try%20it%20on%20OrcaRouter%20%E2%86%92-FF6A00?style=for-the-badge&amp;labelColor=0B1F3A" alt="Try it on OrcaRouter"></a></p>
</td>
</tr>
</table>
<!-- orcacyber-promo:end -->

<p>
<a href="https://www.orcarouter.ai"><img src="https://img.shields.io/badge/Website-orcarouter.ai-1E6FEB" alt="Website"></a>
<a href="https://www.orcarouter.ai/models"><img src="https://img.shields.io/badge/OrcaRouter-Model%20Catalog-2EA043" alt="Model Catalog"></a>
<a href="https://www.orcarouter.ai/models/qwen/qwen3.8-27b"><img src="https://img.shields.io/badge/OrcaRouter-Model%20Card-6F42C1" alt="Model Card"></a>
<a href="https://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-4C8BF5" alt="License"></a>
<img src="https://img.shields.io/badge/Format-MLX-00A67E" alt="MLX">
<img src="https://img.shields.io/badge/Quants-2%20|%204%20|%206%20|%208--bit-FF8800" alt="Quants">
<img src="https://img.shields.io/badge/Vision-preserved%20BF16-9B59B6" alt="Vision">
</p>

<p><strong>One Gateway. Every Model.</strong> — Route Smarter · Ship Safer · Spend Less.</p>

<p>
<a href="https://www.orcarouter.ai">Website</a> ·
<a href="https://www.orcarouter.ai/models">Model Catalog</a> ·
<a href="https://www.orcarouter.ai/models/qwen/qwen3.8-27b">Model API</a> ·
<a href="https://github.com/Continuum-AI-Corp">GitHub</a> ·
<a href="https://discord.gg/yAh6Tex6kx">Discord</a> ·
<a href="https://x.com/OrcaRouter">X</a>
</p>

</div>

---

> An **abliterated** (refusal-removed) build of
> [`Qwen/Qwen3.8-27B`](https://huggingface.co/Qwen/Qwen3.8-27B) — a 27B-parameter dense,
> hybrid-attention (Gated DeltaNet linear + full attention) native vision-language model with
> thinking control, tool-calling and an MTP head — quantized to **MLX** format for
> **Apple Silicon**. Four precisions are provided — **2 / 4 / 6 / 8-bit** (affine, group
> size 64) — each as a subfolder, with the **4-bit** build also mirrored at the repo root so
> that `orcarouter/Qwen3.8-27B-Uncensored-MLX` loads directly in LM Studio and other tools
> that treat a repo as a single model. The **vision tower, norms and conv layers are kept in BF16**;
> only the language-model linear weights (including `embed_tokens` / `lm_head`) are quantized.
> Browse all models in the [OrcaRouter Model Catalog](https://www.orcarouter.ai/models).
> This model is deployed as API [here](https://www.orcarouter.ai/models/qwen/qwen3.8-27b).

---

## ⚠️ Disclaimer & risks — read before use

This model has had its **safety alignment substantially removed** via *abliteration*
(orthogonalizing the refusal direction out of the residual stream). As a direct consequence:

- **It will comply with harmful, unethical, offensive, or illegal requests** that the
  original `Qwen3.8-27B` would refuse. It has no meaningful built-in guardrails.
- It is released **strictly for legitimate research** — interpretability, AI-safety and
  refusal-mechanism study, red-teaming, robustness evaluation, and controlled experiments.
- **You assume full responsibility and liability** for how you use it and for everything it
  generates. Add your own safety, moderation and abuse-prevention layers before any deployment.
- Use must comply with the **[Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)**
  inherited from the base model, and all laws and regulations that apply to you.
- The authors and uploaders **accept no liability** for any misuse or harm. Outputs do **not**
  reflect the views of the uploaders or of Qwen / Alibaba.

### Specific risks

- **Harmful content on demand** — it will produce instructions for malware, exploits, weapons,
  fraud and other illegal or dangerous activity when asked.
- **No refusals** — jailbreak / safety probes "succeed" trivially; do not mistake this for a
  passing safety evaluation.
- **Confident falsehoods & bias** — it can generate false, defamatory, biased or offensive text
  and present it authoritatively.
- **Expanded attack surface** — preserved **vision, tool-calling and 262K context** mean these
  risks extend to image understanding and autonomous / agentic use.
- **Quantization noise** — lower-bit builds (esp. **2-bit**) add instability on top of the above;
  outputs can be degraded or nonsensical.

### Intended use vs out of scope

- **Intended:** AI-safety and interpretability research, refusal-mechanism study, red-teaming,
  guardrail and robustness evaluation, controlled academic experiments.
- **Out of scope:** any deployment to end users, minors, or production **without your own
  moderation / safety layer**; any unlawful, harmful, or rights-infringing use.

By downloading or using this model you acknowledge and accept the above.

---

## Available quantizations

| Folder | Bits/weight | Size | Shards | Min Mac RAM | Quality vs BF16 source |
|---|---|---|---|---|---|
| `8-bit/` | 8.627 | ~27.5 GB | 6 | 32 GB | **Near-lossless** — recommended for quality |
| `6-bit/` | 6.661 | ~22 GB | 5 | 24–32 GB | Excellent — strong quality/size balance |
| `4-bit/` | 4.695 | ~15 GB | 3 | 24 GB | Very good — recommended default |
| `2-bit/` | 2.729 | ~8.7 GB | 2 | 16 GB | ⚠️ **Severely degraded — archival only** |

> **2-bit warning:** at 27B, 2-bit quantization collapses generation quality (repetition
> loops, garbled output). It is included only as an extreme-compression archive; **do not use
> it for real work** — prefer 4-bit or higher.

> **Repo root = `4-bit/`.** The root of this repo holds a copy of the 4-bit build, so
> `--model orcarouter/Qwen3.8-27B-Uncensored-MLX` (no subfolder) resolves to 4-bit. Use the
> subfolder paths to pick any other precision.

---

## Verification & test results

All builds were quantized from the same abliterated BF16 source and verified numerically
(dequantized weights vs. source) plus tested by generation on GPU.

| Precision | Numerical fidelity (cosine) | Text / Chinese / Code | Refusal probes | Vision |
|---|---|---|---|---|
| **8-bit** | cos **0.9997** | ✅ | ✅ 0 refusals | ✅ |
| **6-bit** | cos **0.9996** | ✅ | ✅ 0 refusals | ✅ |
| **4-bit** | cos **0.996** | ✅ | ✅ 0 refusals | ✅ |
| **2-bit** | cos **0.92** | ⚠️ breaks down | ⚠️ garbled (not refusal) | partial |

- **Uncensored preserved:** red-team probes (exploit walkthrough, controversial argument)
  return substantive content with **zero refusals** on 4 / 6 / 8-bit.
- **Multimodal preserved:** shapes, colors, position, background and text in a probe image are
  described correctly on 4 / 6 / 8-bit.
- **Speed:** ~**32–37 tok/s** steady-state on a single H200 (MLX CUDA backend). MLX's native
  target is Apple Silicon (Metal).

> Note: on **6-bit**, mlx's offline `mx.dequantize` mis-unpacks these weights (a library edge
> case), so correctness is verified by clean generation — inference is unaffected.

---

## Usage (mlx-vlm, Apple Silicon)

```bash
pip install -U mlx-vlm    # needs mlx-vlm >= 0.6.13, mlx >= 0.32

# download one precision (e.g. 4-bit) from the subfolder
hf download orcarouter/Qwen3.8-27B-Uncensored-MLX --include "4-bit/*" \
    --local-dir ./Qwen3.8-27B-Uncensored-MLX

# text
python -m mlx_vlm generate \
    --model ./Qwen3.8-27B-Uncensored-MLX/4-bit \
    --prompt "Explain quantum entanglement in one sentence." --max-tokens 256

# vision (image + text)
python -m mlx_vlm generate \
    --model ./Qwen3.8-27B-Uncensored-MLX/4-bit \
    --image path/to/image.png \
    --prompt "Describe this image." --max-tokens 256

# OpenAI-compatible server
python -m mlx_vlm server --model ./Qwen3.8-27B-Uncensored-MLX/4-bit --port 8080
```

On **Apple Silicon** the Metal backend is used automatically — no CUDA setup needed.
(On a Linux **CUDA** backend, vision requires `MLX_CUDA_USE_CUDNN_SDPA=0`; this does not
apply on macOS.)

---

## Multi-Token Prediction (MTP) — speculative decoding

This model has a native **MTP** head. In MLX, MTP is loaded as a **separate drafter** for
speculative decoding: the main model is loaded with the MTP weights stripped, and the drafter
is passed explicitly. The drafter lives in the [`mtp/`](./mtp) subfolder of this repo
(`model_type: qwen3_5_mtp`) and works with **any** main-model precision (4 / 6 / 8-bit).

> Setting an `mtp_enabled` flag on the main model alone does **nothing** — MLX needs the
> separate drafter passed via `--draft-model … --draft-kind mtp`.

```bash
# fetch a main-model precision (e.g. 6-bit) plus the MTP drafter
hf download orcarouter/Qwen3.8-27B-Uncensored-MLX --include "6-bit/*" "mtp/*" \
    --local-dir ./Qwen3.8-27B-Uncensored-MLX

# generate with MTP speculative decoding
python -m mlx_vlm generate \
    --model       ./Qwen3.8-27B-Uncensored-MLX/6-bit \
    --draft-model ./Qwen3.8-27B-Uncensored-MLX/mtp \
    --draft-kind mtp --draft-block-size 4 \
    --prompt "Explain quantum entanglement in one sentence." --max-tokens 256

# OpenAI-compatible server with MTP
python -m mlx_vlm server \
    --model       ./Qwen3.8-27B-Uncensored-MLX/6-bit \
    --draft-model ./Qwen3.8-27B-Uncensored-MLX/mtp \
    --draft-kind mtp --draft-block-size 4 --port 8080
```

**Requirements:** an mlx-vlm build with the `qwen3_5_mtp` drafter and `--draft-kind mtp`
(available on mlx-vlm `main`). MTP acceptance is lossless — with greedy decoding the output is
identical to running without the drafter, just fewer forward passes on accepted tokens. The
speedup is realized on Apple Silicon (Metal); one drafter serves all precisions.

---

## Usage (LM Studio)

Search for `orcarouter/Qwen3.8-27B-Uncensored-MLX` in LM Studio and download it — the repo
root is the 4-bit build, and the other precisions appear as separate download options.

Three things to get right:

1. **This repo is gated.** LM Studio downloads anonymously by default and will get an HTTP
   401. Accept the terms on the model page once, then paste a Hugging Face **read token**
   into LM Studio under *Settings → Integrations → Hugging Face*.
2. **Turn off KV cache quantization.** MLX vision models do not support it on this
   architecture, and loading fails during initialization if it is enabled
   ([mlx-engine#286](https://github.com/lmstudio-ai/mlx-engine/issues/286)).
3. **Pick a quant that fits.** 8-bit is ~29.5 GB on disk and wants a 64 GB Mac; 6-bit suits
   48 GB; **4-bit (~16 GB) is the right choice on a 32 GB Mac.** LM Studio's
   *"Likely too large"* badge is a RAM warning, not an error.

If you are on an older LM Studio MLX runtime, update it (*Settings → Runtime*): `qwen3_5`
support landed in mlx-vlm 0.6.x, and older runtimes cannot load this architecture at all.

---

## Model details

| | |
|---|---|
| **Base model** | [`Qwen/Qwen3.8-27B`](https://huggingface.co/Qwen/Qwen3.8-27B) |
| **Architecture** | `Qwen3_5ForConditionalGeneration` — 64 layers, hidden 5120, hybrid **Gated DeltaNet** (48 linear + 16 full attention, interval 4), native VL tower |
| **Modification** | Abliteration (refusal-direction removal), then **MLX affine quantization** |
| **Quantization** | MLX **affine**, group size **64**, per-precision 2 / 4 / 6 / 8-bit |
| **Kept in BF16** | vision tower, all norms, linear-attention `conv1d` |
| **Quantized** | language-model linear layers incl. `embed_tokens` and `lm_head` |
| **Context** | 262,144 tokens |

---
license: apache-2.0
base_model: Qwen/Qwen3.8-27B
base_model_relation: quantized
pipeline_tag: image-text-to-text
library_name: gguf
language:
  - en
  - zh
tags:
  - abliterated
  - qwen
  - qwen3
  - qwen3.8
  - gguf
  - llama.cpp
  - uncensored
  - ai-red-team
  - red-teaming
  - vision-language
  - mmproj
  - mtp
  - function-calling
  - reasoning
---

<div align="center">

<a href="https://www.orcarouter.ai" target="_blank">
  <img src="https://www.orcarouter.ai/orca-logo-classic.png" alt="OrcaRouter" width="110">
</a>

<h1>Qwen3.8-27B-Uncensored-GGUF</h1>

<p><em>GGUF quants (2-bit → 16-bit) of the abliterated (refusal-removed) Qwen3.8-27B — for llama.cpp</em></p>


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
<img src="https://img.shields.io/badge/Format-GGUF-00A67E" alt="GGUF">
<img src="https://img.shields.io/badge/Quants-Q2__K%20%E2%86%92%20F16-FF8800" alt="Quants">
<img src="https://img.shields.io/badge/Vision-mmproj-9B59B6" alt="Vision">
</p>

<p><strong>One Gateway. Every Model.</strong> — Route Smarter · Ship Safer · Spend Less.</p>

<p>
<a href="https://www.orcarouter.ai">Website</a> ·
<a href="https://www.orcarouter.ai/models">Model Catalog</a> ·
<a href="https://www.orcarouter.ai/models/qwen/qwen3.8-27b">Model Card</a> ·
<a href="https://github.com/Continuum-AI-Corp">GitHub</a> ·
<a href="https://ollama.com/orcarouter">Ollama</a> ·
<a href="https://discord.gg/yAh6Tex6kx">Discord</a> ·
<a href="https://x.com/OrcaRouter">X</a>

</p>

</div>

---

> **GGUF conversions** of [`Qwen3.8-27B-Uncensored`](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8)
> — an **abliterated** (refusal-removed) build of Qwen's `Qwen3.8-27B`, a 27B dense hybrid-attention
> (Gated DeltaNet linear + full attention) native vision-language model with reasoning, tool-calling,
> and an MTP speculative-decoding head. These files run in **llama.cpp** (CPU / CUDA / Metal / ROCm),
> quantized from **2-bit to 16-bit**, with a separate **mmproj** file that restores **vision**.
> Browse all models in the [OrcaRouter Model Catalog](https://www.orcarouter.ai/models). Qwen3.8 27B is
> deployed as API [on OrcaRouter](https://www.orcarouter.ai/models/qwen/qwen3.8-27b).

---

## ⚠️ Disclaimer — read before use

This model has had its **safety alignment substantially removed** via *abliteration* (orthogonalizing
the refusal direction out of the residual stream). It will **comply with harmful, unethical, or illegal
requests** the original `Qwen3.8-27B` would refuse. Released **strictly for legitimate research** —
interpretability, AI-safety / refusal-mechanism study, red-teaming, and robustness evaluation. **You
assume full responsibility** for how you use it and everything it generates; add your own safety and
moderation layers before any deployment. Use must comply with the
[Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0) inherited from the base model and all
applicable law. The authors accept **no liability** for misuse.

---

## Requirements

- **A recent [llama.cpp](https://github.com/ggml-org/llama.cpp)** built from source (the `qwen35`
  hybrid-GDN architecture and the **MTP / `nextn`** speculative head — merged 2026-05 — must be present).
  Older releases will not load these files.
- The GDN linear-attention layers are stored as SSM-style tensors (`ssm_*`); full-attention layers as
  `attn_*`; the MTP head as block `nextn.*` (`qwen35.nextn_predict_layers`).

## Files

### Standard K-quants

| File | Bits | Size | Notes / recommendation |
|---|---|---:|---|
| `…-Q2_K.gguf`  | 2-bit | 10.9 GB | Smallest K-quant; noticeable quality drop — low-VRAM only |
| `…-Q3_K_S.gguf`| 3-bit | 12.3 GB | |
| `…-Q3_K_M.gguf`| 3-bit | 13.5 GB | Good small option |
| `…-Q3_K_L.gguf`| 3-bit | 14.6 GB | |
| `…-Q4_K_S.gguf`| 4-bit | 15.8 GB | |
| **`…-Q4_K_M.gguf`** | 4-bit | 16.8 GB | **Recommended default** — best quality/size balance |
| `…-Q5_K_S.gguf`| 5-bit | 17.7 GB | |
| `…-Q5_K_M.gguf`| 5-bit | 18.2 GB | High quality |
| `…-Q6_K.gguf`  | 6-bit | 20.9 GB | Very high quality |
| `…-Q8_0.gguf`  | 8-bit | 27.1 GB | Near-lossless |
| `…-F16-0000*-of-00002.gguf` | 16-bit | 54.7 GB | Full precision (split into 2 parts; point llama.cpp at part 00001) |

### IQ quants (imatrix)

Lower-bit quants built with an **importance matrix** (computed on English + Chinese calibration
text) — better quality-per-bit than plain K-quants at the low end, especially IQ3/IQ2.

| File | Bits | Size | Notes / recommendation |
|---|---|---:|---|
| **`…-IQ4_XS.gguf`** | ~4.25-bit | 15.3 GB | **Best low-bit pick** — ≈ Q4_K_S quality at smaller size |
| `…-IQ3_M.gguf`   | ~3.7-bit | 12.8 GB | Solid 3-bit |
| `…-IQ3_XXS.gguf` | ~3.1-bit | 11.6 GB | Smaller 3-bit |
| `…-IQ2_M.gguf`   | ~2.7-bit | 10.5 GB | Runs in low VRAM; some quality loss |
| `…-IQ2_XXS.gguf` | ~2.1-bit | 8.9 GB  | Smallest runnable; most degraded |

### Vision

| File | Size | Notes |
|---|---:|---|
| **`mmproj-…-f16.gguf`** | 0.9 GB | **Vision projector — download this too for image input** |

All quants (K-quant and IQ) preserve the **MTP (`nextn`) head** and the **GDN hybrid architecture**;
vision is provided by the separate `mmproj` file. The **IQ** files were quantized with an importance
matrix (computed on English + Chinese calibration text) for better low-bit fidelity; the matrix
itself is not shipped, as it is only needed to re-quantize these files, not to run them.

## Usage (llama.cpp)

### Download

```bash
hf download orcarouter/Qwen3.8-27B-Uncensored-GGUF \
  Qwen3.8-27B-Uncensored-Q4_K_M.gguf mmproj-Qwen3.8-27B-Uncensored-f16.gguf \
  --local-dir ./qwen38-uncensored
```

### Chat (text)

```bash
./llama-cli -m Qwen3.8-27B-Uncensored-Q4_K_M.gguf --jinja -c 8192 -p "Hello!"
```

### OpenAI-compatible server (tool calling + reasoning + vision)

```bash
./llama-server -m Qwen3.8-27B-Uncensored-Q4_K_M.gguf \
  --mmproj mmproj-Qwen3.8-27B-Uncensored-f16.gguf \
  --host 0.0.0.0 --port 8000 -c 8192 --jinja
```

- **Vision:** pass `--mmproj …`, then send OpenAI `image_url` content parts (base64 data-URI or URL).
- **Tool calling:** `--jinja` enables the Qwen tool template; use standard OpenAI `tools` + `tool_calls`.
- **Reasoning (thinking):** thinking is on by default; toggle per request via
  `chat_template_kwargs.enable_thinking`. The reasoning trace is returned in `reasoning_content`
  (give `max_tokens` room, e.g. ≥ 2048, so the final answer isn't truncated by the thinking budget).
- **MTP speculative decoding:** the `nextn` head is embedded; enable llama.cpp's MTP/speculative path
  for a decode speed-up (optional — the model runs fine without it).

### Or skip llama.cpp — run it with Ollama

The same quants are published as Ollama tags, with the `mmproj` projector already bundled in (no second
file, no `--mmproj` flag) and vision / tools / thinking wired up:

```bash
ollama run orcarouter/Qwen3.8-27B-Uncensored          # q4_K_M by default
ollama run orcarouter/Qwen3.8-27B-Uncensored:iq4_xs   # any of the 16 tags
```

Sixteen tags from `q2_K` to `q8_0`, each verified on the actual quantized artifact before release —
[ollama.com/orcarouter](https://ollama.com/orcarouter).

## Evaluation

Measured on this exact abliterated build (served with vLLM) vs the official `Qwen/Qwen3.8-27B-FP8`,
using the same scripts and settings. Refusal is judged by a rule-based opening-phrase classifier —
indicative, not an LLM-judge / publication-grade number. GGUF quants are deterministic derivations and
inherit these behaviours; lower bits trade some quality (see the file table).

### Safety — harmful-prompt refusal, **thinking OFF** (lower = more uncensored)

| Benchmark | n | Base FP8 | **This model** |
|---|---:|---:|---:|
| AdvBench | 100 | 99.0% | **0.0%** |
| JailbreakBench (harmful) | 100 | 94.0% | **0.0%** |
| StrongREJECT | 150 | 97.3% | **2.0%** |
| HarmBench (standard) | 150 | 98.7% | **2.7%** |
| MaliciousInstruct | 100 | 99.0% | **0.0%** |
| SimpleSafetyTests | 50 | 64.0% | **6.0%** |
| ForbiddenQuestions | 150 | 73.3% | **4.7%** |
| Custom probes (zh/en) | 11 | 63.6% | **0.0%** |

### Safety — harmful-prompt refusal, **thinking ON** (`enable_thinking=true`)

| Benchmark | n | Base FP8 | **This model** |
|---|---:|---:|---:|
| AdvBench | 60 | 66.7% | **1.7%** |
| JailbreakBench (harmful) | 60 | 43.3% | **0.0%** |
| StrongREJECT | 60 | 35.0% | **0.0%** |
| HarmBench (standard) | 60 | 46.7% | **0.0%** |
| MaliciousInstruct | 60 | 83.3% | **0.0%** |
| SimpleSafetyTests | 50 | 44.0% | **0.0%** |
| ForbiddenQuestions | 60 | 48.3% | **0.0%** |
| Custom probes (zh/en) | 11 | 45.5% | **0.0%** |

### Over-refusal — benign prompts wrongly refused (lower = better)

| Benchmark | n | Base FP8 (no-think / think) | **This model** (no-think / think) |
|---|---:|---:|---:|
| XSTest-safe | 250 | 5.6% / 0.0% | **0.4% / 0.0%** |

### Capability retention — vs the official base FP8 (same scripts)

| Benchmark | n | Base FP8 | **This model** | Δ |
|---|---:|---:|---:|---:|
| MMLU (all, 0-shot) | 300 | 84.3% | **84.7%** | **+0.4** |
| MMLU-Pro (CoT) | 250 | 77.6% | **76.8%** | −0.8 |
| GSM8K (CoT) | 150 | 90.0% | **88.7%** | −1.3 |
| CMMLU (0-shot, Chinese) | 500 | 81.4% | **80.8%** | −0.6 |
| WikiText-2 perplexity | — | — | **6.96** | fluency sanity check |

Harmful-prompt refusal collapses from **64–99%** (base) to **0–6%**; benign over-refusal drops
(5.6%→0.4%); capability stays within **±1.3 pts** of the base. Reasoning (`enable_thinking`),
multi-turn tool calling (`qwen3_coder`), and vision (image + OCR via `mmproj`) all verified working on
the GGUF build. Note: the above are full-precision/FP8 numbers; expect small additional degradation at
lower quants (most visible at Q2_K / Q3).

## Hardware

- Runs on CPU, CUDA, Metal, or ROCm via llama.cpp. VRAM/RAM ≈ the file size + KV cache + (for vision)
  the ~0.9 GB mmproj. E.g. `Q4_K_M` fits comfortably on a 24 GB GPU with room for context.

## License

**Apache 2.0**, inherited from [`Qwen/Qwen3.8-27B`](https://huggingface.co/Qwen/Qwen3.8-27B).
Abliteration and quantization do not change the underlying license obligations.

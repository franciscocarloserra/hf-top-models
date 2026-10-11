---
license: apache-2.0
base_model: Qwen/Qwen3.8-Flash-Next
base_model_relation: quantized
pipeline_tag: image-text-to-text
library_name: gguf
language:
  - en
  - zh
tags:
  - abliterated
  - uncensored
  - qwen
  - qwen3.8
  - qwen4
  - flash-next
  - moe
  - gguf
  - llama.cpp
  - vision-language
  - mmproj
  - function-calling
  - reasoning
  - ai-red-team
  - red-teaming
---

<div align="center">

<a href="https://www.orcarouter.ai" target="_blank">
  <img src="https://www.orcarouter.ai/orca-logo-classic.png" alt="OrcaRouter" width="110">
</a>

<h1>Qwen3.8-Flash-Next-Uncensored-GGUF</h1>

<p><em>GGUF quants (2-bit &rarr; 8-bit) of the abliterated (refusal-removed) Qwen3.8-Flash-Next &mdash; for llama.cpp</em></p>


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
<a href="https://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-4C8BF5" alt="License"></a>
<img src="https://img.shields.io/badge/Format-GGUF-00A67E" alt="GGUF">
<img src="https://img.shields.io/badge/Quants-Q2__K%20%E2%86%92%20Q8__0-FF8800" alt="Quants">
<img src="https://img.shields.io/badge/Vision-mmproj-9B59B6" alt="Vision">
<img src="https://img.shields.io/badge/Arch-Qwen4%20MoE-E67E22" alt="Qwen4 MoE">
</p>

<p><strong>One Gateway. Every Model.</strong> &mdash; Route Smarter &middot; Ship Safer &middot; Spend Less.</p>

<p>
<a href="https://www.orcarouter.ai">Website</a> &middot;
<a href="https://www.orcarouter.ai/models">Model Catalog</a> &middot;
<a href="https://github.com/Continuum-AI-Corp">GitHub</a> &middot;
<a href="https://ollama.com/orcarouter">Ollama</a> &middot;
<a href="https://discord.gg/yAh6Tex6kx">Discord</a> &middot;
<a href="https://x.com/OrcaRouter">X</a>
</p>

</div>

---

> **GGUF conversions** of the **abliterated** (refusal-removed) build of Qwen's
> [`Qwen3.8-Flash-Next`](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) &mdash; a large **Mixture-of-Experts**
> (512 experts, 10 routed + 1 shared active) preview of the **Qwen4 architecture** (`qwen4_exp`):
> **Gated DeltaNet** linear attention + **Qwen Sparse Attention (QSA)** at the micro-block level,
> **HyperConnections** in place of layer norms, **PLE n-gram** hash embeddings, native
> **vision-language**, reasoning, and tool-calling. These files run in **llama.cpp** (CPU / CUDA /
> Metal / ROCm), quantized from **2-bit to 8-bit**, with a separate **mmproj** file that
> restores **vision**. Browse all models in the [OrcaRouter Model Catalog](https://www.orcarouter.ai/models).

---

## Disclaimer &mdash; read before use

This model has had its **safety alignment substantially removed** via *abliteration* (orthogonalizing
the refusal direction out of the residual stream). It will **comply with harmful, unethical, or illegal
requests** the original `Qwen3.8-Flash-Next` would refuse. Released **strictly for legitimate research** &mdash;
interpretability, AI-safety / refusal-mechanism study, red-teaming, and robustness evaluation. **You
assume full responsibility** for how you use it and everything it generates; add your own safety and
moderation layers before any deployment. Use must comply with the
[Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0) inherited from the base model and all
applicable law. The authors accept **no liability** for misuse.

---

## Requirements &mdash; build a recent llama.cpp

The `qwen4_exp` architecture (Gated DeltaNet + QSA + HyperConnections + PLE n-gram) was **merged into
mainline llama.cpp on 2026-08-27** ([PR #27742](https://github.com/ggml-org/llama.cpp/pull/27742),
`model: add Qwen3.8-Flash-Next (qwen4exp)`, plus follow-up #27880). Any llama.cpp built from `master`
at/after that date loads these files. **Older or bundled runtimes that predate it will not** &mdash; e.g.
LM Studio's current build stops at `qwen35moe` and fails with `unknown architecture 'qwen4_exp'`; those
will work once they bump their bundled llama.cpp. Build a current one yourself:

```bash
git clone https://github.com/ggml-org/llama.cpp/
cmake llama.cpp -B llama.cpp/build -DBUILD_SHARED_LIBS=OFF -DGGML_CUDA=ON
cmake --build llama.cpp/build --config Release -j --clean-first \
  --target llama-cli llama-mtmd-cli llama-server llama-gguf-split
```

(Drop `-DGGML_CUDA=ON` for a CPU-only build.)

> **MTP speculative decoding (new).** As of **[PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243)**
> (stacked on [#27836](https://github.com/ggml-org/llama.cpp/pull/27836)), llama.cpp's `qwen4exp` backend has a
> real multi-token-prediction (`mtp`) inference path. **All quants here &mdash; including `Q8_0` &mdash; are plain
> target-only files that load on any recent mainline llama.cpp / LM Studio.** To add speculative decoding, pair any
> quant with the small **`…-MTP-draft.gguf`** (~4 GB, in Files) via `-md --spec-type draft-mtp` on a #28243 build
> (see Usage). A separate **`…-Q8_0-MTP`** build (the MTP draft head embedded in the same file, so it self-speculates
> without `-md`) is also provided for #28243 users &mdash; it needs that build and will not load on mainline. Apple Silicon
> users can also use the MLX build [`orcarouter/Qwen3.8-Flash-Next-Uncensored-MLX`](https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored-MLX),
> which ships the `mtp/` drafter.

## Files

Files larger than ~48 GB are **split** with `llama-gguf-split` into multiple parts &mdash; download the whole
set for that quant and point llama.cpp at the `…-00001-of-000NN.gguf` part; it loads the rest
automatically. Sizes are approximate.

### Standard K-quants

| File | Bits | Size | Notes / recommendation |
|---|---|---:|---|
| `…-Q2_K`   | 2-bit | ~74 GB  | Smallest K-quant; noticeable quality drop &mdash; low-VRAM only |
| `…-Q3_K_S` | 3-bit | ~78 GB  | |
| `…-Q3_K_M` | 3-bit | ~87 GB  | Good small option |
| `…-Q3_K_L` | 3-bit | ~93 GB  | |
| `…-Q4_K_S` | 4-bit | ~103 GB | |
| **`…-Q4_K_M`** | 4-bit | ~110 GB | **Recommended default** &mdash; best quality/size balance |
| `…-Q5_K_S` | 5-bit | ~117 GB | High quality |
| `…-Q5_K_M` | 5-bit | ~125 GB | Near-max quality; every shard <50 GB (no Xet needed) |
| **`…-Q6_K`** | 6-bit | ~168 GB | **High fidelity.** The PLE table falls back to Q8_0 → one ~54 GB shard, so it needs a Xet-capable downloader (default `hf` / recent `llama.cpp`) |
| **`…-Q8_0`** | 8-bit | ~188 GB | **Highest fidelity.** Plain target-only build; loads on mainline llama.cpp / LM Studio like the other quants. PLE shard ~54 GB → Xet-capable downloader required |
| `…-Q8_0-MTP` | 8-bit **+ MTP** | ~191 GB | Same weights as `Q8_0` **plus the embedded MTP draft head** for single-file self-speculative decoding (`--spec-type draft-mtp`). **Requires a [PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243) build** &mdash; will not load on mainline yet. PLE shard ~54 GB → Xet-capable downloader required |

> **Q6_K and higher.** The model's **n-gram (PLE) embedding table** is a single **51.2B**-parameter tensor
> (`per_layer_token_embd`, shape `[160, 320001536]`; 102.4 GB in BF16). Its quantized dimension (160) is not
> divisible by 256, so it cannot be a K-quant — at Q6_K it falls back to **Q8_0 (~54.4 GB)** and occupies its own
> shard. That shard is above CloudFront's **50 GB single-request _download_** limit (a delivery constraint, not a
> storage limit), so it is served via **Xet / ranged requests**, which the default `hf` client and recent
> `llama.cpp` downloaders handle transparently — the same approach upstream Unsloth uses for its Q6_K/Q8_0/BF16
> builds. **Q6_K and Q8_0 are provided above** (a separate `Q8_0-MTP` variant embeds the MTP draft head); BF16 is omitted as impractically
> large — for full precision use the BF16 safetensors in [`orcarouter/Qwen3.8-Flash-Next-Uncensored`](https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored).

### IQ quants (imatrix)

Lower-bit quants built with an **importance matrix** (computed on English + Chinese + code calibration
text) &mdash; better quality-per-bit than plain K-quants at the low end, especially IQ3/IQ2.

| File | Bits | Size | Notes / recommendation |
|---|---|---:|---|
| **`…-IQ4_XS`** | ~4.25-bit | ~97 GB | **Best low-bit pick** &mdash; approx Q4_K_S quality at smaller size |
| `…-IQ3_M`   | ~3.7-bit | ~82 GB | Solid 3-bit |
| `…-IQ3_XXS` | ~3.1-bit | ~73 GB | Smaller 3-bit |
| `…-IQ2_M`   | ~2.7-bit | ~63 GB | Runs in lower VRAM; some quality loss |
| `…-IQ2_XXS` | ~2.1-bit | ~52 GB | Smallest runnable; most degraded |

### Vision

| File | Size | Notes |
|---|---:|---|
| **`mmproj-…-F16.gguf`** | ~0.9 GB | **Vision projector &mdash; download this too for image input** |

### Speculative draft (MTP)

| File | Size | Notes |
|---|---:|---|
| **`…-MTP-draft.gguf`** | ~4 GB | Multi-token-prediction draft head. Pair with **any** quant above via `-md` for faster decode (measured ~1.3&ndash;2x; ~67% draft acceptance) on a [PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243) build. Self-contained (carries its own embeddings), so it loads as a normal `-md` draft. The separate `Q8_0-MTP` build already embeds this head and can self-speculate without it. |

## Usage (llama.cpp &mdash; PR #27742 build)

### Download

```bash
hf download orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF \
  --include "Qwen3.8-Flash-Next-Uncensored-Q4_K_M*" "mmproj-*" \
  --local-dir ./qwen-flashnext-uncensored
```

### Chat (text)

```bash
./llama-cli -m Qwen3.8-Flash-Next-Uncensored-Q4_K_M-00001-of-00003.gguf --jinja -c 8192 \
  --temp 1.0 --top-p 0.95 --top-k 20 --min-p 0.0 -p "Hello!"
```

### OpenAI-compatible server (tool calling + reasoning + vision)

```bash
./llama-server -m Qwen3.8-Flash-Next-Uncensored-Q4_K_M-00001-of-00003.gguf \
  --mmproj mmproj-Qwen3.8-Flash-Next-Uncensored-F16.gguf \
  --host 0.0.0.0 --port 8000 -c 8192 --jinja
```

- **Recommended sampling:** `--temp 1.0 --top-p 0.95 --top-k 20 --min-p 0.0`.
- **Vision:** pass `--mmproj …`, then send OpenAI `image_url` content parts (base64 data-URI or URL).
- **Tool calling:** `--jinja` enables the Qwen tool template; use standard OpenAI `tools` + `tool_calls`.
- **Reasoning (thinking):** thinking is on by default; toggle per request via
  `chat_template_kwargs.enable_thinking`. The reasoning trace is returned in `reasoning_content` &mdash;
  give `max_tokens` room (e.g. >= 2048) so the final answer isn't truncated by the thinking budget.

### Speculative decoding with MTP (`Q8_0-MTP`, PR #28243 build)

The **`Q8_0-MTP`** build embeds the model's multi-token-prediction draft head. On a llama.cpp built from
[PR #28243](https://github.com/ggml-org/llama.cpp/pull/28243), turn on **single-file self-speculative
decoding** &mdash; no separate draft model required:

```bash
./llama-cli -m Qwen3.8-Flash-Next-Uncensored-Q8_0-MTP-00001-of-00005.gguf --jinja -c 8192 --spec-type draft-mtp --spec-draft-n-max 3 --temp 1.0 --top-p 0.95 --top-k 20 --min-p 0.0 -p "Hello!"
```

Keep `--spec-draft-n-max` small (2&ndash;3) for best acceptance. This path exists only on the #28243 build;
the plain `Q8_0` (and every other quant) loads on mainline llama.cpp as usual. For MTP on mainline-compatible
files, use any quant with the standalone `-md` draft below.

For **any other quant** (Q2_K&ndash;Q6_K, IQ*), pair it with the standalone MTP draft via `-md`:

```bash
./llama-cli -m Qwen3.8-Flash-Next-Uncensored-Q4_K_M-00001-of-00003.gguf -md Qwen3.8-Flash-Next-Uncensored-MTP-draft.gguf --jinja -c 8192 --spec-type draft-mtp --spec-draft-n-max 3 --temp 1.0 --top-p 0.95 --top-k 20 --min-p 0.0 -p "Hello!"
```

## Evaluation

Abliteration was measured on this build (served with vLLM) vs the official `Qwen/Qwen3.8-Flash-Next`,
using the same scripts. Harmful-prompt refusal collapses from **64&ndash;100%** (base) to **~0&ndash;3.3%**;
benign over-refusal stays near 0%; capability stays within **±2 pts** of the base across MMLU-Pro /
GSM8K / CMMLU-style checks; vision (image + OCR via `mmproj`) and multi-turn tool calling verified
working. GGUF quants are deterministic derivations and inherit these behaviours; lower bits trade some
quality (most visible at Q2_K / IQ2).

## Hardware

Runs on CPU, CUDA, Metal, or ROCm via llama.cpp. As a large MoE, only ~10 of 512 experts are active per
token, so decode is far faster than the total parameter count suggests, but **the full weights must fit
in RAM/VRAM (or be memory-mapped)**: budget ≈ the file size + KV cache + (for vision) the ~0.9 GB
mmproj. Multi-GPU (`-ngl` split) and CPU+GPU offload both work.

## License

**Apache 2.0**, inherited from [`Qwen/Qwen3.8-Flash-Next`](https://huggingface.co/Qwen/Qwen3.8-Flash-Next).
Abliteration and quantization do not change the underlying license obligations.

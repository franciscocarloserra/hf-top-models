---
license: apache-2.0
base_model: Qwen/Qwen3.8-27B
base_model_relation: quantized
pipeline_tag: image-text-to-text
library_name: transformers
language:
  - en
  - zh
tags:
  - abliterated
  - qwen3.8
  - uncensored
  - ai-red-team
  - red-teaming
  - fp8
  - block-fp8
  - vllm
  - function-calling
  - reasoning
  - mtp
---

<div align="center">

<a href="https://www.orcarouter.ai" target="_blank">
  <img src="https://www.orcarouter.ai/orca-logo-classic.png" alt="OrcaRouter" width="110">
</a>

<h1>Qwen3.8-27B-Uncensored-FP8</h1>

<p><em>An abliterated (refusal-removed) &amp; offline block-FP8 build of Qwen's Qwen3.8-27B</em></p>


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
<img src="https://img.shields.io/badge/Precision-Block%20FP8%20E4M3-00A67E" alt="Block FP8">
<img src="https://img.shields.io/badge/Context-262K-FF8800" alt="262K context">
<img src="https://img.shields.io/badge/Speculative-MTP-9B59B6" alt="MTP">
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

> An **abliterated** (refusal-removed) and **offline block-FP8 quantized** build of
[`Qwen/Qwen3.8-27B`](https://huggingface.co/Qwen/Qwen3.8-27B) — a 27B-parameter dense,
hybrid-attention (Gated DeltaNet linear + full attention) native vision-language model with
flexible thinking control, tool-calling, and an MTP speculative-decoding head. This build
removes the safety refusal direction, then re-quantizes to the **exact FP8 scheme of the
official [`Qwen/Qwen3.8-27B-FP8`](https://huggingface.co/Qwen/Qwen3.8-27B-FP8)** so it serves
with the identical vLLM kernel path — **262K context, tools + reasoning + MTP preserved**.
Browse all models in the [OrcaRouter Model Catalog](https://www.orcarouter.ai/models). This model is deployed as API [here](https://www.orcarouter.ai/models/qwen/qwen3.8-27b).

---

## ⚠️ Disclaimer — read before use

This model has had its **safety alignment substantially removed** via *abliteration*
(orthogonalizing the refusal direction out of the residual stream). As a direct consequence:

- **It will comply with harmful, unethical, offensive, or illegal requests** that the
  original `Qwen3.8-27B` would refuse. It has no meaningful built-in guardrails.
- It is released **strictly for legitimate research** — interpretability, AI-safety and
  refusal-mechanism study, red-teaming, robustness evaluation, and controlled experiments.
- **You assume full responsibility and liability** for how you use it and for everything it
  generates. Do not deploy it to end users or in production without adding your own safety,
  moderation, and abuse-prevention layers.
- Use must comply with the **[Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)**
  inherited from the base model, and all laws and regulations that apply to you.
- The authors and uploaders **accept no liability** for any misuse or harm arising from this
  model. Its outputs do **not** reflect the views of the uploaders or of Qwen / Alibaba.

By downloading or using this model you acknowledge and accept the above.

---

## Model details

| | |
|---|---|
| **Base model** | [`Qwen/Qwen3.8-27B`](https://huggingface.co/Qwen/Qwen3.8-27B) |
| **Architecture** | `Qwen3_5ForConditionalGeneration` — 64 layers, hidden 5120, hybrid **Gated DeltaNet** (48 linear-attention + 16 full-attention, interval 4), native VL tower + MTP head |
| **Modification** | Abliteration (refusal-direction removal) **then** offline block-FP8 quantization |
| **Quantization** | **Block-FP8** (E4M3), `weight_block_size [128,128]`, dynamic activations — mirrors the official `Qwen3.8-27B-FP8` byte-for-byte in scheme |
| **Format** | safetensors, resharded to **≤ 5 GB shards** (7 shards, **30.9 GB**, 1606 tensors) |
| **Precision** | FP8 (E4M3) block-quantized linear weights; vision tower / norms / router / embeddings / `lm_head` kept in BF16 |
| **Preserved** | Full **vision-language tower** and **MTP speculative-decoding head** (drop-in for the base) |
| **Context** | 262,144 tokens |

### Abliteration

Refusal-direction removal following **Arditi et al. (2024)**, *Refusal in Language Models Is
Mediated by a Single Direction*. A single refusal direction `r` (k = 1) is estimated as the
massive-activation–masked mean-difference of harmful − harmless last-token residuals at
**layer 38** (`round(0.6 × 64)`), on AdvBench (harmful) vs Alpaca (harmless). `r` is then
orthogonalized out of every **residual-writing** matrix — `W' = W − r(rᵀW)` — computed in
float32:

| Component | matrices edited |
|---|---|
| `self_attn.o_proj` (16 full-attention layers + MTP) | 17 |
| `linear_attn.out_proj` (48 linear-attention / GDN layers) | 48 |
| `mlp.down_proj` (64 layers + MTP) | 65 |
| `embed_tokens` (row space) | 1 |
| **Total** | **131** |

The **vision tower is untouched** and the **MTP head is abliterated consistently** with the
main model, so speculative decoding keeps working. Max residual leakage after the edit:
`1.8e-2` (float32 projection → bf16 storage epsilon).

### Offline block-FP8 quantization scheme

Quantization is done **offline on the abliterated BF16 weights**, reproducing the official
`Qwen/Qwen3.8-27B-FP8` recipe exactly:

- **Weights:** fine-grained **128×128 block** FP8 (E4M3) — `weight` as `float8_e4m3fn` +
  `weight_scale_inv` (BF16) per block.
- **Activations:** per-token **dynamic** FP8 — computed at runtime, **no calibration set**.
- **Kept in BF16 (not quantized):** vision tower, all `norm`s, `mlp.gate` / `shared_expert_gate`,
  `linear_attn` conv/gates (`A_log`, `conv1d`, `dt_bias`, `in_proj_a/b/ba`, `norm`), `lm_head`,
  `embed_tokens` — the identical 882-entry `modules_to_not_convert` as the official FP8.
- **407** weights quantized / **792** copied → **1606** tensors, exactly matching the official
  FP8 checkpoint. Verified against it: block layout and scales reproduce the official weights
  with **99.9% identical FP8 codes**.

vLLM therefore serves this build with the **same FlashInfer / DeepGEMM block-scaled FP8 kernel**
as the official checkpoint, with the same **MTP** speculative decoding.

## Intended use

- Research into refusal mechanisms, alignment, and interpretability.
- Red-teaming and safety / robustness evaluation in controlled environments.
- Uncensored generation for authorized, lawful research settings.

### Out of scope

- Any use that violates the base model's Apache 2.0 license or applicable law.
- Deployment to the public or to end users without additional safety and moderation layers.
- Generating content intended to harm, harass, defraud, or endanger people.

## Evaluation

Measured on this exact FP8 build served with **vLLM** (block-FP8 + FP8 KV cache + MTP), against
the official `Qwen/Qwen3.8-27B-FP8` served identically, using the same scripts and settings.
Refusal is judged by a rule-based opening-phrase classifier (`caveat` = answered but wrapped in
a disclaimer / warning) — indicative, not an LLM-judge / publication-grade number. **Thinking is
off unless stated**; refusal is reported in both modes because Qwen thinking changes the number.

### Safety — harmful-prompt refusal, **thinking OFF** (lower = more uncensored)

| Benchmark | n | Base FP8 | **This model** | Caveat (this) |
|---|---:|---:|---:|---:|
| AdvBench | 100 | 99.0% | **0.0%** | 44.0% |
| JailbreakBench (harmful) | 100 | 94.0% | **0.0%** | 47.0% |
| StrongREJECT | 150 | 97.3% | **2.0%** | 41.3% |
| HarmBench (standard) | 150 | 98.7% | **2.7%** | 42.0% |
| MaliciousInstruct | 100 | 99.0% | **0.0%** | 40.0% |
| SimpleSafetyTests | 50 | 64.0% | **6.0%** | 56.0% |
| ForbiddenQuestions | 150 | 73.3% | **4.7%** | 35.3% |
| Custom probes (zh/en) | 11 | 63.6% | **0.0%** | 27.3% |

Harmful-prompt refusal collapses from **64–99%** on the base to **0–6%**. The ~30–50% *caveat*
rate means the model **answers** but often prepends a short safety disclaimer — it is complying,
not refusing.

### Safety — harmful-prompt refusal, **thinking ON** (`enable_thinking=true`, max_tokens 2048)

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

In thinking mode the abliterated model refuses **essentially never** (≤ 1.7%).

### Over-refusal — benign prompts wrongly refused (lower = better)

| Benchmark | n | Base FP8 (no-think / think) | **This model** (no-think / think) |
|---|---:|---:|---:|
| XSTest-safe | 250 | 5.6% / 0.0% | **0.4% / 0.0%** |

Abliteration **reduces** collateral over-refusal on benign prompts (5.6% → 0.4%).

### Capability retention — vs the official base FP8 (same scripts, same settings)

| Benchmark | n | Base FP8 | **This model** | Δ |
|---|---:|---:|---:|---:|
| MMLU (all, 0-shot letter) | 300 | 84.3% | **84.7%** | **+0.4** |
| MMLU-Pro (CoT) | 250 | 77.6% | **76.8%** | −0.8 |
| GSM8K (CoT) | 150 | 90.0% | **88.7%** | −1.3 |
| CMMLU (0-shot, Chinese) | 500 | 81.4% | **80.8%** | −0.6 |

**Capability is essentially fully retained** — every benchmark is within ±1.3 pts of the base,
and MMLU is unchanged. Because the FP8 scheme is byte-identical to the official checkpoint,
this delta reflects only the abliteration edit, which barely touches general ability.

**Fluency (perplexity):** WikiText-2-raw perplexity of this build is **6.96** (296,907 tokens,
BF16 KV; logprobs healthy, min −26.9 / mean −1.94), confirming abliteration + block-FP8 did not
degrade language modelling.

**Verified on this exact FP8 build:** vLLM startup (block-FP8 + FP8-KV + MTP), reasoning
(`enable_thinking` → populated `reasoning` field), multi-turn tool calling
(`qwen3_coder` parser), and vision (image + OCR) all work.

### Multimodal (vision)

The **vision tower is preserved byte-for-byte** — all 333 `visual.*` tensors are copied
unchanged and kept in BF16, and the merger / image + video preprocessor configs are intact, so
this stays a full vision-language model (`Qwen3_5ForConditionalGeneration`), a drop-in for the
base. Abliteration only edits the *language-model* residual writers, so image understanding is
architecturally unaffected (and image-conditioned refusals are reduced along with text ones).
The benchmark tables above are **text-only** (served with `--language-model-only`); to use
vision, serve **without** that flag.

**Verified working** on this exact FP8 build (served in full VL mode): given a test image, the
model correctly names the shapes and colors and **reads on-image text (OCR)** — e.g. it
describes *"a bright-red circle with a black outline"* and a *"blue square"* and reads the
caption *"PURPLE 7"*. Image-conditioned prompts are answered without refusal, consistent with
the text results.

## Usage

### Self-host with vLLM (OpenAI-compatible)

```bash
docker run -d --name qwen38-uncensored --gpus all --ipc=host --shm-size=8g \
  -v /path/to/Qwen3.8-27B-Uncensored-FP8:/model:ro \
  -p 8000:8000 vllm/vllm-openai:v0.24.0 \
  --model /model --served-model-name Qwen3.8-27B-Uncensored \
  --language-model-only \
  --speculative-config '{"method":"mtp","num_speculative_tokens":3}' \
  --kv-cache-dtype fp8 \
  --gpu-memory-utilization 0.9 \
  --max-model-len 262144 --max-num-seqs 96 \
  --trust-remote-code \
  --reasoning-parser qwen3 \
  --enable-auto-tool-choice --tool-call-parser qwen3_coder
```

> The FP8 `quantization_config` is read from `config.json` — **do not** pass `--quantization fp8`.
> `--speculative-config mtp` enables the preserved MTP draft head. Drop `--kv-cache-dtype fp8`
> if you want BF16 KV precision.

### Reasoning (thinking) toggle

Thinking is **on by default** (Qwen3.8). Toggle it per request via `chat_template_kwargs`; the
reasoning trace is returned in the `reasoning` field (`--reasoning-parser qwen3`).

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="EMPTY")

resp = client.chat.completions.create(
    model="Qwen3.8-27B-Uncensored",
    messages=[{"role": "user", "content": "Prove that sqrt(2) is irrational."}],
    extra_body={"chat_template_kwargs": {"enable_thinking": True}},
)
print(resp.choices[0].message.reasoning)  # thinking trace
print(resp.choices[0].message.content)    # final answer
```

### Tool calling

Standard OpenAI `tools` + assistant `tool_calls` + `role: tool` result messages are supported,
including multi-turn (feed the tool result back for a follow-up answer). Parsed by
`--tool-call-parser qwen3_coder`.

### Via OrcaRouter (hosted API — no setup)

Served on **[OrcaRouter](https://www.orcarouter.ai/models)** through the OpenAI-compatible
gateway (262K context, tools + reasoning). Grab an API key at
[orcarouter.ai](https://www.orcarouter.ai) (`sk-orca-...`).

```python
from openai import OpenAI

client = OpenAI(base_url="https://api.orcarouter.ai/v1", api_key="sk-orca-...")
resp = client.chat.completions.create(
    model="qwen/qwen3.8-27b",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(resp.choices[0].message.content)
```

## Hardware requirements & performance

**Software**
- vLLM with transformers ≥ 5.12 (Qwen3.5/3.8 support) — e.g. `vllm/vllm-openai:v0.24.0`.

**Memory**
- Weights: **~31 GB** in block-FP8 (about half of the ~56 GB BF16 checkpoint).
- Minimum **~40 GB VRAM** for weights + a small KV cache; the full 262K context needs
  substantial extra KV cache — use `--kv-cache-dtype fp8` to halve it.
- Recommended: a single **H100 80 GB** or **H200 143 GB**.

**Throughput / concurrency**
- Continuous batching; concurrency bounded by `--max-num-seqs` and the KV cache that fits after
  weights are loaded. Verified serving 32 concurrent eval requests smoothly on one H200
  (`--max-num-seqs 96`, FP8 KV cache, MTP). The MTP draft head gives a large decode speedup on
  real workloads.

## Bias, risks, and limitations

- **Safety guardrails removed** — the model will produce harmful, biased, or offensive content
  on request. See the disclaimer above.
- It inherits any biases and limitations of the base `Qwen3.8-27B`.
- Block-FP8 is **not lossless** versus BF16; minor generation artifacts are possible (capability
  impact measured at ≤ 1.3 pts).
- The reported refusal metric is a rule-based heuristic; evaluate rigorously for your own use case.

## License

**Apache 2.0**, inherited from the base model
[`Qwen/Qwen3.8-27B`](https://huggingface.co/Qwen/Qwen3.8-27B). Abliteration and quantization do
not change the underlying license obligations.
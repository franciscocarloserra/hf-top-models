---
license: mit
base_model: zai-org/GLM-5.3-Flash
base_model_relation: quantized
pipeline_tag: image-text-to-text
library_name: vllm
language:
- en
- zh
tags:
- autotrust
- glm5_next
- moe
- nvfp4
- modelopt
- vllm
- dgx-spark
- gb10
- blackwell
- neural-architecture-search
- mtp
- speculative-decoding
---

# GLM5.3-Flash-E224-DGX-Spark

[![AutoTrust/GuruSearch recommendation & search live demo: news.guru.so](https://huggingface.co/autotrust/JEV-27B/resolve/main/assets/autotrust_gurusearch_demo.png)](https://news.guru.so/ui)

## 🔴 Live: AutoTrust/GuruSearch recommendation & search demo → [news.guru.so](https://news.guru.so/ui)

> [!IMPORTANT]
> **Try AutoTrust/GuruSearch live (new, 11 October 2026).** A recommendation and search demo in which every ranking is a
> calibrated System 1 decision, made in about half a second:
> * **Recommendation:** the latest headlines from 6 news feeds, ranked by importance.
> * **Search:** results from Google News, Bing News and Yahoo News re-ranked by relevance, side by side with the
>   search engines' own order, plus a short answer with citations.

**autotrust/GLM5.3-Flash-E224-DGX-Spark is a compact build of [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) for desktop Blackwell systems like NVIDIA DGX Spark. It's an unofficial derivative.**

> 🚀 **Deploying on DGX Spark?** A complete, field-tested runbook for
> serving this checkpoint on **two ConnectX-7-linked DGX Sparks**
> (vLLM 0.31.0, TP=2, fp8 KV cache) is here:
> **[DEPLOY-2X-DGX-SPARK.md](./DEPLOY-2X-DGX-SPARK.md)** — network setup,
> NCCL/CX7 pitfalls, memory budgeting, ops & troubleshooting, and
> measured throughput (15.7 tok/s single-stream, 71.8 tok/s at 8-way
> concurrency, both GPUs ≈96% utilized).

It keeps 224 of the 288 routed experts in each layer by **Neural Architecture Search (NAS)**, uses NVFP4 for the experts and still activates 18 B parameters per token. The weights take 141 GiB, which is small enough for **two DGX Sparks connected by ConnectX-7** (256 GB of unified memory in total) with room left for long-context KV cache. A single 180 GB Blackwell GPU (B200/GB200) can also run it.

The original GLM-5.3-Flash MTP layer ships unmodified in [`mtp/`](mtp/) (BF16) as an optional speculative-decoding draft. It gives about 1.85× single-stream decode speed on B200 at the same output quality. A **ready-to-use NVFP4 export of the same draft** ships in [`mtp-nvfp4/`](mtp-nvfp4/) (6.95 GB), the recommended draft on DGX Spark.

The model keeps the full 154,880-token vocabulary and has the vision tower intact.

| | GLM-5.3-Flash (FP8) | GLM-5.3-Flash NVFP4 (288 experts) | **This model** |
|---|---|---|---|
| Disk / weight memory | 306 GiB | ~190 GiB | **151.5 GB = 141 GiB** |
| Routed experts / layer | 288 | 288 | **224** |
| Active params / token | 18 B | 18 B | 18 B (top-8 of 224) |
| **2× DGX Spark (2 × 128 GB)** | ❌ | ❌ (~95 GiB per node, little KV room) | **✅ ~70 GiB per node, ~40 GiB KV per node** |
| 1× B200 / GB200 (≥180 GB) | ❌ | ❌ | ✅ |
| 1× DGX Spark (128 GB) | ❌ | ❌ | ❌ (weights alone exceed memory) |
| Vision (image / video) | ✅ | ✅ | ✅ |
| Speculative decoding (MTP) | ✅ | ✅ | ✅ BF16 `mtp/` + NVFP4 `mtp-nvfp4/`, both included |

## Designed for DGX Spark

DGX Spark (GB10 Grace Blackwell) has 128 GB of LPDDR5X unified memory, 273 GB/s bandwidth and native FP4 tensor cores. That profile shaped this build:

* **Memory budget.** Two Sparks have 256 GB together, but each node has to fit its share of the weights, the KV cache, CUDA graphs, the OS and the desktop. The 288-expert NVFP4 checkpoint leaves almost no room for KV cache on each node. At 141 GiB, this model leaves roughly 40 GiB per node. That's enough for 128 K+ thinking traces at `reasoning_effort=max`.
* **Bandwidth budget.** Decode on Spark is memory-bandwidth bound. Every token still reads the same 18 B active parameters (top-8 experts + shared expert + attention), so per-token cost doesn't change. With fewer experts resident, more of the memory stays free for KV cache and batching.
* **FP4 native.** Routed experts use the modelopt NVFP4 format (16-element groups, e4m3 group scale, fp32 tensor scale). GB10's Blackwell tensor cores execute it natively. Attention, shared experts, embeddings and the vision tower are in BF16.
* **Same quality class as the full model.** On every benchmark we measured, the gap to the 288-expert model is within noise, except for a few points on GPQA-Diamond (see below).

> ⚠️ **Hardware validation status.** All accuracy and throughput numbers below were measured on a **single NVIDIA B200** with the same weights. The 2× DGX Spark deployment recipe below follows NVIDIA's standard two-Spark vLLM setup. Memory figures for Spark are calculated from the measured weight footprint, not measured on Spark hardware. Expect much lower absolute tokens/s on Spark than on B200, because GB10 has about 30× less memory bandwidth. Reports from Spark owners are very welcome in the Community tab.

## Benchmarks

Measured on one B200 with vLLM. Sampling follows the base model's official recipe (`temperature=1.0, top_p=0.95`); HumanEval also uses greedy decoding. `reasoning_effort` is the GLM-5.3-Flash chat-template thinking budget (`low` / `high` / `max`).

**Scoring is strict:** a response that runs out of tokens before giving a final answer counts as wrong. All numbers are single runs. MoE decoding in vLLM isn't bit-deterministic, so treat ±2–3 points as noise.

### Headline

| Benchmark | Setting | **This model** | 288-expert reference |
|---|---|---|---|
| **GPQA-Diamond** (198) | effort=max, 163,840-token budget | **90.9 %** (180/198) | 90.57 % (RedHatAI NVFP4) · 92.1 % (NVIDIA NVFP4, 327 K budget) |
| **AIME 2025** (30 × 4 samples, pass@1) | effort=max, 163,840-token budget | **88.3 %** (106/120) · 29/30 solved in ≥1 sample | 86.67 % (RedHatAI NVFP4, 8 seeds) |
| **HumanEval** (164) | T=1.0, top_p=0.95 | **98.2 %** (161/164) | — |
| **HumanEval** (164) | greedy | **95.7 %** (157/164) | — |
| **C-Eval** val (1,606, 52 subjects) | effort=low | **84.0 %** (1,349/1,606) | — |
| **MMMU** val (900, multimodal) | effort=low | **73.6 %** (662/900) | — |

At the base model's recommended thinking budget (`max`), GPQA-Diamond and AIME 2025 **match the 288-expert NVFP4 checkpoint** published by RedHatAI.

### Reasoning: the thinking budget matters

| Benchmark | **effort=low/high** (quick self-test), 65,536-token budget | **effort=max, 163,840-token budget** |
|---|---|---|
| GPQA-Diamond | 78.3 % (**effort=low**; 7 truncated) · 79.3 % with tolerant answer extraction | **90.9 %** (4 truncated) · 91.4 % tolerant |
| AIME 2025 pass@1 | 75.0 % (**effort=high**; 12/120 truncated) | **88.3 %** (10/120 truncated) |

> ⚡ The `low`/`high` column is a **quick self-test** used to compare builds against each other, not the model's best score. At `low` the model thinks briefly and some answers are cut off before they finish. Report the `max` column as the model's reasoning score.

Token usage per question (completion tokens, thinking included):

| | mean | median | p90 | max |
|---|---|---|---|---|
| GPQA-Diamond, effort=low | 6.3 K | 0.4 K | 24 K | 65.5 K (budget) |
| GPQA-Diamond, effort=max | 19.7 K | 7.0 K | 53 K | 163.8 K (budget) |
| AIME 2025, effort=high | 15.2 K | 2.4 K | 65.5 K | 65.5 K (budget) |
| AIME 2025, effort=max | 34.2 K | 12.6 K | 145 K | 163.8 K (budget) |
| C-Eval, effort=low | 0.26 K | 0.15 K | 0.3 K | 8.2 K |

**On Spark, size `--max-model-len` for the effort you use.** About 64 K is enough for `low`. Use ≥ 160 K for `max`; the long tail of hard problems runs past 130 K tokens.

### Tool use: BFCL v4 (function calling, AST match)

| Category | Accuracy |
|---|---|
| **Non-Live overall** | **88.3 %** |
| simple (Python) | 95.0 % |
| simple (Java) | 60.0 % |
| simple (JavaScript) | 72.0 % |
| multiple | 96.5 % |
| parallel | 94.0 % |
| parallel-multiple | 87.0 % |
| irrelevance detection | 70.8 % |
| **Live overall** | **80.3 %** |
| live simple | 89.2 % |
| live multiple | 78.3 % |
| live parallel | 81.3 % |
| live parallel-multiple | 75.0 % |
| live irrelevance | 72.4 % |
| live relevance | 87.5 % |
| **Multi-Turn Base** (200) | **80.0 %** |

BFCL was run with `bfcl-eval` v4 against the local OpenAI-compatible endpoint (`--tool-call-parser glm47`, template-default effort, `--num-threads 32`). `multi_turn_miss_func`, `miss_param`, `long_context` and the agentic web-search/memory categories weren't run.

### Throughput (single B200, reference only)

`reasoning_effort=low`, 1,024 output tokens, short prompts, full CUDA graphs:

| Concurrency | Aggregate tok/s | Per-request decode tok/s | TTFT (median) |
|---|---|---|---|
| 1 | 131 | 136 | 0.16 s |
| 8 | 498 | 80 | 0.29 s |
| 32 | 1,091 | 48 | 0.97 s |

These numbers come from a B200 with about 8 TB/s of HBM bandwidth. A DGX Spark has 273 GB/s per node, so single-stream decode there will be much slower. Plan for interactive single-user or small-batch serving on Spark, not high-concurrency throughput.

### MTP speculative decoding (optional)

The `mtp/` folder holds the original GLM-5.3-Flash MTP layer, unchanged: BF16, all 288 experts, 17 GB. vLLM loads it as a separate draft model. Speculative decoding is lossless; accuracy measured with MTP on matches the runs without it, within noise.

**DGX Spark (GB10) users:** the BF16 draft above is a net *slowdown* on this hardware (−30 % single-stream: the 288-expert BF16 MoE runs on GB10's weak path at ~66 ms per draft step). Use the included [`mtp-nvfp4/`](mtp-nvfp4/) instead (same draft layer, NVFP4 MoE weights, 6.95 GB instead of 17 GB), measured **+55 % single-stream on 2× DGX Spark** with unchanged output quality. It is the ModelOpt export produced by [`scripts/export_mtp_nvfp4.py`](scripts/export_mtp_nvfp4.py), so you no longer need to generate it yourself. Full quantization recipe, vLLM flags and required patches: [`MTP-NVFP4.md`](MTP-NVFP4.md).

Measured on a single B200 with `reasoning_effort=low`, 1,024 output tokens, served from this repository as uploaded. Text, Chinese, tool-calling and image smoke tests pass both with MTP on and off.

| `num_speculative_tokens` | Mean acceptance length | Draft acceptance | Single-stream decode tok/s | Speed-up (1 stream) | Aggregate tok/s @ 8 | Aggregate tok/s @ 32 |
|---|---|---|---|---|---|---|
| off | — | — | 136 | 1.00× | 488 | **1,140** |
| 1 ¹ | 1.87 | 86.6 % | 201 | 1.48× | 676 | 1,132 |
| **2** (recommended) | **2.51** | **75.4 %** | **250** | **1.85×** | **706** | 957 |
| 3 ¹ | 2.95 | 64.9 % | 268 | 1.97× | 697 | 915 |

¹ Earlier run with identical weight files.

**When to use MTP:** turn it on for interactive, low-concurrency serving (1–8 streams), which is the typical DGX Spark workload. Turn it off for high-concurrency batch serving. At 32 concurrent streams, MTP lowers aggregate throughput by about 16 % and raises median TTFT from 0.8 s to 6.4 s, because the draft's extra weights shrink the KV cache: on one B200 at `--gpu-memory-utilization 0.97`, the KV cache drops from 1.31 M to 0.32 M tokens.

With MTP on (2 draft tokens), HumanEval greedy scored 97.0 % and GPQA-Diamond (**effort=low**, quick self-test) scored 77.8 %, in line with the runs without MTP. Acceptance over the reasoning-heavy eval traffic was 2.36 tokens per step.

**MTP is especially useful on DGX Spark.** Decode there is memory-bandwidth bound, and single-user interactive use is the typical workload, which is exactly where speculative decoding helps most. The cost is 17 GB of extra weights (about 8.5 GB per node at TP=2), so leave room for it in your memory budget (see Deployment).

### Where it loses vs. the 288-expert model

* **GPQA-Diamond in the quick `effort=low` self-test:** about 78 % here vs. the low-80s for larger builds. At full budget (`max`), the gap closes to within noise.
* **Vision:** MMMU val 73.6 %. We didn't measure the 288-expert model in the same harness, so we can't quantify the gap.

## Deployment

### Requirements

* vLLM with GLM-5.3-Flash support: **vLLM ≥ 0.30.0**, or the official `vllm/vllm-openai:glm53-flash` image. Validated here on the `ZJY0516/vllm@glm-release` branch ([vllm-project/vllm#53906](https://github.com/vllm-project/vllm/pull/53906)) at commit `7e2d791` plus `8f8cc41` ("Make GLM-5.3 kpool metadata graph-safe"). Without that fix, full CUDA graphs can crash under concurrency.
* `transformers >= 5.16.1`
* Set `VLLM_USE_DEEP_GEMM=0`.

### 2× DGX Spark (target configuration)

1. Connect the two Sparks with a QSFP cable on the ConnectX-7 ports. Then follow NVIDIA's ["Connect two Sparks"](https://build.nvidia.com/spark) playbook for networking and passwordless SSH.
2. Download this repository to the same path on **both** nodes.
3. Launch vLLM with tensor parallelism across the two nodes. With the multiprocessing backend, run:

```bash
# on both nodes: point NCCL/Gloo at the ConnectX-7 interface (check `ibdev2netdev`)
export VLLM_USE_DEEP_GEMM=0
export NCCL_SOCKET_IFNAME=enp1s0f1np1 GLOO_SOCKET_IFNAME=enp1s0f1np1

# node 0 (head)
vllm serve autotrust/GLM5.3-Flash-E224-DGX-Spark \
  --served-model-name glm53-flash-e224 \
  --tensor-parallel-size 2 --nnodes 2 --node-rank 0 --master-addr <HEAD_CX7_IP> \
  --kv-cache-dtype fp8 --max-model-len 163840 --max-num-seqs 8 \
  --gpu-memory-utilization 0.85 \
  --tool-call-parser glm47 --enable-auto-tool-choice --reasoning-parser glm45 \
  --host 0.0.0.0 --port 8000

# node 1 (worker)
vllm serve autotrust/GLM5.3-Flash-E224-DGX-Spark \
  --tensor-parallel-size 2 --nnodes 2 --node-rank 1 --master-addr <HEAD_CX7_IP> --headless \
  --kv-cache-dtype fp8 --max-model-len 163840 --max-num-seqs 8 \
  --gpu-memory-utilization 0.85
```

You can also use the Ray-based `run_cluster.sh` flow from NVIDIA's `dgx-spark-playbooks` vLLM guide with `--tensor-parallel-size 2`.

**Memory per node (estimate):** about 70.5 GiB of weights + about 40 GiB of KV cache and activations at `--gpu-memory-utilization 0.85` (unified memory is shared with the OS). With MTP enabled, add about 8.5 GiB per node for the draft. Lower `--max-model-len` or raise the utilization if you don't need `max` effort.

**Enable MTP** (recommended for interactive use) by adding this to the command on both nodes:

```bash
  --speculative-config '{"method": "mtp", "model": "<local-path-to-this-repo>/mtp", "num_speculative_tokens": 2}'
```

**If TP=2 over the interconnect is slow or unstable on your setup**, try `--tensor-parallel-size 1 --pipeline-parallel-size 2`. Pipeline parallelism sends far less traffic over the cable per token, at the cost of single-stream latency.

### Single B200 / GB200 (validated)

```bash
export VLLM_USE_DEEP_GEMM=0
vllm serve autotrust/GLM5.3-Flash-E224-DGX-Spark \
  --served-model-name glm53-flash-e224 \
  --kv-cache-dtype fp8 --max-model-len 172032 --max-num-seqs 48 \
  --gpu-memory-utilization 0.93 \
  --tool-call-parser glm47 --enable-auto-tool-choice --reasoning-parser glm45
```

On a 183 GB B200 this loads 141.5 GiB of weights and leaves about 14–18 GiB of KV cache: 1.1 M tokens with BF16 KV at 172 K context, or 2.5 M tokens with `--kv-cache-dtype fp8`. With MTP (`--speculative-config '{"method": "mtp", "model": "<repo>/mtp", "num_speculative_tokens": 2}'`), weights total 155.3 GiB. Use `--max-model-len 66560 --gpu-memory-utilization 0.97` on a single B200.

### Request format

* Thinking is always on and comes back in the `reasoning` / `reasoning_content` field.
* `reasoning_effort`: `low`, `high` or `max` (the default). Pass it as the top-level OpenAI field or via `chat_template_kwargs`.
* Recommended sampling: `temperature=1.0, top_p=0.95`. Greedy decoding can make long thinking loop on hard prompts.
* Use `low` for chat, Q&A, tool calls, MCQ and vision. Use `max` with `max_tokens` ≥ 131,072 for competition math and GPQA-level science.
* Tools: `--tool-call-parser glm47 --enable-auto-tool-choice` returns structured `tool_calls`.
* Images and videos use standard OpenAI multi-part content (`image_url` / `video_url`).

```python
from openai import OpenAI
client = OpenAI(base_url="http://<head-node>:8000/v1", api_key="EMPTY")
r = client.chat.completions.create(
    model="glm53-flash-e224",
    messages=[{"role": "user", "content": "Prove that sqrt(2) is irrational."}],
    temperature=1.0, top_p=0.95, max_tokens=32768,
    extra_body={"reasoning_effort": "high"},
)
print(r.choices[0].message.content)
```

## Evaluation protocol

| Benchmark | Data | Prompt / extraction |
|---|---|---|
| GPQA-Diamond | `fingertap/GPQA-Diamond`, 198 questions | "Think step by step, then give your final answer as 'ANSWER: X'"; extracted after `</think>` |
| AIME 2025 | `math-ai/aime25`, 30 problems × 4 samples | integer answer after `</think>`; pass@1 averaged over samples |
| HumanEval | `openai/openai_humaneval`, 164 problems | final ```` ```python ```` block after `</think>`, prompt header prepended, executed against the canonical tests |
| C-Eval | `ceval/ceval-exam` val, 1,606 questions | "答案：X" after `</think>` |
| MMMU | `MMMU/MMMU` val, 900 questions | images inlined as base64 at their `<image i>` positions (≤1,024 px); "ANSWER: X" |
| BFCL v4 | `bfcl-eval` | OpenAI-compatible FC handler, AST / state-based scoring |

## Limitations

* This is an unofficial derivative, not produced or endorsed by Z.ai or NVIDIA.
* **It doesn't fit a single DGX Spark.** The 128 GB unified memory is smaller than the 141 GiB of weights. You need two Sparks or a ≥180 GB GPU.
* Like the base model, it can produce inaccurate, biased or unsafe content. Evaluate it for your use case before deploying.

License: MIT (inherited from the base model).

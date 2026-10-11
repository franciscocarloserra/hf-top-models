---
license: apache-2.0
language:
- en
- zh
library_name: transformers
pipeline_tag: text-generation
tags:
- code
- agent
- agentic-coding
- moe
- coding
base_model:
- Qwen3.6-35B-A3B
---

<div style="background-color:#ffffff;border:none;border-radius:12px;padding:14px 22px;display:inline-block;">
<div style="display:flex;align-items:center;gap:20px;">
  <img src="kat_logo_hd.png" alt="KAT-Coder logo" width="120">
  <h1 style="margin:0;border:none;padding:0;font-size:52px;color:#1a4a25;">KAT-Coder-V2.5-Dev</h1>
</div>
</div>

<a href="https://huggingface.co/papers/2607.05471"><img src="https://img.shields.io/badge/Technical%20Report-1a4a25?style=for-the-badge&logo=arxiv&logoColor=white" alt="KAT-Coder Technical Report"></a>

<table style="border-collapse:collapse;width:100%;margin:0 auto;">
<tr>
  <td style="background-color:#e6f0e4;padding:14px 20px;border-left:4px solid #1a4a25;">
    <span style="color:#1a4a25;">This repository contains the model weights and configuration files for the post-trained <strong>KAT-Coder-V2.5-Dev</strong> in the Hugging Face Transformers format. The artifacts are compatible with Hugging Face Transformers, vLLM, SGLang, KTransformers, etc. <strong>Note:</strong> this open-weight release ships only the language-model weights and operates as a <strong>text-only</strong> model; the vision/multimodal components are not included and are unavailable.</span>
  </td>
</tr>
</table>

Following the release of KAT-Coder-V2.5 in July, we are pleased to release the open-weight version **KAT-Coder-V2.5-Dev**, an MOE model with a total parameter count of 35B and 3B activated parameters, to strengthen communication with the community and showcase our research achievements.

## KAT-Coder-V2.5-Dev Highlights

- **Performance improvement.** Through SFT/RL training, KAT-Coder-V2.5-Dev achieves SOTA results in the field of Agentic Coding among models with similar parameter scales.
- **Optimization of abnormal behaviors.** Through RL training, certain abnormal behaviors have been significantly optimized, such as: abnormal tool labels -9pp (9.34% -> 0.28%), single-turn continuous repetition -0.34pp (0.34% -> 0%).

## Benchmark performance

<p align="center">
  <a href="https://huggingface.co/Kwaipilot/KAT-Coder-V2.5-Dev/resolve/main/KAT-Coder-V2.5-Dev-Benchmarks.png?download=true">
    <img src="KAT-Coder-V2.5-Dev-Benchmarks.png" alt="KAT-Coder-V2.5-Dev benchmark performance" width="100%">
  </a>
</p>

<div style="background-color:#ffffff;border:none;border-radius:12px;padding:16px;overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;margin:0 auto;font-size:12.5px;line-height:1.4;white-space:nowrap;">
<tr>
  <td style="padding:11px 8px;text-align:center;border-bottom:2px solid #1a4a25;"><span style="color:#1a4a25;font-weight:700;">Benchmark</span></td>
  <td style="padding:11px 8px;text-align:center;background-color:#e2eede;border-bottom:2px solid #1a4a25;"><span style="color:#1a4a25;font-weight:700;">KAT-Coder-V2.5-Dev</span></td>
  <td style="padding:11px 8px;text-align:center;border-bottom:2px solid #1a4a25;"><span style="color:#1a4a25;font-weight:600;">Qwen3.5-27B</span></td>
  <td style="padding:11px 8px;text-align:center;border-bottom:2px solid #1a4a25;"><span style="color:#1a4a25;font-weight:600;">Qwen3.6-35BA3B</span></td>
  <td style="padding:11px 8px;text-align:center;border-bottom:2px solid #1a4a25;"><span style="color:#1a4a25;font-weight:600;">Gemma4-31B</span></td>
  <td style="padding:11px 8px;text-align:center;border-bottom:2px solid #1a4a25;"><span style="color:#1a4a25;font-weight:600;">Qwen3.5-35BA3B</span></td>
  <td style="padding:11px 8px;text-align:center;border-bottom:2px solid #1a4a25;"><span style="color:#1a4a25;font-weight:600;">Ornith-1.0-35B</span></td>
  <td style="padding:11px 8px;text-align:center;border-bottom:2px solid #1a4a25;"><span style="color:#1a4a25;font-weight:600;">Gemma4-26BA4B</span></td>
  <td style="padding:11px 8px;text-align:center;border-bottom:2px solid #1a4a25;"><span style="color:#1a4a25;font-weight:600;">Qwen3-Coder-30B</span></td>
</tr>
<tr>
  <td colspan="9" style="padding:8px 12px;background-color:#eef4ea;color:#1a4a25;font-weight:700;letter-spacing:0.03em;">Coding Agent</td>
</tr>
<tr>
  <td style="padding:9px 8px;text-align:left;font-weight:600;color:#333333;border-bottom:1px solid #ececec;">SWE-bench Verified</td>
  <td style="padding:9px 8px;text-align:center;background-color:#e2eede;border-bottom:1px solid #d7e4d2;"><strong style="color:#1a4a25;">69.40</strong></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">68.60</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">64.40</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">60.60</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">58.60</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">55.80</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">35.80</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">31.80</td>
</tr>
<tr>
  <td style="padding:9px 8px;text-align:left;font-weight:600;color:#333333;border-bottom:1px solid #ececec;">SWE-bench Multilingual</td>
  <td style="padding:9px 8px;text-align:center;background-color:#e2eede;border-bottom:1px solid #d7e4d2;"><strong style="color:#1a4a25;">63.00</strong></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">57.67</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">57.00</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">49.33</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">47.67</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">51.67</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">27.33</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">20.67</td>
</tr>
<tr>
  <td style="padding:9px 8px;text-align:left;font-weight:600;color:#333333;border-bottom:1px solid #ececec;">SWE-bench Pro</td>
  <td style="padding:9px 8px;text-align:center;background-color:#e2eede;border-bottom:1px solid #d7e4d2;"><strong style="color:#1a4a25;">45.96</strong></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">42.13</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">40.63</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">32.97</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">38.03</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">34.47</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">9.58</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">19.84</td>
</tr>
<tr>
  <td style="padding:9px 8px;text-align:left;font-weight:600;color:#333333;border-bottom:1px solid #ececec;vertical-align:middle;">Terminal-Bench 2.1</td>
  <td style="padding:9px 8px;text-align:center;background-color:#e2eede;border-bottom:1px solid #d7e4d2;"><strong style="color:#1a4a25;">41.02</strong><br><span style="font-size:11px;color:#7c8a78;">32.60 / 49.44</span></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">34.84<br><span style="font-size:11px;color:#9aa596;">41.57 / 28.10</span></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">32.02<br><span style="font-size:11px;color:#9aa596;">34.83 / 29.20</span></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">32.59<br><span style="font-size:11px;color:#9aa596;">30.34 / 34.83</span></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">26.12<br><span style="font-size:11px;color:#9aa596;">26.44 / 25.80</span></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">35.98<br><span style="font-size:11px;color:#9aa596;">35.96 / 36.00</span></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">20.94<br><span style="font-size:11px;color:#9aa596;">27.27 / 14.60</span></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">13.50<br><span style="font-size:11px;color:#9aa596;">10.11 / 16.90</span></td>
</tr>
<tr>
  <td style="padding:9px 8px;text-align:left;font-weight:600;color:#333333;border-bottom:1px solid #ececec;">PinchBench</td>
  <td style="padding:9px 8px;text-align:center;background-color:#e2eede;border-bottom:1px solid #d7e4d2;"><strong style="color:#1a4a25;">93.43</strong></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">90.71</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">92.21</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">85.53</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">88.75</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">91.62</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">82.01</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">72.3</td>
</tr>
<tr>
  <td style="padding:9px 8px;text-align:left;font-weight:600;color:#333333;border-bottom:1px solid #ececec;">Scicode</td>
  <td style="padding:9px 8px;text-align:center;background-color:#e2eede;border-bottom:1px solid #d7e4d2;"><strong style="color:#1a4a25;">44.20</strong></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">25.58</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">37.53</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">33.19</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">27.73</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">30.34</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">30.84</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;border-bottom:1px solid #ececec;">18.27</td>
</tr>
<tr>
  <td style="padding:9px 8px;text-align:left;font-weight:600;color:#333333;">KAT-Code-Bench</td>
  <td style="padding:9px 8px;text-align:center;background-color:#e2eede;"><strong style="color:#1a4a25;">46.21</strong></td>
  <td style="padding:9px 8px;text-align:center;color:#444444;">44.83</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;">42.76</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;">37.93</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;">35.86</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;">33.10</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;">22.06</td>
  <td style="padding:9px 8px;text-align:center;color:#444444;">15.17</td>
</tr>
</table>
</div>

<sub>For **Terminal-Bench 2.1**, the bold number is the average across two agent harnesses; the small numbers below are the per-harness scores (Terminus-2 / Claude Code).</sub>

<div style="background-color:#ffffff;border:none;border-radius:12px;padding:14px 18px;margin-top:6px;">
<div style="font-size:11.5px;line-height:1.5;color:#8a8a8a;">

<p style="margin:0 0 3px;"><strong style="color:#555;">1. Evaluation method.</strong> All metrics presented in the table are reproduced in-house: we download the public model checkpoints, deploy them via vLLM or SGLang, and evaluate under a unified standardized pipeline. No officially reported results of the respective models are directly adopted in this table. Each model is tested only once on each evaluation set; retests are conducted only if obvious errors are found.</p>

<p style="margin:6px 0 2px;"><strong style="color:#555;">2. Evaluation configuration.</strong></p>
<p style="margin:0 0 2px;">* SWE-bench Verified / Multilingual / Pro, KAT-Code-Bench: agent=claude_code@2.1.195, pass@k=1, temperature=1.0, top_p=0.95, 256k ctx.</p>
<p style="margin:0 0 2px;">* Terminal-Bench 2.1: agent=terminus-2 / claude_code, pass@k=1, temperature=0.7, top_p=1.0, 256k ctx.</p>
<p style="margin:0 0 2px;">* PinchBench: agent=openclaw@2026.3.13, pass@k=1, temperature=0.7, top_p=1.0, 256k ctx.</p>
<p style="margin:0 0 2px;">* Scicode: pass@k=1, temperature=0.6, top_p=1.0, 256k ctx.</p>

<p style="margin:6px 0 2px;"><strong style="color:#555;">3. Anomaly description.</strong></p>
<p style="margin:0 0 2px;">* Qwen3.6-35BA3B: We found that on the SWE-bench Verified, SWE-bench Multilingual, and SWE-bench Pro test sets, our test results this time have an approximate 10 pp gap compared with the official results. We believe this is mainly caused by the harness version and some optimizations made to the test sets by the Qwen team, and it should not be an issue with the model itself.</p>
<p style="margin:0 0 2px;">* Qwen3.5-35BA3B: We observed frequent hallucinations during evaluation, including attempts to invoke the unavailable MultiEdit tool under the current agent environment, which negatively impacts the final metric.</p>
<p style="margin:0 0 2px;">* Gemma4-26B-A4B-it: Two main factors degrade evaluation performance: context overflow (exceeding the 256k context limit) and hallucinated calls to the unsupported MultiEdit tool in this evaluation setup.</p>
<p style="margin:0;">The above deviations arise from mismatches between model tool preference and the allowed toolset in the evaluation harness, rather than inherent capability limitations of the models.</p>

</div>
</div>

## Post-training

To provide a systematic overview of our team's work on data and algorithms, we adopt the widely recognized Qwen3.6-35B-A3B as the base model for post-training and build KAT-Coder-V2.5-Dev on top of it. Overall, KAT-Coder-V2.5-Dev largely follows the post-training recipe of KAT-V2.5, with most settings—including data construction, training pipeline, and optimization strategy—remaining unchanged. The full pipeline consists of two stages: supervised fine-tuning (SFT) and reinforcement learning (RL). We first fine-tune Qwen3.6-35B-A3B on a dataset of 127K examples and then perform RL training on the resulting SFT model.

During the RL stage, we retain the training infrastructure and key technical designs validated in KAT-V2.5, including the following four components:

1. **Token-in-Token-out (TITO) consistency.** We use TITO to ensure that the token sequences in the rollout and training stages are strictly identical, preventing training discrepancies caused by differences in chat templates, serialization, or tokenizer behavior.
2. **Truncated Importance Sampling (TIS).** To mitigate policy staleness and off-policy issues introduced by asynchronous rollouts, we apply TIS to truncate importance-sampling weights, reducing the variance and instability caused by excessively large weights.
3. **Reliable sandboxes and verifiers.** We systematically inspect and validate the stability and correctness of the sandboxes and verifiers. This helps prevent infrastructure failures—such as execution timeouts, environment errors, or verifier misjudgments—from being incorrectly treated as model failures and contaminating the reward signal.
4. **Hierarchical rewards based on harness execution feedback.** We construct hierarchical rewards from fine-grained execution feedback provided by the harness. This allows the model to optimize toward the final task objective while also receiving credit for meaningful progress in unsuccessful trajectories, thereby increasing the training value of failed attempts and providing denser reward signals.

However, Qwen3.6 exhibits trajectory patterns that differ from those observed in KAT-V2.5, requiring additional reward adaptations tailored to its behavior. In our initial experiments, a simple binary 0–1 reward caused model collapse as early as the second epoch. An analysis of the training trajectories revealed that, as training progressed, the model increasingly tended to issue a large number of parallel tool calls within a single turn—occasionally exceeding 70 calls. This behavior caused the context length to grow rapidly, generated a substantial number of invalid trajectories and execution errors, and ultimately destabilized RL training.

To address this issue, we augmented the original hierarchical reward with several Qwen3.6-specific penalties targeting (including but not limited to the following):

- Excessive parallel tool calls within a single turn;
- Failed tool calls;
- Empty tool-call blocks; and
- Large amounts of repeated content.

These targeted reward adjustments effectively suppressed pathological tool-use and repetitive-generation behaviors, enabling stable RL training for 10 epochs. Our experiments validate the effectiveness and feasibility of both the overall training pipeline and the Qwen3.6-specific reward design.

<p align="center">
  <a href="https://huggingface.co/Kwaipilot/KAT-Coder-V2.5-Dev/resolve/main/KAT-Coder-V2.5-Dev-RL-Reward-Curve.png?download=true">
    <img src="KAT-Coder-V2.5-Dev-RL-Reward-Curve.png" alt="RL training reward curve" width="100%">
  </a>
</p>

<p align="center"><sub><em>The proportion of samples that pass the unit test (1 for pass, 0 for fail) within a batch of samples during RL training.</em></sub></p>

## Quickstart

For streamlined integration, we recommend using KAT-Coder-V2.5-Dev via APIs. Below is a guide to use KAT-Coder-V2.5-Dev via OpenAI-compatible API.

### Serving KAT-Coder-V2.5-Dev

KAT-Coder-V2.5-Dev can be served via APIs with popular inference frameworks. In the following, we show example commands to launch OpenAI-Compatible API servers for KAT-Coder-V2.5-Dev model.

#### SGLang

SGLang is a fast serving framework for large language models and vision language models. sglang>=0.5.10 is recommended for KAT-Coder-V2.5-Dev, which can be installed using the following command in a fresh environment:

```shell
uv pip install sglang[all]
```

The following will create API endpoints at `http://localhost:8000/v1`:

> **Note:** This open-weight release ships only the language-model weights (no vision tower). If your SGLang version attempts to build the multimodal/vision components at load time, startup may fail on missing vision weights; in that case, run with the version's text/language-model-only option (see `python -m sglang.launch_server --help`).

- Standard Version: The following command can be used to create an API endpoint with maximum context length 262,144 tokens using tensor parallel on 8 GPUs.
   ```shell
   python -m sglang.launch_server \
       --model-path Kwaipilot/KAT-Coder-V2.5-Dev \
       --port 8000 \
       --tp-size 8 \
       --mem-fraction-static 0.8 \
       --context-length 262144 \
       --reasoning-parser qwen3
   ```
- Tool Use: To support tool use, you can use the following command.
   ```shell
   python -m sglang.launch_server \
       --model-path Kwaipilot/KAT-Coder-V2.5-Dev \
       --port 8000 \
       --tp-size 8 \
       --mem-fraction-static 0.8 \
       --context-length 262144 \
       --reasoning-parser qwen3 \
       --tool-call-parser qwen3_coder
   ```

#### vLLM

vLLM is a high-throughput and memory-efficient inference and serving engine for LLMs. vllm>=0.19.0 is recommended for KAT-Coder-V2.5-Dev, which can be installed using the following command in a fresh environment:

```shell
uv pip install vllm --torch-backend=auto
```

The following will create API endpoints at `http://localhost:8000/v1`:

> **Note:** This open-weight release ships only the language-model weights, so the `--language-model-only` flag is **required**. It tells vLLM to skip the vision encoder and multimodal profiling; without it, vLLM attempts to initialize vision-tower weights that are not present in the checkpoint and startup fails.

- Standard Version: The following command can be used to create an API endpoint with maximum context length 262,144 tokens using tensor parallel on 8 GPUs.
   ```shell
   vllm serve Kwaipilot/KAT-Coder-V2.5-Dev \
       --port 8000 \
       --tensor-parallel-size 8 \
       --max-model-len 262144 \
       --reasoning-parser qwen3 \
       --language-model-only
   ```
- Tool Call: To support tool use, you can use the following command.
   ```shell
   vllm serve Kwaipilot/KAT-Coder-V2.5-Dev \
       --port 8000 \
       --tensor-parallel-size 8 \
       --max-model-len 262144 \
       --reasoning-parser qwen3 \
       --enable-auto-tool-choice \
       --tool-call-parser qwen3_coder \
       --language-model-only
   ```

#### KTransformers

KTransformers is a flexible framework for experiencing cutting-edge LLM inference optimizations with CPU-GPU heterogeneous computing. For running KAT-Coder-V2.5-Dev with KTransformers, see the KTransformers Deployment Guide.

#### Hugging Face Transformers

Hugging Face Transformers contains a lightweight server which can be used for quick testing and moderate load deployment. The latest transformers is required for KAT-Coder-V2.5-Dev. Installing `accelerate` is also required for multi-GPU (sharded) loading:

```shell
pip install "transformers[serving]" accelerate
```

Then, run transformers serve to launch a server with API endpoints at `http://localhost:8000/v1`; it will place the model on accelerators if available:

```shell
transformers serve Kwaipilot/KAT-Coder-V2.5-Dev --port 8000
```

## Using KAT-Coder-V2.5-Dev via the Chat Completions API

The chat completions API is accessible via standard HTTP requests or OpenAI SDKs. Here, we show examples using the OpenAI Python SDK.

Before starting, make sure it is installed and the API key and the API base URL is configured, e.g.:

```shell
pip install -U openai

# Set the following accordingly
export OPENAI_BASE_URL="http://localhost:8000/v1"
export OPENAI_API_KEY="EMPTY"
```

### Text-Only Input

```python
from openai import OpenAI
# Configured by environment variables
client = OpenAI()

messages = [
    {"role": "user", "content": "Type \"I love KAT-Coder-V2.5-Dev\" backwards"},
]

chat_response = client.chat.completions.create(
    model="Kwaipilot/KAT-Coder-V2.5-Dev",
    messages=messages,
    max_tokens=81920,
    temperature=1.0,
    top_p=0.95,
    presence_penalty=1.5,
    extra_body={
        "top_k": 20,
    },
)
print("Chat response:", chat_response)
```

## Instruct (or Non-Thinking) Mode

KAT-Coder-V2.5-Dev will think by default before response. You can obtain direct response from the model without thinking by configuring the API parameters. For example,

```python
from openai import OpenAI
# Configured by environment variables
client = OpenAI()

messages = [
    {"role": "user", "content": "Write a Python function that returns the n-th Fibonacci number."},
]

chat_response = client.chat.completions.create(
    model="Kwaipilot/KAT-Coder-V2.5-Dev",
    messages=messages,
    max_tokens=32768,
    temperature=0.7,
    top_p=0.8,
    presence_penalty=1.5,
    extra_body={
        "top_k": 20,
        "chat_template_kwargs": {"enable_thinking": False},
    },
)
print("Chat response:", chat_response)
```

## Preserve Thinking

By default, only the thinking blocks generated in handling the latest user message is retained, resulting in a pattern commonly as interleaved thinking. KAT-Coder-V2.5-Dev has been additionally trained to preserve and leverage thinking traces from historical messages. You can enable this behavior by setting the preserve_thinking option:

```python
from openai import OpenAI
# Configured by environment variables
client = OpenAI()

messages = [...]

chat_response = client.chat.completions.create(
    model="Kwaipilot/KAT-Coder-V2.5-Dev",
    messages=messages,
    max_tokens=32768,
    temperature=0.7,
    top_p=0.8,
    presence_penalty=1.5,
    extra_body={
        "top_k": 20,
        "chat_template_kwargs": {"preserve_thinking": True},
    },
)
print("Chat response:", chat_response)
```

This capability is particularly beneficial for agent scenarios, where maintaining full reasoning context can enhance decision consistency and, in many cases, reduce overall token consumption by minimizing redundant reasoning. Additionally, it can improve KV cache utilization, optimizing inference efficiency in both thinking and non-thinking modes.

## Processing Ultra-Long Texts

KAT-Coder-V2.5-Dev natively supports context lengths of up to 262,144 tokens. For long-horizon tasks where the total length (including both input and output) exceeds this limit, we recommend using RoPE scaling techniques to handle long texts effectively, e.g., YaRN.

YaRN is currently supported by several inference frameworks, e.g., transformers, vllm, ktransformers and sglang. In general, there are two approaches to enabling YaRN for supported frameworks:

- Modifying the model configuration file: In the config.json file, change the rope_parameters fields in text_config to:
   ```json
   {
       "mrope_interleaved": true,
       "mrope_section": [
           11,
           11,
           10
       ],
       "rope_type": "yarn",
       "rope_theta": 10000000,
       "partial_rotary_factor": 0.25,
       "factor": 4.0,
       "original_max_position_embeddings": 262144
   }
   ```
- Passing command line arguments:

    For vllm, you can use

    ```shell
    VLLM_ALLOW_LONG_MAX_MODEL_LEN=1 vllm serve ... --hf-overrides '{"text_config": {"rope_parameters": {"mrope_interleaved": true, "mrope_section": [11, 11, 10], "rope_type": "yarn", "rope_theta": 10000000, "partial_rotary_factor": 0.25, "factor": 4.0, "original_max_position_embeddings": 262144}}}' --max-model-len 1010000
    ```

    For sglang and ktransformers, you can use

    ```shell
    SGLANG_ALLOW_OVERWRITE_LONGER_CONTEXT_LEN=1 python -m sglang.launch_server ... --json-model-override-args '{"text_config": {"rope_parameters": {"mrope_interleaved": true, "mrope_section": [11, 11, 10], "rope_type": "yarn", "rope_theta": 10000000, "partial_rotary_factor": 0.25, "factor": 4.0, "original_max_position_embeddings": 262144}}}' --context-length 1010000
    ```

## Citation

If you find our work helpful, feel free to give us a cite.

```bibtex
@misc{katcoder_v25_2026,
  title={{KAT-Coder-V2.5 Technical Report}},
  author={{KwaiKAT Team}},
  year={2026},
  month={July},
  eprint={2607.05471},
  archivePrefix={arXiv},
  primaryClass={cs.AI},
  url={https://arxiv.org/pdf/2607.05471}
}
```

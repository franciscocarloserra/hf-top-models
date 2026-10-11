---
license: other
license_name: swift-open-license-1.0
license_link: https://huggingface.co/ukisai/Swift-Qwen3.8-27b/blob/main/LICENSE
library_name: transformers
pipeline_tag: image-text-to-text
gated: true
tags:
- qwen3_8
- efficient-thinking
- reasoning
- token-efficient
- lora
base_model: Qwen/Qwen3.8-27B
base_model_relation: finetune
---

<div align="center">
  <a href="https://ukisai.com"><img src="ukisai-banner.png" alt="UkisAI" style="width:100%;max-width:100%;height:auto;display:block;margin-bottom:0.6em;" /></a>
  <div style="display:flex;justify-content:center;gap:0.6em;margin-bottom:1em;">
    <a href="https://ukisai.com"><strong>Website</strong></a> &nbsp;&bull;&nbsp;
    <a href="https://ukisai.com/products/swift"><strong>Learn more</strong></a> &nbsp;&bull;&nbsp;
    <a href="https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF"><strong>GGUF</strong></a> &nbsp;&bull;&nbsp;
    <a href="#license-and-access"><strong>Enterprise licensing</strong></a>
  </div>
</div>

# Swift-Qwen3.8-27B

Swift-Qwen3.8-27B is UkisAI's reasoning-efficient derivative of Qwen3.8-27B,
using **58.3% fewer thinking tokens** while maintaining near-identical performance
(**&lt;1% loss**) and as a result getting a **x1.95 speed-up** on several tasks.

<video controls autoplay muted loop playsinline style="width:100%;max-width:100%;height:auto;display:block;border-radius:12px;margin:0.8em 0 1.4em;" src="https://huggingface.co/ukisai/Swift-Qwen3.8-27b/resolve/main/swift-speed-demo.mp4"></video>
<p align="center" style="font-size:13px;color:#8C94A8;margin:-0.6em 0 1.4em;">The prompt is a sample from LiveCodeBench v6</p>

## Training approach

We built Swift by identifying reasoning-marker tokens that, in our analysis, trigger overthinking in Qwen’s
reasoning rollouts. We then fine-tuned Qwen by penalizing usage of those tokens while it reasons.

Swift produces shorter reasoning traces. In our testing, we also observe fewer overthinking errors.

For maximum gains, Swift also includes a transfer component derived from
[BottleCap AI's ThinkingCap-Qwen3.6-27B](https://huggingface.co/bottlecapai/ThinkingCap-Qwen3.6-27B).

## Evaluation scope

> All results below compare the Qwen3.8-27B BF16 base with the same base plus the
> Swift adapter.

## Benchmarks

<style>
.swift-table { width:100%; table-layout:fixed; border-collapse:separate; border-spacing:0; overflow:hidden; border:1px solid #27344A; border-radius:20px; background:#0D111B; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; font-size:14px; color:#BFBDBD; }
.swift-table th { padding:13px 8px; text-align:center; font-weight:700; color:#AEB5C7; background:#0D111B; border-right:1px solid #27344A; border-bottom:1px solid #27344A; }
.swift-table td { padding:14px 8px; text-align:center; color:#BFBDBD; background:#0D111B; border-right:1px solid #27344A; border-bottom:1px solid #27344A; vertical-align:middle; overflow-wrap:break-word; }
.swift-table tr > :last-child { border-right:0; }
.swift-table tbody tr:last-child td { border-bottom:0; }
.swift-table .benchmark-heading { color:#B7BDCD; background:#0D111B; border-bottom:3px solid #7D45B5; }
.swift-table .score-heading { color:#F0C5FF; background:#52239E; border-bottom:3px solid #7D45B5; }
.swift-table .tokens-heading, .swift-table .median-heading { color:#D4E8FF; background:#304FC2; border-bottom:3px solid #5687E6; }
.swift-table .benchmark { padding-left:18px; text-align:left; color:#FFFFFF; font-weight:600; }
.swift-table strong { color:#FFFFFF; }
.swift-table .section { padding:12px 18px; text-align:left; color:#B489FF; background:#2A2541; font-weight:700; letter-spacing:.08em; text-transform:uppercase; border-top:1px solid #3A3159; border-bottom:1px solid #3A3159; }
.swift-table .swift { background:#171127; }
.swift-table thead tr:nth-child(2) .swift { color:#D3A0FF; }
.swift-table .reduction { color:#69BFFF; background:#101B2C; font-weight:700; }
.swift-table .detail { color:#8C94A8; font-size:12px; font-weight:500; }

@media (max-width: 640px) {
  .swift-table { display:block !important; width:100% !important; max-width:100%; overflow-x:auto !important; -webkit-overflow-scrolling:touch; table-layout:auto !important; }
  .swift-table th, .swift-table td { min-width:100px; }
  .swift-table th:first-child, .swift-table td:first-child { min-width:160px; }
}
</style>

<table class="swift-table">
  <thead>
    <tr>
      <th rowspan="2" class="benchmark-heading" style="width:32%;text-align:left;padding-left:18px;vertical-align:bottom;">Benchmark</th>
      <th colspan="2" class="score-heading">Score</th>
      <th colspan="3" class="tokens-heading">Mean tokens</th>
      <th class="median-heading" style="width:14%;">Median tokens</th>
    </tr>
    <tr>
      <th>Base</th>
      <th class="swift">Swift</th>
      <th>Base</th>
      <th class="swift">Swift</th>
      <th class="reduction">Reduction</th>
      <th class="reduction">Reduction</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="section" colspan="7">General reasoning</td></tr>
    <tr><td class="benchmark">GPQA-Diamond</td><td>88.38%</td><td class="swift">88.28%</td><td>15,014</td><td class="swift"><strong>8,855</strong></td><td class="reduction">&darr; 41.0%</td><td class="reduction">&darr; 58.3%</td></tr>
    <tr><td class="benchmark">MMLU-Pro</td><td>85.47%</td><td class="swift">84.95%</td><td>2,980</td><td class="swift"><strong>1,603</strong></td><td class="reduction">&darr; 46.2%</td><td class="reduction">&darr; 28.3%</td></tr>
    <tr><td class="benchmark">C-Eval</td><td>90.00%</td><td class="swift">90.62%</td><td>1,492</td><td class="swift"><strong>804</strong></td><td class="reduction">&darr; 46.1%</td><td class="reduction">&darr; 19.3%</td></tr>
    <tr><td class="benchmark">IFBench</td><td>73.53%</td><td class="swift">71.80%</td><td>8,052</td><td class="swift"><strong>4,657</strong></td><td class="reduction">&darr; 42.2%</td><td class="reduction">&darr; 50.5%</td></tr>
    <tr><td class="section" colspan="7">Mathematics</td></tr>
    <tr><td class="benchmark">AIME 2026</td><td>98.67%</td><td class="swift">94.00%</td><td>22,014</td><td class="swift"><strong>16,143</strong></td><td class="reduction">&darr; 26.7%</td><td class="reduction">&darr; 50.2%</td></tr>
    <tr><td class="benchmark">HMMT (Nov 2025)</td><td>99.33%</td><td class="swift">96.00%</td><td>22,032</td><td class="swift"><strong>15,189</strong></td><td class="reduction">&darr; 31.1%</td><td class="reduction">&darr; 45.9%</td></tr>
    <tr><td class="section" colspan="7">Multimodal</td></tr>
    <tr><td class="benchmark">ERQA</td><td>67.45%</td><td class="swift">66.30%</td><td>4,137</td><td class="swift"><strong>2,045</strong></td><td class="reduction">&darr; 50.6%</td><td class="reduction">&darr; 54.6%</td></tr>
    <tr><td class="section" colspan="7">Agentic coding</td></tr>
    <tr><td class="benchmark">Terminal-Bench 2.1</td><td>66.74%</td><td class="swift">65.84%</td><td>37,086</td><td class="swift"><strong>27,272</strong></td><td class="reduction">&darr; 26.5%</td><td class="reduction">&darr; 38.7%</td></tr>
    <tr><td class="benchmark">LiveCodeBench v6</td><td>76.76%</td><td class="swift">81.55%</td><td>11,374</td><td class="swift"><strong>8,615</strong></td><td class="reduction">&darr; 24.3%</td><td class="reduction">&darr; 45.8%</td></tr>
  </tbody>
</table>

<details>
<summary><strong>How to reproduce</strong></summary>

<p style="font-size:13px;line-height:1.5;margin:8px 0;"><strong>Serving:</strong> BF16 · vLLM 0.27.1 · Qwen3 parser · context 262,144 · thinking xhigh.<br>
<strong>Sampling:</strong> temperature 1.0 · top_p 0.95 · top_k 20 · min_p 0 · presence_penalty 0 · repetition_penalty 1.<br>
<strong>Benchmarks:</strong> averages over five seeds (0–4) per model; five trials per task for Terminal-Bench.</p>

<table style="display:table;width:100%;border-collapse:collapse;font-size:13px;line-height:1.3;margin:8px 0;">
  <thead><tr><th style="padding:4px 8px;text-align:left;">Benchmark</th><th style="padding:4px 8px;text-align:right;">Output cap</th></tr></thead>
  <tbody>
    <tr><td style="padding:3px 8px;">GPQA-Diamond</td><td style="padding:3px 8px;text-align:right;">100,000</td></tr>
    <tr><td style="padding:3px 8px;">MMLU-Pro</td><td style="padding:3px 8px;text-align:right;">100,000</td></tr>
    <tr><td style="padding:3px 8px;">C-Eval</td><td style="padding:3px 8px;text-align:right;">16,384</td></tr>
    <tr><td style="padding:3px 8px;">IFBench</td><td style="padding:3px 8px;text-align:right;">81,920</td></tr>
    <tr><td style="padding:3px 8px;">AIME 2026</td><td style="padding:3px 8px;text-align:right;">250,000</td></tr>
    <tr><td style="padding:3px 8px;">HMMT Nov 2025</td><td style="padding:3px 8px;text-align:right;">250,000</td></tr>
    <tr><td style="padding:3px 8px;">ERQA</td><td style="padding:3px 8px;text-align:right;">100,000</td></tr>
    <tr><td style="padding:3px 8px;">Terminal-Bench 2.1</td><td style="padding:3px 8px;text-align:right;">Agent/task limits</td></tr>
    <tr><td style="padding:3px 8px;">LiveCodeBench v6</td><td style="padding:3px 8px;text-align:right;">32,768</td></tr>
  </tbody>
</table>

</details>

## Efficiency across and versus reasoning efforts

Qwen3.8's `reasoning_effort` setting lets users choose how much the model thinks.
For Swift to be useful across these settings, it needs to reduce thinking while
keeping accuracy close to the base. We therefore tested `xhigh`, `medium`, and `low`:
thinking-token savings persist at every level.

<table class="swift-table" style="display:table;width:100%;table-layout:fixed;">
  <thead>
    <tr>
      <th class="benchmark-heading" style="width:50%;text-align:left;padding-left:18px;white-space:normal;">Reasoning effort</th>
      <th class="tokens-heading" style="width:50%;white-space:normal;">Mean thinking reduction</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="benchmark">Xhigh</td><td class="reduction">&darr; 41.0%</td></tr>
    <tr><td class="benchmark">Medium</td><td class="reduction">&darr; 22.7%</td></tr>
    <tr><td class="benchmark">Low</td><td class="reduction">&darr; 25.8%</td></tr>
  </tbody>
</table>

The efficiency also holds up against the base's own lower effort settings. On
GPQA-Diamond (198 questions, 5 seeds, 990 paired calls), Swift at `xhigh` is
compared with the base at `xhigh` and at `medium`:

<table class="swift-table" style="display:table;width:100%;table-layout:fixed;">
  <thead>
    <tr>
      <th class="benchmark-heading" style="width:34%;text-align:left;padding-left:18px;white-space:normal;">GPQA-Diamond</th>
      <th class="score-heading" style="width:22%;white-space:normal;">Score</th>
      <th class="tokens-heading" style="width:22%;white-space:normal;">Mean tokens</th>
      <th class="median-heading" style="width:22%;white-space:normal;">Median tokens</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="benchmark">Base &middot; xhigh</td><td>88.38%</td><td>15,014</td><td>6,642</td></tr>
    <tr class="swift"><td class="benchmark swift">Swift &middot; xhigh</td><td class="swift"><strong>88.28%</strong></td><td class="swift"><strong>8,855</strong></td><td class="swift"><strong>2,771</strong></td></tr>
    <tr><td class="benchmark">Base &middot; medium</td><td>84.14%</td><td>4,451</td><td>1,753</td></tr>
  </tbody>
</table>

Swift retains the accuracy of `xhigh` while using about half the tokens, although
it uses about double the tokens of `medium`.

## Quantized models

Quantized deployment is the intended use for Swift: lower-memory weights paired with
shorter reasoning. The INT4 evaluations below retain token savings across GPQA,
IFBench, and AIME. On AIME, Swift matches or improves accuracy and reduces output-cap
failures by **31–33%**.

<table class="swift-table" style="display:table;width:100%;table-layout:fixed;">
  <thead><tr>
    <th class="benchmark-heading" style="width:32%;text-align:left;padding-left:18px;white-space:normal;">Benchmark / quantization</th>
    <th class="score-heading" style="width:16%;white-space:normal;">Base accuracy</th>
    <th class="score-heading" style="width:16%;white-space:normal;">Swift accuracy</th>
    <th class="tokens-heading" style="width:18%;white-space:normal;">Mean token reduction</th>
    <th class="median-heading" style="width:18%;white-space:normal;">Median token reduction</th>
  </tr></thead>
  <tbody>
    <tr><td class="benchmark">GPQA-Diamond<br><span class="detail">Mixed-precision quant W4A16 · thinking tokens</span></td><td>88.69%</td><td class="swift">88.38%</td><td class="reduction">&darr; 32.1%</td><td class="reduction">&darr; 50.2%</td></tr>
    <tr><td class="benchmark">IFBench<br><span class="detail">Mixed-precision quant W4A16 · completion tokens</span></td><td>72.58%</td><td class="swift">71.25%</td><td class="reduction">&darr; 30.1%</td><td class="reduction">&darr; 38.0%</td></tr>
    <tr><td class="benchmark">AIME 2026<br><span class="detail">Mixed-precision quant W4A16 · completion tokens</span></td><td>84.00%</td><td class="swift">84.00%</td><td class="reduction">&darr; 19.0%</td><td class="reduction">&darr; 37.5%</td></tr>
    <tr><td class="benchmark">AIME 2026<br><span class="detail">AWQ INT4 · completion tokens</span></td><td>82.67%</td><td class="swift">84.00%</td><td class="reduction">&darr; 22.8%</td><td class="reduction">&darr; 34.8%</td></tr>
  </tbody>
</table>

<details>
<summary><strong>Quantized evaluation settings</strong></summary>

Each row compares the same quantized base with and without the Swift adapter.
GPQA and AIME use five seeds; IFBench uses four samples per prompt and strict scoring.
Output caps: GPQA 100,000; IFBench 81,920; AIME 32,768. GPQA and IFBench use saved
historical base runs. AIME uses template-default effort and counts truncated answers
as incorrect. Its shorter cap makes it a separate comparison from the BF16 table.

</details>

## How to use

### GGUF download

The **[GGUF version](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF)** is available for compatible llama.cpp-based runtime.

### UkisAI API

Swift is served through an OpenAI-compatible API at `https://ukisai.com/api/swift/v1`.
It is **free for research purposes** and needs no API key. The model id is `swift`.

```python
from openai import OpenAI

client = OpenAI(base_url="https://ukisai.com/api/swift/v1", api_key="none")
response = client.chat.completions.create(
    model="swift",
    messages=[{"role": "user", "content": "Explain speculative decoding in two sentences."}],
)
print(response.choices[0].message.content)
```

```bash
curl https://ukisai.com/api/swift/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "swift", "messages": [{"role": "user", "content": "Hello, Swift."}]}'
```

### Transformers

```python
import torch
from transformers import AutoModelForImageTextToText, AutoProcessor

model_id = "ukisai/Swift-Qwen3.8-27b"
processor = AutoProcessor.from_pretrained(model_id)
model = AutoModelForImageTextToText.from_pretrained(
    model_id,
    torch_dtype=torch.bfloat16,
    device_map="auto",
)
```

### vLLM

```bash
vllm serve ukisai/Swift-Qwen3.8-27b \
  --dtype bfloat16 \
  --tensor-parallel-size 1 \
  --max-model-len 262144 \
  --reasoning-parser qwen3 \
  --enable-auto-tool-choice \
  --tool-call-parser qwen3_coder \
  --port 8000
```

### SGLang

Alternatively, use a current SGLang build with Qwen3.8 support:

```bash
python -m sglang.launch_server \
  --model-path ukisai/Swift-Qwen3.8-27b \
  --dtype bfloat16 \
  --tp-size 1 \
  --context-length 262144 \
  --reasoning-parser qwen3 \
  --tool-call-parser qwen3_coder \
  --port 8000
```

Adjust tensor parallelism and context length to your GPU memory. See the base model's
[vLLM recipe](https://recipes.vllm.ai/Qwen/Qwen3.8-27B) and
[SGLang recipe](https://docs.sglang.io/cookbook/autoregressive/Qwen/Qwen3.8-27B)
for installation and hardware-specific settings.

### Optional MTP decoding

The published weights include the base model's MTP head. To enable self-speculative
decoding, append the corresponding flags to the server command above:

```bash
# vLLM
--speculative-config '{"method":"mtp","num_speculative_tokens":3}'

# SGLang
--speculative-algorithm EAGLE --speculative-num-steps 3 \
  --speculative-eagle-topk 1 --speculative-num-draft-tokens 4
```

## License and access

Swift-Qwen3.8-27B is a derivative of [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B)
(Copyright 2026 Alibaba Cloud, [Apache License 2.0](https://huggingface.co/ukisai/Swift-Qwen3.8-27b/blob/main/LICENSE-APACHE-2.0)). UkisAI's contribution,
the fine-tuned weights, is licensed under the **[Swift Open License v1.0](https://huggingface.co/ukisai/Swift-Qwen3.8-27b/blob/main/LICENSE)**.
See [NOTICE](https://huggingface.co/ukisai/Swift-Qwen3.8-27b/blob/main/NOTICE) for exactly what was changed.

Personal, research, educational, evaluation, and commercial use are free for individuals
and organizations with gross annual revenue, including affiliates, of up to US$1,000,000.
Above that threshold, commercial use requires a separate **Swift Enterprise License**.
Contact [UkisAI](https://ukisai.com/contact) for terms.

Nothing in the Swift Open License limits your rights in Qwen3.8-27B itself under Apache 2.0.

## Citation

```bibtex
@misc{swift-qwen3.8-27b,
  title  = {Swift-Qwen3.8-27B},
  author = {UkisAI},
  year   = {2026},
  url    = {https://huggingface.co/ukisai/Swift-Qwen3.8-27b}
}
```

## Acknowledgements

We acknowledge the [NVIDIA Innovation Lab](https://www.nvidia.com/en-us/data-center/innovation-lab/) for providing access to **8× NVIDIA H100 GPUs** to train Swift.

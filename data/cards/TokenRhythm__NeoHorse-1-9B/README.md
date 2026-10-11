---
license: apache-2.0
library_name: transformers
pipeline_tag: text-generation
base_model: "Qwen/Qwen3.5-9B"
base_model_relation: finetune
tags:
  - agentic
  - tool-use
  - coding
  - reasoning
  - instruction-following
---

<div align="center">
  <h1>NeoHorse-1-9B</h1>
  <p><b>Towards Recursive Self-Improvement via Agentic Post-Training with Routing Harness.</b></p>
</div>

<div align="center">
  <a href="https://github.com/TokenRhythm/NeoHorse"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-NeoHorse-181717?logo=github&logoColor=white"></a>
  <a href="https://www.modelscope.cn/models/TokenRhythm/NeoHorse-1-9B"><img alt="ModelScope" src="https://img.shields.io/badge/ModelScope-Models-624AFF?logo=modelscope&logoColor=white"></a>
  <a href="https://huggingface.co/TokenRhythm"><img alt="Hugging Face" src="https://img.shields.io/badge/Hugging%20Face-Models-FFD21E?logo=huggingface&logoColor=000000"></a>
  <a href="https://tokenrhythm.ai/"><img alt="Company" src="https://img.shields.io/badge/Company-TokenRhythm-F97316?logo=homeassistant&logoColor=white"></a>
  <a href="https://x.com/opensquilla"><img alt="Twitter / X" src="https://img.shields.io/badge/Twitter%20%2F%20X-OpenSquilla-111827?logo=x&logoColor=white"></a>
  <a href="https://www.apache.org/licenses/LICENSE-2.0"><img alt="License: Apache-2.0" src="https://img.shields.io/badge/License-Apache--2.0-64748B"></a>
</div>

<p align="center">
  <a href="https://arxiv.org/abs/2609.08183"><b>Technical Report</b></a>
</p>

<style>
/* Reusable benchmark table architecture. Inline styles remain as a fallback for HF rendering. */
.vl-table {
  width: 100%;
  min-width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 15px;
}
.vl-table th {
  font-size: 15px !important;
  line-height: 1.2;
  color: #c2410c;
  background: rgba(249,115,22,.10);
}
.vl-table td:not(.benchmark-cell):not([colspan]) {
  font-size: 15px;
  line-height: 1.2;
  vertical-align: middle;
}
.vl-table .benchmark-cell {
  padding: 12px 10px 12px 18px !important;
  vertical-align: middle;
}
.vl-table .benchmark-capability {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.22;
  color: #c2410c;
}
.vl-table .benchmark-name {
  margin-top: 4px;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.2;
  color: inherit;
}
.vl-table .metric-stack {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 3px 0;
}
.vl-table .metric-label {
  font-size: 10px;
  font-weight: 400;
  line-height: 1.1;
  color: inherit;
}
.vl-table .metric-value {
  margin-top: 2px;
  font-size: 15px;
  line-height: 1.15;
  color: inherit;
}
.model-table td:first-child {
  width: 34%;
  font-weight: 600;
}
/* HF's theme toggle sets the dark class on an ancestor. */
.dark .vl-table th,
.dark .vl-table .benchmark-capability {
  color: #fdba74 !important;
}
</style>

NeoHorse-1-9B is a 9B causal language model and an initial prototype on the path toward **recursive self-improvement (RSI)**. It is post-trained from Qwen3.5-9B for text-based agent harnesses, tool use, coding, and instruction following.

Derived from [Qwen/Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B) and fine-tuned by TokenRhythm. This release contains **language-model weights only** and is repackaged for text-only inference. Vision weights are not included. Repackaging changes configuration and tensor key names, without changing the fine-tuned tensor values.

<p align="center">
  <a href="https://huggingface.co/TokenRhythm/NeoHorse-1-9B/resolve/main/9B_head_fig.jpg">
    <img src="https://huggingface.co/TokenRhythm/NeoHorse-1-9B/resolve/main/9B_head_fig.jpg" alt="NeoHorse-1-9B evaluation results" width="100%">
  </a>
</p>

## Highlights

- **Path toward RSI:** the routing harness assigns tasks to a heterogeneous model pool, records tool interactions and outcomes, estimates capability demand, and uses capability-level feedback to shape the next training mixture. Updated models can return to the harness, closing a prototype evaluation–selection–update loop; extending this loop across successive iterations is the next step toward RSI.
- **Agentic post-training framework:** the associated research explores routing-guided curriculum SFT and routing-guided on-policy distillation to turn execution trajectories into training signal while preserving execution and harness context around each response.
- **Data quality:** exact and near-duplicate removal, evaluation decontamination, structural validation, six-dimensional semantic evaluation, and subscene-level Scene/Goal/Outcome labeling.
- **Broad gains:** 69.04 macro average across ten benchmarks versus 65.60 for Qwen3.5-9B (**+3.44**).

## Model Details

<div style="width:100%;max-width:none;margin:16px 0;padding:0;overflow-x:auto">
<table class="vl-table model-table" width="100%" style="display:table;width:100%;min-width:100%;table-layout:fixed;border-collapse:collapse;font-size:13px">
<thead><tr>
<th style="padding:9px 10px;text-align:left;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.10)">Property</th>
<th style="padding:9px 10px;text-align:left;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.10)">Value</th>
</tr></thead><tbody>
<tr>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16);font-weight:600">Model family</td>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16)">NeoHorse Agent-Native Causal Language Model</td>
</tr>
<tr>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16);font-weight:600">Parameters</td>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16)">Approximately <strong>9B</strong></td>
</tr>
<tr>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16);font-weight:600">Base model</td>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16)"><a href="https://huggingface.co/Qwen/Qwen3.5-9B">Qwen3.5-9B</a></td>
</tr>
<tr>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16);font-weight:600">Post-training</td>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16)">Routing-guided agentic post-training</td>
</tr>
<tr>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16);font-weight:600">Interface</td>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16)">Text input and text output</td>
</tr>
<tr>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16);font-weight:600">Context length</td>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16)">262,144 natively and extensible up to 1,010,000 tokens.</td>
</tr>
<tr>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16);font-weight:600">Weight format / precision</td>
<td style="padding:9px 10px;border-bottom:1px solid rgba(249,115,22,.16)">Safetensors / BF16</td>
</tr>
</tbody></table>
</div>

## Evaluation
The 9B track compares NeoHorse-1-9B with five representative open-weight baselines: Granite-4.2-8B, Qwen3.5-9B, Ornith-1.5-9B, Gemma-4-12B-it, and Muse-Glimmer-30B. Results cover ten benchmarks and are grouped by capability. Higher is better; `Δ` is NeoHorse-1-9B minus Qwen3.5-9B. **Bold** and <u>underline</u> mark the best and second-best results in each benchmark row, respectively; ties share the same formatting.

<div style="overflow-x:auto">
<table class="vl-table" width="100%" style="display:table;width:100%;min-width:100%;border-collapse:collapse;table-layout:fixed;font-size:13px">
<thead><tr><th style="padding:9px 8px;text-align:left;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.10)">Benchmark</th>
<th style="padding:9px 8px;text-align:center;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.10)">Granite-4.2-8B</th>
<th style="padding:9px 8px;text-align:center;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.10)">Qwen3.5-9B</th>
<th style="padding:9px 8px;text-align:center;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.10)">Ornith-1.5-9B</th>
<th style="padding:9px 8px;text-align:center;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.10)">Gemma-4-12B-it</th>
<th style="padding:9px 8px;text-align:center;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.10)">Muse-Glimmer-30B</th>
<th style="padding:9px 8px;text-align:center;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.18)">NeoHorse-1-9B</th>
<th style="padding:9px 8px;text-align:center;border-bottom:2px solid #f97316;color:#c2410c;background:rgba(249,115,22,.18)">Δ vs Qwen3.5-9B</th></tr></thead><tbody>
<tr><td class="benchmark-capability" colspan="8" style="padding:10px 8px;font-weight:700;color:#c2410c;background:rgba(249,115,22,.10);border-top:2px solid #f97316">🤖 Agentic</td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">QwenClawBench</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">37.01</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">44.04</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><u>47.27</u></span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">43.53</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">46.11</span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value"><strong>48.73</strong></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+4.69</span></div></td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">WorkBuddy Bench</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">35.07</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">39.60</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">29.29</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">29.65</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><strong>45.85</strong></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value"><u>40.15</u></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+0.55</span></div></td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">PinchBench</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">56.93</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><u>74.55</u></span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">68.22</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">58.89</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">71.35</span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value"><strong>82.25</strong></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+7.70</span></div></td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">VitaBench</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">23.00</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">31.25</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">26.75</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">36.50</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><strong>48.50</strong></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value"><u>42.25</u></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+11.00</span></div></td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">BFCL v4</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">52.06</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">64.88</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><u>65.03</u></span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">62.06</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">53.74</span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value"><strong>67.43</strong></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+2.55</span></div></td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">tau2-Bench</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">62.28</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><u>88.04</u></span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">83.68</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">59.37</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">76.64</span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value"><strong>90.82</strong></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+2.78</span></div></td></tr>
<tr><td class="benchmark-capability" colspan="8" style="padding:10px 8px;font-weight:700;color:#c2410c;background:rgba(249,115,22,.10);border-top:2px solid #f97316">💻 Coding</td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">HumanEval</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">96.34</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">92.68</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">93.90</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><strong>100.00</strong></span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><u>98.17</u></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value"><u>98.17</u></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+5.49</span></div></td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">LiveCodeBench v6</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><u>72.00</u></span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">65.14</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">47.43</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><strong>73.14</strong></span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">65.71</span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value">65.14</span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+0.00</span></div></td></tr>
<tr><td class="benchmark-capability" colspan="8" style="padding:10px 8px;font-weight:700;color:#c2410c;background:rgba(249,115,22,.10);border-top:2px solid #f97316">📚 Instruction Following</td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">IFBench</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><u>78.00</u></span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">66.33</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">40.00</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">77.67</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><strong>78.67</strong></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value">66.33</span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+0.00</span></div></td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">IFEval</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">92.98</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">89.46</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">71.35</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><strong>94.27</strong></span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><u>93.90</u></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value">89.09</span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">-0.37</span></div></td></tr>
<tr><td class="benchmark-capability" colspan="8" style="padding:10px 8px;font-weight:700;color:#c2410c;background:rgba(249,115,22,.10);border-top:2px solid #f97316">📊 Overall</td></tr>
<tr style="border-bottom:1px solid rgba(128,128,128,.16)"><td class="benchmark-cell" style="padding:8px;font-weight:600"><div class="benchmark-name">Ten-benchmark average</div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">60.57</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">65.60</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">57.29</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value">63.51</span></div></td><td style="padding:8px;text-align:center"><div class="metric-stack"><span class="metric-value"><u>67.86</u></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16)"><div class="metric-stack"><span class="metric-value"><strong>69.04</strong></span></div></td><td style="padding:8px;text-align:center;background:rgba(249,115,22,.16);font-weight:700"><div class="metric-stack"><span class="metric-value">+3.44</span></div></td></tr>
</tbody></table>
</div>


> **Reported protocol:** SGLang v0.5.17 · `temperature=1.0` · `top_p=0.95` · `top_k=20` · `min_p=0.0` · `presence_penalty=1.5` · `repetition_penalty=1.0` · thinking mode enabled with `enable_thinking=true` and `force_nonempty_content=true`. QwenClawBench, WorkBuddy Bench, and tau2-Bench use three runs; PinchBench and VitaBench use one run; the remaining benchmarks follow their official protocols. VitaBench uses the DeepSeek-V4-Flash simulator and judge.

## Deployment

The examples below are for self-hosted deployment from a downloaded local checkpoint.

### Local checkpoint path

The examples below assume the checkpoint has already been downloaded to local disk. Set `MODEL_PATH` to the directory containing `config.json`, tokenizer files, and model weights.

```bash
MODEL_PATH="/path/to/NeoHorse-1-9B"
```

The OpenAI-compatible requests below use the server's `--served-model-name` (for example, `neohorse-1-9b`), not the filesystem path.


### SGLang

The technical report uses SGLang v0.5.17.

```bash
pip install "sglang==0.5.17"
MODEL_PATH="/path/to/NeoHorse-1-9B"
python3 -m sglang.launch_server \
  --model-path "$MODEL_PATH" \
  --served-model-name neohorse-1-9b \
  --host 0.0.0.0 \
  --port 30000 \
  --context-length 262144 \
  --reasoning-parser qwen3 \
  --tool-call-parser qwen3_coder
```

Send an OpenAI-compatible request after the server starts:

```bash
curl http://localhost:30000/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -d '{"model":"neohorse-1-9b","messages":[{"role":"user","content":"Write a Python function that returns the first n Fibonacci numbers."}],"max_tokens":512}'
```

### vLLM

```bash
pip install -U vllm
MODEL_PATH="/path/to/NeoHorse-1-9B"
vllm serve "$MODEL_PATH" \
  --served-model-name neohorse-1-9b \
  --host 0.0.0.0 \
  --port 8000 \
  --max-model-len 262144 \
  --reasoning-parser qwen3 \
  --enable-auto-tool-choice \
  --tool-call-parser qwen3_coder
```

The server exposes an OpenAI-compatible `/v1/chat/completions` endpoint. Send a request after the server starts:

```bash
curl http://localhost:8000/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -d '{"model":"neohorse-1-9b","messages":[{"role":"user","content":"Write a Python function that returns the first n Fibonacci numbers."}],"max_tokens":512}'
```

The example uses the configured 262,144-token context limit. Actual capacity depends on GPU memory and serving settings; reduce the context limit if needed.

## License

NeoHorse-1-9B is released under the **Apache License 2.0**.

The upstream model is [Qwen/Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B). Its original copyright notice, Copyright 2026 Alibaba Cloud, is retained in the license file. TokenRhythm has modified the model through fine-tuning and repackaging for text-only inference. Modification notices are included in this model card and the released configuration, weight index, and Safetensors metadata.

## Citation

```
@misc{neohorse2026,
  title        = {NeoHorse-1: Towards Recursive Self-Improvement via Agentic Post-Training with Routing Harness},
  author       = {NeoHorse Team},
  year         = {2026},
  howpublished = {arXiv preprint},
  eprint       = {2609.08183},
  archivePrefix = {arXiv},
  primaryClass = {cs.CL},
  url          = {https://arxiv.org/abs/2609.08183}
}
```

For questions or issue reports, use the [NeoHorse project repository](https://github.com/TokenRhythm/NeoHorse).

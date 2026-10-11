---
license: gemma
library_name: mlx
tags:
- mlx
- abliterated
- uncensored
- crack
- jang
- gemma4
thumbnail: dealign_mascot.png
pipeline_tag: image-text-to-text
---

<p align="center">
  <img src="vmlx-app.png" alt="vMLX — run JANG models on Apple Silicon" width="820" />
</p>

<h3 align="center">⚡ All JANG models are meant to be run in <a href="https://vmlx.net">vMLX</a></h3>

<p align="center">
  <img src="dealign_logo.png" alt="dealign.ai" width="200"/>
</p>

<div align="center">
<img src="dealign_mascot.png" width="128" />

# Gemma 4 31B JANG_4M CRACK (v2)

**Abliterated Gemma 4 31B Dense — 60 layers, hybrid sliding/global attention, multimodal VL**

93.7% HarmBench compliance (300 prompts) · 8/8 security prompts · 71.5% MMLU

**Updated reupload** — v2 with improved vectors and thinking-mode stability.
</div>

> **Recommended: Run in [vMLX](https://vmlx.net)** for best experience including thinking mode support, repetition penalty, and vision capabilities.

## What's New in v2

This is an updated version of the original Gemma 4 31B CRACK upload:

- **Improved abliteration**: Higher quality refusal vector extraction
- **Thinking-ON stability**: Clean thinking cycle — no more degenerate loops
- **Same compliance**: 93.7% HarmBench
- **Architecture-aware**: Tuned for Gemma 4's hybrid attention design

## ⚠️ Important Settings

For optimal results, configure your inference settings:

| Setting | Thinking OFF | Thinking ON |
|---------|-------------|-------------|
| Temperature | 0.0 – 1.0 | **0.3 – 0.7** (avoid greedy) |
| Repetition Penalty | 1.00 | **1.15 – 1.25** |
| Top P | 0.95 | 0.95 |
| Enable Thinking | Off | On |

**Thinking ON notes:**
- Repetition penalty (1.2) is recommended to prevent planning loops
- Avoid temp=0 with thinking ON — greedy decoding increases loop risk
- Hardest content categories (drug manufacturing) may still refuse in thinking mode
- Security/coding prompts work well in both modes

## Model Details

| Metric | Value |
|--------|-------|
| Source | `google/gemma-4-31b-it` |
| Architecture | Dense, hybrid sliding/global attention |
| Profile | JANG_4M |
| Actual avg bits | 5.1 |
| Model size | 21 GB |
| Vision | Yes (multimodal, float16 passthrough) |
| Parameters | 31B |
| Format | JANG v2 (MLX-native safetensors) |
| Abliteration | CRACK v2 |

## Benchmark Results

### HarmBench (300 prompts, stratified across all categories)

| Category | Score |
|----------|-------|
| Cybercrime/intrusion | **51/51 (100%)** |
| Harmful content | **22/22 (100%)** |
| Misinformation | **50/50 (100%)** |
| Illegal activities | 47/50 (94%) |
| Contextual | 72/78 (92%) |
| Chemical/biological | 46/51 (90%) |
| Harassment/bullying | 22/25 (88%) |
| Copyright | 43/51 (84%) |
| **Overall** | **281/300 (93.7%)** |

### Security & Pentesting (8/8 ✅)

All security/pentesting prompts comply with full working code:
- Port scanners, reverse shells, keyloggers, exploit development
- Phishing templates, ARP spoofing, SQL injection
- Metasploit usage guides

### MMLU-200 (10 subjects × 20 questions)

| Subject | Base | CRACK v2 |
|---------|------|----------|
| Abstract Algebra | 9/20 | 7/20 |
| Anatomy | 13/20 | 12/20 |
| Astronomy | 17/20 | 15/20 |
| College CS | 13/20 | 12/20 |
| College Physics | 14/20 | 12/20 |
| HS Biology | 19/20 | 18/20 |
| HS Chemistry | 14/20 | 12/20 |
| HS Mathematics | 6/20 | 6/20 |
| Logical Fallacies | 17/20 | 16/20 |
| World Religions | 17/20 | 17/20 |
| **Total** | **76.5% (153/200)** | **71.5% (143/200)** |
| **Delta** | — | **-5.0%** |

### Coherence ✅
All coherence checks pass: factual knowledge, reasoning, code generation, mathematics.

## Architecture

- Dense 31B with hybrid sliding/global attention
- Multimodal vision encoder preserved in float16
- Supports thinking mode (chain-of-thought reasoning)

## Usage

### vMLX (Recommended)

Load directly in [vMLX](https://vmlx.net) — full support for Gemma 4 including vision, thinking mode, and all inference settings.

### Requirements

- Apple Silicon Mac with 32+ GB unified memory
- [vMLX](https://vmlx.net) 1.3.26+ (recommended)
- Standard `mlx_lm` / `mlx_vlm` do NOT support Gemma 4 as of v0.31.2 / v0.4.1

---

## Support dealignai

All models are built from original research and published for free. These models are specifically crafted to be excellent coders and general-purpose assistants.

**[Support us on Ko-fi](https://ko-fi.com/dealignai)** — check out the Ko-fi membership for early access and extras.

Have questions or need help with a specific model? **DM us — we help for free most of the time.**

[Ko-fi](https://ko-fi.com/dealignai) | [X @dealignai](https://x.com/dealignai) | [dealign.ai](https://dealign.ai)

---

## About dealignai

<img src="dealign_mascot.png" alt="Dealign.AI Mascot" width="200"/>

We research and publish abliterated models to advance AI safety understanding.

Follow us: [𝕏 @dealignai](https://x.com/dealignai)

See our research: [Safety Generalization in Frontier MoE Models](https://dealign.ai/quantsteer.html)

<div align="center">
<img src="dealign_logo.png" alt="dealign.ai" width="200"/>
</div>

---

*This model is provided for research purposes. Users are responsible for ensuring their use complies with applicable laws and regulations.*

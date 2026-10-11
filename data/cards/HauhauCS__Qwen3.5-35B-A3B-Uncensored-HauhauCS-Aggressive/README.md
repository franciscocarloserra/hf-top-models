---
license: apache-2.0
tags:
  - uncensored
  - qwen3.5
  - moe
  - gguf
  - vision
  - multimodal
language:
  - en
  - zh
  - multilingual
pipeline_tag: image-text-to-text
base_model: Qwen/Qwen3.5-35B-A3B
---

# Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive

> **[Join the Discord](https://discord.gg/SZ5vacTXYf)** for updates, roadmaps, projects, or just to chat.

Qwen3.5-35B-A3B uncensored by HauhauCS. **0/465 refusals.**

## About

No changes to datasets or capabilities. Fully functional, 100% of what the original authors intended - just without the refusals.

These are meant to be the best lossless uncensored models out there.

## Aggressive Variant

Stronger uncensoring — model is fully unlocked and won't refuse prompts. May occasionally append short disclaimers (baked into base model training, not refusals) but full content is always generated.

For a more conservative uncensor that keeps some safety guardrails, check the Balanced variant when it's available.

## Downloads

| File | Quant | Size |
|------|-------|------|
| [Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-BF16.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-BF16.gguf) | BF16 | 65 GB |
| [Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q8_0.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q8_0.gguf) | Q8_0 | 35 GB |
| [Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q6_K.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q6_K.gguf) | Q6_K | 27 GB |
| [Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q5_K_M.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q5_K_M.gguf) | Q5_K_M | 24 GB |
| [Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf) | Q4_K_M | 20 GB |
| [Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-IQ4_XS.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-IQ4_XS.gguf) | IQ4_XS | 18 GB |
| [Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q3_K_M.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q3_K_M.gguf) | Q3_K_M | 16 GB |
| [Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-IQ3_M.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-IQ3_M.gguf) | IQ3_M | 15 GB |
| [Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-IQ2_M.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-IQ2_M.gguf) | IQ2_M | 11 GB |
| [mmproj-Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-f16.gguf](https://huggingface.co/HauhauCS/Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive/resolve/main/mmproj-Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-f16.gguf) | mmproj (f16) | 858 MB |

All quants generated with importance matrix (imatrix) for optimal quality preservation on abliterated weights.

## Specs

- 35B total parameters, ~3B active per forward pass (MoE)
- 256 experts, 8 routed + 1 shared per token
- Hybrid architecture: Gated DeltaNet linear attention + full softmax attention (3:1 ratio)
- 40 layers, pattern: 10 x (3 x DeltaNet-MoE + 1 x Attention-MoE)
- 262K native context (extendable to 1M with YaRN)
- Natively multimodal (text, image, video)
- Multi-token prediction (MTP) support
- 248K vocabulary, 201 languages
- Based on [Qwen/Qwen3.5-35B-A3B](https://huggingface.co/Qwen/Qwen3.5-35B-A3B)

## Recommended Settings

From the official Qwen authors:

**Thinking mode (default):**
- General: `temperature=1.0, top_p=0.95, top_k=20, min_p=0, presence_penalty=1.5`
- Coding/precise tasks: `temperature=0.6, top_p=0.95, top_k=20, min_p=0, presence_penalty=0`

**Non-thinking mode:**
- General: `temperature=0.7, top_p=0.8, top_k=20, min_p=0, presence_penalty=1.5`
- Reasoning tasks: `temperature=1.0, top_p=1.0, top_k=40, min_p=0, presence_penalty=2.0`

**Important:**
- Keep at least 128K context to preserve thinking capabilities
- Use `--jinja` flag with llama.cpp for proper chat template handling
- Vision support requires the `mmproj` file alongside the main GGUF

## Usage

Works with llama.cpp, LM Studio, Jan, koboldcpp, and other GGUF-compatible runtimes.

```bash
# Text only
llama-cli -m Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf \
  --jinja -c 131072 -ngl 99

# With vision
llama-cli -m Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf \
  --mmproj mmproj-Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-f16.gguf \
  --jinja -c 131072 -ngl 99
```

**Note:** LM Studio may show `256x2.6B` in the params column instead of `35B-A3B` — this is a cosmetic metadata quirk, the model runs correctly.

## Other Formats

- GGUF (this repo)
- GPTQ — coming soon

## Other Models

- [Qwen3.5-27B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.5-27B-Uncensored-HauhauCS-Aggressive)

---
license: apache-2.0
tags:
  - uncensored
  - qwen3.5
  - qwen
  - gguf
language:
  - en
  - zh
  - multilingual
---

# Qwen3.5-4B-Uncensored-HauhauCS-Aggressive

> **[Join the Discord](https://discord.gg/SZ5vacTXYf)** for updates, roadmaps, projects, or just to chat.

Qwen3.5-4B uncensored by HauhauCS.

## About

**0/465 refusals.** Fully uncensored with zero capability loss.

No changes to datasets or capabilities. Fully functional, 100% of what the original authors intended - just without the refusals.

These are meant to be the best lossless uncensored models out there.

## Aggressive Variant

Stronger uncensoring with more thorough refusal removal. If this variant is too loose for your use case, a Balanced variant may follow.

**Note:** The model is fully unlocked and will not refuse prompts. However, it may occasionally append a short disclaimer at the end of a response (e.g. "This is general information, not legal advice..."). This is baked into the base model's training and not a refusal — the actual content is still generated in full.

## Downloads

| File | Quant | Size |
|------|-------|------|
| Qwen3.5-4B-Uncensored-HauhauCS-Aggressive-BF16.gguf | BF16 | 7.9 GB |
| Qwen3.5-4B-Uncensored-HauhauCS-Aggressive-Q8_0.gguf | Q8_0 | 4.2 GB |
| Qwen3.5-4B-Uncensored-HauhauCS-Aggressive-Q6_K.gguf | Q6_K | 3.3 GB |
| Qwen3.5-4B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf | Q4_K_M | 2.6 GB |
| mmproj-Qwen3.5-4B-Uncensored-HauhauCS-Aggressive-BF16.gguf | Vision encoder | 645 MB |

**Vision support:** This model is natively multimodal. The `mmproj` file is the vision encoder — you need it alongside the main GGUF to use image/video inputs. Load both files in llama.cpp, LM Studio, or any compatible runtime.

## Specs

- 4B dense parameters, 32 layers
- Hybrid architecture: Gated DeltaNet linear attention + full softmax attention (3:1 ratio)
- 262K native context (extendable to 1M with YaRN)
- Natively multimodal (text, image, video)
- Multi-token prediction (MTP) support
- 248K vocabulary, 201 languages
- Based on [Qwen3.5-4B](https://huggingface.co/Qwen/Qwen3.5-4B)

## Recommended Settings

From the official Qwen authors:

**Thinking mode (default):**
- `temperature=0.6`, `top_p=0.95`, `top_k=20`, `min_p=0`

**Non-thinking mode:**
- `temperature=0.7`, `top_p=0.8`, `top_k=20`, `min_p=0`

**Important:**
- Maintain at least 128K context to preserve thinking capabilities
- For production/high-throughput: use vLLM, SGLang, or KTransformers

**Note:** This is a brand new architecture (released 2026-03-02). llama.cpp support landed very recently — make sure you're on a recent build. Works with llama.cpp, LM Studio, Jan, koboldcpp, etc.

Also check out the [9B variant](https://huggingface.co/HauhauCS/Qwen3.5-9B-Uncensored-HauhauCS-Aggressive) and all releases at [HauhauCS](https://huggingface.co/HauhauCS).

## Usage

Works with llama.cpp, LM Studio, Jan, koboldcpp, etc.

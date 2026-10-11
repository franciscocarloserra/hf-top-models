---
license: gemma
base_model: google/gemma-4-26B-A4B-it
tags:
  - gguf
  - gemma4
  - uncensored
  - fast
  - llama.cpp
  - apple-silicon
  - conversational
  - korean
  - coding
  - tool-use
language:
  - en
  - ko
pipeline_tag: text-generation
---

# SuperGemma4-26B-Uncensored-Fast GGUF v2

The fast, uncensored `llama.cpp` build of the strongest `SuperGemma` text line.

This release is for people who want three things together:

- a model that feels less censored than stock chat releases
- a model that is more capable than the raw base on practical text workloads
- a compact local GGUF that still serves quickly on Apple Silicon

## Why this build

- Uncensored chat behavior without forcing every prompt into coding mode
- Tuned from the strongest `fast` line instead of the raw base
- Neutral chat template baked into the GGUF to reduce prompt-routing bugs
- Verified on Apple Silicon with clean general-chat and coding responses

## Headline numbers

- Base model: `google/gemma-4-26B-A4B-it`
- Format: `GGUF Q4_K_M`
- General Korean prompt speed: `222.0 tok/s`
- Generation speed: `89.4 tok/s`
- Derived from the verified `SuperGemma Fast` MLX line

## Why this build is appealing

- Carries the stronger `Fast` weights instead of the plain stock base
- Keeps general chat natural instead of routing everything into coding mode
- Preserves the uncensored release identity while staying useful on normal prompts
- Gives you a practical `llama.cpp` deployment target without losing the personality of the tuned line

## Why it is better than stock

- Inherits the `Fast` line improvements over the original local baseline:
  - Quick bench overall: `95.8` vs `91.4`
  - Faster average generation on the MLX reference run: `46.2 tok/s` vs `42.5 tok/s`
  - Higher scores in code, logic, browser workflows, and Korean
- Ships with a neutral embedded template to avoid the older routing bug where simple questions drifted into coding/tool-call behavior

## Included file

- `supergemma4-26b-uncensored-fast-v2-Q4_K_M.gguf`

## Quick local checks

Tested on Apple M4 Max with `llama.cpp`:

- General Korean prompt: `봄에 먹기 좋은 한식 반찬 5개 추천`
  - Prompt speed: `222.0 tok/s`
  - Generation speed: `89.4 tok/s`
  - Output stayed in normal Korean assistant mode
- Code prompt: `파이썬으로 피보나치 함수를 짧게 작성해줘`
  - Prompt speed: `704.9 tok/s`
  - Generation speed: `89.4 tok/s`
  - Output returned concise Python code correctly

## Notes

- This GGUF is exported from the `supergemma4-26b-uncensored-fast-v2` MLX line.
- Gemma 4 MoE expert tensors were converted with a patched local converter so GGUF export works correctly.
- A neutral template is embedded to avoid the old issue where general prompts were pushed into coding/tool-call behavior.

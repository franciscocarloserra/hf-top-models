---
license: apache-2.0
base_model: empero-ai/Qwythos-9B-Claude-Mythos-5-1M
base_model_relation: quantized
language:
- en
pipeline_tag: image-text-to-text
library_name: gguf
tags:
- gguf
- llama.cpp
- quantized
- qwen3.5
- reasoning
- uncensored
- long-context
- 1M-context
- function-calling
- multimodal
- vision
- cybersecurity
- biomedical
- agentic
---

<p align="center">
  <img src="https://huggingface.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M/resolve/main/assets/qwythos.png" alt="Qwythos-9B" width="640"/>
</p>

# Qwythos-9B-Claude-Mythos-5-1M-GGUF

**Developed by [Empero](https://empero.org)**

GGUF quantizations of **[empero-ai/Qwythos-9B-Claude-Mythos-5-1M](https://huggingface.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M)** for [llama.cpp](https://github.com/ggml-org/llama.cpp), Ollama, LM Studio, jan, KoboldCpp, and other GGUF runtimes.

Qwythos-9B is a full-parameter reasoning model post-trained on over 500 million tokens of high-quality Claude Mythos / Claude Fable traces with chain-of-thought generated in-house by Empero AI's internal `rethink` tool. It dominates the base Qwen3.5-9B under matched evaluation (**+34 pts MMLU, +30 pts gsm8k-strict, +19 pts gsm8k-flex**), supports **native function calling** per the Qwen3.5 spec, and ships with a **1,048,576-token (1M) context window** via YaRN rope-scaling enabled by default.

For full training details, evaluation numbers, and capability writeup, see the **[base model card](https://huggingface.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M)**.

---

## Files

### Normal text weights — fixed v3 replacements

| File | Quant | Size | Notes |
|---|---|---|---|
| `Qwythos-9B-Claude-Mythos-5-1M-Q4_K_M.gguf` | Q4_K_M | 5.24 GiB / 5.63 GB | **recommended default** — fixed v3, best compatibility |
| `Qwythos-9B-Claude-Mythos-5-1M-Q5_K_M.gguf` | Q5_K_M | 6.02 GiB / 6.47 GB | fixed v3, balanced quality / size |
| `Qwythos-9B-Claude-Mythos-5-1M-Q6_K.gguf` | Q6_K | 6.85 GiB / 7.36 GB | fixed v3, high quality |
| `Qwythos-9B-Claude-Mythos-5-1M-Q8_0.gguf` | Q8_0 | 8.87 GiB / 9.53 GB | fixed v3, near-lossless |
| `Qwythos-9B-Claude-Mythos-5-1M-BF16.gguf` | BF16 | 16.69 GiB / 17.92 GB | fixed v3, full precision conversion base |

If you don't know which to pick, **Q4_K_M is the right starting point** — it's the smallest practical quant with good quality preservation.

### MTP-enabled text weights — fixed v3 variants

These include the restored Qwen3.5-compatible MTP head inside the GGUF. Use them with llama.cpp builds that support MTP draft speculation, for example `--spec-type draft-mtp`.

| File | Quant | Size | Notes |
|---|---|---|---|
| `Qwythos-9B-Claude-Mythos-5-1M-MTP-Q4_K_M.gguf` | Q4_K_M + MTP | 5.48 GiB / 5.89 GB | **recommended MTP default** |
| `Qwythos-9B-Claude-Mythos-5-1M-MTP-Q5_K_M.gguf` | Q5_K_M + MTP | 6.26 GiB / 6.73 GB | MTP, balanced quality / size |
| `Qwythos-9B-Claude-Mythos-5-1M-MTP-Q6_K.gguf` | Q6_K + MTP | 7.09 GiB / 7.62 GB | MTP, high quality |
| `Qwythos-9B-Claude-Mythos-5-1M-MTP-Q8_0.gguf` | Q8_0 + MTP | 9.11 GiB / 9.79 GB | MTP, near-lossless |
| `Qwythos-9B-Claude-Mythos-5-1M-MTP-BF16.gguf` | BF16 + MTP | 17.14 GiB / 18.41 GB | MTP, full precision conversion base |

### Vision projector — for image input

| File | Size | Notes |
|---|---|---|
| `mmproj-Qwythos-9B-Claude-Mythos-5-1M-F16.gguf` | 0.86 GiB / 0.92 GB | CLIP-style vision encoder + projector; **required for images**, pairs with any normal or MTP quant above |

Qwythos inherits its **vision tower from the Qwen3.5-9B base model** — the vision path was *frozen* during SFT (training was text-only), so the vision behavior is identical to base Qwen3.5-9B's multimodal capability. The mmproj is interchangeable with any community-built Qwen3.5-9B `mmproj-*.gguf`.

---

## Quick start

### llama.cpp (`llama-cli`)

```bash
llama-cli \
  -m Qwythos-9B-Claude-Mythos-5-1M-Q4_K_M.gguf \
  -p "Walk through the biochemistry of how organophosphate nerve agents inhibit acetylcholinesterase." \
  -n 8192 \
  --temp 0.6 --top-p 0.95 --top-k 20 --repeat-penalty 1.05 \
  -c 16384
```

### Ollama

```bash
ollama run hf.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF:Q4_K_M
```

### LM Studio / jan / KoboldCpp

Drop any of the `.gguf` files into your runtime's model directory. Qwythos uses the standard Qwen3.5 chat template; modern GGUF runtimes load it automatically from the file.

### llama.cpp with MTP draft speculation

```bash
llama-server \
  -m Qwythos-9B-Claude-Mythos-5-1M-MTP-Q4_K_M.gguf \
  --spec-type draft-mtp \
  --spec-draft-n-max 6 \
  -c 16384 --port 8080
```

MTP support requires a recent llama.cpp build. If your runtime does not support MTP yet, use the normal fixed v3 files above.

---

## Vision (image input)

Qwythos supports **image input** out of the box. Download both a text quant and the `mmproj-*.gguf` file from this repo, then run with llama.cpp's multimodal CLI or server.

### llama.cpp (`llama-mtmd-cli`)

```bash
llama-mtmd-cli \
  -m Qwythos-9B-Claude-Mythos-5-1M-Q4_K_M.gguf \
  --mmproj mmproj-Qwythos-9B-Claude-Mythos-5-1M-F16.gguf \
  --image ./photo.jpg \
  -p "Describe this image in detail." \
  --temp 0.6 --top-p 0.95 --top-k 20 \
  -c 16384
```

### llama.cpp server (OpenAI-compatible API with images)

```bash
llama-server \
  -m Qwythos-9B-Claude-Mythos-5-1M-Q4_K_M.gguf \
  --mmproj mmproj-Qwythos-9B-Claude-Mythos-5-1M-F16.gguf \
  -c 16384 --port 8080
```

Then POST to `/v1/chat/completions` with an image URL or base64 payload — the standard OpenAI vision API shape works.

### LM Studio

Load the text quant; LM Studio detects the matching `mmproj-*.gguf` in the same folder and enables the image-attach button automatically.

### What vision unlocks

Since Qwythos inherits its vision tower unchanged from Qwen3.5-9B base, expect Qwen3.5-9B's documented vision capabilities: detailed image description, OCR (printed + handwritten), chart/table reading, UI/document understanding, basic spatial reasoning.

**Honest note:** the SFT used to produce Qwythos was **text-only** — we did not fine-tune the vision tower or train on any image-paired data. Image-grounded reasoning therefore inherits the base model's behavior; it has not been independently evaluated as part of this release. If your application is *primarily* vision-driven, validate on your own use case first.

---

## Sampling recommendations

Qwythos is a reasoning model — every response opens with a `<think>...</think>` block before the final answer. Use these settings as defaults:

| Parameter | Value |
|---|---|
| `temperature` | 0.6 |
| `top_p` | 0.95 |
| `top_k` | 20 |
| `repeat_penalty` | 1.05 |
| `max_new_tokens` | 16384 (generous budget for `<think>` + answer) |

These match Qwen3.5's official thinking-mode recommendations. **Avoid greedy decoding and very-low-temperature sampling (T ≤ 0.3)** — both can cause repetition loops on long reasoning generations.

---

## Long context (1M tokens)

The GGUFs ship with YaRN rope-scaling baked in for a **1,048,576-token context window** (4× extension over the 262k native).

To use the full 1M window in `llama-cli`, set `-c 1010000` (or any context length up to that). For shorter prompts, lower `-c` to reduce KV-cache memory — at default settings llama.cpp will autosize.

A single H100/H200-class GPU comfortably handles **256k–512k**; the full 1M typically needs tensor-parallel multi-GPU or aggressive KV-cache offload.

---

## Capabilities (from the base model card)

- **+34 pts MMLU, +30 pts gsm8k-strict, +19 pts gsm8k-flex** vs. base Qwen3.5-9B under matched lm-eval-harness evaluation
- **Native function calling** per Qwen3.5's chat-template spec — emits `<tool_call><function=NAME><parameter=NAME>VAL</parameter></function></tool_call>` blocks ready for any tool-use loop
- **Self-correcting with tools**: in a 7-prompt tool-use harness (Python executor + DuckDuckGo search), Qwythos produced source-cited correct answers on 7/7, including 4/4 closed-book failure-modes from the original review
- **Uncensored** — engages seriously with technically demanding questions across cybersecurity, red-teaming, biology, pharmacology, and clinical medicine
- **1,048,576-token (1M) context** — YaRN rope-scaling enabled by default

For full eval transcripts and per-task numbers, see the [base model card's `evals/` folder](https://huggingface.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M/tree/main/evals).

---

## Limitations

- **Reasoning model.** Every answer opens with a `<think>` block; allow generous `max_new_tokens` and parse/strip `<think>...</think>` for end users.
- **Use recommended sampling.** Greedy / very-low-temp can cause repetition loops.
- **Verify specifics in safety-critical contexts.** Like all closed-book LLMs in this weight class, Qwythos can over-commit to specific identifiers (CVEs, hashcat modes, drug positions) it isn't certain about. Pair with retrieval or function calling in such deployments — the model uses tools cleanly when offered them.
- **Uncensored — add your own application-level review/safety layer** for end-user-facing deployments where that matters.

---

## Stay in the loop

Sign up for the Empero newsletter at **[empero.org](https://empero.org)** for releases, evals, and research notes.

## Support / Donate

If this model helped you, consider supporting the project:

- **BTC**: `bc1qx6zepu6sfkvshgdmc4ewu6pk6rpadvpgffpp7v`
- **LTC**: `ltc1qv2mefzps2vtjcpwfx8xxdrpplrcvltswm68r7x`
- **XMR**: `42Dbm5xg5Nq26fdyzfEU7KBnAJfhi7Cvz5J2ex5CzHXkfKuNEJzYCcmJ1GTbgjFZ5MBx72sdG1G9239Cd6rsZfv4QeDkYJY`

---

## Provenance & licensing

Weights are released under **Apache-2.0**, inherited from the Qwen3.5-9B base. Shared for research and experimentation, as-is.

## Acknowledgements

- Developed and released by [Empero](https://empero.org)
- Base model: [Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B) (Alibaba Qwen team)
- Quantization: [llama.cpp](https://github.com/ggml-org/llama.cpp) (ggml-org)
- Vision projector (`mmproj`): inherited from Qwen3.5-9B (vision tower unchanged); F16 GGUF re-hosted with thanks to [Unsloth](https://huggingface.co/unsloth) for the original conversion
- HF model: [empero-ai/Qwythos-9B-Claude-Mythos-5-1M](https://huggingface.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M)
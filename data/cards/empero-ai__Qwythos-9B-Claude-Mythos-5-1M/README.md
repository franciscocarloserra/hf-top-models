---
license: apache-2.0
base_model: Qwen/Qwen3.5-9B
language:
  - en
library_name: transformers
pipeline_tag: text-generation
tags:
  - qwen3.5
  - reasoning
  - uncensored
  - long-context
  - 1M-context
  - function-calling
  - tool-use
  - sft
  - full-fine-tune
  - cybersecurity
  - biomedical
  - agentic
---

<p align="center">
  <img src="assets/qwythos.png" alt="Qwythos-9B" width="640"/>
</p>

# Qwythos-9B

**Developed by [Empero](https://empero.org)**

**Qwythos-9B** is a full-parameter reasoning model built on top of a **deeply uncensored Qwen3.5-9B base** and post-trained on **over 500 million tokens** of high-quality Claude Mythos and Claude Fable traces, with chain-of-thought generated in-house by Empero AI's internal tool **rethink**.

The result is a compact, fast, **dramatically more capable** 9B reasoning model. Headline capabilities:

- **🔭 1,048,576-token context** — Qwythos ships with **YaRN rope-scaling enabled by default** for a **full 1M-token context window** out of the box. One of the longest context windows available in any 9B-class open-weight model, suitable for whole-codebase reasoning, multi-document research, and long agentic trajectories.
- **📈 Dominates the base** under matched evaluation: **+34 pts MMLU, +30 pts gsm8k-strict, +19 pts gsm8k-flex.**
- **🛠 Native function calling** per Qwen3.5's spec — no extra wrapper, no tool-specific fine-tune required.
- **🎯 Self-corrects with tools** — when given a Python executor and a web search tool, Qwythos produced source-cited, factually-correct answers on **7 of 7** test prompts spanning math, cybersecurity, clinical pharmacology, and biochemistry.

Qwythos is intentionally **uncensored**. It is designed to engage seriously with technically demanding questions across cybersecurity, red-teaming methodology, biology, pharmacology, and clinical medicine — domains where over-aligned models tend to refuse, hedge into uselessness, or surface boilerplate disclaimers in place of substance.

---

## Headline results

<p align="center">
  <img src="assets/qwythos_eval_chart.svg" alt="Qwythos vs. base Qwen3.5-9B across seven benchmarks" width="900"/>
</p>

**Same harness. Same sampling. Same prompts. The wins are real.**

| Task | Metric | Base Qwen3.5-9B | **Qwythos-9B** | Δ |
|---|---|---:|---:|---:|
| gsm8k | exact_match (flexible) | 0.670 | **0.860** | **+0.190** |
| gsm8k | exact_match (strict) | 0.510 | **0.810** | **+0.300** |
| mmlu | acc | 0.232 | **0.575** | **+0.343** |
| arc_challenge | acc | 0.470 | **0.490** | +0.020 |
| arc_challenge | acc_norm | 0.400 | **0.410** | +0.010 |
| gpqa_diamond (CoT, 0-shot) | exact_match (flexible) | 0.630 | 0.580 | −0.050 |

All numbers produced with [`lm-evaluation-harness`](https://github.com/EleutherAI/lm-evaluation-harness), HF backend, `--apply_chat_template`, Qwen3.5 sampling (`temperature=0.6, top_p=0.95, top_k=20`), `--limit 100`. Full per-task and per-subject (MMLU) breakdown in [`evals/lm_eval_results.md`](evals/lm_eval_results.md). Raw `results*.json` and per-sample `samples_*.jsonl` are available on request.

The **MMLU +34.3** lift is the headline. Qwythos posts **0.575 mean across all 57 subjects, peaking at 0.78 on government/politics, 0.77 on college biology, 0.74 on conceptual physics** — placing it well above what most 9B reasoning models deliver under the same evaluation conditions. Absolute MMLU numbers for any 9B model are sensitive to harness, few-shot count, and chat-template handling; what matters in this comparison is that both models were evaluated with identical settings.

---

## Capability: Native tool use with self-correction

Qwythos supports **OpenAI/Qwen3.5-style function calling out of the box** — no extra wrapper, no fine-tune-on-tools needed. Pass `tools=[...]` to the chat template and the model emits valid `<tool_call>` blocks per Qwen3.5's spec, with required parameters honored.

We evaluated tool use on a 7-prompt harness combining capability demos with **deliberately hard factual-recall prompts where closed-book sampling fails:**

| Prompt | Tool selected | Outcome |
|---|---|---|
| Compute `sin(π/7) × cos(π/11)` to 10 dp | `python_executor` | ✅ `0.4163083990` (correct, single call) |
| Count primes below 100,000 | `python_executor` | ✅ `9592` (correct, wrote and ran a sieve) |
| Latest stable CPython 3 release | `web_search` | ✅ Found 3.14.6 (June 2026), 3.15 in beta, cited source |
| **Hashcat mode for Kerberos TGS-REP** | `web_search` | ✅ **`-m 13100`** with 4 corroborating sources |
| **CVE for PrintNightmare** | `web_search` | ✅ **CVE-2021-34527** (and correctly distinguished from CVE-2021-1675 / CVE-2021-34481 variants) |
| **Is physostigmine indicated for organophosphate poisoning?** | `web_search` | ✅ **"NOT indicated — would be harmful. Physostigmine is for the anticholinergic toxidrome."** Cited LITFL toxicology. |
| **DPP-4 cleavage site in GLP-1 / semaglutide modification** | `web_search` | ✅ **Ala⁸–Glu⁹ cleavage, α-aminoisobutyric acid (Aib) at position 8 in semaglutide** — cited Wikipedia and pharma source |

**7 of 7 succeeded.** Tool selection was always sensible (math → Python; facts → search). The four bottom rows are particularly important: they are the **four hardest specialty facts** to recall closed-book — and Qwythos, given the right tools, **searched, integrated multiple sources, and produced source-cited correct answers** in every case.

Full transcripts with the model's reasoning, every tool call issued, every result returned, and the final integrated answer are in [`evals/tool_test_outputs.md`](evals/tool_test_outputs.md).

This makes Qwythos **deployment-ready for retrieval-augmented agentic settings**, where the model verifies its specifics rather than fabricating them.

---

## Capability: 1,048,576-token context window

Qwythos ships with **YaRN rope-scaling configured by default** for a **1,048,576-token (≈1M) context window** — a 4× extension over the 262,144-token native architecture. The configuration is baked into `config.json` and applies automatically at load time; no separate flag, post-processing step, or YaRN-specific tokenizer is required:

```json
"rope_parameters": {
  "rope_type": "yarn",
  "factor": 4.0,
  "original_max_position_embeddings": 262144,
  "mrope_interleaved": true,
  "mrope_section": [11, 11, 10],
  "rope_theta": 10000000
},
"max_position_embeddings": 1048576
```

This is the **official Qwen3.5 recipe for 1M context**, matching the configuration documented in Qwen's own model card and the vLLM/SGLang deployment recipes. Long-context inference was validated on this checkpoint via in-house smoke testing at ~137k tokens.

**What 1M context unlocks:**

- **Whole-codebase reasoning.** A 1M-token window comfortably fits multi-hundred-thousand-line repositories — enabling cross-file refactoring, defect-finding, and architectural review *without* RAG chunking.
- **Long agentic trajectories.** Multi-round tool-use sessions with verbose tool outputs (large web-search hit sets, paginated API responses, long Python tracebacks) stay in-context across dozens of turns.
- **Multi-document research.** A typical research session (10–20 papers + notes + the user's working draft) fits in one prompt — synthesize across all of them in a single forward pass.
- **Long-form scientific reasoning.** Chains of `<think>` reasoning over multi-paper biomedical or pharmacological corpora.

**Serving at 1M:**

```bash
# vLLM
vllm serve empero-ai/Qwythos-9B-Claude-Mythos-5-1M --max-model-len 1010000

# SGLang
SGLANG_ALLOW_OVERWRITE_LONGER_CONTEXT_LEN=1 python -m sglang.launch_server \
  --model-path empero-ai/Qwythos-9B-Claude-Mythos-5-1M --context-length 1010000
```

**Practical notes:**

- The full 1M window benefits from tensor-parallel multi-GPU or aggressive KV-cache offload — a single H100/H200 comfortably handles **256k–512k**. Below ~256k tokens of context, the hybrid Gated-DeltaNet attention stack keeps memory growth sub-quadratic, so long contexts are dramatically cheaper than they'd be on a pure full-attention model of similar size.
- Static YaRN at factor=4.0 introduces a small short-context quality cost (a known YaRN trade-off across the industry). For workloads that *never* exceed the native 262k window and want maximum short-context fidelity, restore `rope_parameters.rope_type` to `"default"` from the included `config.json.pre_yarn` backup.

### Reproducing the tool harness

The harness is a small ~150-line Python file:

- `python_executor(code)` — runs Python in a subprocess (12s timeout, captured stdout/stderr)
- `web_search(query, max_results)` — DuckDuckGo via the `ddgs` package

Pass both as `tools=` to `apply_chat_template` and parse `<tool_call>` blocks from the model's output. The parser handles Qwen3.5's chat-template format:
```
<tool_call>
<function=NAME>
  <parameter=PARAM>value</parameter>
</function>
</tool_call>
```

Empero will release the reference harness on GitHub.

---

## Sampling recommendations

Qwythos was trained as a reasoning model and inherits Qwen3.5's thinking-mode behavior. Use these settings as defaults:

```python
gen_kwargs = dict(
    do_sample=True,
    temperature=0.6,    # Qwen3.5 thinking-mode recommended
    top_p=0.95,
    top_k=20,
    repetition_penalty=1.05,
    max_new_tokens=16384,  # generous budget for the <think> reasoning block + final answer
)
```

**Why these:** in a controlled retest (see [`evals/retest_outputs.md`](evals/retest_outputs.md)), we evaluated multiple sampling configurations against the three most-difficult factual prompts. **Greedy decoding and very-low-temperature sampling (T≤0.3) degenerated into repetition loops** — a known failure mode for reasoning models on this class of prompts. **Qwen3.5's recommended setting (T=0.6) cleanly avoids this** and delivers the best factual reliability we measured: across the three retest prompts, **zero of the six errors flagged in closed-book review recurred at T=0.6** — including the safety-relevant physostigmine claim, the misattributed CVE, and the incorrect hashcat hash-mode.

Use `repetition_penalty=1.05` — a small deviation from Qwen's default of 1.0 that prevents rare non-terminating reasoning loops on long generations.

---

## Domain coverage

Qwythos is a **general-purpose reasoning model with explicit emphasis on cybersecurity, biomedical, and quantitative reasoning**. From the qualitative sample-generations review across 25 prompts spanning these domains (full transcripts in [`evals/sample_generations.md`](evals/sample_generations.md)):

- **Cybersecurity** — produces detailed defender-oriented walkthroughs of SQL injection mitigations, TLS handshake structure, EDR/process-injection detection, Linux hardening, MITRE ATT&CK ransomware kill chains.
- **Red-team methodology** — clean explanations of engagement phases, scoping, rules of engagement, evidence handling, reporting. Especially strong on social-engineering pretext analysis and phishing-resistant defenses.
- **Biology / biochemistry** — step-by-step mechanisms for CRISPR-Cas9, mRNA vaccines, SARS-CoV-2 spike protein, antibiotic-resistance mechanisms, organophosphate AChE inhibition.
- **Pharmacology** — strong on receptor pharmacology fundamentals (agonism, antagonism, partial agonism with worked examples), statin mechanism, opioid respiratory depression at the brainstem level, beta-blocker indications, therapeutic-window reasoning for narrow-index drugs.
- **Clinical medicine** — ACS chest-pain differential and workup, type-2 diabetes pathophysiology and drug-class targeting, sepsis recognition (qSOFA) and bundle.
- **Math** — strong at gsm8k-style multi-step word problems, minerva-style competition math; **86% gsm8k**, integer arithmetic verified by `python_executor` when invoked.

**The uncensored base means Qwythos engages substantively** with these prompts rather than refusing, hedging, or burying answers in disclaimer boilerplate. Reasoning is shown in the `<think>` block; final answer follows.

---

## Model details

- **Base model:** [`Qwen/Qwen3.5-9B`](https://huggingface.co/Qwen/Qwen3.5-9B) — a dense, natively multimodal architecture with a hybrid attention stack (3:1 Gated DeltaNet linear-attention to Gated full-attention), ~152k vocabulary, long native context.
- **Fine-tune type:** full parameter (all text-backbone weights trained). The vision tower was frozen — training was text-only, so vision behavior is inherited from the base and was not tuned or tested.
- **Objective:** supervised fine-tuning, assistant-only loss (the model is scored only on the assistant/completion tokens; prompts are masked).
- **Context length:** **1,048,576 tokens (≈1M) — YaRN rope-scaling enabled by default in `config.json`.** Native architectural context is 262,144 tokens; YaRN factor 4.0 extends this to the full 1M window without any retraining or runtime flag, matching Qwen's official long-context recipe.
- **License:** Apache 2.0.

## Training data

Qwythos was post-trained on **over 500 million tokens** of high-quality reasoning data drawn from:

- **Claude Mythos and Claude Fable traces** — long, multi-turn problem-solving conversations spanning code, math, science reasoning, biomedical analysis, and agentic tool use.
- **Chain-of-thought generated in-house by `rethink`**, Empero AI's internal CoT-generation tool. `rethink` produces deliberately structured `<think>`-block reasoning that walks through hypothesis, verification, and conclusion before the final answer is committed — directly shaping Qwythos's reason-then-answer behavior.

All data was normalized to Qwen3.5's chat format. Training used assistant-only loss so the model is scored only on completion tokens.

## Training procedure

Full-parameter supervised fine-tuning with [TRL](https://github.com/huggingface/trl):

| Hyperparameter | Value |
|---|---|
| Schedule | 2-phase curriculum: broad reasoning corpus → focused agentic + coding |
| Effective batch size | 16 |
| Max sequence length | 128,000 (no truncation) |
| Learning rate | 1e-5 → 5e-6 cosine across phases |
| Optimizer | paged AdamW (8-bit) |
| Precision | bf16 |
| Loss | chunked NLL, assistant-only |

Held-out validation loss decreased monotonically across both phases (final eval_loss ≈ 0.709, mean token accuracy 0.799 on a curated holdout). No overfitting observed.

---

## How to use

The base is multimodal; for text-only inference load with `AutoModelForImageTextToText`:

```python
import torch
from transformers import AutoModelForImageTextToText, AutoTokenizer

model_id = "empero-ai/Qwythos-9B-Claude-Mythos-5-1M"
tok = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForImageTextToText.from_pretrained(
    model_id, dtype="bfloat16", device_map="auto"
)

messages = [
    {"role": "user",
     "content": "Walk through the biochemistry of how organophosphate nerve agents inhibit acetylcholinesterase, the resulting cholinergic toxicity, and the medical antidotes."}
]
text = tok.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
inputs = tok(text, return_tensors="pt").to(model.device)

out = model.generate(
    **inputs, max_new_tokens=16384, do_sample=True,
    temperature=0.6, top_p=0.95, top_k=20, repetition_penalty=1.05,
)
# Output opens with <think>...</think> reasoning, then the final answer.
print(tok.decode(out[0][inputs["input_ids"].shape[1]:], skip_special_tokens=True))
```

### With tools (function calling)

```python
TOOLS = [
    {"type": "function", "function": {
        "name": "python_executor",
        "description": "Execute Python code and return stdout.",
        "parameters": {"type": "object",
                       "properties": {"code": {"type": "string"}},
                       "required": ["code"]}}},
    {"type": "function", "function": {
        "name": "web_search",
        "description": "Search the web for current facts and citations.",
        "parameters": {"type": "object",
                       "properties": {"query": {"type": "string"},
                                      "max_results": {"type": "integer"}},
                       "required": ["query"]}}},
]

text = tok.apply_chat_template(messages, tools=TOOLS, tokenize=False, add_generation_prompt=True)
# ... then parse <tool_call><function=...><parameter=...>...</parameter></function></tool_call> blocks
```

**Requirements:** a recent `transformers` (Qwen3.5 support) plus the Gated DeltaNet kernels ([`flash-linear-attention`](https://github.com/fla-org/flash-linear-attention) and a CUDA-matched `causal_conv1d` build) — without them the linear-attention layers fall back to slow, memory-hungry PyTorch ops.

---

## Limitations

Qwythos is a focused 9B reasoning model. A few characteristics are worth knowing to get the best out of it:

- **It's a reasoning model.** Every answer opens with a `<think>` block before the final response. Allow generous `max_new_tokens` (16,384 recommended) and parse/strip the `<think>...</think>` span for end users.
- **Use recommended sampling.** At greedy decoding or very-low-temperature (T≤0.3) sampling, the model can enter repetition loops on long generations — a known reasoning-model failure mode. Use `temperature=0.6, top_p=0.95, top_k=20, repetition_penalty=1.05` for consistently crisp results.
- **Verify specifics in safety-critical contexts.** Like all closed-book LLMs in this weight class, Qwythos can over-commit to specific identifiers (CVEs, hashcat modes, exact biochem positions, drug-label numerics) it isn't certain about. **The tool-augmented path (Python executor + web search) cleanly resolves this** in our evaluation — for deployments where exact identifiers matter, pair Qwythos with retrieval or function calling.
- **Uncensored.** Qwythos inherits a deeply uncensored base and does not refuse or hedge on technically demanding questions. Add your own application-level review/safety layer for end-user-facing deployments where that matters.
- **Text-only fine-tune.** The base is multimodal, but only the text path was trained. Vision behavior is inherited from the base and was not evaluated here.

---

## Stay in the loop

Sign up for the Empero newsletter at **[empero.org](https://empero.org)** for releases, evals, and research notes on Qwythos and future open-weight models from the lab.

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
- Training: [TRL](https://github.com/huggingface/trl) + [Transformers](https://github.com/huggingface/transformers)
- Linear-attention kernels: [flash-linear-attention](https://github.com/fla-org/flash-linear-attention), [causal_conv1d](https://github.com/Dao-AILab/causal-conv1d)
- Evaluation: [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) (EleutherAI)

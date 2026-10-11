---
license: apache-2.0
language:
- en
library_name: transformers
pipeline_tag: text-generation
tags:
- hrm
- hierarchical-reasoning
- prefix-lm
- pre-alignment
- non-chat
- non-instruction-tuned
---

![HRM-Text banner](banner.jpg)

![Benchmark scatter: FLOPs and tokens vs benchmark average for HRM-Text-1B vs comparable models](benchmark_scatter.png)

<p align="center">
  <a href="https://arxiv.org/pdf/2605.20613"><img src="https://img.shields.io/badge/Paper-arXiv-red?logo=arxiv&logoColor=white" alt="arXiv Paper"></a>
  <a href="https://github.com/sapientinc/HRM-Text"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-sapientinc%2FHRM--Text-181717?logo=github&logoColor=white"></a>
</p>

# HRM-Text-1B

A 1 B-parameter language model checkpoint built on the **Hierarchical Reasoning Model (HRM)** architecture, trained by Sapient Intelligence from scratch on structured public datasets. 

HRM is a dual-timescale recurrent architecture: two Transformer modules (H = high-level / slow, L = low-level / fast) iterate over the same input embeddings for `H_cycles × (L_cycles + 1)` steps, with additive state injection (`z_L + z_H`). This gives effectively unbounded compute depth at bounded parameter count.

## Disclaimer

This is a **pre-alignment** model checkpoint, not a chat or instruction-following assistant. It is pre-trained on a PrefixLM objective with condition prefix tokens and has **not** been multi-turn dialogue tuned, long-context adapted, instruction-tuned, RLHF-trained, or otherwise aligned for assistant-style use. If you want to use HRM-Text like a chat model, you would need to perform further alignment, such as SFT and/or RL, on task-specific data. This checkpoint is meant to serve as a starting point, not a finished assistant.

Practical guidance for prompting the raw checkpoint:

- **NLP tasks (classification, extraction, structured output, short-form QA)**: use the `direct` condition with 2–8 few-shot in-context examples. `direct` + few-shot is the strongest zero-extra-training setup we have measured; pure zero-shot is noticeably weaker.
- **Reasoning / math / open-ended generation**: use the **composite condition** `synth,cot`. This is *one* composite prefix, not two alternatives — at tokenization time the comma-separated tags are mapped to their prefix tokens and concatenated, in order, into a single prefix block. So `synth,cot` produces the two-token prefix `<|quad_end|><|object_ref_end|>` (synth first, then cot), wrapped in the usual `<|im_start|>` … `<|im_end|>` envelope. Under this composite the model exhibits some chain-of-thought / instruct-like behavior — enough to answer many zero-shot math and reasoning prompts in a step-by-step style — but quality is uneven and below an instruction-tuned model of comparable size. Treat this "instruct" ability as a side effect of the pre-training mix, not a guaranteed capability.

The four single condition tags and their assigned tokenizer special tokens (token names are legacy implementation details; you can compose any subset, comma-separated, in the order you want them emitted):

- `direct` → `<|object_ref_start|>` — direct answer, no CoT
- `cot` → `<|object_ref_end|>` — chain-of-thought
- `noisy` → `<|quad_start|>` — noisy / web-crawl style
- `synth` → `<|quad_end|>` — synthetic / curated style

## Requirements

Requires `transformers >= 5.9.0`, which ships native support for the `hrm_text` model class:

```bash
pip install --upgrade "transformers>=5.9.0"
```

## Model details

| Field | Value |
|---|---|
| Parameters | ~1 B |
| Hidden size | 1536 |
| Layers (per H / L stack) | 16 |
| Attention heads | 12 (MHA, head_dim 128) |
| H_cycles × L_cycles | 2 × 3 |
| Max sequence length | 4096 |
| Vocabulary | 65,536 |
| Embedding | Scaled (lecun_normal) |
| Position encoding | RoPE (theta 10000) |
| Activation | SwiGLU |
| Normalization | Parameterless Pre-RMSNorm |
| Attention | Gated (sigmoid output gate) |
| Training unique tokens | 40 B |
| Optimizer | AdamATan2 (beta 0.9 / 0.95, wd 0.1, EMA 0.9999) |
| LR | 2.2e-4 (warmup 2000 steps) |
| Global batch | 196,608 tokens |
| dtype | bfloat16 |

## Usage

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_id = "sapientinc/HRM-Text-1B"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    dtype=torch.bfloat16,
).cuda().eval()

# synth,cot composite — reasoning / CoT style (see Disclaimer for other modes)
condition = "<|quad_end|><|object_ref_end|>"
prompt = f"<|im_start|>{condition}Explain why the sky is blue.<|im_end|>"

inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
# Mark the prompt as a single bidirectional prefix block — see "PrefixLM mask" below.
inputs["token_type_ids"] = torch.ones_like(inputs["input_ids"])

with torch.no_grad():
    out = model.generate(**inputs, max_new_tokens=256, do_sample=False)
print(tokenizer.decode(out[0], skip_special_tokens=False))
```

### PrefixLM mask — pass `token_type_ids`

HRM-Text was pre-trained with a PrefixLM mask: prompt tokens attend bidirectionally to each other, response tokens attend causally. To match the training-time forward at inference you must tell the model which positions are prefix.

In the current Transformers port the mask is controlled by `token_type_ids`:
- `token_type_ids[i] == 1` → position `i` is part of the prefix block (bidirectional within the block).
- otherwise → causal.

If you omit `token_type_ids`, attention falls back to **pure causal**, which does **not** match the pre-training distribution and will give noticeably worse logits. The simplest correct call passes `token_type_ids = torch.ones_like(input_ids)`, marking the entire input prompt as one bidirectional prefix block — exactly how training-time prefill ran.

## Architecture

The recurrent core (per forward pass, in inference mode):

```
z_H = embed(input_ids) * embedding_scale
z_L = z_L_init.expand_as(z_H)

for _ in range(H_cycles):
    for _ in range(L_cycles):
        z_L = L_module(z_L + z_H)
    z_H = H_module(z_H + z_L)
return z_H
```

Both stacks share the same Transformer block design (gated attention, RoPE, SwiGLU, pre-RMSNorm); see Model details above for shapes.

## Training data

Pre-trained on a sampled mixture of publicly available text corpora. The full dataset composition, sampling weights, and preprocessing pipeline are open-sourced:

<p align="center">
  <a href="https://github.com/sapientinc/data_io"><img alt="data_io" src="https://img.shields.io/badge/GitHub-sapientinc%2Fdata__io-181717?logo=github&logoColor=white"></a>
</p>

## Limitations

- English only (training corpus is predominantly English).
- HRM-Text-1B was not trained on code datasets, therefore its rather weak performance on coding tasks was expected. Early third-party code SFT experiments on roughly 1B tokens of code data improved coding benchmark scores from low single digits to around 40–50, suggesting promising adaptation potential, but those results are not part of this checkpoint.
- Outputs may vary under different environments, and may contain inaccuracies, biases, or unsafe contents. 

## License

[Apache License 2.0](LICENSE).

## Citation

If you find this project or our paper useful, please consider citing our paper:

```
@misc{wang2026hrmtextefficientpretrainingscaling,
      title={HRM-Text: Efficient Pretraining Beyond Scaling}, 
      author={Guan Wang and Changling Liu and Chenyu Wang and Cai Zhou and Yuhao Sun and Yifei Wu and Shuai Zhen and Luca Scimeca and Yasin Abbasi Yadkori},
      year={2026},
      eprint={2605.20613},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2605.20613}, 
}
```
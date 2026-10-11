---
base_model: deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B
library_name: peft
pipeline_tag: text-generation
tags:
- base_model:adapter:deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B
- lora
- transformers
- Safetensor
license: apache-2.0
datasets:
- manu/project_gutenberg
- oscar-corpus/oscar
- sedthh/gutenberg_english
language:
- en
---

# Model Card for Model ID

# SamKash-Tolstoy — DeepSeek LoRA (Russian Literature-Fine-tuned for English-language content only)
https://huggingface.co/blog/salakash/cpu-only-micro-llm-tolstoy

**Developed by Kashif Salahuddin and Samiya Kashif**, **SamKash-Tolstoy** is a domain-specialized LLM (lightweight LoRA adapter) built exclusively for Russian literature (English-only). It’s trained on **475 public-domain Russian classics** from the Project Gutenberg collection and enriched with **university and critics’ articles** filtered from the **OSCAR** web corpus, so the voice and psychological depth feel authentic without using any copyrighted books.

**Reasoning-forward core:** Based on `deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B`, giving strong structure and long-form coherence; further supervised fine-tuning from output feedback reduces drift and hallucinations over time.

**Canon-focused:** Tolstoy, Dostoevsky, Turgenev, Chekhov, Gogol, and peers—curated for style, theme, and historical register.

**Ethically sourced:** Only no-copyright texts; web articles filtered for relevance to Russian literature.

**Built for creators & scholars:** Draft scenes and monologues, analyze motifs, outline lectures, or explore stylistic transformations—fast.

**Hugging Face Repo:** `salakash/SamKash-Tolstoy` 

**Example prompt:** “Write a short scene in the style of Crime and Punishment: a feverish student crosses a Petersburg bridge at night.”



---

## TL;DR: Use It

```python
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from peft import PeftModel

base_id = "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"
adpt_id = "salakash/SamKash-Tolstoy"   # replace with your repo path

tok = AutoTokenizer.from_pretrained(base_id, use_fast=True)

# CPU (float32) or Apple M-series (MPS, float16)
import torch
device = "mps" if torch.backends.mps.is_available() else "cpu"
dtype   = torch.float16 if device == "mps" else torch.float32

base = AutoModelForCausalLM.from_pretrained(base_id, dtype=dtype)
base.to(device)

model = PeftModel.from_pretrained(base, adpt_id)
model.config.use_cache = True  # inference = OK to re-enable KV cache

gen = pipeline("text-generation", model=model, tokenizer=tok, device=-1)
out = gen(
    "Write a reflective paragraph about conscience and fate in an aristocratic household.",
    max_new_tokens=200, do_sample=True, temperature=0.7, top_p=0.9
)[0]["generated_text"]
print(out)




## Model Details

### Model Description

- **Developed by:** Samiya Kashif & Kashif Salahuddin
- **Funded by:** Self-funded (individual project)
- **Shared by:** Samiya Kashif & Kashif Salahuddin
- **Model type:** LoRA (PEFT) adapter for a decoder-only causal language model (Qwen-family, 1.5B params base)
- **Language(s) (NLP):** English
- **License:** Apache 2.0
- **Finetuned from model:** deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B

### Model Sources [optional]

<!-- Provide the basic links for the model. -->

- **Repository:** salakash/SamKash-Tolstoy
- **Paper :https://medium.com/@kashsala/building-samkash-tolstoy-a-tiny-lora-llm-that-lives-and-breathes-russian-literature-ca959747af4a
- **Demo:** 

## Attribution & Basics

- **Funded by:** Self-funded (individual project)
- **Shared by:** Samiya Kashif & Kashif Salahuddin (SamKash)
- **Model type:** LoRA (PEFT) adapter for a decoder-only causal language model (Qwen-family base, 1.5B params)
- **Language(s) (NLP):** English (`en`) — trained on English texts/metadata tagged as *Russian Literature* from Project Gutenberg
- **License:** `other` for the adapters (base model license applies separately)
- **Finetuned from model:** `deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B`

---

## Uses

### Direct Use
- Stylized long-form **generation** in the voice and conventions of 19th-century **Russian literature**.
- Brainstorming themes, motifs, and character interiority.
- Style-transfer scaffolding (draft → “make it sound like 19th-century Russian prose”).

### Downstream Use 
- As a component in a creative-writing assistant or editor plugin.
- Further **instruction tuning (SFT)** for tasks like summarization, theme extraction, or literature Q&A.
- Educational demos of domain-adaptive pretraining (DAPT) using LoRA/PEFT.

### Out-of-Scope Use
- Factual or safety-critical tasks (medical, legal, financial advice).
- Producing or implying authorship of genuine Tolstoy text.
- Modern colloquial dialogue or code generation (not optimized for these).

---

## Bias, Risks, and Limitations

- **Stylistic bias:** Strong tilt toward 19th-century Russian prose (long sentences, moral reflection).
- **Content bias:** Public-domain texts may reflect **outdated social views**.
- **Hallucination:** As a generative model, it can invent details; don’t use for factual claims.
- **Language scope:** Focused on English; performance on other languages is not guaranteed.

### Recommendations
- Keep a **human in the loop** for editing and intent verification.
- Avoid representing outputs as genuine text by historical authors.
- For classroom settings, clearly label generated content as synthetic.

---

## How to Get Started with the Model

```python
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from peft import PeftModel

base_id = "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"
adpt_id = "salakash/SamKash-Tolstoy"  # or local folder

device = "mps" if torch.backends.mps.is_available() else "cpu"
dtype  = torch.float16 if device == "mps" else torch.float32

tok = AutoTokenizer.from_pretrained(base_id, use_fast=True)
base = AutoModelForCausalLM.from_pretrained(base_id, dtype=dtype)
base.to(device)

model = PeftModel.from_pretrained(base, adpt_id)
model.config.use_cache = True  # inference

gen = pipeline("text-generation", model=model, tokenizer=tok, device=-1)
print(gen(
    "Write a reflective paragraph about conscience and fate in an aristocratic household.",
    max_new_tokens=200, do_sample=True, temperature=0.7, top_p=0.9
)[0]["generated_text"])
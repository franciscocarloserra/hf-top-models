---
language:
- en
- zh
license: apache-2.0
base_model: Qwen/Qwen3.5-27B
tags:
- unsloth
- qwen
- qwen3.5
- reasoning
- chain-of-thought
- Dense
pipeline_tag: image-text-to-text
datasets:
- nohurry/Opus-4.6-Reasoning-3000x-filtered
- Jackrong/Qwen3.5-reasoning-700x
---

# 🌟 Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled

🔥 **Update (April 5):** I’ve released the complete training notebook, codebase, and a comprehensive PDF guide to help beginners and enthusiasts understand and reproduce this model's fine-tuning process. 

> ❤️ Special thanks to the [**Unsloth**](https://unsloth.ai) open-source library and [@KyleHessling1](https://x.com/kylehessling1) for their support.

## 📚 Resources & Guides

👉 **[GitHub Repository: Jackrong-llm-finetuning-guide](https://github.com/R6410418/Jackrong-llm-finetuning-guide.git)**
Visit the repo to dive into the codebase and reproduce the results locally or on Colab.

### 📥 Core Technical Document
**🔗 [Qwopus3.5-27b Complete Fine-Tuning Guide (PDF)](https://github.com/R6410418/Jackrong-llm-finetuning-guide/blob/main/guidePDF/Qwopus3-5-27b-Colab_complete_guide_to_llm_finetuning.pdf)**
* **The Full Pipeline:** A step-by-step walkthrough—from downloading the base model and unifying heterogeneous data, to configuring trainer hyperparameters and publishing to Hugging Face.
* **Beginner Friendly:** Includes an introductory guide to getting started with Google Colab and Unsloth.
* *Feedback welcome! If you spot any areas for improvement, please let me know and I will update it promptly.*

> **A Note:**
> My goal isn't just to detail a workflow, but to demystify LLM training. Beyond the social media hype, fine-tuning isn't an unattainable ritual—often, all you need is a Google account, a standard laptop, and relentless curiosity. 
> 
> *No one starts as an expert, but every expert was once brave enough to begin.*
> 
> All training and testing for this project were self-funded. If you find this model or guide helpful, a **Star ⭐️ on GitHub** would be the greatest encouragement. Thank you! 🙏

> [!Note]
> The Claude series model optimizations are named under the **Qwopus3.5 series**, with the latest version being **🌟Qwopus3.5-v3**.

---

# 🌟 Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled

> **Build Environment Upgrades:**
> - **Fine-tuning Framework**: **Unsloth 2026.3.3** 
> - **Core Dependencies**: **Transformers 5.2.0**
> - This model fixes the crash in the official model caused by the Jinja template not supporting the **"developer"** role. (commonly sent by modern coding agents like Claude Code and OpenCode)
> - It does **not disable thinking mode by default**, and allowing the agent to run continuously for **over 9 minutes without interruption**.
> - Compared to the original model, **autonomy and stability are significantly improved**.

![HB8AleUaMAArNyM](https://cdn-uploads.huggingface.co/production/uploads/66309bd090589b7c65950665/GHkMJL6I383eIwK1qj80K.jpeg)


## 💡 Model Introduction
**Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled** is a highly capable reasoning model fine-tuned on top of the powerful Qwen3.5 architecture. The model's core directive is to leverage state-of-the-art Chain-of-Thought (CoT) distillation primarily sourced from Claude-4.6 Opus interactions. 

Through Supervised Fine-Tuning (SFT) focusing specifically on structured reasoning logic, this model excels in breaking down complex user problems, planning step-by-step methodologies within strictly formatted `<think>` tags, and ultimately delivering precise, nuanced solutions. 

### 🧠 Example of Learned Reasoning Scaffold（Example）

The model includes targeted optimizations addressing Qwen3.5’s tendency toward excessive transitional or repetitive reasoning on simple queries. Through deep distillation and structural imitation of Claude-4.6-Opus reasoning chains, the model adopts a more efficient structured thinking pattern:  
**“Let me analyze this request carefully: 1..2..3...”.**  
This streamlined reasoning paradigm significantly reduces redundant cognitive loops while preserving deep analytical capacity, resulting in substantially improved inference efficiency.

```text
Let me analyze this request carefully:

1. Identify the core objective of the problem.
2. Break the task into clearly defined subcomponents.
3. Evaluate constraints and edge cases.
4. Formulate a step-by-step solution plan.
5. Execute the reasoning sequentially and verify consistency.
            .
            .
            .
```

## 🗺️ Training Pipeline Overview

```text
Base Model (Qwen3.5-27B)
 │
 ▼
Supervised Fine-Tuning (SFT) + LoRA
 │
 ▼
Final Model (Claude-4.6-Opus-Reasoning-Distilled,text-only)
```

## 📋 Stage Details

**🔧Tool Calling Benchmark**（benchmark tests by user @Chris Klaus）

![Screenshot 2026-03-24 at 10.19.28 AM](https://cdn-uploads.huggingface.co/production/uploads/66309bd090589b7c65950665/TjfbXq5AahoMj8xZuFDig.png)

> **From the test results, it is clear that different Qwen3.5 quantized models show significant differences in tool-calling capability. Among them, only the 27B model distilled with Claude Opus reasoning demonstrates stable performance.**


🔥**Community-tested advantages** (benchmark tests by user @sudoing on a single RTX 3090):

Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled shows significant advantages in coding-agent environments such as Claude Code and OpenCode:

>- **Native support for the “developer” role**, requiring no Jinja template patches or ChatML workarounds.  
>- **Thinking mode fully preserved** (logs confirm `thinking=1`), not silently disabled, maintaining the complete chain-of-thought reasoning process.  
>- **Greatly improved autonomy and stability** — capable of running continuously for **over 9 minutes autonomously** (with zero human intervention). It actively waits for tool responses, reads outputs, self-corrects errors, and can even automatically generate a README, whereas the base model often stalls or freezes mid-execution.  

>**Hardware usage remains unchanged:**  
>- About **16.5 GB VRAM** with **Q4_K_M** quantization  
>- **29–35 tok/s** generation speed  
>- **Full 262K context** with no compromises  

- These improvements come from successfully distilling the **structured reasoning style of Claude 4.6 Opus**, allowing Qwopus to be truly **plug-and-play in modern local coding agents** and deliver an experience close to Opus in smoothness and usability.



### 🔹 Supervised Fine-Tuning (SFT)
- **Objective:** To inject high-density reasoning logic and establish a strict format for problem-solving involving an internal thinking state prior to outputting the final response.
- **Methodology:** We utilized **Unsloth** for highly efficient memory and compute optimization. A critical component of this stage is the `train_on_responses_only` strategy, masking instructions so the loss is purely calculated over the generation of the `<think>` sequences and the subsequent solutions. 
- **Format Enforcement:** All training samples were systematically normalized so the model strictly abides by the structure `<think> {internal reasoning} </think>\n {final answer}`.

### 📚 All Datasets Used
The dataset consists of high-quality, filtered reasoning distillation data:

| Dataset Name | Description / Purpose |
|--------------|-----------------------|
| [nohurry/Opus-4.6-Reasoning-3000x-filtered](https://huggingface.co/datasets/nohurry/Opus-4.6-Reasoning-3000x-filtered) | Provides comprehensive Claude 4.6 Opus reasoning trajectories. |
| [Jackrong/Qwen3.5-reasoning-700x](https://huggingface.co/datasets/Jackrong/Qwen3.5-reasoning-700x) | Additional curated reasoning samples designed to strengthen structured step-by-step problem solving and improve reasoning diversity. |

## 🌟 Core Skills & Capabilities
1. **Modular & Structured Thinking:** Inheriting traits from Opus-level reasoning, the model demonstrates confident parsing of the prompt, establishing an outlined plan in its `<think>` block sequentially rather than exploratory "trial-and-error" self-doubt.

## ⚠️ Limitations & Intended Use
- **Hallucination Risk:** While reasoning is strong, the model remains an autoregressive LLM; external facts provided during the thinking sequence may occasionally contain hallucinations if verifying real-world events.
- **Intended Scenario:** Best suited for offline analytical tasks, coding, math, and heavy logic-dependent prompting where the user needs to transparently follow the AI's internal logic.
- **Preview Version Notice:** Because this model is relatively new and intentionally lightweight, the surrounding ecosystem — including inference templates, fine-tuning pipelines, routing configurations, and tooling integrations — may not yet be fully mature or standardized. As a result, users may encounter occasional bugs, compatibility inconsistencies, or integration edge cases. The current release should be considered a preview build while the broader architectural stack and supporting utilities continue to stabilize and improve.

## 🙏 Acknowledgements
Significant thanks to the [Unsloth AI](https://unsloth.ai/) team for making rapid fine-tuning of MoE and large LLM models accessible. Additionally, we acknowledge Qwen internally, and the open-source community developers producing exceptional distilled datasets (`nohurry` and `TeichAI`).

## 📖 Citation

If you use this model in your research or projects, please cite:

```bibtex
@misc{jackrong_qwen35_opus_distilled,
  title        = {Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled},
  author       = {Jackrong},
  year         = {2026},
  publisher    = {Hugging Face},
  howpublished = {\url{https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled}}
}
```
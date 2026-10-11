---
library_name: transformers
base_model: Qwen/Qwen3.5-27B
tags:
- gguf
- llama.cpp
- image-text-to-text
- vision
- multimodal
- text-generation-inference
- transformers
- unsloth
- conversational
- qwen
- qwen3.5
- reasoning
- chain-of-thought
- lora
license: apache-2.0
language:
- en
- zh
- ko
pipeline_tag: image-text-to-text
datasets:
- nohurry/Opus-4.6-Reasoning-3000x-filtered
- Jackrong/Qwen3.5-reasoning-700x
- Roman1111111/claude-opus-4.6-10000x
---
# 🌟 Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-v2

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

## 📢 Announcement

> **v2 Update:**
> - **Accuracy preserved:**  Matches base model on HumanEval (**96.91% pass@1**)
>
> - **Shorter reasoning:**   ~**24% reduction** in chain-of-thought length
>
> - **Higher efficiency:**   **+31.6% more correct solutions per token**
>
> - ⚠️**Trade-off:**   −1.24% on HumanEval+ −7.2% on MMLU-Pro (Indicating reduced general knowledge reasoning performance)
>
> *⚠️Note: Due to the scope of SFT data and training focus, the model may underperform the base model on certain tasks requiring long-context understanding or more complex multi-step reasoning. The efficiency and accuracy results reported here are based solely on the HumanEval and HumanEval+ benchmarks. Thank you for your understanding.*

![HCaJnUQaoAAaMIc](https://cdn-uploads.huggingface.co/production/uploads/66309bd090589b7c65950665/k4JsVit-31Fw8RZ4pFkun.jpeg)

## 💡 Model Introduction
**Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-v2** is the second iteration of this reasoning-focused Qwen3.5-27B fine-tune, built to drastically improve the *efficiency* of chain-of-thought generation, unlocking highly substantial gains in reasoning speed and cost-reduction while actually increasing absolute accuracy.

Compared with the earlier version, **v2 was trained with 14,000 Claude 4.6 Opus-style general reasoning samples**, with a stronger emphasis on transferring concise, reusable reasoning patterns rather than only maximizing raw benchmark scores. The goal of v2 is not simply to make the model "think more," but to help it **think more economically**: reducing unnecessarily long internal chains, avoiding verbose over-analysis on easy problems, and massively improving the reasoning-cost-to-quality ratio while beating the baseline's benchmark correctness.

A key design choice in v2 is that the distillation data is **primarily general-domain reasoning data**—specifically focused on mathematics, word problems, logical deduction, and a balanced mix of general knowledge and instructions—rather than specialized code-heavy supervision. Consequently, **HumanEval and HumanEval+ are employed here to evaluate cross-task generalization and capability transfer**, rather than serving as direct optimization targets. High performance on these benchmarks, despite the lack of code-centric training, confirms that the model's **reasoning scaffold** has become more robust and transferable, proving that fundamental reasoning logic can effectively power specialized tasks like programming.

### HumanEval Benchmark Analysis 🪐

*The raw evaluation outputs for both models were independently cleaned, verified, and aggregated using **GPT-5.4-Pro-Thinking**. The final comparative results are based on these standardized and curated outputs. To ensure reliability, all results were further cross-checked and consolidated through **two rounds of independent validation using Claude-4.6-Opus-Thinking**.*

-All evaluations were conducted in an inference environment based on Unsloth + vLLM (BF16) to ensure consistent and efficient execution conditions.

![Screenshot 2026-03-20 at 3.54.26 PM](https://cdn-uploads.huggingface.co/production/uploads/66309bd090589b7c65950665/jiO5dlkZ-QtE4YOcKiwu5.png)


![Screenshot 2026-03-20 at 3.54.51 PM](https://cdn-uploads.huggingface.co/production/uploads/66309bd090589b7c65950665/XkgeRx_KSpA_L0mnk8fHM.png)


![Screenshot 2026-03-20 at 3.58.30 PM](https://cdn-uploads.huggingface.co/production/uploads/66309bd090589b7c65950665/dUZDTx62-Iq9vQiDux3xN.png)


![Screenshot 2026-03-20 at 3.55.49 PM](https://cdn-uploads.huggingface.co/production/uploads/66309bd090589b7c65950665/gPKc245Kdnr9XsHNWiR3v.png)


![Screenshot 2026-03-20 at 3.56.01 PM](https://cdn-uploads.huggingface.co/production/uploads/66309bd090589b7c65950665/7MWprKLW12xczpMaj1yN7.png)


![Screenshot 2026-03-20 at 3.56.18 PM](https://cdn-uploads.huggingface.co/production/uploads/66309bd090589b7c65950665/zvXBc1dsBjsFh66kQvJMJ.png)


## 🗺️ Training Pipeline Overview

```text
Base Model (Qwen3.5-27B)
 │
 ▼
Qwen3.5-27B fine-tuned with Unsloth
 │
 ▼
Supervised Fine-Tuning (SFT) + LoRA
(Response-Only Training masked on "<|im_start|>assistant\n<think>")
 │
 ▼
Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-v2
```

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

### 📚 All Datasets Used
The dataset consists of high-quality, filtered reasoning distillation data:

| Dataset Name | Description / Purpose |
|--------------|-----------------------|
| [nohurry/Opus-4.6-Reasoning-3000x-filtered](https://huggingface.co/datasets/nohurry/Opus-4.6-Reasoning-3000x-filtered) | Provides comprehensive Claude 4.6 Opus reasoning trajectories. |
| [Roman1111111/claude-opus-4.6-10000x](https://huggingface.co/datasets/Roman1111111/claude-opus-4.6-10000x) | Large-scale public Claude 4.6 Opus distillation data used to strengthen general reasoning transfer in v2. |
| [TeichAI/claude-4.5-opus-high-reasoning-250x](https://huggingface.co/datasets/TeichAI/claude-4.5-opus-high-reasoning-250x) | Injecting high-intensity, structured reasoning instances. |
| [Jackrong/Qwen3.5-reasoning-700x](https://huggingface.co/datasets/Jackrong/Qwen3.5-reasoning-700x) | Additional curated reasoning samples designed to strengthen structured step-by-step problem solving and improve reasoning diversity. |


## ⚠️ Limitations & Intended Use
- **Hallucination Risk:** While reasoning is strong, the model remains an autoregressive LLM; external facts provided during the thinking sequence may occasionally contain hallucinations if verifying real-world events.
- **Intended Scenario:** Best suited for offline analytical tasks, coding, math, and heavy logic-dependent prompting where the user needs to transparently follow the AI's internal logic.
- This model is a test version intended solely for learning and demonstration purposes, and is for academic research and technical exploration use only.

## 🙏 Acknowledgements
Significant thanks to the [Unsloth AI](https://unsloth.ai/) team for making rapid fine-tuning of large LLM models accessible. Additionally, we acknowledge Qwen internally, and the open-source community developers producing exceptional distilled datasets.


## 📖 Citation

If you use this model in your research or projects, please cite:

```bibtex
@misc{jackrong_qwen35_opus_distilled,
  title        = {Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-v2},
  author       = {Jackrong},
  year         = {2026},
  publisher    = {Hugging Face},
  howpublished = {\url{https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-v2}}
}
```



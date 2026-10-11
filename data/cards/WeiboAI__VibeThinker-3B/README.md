---
license: mit
language:
- en
base_model:
- Qwen/Qwen2.5-Coder-3B
tags:
- math
- code
- reasoning
- gpqa
- instruction-following
pipeline_tag: text-generation
library_name: transformers
---

# VibeThinker-3B

<blockquote style="border-left: 4px solid #ff6b6b; background-color: #fff5f5; padding: 10px 15px; margin: 10px 0; color: #cc3333;">
    <span style="font-weight: bold;">🚨 </span>  1.This model was not trained on tool-calling or agent-based programming data. We therefore do not recommend using it for tasks that involve function calling, API orchestration, or autonomous coding agents.
For programming tasks, we recommend using this model on competitive programming problems (e.g., <a href="https://leetcode.com/problemset/algorithms/">LeetCode-style</a>).

  <br>
  <br>
 2.For harder math reasoning, try <a href="https://huggingface.co/datasets/meituan-longcat/AMO-Bench">AMOBench</a>, a problem set harder than the International Mathematical Olympiad (IMO), with included standard answers. Use it to evaluate VibeThinker against other SOTA models. Note: due to extreme difficulty, set max tokens to 60K–100K.

</blockquote>

<p align="center"><a href="https://github.com/WeiboAI/VibeThinker">GitHub</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://modelscope.cn/models/WeiboAI/VibeThinker-3B">ModelScope</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://huggingface.co/papers/2606.16140">Technical Report</a></p>

## Introduction

VibeThinker-3B is a further exploration of the VibeThinker series at the 3B-parameter scale, focusing on challenging reasoning tasks with clear verification signals, such as mathematics, coding, and STEM. By systematically optimizing the Spectrum-to-Signal Principle (SSP) post-training pipeline introduced in VibeThinker-1.5B, VibeThinker-3B achieves strong performance on AIME, HMMT, IMO-AnswerBench, LiveCodeBench, and recent LeetCode contests, reaching the performance range of top-tier frontier reasoning models, including Qwen3.6 Plus, Gemini 3 Pro, GLM-5, and Kimi K2.5, on verifiable reasoning benchmarks.

Motivated by these observations, we propose the Parametric Compression-Coverage Hypothesis: different capabilities depend on model parameters in fundamentally different ways. Verifiable reasoning is closer to a highly compressible, parameter-dense capability, centered on multi-step reasoning, constraint satisfaction, self-correction, and answer verification. When the task space is sufficiently structured and feedback signals are sufficiently reliable, compact models may also carry near-frontier reasoning capabilities. In contrast, open-domain knowledge, general-purpose dialogue, and long-tail scenario understanding rely more heavily on large-scale parameters to broadly cover facts, concepts, and world knowledge.

From VibeThinker-1.5B to VibeThinker-3B, our goal is not to build a small model that replaces large-scale models, but to examine the real boundaries of small models along specific capability dimensions. With VibeThinker-3B, we aim to show that small models should not be viewed merely as a compromise for reducing deployment costs. For capability domains with clear feedback and verification mechanisms, SLMs emerge as a promising research trajectory toward frontier-level performance that is fundamentally complementary to the traditional parameter scaling paradigm.

![alt text](pictures/Abstrct.png)

## Key Performance Data

📏 In terms of reasoning accuracy relative to model scale, VibeThinker-3B reaches 76.4 on IMO-AnswerBench, a highly challenging benchmark with 400 IMO-level problems, with only 3B parameters, and improves to 80.6 with Claim-Level Reliability Assessment (CLR), a test-time scaling strategy for answer-verifiable reasoning tasks. This demonstrates that a model within a strictly small-model regime can reach the performance range of substantially larger models, such as DeepSeek V3.2 (78.3, 671B), GLM-5 (82.5, 744B), and Kimi K2.5 (81.8, 1T).

![alt text](pictures/Acc_and_Scale.png)

💡 VibeThinker-3B achieves strong results across mathematics, coding, knowledge, and instruction-following benchmarks. 

![alt text](pictures/VibeThiinker-3B.png)

🔁 VibeThinker-3B achieves competitive results against first-tier reasoning models and reaches the performance range of top-tier systems on several verifiable reasoning benchmarks.

![alt text](pictures/VibeThinker-3B+CLR.png)

🏆 To further test the model's out-of-distribution performance, we evaluate VibeThinker-3B on recent unseen LeetCode weekly and biweekly contests (Python) from Apr. 25 to May 31, 2026. VibeThinker-3B passes **123/128** first-attempt submissions, corresponding to a **96.1%** acceptance rate.

![alt text](pictures/LeetCode.png)


## Training Pipeline

VibeThinker-3B follows the **Spectrum-to-Signal Principle (SSP)** introduced in VibeThinker-1.5B. The SFT stage constructs a broad spectrum of valid reasoning trajectories, while the RL stage amplifies correct reasoning signals using verifiable rewards.

![alt text](pictures/Architecture.png)

The training pipeline contains the following stages:

1. **Curriculum-based two-stage SFT**
   - Stage 1 focuses on broad capability coverage across math, code, STEM reasoning, general dialogue, and instruction following.
   - Stage 2 shifts toward harder and longer-horizon reasoning samples.
   - Diversity-Exploring Distillation is used to preserve multiple valid solution paths.

2. **Multi-domain Reasoning RL**
   - VibeThinker-3B reuses MaxEnt-Guided Policy Optimization (MGPO).
   - RL is applied sequentially to math, code, and STEM reasoning tasks.
   - Training uses a single 64K long-context window to preserve complete long-horizon reasoning trajectories.

3. **Offline Self-Distillation**
   - High-quality trajectories from Math, Code, and STEM RL checkpoints are filtered and distilled back into a unified student model.
   - A learning-potential score is used to prioritize traces that are correct but not yet well modeled by the student.

4. **Instruct RL**
   - The final stage improves controllability on user-facing prompts.
   - Rule-based validators and rubric-based reward models are used for format-sensitive and open-ended instruction data.

## Usage Guidelines

We recommend using VibeThinker-3B for competitive-style math, coding, STEM reasoning, and other tasks where the target answer can be verified. For broad open-domain knowledge tasks, larger general-purpose models may still be more suitable.

For benchmark-style evaluation, the technical report uses vLLM with:

- `temperature=1.0`
- `top_p=0.95`
- `top_k=-1`

## Quick Start

Required: **transformers>=4.54.0**

Recommended for better inference performance: **vLLM==0.10.1 or SGLang>=0.4.9.post6**

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, GenerationConfig


class VibeThinker:
    def __init__(self, model_path):
        self.model_path = model_path
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_path,
            low_cpu_mem_usage=True,
            torch_dtype="bfloat16",
            device_map="auto",
        )
        self.tokenizer = AutoTokenizer.from_pretrained(
            self.model_path,
            trust_remote_code=True,
        )

    def infer_text(self, prompt):
        messages = [{"role": "user", "content": prompt}]
        text = self.tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True,
        )
        model_inputs = self.tokenizer([text], return_tensors="pt").to(self.model.device)

        generation_config = dict(
            max_new_tokens=102400,
            do_sample=True,
            temperature=1.0,
            top_p=0.95,
            top_k=None,
        )
        generated_ids = self.model.generate(
            **model_inputs,
            generation_config=GenerationConfig(**generation_config),
        )
        generated_ids = [
            output_ids[len(input_ids):]
            for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
        ]

        return self.tokenizer.batch_decode(
            generated_ids,
            skip_special_tokens=True,
        )[0]


if __name__ == "__main__":
    model = VibeThinker("WeiboAI/VibeThinker-3B")
    prompt = "Your Prompt"
    print(model.infer_text(prompt))
```

## License

The model repository is licensed under the MIT License.

## Citations & References

If you use VibeThinker-3B in your research or product, please cite:

```bibtex
@misc{xu2026vibethinker3bexploringfrontierverifiable,
      title={VibeThinker-3B: Exploring the Frontier of Verifiable Reasoning in Small Language Models}, 
      author={Sen Xu and Shixi Liu and Wei Wang and Jixin Min and Yingwei Dai and Zhibin Yin and Yirong Chen and Xin Zhou and Junlin Zhang},
      year={2026},
      eprint={2606.16140},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2606.16140}, 
}
```

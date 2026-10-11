---
license: mit
language:
- en
base_model:
- Qwen/Qwen2.5-Math-1.5B
tags:
- math
- code
- gpqa
pipeline_tag: text-generation
library_name: transformers
---

# VibeThinker-1.5B

<blockquote style="border-left: 4px solid #ff6b6b; background-color: #fff5f5; padding: 10px 15px; margin: 10px 0; color: #cc3333;">
    <span style="font-weight: bold;">🚨 </span> We recommend using this model for competitive-style math and algorithm coding problems(such as Leetcode,Codeforces,etc). It works better to ask the question in English. We do not advise using it for other tasks, as this is an experimental release aimed at exploring the reasoning capabilities of small models.
</blockquote>

<p align="center">📁 <a href="https://github.com/WeiboAI/VibeThinker">Github</a>&nbsp&nbsp | &nbsp&nbsp🤖 <a href="https://modelscope.cn/models/WeiboAI/VibeThinker-1.5B">Model Scope</a>   |  &nbsp&nbsp📄  <a href="https://huggingface.co/papers/2511.06221">Techical Report</a></p>

## Introduction
VibeThinker-1.5B is a 1.5-billion parameter dense language model. With a total training cost of only $7,800 USD, it achieves reasoning performance comparable to larger models like GPT OSS-20B Medium.

![image](https://cdn-uploads.huggingface.co/production/uploads/64d1faaa1ed6649d70d1fa2f/5bDNf3C0fq9n82kjHLfIb.png)

## Key Performance Data
💡 Mathematical Reasoning: On the three major math benchmarks AIME24, AIME25, and HMMT25, its scores (80.3, 74.4, and 50.4, respectively) all surpass those of the initial DeepSeek R1 model, which has over 400 times the parameters (scores of 79.8, 70.0, and 41.7, respectively).

🌱 Code Generation: It achieved scores of 55.9 on LiveCodeBench v5 and 51.1 on v6. Its v6 score slightly leads Magistral Medium (50.3), underscoring its strong reasoning performance.

![image](https://cdn-uploads.huggingface.co/production/uploads/64d1faaa1ed6649d70d1fa2f/jYT1Iq9Jv6vw8Cllr3DuX.png)

🔁 On the AIME 25 benchmark, VibeThinker-1.5B significantly extends the Pareto frontier of reasoning accuracy versus model scale, demonstrating that exceptional performance can be achieved with extreme parameter efficiency.

![image](https://cdn-uploads.huggingface.co/production/uploads/64d1faaa1ed6649d70d1fa2f/RDOrM4MQPQRzLCqPI2_P8.png)

## Training Pipeline

![image](https://cdn-uploads.huggingface.co/production/uploads/64d1faaa1ed6649d70d1fa2f/rPfb1GKFQUOICcFs95Aus.png)

VibeThinker-1.5B's core innovation lies in the "Spectrum-to-Signal Principle" (SSP) training framework: it first explores solution diversity during the Supervised Fine-Tuning (SFT) stage, and then optimizes its policy to reinforce correct signals in the Reinforcement Learning (RL) stage. By systematically integrating these two phases, our approach establishes diversity as the central technical design principle, enabling VibeThinker-1.5B to achieve robust performance that surpasses conventional training paradigms.

## Usage Guidelines

**We recommend using this model for competitive-style math and coding problems.** 

To facilitate quick verification by the community, we recommend the following parameter settings: **temperature: 0.6 or 1.0, max token length: 40960, top_p: 0.95, top_k: -1.**

A more detailed evaluation scheme we have prepared can be found on [GitHub](https://github.com/WeiboAI/VibeThinker/tree/main/eval).

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
            device_map="auto"
        )
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_path, trust_remote_code=True)

    def infer_text(self, prompt):
        messages = [
            {"role": "user", "content": prompt}
        ]
        text = self.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
        model_inputs = self.tokenizer([text], return_tensors="pt").to(self.model.device)

        text = self.tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )
        model_inputs = self.tokenizer([text], return_tensors="pt").to(self.model.device)

        generation_config = dict(
            max_new_tokens=40960,
            do_sample=True,
            temperature=0.6, # 0.6 or 1.0, you can set it according to your needs
            top_p=0.95,
            top_k=None # in vLLM or SGlang, please set top_k to -1, it means skip top_k for sampling
        )
        generated_ids = self.model.generate(
            **model_inputs,
            generation_config=GenerationConfig(**generation_config)
        )
        generated_ids = [
            output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
        ]

        response = self.tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]

        return response


if __name__ == '__main__':
    model = VibeThinker('Your model path')
    prompt = 'Your Prompt'
    print(model.infer_text(prompt))
```

## License
The model repository is licensed under the MIT License.


## Citations & References
If you use VibeThinker in your research or product, please cite:
```
@misc{xu2025tinymodelbiglogic,
      title={Tiny Model, Big Logic: Diversity-Driven Optimization Elicits Large-Model Reasoning Ability in VibeThinker-1.5B}, 
      author={Sen Xu and Yi Zhou and Wei Wang and Jixin Min and Zhibin Yin and Yingwei Dai and Shixi Liu and Lianyu Pang and Yirong Chen and Junlin Zhang},
      year={2025},
      eprint={2511.06221},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2511.06221}, 
}
```
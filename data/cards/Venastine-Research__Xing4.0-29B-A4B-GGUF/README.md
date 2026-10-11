---
library_name: transformers
license: apache-2.0
pipeline_tag: text-generation
base_model:
- XingChen-AGI/Xing4.0-29B-A4B
---

# Xing4.0-29B-A4B

> [!Note]
> This repository provides the model weights and configuration files for Xing4.0-29B-A4B in Hugging Face Transformers format, compatible with Transformers, vLLM, SGLang, KTransformers, and other mainstream inference frameworks.

**Xing4.0-29B-A4B** is a next-generation large language model in the Xing series (formerly [TeleChat](https://github.com/Tele-AI/TeleChat3)), developed by China Telecom Artificial Intelligence Technology Co., Ltd. With 29B total parameters and only 4B activated per token, it natively supports a 256K context length, extensible to 512K. It is the first model of this scale trained entirely on the Ascend NPU platform with the MindSpore framework, and deeply optimized for complex engineering tasks.

For more information, please refer to our [GitHub repository](https://github.com/XingChen-AGI/Xing4.0-29B-A4B).


## Highlights

- **Agent-Oriented Architecture**: Built on the mHC + MLA + MTP architecture, supporting multi-step planning, tool calling, and complex reasoning chain execution, ensuring task coherence and execution stability under long contexts.
- **Deep Co-optimization with Ascend NPU**: Adapted for Ascend 910C clusters using MindSpore/MindFormers, including feature adaptation for mHC and fused operator development, enabling stable and efficient training on the Ascend platform.
- **Significant Training Efficiency Gains**: Through multi-level co-optimization — including fine-grained MoE communication optimization, selective recomputation, DVM automatic graph-operator fusion, and Ascend C mHC fused operators — overall training throughput was improved by approximately **96%** over out-of-the-box performance.
- **Full Open-Source Ecosystem Compatibility**: Supports LLaMA-Factory and MindFormers for fine-tuning; SGLang, vLLM, and KTransformers for inference and deployment; with targeted adaptation and format alignment for agent frameworks such as OpenCode, Claude Code, OpenClaw, and Hermes, enabling seamless integration into existing workflows.
- **Easy Adaptation for Domain-Specific Scenarios**: The model is well-suited for downstream task fine-tuning, allowing lightweight customization on proprietary data for vertical domains such as intent classification, table understanding, contract auditing, and knowledge-based QA, enabling rapid domain capability development and deployment at low cost.


## Model Overview

|                  | Xing4.0-29B-A4B |
|------------------|-----------------|
| Parameters       | 29B (4B active) |
| Number of Layers           | 40              |
| Hidden Size      | 3584            |
| Dense FFN Intermediate Size | 9216       |
| Expert Intermediate Size    | 1024       |
| Attention Type   | MLA             |
| Number of Routed Experts | 64              |
| Active Experts per Token | 4              |
| Number of Shared Experts | 1               |
| Context Length   | 256K (extensible to 512K) |


## Benchmark

| Benchmark              | Xing4.0-29B-A4B | Gemma4-26B-A4B | Qwen3.6-35B-A3B |
|------------------------|:---:|:---:|:---:|
| IFBench                | 69.67 | 72.67 | 65.50 |
| AIME2026               | 90.00 | 88.30 | 92.70 |
| AA.LCR                 | 61.00 | 66.00 | 62.00 |
| Tau3-Bench             | 64.63 | 58.90 | 67.20 |
| Claw-Eval              | **76.55** | 71.49 | 74.54 |
| SWE-bench Verified     | **75.00** | 53.00 | 76.00 |
| Terminal-Bench 2.1     | **57.50** | 30.00 | 51.50 |
| SWE-bench Multilingual | 66.00 | 51.00 | 67.20 |
| DeepresearchBII        | **60.80** | 39.30 | 59.70 |


## Quickstart

### Inference

Xing4.0-29B-A4B can be accessed via an OpenAI-compatible API.

```python
from openai import OpenAI

client = OpenAI(
    base_url="your-base-url",
    api_key="your-api-key",
)

completion = client.chat.completions.create(
    model="Xing4.0-29B-A4B",
    messages=[{"role": "user", "content": "Briefly explain the basic principles of quantum computing."}],
    temperature=1.0,
    top_p=0.95,
    extra_body={
        "repetition_penalty": 1.05,
        "skip_special_tokens": False,
        "spaces_between_special_tokens": False,
        "chat_template_kwargs": {
            "enable_thinking": True,  # Set to False to disable thinking
        },
    },
)

print(completion.choices[0].message.content)
```


### Serving

Xing4.0-29B-A4B supports deployment with [vLLM](https://github.com/vllm-project/vllm), [SGLang](https://github.com/sgl-project/sglang), and [KTransformers](https://github.com/kvcache-ai/ktransformers). For detailed launch instructions, please refer to our [GitHub repository](https://github.com/XingChen-AGI/Xing4.0-29B-A4B).



### Recommended Parameters

| Scenario | temperature | top_p | repetition_penalty |
|----------|:-----------:|:-----:|:------------------:|
| Complex reasoning / general tasks | 1.0 | 0.95 | 1.05 |
| Coding / agent tasks              | 0.8 | 0.95 | 1.05 |


## Footnotes

- **SWE-bench Verified**: We evaluate Xing4.0-29B-A4B using the `SWE-agent` harness with `temperature=1.0, top_p=0.95, repetition_penalty=1.05` and a `210`K context window.
- **Terminal-Bench 2.1**: We evaluate in `terminus-2` with `temperature=0.8, top_p=0.95, repetition_penalty=1.05, max_tokens=64K` and a `24`-hour timeout. We report the average score over `3` runs.
- **SWE-bench Multilingual**: We evaluate Xing4.0-29B-A4B using the `SWE-agent` harness with `temperature=1.0, top_p=0.95, repetition_penalty=1.05` and a `210`K context window.
- **Claw-Eval**: We evaluate using the [official harness](https://github.com/claw-eval/claw-eval) with `temperature=0.8, top_p=0.95, repetition_penalty=1.05, max_tokens=16384` and a 256K context window. We report the average score over `3` runs.
- **Tau3-Bench**: We evaluate using the [official harness](https://github.com/sierra-research/tau-bench) with `temperature=0.8, top_p=0.95, repetition_penalty=1.05, max_tokens=16384`. We report the average pass^1 over `4` runs.
- **DeepresearchBII**: We evaluate using the `OpenCode` harness with `temperature=0.8, top_p=0.95, repetition_penalty=1.05, max_tokens=32768` and a `256`K context window, with Exa MCP server enabled.
- **AIME2026**: We evaluate with `temperature=1.0, top_p=0.95, repetition_penalty=1.05, max_tokens=131072`. We report the average score over 5 independent runs.
- **IFBench**: We evaluate with `temperature=0.8, top_p=0.95, repetition_penalty=1.05, max_tokens=81920`.
- **AA.LCR**: We evaluate with `temperature=1.0, top_p=0.95, repetition_penalty=1.05, max_tokens=65536`. We report the average score over `3` runs.




## Citation

```bibtex
@misc{liu2025trainingreporttelechat3moe,
      title={Training Report of TeleChat3-MoE}, 
      author={Xinzhang Liu and Chao Wang and Zhihao Yang and Zhuo Jiang and Xuncheng Zhao and Haoran Wang and Lei Li and Dongdong He and Luobin Liu and Kaizhe Yuan and Han Gao and Zihan Wang and Yitong Yao and Sishi Xiong and Wenmin Deng and Haowei He and Kaidong Yu and Yu Zhao and Ruiyu Fang and Yuhao Jiang and Yingyan Li and Xiaohui Hu and Xi Yu and Jingqi Li and Yanwei Liu and Qingli Li and Xinyu Shi and Junhao Niu and Chengnuo Huang and Yao Xiao and Ruiwen Wang and Fengkai Li and Luwen Pu and Kaipeng Jia and Fubei Yao and Yuyao Huang and Xuewei He and Zhuoru Jiang and Ruiting Song and Rui Xue and Qiyi Xie and Jie Zhang and Zilu Huang and Zhaoxi Zhang and Zhilong Lu and Yanhan Zhang and Yin Zhang and Yanlei Xue and Zhu Yuan and Teng Su and Xin Jiang and Shuangyong Song and Yongxiang Li and Xuelong Li},
      year={2025},
      eprint={2512.24157},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2512.24157}, 
}

@misc{wang2025technicalreporttelechat2telechat25,
      title={Technical Report of TeleChat2, TeleChat2.5 and T1}, 
      author={Zihan Wang and Xinzhang Liu and Yitong Yao and Chao Wang and Yu Zhao and Zhihao Yang and Wenmin Deng and Kaipeng Jia and Jiaxin Peng and Yuyao Huang and Sishi Xiong and Zhuo Jiang and Kaidong Yu and Xiaohui Hu and Fubei Yao and Ruiyu Fang and Zhuoru Jiang and Ruiting Song and Qiyi Xie and Rui Xue and Xuewei He and Yanlei Xue and Zhu Yuan and Zhaoxi Zhang and Zilu Huang and Shiquan Wang and Xin Wang and Hanming Wu and Mingyuan Wang and Xufeng Zhan and Yuhan Sun and Zhaohu Xing and Yuhao Jiang and Bingkai Yang and Shuangyong Song and Yongxiang Li and Zhongjiang He and Xuelong Li},
      year={2025},
      eprint={2507.18013},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2507.18013}, 
}
```
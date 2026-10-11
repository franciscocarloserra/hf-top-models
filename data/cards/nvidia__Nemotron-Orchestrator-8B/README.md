---
library_name: transformers
base_model:
- Qwen/Qwen3-8B
---
# ToolOrchestra: Elevating Intelligence via Efficient Model and Tool Orchestration

[![Paper](https://img.shields.io/badge/ArXiv-Paper-brown)](https://arxiv.org/abs/2511.21689)
[![Code](https://img.shields.io/badge/GitHub-Link-orange)](https://github.com/NVlabs/ToolOrchestra/)
[![Model](https://img.shields.io/badge/HuggingFace-Model-green)](https://huggingface.co/nvidia/Orchestrator-8B)
[![Data](https://img.shields.io/badge/HuggingFace-Data-blue)](https://huggingface.co/datasets/nvidia/ToolScale)
[![Website](https://img.shields.io/badge/Web-Page-purple)](https://research.nvidia.com/labs/lpr/ToolOrchestra/)


### Description

Orchestrator-8B is a state-of-the-art 8B parameter orchestration model designed to solve complex, multi-turn agentic tasks by coordinating a diverse set of expert models and tools.
<p align="center">
    <img src="https://raw.githubusercontent.com/NVlabs/ToolOrchestra/main/assets/method.png" width="100%"/>
<p>


On the Humanity's Last Exam (HLE) benchmark, ToolOrchestrator-8B achieves a score of 37.1%, outperforming GPT-5 (35.1%) while being approximately 2.5x more efficient.

<p align="center">
    <img src="https://raw.githubusercontent.com/NVlabs/ToolOrchestra/main/assets/HLE_benchmark.png" width="80%"/>
<p>

This model is for research and development only.


### Key Features

- Intelligent Orchestration: Capable of managing heterogeneous toolsets including basic tools (search, code execution) and other LLMs (specialized and generalist).
- Multi-Objective RL Training: Trained via Group Relative Policy Optimization (GRPO) with a novel reward function that optimizes for accuracy, latency/cost, and adherence to user preferences.
- Efficiency: Delivers higher accuracy at significantly lower computational cost compared to monolithic frontier models.
- Robust Generalization: Demonstrated ability to generalize to unseen tools and pricing configurations.

### Benchmark
On Humanity’s Last Exam, Orchestrator-8B achieves 37.1%, surpassing GPT-5 (35.1%) with only 30% monetary cost and 2.5x faster. On FRAMES and τ²-Bench, Orchestrator-8B consistently outperforms strong monolithic systems, demonstrating versatile reasoning and robust tool orchestration.

<p align="center">
    <img src="https://raw.githubusercontent.com/NVlabs/ToolOrchestra/main/assets/results.png" width="100%"/>
<p>

Orchestrator-8B consistently outperforms GPT-5, Claude Opus 4.1 and Qwen3-235B-A22B on HLE with substantially lower cost.
<p align="center">
    <img src="https://raw.githubusercontent.com/NVlabs/ToolOrchestra/main/assets/cost_performance.png" width="60%"/>
<p>


### Model Details

- Developed by: NVIDIA & University of Hong Kong 
- Model Type: Decoder-only Transformer
- Base Model: [Qwen3-8B](https://huggingface.co/Qwen/Qwen3-8B) 
- Parameters: 8B
- Language(s): English
- License: NVIDIA License

### Model Version(s):
1.0 <br>

### Training Dataset:
**Link:** 
| Dataset                      | Link                                                                                         | 
|---------------------------|-------------------------------------------------------------------------------------------|
| GeneralThought-430K  | [Link](https://huggingface.co/datasets/natolambert/GeneralThought-430K-filtered)                   |
| ToolScale           | [Link](https://huggingface.co/datasets/nvidia/ToolScale)                            |



### Ethical Considerations:
NVIDIA believes Trustworthy AI is a shared responsibility and we have established policies and practices to enable development for a wide array of AI applications.  When downloaded or used in accordance with our terms of service, developers should work with their internal model team to ensure this model meets requirements for the relevant industry and use case and addresses unforeseen product misuse. <br> 

Please report model quality, risk, security vulnerabilities or NVIDIA AI Concerns [here](https://app.intigriti.com/programs/nvidia/nvidiavdp/detail).


### License/Terms of Use
[NVIDIA License](LICENSE)


### Citation
If you find this model useful, please cite our [paper](https://arxiv.org/abs/2511.21689):
```
@misc{toolorchestra,
      title={ToolOrchestra: Elevating Intelligence via Efficient Model and Tool Orchestration}, 
      author={Hongjin Su and Shizhe Diao and Ximing Lu and Mingjie Liu and Jiacheng Xu and Xin Dong and Yonggan Fu and Peter Belcak and Hanrong Ye and Hongxu Yin and Yi Dong and Evelina Bakhturina and Tao Yu and Yejin Choi and Jan Kautz and Pavlo Molchanov},
      year={2025},
      eprint={2511.21689},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2511.21689}, 
}
```
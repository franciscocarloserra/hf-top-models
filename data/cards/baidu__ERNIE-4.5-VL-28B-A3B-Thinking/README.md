---
license: apache-2.0
language:
- en
- zh
pipeline_tag: image-text-to-text
tags:
- ERNIE4.5
library_name: transformers
---

<div align="center" style="line-height: 1;">
  <a href="https://ernie.baidu.com/" target="_blank" style="margin: 2px;">
    <img alt="Chat" src="https://img.shields.io/badge/🤖_Chat-ERNIE_Bot-blue" style="display: inline-block; vertical-align: middle;"/>
  </a>
  <a href="https://huggingface.co/baidu" target="_blank" style="margin: 2px;">
    <img alt="Hugging Face" src="https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Baidu-ffc107?color=ffc107&logoColor=white" style="display: inline-block; vertical-align: middle;"/>
  </a>
  <a href="https://github.com/PaddlePaddle/ERNIE" target="_blank" style="margin: 2px;">
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-ERNIE-000?logo=github&color=0000FF" style="display: inline-block; vertical-align: middle;"/>
  </a>
  <a href="https://ernie.baidu.com/blog/ernie4.5" target="_blank" style="margin: 2px;">
    <img alt="Blog" src="https://img.shields.io/badge/🖖_Blog-ERNIE4.5-A020A0" style="display: inline-block; vertical-align: middle;"/>
  </a>
  <a href="https://discord.gg/JPmZXDsEEK" target="_blank" style="margin: 2px;">
    <img alt="Discord" src="https://img.shields.io/badge/Discord-ERNIE-5865F2?logo=discord&logoColor=white" style="display: inline-block; vertical-align: middle;"/>
  </a>
  <a href="https://x.com/PaddlePaddle" target="_blank" style="margin: 2px;">
    <img alt="X" src="https://img.shields.io/badge/X-PaddlePaddle-6080F0"?logo=x&logoColor=white" style="display: inline-block; vertical-align: middle;"/>
  </a>
  <a href="https://x.com/ErnieforDevs" target="_blank" style="margin: 2px;">
    <img alt="X" src="https://img.shields.io/badge/X-ErnieforDevs-A080F0"?logo=x&logoColor=white" style="display: inline-block; vertical-align: middle;"/>
  </a>
</div>

<div align="center" style="line-height: 1;">
  <a href="#license" style="margin: 2px;">
    <img alt="License" src="https://img.shields.io/badge/License-Apache2.0-A5de54" style="display: inline-block; vertical-align: middle;"/>
  </a>
</div>

# 🚀 **Introducing ERNIE-4.5-VL-28B-A3B-Thinking: A Breakthrough in Multimodal AI**

🔥 [Demo](https://huggingface.co/spaces/baidu/ERNIE-4.5-VL-28B-A3B-Thinking)

## Model Highlights

Built upon the powerful ERNIE-4.5-VL-28B-A3B architecture, the newly upgraded **ERNIE-4.5-VL-28B-A3B-Thinking** achieves a remarkable leap forward in multimodal reasoning capabilities. 🧠✨ Through an extensive mid-training phase, the model absorbed a vast and highly diverse corpus of premium visual-language reasoning data. This massive-scale training process dramatically boosted the model's representation power while deepening the semantic alignment between visual and language modalities—unlocking unprecedented capabilities in nuanced visual-textual reasoning. 📊

The model leverages cutting-edge multimodal reinforcement learning techniques on verifiable tasks, integrating GSPO and IcePop strategies to stabilize MoE training combined with dynamic difficulty sampling for exceptional learning efficiency. ⚡ Responding to strong community demand, we've significantly strengthened the model's grounding performance with improved instruction-following capabilities, making visual grounding functions more accessible than ever. 🎯 Additionally, our innovative "Thinking with Images" feature, when paired with tools like image zooming and image search, dramatically elevates the model's ability to process fine-grained details and handle long-tail visual knowledge. 🔍🖼️

Together, these enhancements form a critical foundation for developing sophisticated multimodal agents, empowering developers and researchers to create next-generation AI applications that push the boundaries of what's possible in visual-language understanding. 🤖🌟

![benchmark](./benchmark.jpg)

## Key Capabilities

As a lightweight model that activates only **3B parameters** ⚡, **ERNIE-4.5-VL-28B-A3B-Thinking** closely matches the performance of the industry's top flagship models across various benchmarks. 🚀

- **Visual Reasoning** 🧠👁️: Bolstered by large-scale reinforcement learning, the model demonstrates exceptional multi-step reasoning, chart analysis, and causal reasoning capabilities in complex visual tasks! 📊✨
- **STEM Reasoning** 🔬📐: Leveraging its powerful visual abilities, the model achieves a leap in performance on STEM tasks like solving problems from photos, easily handling even complex questions! 🎯💡
- **Visual Grounding** 📍🎨: Features more precise grounding and flexible instruction execution, easily triggering grounding functions in complex industrial scenarios for a significant efficiency boost! ⚙️💪
- **Thinking with Images** 🤔🔍: The model thinks like a human, capable of freely zooming in and out of images to grasp every detail and uncover all information. 🖼️✨
- **Tool Utilization** 🛠️⚡: Empowered by robust tool-calling capabilities, the model can instantly use functions like image search to easily identify long-tail knowledge and achieve comprehensive information retrieval! 🔎📚
- **Video Understanding** 🎬🎥: The model possesses outstanding temporal awareness and event localization abilities, accurately identifying content changes across different time segments in a video, making video analysis smarter and more efficient! ⏱️🌟

## Quickstart

[Hugging Face 🤗 app](https://huggingface.co/spaces/akhaliq/ERNIE-4.5-VL-28B-A3B-Thinking)

### Using `transformers` Library

Requirement: `transformers <= 4.57.6`

Here is an example of how to use the `transformers` library for inference:

```python
import torch
from transformers import AutoProcessor, AutoTokenizer, AutoModelForCausalLM

model_path = 'baidu/ERNIE-4.5-VL-28B-A3B-Thinking'
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    device_map="auto",
    dtype=torch.bfloat16,
    trust_remote_code=True
)

processor = AutoProcessor.from_pretrained(model_path, trust_remote_code=True)
model.add_image_preprocess(processor)

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "What color clothes is the girl in the picture wearing?"
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": "https://paddlenlp.bj.bcebos.com/datasets/paddlemix/demo_images/example1.jpg"
                }
            },
        ]
    },
]

text = processor.tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True,
)
image_inputs, video_inputs = processor.process_vision_info(messages)
inputs = processor(
    text=[text],
    images=image_inputs,
    videos=video_inputs,
    padding=True,
    return_tensors="pt",
)

device = next(model.parameters()).device
inputs = inputs.to(device)

generated_ids = model.generate(
    inputs=inputs['input_ids'].to(device),
    **inputs,
    max_new_tokens=1024,
    use_cache=False
    )
output_text = processor.decode(generated_ids[0][len(inputs['input_ids'][0]):])
print(output_text)
```

### vLLM Inference

Install vLLM

```bash
pip install decord
pip install uv
uv pip install vllm==0.11.2 --torch-backend=auto
```

Run vLLM

```bash
# 80G*1 GPU，If an error occurs, add the --gpu-memory-utilization 0.95 and try again
vllm serve baidu/ERNIE-4.5-VL-28B-A3B-Thinking --trust-remote-code
```

Run vLLM using `reasoning-parser` and `tool-call-parser`

```bash
# 80G*1 GPU，If an error occurs, add the --gpu-memory-utilization 0.95 and try again
vllm serve baidu/ERNIE-4.5-VL-28B-A3B-Thinking --trust-remote-code \
 --reasoning-parser ernie45  \
 --tool-call-parser ernie45  \
 --enable-auto-tool-choice
```

Run vLLM for video understanding (ensure your vLLM version includes [PR#31274](https://github.com/vllm-project/vllm/pull/31274) for accurate timestamp rendering)

```bash
vllm serve baidu/ERNIE-4.5-VL-28B-A3B-Thinking --trust-remote-code \
  --reasoning-parser ernie45 \
  --media-io-kwargs '{"video": {"num_frames": 180, "fps": 2}}'
```

### FastDeploy Inference

Quickly deploy services using FastDeploy as shown below. For more detailed usage, refer to the [FastDeploy GitHub Repository](https://github.com/PaddlePaddle/FastDeploy/blob/develop/docs/get_started/ernie-4.5-vl-thinking.md).

**Note:** For single-card deployment, at least 48GB of GPU memory is required.

```bash
fastdeploy serve --model baidu/ERNIE-4.5-VL-28B-A3B-Thinking \
  --max-model-len 131072 \
  --max-num-seqs 32 \
  --port 8180 \
  --quantization wint8 \
  --reasoning-parser ernie-45-vl-thinking \
  --tool-call-parser ernie-45-vl-thinking \
  --mm-processor-kwargs '{"image_max_pixels": 12845056 }'
```

### Finetuning with ERNIEKit

[ERNIEKit](https://github.com/PaddlePaddle/ERNIE) is a training toolkit based on PaddlePaddle, specifically designed for the ERNIE series of open-source large models. It provides comprehensive support for scenarios such as instruction fine-tuning (SFT, LoRA) and alignment training (DPO), ensuring optimal performance.

Usage Examples:

```bash
# Download model
huggingface-cli download baidu/ERNIE-4.5-VL-28B-A3B-Thinking --local-dir baidu/ERNIE-4.5-VL-28B-A3B-Thinking
# SFT
erniekit train examples/configs/ERNIE-4.5-VL-28B-A3B-Thinking/sft/run_sft_lora_8k.yaml
# SFT (Function Call)
erniekit train examples/configs/ERNIE-4.5-VL-28B-A3B-Thinking/sft_function_call/run_sft_8k.yaml
```

For more detailed examples, including SFT with LoRA, multi-GPU configurations, and advanced scripts, please refer to the examples folder within the [ERNIEKit](https://github.com/PaddlePaddle/ERNIE) repository.

## License

The ERNIE 4.5 models are provided under the Apache License 2.0. This license permits commercial use, subject to its terms and conditions. Copyright (c) 2025 Baidu, Inc. All Rights Reserved.

## Citation

If you find ERNIE 4.5 useful or wish to use it in your projects, please kindly cite our technical report:

```text
@misc{ernie2025technicalreport,
      title={ERNIE 4.5 Technical Report},
      author={Baidu-ERNIE-Team},
      year={2025},
      primaryClass={cs.CL},
      howpublished={\url{https://ernie.baidu.com/blog/publication/ERNIE_Technical_Report.pdf}}
}
```

---
license: apache-2.0
language:
- en
pipeline_tag: text-to-image
library_name: diffusers
---

<h1 align="center">⚡️- Image<br><sub><sup>An Efficient Image Generation Foundation Model with Single-Stream Diffusion Transformer</sup></sub></h1>

<div align="center">

[![Official Site](https://img.shields.io/badge/Official%20Site-333399.svg?logo=homepage)](https://tongyi-mai.github.io/Z-Image-blog/)&#160;
[![GitHub](https://img.shields.io/badge/GitHub-Z--Image-181717?logo=github&logoColor=white)](https://github.com/Tongyi-MAI/Z-Image)&#160;
[![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Checkpoint-Z--Image-yellow)](https://huggingface.co/Tongyi-MAI/Z-Image)&#160;
[![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Online_Demo-Z--Image-blue)](https://huggingface.co/spaces/Tongyi-MAI/Z-Image)&#160;
[![ModelScope Model](https://img.shields.io/badge/🤖%20Checkpoint-Z--Image-624aff)](https://www.modelscope.cn/models/Tongyi-MAI/Z-Image)&#160;
[![ModelScope Space](https://img.shields.io/badge/🤖%20Online_Demo-Z--Image-17c7a7)](https://www.modelscope.cn/aigc/imageGeneration?tab=advanced&versionId=569345&modelType=Checkpoint&sdVersion=Z_IMAGE&modelUrl=modelscope%3A%2F%2FTongyi-MAI%2FZ-Image%3Frevision%3Dmaster)&#160;
<a href="https://arxiv.org/abs/2511.22699" target="_blank"><img src="https://img.shields.io/badge/Report-b5212f.svg?logo=arxiv" height="21px"></a>

Welcome to the official repository for the Z-Image（造相）project!

</div>

## 🎨 Z-Image

![Teaser](teaser.jpg)
![asethetic](https://cdn-uploads.huggingface.co/production/uploads/64379d79fac5ea753f1c10f3/RftwBF4PzC0_L9GvETPZz.jpeg)
![diverse](https://cdn-uploads.huggingface.co/production/uploads/64379d79fac5ea753f1c10f3/HiFeAD2XUTmlxgdWHwhss.jpeg)
![negative](https://cdn-uploads.huggingface.co/production/uploads/64379d79fac5ea753f1c10f3/rECmhpZys1siGgEO8L6Fi.jpeg)

**Z-Image** is the foundation model of the ⚡️- Image family, engineered for good quality, robust generative diversity, broad stylistic coverage, and precise prompt adherence. 
While Z-Image-Turbo is built for speed, 
Z-Image is a full-capacity, undistilled transformer designed to be the backbone for creators, researchers, and developers who require the highest level of creative freedom.

![z-image](https://cdn-uploads.huggingface.co/production/uploads/64379d79fac5ea753f1c10f3/kt_A-s5vMQ6L-_sUjNUCG.jpeg)

### 🌟 Key Features

- **Undistilled Foundation**: As a non-distilled base model, Z-Image preserves the complete training signal. It supports full Classifier-Free Guidance (CFG), providing the precision required for complex prompt engineering and professional workflows.
- **Aesthetic Versatility**: Z-Image masters a vast spectrum of visual languages—from hyper-realistic photography and cinematic digital art to intricate anime and stylized illustrations. It is the ideal engine for scenarios requiring rich, multi-dimensional expression.
- **Enhanced Output Diversity**: Built for exploration, Z-Image delivers significantly higher variability in composition, facial identity, and lighting across different seeds, ensuring that multi-person scenes remain distinct and dynamic.
- **Built for Development**: The ideal starting point for the community. Its non-distilled nature makes it a good base for LoRA training, structural conditioning (ControlNet) and semantic conditioning.
- **Robust Negative Control**: Responds with high fidelity to negative prompting, allowing users to reliably suppress artifacts and adjust compositions.

### 🆚 Z-Image vs Z-Image-Turbo

| Aspect | Z-Image | Z-Image-Turbo |
|------|------|------|
| CFG | ✅ | ❌ |
| Steps | 28~50 | 8 |
| Fintunablity | ✅ | ❌ |
| Negative Prompting | ✅ | ❌ |
| Diversity | High | Low |
| Visual Quality | High | Very High |
| RL | ❌ | ✅ |

## 🚀 Quick Start

### Installation & Download

Install the latest version of diffusers:
```bash
pip install git+https://github.com/huggingface/diffusers
```

Download the model:
```bash
pip install -U huggingface_hub
HF_XET_HIGH_PERFORMANCE=1 hf download Tongyi-MAI/Z-Image
```

### Recommended Parameters

- **Resolution:** 512×512 to 2048×2048 (total pixel area, any aspect ratio)
- **Guidance scale:** 3.0 – 5.0
- **Inference steps:** 28 – 50

### Usage Example

```python
import torch
from diffusers import ZImagePipeline

# Load the pipeline
pipe = ZImagePipeline.from_pretrained(
    "Tongyi-MAI/Z-Image",
    torch_dtype=torch.bfloat16,
    low_cpu_mem_usage=False,
)
pipe.to("cuda")

# Generate image
prompt = "两名年轻亚裔女性紧密站在一起，背景为朴素的灰色纹理墙面，可能是室内地毯地面。左侧女性留着长卷发，身穿藏青色毛衣，左袖有奶油色褶皱装饰，内搭白色立领衬衫，下身白色裤子；佩戴小巧金色耳钉，双臂交叉于背后。右侧女性留直肩长发，身穿奶油色卫衣，胸前印有“Tun the tables”字样，下方为“New ideas”，搭配白色裤子；佩戴银色小环耳环，双臂交叉于胸前。两人均面带微笑直视镜头。照片，自然光照明，柔和阴影，以藏青、奶油白为主的中性色调，休闲时尚摄影，中等景深，面部和上半身对焦清晰，姿态放松，表情友好，室内环境，地毯地面，纯色背景。"
negative_prompt = "" # Optional, but would be powerful when you want to remove some unwanted content

image = pipe(
    prompt=prompt,
    negative_prompt=negative_prompt,
    height=1280,
    width=720,
    cfg_normalization=False,
    num_inference_steps=50,
    guidance_scale=4,
    generator=torch.Generator("cuda").manual_seed(42),
).images[0]

image.save("example.png")
```

## 📜 Citation

If you find our work useful in your research, please consider citing:

```bibtex
@article{team2025zimage,
  title={Z-Image: An Efficient Image Generation Foundation Model with Single-Stream Diffusion Transformer},
  author={Z-Image Team},
  journal={arXiv preprint arXiv:2511.22699},
  year={2025}
}
```
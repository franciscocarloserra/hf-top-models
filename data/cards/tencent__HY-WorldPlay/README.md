---
language:
- en
- zh
license: other
license_name: tencent-hy-worldplay-community
license_link: https://github.com/Tencent-Hunyuan/HY-WorldPlay/blob/main/License.txt
pipeline_tag: image-to-video
library_name: hy-worldplay
tags:
- hunyuan3d
- worldmodel
- 3d-reconstruction
- 3d-generation
- 3d
- scene-generation
- image-to-3D
- text-to-3D
---

This repository contains the **WorldPlay** model, a streaming video diffusion model, presented in the paper [WorldPlay: Towards Long-Term Geometric Consistency for Real-Time Interactive World Modeling](https://huggingface.co/papers/2512.14614).

<div align="center">
  <img src="https://github.com/Tencent-Hunyuan/HY-WorldPlay/raw/main/assets/teaser.webp">
<h1>🎮 HY-World 1.5: A Systematic Framework for Interactive World Modeling with Real-Time Latency and Geometric Consistency</h1>


</div>

<div align="center">
  <a href=https://3d.hunyuan.tencent.com/sceneTo3D?tab=worldplay target="_blank"><img src=https://img.shields.io/badge/Official%20Site-333399.svg?logo=homepage height=22px></a>
  <a href=https://huggingface.co/tencent/HY-WorldPlay target="_blank"><img src=https://img.shields.io/badge/%F0%9F%A4%97%20Models-d96902.svg height=22px></a>
  <a href="https://github.com/Tencent-Hunyuan/HY-WorldPlay/" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717.svg?logo=github&logoColor=white" height="22px"></a>
  <a href="https://3d-models.hunyuan.tencent.com/world/" target="_blank"><img src=https://img.shields.io/badge/Project%20Page-bb8a2e.svg?logo=googlechrome&logoColor=white height=22px></a>
  <a href=https://huggingface.co/papers/2512.14614 target="_blank"><img src=https://img.shields.io/badge/Paper-b5212f.svg?logo=huggingface height=22px></a>
  <a href=https://discord.gg/dNBrdrGGMa target="_blank"><img src= https://img.shields.io/badge/Discord-white.svg?logo=discord height=22px></a>
  <a href=https://x.com/TencentHunyuan target="_blank"><img src=https://img.shields.io/badge/Tencent%20HY-black.svg?logo=x height=22px></a>
 <a href="#community-resources" target="_blank"><img src=https://img.shields.io/badge/Community-lavender.svg?logo=homeassistantcommunitystore height=22px></a>
</div>


[//]: # (  <a href=# target="_blank"><img src=https://img.shields.io/badge/Report-b5212f.svg?logo=arxiv height=22px></a>)

[//]: # (  <a href=# target="_blank"><img src= https://img.shields.io/badge/Colab-8f2628.svg?logo=googlecolab height=22px></a>)

[//]: # (  <a href="#"><img alt="PyPI - Downloads" src="https://img.shields.io/pypi/v/mulankit?logo=pypi"  height=22px></a>)

<br>


## 📖 Introduction
While **HY-World 1.0** is capable of generating immersive 3D worlds, it relies on a lengthy offline generation process and lacks real-time interaction. **HY-World 1.5** bridges this gap with **WorldPlay**, a streaming video diffusion model that enables real-time, interactive world modeling with long-term geometric consistency, resolving the trade-off between speed and memory that limits current methods. Our model draws power from four key designs. 1) We use a Dual Action Representation to enable robust action control in response to the user's keyboard and mouse inputs. 2) To enforce long-term consistency, our Reconstituted Context Memory dynamically rebuilds context from past frames and uses temporal reframing to keep geometrically important but long-past frames accessible, effectively alleviating memory attenuation. 3) We design WorldCompass, a novel Reinforcement Learning (RL) post-training framework designed to directly improve the action-following and visual quality of the long-horizon, autoregressive video model. 4) We also propose Context Forcing, a novel distillation method designed for memory-aware models. Aligning memory context between the teacher and student preserves the student's capacity to use long-range information, enabling real-time speeds while preventing error drift. Taken together, HY-World 1.5 generates long-horizon streaming video at 24 FPS with superior consistency, comparing favorably with existing techniques. Our model shows strong generalization across diverse scenes, supporting first-person and third-person perspectives in both real-world and stylized environments, enabling versatile applications such as 3D reconstruction, promptable events, and infinite world extension. 


- **Systematic Overview**
  
  HY-World 1.5 has open-sourced a systematic and comprehensive training framework for real-time world models, covering the entire pipeline and all stages, including data, training, and inference deployment. The technical report discloses detailed training specifics for model pre-training, middle-training, reinforcement learning post-training, and memory-aware model distillation. In addition, the report introduces a series of engineering techniques aimed at reducing network transmission latency and model inference latency, thereby achieving a real-time streaming inference experience for users.

<p align="center">
  <img src="https://github.com/Tencent-Hunyuan/HY-WorldPlay/raw/main/assets/overview.png">
</p>

- **Inference Pipeline**
  
  Given a single image or text prompt to describe a world, our model performs a next chunk (16 video frames) prediction task to generate future videos conditioned on action from users. For the generation of each chunk, we dynamically reconstitute context memory from past chunks to enforce long-term temporal and geometric consistency.

<p align="center">
  <img src="https://github.com/Tencent-Hunyuan/HY-WorldPlay/raw/main/assets/pipeline.png">
</p>

## 🔑 Sample Usage
We open source the inference code for both bidirectional and autoregressive diffusion models. For prompt rewriting, we recommend using Gemini or models deployed via vLLM. This codebase currently only supports models compatible with the vLLM API. If you wish to use Gemini, you will need to implement your own interface calls. The details can be found in [HunyuanVideo-1.5](https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5). 

We recommend using `generate_custom_trajectory.py` for generating customized camera trajectory.

```bash
export T2V_REWRITE_BASE_URL="<your_vllm_server_base_url>"
export T2V_REWRITE_MODEL_NAME="<your_model_name>"
export I2V_REWRITE_BASE_URL="<your_vllm_server_base_url>"
export I2V_REWRITE_MODEL_NAME="<your_model_name>"

PROMPT='A paved pathway leads towards a stone arch bridge spanning a calm body of water.  Lush green trees and foliage line the path and the far bank of the water. A traditional-style pavilion with a tiered, reddish-brown roof sits on the far shore. The water reflects the surrounding greenery and the sky.  The scene is bathed in soft, natural light, creating a tranquil and serene atmosphere. The pathway is composed of large, rectangular stones, and the bridge is constructed of light gray stone.  The overall composition emphasizes the peaceful and harmonious nature of the landscape.'

IMAGE_PATH=./assets/img/test.png # Now we only provide the i2v model, so the path cannot be None
SEED=1
ASPECT_RATIO=16:9
RESOLUTION=480p                  # Now we only provide the 480p model
OUTPUT_PATH=./outputs/
MODEL_PATH=                      # Path to pretrained hunyuanvideo-1.5 model
AR_ACTION_MODEL_PATH=            # Path to our HY-World 1.5 autoregressive checkpoints
BI_ACTION_MODEL_PATH=            # Path to our HY-World 1.5 bidirectional checkpoints
AR_DISTILL_ACTION_MODEL_PATH=    # Path to our HY-World 1.5 autoregressive distilled checkpoints
POSE_JSON_PATH=./assets/pose/test_forward_32_latents.json   # Path to the customized camera trajectory
NUM_FRAMES=125

# Configuration for faster inference
# For AR inference, the maximum number recommended is 4. For bidirectional models, it can be set to 8.
N_INFERENCE_GPU=4 # Parallel inference GPU count.

# Configuration for better quality
REWRITE=false # Enable prompt rewriting. Please ensure rewrite vLLM server is deployed and configured.
ENABLE_SR=false # Enable super resolution. When the NUM_FRAMES == 121, you can set it to true

# inference with bidirectional model
torchrun --nproc_per_node=$N_INFERENCE_GPU generate.py  \
  --prompt "$PROMPT" \
  --image_path $IMAGE_PATH \
  --resolution $RESOLUTION \
  --aspect_ratio $ASPECT_RATIO \
  --video_length $NUM_FRAMES \
  --seed $SEED \
  --rewrite $REWRITE \
  --sr $ENABLE_SR --save_pre_sr_video \
  --pose_json_path $POSE_JSON_PATH \
  --output_path $OUTPUT_PATH \
  --model_path $MODEL_PATH \
  --action_ckpt $BI_ACTION_MODEL_PATH \
  --few_step false \
  --model_type 'bi'

# inference with autoregressive model
#torchrun --nproc_per_node=$N_INFERENCE_GPU generate.py  \
#  --prompt "$PROMPT" \
#  --image_path $IMAGE_PATH \
#  --resolution $RESOLUTION \
#  --aspect_ratio $ASPECT_RATIO \
#  --video_length $NUM_FRAMES \
#  --seed $SEED \
#  --rewrite $REWRITE \
#  --sr $ENABLE_SR --save_pre_sr_video \
#  --pose_json_path $POSE_JSON_PATH \
#  --output_path $OUTPUT_PATH \
#  --model_path $MODEL_PATH \
#  --action_ckpt $AR_ACTION_MODEL_PATH \
#  --few_step false \
#  --model_type 'ar'

# inference with autoregressive distilled model
#torchrun --nproc_per_node=$N_INFERENCE_GPU generate.py  \
#  --prompt "$PROMPT" \
#  --image_path $IMAGE_PATH \
#  --resolution $RESOLUTION \
#  --aspect_ratio $ASPECT_RATIO \
#  --video_length $NUM_FRAMES \
#  --seed $SEED \
#  --rewrite $REWRITE \
#  --sr $ENABLE_SR --save_pre_sr_video \
#  --pose_json_path $POSE_JSON_PATH \
#  --output_path $OUTPUT_PATH \
#  --model_path $MODEL_PATH \
#  --action_ckpt $AR_DISTILL_ACTION_MODEL_PATH \
#  --few_step true \
#  --num_inference_steps 4 \
#  --model_type 'ar'
```

## 📊 Evaluation

HY-World 1.5 surpasses existing methods across various quantitative metrics, including reconstruction metrics for different video lengths and human evaluations.

| Model                      | Real-time |  | | Short-term | | |  | | Long-term | | |
|:---------------------------| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|                            | | **PSNR** ⬆ | **SSIM** ⬆ | **LPIPS** ⬇ | **$R_{dist}$** ⬇ | **$T_{dist}$** ⬇ | **PSNR** ⬆ | **SSIM** ⬆ | **LPIPS** ⬇ | **$R_{dist}$** ⬇ | **$T_{dist}$** ⬇ |
| CameraCtrl                 | ❌ | 17.93 | 0.569 | 0.298 | 0.037 | 0.341 | 10.09 | 0.241 | 0.549 | 0.733 | 1.117 |
| SEVA                       | ❌ | 19.84 | 0.598 | 0.313 | 0.047 | 0.223 | 10.51 | 0.301 | 0.517 | 0.721 | 1.893 |
| ViewCrafter                | ❌ | 19.91 | 0.617 | 0.327 | 0.029 | 0.543 | 9.32 | 0.271 | 0.661 | 1.573 | 3.051 |
| Gen3C                      | ❌ | 21.68 | 0.635 | 0.278 | **0.024** | 0.477 | 15.37 | 0.431 | 0.483 | 0.357 | 0.979 |
| VMem                       | ❌ | 19.97 | 0.587 | 0.316 | 0.048 | 0.219 | 12.77 | 0.335 | 0.542 | 0.748 | 1.547 |
| Matrix-Game-2.0            | ✅ | 17.26 | 0.505 | 0.383 | 0.287 | 0.843 | 9.57 | 0.205 | 0.631 | 2.125 | 2.742 |
| GameCraft                  | ❌ | 21.05 | 0.639 | 0.341 | 0.151 | 0.617 | 10.09 | 0.287 | 0.614 | 2.497 | 3.291 |
| Ours (w/o Context Forcing) | ❌ | 21.27 | 0.669 | 0.261 | 0.033 | 0.157 | 16.27 | 0.425 | 0.495 | 0.611 | 0.991 |
| **Ours (full)**            | ✅ | **21.92** | **0.702** | **0.247** | 0.031 | **0.121** | **18.94** | **0.585** | **0.371** | **0.332** | **0.797** |

<p align="center">
  <img src="https://github.com/Tencent-Hunyuan/HY-WorldPlay/raw/main/assets/human_eval.png">
</p>

## 🎬 More Examples

https://github.com/user-attachments/assets/6aac8ad7-3c64-4342-887f-53b7100452ed

https://github.com/user-attachments/assets/531bf0ad-1fca-4d76-bb65-84701368926d

https://github.com/user-attachments/assets/f165f409-5a74-4e19-a32c-fc98d92259e1

## 📚 Citation

```bibtex
@article{hyworld2025,
  title={HY-World 1.5: A Systematic Framework for Interactive World Modeling with Real-Time Latency and Geometric Consistency},
  author={Team HunyuanWorld},
  journal={arXiv preprint},
  year={2025}
}

@article{worldplay2025,
    title={WorldPlay: Towards Long-Term Geometric Consistency for Real-Time Interactive World Model},
    author={Wenqiang Sun and Haiyu Zhang and Haoyuan Wang and Junta Wu and Zehan Wang and Zhenwei Wang and Yunhong Wang and Jun Zhang and Tengfei Wang and Chunchao Guo},
    year={2025},
    journal={arXiv preprint}
}

@inproceedings{wang2025compass,
  title={WorldCompass: Reinforcement Learning for Long-Horizon World Models},
  author={Zehan Wang and Tengfei Wang and Haiyu Zhang and Wenqiang Sun and Junta Wu and Haoyuan Wang and Zhenwei Wang and Hengshuang Zhao and Chunchao Guo and Zhou Zhao},
  journal = {arXiv preprint},
  year = 2025
}
```


## 🙏 Acknowledgements
We would like to thank [HunyuanWorld](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0), [HunyuanWorld-Mirror
](https://github.com/Tencent-Hunyuan/HunyuanWorld-Mirror), [HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5), and [FastVideo](https://github.com/hao-ai-lab/FastVideo) for their great work.
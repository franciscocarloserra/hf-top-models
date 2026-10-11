---
license: apache-2.0
language:
- en
- zh
pipeline_tag: image-to-video
tags:
- video-generation
- text-to-video
- image-to-video
- video-to-video
- reference-to-video
- minimax-h3
- comfyui
- fine-tuned
- hdr
- singularity
base_model:
- MiniMaxAI/MiniMax-H3
---

# Minimax-h3_Singularity

<p align="center">
  <a href="https://www.runninghub.ai/post/2096339589492432897/?inviteCode=rh-v1559">
    <img src="https://img.shields.io/badge/🚀_Online_Demo-RunningHub-blue.svg" alt="Online Demo">
  </a>
  <a href="https://youtube.com/@AIGC-Singularity">
    <img src="https://img.shields.io/badge/YouTube-AIGC--Singularity-red.svg" alt="YouTube">
  </a>
  <a href="https://space.bilibili.com">
    <img src="https://img.shields.io/badge/Bilibili-AIGC--Singularity_Space-00a1d6.svg" alt="Bilibili">
  </a>
</p>

## 📖 Model Overview

**Minimax-h3_Singularity** is a comprehensive fine-tuned fusion model specialized in enhancing the capabilities of **MiniMax-H3**. Designed as a versatile **multimodal video generation model**, it natively supports **Text-to-Video (T2V)**, **Image-to-Video (I2V)**, **Reference-to-Video (Ref2V)**, and **Video-to-Video (V2V)** workflows within **ComfyUI**.

Built upon a strategic fusion of key checkpoints (including `ref`, `fl`, `b25-49`, etc.), this model underwent deep high-step fine-tuning. To preserve the original model's foundational strengths and broad generalization while solving artifacts introduced by high-step training, we spent **3 full days on precise model pruning and weight optimization**. The result is a clean, sharp, and highly dynamic video generation model.

---

## ✨ Key Improvements & Features

* 🎬 **HDR Image Quality & Blur Reduction**: Fine-tuned on high-dynamic-range (HDR) video datasets to significantly enhance visual clarity and eliminate motion blur during high-speed action.
* 👤 **Distant Face Restoration**: Drastically reduces facial distortion, blurriness, and collapsing in medium-to-long shots.
* 🎨 **Clean & De-Oiled Aesthetic**: Removes heavy, unnatural skin shine and glossy textures, rendering natural lighting and photorealistic materials.
* ⚔️ **Enhanced Dynamic Motion**: Boosts motion fluidity and physical impact, excels in complex action sequences such as **sword fighting and martial arts/melee combat**.
* 🌌 **VFX & Fantasy Effects**: Specifically optimized for fantasy spellcasting, particle aura, and magical combat visual effects.
* 🎭 **Expressive Facial Dynamics**: Captures subtle facial expressions and emotional nuances more vividly.
* 📹 **Cinematography & Camera Control**: Strengthens responsiveness to camera movements (pan, tilt, zoom, tracking shots) for cinematic storytelling.
* 🛡️ **Full Base Capability Retention**: 100% preserves MiniMax-H3's original prompt adherence, style adaptability, and base multimodal generation strength.

---

## 🎬 Showcase

<video src="https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity/resolve/main/video/1.mp4" controls autoplay loop muted width="20%"></video>
<video src="https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity/resolve/main/video/3.mp4" controls autoplay loop muted width="20%"></video>
<video src="https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity/resolve/main/video/AIGCTYD2_00001_p84-audio_ganvc_1788634594%20(1).mp4" controls autoplay loop muted width="20%"></video>
<video src="https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity/resolve/main/video/AIGCTYD2_00010_p87-audio_alipa_1788652671.mp4" controls autoplay loop muted width="20%"></video>

---

## 💡 Usage Guide

### Multimodal Pipeline Support
This model is fully compatible with **ComfyUI** and supports:
* **Text-to-Video (T2V)**
* **Image-to-Video (I2V)**
* **Reference-to-Video (Ref2V)**
* **Video-to-Video (V2V)**

### 🚀 Recommended Acceleration LoRA
For high-speed generation with minimal quality loss, we strongly recommend pairing with:
* **`minimax_h3_ref2v_turbo_4step_v0.1`** (Enables 4-step fast inference)

### 🌐 Online Interactive Demo
Test the model directly in your browser without local GPU setup:
👉 [**Try it on RunningHub Workflows**](https://www.runninghub.ai/post/2096339589492432897/?inviteCode=rh-v1559)

---

## 🙏 Acknowledgements

Special thanks to the **MiniMax** open-source team for creating and releasing the powerful `MiniMax-H3` multimodal video model, providing a solid foundation for the open-source community! 🤝

---

## 🤝 Community & Commercial Inquiries

Feel free to connect for tutorials, community discussions, workflow sharing, or commercial collaborations:

* **YouTube Channel**: [AIGC-Singularity](https://youtube.com/@AIGC-Singularity)
* **Bilibili Channel**: AIGC-Singularity Space
* **QQ Group 1**: `1058747239` (Request to join)
* **QQ Group 2**: `1072010342` (Request to join)
* **Business Inquiries (WeChat)**: `aigctyd`
* **Email**: `a592991299@gmail.com`
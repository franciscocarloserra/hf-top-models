---
base_model:
  - Lightricks/LTX-2.3
license: other
license_name: ltx-2-community-license-agreement
license_link: https://github.com/Lightricks/LTX-2/blob/main/LICENSE
tags:
- comfyui
- diffusion-single-file
---

Separated LTX2.3 checkpoint for alternative way to load the models in Comfy


![image](https://cdn-uploads.huggingface.co/production/uploads/63297908f0b2fc94904a65b8/KnDASZbjsLio38bS9XdVQ.png)


The fp8 quantizations were done with the basic static weight scales and are set to not run with fp8 matmuls, the models marked `input_scaled` additionally have activation scaling, and are set to run with fp8 matmuls on supported hardware (roughly 40xx and later Nvidia GPUs).

As this is first time I'm attempting to do calibrate input scales, these are pretty experimental, but result wise seems to work, this is a test on a 4090, 8 steps with distill:

<video controls autoplay width=50% src=https://cdn-uploads.huggingface.co/production/uploads/63297908f0b2fc94904a65b8/ALNr3_j0klp29fHkI3pyt.mp4></video>

**update:** input_scaled_v3 follows the same pattern as the official one where blocks 0-1 and 46-47 (first two and last two) are kept in bf16, as well as better calibrated input scales, this does fix some of the issues in v2, especially when using input audio.

---

Tiny VAE by [madebyollin](https://github.com/madebyollin/taehv/)

Can be used like this currently:

![image](https://cdn-uploads.huggingface.co/production/uploads/63297908f0b2fc94904a65b8/E032h6eXmjaUdzvEsHU_b.png)


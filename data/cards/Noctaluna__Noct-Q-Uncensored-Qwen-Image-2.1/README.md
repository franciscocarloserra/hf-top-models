---
license: "other"
license_name: "qwen-research"
license_link: "https://huggingface.co/Noctaluna/Noct-Q-Uncensored-Qwen-Image-2.1/blob/main/LICENSE"
base_model: "Qwen/Qwen-Image-2.1"
base_model_relation: "merge"
library_name: "diffusion-single-file"
pipeline_tag: "text-to-image"
tags:
  - "text-to-image"
  - "qwen-image"
  - "comfyui"
  - "int8"
  - "photorealistic"
  - "uncensored"
  - "nsfw"
  - "not-for-all-audiences"
---

# Noct Q: Qwen Image 2.1 Uncensored Realism

Qwen Image 2.1, uncensored: nudes and explicit scenes render without a LoRA. Built with Qwen.

**The full gallery with prompts, the int4, fp8, bf16 and fp16 files and the reviews are on Civitai: [Noct Q](https://civitai.com/models/2958896).**

## What it does well

- Full-body nudes in daylight, flash and night scenes
- Explicit scenes with a partner: V4 renders them as asked three times as often as V3
- Readable text on signs and labels
- Anime and painted illustration
- Plain-caption prompts: who, what she does, where, the light
- Image editing with the same files, in ComfyUI's Qwen Image 2.1 edit template

## Files

| file | size | use |
|---|---|---|
| `NoctQ_V4_int8_convrot.safetensors` | 7.3 GB | V4: 8 to 12 GB cards, ComfyUI 0.37 or newer, core nodes only |
| `NoctQ_V3_base_int8_convrot.safetensors` | 7.3 GB | V3, the previous version |
| `NoctQ_V4_workflow.json` | | drag it into ComfyUI |

The model goes in `models/diffusion_models`.

## Settings

25 steps, euler, simple, cfg 3 with the negative prompt, all set in the workflow. cfg 1 runs about twice as fast and then ignores the negative prompt. 1024x1536 portrait works well.

- Text encoder: [`qwen3vl_8b_int8_convrot.safetensors`](https://huggingface.co/Comfy-Org/Qwen-Image-2.1/blob/main/text_encoders/qwen3vl_8b_int8_convrot.safetensors) in `models/text_encoders`
- VAE: [`qwen_image_2.1_vae_bf16.safetensors`](https://huggingface.co/Comfy-Org/Qwen-Image-2.1/blob/main/vae/qwen_image_2.1_vae_bf16.safetensors) in `models/vae`

## How to prompt

Write full sentences, like a caption of the finished photo: the kind of shot, then the person with an adult age ("a woman in her twenties"), what she does, where, the light and the framing. Qwen Image 2.1 reads prose, not tag lists. No trigger word.

## License

Built with Qwen. Qwen is licensed under the Qwen RESEARCH LICENSE AGREEMENT, Copyright (c) 2026 Hangzhou Tongyi Laboratory Technology Co., Ltd. All Rights Reserved. Noct Q is a derivative work of Qwen/Qwen-Image-2.1 with modified transformer weights (see `NOTICE`), free for non-commercial use only under the Qwen Research License Agreement (`LICENSE`).

中文：基于 Qwen Image 2.1，开箱即可生成裸体与成人场景，无需 LoRA。推荐 25 步、cfg 3，使用工作流中的负面提示词。8–12G 显存用 int8 convrot。仅限非商业用途。

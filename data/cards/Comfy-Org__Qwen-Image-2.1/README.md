---
license: other
license_name: qwen-research
license_link: https://huggingface.co/Qwen/Qwen-Image-2.1/blob/main/LICENSE
tags:
- comfyui
- diffusion-single-file
base_model:
- Qwen/Qwen-Image-2.1
---

# Qwen-Image 2.1

Repackaged model files for ComfyUI.

Original model repositories: 

https://huggingface.co/Qwen/Qwen-Image-2.1

https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo

---
## Prompt enhancer

The qwen3.5_9b_qwen_image_2.1_pe -models are for prompt enhancement, to be used with the TextGenerate -node.

Original model repositories:

https://huggingface.co/Qwen/Qwen-Image-2.1-PE-T2I

https://huggingface.co/Qwen/Qwen-Image-2.1-PE-I2I

## Turbo

Uses 8 steps. You can either use the full turbo model, or the LoRA extraction with the base model.

---
Place the files in the following folders:

```
📂 ComfyUI/
└── 📂 models/
    ├── 📂 diffusion_models/
    │   ├── qwen_image_2.1_bf16.safetensors
    │   ├── qwen_image_2.1_int8_convrot.safetensors
    │   ├── qwen_image_2.1_turbo_bf16.safetensors
    │   └── qwen_image_2.1_turbo_int8_convrot.safetensors
    ├── 📂 model_patches/
    │   ├── qwen_image_2.1_fun_controlnet_union_bf16.safetensors
    │   └── qwen_image_2.1_fun_controlnet_union_int8_convrot.safetensors
    ├── 📂 text_encoders/
    │   ├── qwen3vl_8b_bf16.safetensors
    │   ├── qwen3vl_8b_int8_convrot.safetensors
    │   ├── qwen3vl_8b_w4a8.safetensors
    │   ├── qwen3.5_9b_qwen_image_2.1_pe_i2i.int8_convrot.safetensors
    │   ├── qwen3.5_9b_qwen_image_2.1_pe_i2i_w4a8.safetensors
    │   ├── qwen3.5_9b_qwen_image_2.1_pe_t2i.int8_convrot.safetensors
    │   └── qwen3.5_9b_qwen_image_2.1_pe_t2i_w4a8.safetensors
    └── 📂 vae/
        └── qwen_image_2.1_vae_bf16.safetensors
    └── 📂 loras/
        └── qwen_image_2.1_turbo_lora_avg_rank_178_bf16.safetensors
```

## Workflows

<table>
<thead>
<tr><th align="center" valign="middle" style="text-align:center;vertical-align:middle">Workflow</th><th colspan="2" align="center" valign="middle" style="text-align:center;vertical-align:middle">Thumb</th></tr>
</thead>
<tbody>
<tr><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_qwen_image_2_1_image_edit.json">Qwen Image 2.1: Image Edit</a></td><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_qwen_image_2_1_image_edit.json"><img src="https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_qwen_image_2_1_image_edit-2.webp" width="200" height="200" alt="Qwen Image 2.1: Image Edit"></a><div align="center">Before</div></td><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_qwen_image_2_1_image_edit.json"><img src="https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_qwen_image_2_1_image_edit-1.webp" width="200" height="200" alt="Qwen Image 2.1: Image Edit"></a><div align="center">After</div></td></tr>
<tr><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_qwen_image_2_1_t2i.json">Qwen Image 2.1: Text to Image</a></td><td colspan="2" align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_qwen_image_2_1_t2i.json"><img src="https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_qwen_image_2_1_t2i-1.webp" width="200" height="200" alt="Qwen Image 2.1: Text to Image"></a></td></tr>
<tr><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_qwen_image_2_1_background_removal.json">Remove Background: Qwen Image 2.1</a></td><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_qwen_image_2_1_background_removal.json"><img src="https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_qwen_image_2_1_background_removal-2.webp" width="200" height="200" alt="Remove Background: Qwen Image 2.1"></a><div align="center">Before</div></td><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_qwen_image_2_1_background_removal.json"><img src="https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_qwen_image_2_1_background_removal-1.webp" width="200" height="200" alt="Remove Background: Qwen Image 2.1"></a><div align="center">After</div></td></tr>
</tbody>
</table>

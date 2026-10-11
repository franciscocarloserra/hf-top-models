---
license: other
license_name: krea-2-community-license
license_link: https://huggingface.co/krea/Krea-2-Turbo/blob/main/LICENSE.pdf
tags:
- comfyui
- diffusion-single-file
base_model:
- krea/Krea-2-Raw
- krea/Krea-2-Turbo
---

# Krea 2 Open-Source

Repackaged model files for ComfyUI.

Original model repository:

- https://huggingface.co/krea/Krea-2-Raw
- https://huggingface.co/krea/Krea-2-Turbo

Original LoRA repositories:

- https://huggingface.co/krea/Krea-2-LoRA-darkbrush
- https://huggingface.co/krea/Krea-2-LoRA-dotmatrix
- https://huggingface.co/krea/Krea-2-LoRA-kidsdrawing
- https://huggingface.co/krea/Krea-2-LoRA-neondrip
- https://huggingface.co/krea/Krea-2-LoRA-rainywindow
- https://huggingface.co/krea/Krea-2-LoRA-retroanime
- https://huggingface.co/krea/Krea-2-LoRA-softwatercolor
- https://huggingface.co/krea/Krea-2-LoRA-sunsetblur
- https://huggingface.co/krea/Krea-2-LoRA-vintagetarot
- https://huggingface.co/ostris/krea2_turbo_style_reference

Place the files in the following folders:

```
📂 ComfyUI/
├── 📂 models/
│   ├── 📂 diffusion_models/
│   │   ├── krea2_raw_bf16.safetensors
│   │   ├── krea2_raw_fp8_scaled.safetensors
│   │   ├── krea2_raw_int8_convrot.safetensors
│   │   ├── krea2_turbo_bf16.safetensors
│   │   ├── krea2_turbo_fp8_scaled.safetensors
│   │   ├── krea2_turbo_int8_convrot.safetensors
│   │   ├── krea2_turbo_mxfp8.safetensors
│   │   └── krea2_turbo_nvfp4.safetensors
│   ├── 📂 loras/
│   │   ├── krea2_darkbrush.safetensors
│   │   ├── krea2_dotmatrix.safetensors
│   │   ├── krea2_kidsdrawing.safetensors
│   │   ├── krea2_style_reference.safetensors
│   │   ├── krea2_neondrip.safetensors
│   │   ├── krea2_rainywindow.safetensors
│   │   ├── krea2_retroanime.safetensors
│   │   ├── krea2_softwatercolor.safetensors
│   │   ├── krea2_sunsetblur.safetensors
│   │   ├── krea2_turbo_lora_rank_64_bf16.safetensors
│   │   └── krea2_vintagetarot.safetensors
│   ├── 📂 text_encoders/
│   │   ├── qwen3vl_4b_bf16.safetensors
│   │   └── qwen3vl_4b_fp8_scaled.safetensors
│   ├── 📂 vae/
│   │   └── qwen_image_vae.safetensors
```

Trigger Words for each LoRA:

| LoRA                   | Trigger Words                        | Recommended Strength |
|------------------------|--------------------------------------|-------|
| `krea2_darkbrush`      | `monochrome ink wash style`          | `1.0` |
| `krea2_dotmatrix`      | `monochrome stippling style`         | `1.0` |
| `krea2_kidsdrawing`    | `naive expressive sketch style`      | `1.0` |
| `krea2_neondrip`       | `textured abstract style`            | `1.0` |
| `krea2_rainywindow`    | `rainy window style`                 | `1.0` |
| `krea2_retroanime`     | `purple retro anime style`           | `1.0` |
| `krea2_softwatercolor` | `art deco watercolor style`          | `1.0` |
| `krea2_sunsetblur`     | `ethereal motion blur style`         | `1.0` |
| `krea2_vintagetarot`   | `vintage tarot style`                | `1.0` |

## Workflows

<table>
<thead>
<tr><th align="center" valign="middle" style="text-align:center;vertical-align:middle">Workflow</th><th colspan="2" align="center" valign="middle" style="text-align:center;vertical-align:middle">Thumb</th></tr>
</thead>
<tbody>
<tr><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_krea2_turbo_t2i.json">Krea-2: Text to Image</a></td><td colspan="2" align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_krea2_turbo_t2i.json"><img src="https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_krea2_turbo_t2i-1.webp" width="200" height="200" alt="Krea-2: Text to Image"></a></td></tr>
<tr><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_krea2_turbo_int8_image_style_reference.json">Krea-2 Int8: Image Style Reference</a></td><td colspan="2" align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_krea2_turbo_int8_image_style_reference.json"><img src="https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_krea2_turbo_int8_image_style_reference-1.webp" width="200" height="200" alt="Krea-2 Int8: Image Style Reference"></a></td></tr>
<tr><td align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_krea2_turbo_t2i_int8.json">Krea-2 Int8: Text to Image</a></td><td colspan="2" align="center" valign="middle" style="text-align:center;vertical-align:middle"><a href="https://github.com/Comfy-Org/workflow_templates/blob/main/templates/image_krea2_turbo_t2i_int8.json"><img src="https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_krea2_turbo_t2i_int8-1.webp" width="200" height="200" alt="Krea-2 Int8: Text to Image"></a></td></tr>
</tbody>
</table>

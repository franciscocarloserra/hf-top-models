---
license: mit
base_model:
- Qwen/Qwen-Image-2.1
- Qwen/Qwen-Image-Edit-2511
- black-forest-labs/FLUX.2-klein-9B
- black-forest-labs/FLUX.2-klein-4B
- black-forest-labs/FLUX.2-klein-base-4B
- black-forest-labs/FLUX.2-klein-base-9B
- black-forest-labs/FLUX.2-klein-9b-fp8
- black-forest-labs/FLUX.2-klein-4b-fp8
- krea/Krea-2-Raw
pipeline_tag: image-to-image
tags:
- lora
- qwen-image
- qwen-image-2.1
- qwen-image-edit
- face-swap
- head-swap
- body-swap
- image-editing
- comfyui
- bfs
language:
- en
library_name: diffusers
---

# BFS: Best Face Swap

BFS is a collection of LoRAs for face, head, and body replacement across Qwen Image 2.1, Qwen
Image Edit 2509/2511, Flux 2 Klein, Krea 2, and experimental LTX-2 workflows. Each release has
its own base-model, input-order, prompt, and workflow contract. Use the guide for the exact
version you are loading.

## Guides

- [BFS Head V1 / V1.1 for Qwen Image 2.1](docs/qwen-image-2.1.md)
- [BFS Body Swap V1.0 for Qwen Image 2.1](docs/qwen-image-2.1-body.md)
- [Qwen Image Edit 2509/2511](docs/qwen-image-edit.md)
- [Flux 2 Klein](docs/flux-2-klein.md)
- [Krea 2](docs/krea-2.md)
- [Experimental LTX-2 weights](docs/ltx-2.md)

## Downloads at a glance

| Family | Weights | Workflow |
|---|---|---|
| Qwen Image 2.1 (head) | [`bfs_head_v1.1_qwen_2.1.safetensors`](bfs_head_v1.1_qwen_2.1.safetensors) (recommended), [`bfs_head_v1.1_alternative_qwen_2.1.safetensors`](bfs_head_v1.1_alternative_qwen_2.1.safetensors), [`bfs_head_v1_qwen_2.1.safetensors`](bfs_head_v1_qwen_2.1.safetensors) |
| Qwen Image 2.1 (body) | [`bfs_body_swap_v1.0_qwen_2.1.safetensors`](bfs_body_swap_v1.0_qwen_2.1.safetensors) | See the [body swap guide](docs/qwen-image-2.1-body.md) | [`Head Swap V1 Qwen 2.1 Workflow.json`](workflows/Head%20Swap%20V1%20Qwen%202.1%20Workflow.json) |
| Qwen Image Edit 2509 | [`bfs_face_v1_qwen_image_edit_2509.safetensors`](bfs_face_v1_qwen_image_edit_2509.safetensors), [`bfs_head_v1_qwen_image_edit_2509.safetensors`](bfs_head_v1_qwen_image_edit_2509.safetensors), [`bfs_head_v2_qwen_image_edit_2509.safetensors`](bfs_head_v2_qwen_image_edit_2509.safetensors), [`bfs_head_v3_qwen_image_edit_2509.safetensors`](bfs_head_v3_qwen_image_edit_2509.safetensors), [`bfs_head_v4_qwen_image_edit_2509.safetensors`](bfs_head_v4_qwen_image_edit_2509.safetensors) | See the [Qwen Edit guide](docs/qwen-image-edit.md) |
| Qwen Image Edit 2511 | [`bfs_head_v5_2511_original.safetensors`](bfs_head_v5_2511_original.safetensors), [`bfs_head_v5_2511_merged_version_rank_16_fp16.safetensors`](bfs_head_v5_2511_merged_version_rank_16_fp16.safetensors), [`bfs_head_v5_2511_merged_version_rank_32_fp32.safetensors`](bfs_head_v5_2511_merged_version_rank_32_fp32.safetensors) | See the [Qwen Edit guide](docs/qwen-image-edit.md) |
| Flux 2 Klein | [`bfs_head_v1_flux-klein_4b.safetensors`](bfs_head_v1_flux-klein_4b.safetensors), [`bfs_head_v1_flux-klein_9b_step3500_rank128.safetensors`](bfs_head_v1_flux-klein_9b_step3500_rank128.safetensors), [`bfs_head_v1_flux-klein_9b_step3750_rank64.safetensors`](bfs_head_v1_flux-klein_9b_step3750_rank64.safetensors), [`bfs_head_v1.1_optional_flux-klein_4b.safetensors`](bfs_head_v1.1_optional_flux-klein_4b.safetensors) | See the [Flux guide](docs/flux-2-klein.md) |
| Krea 2 | [`bfs_head_swap_v1.1_krea2.safetensors`](bfs_head_swap_v1.1_krea2.safetensors), [`bfs_body_swap_v1_krea2.safetensors`](bfs_body_swap_v1_krea2.safetensors) | See the [Krea 2 guide](docs/krea-2.md) |
| Experimental LTX-2 | [`bfs_head_swap_v1_ltx2_ic_lora_5000.safetensors`](bfs_head_swap_v1_ltx2_ic_lora_5000.safetensors), [`bfs_head_swap_v1_ltx2_ic_lora_6000.safetensors`](bfs_head_swap_v1_ltx2_ic_lora_6000.safetensors), [`bfs_head_swap_v1_ltx2_ic_lora_12000_train_3.safetensors`](bfs_head_swap_v1_ltx2_ic_lora_12000_train_3.safetensors) | See the [LTX-2 guide](docs/ltx-2.md) |

## General rules

- Use the LoRA with its matching base model whenever possible.
- Follow the input order in the version guide; several BFS head releases intentionally use body
  first and reference face second.
- Start at LoRA strength `1.0`, then adjust for the base model, resolution, and reference image.
- The examples and workflows in this repository are demonstrations, not a guarantee of identical
  results on every image.
- Do not use or share results involving public figures or people who have not given consent.

## Examples

The existing examples are grouped by workflow family in the individual guides. Qwen Image 2.1
examples are `images/bfs_qwen_2.1_1.png` through `images/bfs_qwen_2.1_8.png`.

## Support

Feel free to experiment and share your results responsibly. For workflow issues, first update
ComfyUI and verify that the base model, text encoder, VAE, workflow, and LoRA all belong to the
same model family.

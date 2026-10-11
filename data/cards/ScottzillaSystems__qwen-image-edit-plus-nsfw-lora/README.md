---
license: openrail++
base_model: Qwen/Qwen-Image-Edit-2511
tags:
- lora
- text-to-image
- nsfw
- image-editing
- qwen-image-edit
- diffusers
- not-for-all-audiences
pipeline_tag: image-to-image
---

# MCNL v1 — Multi Concept NSFW LoRA for Qwen Image Edit

A LoRA adapter for the [Qwen-Image-Edit-2511](https://huggingface.co/Qwen/Qwen-Image-Edit-2511) diffusion pipeline, enabling NSFW content generation and editing capabilities.

## Model Details

| Property | Value |
|----------|-------|
| **Base Model** | Qwen/Qwen-Image-Edit-2511 |
| **Architecture** | QwenImageTransformer2DModel (MMDiT) LoRA |
| **File Size** | ~563 MB |
| **Format** | safetensors |
| **License** | OpenRAIL++ |

## Usage

### With the ScottzillaSystems Image Editor Space

The easiest way to use this LoRA is through the [ScottzillaSystems Image Editor](https://huggingface.co/spaces/ScottzillaSystems/Qwen-Image-Edit-2511-LoRAs-Fast) — select "🔥 MCNL-NSFW-v1" from the adapter dropdown.

### Programmatic Usage

```python
from diffusers import QwenImageEditPlusPipeline
import torch

pipe = QwenImageEditPlusPipeline.from_pretrained(
    "Qwen/Qwen-Image-Edit-2511",
    torch_dtype=torch.bfloat16
).to("cuda")

# Load this LoRA
pipe.load_lora_weights(
    "ScottzillaSystems/qwen-image-edit-plus-nsfw-lora",
    weight_name="qwen-image-edit-plus-nsfw-lora.safetensors",
    adapter_name="mcnl-nsfw-v1"
)
pipe.set_adapters(["mcnl-nsfw-v1"])

# Edit an image
from PIL import Image
image = Image.open("input.jpg").convert("RGB")
result = pipe(
    image=image,
    prompt="nsfw",
    num_inference_steps=40,
    true_cfg_scale=4.0,
    negative_prompt=" ",
).images[0]
result.save("output.jpg")
```

## Trigger Words

Use these concepts in your prompts to activate specific capabilities:

`nsfw` `nipples` `vagina` `penis` `missionary` `cowgirlout` `reversecowgirlpov` `blowjob` `cum_on_face` `creamp1e` `l1ck`

## See Also

- [MCNL v2 (updated version)](https://huggingface.co/ScottzillaSystems/qwen-image-edit-plus-nsfw-lora2)
- [ScottzillaSystems Image Editor Space](https://huggingface.co/spaces/ScottzillaSystems/Qwen-Image-Edit-2511-LoRAs-Fast)
- [Qwen-Image-Edit-2511 Base Model](https://huggingface.co/Qwen/Qwen-Image-Edit-2511)

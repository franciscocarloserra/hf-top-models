---
license: other
language:
- en
base_model:
- black-forest-labs/FLUX.1-dev
pipeline_tag: text-to-image
library_name: diffusers
tags:
- art
---

I trained this model using the Diffusers library by randomly selecting layers and blocks (not training every layer), which reduced the training time and is expected to yield better results.

![cen_sample1](https://cdn-uploads.huggingface.co/production/uploads/632fa63d2636f057d5896af3/Tz1tfnyTxSZVmzZz_LNFD.jpeg)

![cen_sample2](https://cdn-uploads.huggingface.co/production/uploads/632fa63d2636f057d5896af3/bJQaBOwguIEDJfMZEx-H_.jpeg)

![sample_after3](https://cdn-uploads.huggingface.co/production/uploads/632fa63d2636f057d5896af3/cgsG7slegGQp8OJHoPgpq.png)

```python
import torch
from diffusers import FluxPipeline

pipe = FluxPipeline.from_pretrained("kpsss34/FHDR_Uncensored", torch_dtype=torch.bfloat16)
pipe.enable_model_cpu_offload()

prompt = "a women..."
image = pipe(
    prompt,
    height=1024,
    width=1024,
    guidance_scale=4.0,
    num_inference_steps=40,
    max_sequence_length=512,
    generator=torch.Generator("cpu").manual_seed(0)
).images[0]
image.save("outputs.png")
```

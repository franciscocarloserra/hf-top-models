---
base_model:
  - Lightricks/LTX-2.3
library_name: diffusers
pipeline_tag: text-to-video
---

**Sulphur 2**

An uncensored video generation model based on LTX 2.3 supporting both t2v and i2v natively, as well as all of the other ltx 2.3 formats.

Follow us on **[X](https://x.com/FusionCow11)**

Join our  **[Discord](https://discord.gg/C3d56f39Ah)**

Support the next version of the project, even just a few dollars would go a long way: **[Kofi](https://ko-fi.com/fusioncow)**

As a note, official inference for the model is coming soon.

---

**Get Started:**
To get started with the model, I recommend downloading either of the dev versions, (fp8mixed or bf16) and downloading the distill lora provided. By the way, I'm aware the workflows contain sulphur_final right now, just use the lora or use the full models, don't use both at the same time.

This model contains a **prompt enhancer**. The easiest way to get started with the prompt enhancer is by using it on lmstudio. The way to accomplish this is by going to your model folder inside lmstudio, then opening it up in your file explorer. Create a folder named "Sulphur", then a folder inside that called "promptenhancer". Inside that folder, place the gguf file and the mmproj file. Once you've done that, you should be able to load the prompt enhancer in lmstudio. There is no system prompt for it, just send the text (and an image) you'd like to be enhanced.

*As a note, this readme will contain better setup instructions and how to train on top of the model soon.

---

**Links**
- **([CivitAI Base Model](https://civitai.red/models/2594061/sulphur-2-base))** -
- **([CivitAI Quant Model](https://civitai.red/models/2630742))** -


**Credits**

- **([TenStrip](https://huggingface.co/TenStrip))** — Testing & model merging ([His i2v merge of sulphur 2, highly recommend for i2v](https://huggingface.co/TenStrip/LTX2.3-10Eros))
- **@s1lv3rc01n** — Testing & model merging/quantizing ([silveroxides](https://huggingface.co/silveroxides))
- **@mov7162** — Musubi Tuner guidance
- And many others, if you'd like to be on the credits and I didn't place you here, message me I likely assumed you didn't want to be here.

**Funders**

- Anonymous funder #1 — Supported the original Sulphur
- Anonymous funder #2 — Made Sulphur 2 possible; this model wouldn't exist without them

---

Thank you to everyone who contributed.
---
base_model: Lightricks/LTX-2.3
language:
- en
- de
- es
- fr
- ja
- ko
- zh
- it
- pt
library_name: ggml
license: other
license_name: ltx-2-community-license-agreement
license_link: https://github.com/Lightricks/LTX-2/blob/main/LICENSE
pipeline_tag: image-to-video
arxiv: 2601.03233
tags:
- image-to-video
- gguf
- unsloth
- text-to-video
- video-to-video
- image-text-to-video
- audio-to-video
- text-to-audio
- video-to-audio
- audio-to-audio
- text-to-audio-video
- image-to-audio-video
- image-text-to-audio-video
- ltx-2
- ltx-2-3
- ltx-video
- ltxv
- lightricks
pinned: true
demo: https://app.ltx.studio/ltx-2-playground/i2v
widget:
  - text: florist
    output:
      url: unsloth_flowers.mp4
---

This is a GGUF quantized version of [LTX-2.3](https://huggingface.co/Lightricks/LTX-2.3). <br>
unsloth/LTX-2.3-GGUF uses [Unsloth Dynamic 2.0](https://docs.unsloth.ai/basics/unsloth-dynamic-2.0-ggufs) methodology for SOTA performance.
- Important layers are upcasted to higher precision.
- Uses tooling from [ComfyUI-GGUF](https://github.com/city96/ComfyUI-GGUF) by city96.

There are two sets of GGUF's published. One for the dev model and one for the distilled. The distilled model is optimized for few step generation, think 4-8 steps. dev on the other hand needs more steps at least 20, but you get better outputs. The distilled variant is useful as a drafting model or a refining model. 

In fact the workflow published below, uses the distilled lora on top of the dev model to refine the intial output.
<div>
  <div style="display: flex; gap: 5px; align-items: center; ">
    <a href="https://github.com/unslothai/unsloth/">
      <img src="https://github.com/unslothai/unsloth/raw/main/images/unsloth%20new%20logo.png" width="133">
    </a>
    <a href="https://discord.gg/unsloth">
      <img src="https://github.com/unslothai/unsloth/raw/main/images/Discord%20button.png" width="173">
    </a>
        <a href="https://docs.unsloth.ai/basics/unsloth-dynamic-2.0-ggufs">
      <img src="https://raw.githubusercontent.com/unslothai/unsloth/refs/heads/main/images/documentation%20green%20button.png" width="143">
    </a>
  </div>
</div>

# Workflow

Download the mp4 in the repo and open it with ComfyUI. The workflow to reproduce the video is embedded in the file.
<Gallery />

To install ComfyUI
```
python3 -m venv .diffusion
source .diffusion/bin/activate
git clone https://github.com/Comfy-Org/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
pip install huggingface_hub
cd custom_nodes/
git clone https://github.com/city96/ComfyUI-GGUF.git
cd ComfyUI-GGUF/
pip install -r requirements.txt 
cd ..
git clone https://github.com/kijai/ComfyUI-KJNodes.git
cd ComfyUI-KJNodes/
pip install -r requirements.txt 
cd ../../models
```

To download the model files used
```
ln -s "$(hf download unsloth/LTX-2.3-GGUF ltx-2.3-22b-dev-Q4_K_M.gguf --quiet)" unet/.
ln -s "$(hf download unsloth/LTX-2.3-GGUF vae/ltx-2.3-22b-dev_video_vae.safetensors --quiet)" vae/.
ln -s "$(hf download unsloth/LTX-2.3-GGUF vae/ltx-2.3-22b-dev_audio_vae.safetensors --quiet)" vae/.
ln -s "$(hf download unsloth/LTX-2.3-GGUF text_encoders/ltx-2.3-22b-dev_embeddings_connectors.safetensors --quiet)" text_encoders/.

ln -s "$(hf download Lightricks/LTX-2.3 ltx-2.3-22b-distilled-lora-384.safetensors --quiet)" loras/.
ln -s "$(hf download Lightricks/LTX-2.3 ltx-2.3-spatial-upscaler-x2-1.0.safetensors --quiet)" latent_upscale_models/.
ln -s "$(hf download unsloth/gemma-3-12b-it-qat-GGUF gemma-3-12b-it-qat-UD-Q4_K_XL.gguf --quiet)" text_encoders/.
ln -s "$(hf download unsloth/gemma-3-12b-it-qat-GGUF mmproj-BF16.gguf --quiet)" text_encoders/.
```

Then launch ComfyUI, make sure you're using an up to date version of ComfyUI and all custom nodes.
```
cd ..
python main.py
```

---
# LTX-2.3 Model Card

This model card focuses on the LTX-2.3 model, which is a significant update to the [LTX-2 model](https://huggingface.co/Lightricks/LTX-2) with improved audio and visual quality as well as enhanced prompt adherence.
LTX-2 was presented in the paper [LTX-2: Efficient Joint Audio-Visual Foundation Model](https://huggingface.co/papers/2601.03233).

💻💻 **If you want to dive in right to the code - it is available [here](https://github.com/Lightricks/LTX-2).** 💾💾

LTX-2.3 is a DiT-based audio-video foundation model designed to generate synchronized video and audio within a single model. It brings together the core building blocks of modern video generation, with open weights and a focus on practical, local execution. 

[![LTX-2 Open Source](ltx2.3-open.png)](https://youtu.be/o-7us-BR_gQ)

# Model Checkpoints

| Name                               | Notes                                                                                                              |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| ltx-2.3-22b-dev                    | The full model, flexible and trainable in bf16                                                                     |
| ltx-2.3-22b-distilled              | The distilled version of the full model, 8 steps, CFG=1                                                            |
| ltx-2.3-22b-distilled-lora-384     | A LoRA version of the distilled model applicable to the full model                                                 |
| ltx-2.3-spatial-upscaler-x2-1.0    | An x2 spatial upscaler for the ltx-2.3 latents, used in multi stage (multiscale) pipelines for higher resolution   |
| ltx-2.3-spatial-upscaler-x1.5-1.0  | An x1.5 spatial upscaler for the ltx-2.3 latents, used in multi stage (multiscale) pipelines for higher resolution |
| ltx-2.3-temporal-upscaler-x2-1.0   | An x2 temporal upscaler for the ltx-2.3 latents, used in multi stage (multiscale) pipelines for higher FPS         |

## Model Details
- **Developed by:** Lightricks
- **Model type:** Diffusion-based audio-video foundation model
- **Language(s):** English

# Online demo
LTX-2.3 is accessible right away via the [API Playground](https://console.ltx.video/playground/).

# Run locally

## Direct use license
You can use the models - full, distilled, upscalers and any derivatives of the models - for purposes under the [license](./LICENSE).

## ComfyUI
We recommend you use the built-in LTXVideo nodes that can be found in the ComfyUI Manager. 
For manual installation information, please refer to our [documentation site](https://docs.ltx.video/open-source-model/integration-tools/comfy-ui).

## PyTorch codebase

The [LTX-2 codebase](https://github.com/Lightricks/LTX-2) is a monorepo with several packages. From model definition in 'ltx-core' to pipelines in 'ltx-pipelines' and training capabilities in 'ltx-trainer'.
The codebase was tested with Python >=3.12, CUDA version >12.7, and supports PyTorch ~= 2.7.

### Installation

```bash
git clone https://github.com/Lightricks/LTX-2.git
cd LTX-2

# From the repository root
uv sync
source .venv/bin/activate
```

### Inference

To use our model, please follow the instructions in our [ltx-pipelines](https://github.com/Lightricks/LTX-2/blob/main/packages/ltx-pipelines/README.md) package.

## Diffusers 🧨

LTX-2.3 support in the [Diffusers Python library](https://huggingface.co/docs/diffusers/main/en/index) is coming soon!

## General tips:
* Width & height settings must be divisible by 32. Frame count must be divisible by 8 + 1. 
* In case the resolution or number of frames are not divisible by 32 or 8 + 1, the input should be padded with -1 and then cropped to the desired resolution and number of frames.
* For tips on writing effective prompts, please visit our [Prompting guide](https://ltx.video/blog/how-to-prompt-for-ltx-2) 

### Limitations
- This model is not intended or able to provide factual information.
- As a statistical model this checkpoint might amplify existing societal biases.
- The model may fail to generate videos that matches the prompts perfectly.
- Prompt following is heavily influenced by the prompting-style.
- The model may generate content that is inappropriate or offensive.
- When generating audio without speech, the audio may be of lower quality.

# Train the model

The base (dev) model is fully trainable.

It's extremely easy to reproduce the LoRAs and IC-LoRAs we publish with the model by following the instructions on the [LTX-2 Trainer Readme](https://github.com/Lightricks/LTX-2/blob/main/packages/ltx-trainer/README.md).

Training for motion, style or likeness (sound+appearance) can take less than an hour in many settings.

## Citation

```bibtex
@article{hacohen2025ltx2,
  title={LTX-2: Efficient Joint Audio-Visual Foundation Model},
  author={HaCohen, Yoav and Brazowski, Benny and Chiprut, Nisan and Bitterman, Yaki and Kvochko, Andrew and Berkowitz, Avishai and Shalem, Daniel and Lifschitz, Daphna and Moshe, Dudu and Porat, Eitan and Richardson, Eitan and Guy Shiran and Itay Chachy and Jonathan Chetboun and Michael Finkelson and Michael Kupchick and Nir Zabari and Nitzan Guetta and Noa Kotler and Ofir Bibi and Ori Gordon and Poriya Panet and Roi Benita and Shahar Armon and Victor Kulikov and Yaron Inger and Yonatan Shiftan and Zeev Melumian and Zeev Farbman},
  journal={arXiv preprint arXiv:2601.03233},
  year={2025}
}
```
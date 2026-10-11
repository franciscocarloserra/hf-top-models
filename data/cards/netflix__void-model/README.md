---
license: apache-2.0
tags:
  - video-inpainting
  - video-editing
  - object-removal
  - cogvideox
  - diffusion
  - video-generation
pipeline_tag: video-to-video
---

# VOID: Video Object and Interaction Deletion

<video src="https://github.com/user-attachments/assets/ad174ca0-2feb-45f9-9405-83167037d9be" width="100%" controls autoplay loop muted></video>

VOID removes objects from videos along with all interactions they induce on the scene — not just secondary effects like shadows and reflections, but **physical interactions** like objects falling when a person is removed.

**[Project Page](https://void-model.github.io/)** | **[Paper](https://arxiv.org/pdf/2604.02296)** | **[GitHub](https://github.com/netflix/void-model)** | **[Demo](https://huggingface.co/spaces/sam-motamed/VOID)**

## Quick Start

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/netflix/void-model/blob/main/notebook.ipynb)

The included notebook handles setup, downloads models, runs inference on a sample video, and displays the result. Requires a GPU with **40GB+ VRAM** (e.g., A100).

## Model Details

VOID is built on [CogVideoX-Fun-V1.5-5b-InP](https://huggingface.co/alibaba-pai/CogVideoX-Fun-V1.5-5b-InP) and fine-tuned for video inpainting with interaction-aware **quadmask** conditioning — a 4-value mask that encodes the primary object (remove), overlap regions, affected regions (falling objects, displaced items), and background (keep).

### Checkpoints

| File | Description | Required? |
|------|-------------|-----------|
| `void_pass1.safetensors` | Base inpainting model | Yes |
| `void_pass2.safetensors` | Warped-noise refinement for temporal consistency | Optional |

Pass 1 is sufficient for most videos. Pass 2 adds optical flow-warped latent initialization for improved temporal consistency on longer clips.

### Architecture

- **Base:** CogVideoX 3D Transformer (5B parameters)
- **Input:** Video + quadmask + text prompt describing the scene after removal
- **Resolution:** 384x672 (default)
- **Max frames:** 197
- **Scheduler:** DDIM
- **Precision:** BF16 with FP8 quantization for memory efficiency

## Usage

### From the Notebook

The easiest way — clone the repo and run [`notebook.ipynb`](https://github.com/netflix/void-model/blob/main/notebook.ipynb):

```bash
git clone https://github.com/netflix/void-model.git
cd void-model
```

### From the CLI

```bash
# Install dependencies
pip install -r requirements.txt

# Download the base model
hf download alibaba-pai/CogVideoX-Fun-V1.5-5b-InP \
    --local-dir ./CogVideoX-Fun-V1.5-5b-InP

# Download VOID checkpoints
hf download netflix/void-model \
    --local-dir .

# Run Pass 1 inference on a sample
python inference/cogvideox_fun/predict_v2v.py \
    --config config/quadmask_cogvideox.py \
    --config.data.data_rootdir="./sample" \
    --config.experiment.run_seqs="lime" \
    --config.experiment.save_path="./outputs" \
    --config.video_model.transformer_path="./void_pass1.safetensors"
```

### Input Format

Each video needs three files in a folder:

```
my-video/
  input_video.mp4      # source video
  quadmask_0.mp4       # 4-value mask (0=remove, 63=overlap, 127=affected, 255=keep)
  prompt.json          # {"bg": "description of scene after removal"}
```

The repo includes a mask generation pipeline (`VLM-MASK-REASONER/`) that creates quadmasks from raw videos using SAM2 + Gemini.

## Training

Trained on paired counterfactual videos generated from two sources:

- **HUMOTO** — human-object interactions rendered in Blender with physics simulation
- **Kubric** — object-only interactions using Google Scanned Objects

Training was run on **8x A100 80GB GPUs** using DeepSpeed ZeRO Stage 2. See the [GitHub repo](https://github.com/netflix/void-model#%EF%B8%8F-training) for full training instructions and data generation code.

## Citation

```bibtex
@misc{motamed2026void,
  title={VOID: Video Object and Interaction Deletion},
  author={Saman Motamed and William Harvey and Benjamin Klein and Luc Van Gool and Zhuoning Yuan and Ta-Ying Cheng},
  year={2026},
  eprint={2604.02296},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2604.02296}
}
```

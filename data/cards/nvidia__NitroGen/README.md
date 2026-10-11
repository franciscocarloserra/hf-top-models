---
license: other
datasets:
- nvidia/NitroGen
tags:
- behavior
- cloning
- gaming
- agent
pipeline_tag: reinforcement-learning
---

<img src="https://cdn-uploads.huggingface.co/production/uploads/67d8509cb6b70254852d734d/u3VY6_KoT6tEs86YPehU2.gif" width="100%" />

<div align="center">
  <p style="font-size: 1.2em;">
    <a href="https://nitrogen.minedojo.org/"><strong>Website</strong></a> | 
    <a href="https://github.com/MineDojo/NitroGen"><strong>Code</strong></a> |
    <a href="https://huggingface.co/datasets/nvidia/NitroGen"><strong>Dataset</strong></a> |
    <a href="https://huggingface.co/papers/2601.02427"><strong>Paper</strong></a>
  </p>
</div>

# NitroGen: An Open Foundation Model for Generalist Gaming Agents

NitroGen is a unified vision-to-action foundation model designed to play video games directly from raw frames. It is a generalist agent trained via large-scale behavior cloning on 40,000 hours of gameplay across over 1,000 games. It maps RGB video footage to gamepad actions.

NitroGen works best on games designed for gamepad controls (e.g., action, platformer, and racing games) and is less effective on games that rely heavily on mouse and keyboard (e.g., RTS, MOBA).

## Sample Usage

### Installation

To use NitroGen, clone and install the repository:

```bash
git clone https://github.com/MineDojo/NitroGen.git
cd NitroGen
pip install -e .
```

### Inference

1. **Download the checkpoint** from Hugging Face:
```bash
hf download nvidia/NitroGen ng.pt
```

2. **Start the inference server**:
```bash
python scripts/serve.py <path_to_ng.pt>  
```

3. **Run the agent** on the game of your choice (currently supports Windows games):
```bash
python scripts/play.py --process '<game_executable_name>.exe'
```

## Model Details

- **Architecture:** Vision Transformer (SigLip2) + Diffusion Matching Transformer (DiT).
- **Parameters:** $4.93 \times 10^8$.
- **Inputs:** 256x256 RGB images.
- **Outputs:** Gamepad actions (21x16 shape: two 2D continuous vectors for joysticks, 17 binary buttons).
- **Training:** Trained on 40,000 hours of internet-scale gameplay videos.

## Citation

If you find NitroGen useful in your research, please cite:

```bibtex
@misc{magne2026nitrogen,
      title={NitroGen: An Open Foundation Model for Generalist Gaming Agents}, 
      author={Loïc Magne and Anas Awadalla and Guanzhi Wang and Yinzhen Xu and Joshua Belofsky and Fengyuan Hu and Joohwan Kim and Ludwig Schmidt and Georgia Gkioxari and Jan Kautz and Yisong Yue and Yejin Choi and Yuke Zhu and Linxi "Jim" Fan},
      year={2026},
      eprint={2601.02427},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2601.02427}, 
}
```

## License

Governing Terms: [NVIDIA License](https://developer.download.nvidia.com/licenses/NVIDIA-OneWay-Noncommercial-License-22Mar2022.pdf).
The model uses a [SigLip2](https://huggingface.co/google/siglip2-base-patch16-224) backbone which is licensed under Apache 2.0.
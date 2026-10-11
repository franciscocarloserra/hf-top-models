---
license: apache-2.0
library_name: mlx
tags:
- moe
- edge-inference
- prerouter
- lora
- ssd-offload
- multi-platform
- ios
- android
- windows
- macos
base_model:
- Qwen/Qwen3.6-35B-A3B
pipeline_tag: text-generation
---

<div align="center">

<img src="20260908-223115.jpg" alt="edge0" width="100%">

<h1>Edge0-35b-a3b Preview</h1>

**A 35B-class sparse MoE that runs in phone-class memory.**

**3 GiB active memory · 15 tok/s · 4-bit**

**Native engines on iOS · macOS · Android · Windows.**

[![GitHub](https://img.shields.io/badge/GitHub-Edge0--AI%2Fedge0-black?style=for-the-badge&logo=github)](https://github.com/Edge0-AI/edge0)
[![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Edge0--35b--a3b--preview-yellow?style=for-the-badge)](https://huggingface.co/Edge0/Edge0-35b-a3b-preview)
[![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Edge0--8b--a1b--preview-yellow?style=for-the-badge)](https://huggingface.co/Edge0/Edge0-8b-a1b-preview)
[![ModelScope](https://img.shields.io/badge/ModelScope-Edge0--35B--A3B--preview-624AFF?style=for-the-badge&logo=modelscope&logoColor=white)](https://www.modelscope.cn/models/Edge0/Edge0-35B-A3B-preview)
[![ModelScope](https://img.shields.io/badge/ModelScope-Edge0--8B--A1B--preview-624AFF?style=for-the-badge&logo=modelscope&logoColor=white)](https://www.modelscope.cn/models/Edge0/Edge0-8B-A1B-preview)
[![arXiv](https://img.shields.io/badge/arXiv-2609.18063-B31B1B?style=for-the-badge&logo=arxiv&logoColor=white)](https://arxiv.org/abs/2609.18063)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge)](https://github.com/Edge0-AI/edge0/blob/main/LICENSE)

[![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=apple&logoColor=white)](https://github.com/Edge0-AI/edge0/tree/main/ios)
[![macOS](https://img.shields.io/badge/macOS-000000?style=for-the-badge&logo=apple&logoColor=white)](https://github.com/Edge0-AI/edge0/tree/main/macos)
[![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=black)](https://github.com/Edge0-AI/edge0/tree/main/android)
[![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows11&logoColor=white)](https://github.com/Edge0-AI/edge0/tree/main/windows)

</div>


**Edge0-35b-a3b** — a 35B MoE LLM that runs at viable speed in under **3 GiB of active memory**, 
via the [edge0](https://github.com/Edge0-AI/edge0) streaming inference framework.

> **Preview status:** this is an early preview release of the edge0
> pipeline. The checkpoint ships as int4 quantization plus LoRA and
> prerouter adapters trained for this framework.

<div align="center">

<video
  src="https://huggingface.co/Edge0/Edge0-35B-A3B-preview/resolve/main/20260910-105854.mp4"
  controls
  playsinline
  preload="metadata"
  width="80%">
</video>

</div>

## Platforms — one model, four native engines

<div align="center">

**On 2026-09-30 we released the edge0 inference engines for
four platforms — so users get the best inference experience across
architectures and platforms. The source is open-sourced in the
[edge0 repo](https://github.com/Edge0-AI/edge0).**

| Platform | Native engine (open source) |
|---|---|
| 📱 **iOS** | [edge0/ios](https://github.com/Edge0-AI/edge0/tree/main/ios) |
| 🖥️ **macOS** | [edge0/macos](https://github.com/Edge0-AI/edge0/tree/main/macos) |
| 🤖 **Android** | [edge0/android](https://github.com/Edge0-AI/edge0/tree/main/android) |
| 🪟 **Windows** | [edge0/windows](https://github.com/Edge0-AI/edge0/tree/main/windows) |

</div>

This checkpoint is built for all of them: one model directory — the same
int4 base plus LoRA / prerouter adapters — runs unchanged on every
platform, so what you download here is what ships on a phone, a desktop
and a laptop alike.

## Highlights

- **Runs on iOS, macOS, Android and Windows**: the edge0 inference
  engines are **open-source and native on all four platforms** — one
  model, the best inference experience on every architecture and
  platform (see [Platforms](#platforms--one-model-four-native-engines)
  below).
- **Runs in phone-class memory**: the full 4-bit checkpoint stays on
  storage and experts are streamed on demand, so only the active
  weights are in RAM — under **3 GiB**, with no sharding and no
  upfront download of the weights into memory.
- **Fast enough for interactive use**: 15 tok/s decode;
  long prompts fill in at 140 tok/s.
- **Quality kept after quantization**: Recover-LoRA distillation keeps
  the int4 model within **3.9 points** of its fp16 base.
- **Works out of the box**: base, LoRA and prerouter adapters ship
  together and load automatically via `edge0`.


Three mechanisms make this work:

- **SSD expert offload**: expert weights are streamed from storage on
  demand — fetched only as routed, so RAM holds just the active
  weights.  Peak memory is bounded by the active set, not the
  parameter count.
- **Prerouter**: a trained head predicts expert routing one step
  ahead, so expert loads overlap the forward pass instead of stalling
  it — **up to +59%** decode throughput; the gain grows with storage
  latency, model size, and routed width *K*.
- **Recover-LoRA**: the int4 base is frozen and LoRA adapters are
  trained by distillation from the FP teacher, recovering most of the
  quantization loss at 4-bit (see Quality below).  Adapters stay
  unmerged: one read-only base serves multiple adapter sets.

## Model summary

| | |
|---|---|
| Base model | Qwen3.6-35B-A3B |
| Quantization | 4-bit |
| Layers | 40 |
| Experts / active per token | 256 / 4 (K=4) |
| Hidden size | 2048 |
| License | Apache 2.0 |
| Framework | [edge0](https://github.com/Edge0-AI/edge0) (MLX backend) |
| Contents | base checkpoint + `lora_edge0_35b.safetensors` + `prerouter_edge0_35b.safetensors` |

The LoRA and prerouter adapters are co-located with the base checkpoint
and load automatically — this repository is a complete, ready-to-run
model directory for `edge0`.

## Quality

All benchmarks were run by us with [OpenCompass](https://github.com/open-compass/opencompass)
under identical settings and parameters for both models. The loss of the
edge0 pipeline (int4 + adapters) relative to the fp16 base model is
small: **3.9 points on average**. Max 100:

| Benchmark | edge0-35b (int4) | Qwen3.6-35B-A3B (fp16) |
|---|---:|---:|
| AIME 2026 | 86.6 | 92.7 |
| HumanEval | 90.9 | 95.1 |
| GPQA-Diamond | 79.8 | 81.8 |
| MMLU-Pro | 81.0 | 84.6 |
| IFBench | 57.9 | 61.7 |
| **Average** | **79.2** | **83.2** |

## Performance

Measured with `examples/bench.py` on a Mac mini M4 Pro, 24 GB:

| Decode speed | Prefill throughput (cold / warm) | Peak active memory* |
|---|---|---|
| 14.9–17.7 tok/s | 113 / 140 tok/s | 2.9 GiB |

*Short contexts; long contexts add KV cache. Expert weights stream from
SSD on demand and are not resident.

## Use cases

- Edge / on-device inference where GPU VRAM is scarce and storage is
  fast (NVMe, internal flash).
- Batch serving on a single commodity machine — one read-only base
  serves many LoRA adapter sets without re-quantization.
- Multilingual chat and reasoning with thinking mode enabled by the
  bundled chat template.

## Limitations

- Preview release: coverage and quality are still being extended; the
  model is primarily tuned for the languages of the base model.
- Agent capability: this preview release is not yet optimized for
  agentic tasks — tool use, multi-step planning, and long-horizon
  autonomy are currently weak. The full release will substantially
  strengthen agent capability.
- Platform coverage: the performance numbers above are measured with
  the MLX backend on Apple Silicon; engine coverage and tuning on the
  iOS / Android / Windows engines are still maturing (see
  [Platforms](#platforms--one-model-four-native-engines)).
- Long contexts grow the KV cache; use shorter contexts to keep peak
  memory at 3 GiB.

## Quick start

```bash
pip install -e 'git+https://github.com/Edge0-AI/edge0.git#egg=edge0[fetch]'

# Download this repository into a local directory
huggingface-cli download Edge0/Edge0-35b-a3b-preview --local-dir ./Edge0-35b-a3b-preview

# Run it
export EDGE0_35B_MODEL=$PWD/Edge0-35b-a3b-preview
edge0 chat --name edge0-35b --prompt "Introduce yourself"

# Or serve an OpenAI-compatible HTTP API
edge0 serve --name edge0-35b --port 8085
```

For full usage (Python API, streaming options, prerouter details), see the
[edge0 documentation](https://github.com/Edge0-AI/edge0#documentation).

## License

Apache 2.0. See [LICENSE](https://github.com/Edge0-AI/edge0/blob/main/LICENSE).

## Citation

If you find Edge0 useful in your research, please cite our paper:

```bibtex
@misc{lin2026halfmemorywallserving,
      title={The Other Half of the Memory Wall: Serving 35B MoEs from SSD with Trained Routing Prediction},
      author={Yu Lin and Yiming Wang and Runyuan Cai and Hanze Liu and Xiaodong Zeng},
      year={2026},
      eprint={2609.18063},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2609.18063},
}
```

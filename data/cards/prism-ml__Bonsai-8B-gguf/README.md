---
license: apache-2.0
library_name: llama.cpp
pipeline_tag: text-generation
tags:
- 1-bit
- gguf
- llama-cpp
- cuda
- metal
- on-device
- prismml
- bonsai
base_model:
- prism-ml/Bonsai-8B-unpacked
---

<p align="center">
  <img src="./assets/bonsai-logo.svg" width="280" alt="Bonsai">
</p>

<p align="center">
  <a href="https://prismml.com"><b>Prism ML Website</b></a> &nbsp;|&nbsp;
  <a href="https://github.com/PrismML-Eng/Bonsai-demo/blob/main/1-bit-bonsai-8b-whitepaper.pdf"><b>Whitepaper</b></a> &nbsp;|&nbsp;
  <a href="https://github.com/PrismML-Eng/Bonsai-demo"><b>Demo &amp; Examples</b></a> &nbsp;|&nbsp;
  <a href="https://colab.research.google.com/drive/1EzyAaQ2nwDv_1X0jaC5XiVC3ZREg9bdG?usp=sharing"><b>Colab Notebook</b></a> &nbsp;|&nbsp;
  <a href="https://discord.gg/prismml"><b>Discord</b></a>
</p>

# Bonsai-8B-GGUF-1bit

End-to-end 1-bit language model for llama.cpp (CUDA, Metal, CPU)

> **14.1x** smaller than FP16 | **6.2x** faster on RTX 4090 | **4-5x** lower energy/token

## Highlights

- **1.15 GB** parameter memory (down from 16.38 GB FP16) — fits on virtually any device with a GPU
- **End-to-end 1-bit weights** across embeddings, attention projections, MLP projections, and LM head
- **GGUF Q1_0 (g128)** format with inline dequantization kernels — no FP16 materialization
- **Cross-platform**: CUDA (RTX/datacenter), Metal (Mac), Android, CPU
- **Competitive benchmarks**: 70.5 avg score across 6 categories, matching full-precision 8B models at 1/14th the size
- **MLX companion**: also available as [MLX 1-bit g128](https://huggingface.co/prism-ml/Bonsai-8B-mlx-1bit) for native Apple Silicon inference

<p align="center">
  <img src="./assets/frontier.svg" width="680" alt="Frontier Efficiency">
</p>

## Resources

- **[Google Colab](https://colab.research.google.com/drive/1EzyAaQ2nwDv_1X0jaC5XiVC3ZREg9bdG?usp=sharing)** — try Bonsai in your browser, no setup required
- **[Whitepaper](https://github.com/PrismML-Eng/Bonsai-demo/blob/main/1-bit-bonsai-8b-whitepaper.pdf)** — for more details on Bonsai, check out our whitepaper
- **[Demo repo](https://github.com/PrismML-Eng/Bonsai-demo)** — comprehensive examples for serving, benchmarking, and integrating Bonsai
- **[Discord](https://discord.gg/prismml)** — join the community for support, discussion, and updates
- **1-bit kernels**: [llama.cpp fork](https://github.com/PrismML-Eng/llama.cpp) (CUDA + Metal) · [MLX fork](https://github.com/PrismML-Eng/mlx) (Apple Silicon) · [mlx-swift fork](https://github.com/PrismML-Eng/mlx-swift) (iOS/macOS)
- **[Locally AI](https://locallyai.app/)** — we have partnered with Locally AI for iPhone support

## Model Overview


| Item           | Specification                                                          |
| :------------- | :--------------------------------------------------------------------- |
| Parameters     | 8.19B (~6.95B non-embedding)                                           |
| Architecture   | Qwen3-8B dense: GQA (32 query / 8 KV heads), SwiGLU MLP, RoPE, RMSNorm |
| Layers         | 36 Transformer decoder blocks                                          |
| Context length | 65,536 tokens                                                          |
| Vocab size     | 151,936                                                                |
| Weight format  | GGUF Q1_0                                                        |
| Deployed size  | **1.15 GB** (14.2x smaller than FP16)                                  |
| 1-bit coverage | Embeddings, attention projections, MLP projections, LM head            |
| License        | Apache 2.0                                                             |


## Quantization Format: Q1_0

Each weight is a single bit: `0` maps to `−scale`, `1` maps to `+scale`. Every group of 128 weights shares one FP16 scale factor.

Effective bits per weight: **1.125** (1 sign bit + 16-bit scale amortized over 128 weights).

### Memory Requirement

Parameter memory only (weights and scales loaded into memory):

| Format             | Size        | Reduction | Ratio     |
| :----------------- | ----------: | --------: | --------: |
| FP16               | 16.38 GB    | —         | 1.0x      |
| **GGUF Q1_0     ** | **1.15 GB** | **93.0%** | **14.2x** |
| MLX 1-bit g128     | 1.28 GB     | 92.2%     | 12.8x     |

The GGUF file on disk is 1.16 GB (~6.6 MB larger) because the format embeds the tokenizer, chat template, and model metadata alongside the weights.


## Best Practices

### Generation Parameters


| Parameter          | Default | Suggested range |
| :----------------- | :------ | :-------------- |
| Temperature        | 0.5     | 0.5 -- 0.7      |
| Top-k              | 20      | 20 -- 40        |
| Top-p              | 0.9     | 0.85 -- 0.95    |
| Repetition penalty | 1.0     |                 |
| Presence penalty   | 0.0     |                 |


### System Prompt

You can use a simple system prompt such as:

```
You are a helpful assistant
```

## Quickstart

### llama.cpp (CUDA)

```bash
# Clone the PrismML fork of llama.cpp (includes Q1_0 kernels)
git clone https://github.com/PrismML-Eng/llama.cpp
cd llama.cpp

# Build with CUDA support
cmake -B build -DGGML_CUDA=ON && cmake --build build -j

# Run inference
./build/bin/llama-cli \
    -m Bonsai-8B-Q1_0.gguf \
    -p "Explain quantum computing in simple terms." \
    -n 256 \
    --temp 0.5 \
    --top-p 0.85 \
    --top-k 20 \
    -ngl 99
```

### llama.cpp (Metal / macOS)

```bash
# Clone the PrismML fork of llama.cpp (includes Q1_0 kernels)
git clone https://github.com/PrismML-Eng/llama.cpp
cd llama.cpp

# Build with Metal support (default on macOS)
cmake -B build && cmake --build build -j

# Run inference
./build/bin/llama-cli \
    -m Bonsai-8B-Q1_0.gguf \
    -p "Explain quantum computing in simple terms." \
    -n 256 \
    --temp 0.5 \
    --top-p 0.85 \
    --top-k 20 \
    -ngl 99
```

### llama.cpp Server

```bash
./build/bin/llama-server \
    -m Bonsai-8B-Q1_0.gguf \
    --host 0.0.0.0 \
    --port 8080 \
    -ngl 99
```

Open the web UI at [http://127.0.0.1:8080](http://127.0.0.1:8080), or see our [llama.cpp fork](https://github.com/PrismML-Eng/llama.cpp) for more examples.

## Cross-Platform Throughput


| Platform          | Backend          | TG128 (tok/s) | FP16 TG (tok/s) | TG vs FP16 | PP512 (tok/s) | FP16 PP512 (tok/s) |
| :---------------- | :--------------- | ------------: | --------------: | ---------: | ------------: | -----------------: |
| RTX 4090          | llama.cpp CUDA   | 368           | 59              | **6.2x**   | 11,809        | 10,453             |
| RTX L40S          | llama.cpp CUDA   | 327           | 52              | **6.3x**   | 9,592         | 8,325              |
| RTX 3060 Laptop   | llama.cpp CUDA   | 81            | 3.5¹            | **23x**¹   | 1,871         | 94¹                |
| M4 Pro 48 GB      | llama.cpp Metal  | 85            | 16              | **5.4x**   | 498           | 490                |
| Samsung S25 Ultra | llama.cpp OpenCL | 19.6          | —               | —          | 30.4          | —                  |


¹ FP16 only fits partially on GPU's 6 GB VRAM; 1-bit fits entirely in VRAM.

<p align="center">
  <img src="./assets/speeds_8B.png" width="680" alt="Cross-platform throughput">
</p>

## Energy Efficiency


| Platform           | Bonsai E_tg (mWh/tok) | Baseline E_tg | Advantage |
| :----------------- | --------------------: | ------------: | --------: |
| RTX 4090 (CUDA)    | 0.276                 | 1.134 (FP16)  | **4.1x**  |
| Mac M4 Pro (Metal) | 0.091                 | 0.471 (FP16)  | **5.1x**  |

<p align="center">
  <img src="./assets/energy_8B.png" width="680" alt="Energy efficiency">
</p>

## Benchmarks

Evaluated with EvalScope v1.4.2 + vLLM 0.15.1 on NVIDIA H100 under identical infrastructure, generation parameters, and scoring. All models are in the 6B–9B parameter range.


| Model               | Company       | Size        | Avg      | MMLU-R | MuSR | GSM8K | HE+  | IFEval | BFCL |
| :------------------ | :------------ | ----------: | -------: | -----: | ---: | ----: | ---: | -----: | ---: |
| Qwen 3 8B           | Alibaba       | 16 GB       | **79.3** | 83     | 55   | 93    | 82.3 | 84.2   | 81   |
| RNJ 8B              | EssentialAI   | 16 GB       | **73.1** | 75.5   | 50.4 | 93.7  | 84.2 | 73.8   | 61.1 |
| Mistral3 8B         | Mistral       | 16 GB       | **71.0** | 73.9   | 53.8 | 87.2  | 67.4 | 75.4   | 45.4 |
| Olmo 3 7B           | Allen Inst    | 14 GB       | **70.9** | 72     | 56.1 | 92.5  | 79.3 | 37.1   | 38.4 |
| **1-bit Bonsai 8B** | **PrismML**   | **1.15 GB** | **70.5** | 65.7   | 50   | 88    | 73.8 | 79.8   | 65.7 |
| LFM2 8B             | LiquidAI      | 16 GB       | **69.6** | 72.7   | 49.5 | 90.1  | 81   | 82.2   | 62.0 |
| Llama 3.1 8B        | Meta          | 16 GB       | **67.1** | 72.9   | 51.3 | 87.9  | 75   | 51.5   | —    |
| GLM v6 9B           | ZhipuAI       | 16 GB       | **65.7** | 61.9   | 43.2 | 93.4  | 78.7 | 69.3   | 21.9 |
| Hermes 8B           | Nous Research | 16 GB       | **65.4** | 67.4   | 52.2 | 82.9  | 51.2 | 65     | 73.5 |
| Trinity Nano 6B     | Arcee         | 12 GB       | **61.2** | 68.8   | 52.6 | 81.1  | 54   | 50     | 62.5 |
| Marin 8B            | Stanford CRFM | 16 GB       | **56.6** | 64.8   | 42.6 | 86.4  | 51   | 50     | —    |
| R1-D 7B             | DeepSeek      | 14 GB       | **55.1** | 62.5   | 29.1 | 92.7  | 81.7 | 48.8   | 15.4 |


Despite being **1/14th the size**, 1-bit Bonsai 8B is competitive with leading full-precision 8B instruct models.

## Intelligence Density

Intelligence density captures the ratio of a model's capability to its deployed size:

```
alpha = -ln(1 - score/100) / size_GB
```


| Model               | Size        | Intelligence Density (1/GB) |
| :------------------ | ----------: | --------------------------: |
| **1-bit Bonsai 8B** | **1.15 GB** | **1.062**                   |
| Qwen 3 8B           | 16 GB       | 0.098                       |
| Llama 3.1 8B        | 16 GB       | 0.074                       |
| Mistral3 8B         | 16 GB       | 0.077                       |


Bonsai 8B achieves **10.8x higher intelligence density** than full-precision Qwen 3 8B.

<p align="center">
  <img src="./assets/intel_density_8B.png" width="680" alt="Intelligence density">
</p>

## Use Cases

- **On-device assistants**: interactive AI on laptops and phones with low latency
- **Mobile deployment**: runs on a wide variety of phones due to low memory footprint
- **Edge robotics and autonomy**: compact deployment on devices with thermal, memory, or connectivity constraints
- **Cost-sensitive GPU serving**: higher throughput and lower energy per token on RTX-class and datacenter GPUs
- **Enterprise and private inference**: local or controlled-environment inference for data residency requirements

## Limitations

- No native 1-bit hardware exists yet — current gains are software-kernel optimizations on general-purpose hardware
- Mobile power measurement is estimated rather than hardware-metered
- The full-precision benchmark frontier continues to advance; the 1-bit methodology is architecture-agnostic and will be applied to newer bases

## Citation

If you use 1-bit Bonsai 8B, please cite:

```bibtex
@techreport{bonsai8b,
    title   = {1-bit Bonsai 8B: End-to-End 1-bit Language Model Deployment
               Across Apple, GPU, and Mobile Runtimes},
    author  = {Prism ML},
    year    = {2026},
    month   = {March},
    url     = {https://prismml.com}
}
```

## Contact

For questions, feedback, or collaboration inquiries: **contact@prismml.com**
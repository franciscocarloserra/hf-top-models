---
pipeline_tag: text-generation
base_model:
- google/gemma-4-31B-it
license: other
license_name: apache-license-2.0 
license_link: https://ai.google.dev/gemma/apache_2
library_name: Model Optimizer
base_model_relation: quantized
tags:
- nvidia
- ModelOpt
- Gemma-4-31B-IT
- lighthouse
- quantized
- NVFP4
---
# Model Overview

## Description:
Gemma 4 31B IT is an open multimodal model built by Google DeepMind that handles text and image inputs, can process video as sequences of frames, and generates text output. It is designed to deliver frontier-level performance for reasoning, agentic workflows, coding, and multimodal understanding on consumer GPUs and workstations, with a 256K-token context window and support for over 140 languages. The model uses a hybrid attention mechanism that interleaves local sliding-window and full global attention, with unified Keys and Values in global layers and Proportional RoPE (p-RoPE) to support long-context performance. The NVIDIA Gemma 4 31B IT NVFP4 model is quantized with [NVIDIA Model Optimizer](https://github.com/NVIDIA/TensorRT-Model-Optimizer).

This model is ready for commercial/non-commercial use.  <br> 

# Third-Party Community Consideration
This model is not owned or developed by NVIDIA. This model has been developed and built to a third-party's requirements for this application and use case; see link to Non-NVIDIA [Gemma 4 31B IT Model Card](https://huggingface.co/google/gemma-4-31B-it)

## License and Terms of Use:
[Apache License 2.0  |  Gemma  |  Google AI for Developers](https://ai.google.dev/gemma/apache_2)

## Deployment Geography:
Global

## Use Case:
**Use Case:** Designed for text generation, chatbots and conversational AI, text summarization, image data extraction, reasoning, coding, multimodal understanding, function calling, and research or educational use.

## Release Date:
Hugging Face [04/02/2026] via [link] (https://huggingface.co/nvidia/Gemma-4-31B-IT-NVFP4)

## Model Architecture:
**Architecture Type:** Transformer <br>
**Network Architecture:** Gemma 4<br>
**Number of model parameters:** 30.7B
**Vocabulary Size:** 262,144


## Input:
**Input Type(s):** Text, Image, Video <br>
**Input Format(s):** String, Red, Green, Blue (RGB), Video (MP4/WebM) <br>
**Input Parameters:** One-Dimensional (1D), Two-Dimensional (2D), Three-Dimensional (3D)<br>
**Other Properties Related to Input:** Supports variable image aspect ratios and resolutions, configurable visual token budgets of 70, 140, 280, 560, and 1120, and video inputs up to 60 seconds at one frame per second. <br>
**Input Context Length (ISL):** 256K


## Output:
**Output Type(s):** Text <br>
**Output Format:** String <br>
**Output Parameters:** 1D (One Dimensional): Sequences <br>
**Other Properties Related to Output:** Generates text responses for chat, reasoning, coding, multimodal understanding, and function-calling workflows.

__Our AI models are designed and/or optimized to run on NVIDIA GPU-accelerated systems. By leveraging NVIDIA's hardware (e.g. GPU cores) and software frameworks (e.g., CUDA libraries), the model achieves faster training and inference times compared to CPU-only solutions.__

## Software Integration:
**Supported Runtime Engine(s):** <br>
* vLLM <br>

**Supported Hardware Microarchitecture Compatibility:** <br>
NVIDIA Blackwell <br>

**Preferred Operating System(s):** <br>
* Linux <br>

## Model Version(s):
The model version is v1.0 which NVFP4 quantized with nvidia-modelopt **v0.42.0**  <br>

## Training, Testing, and Evaluation Datasets:

We calibrated the model using the dataset noted below, and performed evaluation using the benchmarks noted under Evaluation Datasets.
We did not perform training or testing for this Model Optimizer release. The methods noted under Training and Testing Datasets below represent the data collection and labeling methods used by the third-party to train and test the underlying Gemma 4 31B IT model.<br>

## Calibration Dataset:
**Link:** [cnn_dailymail](https://huggingface.co/datasets/abisee/cnn_dailymail)<br>
**Data Collection Method by dataset:** Automated. <br>
**Labeling Method by dataset:** Automated. <br>
**Properties:** The cnn_dailymail dataset is an English-language dataset containing just over 300k unique news articles as written by journalists at CNN and the Daily Mail.

**Training Dataset**
**Data Modality:** Text, Image, Audio, Other (Code)<br>
**Training Data Collection:** Automated<br>
**Training Labeling:** Undisclosed<br>
**Training Properties:** Large-scale multimodal pre-training data spanning web documents, code, images, and audio, with a cutoff date of January 2025 and coverage in over 140 languages. Data was filtered for CSAM, sensitive data, quality, and safety.<br>

**Testing Dataset**
**Testing Data Collection:** Undisclosed<br>
**Testing Labeling:** Undisclosed<br>
**Testing Properties:** Undisclosed<br>

## Evaluation Dataset:
**Data Collection Method by dataset:** Hybrid: Human, Automated <br>
**Labeling Method by dataset: Hybrid:** Human, Automated <br>
**Properties:** We evaluated the model on benchmarks including GPQA, which is a dataset of 448 multiple-choice questions written by domain experts in biology, physics, and chemistry. <br>


## Inference:
**Engine:** vLLM <br>
**Test Hardware:** NVIDIA Hopper H100 <br>

## Post Training Quantization
This model was obtained by quantizing the weights and activations of Gemma-4-31B-IT-NVFP4 to NVFP4 data type, ready for inference with vLLM.  

## Usage

To serve this checkpoint with [vLLM]( 0.17.2rc1.dev104+gae521202f.d20260319.cu128) and run the sample command below:

```sh
vllm serve /models/gemma-4-31b-it-nvfp4 --quantization modelopt --tensor-parallel-size 8
```


## Evaluation Results:

| Benchmark | Baseline (BF16) | NVFP4 |
|---|---|---|
| GPQA Diamond | 85.80% | 85.35% |
| AIME 2025 | 87.92% | 87.60% |
| MMLU Pro | 85.25% | 84.94% |
| LiveCodeBench (pass@1) | 82.49% | 82.27% |
| Scicode subtask acc (pass@1) | 33.61% | 33.18% |
| Terminal-Bench Hard (pass@1) | 27.08% | 27.08% |
> Baseline: [Gemma-4-31B](https://huggingface.co/google/gemma-4-31B)<br>
> Benchmarked with temperature=1.0, top_p=0.95, max_new_tokens= 131072

## Model Limitations:
The base model was trained on data that contains toxic language and societal biases originally crawled from the internet. Therefore, the model may amplify those biases and return toxic responses especially when prompted with toxic prompts. The model may generate answers that may be inaccurate, omit key information, or include irrelevant or redundant text producing socially unacceptable or undesirable text, even if the prompt itself does not include anything explicitly offensive.

## Ethical Considerations

NVIDIA believes Trustworthy AI is a shared responsibility and we have established policies and practices to enable development for a wide array of AI applications.  When downloaded or used in accordance with our terms of service, developers should work with their internal model team to ensure this model meets requirements for the relevant industry and use case and addresses unforeseen product misuse.

Please make sure you have proper rights and permissions for all input image and video content; if image or video includes people, personal health information, or intellectual property, the image or video generated will not blur or maintain proportions of image subjects included.

Please report model quality, risk, security vulnerabilities or NVIDIA AI Concerns [here](https://www.nvidia.com/en-us/support/submit-security-vulnerability/).

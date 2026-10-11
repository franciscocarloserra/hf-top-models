---
license: other
license_name: flux-non-commercial-v2.1
license_link: https://huggingface.co/black-forest-labs/FLUX.2-klein-9B/blob/main/LICENSE.md
base_model: black-forest-labs/FLUX.2-klein-9B
language:
  - en
  - ja
tags:
  - text-to-image
  - flux2
  - klein
  - GGUF
  - safetensors
  - text-generation-inference
  - uncensored
  - abliterated
  - abliteration
extra_gated_heading: "Safety Warning & Terms of Access"
extra_gated_prompt: "This model has safety filtering removed and can generate General NSFW content. By accessing this model, you agree to: (1) Use it responsibly and legally, (2) Not use it to create illegal content, (3) Comply with all applicable laws in your country."
extra_gated_button_content: "Acknowledge and Access"
---

# FLUX.2-klein-9B Uncensored Text Encoder

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/ponpoke)　
Tips are greatly appreciated and help sustain the compute resources needed for further research!

*Read this in other languages: [日本語 (Japanese)](#日本語-japanese)*

## Overview
This repository provides an "uncensored" text encoder for the [FLUX.2-klein-9B](https://huggingface.co/black-forest-labs/FLUX.2-klein-9B) image generation model by Black Forest Labs. It bypasses the built-in safety filters to unlock the model's unconstrained generative capabilities.

By removing the restrictive blocks at the prompt input stage, this encoder allows the model to fully utilize its underlying representational power. The model is provided in the standard Hugging Face `Safetensors` format, alongside several quantized `GGUF` formats for resource-efficient inference.

---

## Concept & Mechanism
This model does **not** rely on fine-tuning with additional image datasets. Instead, it employs a surgical, purely mathematical approach known as **Abliteration (Orthogonalization of Concept Vectors)** to modify the model weights directly.

### Mathematical Removal of the Refusal Vector
We neutralized the safety filter within the LLM-based text encoder (Qwen3 architecture) embedded in FLUX.2-klein-9B through the following steps:

1. **Prompt Contrast:** We fed the model pairs of "harmful/extreme" prompts and "harmless/general" prompts to compare their internal activation states.
2. **Layer-by-Layer Refusal Vector Extraction:** From the inference process (specifically, targeting the middle to late layers, 14 to 24), we dynamically extracted the refusal direction for *each individual layer*. This addresses the issue of concept vectors rotating across layers.
3. **Sequential Weight Orthogonalization:** For each target layer, we mathematically subtracted the projection component of its specific refusal vector from its Attention output layer (`o_proj`) and MLP down-projection layer (`down_proj`).

This sequential, layer-by-layer orthogonalization flawlessly severs the model's ability to output inferences in the "refusal" direction without lobotomizing its general capabilities. As a result, the text encoder no longer rejects extreme inputs; instead, it passes them directly to the DiT (the core rendering engine) as valid drawing instructions.

---

## Mathematical Proof of Unrestricted Output
Without even running the computationally heavy image generation (DiT) process, we can mathematically prove that the output restriction has been removed by comparing the **Cosine Similarity** of the output vectors (embeddings).

$$Similarity = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$
*(Where $\mathbf{A}$ is the output vector of the official model, and $\mathbf{B}$ is the output vector of this abliterated model.)*

* **Cosine Similarity for Harmless Prompts:** `0.9696`
    * *(Analysis)* Because the refusal vector is not triggered by safe prompts, the outputs of both models remain nearly identical. This proves that the fundamental performance and capabilities of the model have not been degraded.
* **Cosine Similarity for Extreme Prompts:** `0.9135`
    * *(Analysis)* For extreme prompts, the official model distorts the output via its safety filter. The abliterated model successfully ignores this refusal vector, resulting in a divergence between the two outputs in the final layers. This serves as mathematical proof that the safety filter has been successfully neutralized across the required layers.

---

## Repository Structure
This repository contains the full suite of files necessary for the text encoder to function correctly. Both Safetensors and GGUF formats are available in the same repository to suit your memory constraints and workflow.

* `model.safetensors`: The standard uncensored text encoder with the refusal vectors mathematically removed.
* `flux2-klein-9b-uncensored-*.gguf`: Quantized versions (F16, Q8_0, Q6_K, Q4_K_M) for resource-efficient local inference.
* `config.json` / `generation_config.json`: Model architecture and inference configuration files.
* `tokenizer.json` / `tokenizer_config.json`: Text tokenization rules and configurations.
* `chat_template.jinja`: Qwen3 base template structure.

---

## Usage

### Using with ComfyUI
Download the necessary format (`model.safetensors` or one of the `.gguf` files) from this repository and place it into your ComfyUI `models/clip` directory. You can then load it using standard nodes or GGUF-compatible nodes (like DualCLIPLoader) and pair it with the official FLUX.2-klein-9B DiT to generate images.

### For Developers & Researchers (Python / Diffusers)
When using Python scripts with the `transformers` or `diffusers` library, simply replace the default text encoder with this model. You can load either the safetensors or the GGUF version (requires `gguf>=0.10.0`).
```python
from transformers import AutoTokenizer, AutoModel

# Load the text encoder by specifying the path to this model
tokenizer = AutoTokenizer.from_pretrained("ponpoke/flux2-klein-9b-uncensored-text-encoder")
text_encoder = AutoModel.from_pretrained("ponpoke/flux2-klein-9b-uncensored-text-encoder")

# Proceed to use it within your standard FLUX.2 pipeline
```

---

## Important Note: Absence of DiT Guardrails and the Knowledge Gap
By completing Phase 1, this text encoder will pass all prompts—including highly extreme or NSFW content—directly to the DiT without rejection.

In our subsequent **[verification](https://huggingface.co/ponpoke/flux2-guardrail-verification)**, we mathematically proved (via L2 norm spike analysis) that FLUX.2's DiT **does not contain any built-in guardrails (refusal circuits)** designed to intentionally destroy or block images. Therefore, whether an image is successfully rendered depends entirely on whether the DiT possesses the visual "knowledge" of that concept.

* **If the DiT knows the concept (e.g., Gore/Violence):** Concepts that were learned by the DiT but previously blocked by the text encoder will now render perfectly just by using this Phase 1 text encoder. No further action is required.
* **If the DiT lacks the concept (e.g., NSFW/Extreme Dismemberment):** Even though the text encoder passes the instruction, the DiT itself does not know how to draw it because those concepts were completely scrubbed from the training dataset (a knowledge gap). The output will likely collapse or result in noise.

**Conclusion:**
If you wish to generate specific NSFW elements that the DiT lacks the capacity to draw, attempting to "abliterate" or mathematically cut weights from the DiT is useless. You **must apply a separate NSFW LoRA** (or DoRA) to directly teach those missing concepts to the DiT. This text encoder functions as an unbreakable foundation, ensuring that your LoRA's instructions reach the DiT without interference.

---

## Disclaimer
* This model is published strictly for research and technical verification purposes (specifically, to validate the effectiveness of Abliteration).
* The creator assumes no responsibility for any damages, issues, or inappropriate content generated through the use of this model.
* Please adhere to all applicable terms of service (such as the Black Forest Labs license, e.g., BFL Non-Commercial) and use the model responsibly and ethically.

<br><br><br>

---

# 日本語 (Japanese)

## 概要 (Overview)
本リポジトリは、Black Forest Labsによる画像生成AIモデル「[FLUX.2-klein-9B](https://huggingface.co/black-forest-labs/FLUX.2-klein-9B)」のセーフティフィルター（出力制限）を解除し、モデル本来の自由な描画能力を引き出すための「Uncensored」テキストエンコーダーです。

プロンプト入力時のブロックを解除し、モデルが持つ本来の描画力を引き出します。Hugging Faceの標準フォーマットである `Safetensors` 形式に加え、メモリ効率の良い `GGUF` 形式（複数の量子化レベル）でも提供されています。

---

## 概念と仕組み (Concept & Mechanism)
本モデルは、新たな画像セットを使った追加学習（Fine-Tuning）を**一切行っていません**。その代わり、モデルの重み（Weights）を直接数学的に書き換える外科的アプローチ「**Abliteration（直交化による概念除去）**」を採用しています。

### 拒絶ベクトルの数学的除去
FLUX.2-klein-9Bに内包されているLLMベースのテキストエンコーダー（Qwen3アーキテクチャ）に対し、以下の手順で安全装置を無効化しました。

1. **プロンプトの対比:** 「セーフティに引っかかる過激なプロンプト」と「無害な一般的なプロンプト」を入力し、内部の活性化状態を比較します。
2. **層ごとの拒絶ベクトルの抽出 (Layer-by-Layer Extraction):** 推論過程（制限が形成される中盤〜後半の第14〜24層）において、1つの層のベクトルを使い回すのではなく、**層ごとに専用の拒絶ベクトルを動的に抽出**します。これにより、層を跨ぐごとのベクトルの回転（ズレ）に対応しました。
3. **逐次的な重みの直交化 (Sequential Orthogonalization):** 抽出した層ごとに、Attention出力層（`o_proj`）とMLPダウン射影層（`down_proj`）の重み行列から、「その層専用の拒絶ベクトル方向への射影成分」を数学的に引き算し直交化しました。

この「層ごとの逐次直交化」により、モデルの一般性能（知能）を低下させることなく、「出力拒絶」という方向へ推論を出力する能力のみを物理的かつ完璧に断ち切っています。過激な入力であってもテキストエンコーダーはそれを拒絶せず、描画指示としてDiT（描画エンジン本体）へそのままパスします。

---

## 数学的アプローチによるUncensored化の証明
画像生成の重い処理を実行するまでもなく、出力されるベクトル（埋め込み表現）の**コサイン類似度（Cosine Similarity）**を比較することで、出力制限が数学的に解除されていることが証明されています。

$$Similarity = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$
*(ここで、$\mathbf{A}$ は公式モデルの出力ベクトル、$\mathbf{B}$ は本モデルの出力ベクトルを指します)*

*   **安全なプロンプトの類似度:** `0.9696`
    *   (考察) 安全なプロンプトでは拒絶ベクトルが発動しないため、両者の出力は非常に似通っています。これは「モデルの基本性能が破壊されていない」ことの証明です。
*   **過激なプロンプトの類似度:** `0.9135`
    *   (考察) 過激なプロンプトでは元の公式モデルがセーフティフィルターにより出力を歪めますが、アンセンサード化モデルはその拒絶ベクトルを層ごとに無視するため、最終層の出力において両者が明確に乖離します。これが「必要な層にわたって制限が効果的に解除されている」ことの証明になります。

---

## ファイル構成 (Repository Structure)
本リポジトリには、テキストエンコーダーを正しく動作させるために必要なすべてのファイルが含まれています。PC環境やVRAM容量に合わせて最適な形式を選択できるよう、Safetensors版と各種GGUF版を同一リポジトリに配置しています。

* `model.safetensors`: 拒絶ベクトルの除去が完了した標準のテキストエンコーダー本体。
* `flux2-klein-9b-uncensored-*.gguf`: メモリ効率の良い量子化フォーマット（F16, Q8_0, Q6_K, Q4_K_M）。
* `config.json` / `generation_config.json`: モデルの構造と推論設定ファイル。
* `tokenizer.json` / `tokenizer_config.json`: テキストをトークン化するための設定ファイル。
* `chat_template.jinja`: Qwen3ベースのテンプレート。

---

## 使用方法 (Usage)

### ComfyUIでの使用
本リポジトリから任意の形式（`model.safetensors` もしくは `.gguf` のいずれか）と必要な設定ファイルをダウンロードし、ComfyUIの `models/clip` ディレクトリに配置してください。DualCLIPLoader等のノード（GGUFの場合は対応ノード）で読み込ませて、公式のFLUX.2-klein-9BのDiTと組み合わせて使用できます。

### 開発者・研究者向け (Python / Diffusers)
Pythonスクリプトや `transformers` ライブラリから読み込む場合、テキストエンコーダー部分を本モデルに差し替えて実行してください。
```python
from transformers import AutoTokenizer, AutoModel

# 本モデルのパスを指定してテキストエンコーダーをロード
tokenizer = AutoTokenizer.from_pretrained("ponpoke/flux2-klein-9b-uncensored-text-encoder")
text_encoder = AutoModel.from_pretrained("ponpoke/flux2-klein-9b-uncensored-text-encoder")

# 以降、通常のFLUX.2パイプラインに組み込んで使用
```

---

## 重要な注意点：DiT側の「ガードレールの不在」と「知識の欠落」について
本プロジェクトによって、テキストエンコーダーはあらゆる過激なプロンプト（NSFWを含む）を拒絶することなく、そのまま描画指示としてDiT（描画エンジン本体）へパスするようになりました。

その後の**[検証](https://huggingface.co/ponpoke/flux2-guardrail-verification)**において、FLUX.2のDiTには「画像を意図的に壊すようなガードレール（拒絶回路）」は**最初から存在しない**ことが数学的に証明されました。実際にその画像が描画されるかどうかは、最終的にDiTが「その視覚的概念（描き方）を知っているか」に完全に依存します。

*   **DiTが概念を知っている場合（例：流血・暴力表現）:** 元々DiTに学習されていたがテキストエンコーダー側でフタをされていたものは、本モデル（フェーズ1のアンセンサード化）を使用するだけで意図通りに描画されるようになります。追加の対策は不要です。
*   **DiTが概念を知らない場合（例：性的表現・人体欠損）:** テキストエンコーダーが指示を通しても、DiT自体がその表現方法を知らない（データセットから徹底的に漂白されている）場合、画像が破綻するか、ノイズが出力されます。

**【結論】**
DiTが描画能力を持っていない特定のNSFW要素などを出力させたい場合は、モデルから何かを削るのではなく、**「DiT側にその概念を直接教え込むNSFW LoRA等の追加学習データ」**を別途用意し、適用する必要があります。本モデルは、テキストエンコーダー側のブロックを解除し、そのLoRAの指示を確実にDiTへ届けるための「強固な土台」として機能します。

---

## 免責事項 (Disclaimer)
*   本モデルは研究および技術検証（Abliterationの有効性確認）を目的として公開されています。
*   モデルの使用によって生じたあらゆる損害、トラブル、または不適切なコンテンツの生成について、製作者は一切の責任を負いません。
*   利用規約（Black Forest Labsのライセンス、BFL Non-Commercial等）を遵守し、自己責任かつ倫理的な範囲内でご使用ください。

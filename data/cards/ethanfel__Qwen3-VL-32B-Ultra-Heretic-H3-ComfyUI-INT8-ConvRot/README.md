---
license: apache-2.0
language:
- en
pipeline_tag: image-text-to-text
library_name: comfyui
base_model:
- llmfan46/Qwen3-VL-32B-Instruct-ultra-uncensored-heretic
tags:
- comfyui
- h3
- qwen3-vl
- qwen3-vl-32b
- heretic
- abliterated
- uncensored
- bf16
- int8
- convrot
- nvfp4
- awq
- quantized
---

# Qwen3-VL-32B Ultra Uncensored Heretic — H3 ComfyUI encoders + generation tails

This repository contains ComfyUI H3 conditioning encoders and optional
Qwen3-VL-32B generation tails. The conditioning encoders are built from
[`llmfan46/Qwen3-VL-32B-Instruct-ultra-uncensored-heretic`](https://huggingface.co/llmfan46/Qwen3-VL-32B-Instruct-ultra-uncensored-heretic).

- BF16 and INT8 ConvRot variants of the H3 text/vision conditioning encoder,
  containing language layers 0–49; and
- generation-only tails containing layers 50–63, the final norm, and LM head
  in BF16, INT8 ConvRot, and NVFP4/AWQ formats.

H3 consumes the unnormalized hidden state after language layer 49.
This checkpoint therefore includes the Qwen3-VL embedding, language layers
0–49, and the complete vision tower. It intentionally omits language layers
50–63, the final language norm, and the LM head.

## H3 conditioning encoder — BF16

`qwen3vl_32b_h3_ultra_uncensored_heretic_bf16.safetensors`

- Size: 51,506,295,440 bytes (47.97 GiB)
- SHA-256:
  `bbcd92a732e911cfafd86960e0e26aacc6efe949e02f16a9641f201c62984860`
- 902 tensors, all BF16
- Qwen3-VL embedding and language layers 0–49
- Complete vision tower
- Intentionally excludes layers 50–63, the final language norm, and LM head

This is the full-precision source used to create the ConvRot build below.

## H3 conditioning encoder — INT8 ConvRot

`qwen3vl_32b_h3_ultra_uncensored_heretic_int8_convrot.safetensors`

- Size: 26,363,476,151 bytes (24.55 GiB)
- SHA-256:
  `d84547412144b7c50a6ec77437a889b869d3ace88da77ef1775d3d2a4901c192`
- 1,604 tensors
- 350 learned row-wise INT8 ConvRot language matrices
- ConvRot group size 256 for every learned language matrix
- One simple tensorwise INT8 token embedding
- 551 tensors retained in BF16, including the complete vision tower and all
  norms
- 351 FP32 weight scales and 351 ComfyUI quantization descriptors

Use BF16 when memory permits. The INT8 ConvRot build is intended for systems
where the 47.97 GiB conditioning encoder is too large.

## Generation tails

Every tail contains Qwen3-VL language layers 50–63, the final language norm,
and LM head. A tail is not a standalone CLIP: it reuses the tokenizer,
embedding, vision tower, and layers 0–49 from the connected H3 conditioning
encoder.

| File | Source family | Format | Size |
| --- | --- | --- | ---: |
| `qwen3vl_32b_h3_generation_tail_50_63_int8_convrot.safetensors` | Ultra Heretic | INT8 ConvRot | 7,609,128,707 bytes |
| `qwen3vl_32b_h3_ultra_uncensored_heretic_generation_tail_50_63_bf16.safetensors` | Ultra Heretic | BF16 | 15,208,606,776 bytes |
| `qwen3vl_32b_h3_instruct_generation_tail_50_63_int8_convrot.safetensors` | Qwen3-VL-32B-Instruct | INT8 ConvRot | 7,609,128,659 bytes |
| `qwen3vl_32b_h3_instruct_generation_tail_50_63_bf16.safetensors` | Qwen3-VL-32B-Instruct | BF16 | 15,208,606,744 bytes |
| `qwen3vl_32b_h3_instruct_generation_tail_50_63_nvfp4_awq.safetensors` | Qwen3-VL-32B-Instruct | NVFP4/AWQ with BF16 norm and LM head | 5,396,902,102 bytes |

### INT8 ConvRot tail details

`qwen3vl_32b_h3_generation_tail_50_63_int8_convrot.safetensors`

- Size: 7,609,128,707 bytes (7.09 GiB)
- SHA-256:
  `b5bb9bb8dc87cf11cbee241a2d95d6d42fe52cf695ed26c093ac321f31160b20`
- 354 tensors
- Language layers 50–63, final language norm, and LM head
- 98 learned row-wise INT8 ConvRot matrices
- One simple row-wise INT8 ConvRot LM head, evaluated in chunks by the node
- ConvRot group size 256
- 57 tensors retained exactly in BF16

The tail does not duplicate the token embedding or vision tower. It is loaded
temporarily, then unloaded after generation while the connected conditioning
CLIP remains unchanged.

## ComfyUI installation

Place the selected conditioning encoder and optional tail under:

```text
ComfyUI/models/text_encoders/H3/
```

Select it in `CLIPLoader` with the H3-compatible text-encoder type. Use a
current ComfyUI checkout with its pinned `comfy-kitchen` dependency.

For prompt enhancement:

1. Load the 0–49 conditioning checkpoint with ComfyUI's standard
   `CLIPLoader` using the H3-compatible text-encoder type.
2. Connect that CLIP to **H3 Prompt Enhancer (optional CLIP tail)**.
3. Select the 50–63 tail in the node's `clip_tail` dropdown.
4. Send `enhanced_prompt` and the returned, unchanged `clip` to the normal
   H3 guide node.

If the connected CLIP is already a complete generative model, leave
`clip_tail` at `[none — connected CLIP is already complete]`. The enhancer
then calls the connected CLIP's ordinary `generate()` path, without loading
or requiring this tail.

These are ComfyUI checkpoints, not a complete Transformers generation
repository.

## Standalone text and vision-language generation

Install
[`ethanfel/ComfyUI-H3-Qwen3VL-TextGen`](https://github.com/ethanfel/ComfyUI-H3-Qwen3VL-TextGen)
to use the H3 0–49 conditioning encoder plus any compatible tail in this
repository as a standalone, general-purpose local Qwen3-VL text and
vision-language generator. It does not require the separate H3 prompt-guide
node pack.

```text
Load CLIP (H3 0–49 encoder) ── clip ──────┐
                                          ├─ H3 Qwen VL Generate Text (Standalone)
H3 Qwen VL Generation Tail Loader ─ tail_clip ─┘
Optional IMAGE batch ───────────── image ─┘
```

1. Install or link the TextGen repository under `ComfyUI/custom_nodes`.
2. Put the H3 conditioning encoder and selected `generation_tail_50_63` file
   under `ComfyUI/models/text_encoders`.
3. Load the conditioning encoder with ComfyUI's standard `Load CLIP` node.
4. Select the tail with **H3 Qwen VL Generation Tail Loader**.
5. Connect both outputs to **H3 Qwen VL Generate Text (Standalone)**.

The standalone node supports editable system/user prompts, optional image
batches, deterministic or sampled decoding, and Qwen thinking mode. The base
CLIP is preserved; only the temporary tail is explicitly unloaded after
generation.

## Runtime verification

The conditioning checkpoint and enhancer passed actual runtime tests:

- ComfyUI commit: `14b05228cef127ce529bc0c08660770d4af3e9a8`
- `comfy-kitchen==0.2.26`
- `comfy-aimdo==0.4.11`
- PyTorch `2.8.0+cu128`
- NVIDIA GeForce RTX 5090, 32 GB VRAM
- Detected the H3-compatible text-encoder model class
- Finite conditioning output: `(1, 12, 5120)`
- Correct modality-token tags: `(12,)`
- VRAM after encode: about 24.7 GiB allocated / 26.1 GiB reserved
- Standard `CLIPLoader` loaded the conditioning model with exactly 50
  language layers and no final norm or LM head.
- The optional tail path generated a token through all 64 layers, returned the
  exact same CLIP object, then left it at exactly 50 layers with no norm/head.
- The returned CLIP successfully encoded H3 conditioning after the tail
  was unloaded: finite `(1, 4, 5120)` output with token tags.
- The no-tail path was tested with a complete Qwen3-VL-4B ComfyUI CLIP and
  generated successfully without loading the H3 tail.
- The NVFP4/AWQ tail was tested with the matching 0–49 NVFP4/AWQ encoder on an
  NVIDIA RTX PRO 6000 Blackwell. It generated through all 64 language layers,
  unloaded cleanly, left the base at exactly 50 layers, and produced finite
  `(1, 7, 5120)` H3 conditioning afterward.

The local CUDA 12.8 PyTorch build used fallback operations because this
`comfy-kitchen` release recommends CUDA 13.0+ for its optimized kernels. The
encode nevertheless completed successfully. A current ComfyUI environment
with its recommended PyTorch build is preferred.

## Provenance

Pinned upstream source:

```text
repository: llmfan46/Qwen3-VL-32B-Instruct-ultra-uncensored-heretic
revision:   c44b949b30d111666a5ed9851c5cd633ed39b070
```

Both upstream BF16 shards were downloaded at that revision and verified
against their Hugging Face LFS SHA-256 values before packaging.

The source model card reports Heretic v1.2.0 ARA edits targeting
`attn.o_proj` in language layers 31–40. All of those edited layers are inside
H3's retained 0–49 range, so the uncensoring edits are present in this
checkpoint. The source reports 4/100 refusals versus 99/100 for the original,
KL divergence 0.0421, PIQA 92.87%, and MMLU 79.87%.

Abliteration reduces refusal behavior but does not guarantee that every
refusal or safety behavior is removed, and it may affect model quality.

## Conversion

The H3 BF16 package was converted with
[`silveroxides/convert_to_quant`](https://github.com/silveroxides/convert_to_quant)
1.3.1. The successful build used AdamW AdaRound optimization with plateau
early stopping, not simple rounding:

```bash
env PYTHONPATH=.deps python .deps/bin/ctq \
  -i qwen3vl_32b_h3_ultra_uncensored_heretic_bf16.safetensors \
  -o qwen3vl_32b_h3_ultra_uncensored_heretic_int8_convrot.safetensors \
  --int8 \
  --scaling_mode row \
  --convrot \
  --convrot-group-size 256 \
  --comfy_quant \
  --save-quant-metadata \
  --custom-layers '^model\.embed_tokens\.weight$' \
  --custom-type int8 \
  --custom-scaling-mode tensor \
  --custom-simple \
  --exclude-layers '^visual\.' \
  --low-memory \
  --device cuda \
  --manual-seed 42 \
  --num-iter 4000 \
  --optimizer adamw \
  --verbose NORMAL
```

The language block matrices use learned ConvRot. Only the token embedding uses
simple tensorwise INT8 because ComfyUI embedding lookup requires that layout.
The vision tower is retained exactly in BF16.

The generation tail was packaged from the same pinned source and converted
separately:

```bash
env PYTHONPATH=.deps .deps/bin/ctq \
  -i qwen3vl_32b_h3_generation_tail_50_63_bf16.safetensors \
  -o qwen3vl_32b_h3_generation_tail_50_63_int8_convrot.safetensors \
  --int8 \
  --scaling_mode row \
  --convrot \
  --convrot-group-size 256 \
  --comfy_quant \
  --save-quant-metadata \
  --low-memory \
  --device cuda \
  --manual-seed 42 \
  --num-iter 4000 \
  --optimizer adamw \
  --verbose NORMAL \
  --layer-config tools/qwen3vl32b_generation_tail_quant.json \
  --fullmatch
```

The 98 transformer matrices use learned AdamW ConvRot. The LM head uses
simple row-wise ConvRot so the enhancer can compute its 151,936 output rows in
small chunks and avoid a multi-gigabyte temporary dequantization peak.

## Validation

The completed file passed structural validation of every tensor, dtype, shape,
scale, per-layer descriptor, and global quantization metadata entry. All 551
protected BF16 tensors were compared byte-for-byte against the packaged BF16
source and were unchanged.

The tail also passed exact structural validation: the retained 57 BF16
tensors (304,128 bytes) are byte-identical to the source; its 99 INT8 weights,
scales, descriptors, and global quantization metadata all match the declared
layout. Combining the base source topology (902 tensors) with the tail source
topology (156 tensors) reconstructs all 1,058 tensors of the full model with
no key collision.

## Credits

- Uncensored source and evaluations:
  [`llmfan46/Qwen3-VL-32B-Instruct-ultra-uncensored-heretic`](https://huggingface.co/llmfan46/Qwen3-VL-32B-Instruct-ultra-uncensored-heretic)
- Original model:
  [`Qwen/Qwen3-VL-32B-Instruct`](https://huggingface.co/Qwen/Qwen3-VL-32B-Instruct)
- Quantization tooling:
  [`silveroxides/convert_to_quant`](https://github.com/silveroxides/convert_to_quant)

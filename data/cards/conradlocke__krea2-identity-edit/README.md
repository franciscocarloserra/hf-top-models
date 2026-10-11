---
license: other
license_name: krea-2-community-license
license_link: https://krea.ai/krea-2-licensing
base_model: krea/Krea-2-Raw
tags:
- image-editing
- lora
- comfyui
- krea-2
---

# Krea 2 Identity Edit

☕ **[Support on Ko-fi](https://ko-fi.com/conradlocke)** — all tips go straight to GPU compute for future versions.

🧰 **Training code is public:** [krea2edit-trainer](https://github.com/lbouaraba/krea2edit-trainer) — the ai-toolkit extension these LoRAs were trained with, geometry-matched to the nodes, with measured consumer-GPU VRAM requirements.

> **v1.2 (recommended): `krea2_identity_edit_v1_2.safetensors`** — better face
> likeness on restaged subjects and higher fidelity across every skill, from a
> 1024 high-resolution pass (v1.1 had none). New capabilities: **character
> reference-sheet** use and creation, **head / face / eye / person swap**,
> **outpainting**, **inpainting**, and **virtual try-on**. With the v1.2 nodes it
> also gains the **FIT reference geometry** — mismatched source/output aspect
> ratios are handled automatically, so no more stretched or blurry results — and
> a **`ref_boost` fidelity dial** (how hard the edit holds the reference; ~4 is a
> strong-likeness starting point). **Requires the v1.2 nodes.**
>
> Head / face / eye / person swap is trained on **[stablellama](https://huggingface.co/stablellama)**'s
> MIT-licensed [`change_eye_face_head_person`](https://huggingface.co/datasets/stablellama/change_eye_face_head_person)
> dataset — thank you for making it available.
>
> **Low-VRAM variants:** `..._v1_2_r128.safetensors` (0.91GB) and
> `..._v1_2_r64.safetensors` (0.46GB) — SVD rank-reduced from v1.2 (>99% of the
> weight energy retained), near-identical quality.
>
> Prior versions remain available: `..._v1_1.safetensors` (+ its `_r128`/`_r64`
> variants) and the original `..._v1.safetensors`.

**Instruction-based, identity-preserving image editing for Krea 2** (12.9B
single-stream MMDiT). Give it an image and a plain-language instruction; it
edits while preserving what you didn't ask to change — including the person.

*An unofficial community fine-tune of [Krea 2 Raw](https://huggingface.co/krea/Krea-2-Raw).
Not an official Krea product; not affiliated with or endorsed by Krea.ai, Inc.*

**Requires the [ComfyUI-Krea2Edit node pack](https://github.com/lbouaraba/comfyui-krea2edit)** — the LoRA is
trained with dual conditioning (in-context VAE tokens + image-grounded Qwen3-VL
encoding) that stock nodes don't provide. Two ready-made workflows ship with it.

## What it does

- **Person re-staging with likeness:** "create a photo of this person at a
  night market" — same face, same outfit down to individual moles and marks,
  fully relit to the new scene. New camera angles and poses included.
- **Local edits:** recolor, add/remove/replace objects, attribute and outfit
  changes, with near-pixel preservation of the rest of the frame.
- **Replace-with-reference:** "replace the woman with a big orangutan" — the
  replace verb is trained, locality holds.
- **Full-image restyles:** global style with preserved composition.
- **Two-input edits:** scene + person as separate references — "create a photo
  of this man next to the tractor." **Input order matters and is fixed: the
  scene is always image 1 (`source_latent`/`image`), the person is always
  image 2 (`source_latent_b`/`image_b`).** Swapping them sharply degrades
  results (this matches the training layout).
- **Composes with your LoRAs:** character/body/style LoRAs stack on top and
  steer the prior — something closed editors structurally can't offer.

## Recommended settings

| Task type | Model | Steps | CFG |
|---|---|---|---|
| Most edits (add, recolor, restyle, re-stage) | Turbo | 8–12 | 1.0 |
| Removals / large deletions | Raw | 20 | 3.0 |

- **`ref_boost` (v1.2 nodes) is the fidelity dial** — ~4 gives strong face/body
  likeness (the example workflow ships at 4); >10 starts breaking removals; <1
  loosens toward creative freedom.
- **Aspect ratio:** with the v1.2 nodes' `fit` geometry (default) a mismatched
  source/output aspect ratio is handled automatically. On v1/v1.1 weights or
  `crop (legacy)`, match the source AR — otherwise preservation degrades.
- **Generate at ≤2MP** (source bleed / duplication above). **For v1.1
  two-person edits, prefer ~1–1.5MP** — at higher resolutions the two
  identities may blend together; generate lower and upscale instead.
- **Step count is a mild dial too:** fewer steps (8) favor composition
  adherence, more (12) favor face detail; ~10 is a good balance.
- **`grounding_px` is a real dial.** Lower values = stronger edit adherence
  and more uniform scene changes; higher = stronger identity/likeness.
  v1.1's trained range is 384–768 (768 default); 1024 often still works
  nicely. **If you get duplicated/split compositions ("double pictures"),
  lower `grounding_px` — running far above the trained range is the most
  common cause.** (v1's trained range was 512–1536.)
- At CFG > 1, ground the negative too (empty prompt + same image).
- LoRA strength 1.0.

## Known limitations (honest list)

- **Likeness is texture-faithful, proportion-conservative.** Moles, skin
  character, hair, and lighting adapt beautifully; strongly distinctive facial
  *geometry* (unusual nose, eye spacing, face length) regresses toward typical
  proportions. People whose identity lives in texture and structure transfer
  best; geometry-defined faces read as a "close relative."
- **Two-person inputs keep outfits distinct but faces drift toward each
  other.** Workaround that works today: chain single-ref inserts (place person
  A, then a second edit pass adding person B from their reference).
- **Removal works but is not yet reliable** — always use the Raw/CFG 3 recipe;
  expect occasional re-renders instead of deletions.
- **Outfit swaps are hit-or-miss** — changing what a person wears sometimes
  works cleanly and sometimes doesn't apply; reroll or rephrase.
- **Local edits aren't always perfectly local** — add/remove/replace operations
  can sometimes alter other parts of the frame or shift the overall color
  grade (substantially improved in v1.1). If preservation matters, compare
  against the source and reroll.
- Highly unusual visual content (extravagant hairstyles, extreme body types)
  can drift toward the base prior — a subject LoRA stacked on top fixes this.

## License

The LoRA weights are a **Derivative Model of Krea 2** and are distributed under
the **[Krea 2 Community License Agreement](LICENSE.pdf)** (see also `NOTICE`).
Key points for users: commercial use is permitted under the license's revenue
threshold (§2.3, currently <$1M/yr — above that, contact Krea for an enterprise
license); deployments must implement reasonable content moderation (§4.2); AI
disclosure obligations apply where required (§4.3). This repository modifies
the Krea Model as permitted by §3; it is not endorsed by Krea.

Research/portfolio release by a self-funded hobbyist.

## Showcase

All reference people below are themselves AI-generated — no real likenesses.
Prompts are embedded in each image.

### v1.1

![Two references, one scene — the v1.1 flagship](showcase/release_v11_thumb.png)
![v1 vs v1.1 — same scene, same references](showcase/release_v11_9.png)

![Scene + person insert — scene must be image 1](showcase/release_v11_1.png)
![v1 vs v1.1 — instruction adherence and likeness](showcase/release_v11_2.png)
![Outfit replacement — v1.1 executes compound garment instructions](showcase/release_v11_3.png)
![Object removal — v1.1 removes and resolves the pose; v1 ignores the instruction](showcase/release_v11_4.png)
![Object replacement — v1.1 replaces in place; v1 adds instead](showcase/release_v11_5.png)
![grounding_px sweep — high values can duplicate the subject; lower to fix](showcase/release_v11_6.png)
![Recolor — chained edit of a previous output, everything else preserved](showcase/release_v11_7.png)
![Restoration — near out-of-distribution: a single restoration sample exists in the training data](showcase/release_v11_8.png)

### v1 gallery

![Two-reference composition](showcase/release_1.png)
![Outfit swap + scene + weather](showcase/release_2.png)
![Person re-staging with relight](showcase/release_3.png)
![New camera angle](showcase/release_4.png)
![Replace with preservation](showcase/release_5.png)
![Full-image restyle](showcase/release_6.png)
![Object addition](showcase/release_7.png)

---

## Support

This is a solo hobby project, no company or funding behind it, and it stays free and
open either way. If it's useful to you and you'd like to chip in toward GPU compute for
future versions, there's a tip jar: **[ko-fi.com/conradlocke](https://ko-fi.com/conradlocke)**.
Completely optional. Using the model, sharing results, and reporting issues already helps
a lot. Thank you.

---

## Contributors & thanks

This is a solo project, made a lot better by the community. Thank you to:

- **[stablellama](https://huggingface.co/stablellama)** — the MIT-licensed head/face/eye/person
  swap dataset behind those capabilities in v1.2.
- **[CeciliaXCIX](https://huggingface.co/CeciliaXCIX)** — tireless, high-quality community
  support in the discussions.
- **[akashzeno](https://github.com/akashzeno)** — node engineering: diagnosing the ComfyUI
  compatibility break and contributing the regression test.
- **[SubtleShader](https://huggingface.co/SubtleShader)** — testing the training code and
  consumer-GPU feedback.
- **Mark ([sogni.ai](https://sogni.ai))** — support, a GPU-fund donation, and getting the word out.

Want to help? Contributions of training data and node/code work are welcome, see the discussions.

---

## Scope and responsible use

Krea 2 Identity Edit is an identity-preserving character restaging model, trained only on
SFW data. It is not trained on any NSFW concepts, and I have no plans to add or support NSFW
data in current or future versions.

I do not endorse or support using this model to produce non-consensual, harmful, or sexual
imagery of real people, including deepfakes. Please use it responsibly and respect the
consent and likeness of anyone you depict.

w4a8 is a format using 4-bit weights and int8-convrot activations

Requires ComfyUI 0.31.0

---

int8_convrot VAE needs ComfyUI 0.36.0 for maximum speed benefit

It speeds up VAE decode times by ~2x

---

ref lora is the difference between fl2va and ref2va, completely experimental, I don't even know if it has a use case at this point.

---

w6a8 is a format using 6-bit weights and int8-convrot activation, work in progress

## minimax_h3_ref2va_pruned_w6a8_g32.safetensor

https://github.com/Comfy-Org/comfy-kitchen/pull/191

---

## minimax_h3_lynnreal_light_vae_int8_convrot.safetensors

https://huggingface.co/stdstu123/LynnReal-Onmi-light-vae

int8-convrot quant of the pruned light VAE, this is about 1.3x faster for decoding.

---

## PDMD loras

Converted and rank reduced from:

https://huggingface.co/pdmd2026/pdmd_2NFE_lora

https://huggingface.co/pdmd2026/pdmd_4NFE_lora

## DMAD lora

https://huggingface.co/ZhengmingYu/DMAD
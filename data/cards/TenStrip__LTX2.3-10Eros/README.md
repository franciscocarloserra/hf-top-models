---
library_name: diffusers 
pipeline_tag: image-to-video
---


**10 Eros**

v1.5 Changelog: 1.4 and DMD only struggled with one thing, explicit motion and anatomy that was easy to access in version 1.2 and sulphur. All that data is still inside the model; versions 1.2, 1.3, 1.4, and 1.5 are almost all the same model. The difference is how the attn_2 and attn_1 gates are handled. 1.5 is 1.4 with a linear ramp across the gates to open up those explicit details from sulphur like they are on version 1.2's blocks. It still mostly maintains 1.4's base model style prompting and more stable outputs and structure. Because it is a hybrid of a model made for DMD and a model made for LTX distilled lora use, it goes best with a hybrid lora to make use of the motion vareity. Currently the hybrid block DMD lora here seems to work nicely: https://huggingface.co/TenStrip/LTX2.3_DMD_Lora/blob/main/LTX2.3_DMD_hybrid_v2.safetensors or these ones: https://huggingface.co/maximsobolev275/LTX2.3-DMD-Distill-Lora-Hybrids 

1.5 INT8 with hybrid v2 merge: https://huggingface.co/CornLogic/10EROS-INT8/tree/main

1.5 INT8 quality version: https://huggingface.co/LokkenJP/10EROS_1.5_fp8_exp_learned


v1.4 Changelog: Built off 1.3 and bringing back explicit prompting and motion hopefully without any kind of anatomy redraw or negative tendency. Still requires intense prompt refinement. This version is set up to be trained on to fix it into a real base, it doesn't depict anatomy well but it also isn't confused by it which is priority for the first lora passes I'll do. Use lora stacks to improve it if needed.

v1.3 Changelog:
Only designed to work with DMD lora on a workflow like my V5 DMD. https://huggingface.co/TenStrip/LTX2.3-10Eros_Workflows/blob/main/10Eros_10SNodes_I2V_Basic_DMD_V5.json


Full remix aimed at the way the original beta functioned. Any Lora for 2.3 that exists for the attempted concept should be used and is reccomended. For further versions I train my own anatomy patches but I couldn't work with the subtitles and general overexcitement of the older versions going forward. The over-sulphur issues like ghost anatomy and subtitles should be greatly diminished while actual explicit motions and prompting stay at a comparable level. Prompting is 100% more important and should be approached like it is in the base 22b dev model, strict and descriptive and directive.




v1.2 Changelog:
Leveraged tuned connector data to reduce face drift and aid long prompts/director. Also using sulphur EXP weights on top of v1 to hone the most explicit motions. All common issues like mistaken extra anatomy, subtitles, unexpected transitions, etc all still present from v1.


https://huggingface.co/TenStrip/LTX2.3-10Eros_Workflows

Quants:
https://huggingface.co/vantagewithai/LTX2.3-10Eros-GGUF/tree/main

Nodes:
https://github.com/TenStrip/10S-Comfy-nodes

Reliant on https://huggingface.co/SulphurAI/Sulphur-2-base
This is a different merge attempt for ideal I2V use. It uses layer scaled merges of different steps, it's not a straight weight merge. It behaves much nicer than lora load and respects prompt. Prompt should be enhanced, LTX has very little self reasoning and input when it is conditioned, first frame and all following motions, evolutions, and audio must be commanded-you will get nothing if you don't ask it.

BF16 loads as a checkpoint with clip and VAEs.

Fp8_mixed_learned is the better FP8 version and is a full checkpoint as well, quant by S1LV3RC01N.

Kijai split files are for 10Eros FP8 Transformer version, but it has a different structure and variance. That one goes inside diffusion_models: 
https://huggingface.co/Kijai/LTX2.3_comfy/tree/main

!!! Larger distilled Loras will harm the model's fine tune, try the cond_safe ones:
https://huggingface.co/TenStrip/LTX2.3_Distilled_Lora_1.1_Experiments/tree/main


For prompt enhancement, try this foreword in Grok or Uncensored LLM:

Generate a video scene script with a description based on the attached image for an LLM that has a tokenizer that uses interleaved attention to support long-context understanding that is fed into a multimodal video model. Strict specification, follow up to the word: No timestamps. No unnecessary embellishment. Output only plain English text and make it a copy box.

First, describe the image initial scene in concise natural language; subject(s), subject(s) appearance, subject(s) composition and pose, background, and context.

Next, formulate a naturally evolving scenario that would take place describing every moving body part, composition change, and manipulation from the uploaded initial frame that would be reflected in the video models post-latent evolution output. If the image is explicit or sexual in nature, use full anatomical terminology and spice it up slightly with visually representable erotic themes.

Center the prompt around this basic idea: [ concept ]

interweave this dialogue or sound concept into the scene with descriptions of voice tone followed by the lines delivered in quotations, in a temporal sequence between or during motions. Dialogue should be concise and non-rambling as it will take away from video quality: [ dialogue ]

Inside that prompt describe only notable audio and audio queues, both normal and explicit; background noise as well as foley and natural sounds. In a temporal sequence paired with coinciding motions. In the case of absent dialogue or soundscapes and only if background music is fitting; describe a fitting genre and melodic tone with matching mood.

Output only text following above instruction. Follow-up suggestions should be on the topic of expanding or changing motion or dialogue from the output text.
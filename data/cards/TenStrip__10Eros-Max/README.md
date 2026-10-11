---
license: other
license_name: minimax-h3-community-license-agreement
license_link: https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/LICENSE
pipeline_tag: image-text-to-video
base_model:
- MiniMaxAI/MiniMax-H3
tags:
- text-to-video
- image-text-to-video
- image-to-video
- not-for-all-audiences
---

NSFW enabled capable model that still has base model capability and functions. Betas are all testing integrations and bases and are just samples ahead of inegrating sulphur h3 which will be the main data backbone and v1.0.

beta_6 is a built mostly-reference hybrid with a custom turbo meant to mimic how Fastv2 looks and sounds. Samples on 10/3 shift, fully dense or with Fastv2 VSA sparse node settings on multiple samplers like er_sde, euler, LCM, res_multistep, all having some different behaviors with prompt. It's a slow 8-12 step reference model in that configuration. 4step turbo loras can be run on top of it to reduce that. SLA sparsity seems to destroy it, avoid using that on any workflows. It's ideal configuration is with full gates and Fastv2 turbo and VSA gates when they have a reference solution figured out. The attempt to do that is the unstable version which has multiple issues but looks and sounds perfect at 8 steps.

![beta6 vsa sampling](beta6_sampling_example.png)



beta_5 is built with a different normalization technique. It's built off 7 different concept-grouped grafts and consensus merges from over 20 loras, no direct lora merges. Lora credits are on the civit page. It allows for a non-turbo version which is avaliable. The files with TURBO have a hybrid turbo delta fusion baked in, saving 4.2 gigabytes of memory instead of having to load both ref/fl turbos. Other concept loras will also load on top more readily, usually needing lower strength 0.2-0.6. 

Sampling and prompt are the key to quality and success. Non-turbo full step audio will always be better than audio on turbo versions. 

Some working sampling setups:

<ul>
er_sde/beta 4 steps
  
er_sde/beta57 4-6 steps

res_multistep/simple 6-8 steps (my go-to for best motion quality) 

LCM/simple 6-8 steps (best turbo audio)

LCM/beta 4-6 steps

Euler/simple 4-8 steps
</ul>






Int8 versions
https://huggingface.co/cicalooo/10Eros-Max-h3-int8-convrot



beta_4 and beta_3 are corrupted test versions. beta_5 is the only true functional one so far.
No cache or spectrum if doing reference, they cause accuracy loss.
Hybrid model is built on the delta1024 h3 merge.


Regarding the grafts:

Due to a ton of confusion I've let Claude compile a full MD on the grafting, including code and methodology as it was mostly used to create code, document, and manage the graft project while I tested, architected, and mixed. I was keeping that to myself since maybe it'd actually be nice to have something to myself but after a handful of ignorant comments I'm open sourcing everything from it except the scripts themselves. You can hand the md back to claude or any competent agent and graft in the same way or have them explain it until you understand. No more dumbassery allowed now.

This is an evolving project subject to future fixes in H3 training. Training is clearly problematic, and my branch will rely on Sulphur H3 tunes. But I didn't want to wait for all that so I took the data from older models, grafting it in where the model needs it, grafting it to attn layers at a low level that doesn't disturb H3's visual or audio output quality. That's essentialy it.

The standard H3 community license applies. Because this release now carries transferred character from LTX 2.3, Wan 2.2, and Krea 2, the community licenses for those source models apply as well to the portions of character that came from each.
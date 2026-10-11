---
base_model:
  - meituan-longcat/LongCat-Video
license: mit
language:
- en
- zh
library_name: longcat-video-avatar-1.5
tags:
- audio-text-to-video
- audio-image-text-to-video
- audio-driven-video-continuation
- diffusers
- transformers
- avatar
- video-generation
---
# LongCat-Video-Avatar-1.5

<div align="center">
  <img src="assets/logo.png" width="50%" alt="LongCat-Video" />
</div>
<hr>

<div align="center" style="line-height: 1;">
  <a href='https://meigen-ai.github.io/LongCat-Video-Avatar-1.5-Page/'><img src='https://img.shields.io/badge/Project-Page-green'></a>
  <a href='https://github.com/meituan-longcat/LongCat-Video/blob/main/assets/LongCat-Video-Avatar-1.5-Tech-Report.pdf'><img src='https://img.shields.io/badge/Technique-Report-red'></a>
  <a href='https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5'><img src='https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Model-blue'></a>
</div>

<div align="center" style="line-height: 1;">
  <a href='https://github.com/meituan-longcat/LongCat-Flash-Chat/blob/main/figures/wechat_official_accounts.png'><img src='https://img.shields.io/badge/WeChat-LongCat-brightgreen?logo=wechat&logoColor=white'></a>  
  <a href='https://x.com/Meituan_LongCat'><img src='https://img.shields.io/badge/Twitter-LongCat-white?logo=x&logoColor=white'></a>
</div>

<div align="center" style="line-height: 1;">
  <a href='LICENSE'><img src='https://img.shields.io/badge/License-MIT-f5de53?&color=f5de53'></a>
</div>

## 🚀 Model Introduction
We are excited to announce the release of LongCat-Video-Avatar 1.5, an upgraded open-source framework that prioritizes extreme empirical optimization and production-readiness for audio-driven human video generation. Built upon the LongCat-Video foundation model, v1.5 delivers highly stable, commercial-grade avatar video synthesis supporting native tasks including Audio-Text-to-Video (AT2V), Audio-Text-Image-to-Video (ATI2V), and Video Continuation, with seamless compatibility for both single-stream and multi-stream audio inputs.

### Key Features
- 🌟 **Upgraded Audio Encoder (Whisper-Large):**: Replaces Wav2Vec2 with Whisper-Large, yielding significantly smoother and more natural lip dynamics.
- 🌟 **Production-Ready Stability**: Achieves accurate lip-synchronization, full-body temporal stability, and robust long-video generation with strict identity consistency.
- 🌟 **Stylized Domain Generalization**: Robustly generalizes to anime, animals, and complex real-world conditions such as multi-person interactions and object handling.
- 🌟 **Efficient 8-Step Inference**: Advanced DMD2-based step distillation accelerates inference to 8 NFE, balancing cost-effective serving with exceptional visual fidelity.

For more detail, please refer to the comprehensive [***LongCat-Video-Avatar-1.5 Technical Report***](https://github.com/meituan-longcat/LongCat-Video/blob/main/assets/LongCat-Video-Avatar-1.5-Tech-Report.pdf).

## 🌀 Preview Gallery
<!-- <div align="center">
  <video src="https://github.com/user-attachments/assets/00fa63f0-9c4e-461a-a79e-c662ad596d7d" width="2264" height="384"> </video>
</div> -->
LongCat-Video-Avatar 1.5 supports diverse application scenarios including broadcasting, acting, singing, e-commerce marketing, multi-person conversation, animation, and animal characters.
<table align="center" border="1" cellspacing="0" cellpadding="5">
  <tr>
    <td>
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.5/resolve/master/assets/1.mp4" width="300" controls>
      </video>
    </td>
    <td>
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.5/resolve/master/assets/2.mp4" width="300" controls>
      </video>
    </td>
  </tr>
  <tr>
    <td>
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.5/resolve/master/assets/3.mp4" width="300" controls>
      </video>
    </td>
    <td>
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.5/resolve/master/assets/4.mp4" width="300" controls>
      </video>
    </td>
  </tr>
  <tr>
    <td>
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.5/resolve/master/assets/5.mp4" width="300" controls>
      </video>
    </td>
    <td>
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.5/resolve/master/assets/6.mp4" width="300" controls>
      </video>
    </td>
  </tr>
  <tr>
    <td>
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.5/resolve/master/assets/7.mp4" width="300" controls>
      </video>
    </td>
    <td>
      <video src="https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.5/resolve/master/assets/8.mp4" width="300" controls>
      </video>
    </td>
  </tr>
</table>


## 📊 Human Evaluation
We introduce a comprehensive human evaluation benchmark specifically tailored for audio-driven digital human generation. The benchmark encompasses 6 application scenarios (News Broadcasting, Knowledge Education, Daily Life, Entertainment, Singing, Commercial Promotion), 2 languages (Chinese/English), and 2 visual styles (Realistic/Animated), yielding a total of 508 image-audio source pairs. Evaluation Methodology:(1)Subjective Track: 770 crowdsourced evaluators rated each generated video on a 1–5 human-likeness scale, yielding 13,240 judgments. (2) Objective Track: 10 domain experts conducted structured quality analysis across four dimensions: Physical Rationality, Harmony (Audio-Visual Coordination), Temporal Stability, and Identity Consistency. 

The results are in the following figure: (a)  Expert-level objective quality evaluation across four dimensions  (b)Subjective human-likeness comparison with leading commercial models.
<div align="center">
  <img src="assets/fig.png" width="90%" alt="LongCat-Video-Avatar" />
</div>

## 💡 Quick Start
Clone the repo

```shell
git clone --single-branch --branch main https://github.com/meituan-longcat/LongCat-Video
cd LongCat-Video
```

Install dependencies

```shell
# create conda environment
conda create -n longcat-video python=3.10
conda activate longcat-video

# install torch (configure according to your CUDA version)
pip install torch==2.6.0+cu124 torchvision==0.21.0+cu124 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cu124

# install flash-attn-2
pip install ninja
pip install psutil
pip install packaging
pip install flash_attn==2.7.4.post1

# install other requirements
pip install -r requirements.txt

# install longcat-video-avatar requirements
conda install -c conda-forge librosa
conda install -c conda-forge ffmpeg
pip install -r requirements_avatar.txt
```

FlashAttention-2 is enabled in the model config by default; you can also change the model config to use FlashAttention-3 or xformers.

### ⛽️ Model Download

| Models | Description | Download Link |
| --- | --- | --- |
| LongCat-Video | foundational video generation | 🤗 [Huggingface](https://huggingface.co/meituan-longcat/LongCat-Video) |
| LongCat-Video-Avatar-1.5 | single- and multi-character audio-driven video generation  | 🤗 [Huggingface](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5) |

Download models using huggingface-cli:
```shell
pip install "huggingface_hub[cli]"
huggingface-cli download meituan-longcat/LongCat-Video --local-dir ./weights/LongCat-Video
huggingface-cli download meituan-longcat/LongCat-Video-Avatar-1.5 --local-dir ./weights/LongCat-Video-Avatar-1.5
```

### 🔑 Quick Inference
Usage Tips
> - **Lip synchronization accuracy:** Audio CFG works optimally between 3–5. Increase the audio CFG value for better synchronization.
> - **Prompt Enhancement:** Longer, more descriptive prompts yield better consistency and naturalness than short ones. We recommend including rich details such as character appearance, actions, and scene context (e.g., *"A young woman with long black hair is speaking and smiling, wearing a white blouse, sitting in a bright café"*) for best results.
> - **Mitigate repeated actions:** Setting the reference image index（--ref_img_index, default to 10） between 0 and 24 ensures better consistency; setting it to 30 helps reduce repeated actions. Additionally, increasing the mask frame range (--mask_frame_range, default to 3) can further help mitigate repeated actions, but excessively large values may introduce artifacts.
> - **Super resolution:** Our model is compatible with both 480P and 720P, which can be controlled via --resolution.
> - **Dual-Audio Modes:** Merge mode (set audio_type to para) requires two audio clips of equal length, and the resulting audio is obtained by summing the two clips; Concatenation mode (set audio_type to add) does not require equal-length inputs, and the resulting audio is formed by sequentially concatenating the two clips with silence padding for any gaps, where by default person1 speaks first and person2 speaks afterward.
> - **Model versions:** `--model_type avatar-v1.0` uses wav2vec2 audio encoder (default); `--model_type avatar-v1.5` uses Whisper-large-v3 audio encoder for better lip sync quality.
> - **Distillation mode:** Add `--use_distill` to enable distillation sampling (fewer steps, faster inference). This is **required** when using `--model_type avatar-v1.5`.
> - **INT8 quantization:** Add `--use_int8` to load the INT8 quantized DiT model for reduced VRAM usage. Only supported with `--model_type avatar-v1.5`.


#### Single-Person Animation 
```shell
# Audio-Text-to-Video
torchrun --nproc_per_node=2 run_demo_avatar_single_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.5 --stage_1=at2v --input_json=assets/avatar/single_example_1.json --use_distill --model_type avatar-v1.5 --use_int8

# Audio-Image-to-Video
torchrun --nproc_per_node=2 run_demo_avatar_single_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.5  --stage_1=ai2v --input_json=assets/avatar/single_example_1.json --use_distill --model_type avatar-v1.5 --use_int8

# Audio-Text-to-Video and Video-Continuation
torchrun --nproc_per_node=2 run_demo_avatar_single_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.5 --stage_1=at2v --input_json=assets/avatar/single_example_1.json --num_segments=5 --ref_img_index=10 --mask_frame_range=3 --use_distill --model_type avatar-v1.5 --use_int8

# Audio-Image-to-Video and Video-Continuation
torchrun --nproc_per_node=2 run_demo_avatar_single_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.5 --stage_1=ai2v --input_json=assets/avatar/single_example_1.json --num_segments=5 --ref_img_index=10 --mask_frame_range=3 --use_distill --model_type avatar-v1.5 --use_int8
```

#### Multi-Person Animation 
```shell
# Audio-Image-to-Video
torchrun --nproc_per_node=2 run_demo_avatar_multi_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.5 --input_json=assets/avatar/multi_example_1.json --use_distill --model_type avatar-v1.5 --use_int8

# Audio-Image-to-Video and Video-Continuation
torchrun --nproc_per_node=2 run_demo_avatar_multi_audio_to_video.py --context_parallel_size=2 --checkpoint_dir=./weights/LongCat-Video-Avatar-1.5 --input_json=assets/avatar/multi_example_1.json --num_segments=5 --ref_img_index=10 --mask_frame_range=3 --use_distill --model_type avatar-v1.5 --use_int8
```

## ⚖️ License Agreement

The **model weights** are released under the **MIT License**. 

Any contributions to this repository are licensed under the MIT License, unless otherwise stated. This license does not grant any rights to use Meituan trademarks or patents. 

See the [LICENSE](LICENSE) file for the full license text.


## 🧠 Usage Considerations 
This model has not been specifically designed or comprehensively evaluated for every possible downstream application. 

Developers should take into account the known limitations of large language models, including performance variations across different languages, and carefully assess accuracy, safety, and fairness before deploying the model in sensitive or high-risk scenarios. 
It is the responsibility of developers and downstream users to understand and comply with all applicable laws and regulations relevant to their use case, including but not limited to data protection, privacy, and content safety requirements. 

Nothing in this Model Card should be interpreted as altering or restricting the terms of the MIT License under which the model is released. 

## 📖 Citation
We kindly encourage citation of our work if you find it useful.

```
@misc{meituanlongcatteam2025longcatvideoavatar15technicalreport,
      title={LongCat-Video-Avatar 1.5 Technical Report}, 
      author={Meituan LongCat Team},
      year={2026},
      eprint={},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={}, 
}
```

## 🙏 Acknowledgements

We would like to thank the contributors to the [Wan](https://huggingface.co/Wan-AI), [UMT5-XXL](https://huggingface.co/google/umt5-xxl), [Diffusers](https://github.com/huggingface/diffusers) and [HuggingFace](https://huggingface.co) repositories, for their open research.


## 📞 Contact
Please contact us at <a href="mailto:longcat-team@meituan.com">longcat-team@meituan.com</a> or join our WeChat Group if you have any questions.
---
license: apache-2.0
base_model:
- Qwen/Qwen-Image-Edit-2509
pipeline_tag: image-to-image
tags:
- lora
library_name: diffusers
---
import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="wavespeed",
    api_key=os.environ["HF_TOKEN"],
)

with open("cat.png", "rb") as image_file:
   input_image = image_file.read()

# output is a PIL.Image object
image = client.image_to_image(
    input_image,
    prompt="Turn the cat into a tiger.",
    model="dx8152/Qwen-Edit-2509-Multiple-angles",
)
This model is trained (code-free!) on ModelScope. Thanks to ModelScope team for providing the training infra:

https://www.modelscope.cn/aigc/modelTraining


-------


Updated 2025/11/2: Some people mentioned that the model has an unstable consistency issue. I have re-uploaded a version with more training iterations, hoping to fix the consistency problem.

Welcome everyone to use Lora of Qwen-Edit-2509, its performance is very amazing！


There are no trigger words. You can control the camera to move up, down, left, and right, as well as rotate it to the left and right. You can also look down or up. The camera can be changed to a wide-angle or close-up shot.

Online running link： www.runninghub.ai/post/1985311204883243009?inviteCode=rh-v1331

This is a user guide: 

YouTube：https://youtu.be/UGdW8W1MqW8

Blibili：https://www.bilibili.com/video/BV1oi1gBBEZV/

“
将镜头向前移动（Move the camera forward.）
将镜头向左移动（Move the camera left.）
将镜头向右移动（Move the camera right.）
将镜头向下移动（Move the camera down.）
将镜头向左旋转45度（Rotate the camera 45 degrees to the left.）
将镜头向右旋转45度（Rotate the camera 45 degrees to the right.）
将镜头转为俯视（Turn the camera to a top-down view.）
将镜头转为广角镜头（Turn the camera to a wide-angle lens.）
将镜头转为特写镜头（Turn the camera to a close-up.）
...
There are many possibilities; you can try them yourself.
”
------

Instructions: Download the lora file to the models/loras folder.

You also need this lora and use them together: https://huggingface.co/lightx2v/Qwen-Image-Lightning/tree/main


For communication/cooperation, you can join the discord group to communicate： https://discord.gg/yVAVa43mWk

If these resources are helpful to you, or if you use them for business purposes, please buy me a coffee. Thank you for supporting original content! PayPal: Daniel8152



![效果图](https://cdn-uploads.huggingface.co/production/uploads/64461e86ab86b035add67e41/tCsqZOi1YQtSj9qBKfbK1.jpeg)
![效果图2](https://cdn-uploads.huggingface.co/production/uploads/64461e86ab86b035add67e41/AC0KJK5F5gETFy1M-ZIKj.jpeg)
![效果图3](https://cdn-uploads.huggingface.co/production/uploads/64461e86ab86b035add67e41/cr0XKCaPVLlcFDjRbQNdc.jpeg)
I saw some people wanted to see a comparison between LoRa and the model's inherent capabilities, so I conducted a test. The trained model is indeed more powerful and intelligent, while the original model already possessed certain abilities. It's very powerful, which is why we love this model, and precisely because of this, we need to explore its potential.
![对比图](https://cdn-uploads.huggingface.co/production/uploads/64461e86ab86b035add67e41/yFk1v6tQuOV0jlGUjpU2S.jpeg)
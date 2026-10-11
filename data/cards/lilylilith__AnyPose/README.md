---
license: apache-2.0
base_model:
- Qwen/Qwen-Image-Edit-2511
tags:
- LoRA
- lora
- Qwen-Image-Edit
- Qwen-Image
pipeline_tag: image-to-image
library_name: diffusers
---


<p align="center">
    

<img src="https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/fwiBrNZ0XEU9LouwbbFga.png" width="600"/>

<p>
<p align="center">
           <a href="https://civitai.com/user/lilylilith"><b>Civitai</b></a>&nbsp&nbsp | &nbsp&nbsp☕️ <a href="https://ko-fi.com/lilllithhhhh">Ko-fi (support my work)</a>&nbsp&nbsp

<img src="https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/ZMr69PCuSIKuCyeMJ0TS2.png" width="1600"/>

# Introduction      

Creating poses for [Qwen Image Edit (2511)](https://huggingface.co/Qwen/Qwen-Image-Edit-2511) or its variants can be difficult. Even with openpose being baked into the model, it can still look like something is off with the result, such as the depth being incorrect or the pose not fully matching the character, with distortions that you wouldn't expect. Additionally, creating them by hand can take a bit too long, especially if you are going the blender openpose rig route. What if instead you could just skip openpose entirely and write a simple (but albeit lengthy) prompt to copy the pose of any image on your computer?

Well, this is what the AnyPose LoRAs attempt to do. Made in mind with the new [Qwen Image Edit 2511 lightning LoRA](https://huggingface.co/lightx2v/Qwen-Image-Edit-2511-Lightning) for fast inference, with just a single reference image as a pose guide, you can pilot any image to follow that pose. No control net needed. 

# Fast Start; TL;DR; Aint Reading All of That?

Use 4-step lightning LoRA for Qwen Image Edit 2511. Set both of the AnyPose LoRA weights (base & helper) strength to 0.7. Upload two images, one with the initial input character, and another with the pose you want copied to the first character. Use the following prompt, "Make the person in image 1 do the exact same pose of the person in image 2. Changing the style and background of the image of the person in image 1 is undesirable, so don't do it. The new pose should be pixel accurate to the pose we are trying to copy. The position of the arms and head and legs should be the same as the pose we are trying to copy. Change the field of view and angle to match exactly image 2. Head tilt and eye gaze pose should match the person in image 2." If additional context is needed (such as clothing that is unseen from the model), prompt it in at the end. Background not staying the same as the initial input image? Append the following to the end "Remove the background of image 2, and replace it with the background of image 1."

# Showcase

AnyPose works with simple poses, like T or A poses,


![tposeExample](https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/21W48KegxqP7JvMTPWg9W.png#center)

or more complex poses like many yoga poses:


![yogaExample](https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/5gkuKBKxTe3NUf_t7_6PI.png#center)


# Important Notes:

Now there are some notes that you must know about before using this. The creation of the dataset for LoRA sounds very intuitive, right? Just pose two characters in the same pose (I used Blender to pose dense 3d characters in various precocious poses that I knew Qwen Edit wouldn't understand ((think handstands, bridges, bends, etc)); so this was easy to do. 

However it was very hard to decide the method on how the final processed image should look like. Should the final output be the same scene, but with the new pose? Or should the final composite be instead with the character "swapped in" with the other character, in the second image's scene? The first one sounds the most intuitive, yet it comes with some drawbacks such as hallucinated backdrops inpainted in. Yet the second option makes it a lot less useful if you just wanted to change the pose of the person in the current scene. It's just very unintuitive. So I tried to do both.

In retrospect I don't think it was the best choice, as there are times where the person replaces the person doing the pose in the second image, inheriting its background, which is an unintended consequence; or elements of the previous scene crop into the current one. Many times though, it does keep the same scene. This doesn't sound good for a consistency point of view, and it can be frustraiting no doubt, where it should "just work". The reality is that it is just very nuanced. Despite that, it existing brings major advantages, such as it will always fill in the missing areas.

For example, if you want to pose a character who's full body is not shown, such as the lower half of their body, AnyPose will automatically fill in the 'unknown' areas of the image with a blend of the original image:


![autofill_](https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/_ZNniwEfPz0hbsxZdyeOf.png#center)


In order to fix this, you can append a prompt at the end of the trigger prompt in order to add or remove elements from the output. For example, for the unknown areas, you can say something like "The woman in image 1 is wearing white leggings." in order to tell the model what she is wearing:


![context](https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/WuyFYWuAiajm_yXzYho6C.png#center)

However, even thought this method works, let it be known that the best way to use AnyPose is to have the initial character's full body shown (and additionally the full environment shown such as the floor) in the initial image, so that the resulting pose becomes consistent and qwen edit doesn't have to guess.)

Another thing to point out that you are probably thinking right now: The environment changed. In this example, I wanted the pose to be done in the original backdrop of the initial image; I did not want the character swapped into the other images backdrop. How do we bring back the other image's backdrop? Well, it is easy. All we have to do is to prompt to swap the background of the second image with the first. For example, we can additionally append "Remove the background of image 2, and replace it with the background of image 1." in order to bring back the original backdrop:


![context_2](https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/u1tTEFry1mkLGjes1ifzx.png#center)

You can append a prompt to the end to pretty much rectify any issue that crops up. Unchanged background? Prompt it in. No flooring or character is floating? Prompt it in. Character is holding something that they shouldn't? Remove it via a prompt. Character has a feature that shouldn't be there such as long hair, different colored hair, or something similar of that sort? Remove it via a prompt.

# Where it fails

Because it was trained on primarily 3D poses of models via Blender, as it is the most convienient way to create such a dataset, it has a major downside to being a bit terrible or not even functioning for more 2d or flat artstyles such as a celshaded or pixel artstyle:


![fails_pixel](https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/ivBDdVQNie5toebVzcfi3.png#center)

Extremely complex poses such as hyper-technical yoga poses don't fair so well for AnyPose:

![fails_technical](https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/90NYMFJVZ5oNmcbR6KlJM.png)

It tries its best but it is quite obvious that the output is not good. 

Additionally, having more than one character in the initial input image or the reference pose trips up AnyPose:

![fails_multiple_people](https://cdn-uploads.huggingface.co/production/uploads/638aeb590f10aa3064f42a80/IiYAl7u-fKfcZFXByZw17.png#center)

A V2 version is planned to help fix some of these issues, as well as including support for more unique/non-humanoid characters, and improving the overall consistency of the pose transfer.

Feel free to experiment with the weights! More experimentation is always encouraged! :)
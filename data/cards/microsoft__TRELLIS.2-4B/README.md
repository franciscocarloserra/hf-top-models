---
license: mit
pipeline_tag: image-to-3d
library_name: trellis2
language:
- en
---

# TRELLIS.2: Native and Compact Structured Latents for 3D Generation

**Model Name:** TRELLIS.2-4B

**Paper:** [https://arxiv.org/abs/2512.14692](https://arxiv.org/abs/2512.14692)

**Repository:** [https://github.com/microsoft/TRELLIS.2](https://github.com/microsoft/TRELLIS.2)

**Project Page:** [https://microsoft.github.io/trellis.2](https://microsoft.github.io/TRELLIS.2)

## Introduction

**TRELLIS.2** is a state-of-the-art large 3D generative model designed for high-fidelity **image-to-3D** generation. It leverages a novel "field-free" sparse voxel structure termed **O-Voxel** and a large-scale flow-matching transformer (4 Billion parameters).

Unlike previous methods that rely on iso-surface fields (e.g., SDF, Flexicubes) which struggle with open surfaces or non-manifold geometry, TRELLIS can reconstruct and generate **arbitrary 3D assets** with complex topologies, sharp features, and full Physical-Based Rendering (PBR) materials—including transparency/translucency.

## Model Details

*   **Developed by:** Jianfeng Xiang, Xiaoxue Chen, Sicheng Xu, Ruicheng Wang, Zelong Lv, Yu Deng, Hongyuan Zhu, Yue Dong, Hao Zhao, Nicholas Jing Yuan, Jiaolong Yang
*   **Model Type:** Flow-Matching Transformers with Sparse Voxel based 3D VAE
*   **Parameters:** 4 Billion
*   **Input:** Single Image
*   **Output:** 3D Asset (Mesh with PBR Materials)
*   **Resolution:** Varies from 512³ to 1536³ (Voxel Grid Resolution)

## Key Features

*   **O-Voxel Representation:** An omni-voxel structure that encodes both geometry and appearance. It supports:
    *   **Arbitrary Topology:** Handles open surfaces, non-manifold geometry, and fully-enclosed structures without lossy conversion.
    *   **Rich Appearance:** Captures PBR attributes (including opacity for translucent surfaces) aligned with geometry.
    *   **Efficiency:** Instant optimization-free bidirectional conversion between meshes and O-Voxels (ms to seconds).
*   **High-Resolution Generation:** The model is trained to generate fully textured assets at **up to 1536³ resolution**.
*   **High-Fidelity while Compact Latent Space:** Utilizes a Sparse 3D VAE with **16× spatial downsampling**, encoding a 1024³ asset into only ~9.6K latent tokens with negligible perceptual degradation.
*   **Shape-conditioned Texture Generation:** Generates textures for input 3D meshes and reference images.
*   **State-of-the-Art Speed:** Inference is highly efficient; see table below.

## Inference Speed (NVIDIA H100 GPU)

| Resolution | Time |
| :--- | :--- |
| 512³ | ~3 seconds |
| 1024³ | ~17 seconds |
| 1536³ | ~60 seconds |

## Requirements
- **System**: The model is currently tested only on **Linux**.
- **Hardware**: An NVIDIA GPU with at least 24GB of memory is necessary. The code has been verified on NVIDIA A100 and H100 GPUs.  
- **Software**:   
  - The [CUDA Toolkit](https://developer.nvidia.com/cuda-toolkit-archive) is needed to compile certain packages. Recommended version is 12.4.  
  - [Conda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install) is recommended for managing dependencies.  
  - Python version 3.8 or higher is required. 

## Known Limitations

*   **Geometric Artifacts (Small Holes):** While O-Voxels handle complex topology well, the generated raw meshes may occasionally contain small holes or minor topological discontinuities. For applications requiring strictly watertight geometry (e.g., 3D printing), we provide accompanying mesh post-processing scripts, such as hole-filling algorithms.
*   **Base Model w/o Alignment:** TRELLIS.2-4B is a pre-trained foundation model. It has **not** been aligned with human preferences (e.g., via RLHF) or fine-tuned for specific aesthetic standards. Consequently, the outputs reflect the distribution of the training data and may vary in style; users may need to experiment with inputs to achieve the desired artistic result.

We are actively working on improving the model and addressing these limitations.

## Usage

*Note: Please refer to the official [GitHub Repository](https://github.com/microsoft/TRELLIS.2) for installation instructions and dependencies.*

```python
import os
os.environ['OPENCV_IO_ENABLE_OPENEXR'] = '1'
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"  # Can save GPU memory
import cv2
import imageio
from PIL import Image
import torch
from trellis2.pipelines import Trellis2ImageTo3DPipeline
from trellis2.utils import render_utils
from trellis2.renderers import EnvMap
import o_voxel

# 1. Setup Environment Map
envmap = EnvMap(torch.tensor(
    cv2.cvtColor(cv2.imread('assets/hdri/forest.exr', cv2.IMREAD_UNCHANGED), cv2.COLOR_BGR2RGB),
    dtype=torch.float32, device='cuda'
))

# 2. Load Pipeline
pipeline = Trellis2ImageTo3DPipeline.from_pretrained("microsoft/TRELLIS.2-4B")
pipeline.cuda()

# 3. Load Image & Run
image = Image.open("assets/example_image/T.png")
mesh = pipeline.run(image)[0]
mesh.simplify(16777216) # nvdiffrast limit

# 4. Render Video
video = render_utils.make_pbr_vis_frames(render_utils.render_video(mesh, envmap=envmap))
imageio.mimsave("sample.mp4", video, fps=15)

# 5. Export to GLB
glb = o_voxel.postprocess.to_glb(
    vertices            =   mesh.vertices,
    faces               =   mesh.faces,
    attr_volume         =   mesh.attrs,
    coords              =   mesh.coords,
    attr_layout         =   mesh.layout,
    voxel_size          =   mesh.voxel_size,
    aabb                =   [[-0.5, -0.5, -0.5], [0.5, 0.5, 0.5]],
    decimation_target   =   1000000,
    texture_size        =   4096,
    remesh              =   True,
    remesh_band         =   1,
    remesh_project      =   0,
    verbose             =   True
)
glb.export("sample.glb", extension_webp=True)
```

## Citation

If you find this model useful for your research, please cite our work:

```
@article{
    xiang2025trellis2,
    title={Native and Compact Structured Latents for 3D Generation},
    author={Xiang, Jianfeng and Chen, Xiaoxue and Xu, Sicheng and Wang, Ruicheng and Lv, Zelong and Deng, Yu and Zhu, Hongyuan and Dong, Yue and Zhao, Hao and Yuan, Nicholas Jing and Yang, Jiaolong},
    journal={Tech report},
    year={2025}
}
```

## License

This model is released under the MIT License. The code and dataset are publicly released to facilitate reproduction and further research.
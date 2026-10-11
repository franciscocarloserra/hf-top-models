---
license: gemma
library_name: transformers
pipeline_tag: image-text-to-text
extra_gated_heading: Access Gemma on Hugging Face
extra_gated_prompt: To access Gemma on Hugging Face, you’re required to review and
  agree to Google’s usage license. To do this, please ensure you’re logged in to Hugging
  Face and click below. Requests are processed immediately.
extra_gated_button_content: Acknowledge license
---

# TranslateGemma model card

**Resources and Technical Documentation**:

+   [Technical Report](https://arxiv.org/pdf/2601.09012) 
+   [Responsible Generative AI Toolkit](https://ai.google.dev/responsible)
+   [TranslateGemma on Kaggle](https://www.kaggle.com/models/google/translategemma/)
+   [TranslateGemma on Vertex Model Garden](https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/translategemma)

**Terms of Use**: [Terms](https://ai.google.dev/gemma/terms)  
**Authors**: Google Translate

## Model Information

Summary description and brief definition of inputs and outputs.

### Description

TranslateGemma is a family of lightweight, state-of-the-art open translation models from Google, based on the Gemma 3 family of models.   
TranslateGemma models are designed to handle translation tasks across 55 languages. Their relatively small size makes it possible to deploy them in environments with limited resources such as laptops, desktops or your own cloud infrastructure, democratizing access to state of the art translation models and helping foster innovation for everyone.

### Inputs and outputs

+   **Input:** 

    +   Text string, representing the text to be translated
    +   Images, normalized to 896 x 896 resolution and encoded to 256 tokens each
    +   Total input context of 2K tokens

+   **Output:** 

    +   Text translated into the target language

### Usage

TranslateGemma is designed to work with a specific chat template that supports direct translation of a text input, or text-extraction-and-translation from an image input. This chat template has been implemented with Hugging Face transformers' [chat templating](https://huggingface.co/docs/transformers/en/chat_templating) system and is compatible with the [apply_chat_template() function](https://huggingface.co/docs/transformers/en/chat_templating#using-applychattemplate) provided by the [Gemma tokenizer](https://huggingface.co/docs/transformers/en/model_doc/gemma#transformers.GemmaTokenizer) and [Gemma 3 processor](https://huggingface.co/docs/transformers/en/model_doc/gemma3#transformers.Gemma3Processor). Notable differences from other models' chat templates include:

+   TranslateGemma supports only User and Assistant roles. 
+   TranslateGemma's User role is highly opinionated:

    +   The content property must be provided as a list with exactly one entry.
    +   The content list entry must provide:

        +   A "type" property where the value must be either "text" or "image". 
        +   A "source_lang_code" property as a string
        +   A "target_lang_code" property as a string

    +   The content list entry should provide one of these:

        +   A "url" property, if the entry's type is "image", from which the image will be loaded
        +   A "text" property, if the entry's type is "text", containing only the text to translate

    +   The "source_lang_code" and "target_lang_code" property values can take one of one of two forms: 

        +   An [ISO 639-1 Alpha-2 language code](https://en.wikipedia.org/wiki/ISO_639-1), e.g., `en`; or 
        +   A "regionalized" variant as an ISO 639-1 Alpha-2 language code and an [ISO 3166-1 Alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) pair separated by a dash or an underscore, e.g., en_US` or `en-GB, similar to the [Unicode Common Locale Data Repository format](https://cldr.unicode.org/). 

    +   If the "source_lang_code" and "target_lang_code" property value is not supported by the model, an error will be raised when the template is applied. 

Additionally, TranslateGemma may respond well to other prompting techniques to support use cases that go beyond the provided chat template, such as Automatic Translation Post-Editing. As these are not officially supported, they should be crafted manually using the special control tokens and structures specified in the [Gemma 3 Technical Report](https://arxiv.org/abs/2503.19786), and sent directly to the tokenizer or processor instead of using the apply_chat_template() function. The TranslateGemma team is interested in hearing about your experiences with alternate prompts, please reach out with any questions and feedback.

#### With Pipelines

```python
from transformers import pipeline
import torch

pipe = pipeline(
    "image-text-to-text",
    model="google/translategemma-4b-it",
    device="cuda",
    dtype=torch.bfloat16
)

# ---- Text Translation ----
messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "source_lang_code": "cs",
                "target_lang_code": "de-DE",
                "text": "V nejhorším případě i k prasknutí čočky.",
            }
        ],
    }
]

output = pipe(text=messages, max_new_tokens=200)
print(output[0]["generated_text"][-1]["content"])

# ---- Text Extraction and Translation ----
messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "image",
                "source_lang_code": "cs",
                "target_lang_code": "de-DE",
                "url": "https://c7.alamy.com/comp/2YAX36N/traffic-signs-in-czech-republic-pedestrian-zone-2YAX36N.jpg",
            },
        ],
    }
]

output = pipe(text=messages, max_new_tokens=200)
print(output[0]["generated_text"][-1]["content"])

```

#### With direct initialization

```python
import torch
from transformers import AutoModelForImageTextToText, AutoProcessor

model_id = "google/translategemma-4b-it"
processor = AutoProcessor.from_pretrained(model_id)
model = AutoModelForImageTextToText.from_pretrained(model_id, device_map="auto")


# ---- Text Translation ----
messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "source_lang_code": "cs",
                "target_lang_code": "de-DE",
                "text": "V nejhorším případě i k prasknutí čočky.",
            }
        ],
    }
]

inputs = processor.apply_chat_template(
    messages, tokenize=True, add_generation_prompt=True, return_dict=True, return_tensors="pt"
).to(model.device, dtype=torch.bfloat16)
input_len = len(inputs['input_ids'][0])

with torch.inference_mode():
    generation = model.generate(**inputs, do_sample=False)

generation = generation[0][input_len:]
decoded = processor.decode(generation, skip_special_tokens=True)
print(decoded)

# ---- Text Extraction and Translation ----
messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "image",
                "source_lang_code": "cs",
                "target_lang_code": "de-DE",
                "url": "https://c7.alamy.com/comp/2YAX36N/traffic-signs-in-czech-republic-pedestrian-zone-2YAX36N.jpg",
            },
        ],
    }
]

inputs = processor.apply_chat_template(
    messages, tokenize=True, add_generation_prompt=True, return_dict=True, return_tensors="pt"
).to(model.device, dtype=torch.bfloat16)

with torch.inference_mode():
    generation = model.generate(**inputs, do_sample=False)

generation = generation[0][input_len:]
decoded = processor.decode(generation, skip_special_tokens=True)
print(decoded)

```

### Citation

```
@article{gemmatranslate2026,
    title={{TranslateGemma Technical Report}},
    url={https://arxiv.org/pdf/2601.09012},
    publisher={Google DeepMind},
    author={{Google Translate Research Team} and
	Finkelstein, Mara and
	Caswell, Isaac and
	Domhan, Tobias and
	Peter, Jan-Thorsten and
	Juraska, Juraj and
	Riley, Parker and
	Deutsch, Daniel and
	Dilanni, Cole and
	Cherry, Colin and
	Briakou, Eleftheria and
	Nielsen, Elizabeth and
	Luo, Jiaming and
	Agrawal, Sweta and
	Xu, Wenda and
	Kats, Erin and
	Jaskiewicz, Stephane and
	Freitag, Markus and
	Vilar, David
},
    year={2026}
}
```


## Model Data

Data used for model training and how the data was processed.

### Training Dataset

The models were fine-tuned from the original Gemma 3 checkpoints using parallel data from a wide variety of sources. The TranslateGemma models used 4.3 billion tokens during SFT and 10.2 million tokens during the reinforcement learning phase. The key components were:

+   Monolingual web documents paired with high-quality translations into a variety of languages, generated by Gemini.
+   Publicly available parallel documents.

## Implementation Information

Details about the model internals.

### Hardware

TranslateGemma was trained using [Tensor Processing Unit (TPU)](https://cloud.google.com/tpu/docs/intro-to-tpu) hardware (TPUv4p, TPUv5p and TPUv5e). TPUs, designed specifically for matrix operations common in machine learning, offer several advantages in this domain:

+   Performance: TPUs are specifically designed to handle the massive computations involved in training VLMs. They can speed up training considerably compared to CPUs.
+   Memory: TPUs often come with large amounts of high-bandwidth memory, allowing for the handling of large models and batch sizes during training. This can lead to better model quality.
+   Scalability: TPU Pods (large clusters of TPUs) provide a scalable solution for handling the growing complexity of large foundation models. You can distribute training across multiple TPU devices for faster and more efficient processing.
+   Cost-effectiveness: In many scenarios, TPUs can provide a more cost-effective solution for training large models compared to CPU-based infrastructure, especially when considering the time and resources saved due to faster training.
+   These advantages are aligned with [Google's commitments to operate sustainably](https://sustainability.google/operating-sustainably/).

### Software

Training was done using [JAX](https://github.com/jax-ml/jax) and [ML Pathways](https://blog.google/technology/ai/introducing-pathways-next-generation-ai-architecture/). JAX allows researchers to take advantage of the latest generation of hardware, including TPUs, for faster and more efficient training of large models. ML Pathways is Google's latest effort to build artificially intelligent systems capable of generalizing across multiple tasks. This is specially suitable for foundation models, including large language models like these ones.  
Together, JAX and ML Pathways are used as described in the [paper about the Gemini family of models](https://goo.gle/gemma2report); _"the 'single controller' programming model of Jax and Pathways allows a single Python process to orchestrate the entire training run, dramatically simplifying the development workflow."_

## Evaluation

Model evaluation metrics and results.

### Benchmark Results

These models were evaluated against a large collection of different datasets and metrics to cover different aspects of text generation.

|                                                | **4B** | **12B** | **27B** |
| ---------------------------------------------- | ------ | ------- | ------- |
| **WMT24++ (55 langs)**                         |        |         |         |
|     MetricX ↓                                  | 5.32   | 3.60    | 3.09    |
|     Comet ↑                                    | 81.6   | 83.5    | 84.4    |
| **WMT25 (10 langs)**                           |        |         |         |
| **    **MQM ↓                                  | N/A    | 7.94    | 5.86    |
| **Vistra* (4 langs)**                          |        |         |         |
| **    **MetricX ↓                              | 2.57   | 2.08    | 1.57    |

* The Vistra corpus was filtered for images that contain a single text.

## Ethics and Safety

Ethics and safety evaluation approach and results.

### Evaluation Approach

Our evaluation methods include structured evaluations and internal red-teaming testing of relevant content policies. Red-teaming was conducted by a number of different teams, each with different goals and human evaluation metrics. These models were evaluated against a number of different categories relevant to ethics and safety, including:

+   **Child Safety**: Evaluation of text-to-text and image to text prompts covering child safety policies, including child sexual abuse and exploitation.
+   **Content Safety:** Evaluation of text-to-text and image to text prompts covering safety policies including, harassment, violence and gore, and hate speech.
+   **Representational Harms**: Evaluation of text-to-text and image to text prompts covering safety policies including bias, stereotyping, and harmful associations or inaccuracies.

### Evaluation Results

For all areas of safety testing, we saw major improvements in the categories of child safety, content safety, and representational harms relative to previous Gemma models. All testing was conducted without safety filters to evaluate the model capabilities and behaviors. For both text-to-text and image-to-text, and across all model sizes, the model produced minimal policy violations, and showed significant  improvements over previous Gemma models' performance with respect to ungrounded inferences.

## Usage and Limitations

These models have certain limitations that users should be aware of.

### Intended Usage

The models have been trained with the explicit goal of producing text translation from textual or image output. No claims about other capabilities are made about these models.

### Limitations

+   Training Data

    +   The quality and diversity of the training data significantly influence the model's capabilities. Biases or gaps in the training data can lead to limitations in the model's responses.
    +   The scope of the training dataset determines the subject areas the model can handle effectively.

+   Context and Task Complexity

    +   Models are better at tasks that can be framed with clear prompts and instructions. Open-ended or highly complex tasks might be challenging.
    +   A model's performance can be influenced by the amount of context provided (longer context generally leads to better outputs, up to a certain point).

+   Language Ambiguity and Nuance

    +   Natural language is inherently complex. Models might struggle to grasp subtle nuances, sarcasm, or figurative language.

+   Factual Accuracy

    +   Models generate responses based on information they learned from their training datasets, but they are not knowledge bases. They may generate incorrect or outdated factual statements.

+   Common Sense

    +   Models rely on statistical patterns in language. They might lack the ability to apply common sense reasoning in certain situations.

### Ethical Considerations and Risks

The development of vision-language models (VLMs) raises several ethical concerns. In creating an open model, we have carefully considered the following:

+   Bias and Fairness

    +   VLMs trained on large-scale, real-world text and image data can reflect socio-cultural biases embedded in the training material. These models underwent careful scrutiny, input data pre-processing described and posterior evaluations reported in this card.

+   Misinformation and Misuse

    +   VLMs can be misused to generate text that is false, misleading, or harmful.
    +   Guidelines are provided for responsible use with the model, see the [Responsible Generative AI Toolkit](https://ai.google.dev/responsible).

+   Transparency and Accountability:

    +   This model card summarizes details on the models' architecture, capabilities, limitations, and evaluation processes.
    +   A responsibly developed open model offers the opportunity to share innovation by making VLM technology accessible to developers and researchers across the AI ecosystem.

Risks identified and mitigations:

+   **Perpetuation of biases**: It's encouraged to perform continuous monitoring (using evaluation metrics, human review) and the exploration of de-biasing techniques during model training, fine-tuning, and other use cases.
+   **Generation of harmful content**: Mechanisms and guidelines for content safety are essential. Developers are encouraged to exercise caution and implement appropriate content safety safeguards based on their specific product policies and application use cases.
+   **Misuse for malicious purposes**: Technical limitations and developer and end-user education can help mitigate against malicious applications of VLMs. Educational resources and reporting mechanisms for users to flag misuse are provided. Prohibited uses of Gemma models are outlined in the [Gemma Prohibited Use Policy](https://ai.google.dev/gemma/prohibited_use_policy).
+   **Privacy violations**: Models were trained on data filtered for removal of certain personal information and other sensitive data. Developers are encouraged to adhere to privacy regulations with privacy-preserving techniques.

### Benefits

At the time of release, this family of models provides high-performance translation model implementations fine-tuned from Gemma 3 models.  
Using the benchmark evaluation metrics described in this document, these models have shown to provide superior performance to other, comparably-sized open model alternatives.

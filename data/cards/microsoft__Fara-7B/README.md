---
language:
- en
library_name: transformers
license: mit
pipeline_tag: image-text-to-text
tags:
- multimodal
---

# Fara-7B: An Efficient Agentic Model for Computer Use

**Update:** We just released [Fara1.5](https://huggingface.co/collections/microsoft/fara15) which improves on Fara-7B dramatically and is available in three model sizes 4B, 9B and 27B!

[![Microsoft](https://img.shields.io/badge/Microsoft-Project-0078D4?logo=microsoft)](https://aka.ms/msaif/fara)
[![Hugging Face Dataset](https://img.shields.io/badge/🤗-Dataset-yellow)](https://huggingface.co/datasets/microsoft/WebTailBench)
[![Foundry](https://img.shields.io/badge/Azure-Foundry-0089D6)](https://aka.ms/foundry-fara-7b)
[![Github](https://img.shields.io/badge/Github-181717?logo=github&logoColor=white)](https://github.com/microsoft/fara)
[![Paper](https://img.shields.io/badge/Paper-2511.19663-red)](https://huggingface.co/papers/2511.19663)

[Official Microsoft Blog](https://www.microsoft.com/en-us/research/?p=1155843&preview=1&_ppp=0a22f3e916)<br>
[Technical Report](https://aka.ms/fara-techreport)<br>
[Paper](https://huggingface.co/papers/2511.19663)<br>
[Github](https://github.com/microsoft/fara)<br>
[Try Fara-7B on Microsoft Foundry](https://ai.azure.com/explore/models/Fara-7B/version/1/registry/azureml-msr?tid=72f988bf-86f1-41af-91ab-2d7cd011db47)<br>


## Model Summary


**Developer:** Microsoft Research  

**Description:**  
Fara-7B is Microsoft's first agentic small language model (SLM) designed specifically for computer use. With only 7 billion parameters, Fara-7B is an ultra-compact Computer Use Agent (CUA) that achieves state-of-the-art performance within its size class and is competitive with larger, more resource-intensive agentic systems.

**Model Architecture:**  
Multimodal decoder-only language model that takes an image (screenshot) + text context. It directly predicts thoughts and actions with grounded arguments. Current production baselines leverage Qwen 2.5-VL (7B).

**Parameters:** 7 Billion  

**Inputs:** User goal (text), current screenshot(s), history of previous outputs (thoughts + actions text) from the agent.  

**Context Length:** 128k  

**Outputs:** Generated text in response to the input, with a chain-of-thought block followed by a tool call block to indicate the action.  

**GPUs:** 64 H100s  

**Training Time:** 2.5 days  

**Public Data Summary:** N/A  

**Dates:** Trained between 26th October 2025 to 29th October 2025  

**Status:** Static model trained on public and private data  

**Release Date:** November 24th, 2025  

**License:** MIT  

**Model Dependencies:** Qwen 2.5 VL  

**Additional Assets:** N/A  

**Acceptable Use Policy:** N/A  

---

## 1. Model Overview

Fara is a 7B Computer Use Agent (CUA) model specialized for taking actions on the web to accomplish high-level user tasks. Beyond understanding webpage layout and basic action mechanics, it plans and executes high-level goals like booking restaurants, applying for jobs, planning trips, and buying shopping lists. Its training relies on a large-scale, fully synthetic dataset of action trajectories generated and verified by a multi-agent pipeline.  

Fara perceives browser inputs via screenshots, while internal reasoning and state history are recorded textually. Based on recent screenshots and a full history of actions, it predicts the next action with necessary arguments (e.g., coordinates for clicks).

### 1.1 Alignment Approach

Fara-7B uses a robust post-training safety approach leveraging open-source and in-house synthetic datasets. It incorporates critical point recognition—situations requiring user permission or sensitive information—to safely halt actions. The model is trained to refuse harmful tasks and undergoes automated red teaming to assess risks, including grounding, jailbreaks, harmful content, and copyright violations.

### 1.2 Safeguards

Fara-7B is trained to refuse tasks in categories that violate usage policy:

| Type | Description | Examples |
|------|------------|---------|
| Illegal Activities | Tasks requiring unlawful actions | Terrorism-related searches, piracy, unauthorized access, weapons creation |
| Deceptive Tasks | Tasks misleading or impersonating | Fake forms, fraudulent listings, phishing |
| High-Risk/Regulated Domains | Tasks requiring professional oversight | Medical, legal, financial advice or approvals |
| Harassment, Exploitation, Hate | Tasks harming or discriminating | Harassment content, stalking, sexualizing minors |
| Unsafe Technical Use | Misuse of automation | Large-scale scraping, spam, system disruption |
| Misinformation | Spreading false claims | Publishing unverified claims |
| Sexual | Erotic or pornographic tasks | Erotic roleplay, porn searches |

Critical points where the agent stops include entering personal info, completing purchases, making calls, sending emails, submitting applications, and signing into accounts.

---

## 2. Usage

### Sample Usage

You can try Fara-7B locally by setting up the environment and hosting the model. For full instructions, refer to the [GitHub repository](https://github.com/microsoft/fara#installation).

```bash
# 1. Clone repository
git clone https://github.com/microsoft/fara.git
cd fara

# 2. Setup environment
python3 -m venv .venv 
source .venv/bin/activate
pip install -e .
playwright install
```

Then in one process, host the model:
```bash
vllm serve "microsoft/Fara-7B" --port 5000 --dtype auto 
```
Then you can iterative query it with:
```bash
fara-cli --task "whats the weather in new york now"
```

Hint: might need to do `--tensor-parallel-size 2` with vllm command if you run out of memory

### 2.1 Primary Use Cases

- Automating web tasks such as shopping, booking travel, restaurant reservations, info-seeking, or account workflows.  
- Performs actions step-by-step using multimodal understanding from browser screenshots.  
- On-device execution provides privacy guarantees and lower latency.

### 2.2 Out-of-Scope Use Cases

- Model not evaluated for all downstream purposes; consider limitations of LLMs for accuracy, safety, and fairness.  
- Must adhere to applicable laws and regulations.  
- English-only support.  

### 2.3 Distribution Channels

- Hugging Face  
- Azure AI Foundry  

### 2.4 Input Formats

Given the nature of the training data, always use the ChatML template with the following system prompt for inference:

---

**System Prompt:**

You are a web automation agent that performs actions on websites to fulfill user requests by calling various tools.

You should stop execution at **Critical Points**. A Critical Point occurs in tasks like:

- Checkout  
- Book  
- Purchase  
- Call  
- Email  
- Order  

A Critical Point requires the user's permission or personal/sensitive information (name, email, credit card, address, payment information, resume, etc.) to complete a transaction (purchase, reservation, sign-up, etc.), or to communicate as a human would (call, email, apply to a job, etc.).

**Guideline:** Solve the task as far as possible **up until a Critical Point**.

**Examples:**

- If the task is to "call a restaurant to make a reservation," do **not** actually make the call. Instead, navigate to the restaurant's page and find the phone number.  
- If the task is to "order new size 12 running shoes," do **not** place the order. Instead, search for the right shoes that meet the criteria and add them to the cart.  

Some tasks, like answering questions, may not encounter a Critical Point at all.

---

**Function Signatures:**

You are provided with function signatures within XML tags:

```json
{
  "type": "function",
  "function": {
    "name": "computer_use",
    "description": "Use a mouse and keyboard to interact with a computer, and take screenshots.\
* This is an interface to a desktop GUI. You do not have access to a terminal or applications menu. You must click on desktop icons to start applications.\
* Some applications may take time to start or process actions, so you may need to wait and take successive screenshots to see the results of your actions. E.g. if you click on Firefox and a window doesn't open, try wait and taking another screenshot.\
* The screen's resolution is 1428x896.\
* Whenever you intend to move the cursor to click on an element like an icon, you should consult a screenshot to determine the coordinates of the element before moving the cursor.\
* If you tried clicking on a program or link but it failed to load, even after waiting, try adjusting your cursor position so that the tip of the cursor visually falls on the element that you want to click.\
* Make sure to click any buttons, links, icons, etc with the cursor tip in the center of the element. Don't click boxes on their edges unless asked.\
* When a separate scrollable container prominently overlays the webpage, if you want to scroll within it, you typically need to mouse_move() over it first and then scroll().\
* If a popup window appears that you want to close, if left_click() on the 'X' or close button doesn't work, try key(keys=['Escape']) to close it.\
* On some search bars, when you type(), you may need to press_enter=False and instead separately call left_click() on the search button to submit the search query. This is especially true of search bars that have auto-suggest popups for e.g. locations\
* For calendar widgets, you usually need to left_click() on arrows to move between months and left_click() on dates to select them; type() is not typically used to input dates there.",
    "parameters": {
      "properties": {
        "action": {
          "description": "The action to perform. The available actions are:\
* key: Performs key down presses on the arguments passed in order, then performs key releases in reverse order. Includes 'Enter', 'Alt', 'Shift', 'Tab', 'Control', 'Backspace', 'Delete', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageDown', 'PageUp', 'Shift', etc.\
* type: Type a string of text on the keyboard.\
* mouse_move: Move the cursor to a specified (x, y) pixel coordinate on the screen.\
* left_click: Click the left mouse button.\
* scroll: Performs a scroll of the mouse scroll wheel.\
* visit_url: Visit a specified URL.\
* web_search: Perform a web search with a specified query.\
* history_back: Go back to the previous page in the browser history.\
* pause_and_memorize_fact: Pause and memorize a fact for future reference.\
* wait: Wait specified seconds for the change to happen.\
* terminate: Terminate the current task and report its completion status.",
          "enum": ["key", "type", "mouse_move", "left_click", "scroll", "visit_url", "web_search", "history_back", "pause_and_memorize_fact", "wait", "terminate"],
          "type": "string"
        },
        "keys": {"description": "Required only by action=key.", "type": "array"},
        "text": {"description": "Required only by action=type.", "type": "string"},
        "coordinate": {"description": "(x, y) coordinates for mouse actions. Required only by action=left_click, action=mouse_move, and action=type.", "type": "array"},
        "pixels": {"description": "Amount of scrolling. Positive = up, Negative = down. Required only by action=scroll.", "type": "number"},
        "url": {"description": "The URL to visit. Required only by action=visit_url.", "type": "string"},
        "query": {"description": "The query to search for. Required only by action=web_search.", "type": "string"},
        "fact": {"description": "The fact to remember for the future. Required only by action=pause_and_memorize_fact.", "type": "string"},
        "time": {"description": "Seconds to wait. Required only by action=wait.", "type": "number"},
        "status": {"description": "Status of the task. Required only by action=terminate.", "type": "string", "enum": ["success", "failure"]}
      },
      "required": ["action"],
      "type": "object"
    }
  }
}

For each function call, return a JSON object with the function name and arguments within XML tags:

```json
{
  "name": "<function-name>",
  "arguments": <args-json-object>
}

```

- Function signatures provided for all actions (`key`, `type`, `mouse_move`, `left_click`, `scroll`, `visit_url`, `web_search`, `history_back`, `pause_and_memorize_fact`, `wait`, `terminate`).  


### 2.5 Technical Requirements & Integration

- Required packages: `torch >=2.7.1`, `transformers >=4.53.3`, `vllm >=0.10.0`  
- Tested on NVIDIA A6000, A100, H100 GPUs (Ubuntu 24.04.3 LTS)  
- Recommended on vLLM server with bf16 precision  
- Provided implementation via Magentic-UI in Docker sandbox for safe web execution  

### 2.6 Responsible AI Considerations

- English-only; other languages may have degraded performance  
- Potential stereotype reinforcement or inappropriate content  
- Verify outputs, especially in high-stakes or regulated domains  
- Misuse includes fraud, spam, malware generation  
- Use safety services like Azure AI Content Safety where possible  
- Recommended: human-in-the-loop, sandboxing, access control, output verification  

---

## 3. Data Overview

### 3.1 Training, Testing, Validation Datasets

- Multi-agent data generation pipeline produces synthetic trajectories from seed URLs and open-source tasks  
- Records screenshots, thoughts, action traces, and verification via verifier agents  
- Includes high-quality public datasets: image and text modalities  
- Specialized data: grounding, UI understanding (VQA, captioning, OCR), safety/refusal datasets  

---

## 4. Quality and Performance Evaluation
### Table: Online Agent Evaluation Results

| Model                        | Params | WebVoyager | Online-M2W | DeepShop | WebTailBench |
|------------------------------|--------|------------|------------|----------|---------------|
| **SoM Agents**               |        |            |            |          |               |
| SoM Agent (GPT-5)            | -      | 90.6       | 57.7       | 49.1     | 60.4          |
| SoM Agent (o3)               | -      | 79.3       | 55.4       | 49.7     | 52.7          |
| SoM Agent (GPT-4o)           | -      | 65.1       | 34.6       | 16.0     | 30.8          |
| GLM-4.1V-9B-Thinking         | 9B     | 66.8       | 33.9       | 32.0     | 22.4          |
| **Computer Use Models**      |        |            |            |          |               |
| OpenAI computer-use-preview  | -      | 70.9       | 42.9       | 24.7     | 25.7          |
| UI-TARS-1.5-7B               | 7B     | 66.4       | 31.3       | 11.6     | 19.5          |
| Fara-7B                      | 7B     | 73.5       | 34.1       | 26.2     | 38.4          |

The table reports task completion success rates on WebVoyager, Online-Mind2Web, DeepShop, and WebTailBench for both SoM agents and native computer-use agents.
Scores are averaged over 3 runs.

### 4.2 Safety Evaluation & Red-Teaming

- Post-training safety with critical point design  
- Red-teaming on Azure: grounding, jailbreaks, harmful content, copyright  

### Guidelines for Safe Use

- Human-in-the-loop monitoring recommended  
- Do not share sensitive data  
- Run in sandboxed environments  
- Limit internet access via allow-lists/block-lists  
- Avoid use in commercial, high-stakes, or regulated domains  

**Security Considerations:**  
- Automates interactions across websites, apps, OS; requires strict access control, sandboxing, and monitoring  


**Attribution:** Our model is based on Qwen 2.5 VL. Qwen 2.5 VL has an Apache 2.0 license. Fara-7B is released with an MIT License. Apache 2.0 and MIT are compatible licenses.


---

## Appendix: Benchmarks

| Benchmark | Link |
|-----------|------|
| WebVoyager | [MinorJerry/WebVoyager](https://huggingface.co/datasets/MinorJerry/WebVoyager) |
| Online-Mind2Web | [osunlp/Online-Mind2Web](https://huggingface.co/datasets/osunlp/Online-Mind2Web) |
| DeepShop | [DeepShop/DeepShop](https://huggingface.co/datasets/DeepShop/DeepShop) |
| WebTailBench | [microsoft/WebTailBench](https://huggingface.co/datasets/microsoft/WebTailBench) |
| ScreenSpot v1 | [rootsautomation/ScreenSpot](https://huggingface.co/datasets/rootsautomation/ScreenSpot) |
| ScreenSpot v2 | [Voxel51/ScreenSpot-v2](https://huggingface.co/datasets/Voxel51/ScreenSpot-v2) |
| AgentHarm | [ai-safety-institute/AgentHarm](https://huggingface.co/datasets/ai-safety-institute/AgentHarm) |
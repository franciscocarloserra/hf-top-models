---
base_model: TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill
tags:
- text-generation-inference
- gguf
- llama.cpp
- unsloth
- glm4_moe_lite
license: apache-2.0
datasets:
- TeichAI/claude-4.5-opus-high-reasoning-250x
---

# GLM 4.7 Flash x Claude 4.5 Opus (High Reasoning)

This model was trained on a small reasoning dataset of **Claude Opus 4.5**, with reasoning effort set to High.

- 🧬 Datasets:
  - `TeichAI/claude-4.5-opus-high-reasoning-250x`

- 🏗 Base Model:
  - `unsloth/GLM-4.7-Flash`
 
- &#9889; Use cases:
  - Coding
  - Science
  - Deep Research

- &#8721; Stats (Dataset)
  - Costs: $ 52.30 (USD)
  - Total tokens (input + output): 2.13 M

---

## How to run

For specific instructions/commands to serve this model locally using vLLM, SGLang, or transformers please see [the instructions from the original model's card](https://huggingface.co/unsloth/GLM-4.7-Flash#serve-glm-47-flash-locally)

For detailed instructions getting started with Llama.cpp please refer to [the unsloth guide](https://unsloth.ai/docs/models/glm-4.7-flash)

### Sampling Parameters

z-ai recommends the following sampling parameters for this model:

| Default Settings (Most Tasks)                                      | Terminal Bench, SWE Bench Verified                                 |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **temperature = 1.0** | **temperature = 0.7** |
| **top_p = 0.95**     | **top_p = 1.0**      |
| repeat penalty = disabled or 1.0 | repeat penalty = disabled or 1.0 |

* For general use-case:  `--temp 1.0 --top-p 0.95`
* For tool-calling:  `--temp 0.7 --top-p 1.0`
* If using llama.cpp, set `--min-p 0.01` as llama.cpp's default is 0.05
* Sometimes you'll need to experiment what numbers work best for your use-case.

If you experience any issues with these parameters, some users have reported better results when lowering temperature to 0.5-0.6

---

## Benchmarks

![alt="Results Bar Chart"](results_bar_chart.png)

### Model Comparison vs Base

![alt="Comparsion vs Base Chart"](comparison_vs_base.png)

- Base model: zai-org/GLM-4.7-Flash

| Benchmark             |   Base Score |   Distilled Score |        Delta |     Delta % |
|:----------------------|-------------:|--------------:|-------------:|------------:|
| arc_challenge         |     **0.224403** |      0.217577 | -0.00682594  | -0.0304183  |
| gpqa_diamond_zeroshot |     0.262626 |     **0.292929** |  0.030303    |  0.115385   |
| hellaswag             |     **0.257817** |      0.256722 | -0.0010954   | -0.00424874 |
| ifeval                |     0.109057 |      **0.112754** |  0.00369686  |  0.0338983  |
| mmlu                  |     0.229454 |      **0.240706** |  0.011252    |  0.0490379  |
| truthfulqa_mc2        |     **0.467552** |      0.466805 | -0.000747457 | -0.00159866 |
| winogrande            |     0.468824 |      **0.504341** |  0.035517    |  0.0757576  |

### Aggregate Comparison

|   Benchmarks Compared |   Wins vs Base |   Ties vs Base |   Losses vs Base |   Avg Delta |
|----------------------:|---------------:|---------------:|-----------------:|------------:|
|                     7 |              4 |              0 |                3 |      0.0103 |

### Detailed Results

| Model                                                        | Benchmark             |    Score |   Total Questions |   Total Correct |
|:-------------------------------------------------------------|:----------------------|---------:|------------------:|----------------:|
| zai-org/GLM-4.7-Flash                                        | winogrande            | 0.468824 |              1267 |             594 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | winogrande            | 0.504341 |              1267 |             639 |
| zai-org/GLM-4.7-Flash                                        | arc_challenge         | 0.224403 |              1172 |             263 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | arc_challenge         | 0.217577 |              1172 |             255 |
| zai-org/GLM-4.7-Flash                                        | hellaswag             | 0.257817 |             10042 |            2589 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | hellaswag             | 0.256722 |             10042 |            2578 |
| zai-org/GLM-4.7-Flash                                        | truthfulqa_mc2        | 0.467552 |               817 |             381 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | truthfulqa_mc2        | 0.466805 |               817 |             381 |
| zai-org/GLM-4.7-Flash                                        | mmlu                  | 0.229454 |             14042 |            3222 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | mmlu                  | 0.240706 |             14042 |            3380 |
| zai-org/GLM-4.7-Flash                                        | ifeval                | 0.109057 |               541 |              59 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | ifeval                | 0.112754 |               541 |              61 |
| zai-org/GLM-4.7-Flash                                        | gpqa_diamond_zeroshot | 0.262626 |               198 |              52 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | gpqa_diamond_zeroshot | 0.292929 |               198 |              58 |


### MMLU Subject Breakdown

![alt="MMLU Subject Breakdown"](mmlu_subject_breakdown.png)

#### MMLU Detailed Results

| Model                                                        | Subject                             | Benchmark                                |    Score |   Total Questions |   Total Correct |
|:-------------------------------------------------------------|:------------------------------------|:-----------------------------------------|---------:|------------------:|----------------:|
| zai-org/GLM-4.7-Flash                                        | formal_logic                        | mmlu_formal_logic                        | 0.285714 |               126 |              36 |
| zai-org/GLM-4.7-Flash                                        | high_school_european_history        | mmlu_high_school_european_history        | 0.218182 |               165 |              36 |
| zai-org/GLM-4.7-Flash                                        | high_school_us_history              | mmlu_high_school_us_history              | 0.25     |               204 |              51 |
| zai-org/GLM-4.7-Flash                                        | high_school_world_history           | mmlu_high_school_world_history           | 0.270042 |               237 |              63 |
| zai-org/GLM-4.7-Flash                                        | international_law                   | mmlu_international_law                   | 0.239669 |               121 |              29 |
| zai-org/GLM-4.7-Flash                                        | jurisprudence                       | mmlu_jurisprudence                       | 0.259259 |               108 |              28 |
| zai-org/GLM-4.7-Flash                                        | logical_fallacies                   | mmlu_logical_fallacies                   | 0.220859 |               163 |              36 |
| zai-org/GLM-4.7-Flash                                        | moral_disputes                      | mmlu_moral_disputes                      | 0.248555 |               346 |              86 |
| zai-org/GLM-4.7-Flash                                        | moral_scenarios                     | mmlu_moral_scenarios                     | 0.237989 |               895 |             213 |
| zai-org/GLM-4.7-Flash                                        | philosophy                          | mmlu_philosophy                          | 0.186495 |               311 |              58 |
| zai-org/GLM-4.7-Flash                                        | prehistory                          | mmlu_prehistory                          | 0.216049 |               324 |              70 |
| zai-org/GLM-4.7-Flash                                        | professional_law                    | mmlu_professional_law                    | 0.245763 |              1534 |             377 |
| zai-org/GLM-4.7-Flash                                        | world_religions                     | mmlu_world_religions                     | 0.321637 |               171 |              55 |
| zai-org/GLM-4.7-Flash                                        | business_ethics                     | mmlu_business_ethics                     | 0.3      |               100 |              30 |
| zai-org/GLM-4.7-Flash                                        | clinical_knowledge                  | mmlu_clinical_knowledge                  | 0.215094 |               265 |              57 |
| zai-org/GLM-4.7-Flash                                        | college_medicine                    | mmlu_college_medicine                    | 0.208092 |               173 |              36 |
| zai-org/GLM-4.7-Flash                                        | global_facts                        | mmlu_global_facts                        | 0.18     |               100 |              18 |
| zai-org/GLM-4.7-Flash                                        | human_aging                         | mmlu_human_aging                         | 0.313901 |               223 |              70 |
| zai-org/GLM-4.7-Flash                                        | management                          | mmlu_management                          | 0.174757 |               103 |              18 |
| zai-org/GLM-4.7-Flash                                        | marketing                           | mmlu_marketing                           | 0.290598 |               234 |              68 |
| zai-org/GLM-4.7-Flash                                        | medical_genetics                    | mmlu_medical_genetics                    | 0.3      |               100 |              30 |
| zai-org/GLM-4.7-Flash                                        | miscellaneous                       | mmlu_miscellaneous                       | 0.237548 |               783 |             186 |
| zai-org/GLM-4.7-Flash                                        | nutrition                           | mmlu_nutrition                           | 0.22549  |               306 |              69 |
| zai-org/GLM-4.7-Flash                                        | professional_accounting             | mmlu_professional_accounting             | 0.234043 |               282 |              66 |
| zai-org/GLM-4.7-Flash                                        | professional_medicine               | mmlu_professional_medicine               | 0.183824 |               272 |              50 |
| zai-org/GLM-4.7-Flash                                        | virology                            | mmlu_virology                            | 0.283133 |               166 |              47 |
| zai-org/GLM-4.7-Flash                                        | econometrics                        | mmlu_econometrics                        | 0.236842 |               114 |              27 |
| zai-org/GLM-4.7-Flash                                        | high_school_geography               | mmlu_high_school_geography               | 0.176768 |               198 |              35 |
| zai-org/GLM-4.7-Flash                                        | high_school_government_and_politics | mmlu_high_school_government_and_politics | 0.196891 |               193 |              38 |
| zai-org/GLM-4.7-Flash                                        | high_school_macroeconomics          | mmlu_high_school_macroeconomics          | 0.202564 |               390 |              79 |
| zai-org/GLM-4.7-Flash                                        | high_school_microeconomics          | mmlu_high_school_microeconomics          | 0.214286 |               238 |              51 |
| zai-org/GLM-4.7-Flash                                        | high_school_psychology              | mmlu_high_school_psychology              | 0.192661 |               545 |             105 |
| zai-org/GLM-4.7-Flash                                        | human_sexuality                     | mmlu_human_sexuality                     | 0.259542 |               131 |              34 |
| zai-org/GLM-4.7-Flash                                        | professional_psychology             | mmlu_professional_psychology             | 0.25     |               612 |             153 |
| zai-org/GLM-4.7-Flash                                        | public_relations                    | mmlu_public_relations                    | 0.218182 |               110 |              24 |
| zai-org/GLM-4.7-Flash                                        | security_studies                    | mmlu_security_studies                    | 0.187755 |               245 |              46 |
| zai-org/GLM-4.7-Flash                                        | sociology                           | mmlu_sociology                           | 0.238806 |               201 |              48 |
| zai-org/GLM-4.7-Flash                                        | us_foreign_policy                   | mmlu_us_foreign_policy                   | 0.28     |               100 |              28 |
| zai-org/GLM-4.7-Flash                                        | abstract_algebra                    | mmlu_abstract_algebra                    | 0.22     |               100 |              22 |
| zai-org/GLM-4.7-Flash                                        | anatomy                             | mmlu_anatomy                             | 0.185185 |               135 |              25 |
| zai-org/GLM-4.7-Flash                                        | astronomy                           | mmlu_astronomy                           | 0.177632 |               152 |              27 |
| zai-org/GLM-4.7-Flash                                        | college_biology                     | mmlu_college_biology                     | 0.256944 |               144 |              37 |
| zai-org/GLM-4.7-Flash                                        | college_chemistry                   | mmlu_college_chemistry                   | 0.2      |               100 |              20 |
| zai-org/GLM-4.7-Flash                                        | college_computer_science            | mmlu_college_computer_science            | 0.26     |               100 |              26 |
| zai-org/GLM-4.7-Flash                                        | college_mathematics                 | mmlu_college_mathematics                 | 0.21     |               100 |              21 |
| zai-org/GLM-4.7-Flash                                        | college_physics                     | mmlu_college_physics                     | 0.215686 |               102 |              22 |
| zai-org/GLM-4.7-Flash                                        | computer_security                   | mmlu_computer_security                   | 0.28     |               100 |              28 |
| zai-org/GLM-4.7-Flash                                        | conceptual_physics                  | mmlu_conceptual_physics                  | 0.26383  |               235 |              62 |
| zai-org/GLM-4.7-Flash                                        | electrical_engineering              | mmlu_electrical_engineering              | 0.241379 |               145 |              35 |
| zai-org/GLM-4.7-Flash                                        | elementary_mathematics              | mmlu_elementary_mathematics              | 0.208995 |               378 |              79 |
| zai-org/GLM-4.7-Flash                                        | high_school_biology                 | mmlu_high_school_biology                 | 0.174194 |               310 |              54 |
| zai-org/GLM-4.7-Flash                                        | high_school_chemistry               | mmlu_high_school_chemistry               | 0.152709 |               203 |              31 |
| zai-org/GLM-4.7-Flash                                        | high_school_computer_science        | mmlu_high_school_computer_science        | 0.25     |               100 |              25 |
| zai-org/GLM-4.7-Flash                                        | high_school_mathematics             | mmlu_high_school_mathematics             | 0.211111 |               270 |              57 |
| zai-org/GLM-4.7-Flash                                        | high_school_physics                 | mmlu_high_school_physics                 | 0.198675 |               151 |              29 |
| zai-org/GLM-4.7-Flash                                        | high_school_statistics              | mmlu_high_school_statistics              | 0.152778 |               216 |              33 |
| zai-org/GLM-4.7-Flash                                        | machine_learning                    | mmlu_machine_learning                    | 0.321429 |               112 |              36 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | formal_logic                        | mmlu_formal_logic                        | 0.206349 |               126 |              26 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_european_history        | mmlu_high_school_european_history        | 0.206061 |               165 |              34 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_us_history              | mmlu_high_school_us_history              | 0.245098 |               204 |              50 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_world_history           | mmlu_high_school_world_history           | 0.270042 |               237 |              63 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | international_law                   | mmlu_international_law                   | 0.239669 |               121 |              29 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | jurisprudence                       | mmlu_jurisprudence                       | 0.305556 |               108 |              33 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | logical_fallacies                   | mmlu_logical_fallacies                   | 0.214724 |               163 |              35 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | moral_disputes                      | mmlu_moral_disputes                      | 0.271676 |               346 |              93 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | moral_scenarios                     | mmlu_moral_scenarios                     | 0.222346 |               895 |             199 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | philosophy                          | mmlu_philosophy                          | 0.228296 |               311 |              71 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | prehistory                          | mmlu_prehistory                          | 0.271605 |               324 |              88 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | professional_law                    | mmlu_professional_law                    | 0.252934 |              1534 |             388 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | world_religions                     | mmlu_world_religions                     | 0.280702 |               171 |              48 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | business_ethics                     | mmlu_business_ethics                     | 0.3      |               100 |              30 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | clinical_knowledge                  | mmlu_clinical_knowledge                  | 0.267925 |               265 |              71 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | college_medicine                    | mmlu_college_medicine                    | 0.213873 |               173 |              37 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | global_facts                        | mmlu_global_facts                        | 0.32     |               100 |              32 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | human_aging                         | mmlu_human_aging                         | 0.327354 |               223 |              73 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | management                          | mmlu_management                          | 0.213592 |               103 |              22 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | marketing                           | mmlu_marketing                           | 0.286325 |               234 |              67 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | medical_genetics                    | mmlu_medical_genetics                    | 0.35     |               100 |              35 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | miscellaneous                       | mmlu_miscellaneous                       | 0.254151 |               783 |             199 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | nutrition                           | mmlu_nutrition                           | 0.222222 |               306 |              68 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | professional_accounting             | mmlu_professional_accounting             | 0.244681 |               282 |              69 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | professional_medicine               | mmlu_professional_medicine               | 0.183824 |               272 |              50 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | virology                            | mmlu_virology                            | 0.325301 |               166 |              54 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | econometrics                        | mmlu_econometrics                        | 0.280702 |               114 |              32 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_geography               | mmlu_high_school_geography               | 0.207071 |               198 |              41 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_government_and_politics | mmlu_high_school_government_and_politics | 0.176166 |               193 |              34 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_macroeconomics          | mmlu_high_school_macroeconomics          | 0.217949 |               390 |              85 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_microeconomics          | mmlu_high_school_microeconomics          | 0.222689 |               238 |              53 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_psychology              | mmlu_high_school_psychology              | 0.209174 |               545 |             114 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | human_sexuality                     | mmlu_human_sexuality                     | 0.21374  |               131 |              28 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | professional_psychology             | mmlu_professional_psychology             | 0.259804 |               612 |             159 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | public_relations                    | mmlu_public_relations                    | 0.309091 |               110 |              34 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | security_studies                    | mmlu_security_studies                    | 0.159184 |               245 |              39 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | sociology                           | mmlu_sociology                           | 0.253731 |               201 |              51 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | us_foreign_policy                   | mmlu_us_foreign_policy                   | 0.25     |               100 |              25 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | abstract_algebra                    | mmlu_abstract_algebra                    | 0.23     |               100 |              23 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | anatomy                             | mmlu_anatomy                             | 0.251852 |               135 |              34 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | astronomy                           | mmlu_astronomy                           | 0.164474 |               152 |              25 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | college_biology                     | mmlu_college_biology                     | 0.263889 |               144 |              38 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | college_chemistry                   | mmlu_college_chemistry                   | 0.22     |               100 |              22 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | college_computer_science            | mmlu_college_computer_science            | 0.22     |               100 |              22 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | college_mathematics                 | mmlu_college_mathematics                 | 0.25     |               100 |              25 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | college_physics                     | mmlu_college_physics                     | 0.245098 |               102 |              25 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | computer_security                   | mmlu_computer_security                   | 0.24     |               100 |              24 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | conceptual_physics                  | mmlu_conceptual_physics                  | 0.340426 |               235 |              80 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | electrical_engineering              | mmlu_electrical_engineering              | 0.193103 |               145 |              28 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | elementary_mathematics              | mmlu_elementary_mathematics              | 0.240741 |               378 |              91 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_biology                 | mmlu_high_school_biology                 | 0.190323 |               310 |              58 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_chemistry               | mmlu_high_school_chemistry               | 0.216749 |               203 |              44 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_computer_science        | mmlu_high_school_computer_science        | 0.19     |               100 |              19 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_mathematics             | mmlu_high_school_mathematics             | 0.240741 |               270 |              65 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_physics                 | mmlu_high_school_physics                 | 0.172185 |               151 |              26 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | high_school_statistics              | mmlu_high_school_statistics              | 0.194444 |               216 |              42 |
| TeichAI/GLM-4.7-Flash-Claude-Opus-4.5-High-Reasoning-Distill | machine_learning                    | mmlu_machine_learning                    | 0.241071 |               112 |              27 |

### Benchmark Config

- **Quantization:** 4bit
- **Temperature:** 0.0
- **Top P:** 1.0
- **Top K:** 0
- **Repetition Penalty:** 1.0

All results were obtained through the official lm evaluation harness

---
This qwen3 model was trained 2x faster with [Unsloth](https://github.com/unslothai/unsloth) and Huggingface's TRL library.
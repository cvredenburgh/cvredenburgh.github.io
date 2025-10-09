---
title: "Causal Learning From Fine-Grained VLM Representations"
description: "This project investigates how fine-grained representations from vision-language models (VLMs) can support causal reasoning in product design. Specifically, learning how design features impact consumer/user response. I test this by combining latent-space counterfactual probing and generative interventional loops, aiming to demonstrate how localized design features causally influence customer sentiment and desirability."
tags: ["AI", "VLM", "causal modeling", "foundation models", "counterfactuals", "product concept evaluation", "representation learning"]
githubUrl: "https://github.com/cvredenburgh/representation-mining"
date: 2025-07-25
---

# Causal Learning From Fine-Grained VLM Representations

🚧 In progress

## Background
Vision-language models (VLMs), such as E²-CLIP learn rich, fine-grained representations of products that encode visual and textual semantics across parts and attributes.  
This project explores how these representations can move beyond correlation—toward *causal understanding* of how specific visual or design elements drive consumer response.  
The focus is on footwear concepts, where region-level embeddings capture attributes like outsole geometry, materials, and construction style.

---

## Hypotheses
1. *Latent Causality Hypothesis* —  
   Product attributes that are *causally relevant* to customer sentiment correspond to consistent linear directions in the model’s latent space.  
   → Testable via *Latent-Space Counterfactual Probing (LS-CCP)*.

2. *On-Manifold Intervention Hypothesis* —  
   Realistic generative edits that modify only a single part or attribute (e.g., toe box material) will induce predictable and stable shifts in predicted desirability.  
   → Testable via *Diffusion-based Generative Interventional Optimization (DECO)* that leverages our evaluation model outputs for feedback.

---

## Methods

### 1. Latent-Space Counterfactual Probing (LS-CCP)
- Extract part-aware embeddings \( r_1, …, r_M \) from a fine-tuned E² VLM.  
- Compute gradients and Concept Activation Vectors (CAVs) for key attributes (e.g., mesh upper, chunky sole).  
- Perturb embeddings along concept directions and record ∆ŷ (change in predicted sentiment).  
- Aggregate these directional effects to estimate part-level Average Causal Effects (ACE).

**Tools:** PyTorch, Captum (Integrated Gradients), SHAP, TCAV.

---

### 2. Diffusion-based Generative Interventional Optimization (DECO)
- Use diffusion models (e.g., SDXL + ControlNet) to in-paint or edit localized shoe regions conditioned on text prompts (“same shoe, with knit upper”).  
- Re-evaluate each generated variant through the evaluation head trained on customer response.  
- Estimate causal Δ by comparing baseline vs. edited prediction; optimize edits that maximize desirability or minimize uncertainty.

**Tools:** Stable Diffusion, ControlNet, CLIPScore validation, PyTorch regression head.

---

## Results
🚧 In progress — 

---

## Summary
By integrating *latent-space probing* with *on-manifold generative interventions*, this work builds a bridge between modern foundation models and causal inference in product design.  
The ultimate goal is to move from “feature importance” to *actionable causal insight*—identifying which components of a product truly drive consumer preference and how they can be optimized.

---

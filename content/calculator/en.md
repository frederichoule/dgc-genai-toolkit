---
eyebrow: About the Calculator methodology
title: Estimate the energy and carbon footprint of your generative AI use
---

Generative AI tools are increasingly part of everyday creative workflows, from preparing documents to image generation to video and audio production. Behind each use lies an environmental impact that is not always visible.

This calculator provides a simple way to estimate the energy use and carbon footprint associated with common generative AI tasks, and to better understand how different types of use contribute to your overall impact.


## How to use the calculator

The calculator is designed to be flexible and can be used at two levels depending on your needs.

### Basic mode
Quickly estimate your impact:
* input simple usage parameters (text, image, video, audio)
* obtain an overall estimate of energy use and carbon emissions
* visualize your impact through clear equivalents


### Advanced mode
Get a more detailed estimation:
* refine key parameters (model type, tokens, duration, iterations)
* better reflect specific workflows or production contexts
* compare different types of AI use with greater precision

This mode is designed for users who want a more granular understanding of their impact.

## About the Calculator methodology 

### Estimating environmental impact of Gen AI for different use cases
Understanding the impacts of AI and the key parameters that influence them is the first step for a more conscious and responsible use of a technology that will shape the decades to come.

While AI may have far-reaching consequences on many aspects of our society and ecosystems, we focus here specifically on environmental impacts, particularly energy use and carbon emissions. These indicators are intrinsically linked through the energy-carbon transition set in motion by the Paris Agreement (2015), which aims to hold “the increase in the global average temperature to well below 2°C above pre-industrial levels” and pursue efforts “to limit the temperature increase to 1.5°C above pre-industrial levels.”


### Approach
We aim to assess and aggregate the environmental impacts of AI services through a usage-based approach.

We designed this methodology to be transparent, credible, reproducible, and as representative as possible by consulting peer-reviewed studies available at the time of development (February 2026).

As this field evolves rapidly, we will continuously improve the methodology and invite feedback.

### AI Use Cases
Before estimating impacts, we sought to understand how audiovisual creators integrate AI into their work and what types of systems are used. Online surveys revealed various use cases, which we simplified and grouped into four main categories:
1. Read a 100-page PDF and generate a one-page summary
2. Generate a 2K photorealistic image from a text prompt (multiple iterations)
3. Generate a short HD video from a text prompt
4. Generate an audio clip from a text prompt

These use cases are intended to reflect real creative workflows in the screen industry.

### Life-Cycle Approach
To correctly estimate the impact of a web service, every part of the system that enables the service to be delivered must be included. The three main parts of a digital system are typically users' devices, networks, and data centres. To be exhaustive, manufacturing or usage must be included.

The methodology used to estimate the environmental impact of a service is called Life-Cycle Assessment (LCA). Described in ISO 14040 and 14044, as well as ITU L.1410.

This approach is much more comprehensive than some web carbon calculators, which are generally based on global statistics. It allows the impact to be estimated using multi-criteria analysis (considering more than just the carbon footprint) and takes into account all phases of a product or service's life cycle. In this project, we will adhere to the LCA methodology requirements as closely as possible and use the most recent and coherent environmental data available.


### Modeling Approach
Collecting primary data across all layers of AI systems remains challenging, particularly when relying on third-party services. Two approaches are typically used: bottom-up and top-down modeling.
We adopt a bottom-up approach, which estimates impacts based on granular activity (such as token-level usage) and extrapolates system-level consumption.

Although more complex, this approach is better suited to AI systems, where environmental impact is largely concentrated in back-end infrastructure (data centres and compute).


### AI-Specific Modeling
To estimate large language model (LLM) inference, we build upon the methodology developed by __Ecologits / CodeCarbon__, which provides a reference framework for estimating environmental impacts of chatbot interactions.
We retain the original system boundaries, focusing on inference only, including:
* GPU and server energy consumption
* Data centre overhead (cooling and infrastructure)

We exclude:
* Model training
* Data storage
* End-user devices
* Network impacts

These exclusions reflect current data limitations and methodological consistency.

To extend the model beyond text-based systems, we adapt token-based modeling to image, audio, and video generation, drawing inspiration from the “One Token Model” developed by Antarctica.


### From Energy to Environmental Impact
Once energy consumption is estimated for each use case, it is converted into environmental impact indicators.
The total impact includes:
* __Embodied impact__: a share of emissions associated with the manufacturing of GPUs and servers, allocated over their lifespan
* __Usage impact__: emissions associated with electricity consumption during inference

We account for data centre efficiency (PUE) and variations in electricity carbon intensity across regions to ensure results reflect real-world conditions.


__This methodology is designed to provide transparent and practical estimates, not absolute measurements.__

__As AI technologies evolve and new data becomes available, the model will continue to be refined and improved.__



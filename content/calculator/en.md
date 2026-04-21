---
eyebrow: About the Calculator methodology
title: Estimating environmental impact of Gen AI for different use cases
---

Understanding the impacts of AI and the key parameters that influence them is the first step for a more conscious and responsible use of a technology that will shape the coming decades.

Although AI may have impacts on many aspects of our society and ecosystems, we focus here specifically on environmental impacts, particularly energy use and carbon emissions, as these two indicators are intrinsically linked by the energy-carbon transition we agreed to start with the Paris Agreement (2015), to hold "the increase in the global average temperature to well below 2°C above pre-industrial levels" and pursue efforts "to limit the temperature increase to 1.5°C above pre-industrial levels."

## Approach

We aim to assess and aggregate the environmental impacts of AI services through a usage-based approach.

We designed this methodology to be transparent, sourced, reproducible, and as representative as possible, considering the data and studies available at the time of development (February 2026). As this field evolves rapidly, we encourage feedback and continuous improvement of the methodology.

## AI Use Cases

Before estimating impacts, we sought to understand how audiovisual creators integrate AI into their work, and what types of systems are used accordingly. Online surveys revealed various use cases, which we simplified and grouped into four main categories:

- Read a 100-page PDF and generate a one-page summary
- Generate a 2K photorealistic image from a text prompt (multiple iterations)
- Generate a short HD video from a text prompt
- Generate an audio clip from a text prompt

These use cases are intended to reflect real creative workflows in the screen industry.

## Life-Cycle Approach

To correctly estimate the impact of a web service, every part of the system that enables the service to be delivered must be included. The three main typical parts of a digital system are users' devices, networks, and data centres. To be exhaustive, either manufacturing or usage must be included.

The methodology used to estimate the environmental impact of a service is called Life-Cycle Assessment (LCA). Described in ISO 14040 and 14044, as well as ITU L.1450.

This approach is much more comprehensive than web carbon calculators, which are only based on global statistics. It allows the impact to be estimated using multi-criteria analysis (considering more than just the carbon footprint) and takes into account all phases of a product or service's life cycle. In this project, we will adhere to the LCA methodology requirements as closely as possible and use the most recent and coherent environmental data available.

## Modeling Approach

Collecting primary data across all layers of AI systems remains challenging, particularly when relying on third-party services. Two approaches are typically used: bottom-up and top-down modeling.

We adopt a bottom-up approach, which estimates impacts based on granular activity (such as token-level usage) and extrapolates system-level consumption. Although more complex, this approach is better suited to AI systems, where environmental impact is largely concentrated in back-end infrastructure (data centres and compute).

## AI-Specific Modeling

To estimate large language model (LLM) inference, we build upon the methodology developed by **Ecologits / CodeCarbon**, which provides a reference framework for estimating environmental impacts of chatbot interactions.

We retain the original system boundaries, focusing on inference only, including:

- GPU and server energy consumption
- Data centre overhead (cooling and infrastructure)

We exclude:

- Model training
- Data storage
- End-user devices
- Network impacts

These exclusions reflect current data limitations and methodological consistency.

To extend the model beyond text-based systems, we adapt token-based modeling to image, audio, and video generation, drawing inspiration from the "One Token Model" developed by Antarctica.

## From Energy to Environmental Impact

Once energy consumption is estimated for each use case, it is converted into environmental impact indicators. The total impact includes:

- **Embodied impact:** a share of emissions associated with the manufacturing of GPUs and servers, allocated over their lifespan
- **Usage impact:** emissions associated with electricity consumption during inference

We account for data centre efficiency (PUE) and variations in electricity carbon intensity across regions to ensure results reflect real-world conditions.

This methodology is designed to provide transparent and practical estimates, not absolute measurements.

As AI technologies evolve and new data becomes available, the model will continue to be refined and improved.

Read [Full Methodology](#)

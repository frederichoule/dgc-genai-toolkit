---
title: Generative AI Best Practices
eyebrow: GUIDE
---

There is no single low-impact way to use generative AI.

The environmental footprint of such tools depends on how they are used, what they replace, and the scale at which they are deployed.

The following best practices are designed to support informed decision-making across common production scenarios, helping creators to balance creative, operational, and environmental considerations.

## Before

### 1. Understand the nature of AI and its limitations

Artificial intelligence (AI), and generative AI (GenAI) in particular, are rapidly evolving fields. As with any new technology or trend, it is important to approach it with a critical mindset so that you can properly assess its promises, limitations, and risks.
 
Results can also vary widely depending on the context, the prompts used, and the tools selected. Errors may be produced even when the GenAI output sounds highly convincing, and like any system built on historical datasets, AI can reflect underlying biases. 
 
It is therefore essential to verify the accuracy of responses, for example, by asking for sources and assessing their credibility and reliability to determine whether the tool has truly met your needs with a sufficient level of confidence. Good habits can be implemented to help reduce errors and improve the reliability of results.
 
This practice helps reduce the risk of costly mistakes, poor decisions, and unnecessary rework.

### 2. Know the environmental impacts

Before launching a task, take the time to understand the environmental impact associated with the type of task, the model selected, and the factors that influence consumption. Keep in mind that among traditional GenAI models, generating images, audio, or video is especially energy-intensive, with complexity, multimodality, and input and output length all having influence. Reasoning models, which follow a logical problem-solving process, are significantly more energy-intensive than models that do not use reasoning.
 
Through understanding the environmental consequences of its use, this practice will help you to consider when GenAI is truly necessary and to what extent it should be used, by weighing benefits against environmental costs.

This practice not only empowers you as an individual to make more informed decisions for your own workflows, but also helps to create a new normal. Widespread understanding and more conscientious practice can drive forward a culture of accountability across the screen sector, supporting collective efforts to reduce the industry’s overall carbon footprint.


### 3. Understand the need and avoid GenAI use by default

Ask yourself whether the task truly requires GenAI, when a simpler digital tool would be sufficient. Save GenAI for situations where it brings clear and essential value, rather than using it for trivial or recreational workplace tasks.
 
This practice reduces unnecessary computing demand, along with the associated energy use and costs. It also helps define legitimate use cases for GenAI more clearly, making governance and organizational buy-in easier.

### 4. Choose providers and infrastructure thoughtfully

Where possible, opt for solutions that:
* __Are transparent__: Look for solutions that disclose information about the infrastructure on which their models operate. This might include data centre location and environmental performance, their source of electricity, their climate and environmental commitments and ideally, the environmental impact of each query.
    Example: To date, only a few providers such as [Mistral](https://mistral.ai/news/our-contribution-to-a-global-environmental-standard-for-ai) and [Google](https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf), have published work quantifying the environmental impact of their chatbots.
* __Are open-source__: Such models pool technological efforts and avoid reinventing the wheel for similar use cases and needs.
    Example: See the models available on [Hugging Face](https://huggingface.co)
* __Are local__: Closer proximity can improve performance by reducing latency between users and data centres.
Example: Infrastructure located in Quebec, Ontario, Manitoba, or British Columbia may generally be less carbon intensive compared to infrastructure located in the United States. View carbon intensity per province on [ElectricityMaps](https://app.electricitymaps.com/map/all/yearly)
* Are compatible with __sovereignty__ considerations: Given that some countries may use AI as a tool of domination, it may therefore be wise not to rely on AI systems originating from those countries, so as not to provide new coercion methods or encouragement.
    Example: Favour providers such as Cohere, a Canadian company, or Mistral, a European one.
 
This practice helps reduce reputational, legal, dependency, and environmental risks.

### 5. Choose the right GenAI for the right task

Avoid using more energy-intensive models, such as “reasoning” or “pro” models, when they are not necessary, and instead favour lighter, faster models for simpler questions. The [Hugging Face](https://huggingface.co/spaces/AIEnergyScore/Leaderboard) leaderboard can be a useful starting point for comparing the energy performance of different GenAI systems across tasks. [AI Wattch](https://antarctica.io/ai-wattch) can also help track energy use and CO2e emissions in real time over the course of use.
 
This practice reduces both the financial cost per query and the associated carbon footprint, while also limiting the risk of unnecessarily long or complex responses. It can also help standardize clear selection guidelines for teams.


### 6. Picture the final result before using GenAI

Clarify your intent, how the output will be used, the expected final format, and the contextual information that is actually needed. The goal is to obtain a usable result with as few back-and-forth exchanges as possible.
 
This practice reduces the number of iterations, the computing power required, and the time spent searching. It also improves the output quality and the reproducibility of methods.


## During

### 7. Reduce the number of generations by improving your prompts

Use more precise wording from the start rather than trying different prompts over and over again. Treat generation as a resource to be optimized, not as an endless conversation.
 
It is also worth noting that, across all major models, output quality tends to decline as conversations become longer.
 
This practice significantly reduces the total volume of computation, and therefore energy consumption, while also speeding up the work. It reduces cognitive load and improves consistency of results across users.


### 8. Limit inputs

While a prompt is the specific instruction given to AI, ‘input’ is the broader description for any data that you share with an AI model, such as text, images, or audio.

The less information that you give the AI model to process, the less energy-intensive your request will be. Fewer inputs means fewer computations and often better answers. 

You can make prompts more concise by avoiding pleasantries, repetition and irrelevant context, and asking direct, clearly defined questions. For example, rather than asking “Please can you write me a detailed summary of the key sustainability issues and challenges currently facing the global screen sector”, something more succinct could be “Summarise the top 5 sustainability challenges facing the global screen sector".

This practice significantly reduces the total volume of computation and required energy consumption.


### 9. Limit outputs

Ask for a precise and proportionate format (e.g., text/table, bullet points, a set number of paragraphs, or a character limit) to avoid outputs that are unnecessarily long.
 
This practice directly reduces the number of tokens generated, along with the associated energy use and cost. It also encourages clearer, more actionable communication that supports faster decision-making.


### 10. Centralize your tasks in a single thread when appropriate

Group similar tasks within the same conversation so that useful context can be reused and the same information does not need to be processed multiple times, especially when files have already been provided.
 
This practice reduces repetition, improves traceability, and lowers the consumption associated with re-establishing context. It also supports better internal knowledge-sharing by preserving continuity across exchanges.


## After

### 11. Save and refine your prompts

For recurring tasks, reuse prompts that work well, improve them over time, and ideally build a shared library organized by use case or profession across the organization.
 
This practice reduces trial and error, and therefore environmental footprint, while improving the quality and consistency of results across teams. It also speeds up onboarding and reinforces a culture of continuous learning.


### 12. Organize your conversations

Organize and label discussions, and reuse existing material instead of starting over with requests that have already been answered or conversations that have already met your needs.
 
This practice reduces the volume of repeated requests, along with the related environmental impacts and costs. It also strengthens organizational memory and consistency of practice by reducing the loss of solutions that have already been developed.

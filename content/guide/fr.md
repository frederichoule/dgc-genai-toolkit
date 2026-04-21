---
title: "Meilleures pratiques en matière d'IA générative"
eyebrow: GUIDE
---

Il n'y a pas de méthode unique à faible impact pour utiliser l'IA générative.
L'empreinte environnementale de ces outils dépend de la manière dont ils sont utilisés, de ce qu'ils remplacent et de l'échelle à laquelle ils sont déployés.

Les meilleures pratiques suivantes ont pour objectif de faciliter la prise de décision dans des scénarios de production courants, en aidant les créateurs et créatrices à trouver un équilibre entre les considérations créatives, opérationnelles et environnementales.


## Avant

### 1. Comprendre la nature de l'IA et ses limites

L'intelligence artificielle (IA), et l'IA générative (IAG) en particulier, sont des domaines en évolution rapide. Comme pour toute nouvelle technologie ou tendance, il est important de l'aborder avec un esprit critique afin de pouvoir évaluer correctement ses promesses, ses limites et ses risques.

Les résultats peuvent également varier considérablement selon le contexte, les prompts utilisés et les outils sélectionnés. Des erreurs peuvent être produites même lorsque la sortie de la IAG semble très convaincante, et comme tout système construit sur des jeux de données historiques, l'IA peut refléter des biais sous-jacents.

Il est donc essentiel de vérifier l'exactitude des réponses, par exemple en demandant des sources et en évaluant leur crédibilité et leur fiabilité, afin de déterminer si l'outil a vraiment répondu à vos besoins avec un niveau de confiance suffisant. De bonnes habitudes peuvent être mises en place pour aider à réduire les erreurs et améliorer la fiabilité des résultats.

Cette pratique aide à réduire le risque d'erreurs coûteuses, de mauvaises décisions et de reprises inutiles.

### 2. Connaître les impacts environnementaux

Avant de commencer une tâche, prenez le temps de comprendre l'impact environnemental associé au type de tâche, au modèle sélectionné et aux facteurs qui influencent la consommation. Gardez à l'esprit que parmi les modèles d’IAG traditionnels, la génération d'images, d'audio ou de vidéo est particulièrement énergivore, la complexité, la multimodalité et la longueur des entrées et des sorties ayant toutes une influence. Les modèles de raisonnement, qui suivent un processus logique de résolution de problèmes, consomment nettement plus d’énergie que ceux qui n'utilisent pas le raisonnement.

En vous aidant à comprendre les conséquences environnementales de son utilisation, cette pratique vous permettra de déterminer quand l’IAG est réellement nécessaire et dans quelle mesure elle doit être utilisée, en équilibrant les avantages et les coûts environnementaux.

Cette pratique vous permet non seulement, en tant qu'individu, de prendre des décisions plus éclairées pour vos propres flux de travail, mais contribue également à créer une nouvelle norme. 

Une compréhension généralisée et une pratique plus responsable peuvent favoriser une culture plus responsable dans l'ensemble du secteur de l'écran, soutenant ainsi les efforts collectifs qui visent à réduire l'empreinte carbone globale de l'industrie.


### 3. Comprendre le besoin et éviter d'utiliser l’IAG par défaut

Demandez-vous si la tâche nécessite réellement l’emploi de l’IA générative, alors qu’un outil numérique plus simple suffirait. Réservez l’IA générative aux situations où elle apporte une valeur claire et essentielle, plutôt que de l’utiliser pour des tâches professionnelles futiles ou ludiques.

Cette pratique réduit la demande informatique inutile, ainsi que la consommation d’énergie et les coûts associés. Elle permet de définir plus clairement les cas d’utilisation légitimes de l’IA générative, facilitant ainsi la gouvernance et l’adhésion de l’organisation.


### 4. Choisir soigneusement les fournisseurs et l’infrastructure

Dans la mesure du possible, optez pour des solutions qui :
* __Sont transparentes__ : recherchez des solutions qui divulguent des informations sur l'infrastructure sur laquelle leurs modèles fonctionnent. Cela peut inclure l'emplacement des centres de données et leur performance environnementale, leur source d'électricité, leurs engagements climatiques et environnementaux et, idéalement, l'impact environnemental de chaque requête.
    Example: à ce jour, seuls quelques fournisseurs, tels que [Mistral](https://mistral.ai/news/our-contribution-to-a-global-environmental-standard-for-ai) et [Google](https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf), ont publié des travaux quantifiant l'impact environnemental de leurs agents conversationnels.
* __Sont des modèles open source__: ces modèles mutualisent les efforts technologiques et évitent de réinventer la roue pour des cas d’utilisation et des besoins similaires.
    Exemple : consultez les modèles disponibles sur [Hugging Face](https://huggingface.co)
* __Sont locaux__ : une plus grande proximité peut améliorer les performances en réduisant la latence entre les utilisateur.trices et les centres de données.
    Exemple : les infrastructures situées au Québec, en Ontario, au Manitoba ou en Colombie-Britannique peuvent généralement être moins intensives en carbone que celles situées aux États-Unis. Consultez l’intensité carbone par province sur  [ElectricityMaps](https://app.electricitymaps.com/map/all/yearly)
* Sont compatibles avec les considérations de __souveraineté__: puisque certains pays peuvent utiliser l'IA comme un outil de domination, il peut donc être judicieux de ne pas s'appuyer sur des systèmes d'IA provenant de ces pays, afin de ne pas fournir de nouvelles méthodes de coercition ou d'encouragement.
    Exemple : privilégiez des fournisseurs tels que Cohere, une entreprise canadienne, ou Mistral, une entreprise européenne.
 
Cette pratique contribue à réduire les risques liés à la réputation, aux aspects juridiques, à la dépendance et à l'environnement.


### 5. Choisir la bonne IA générative pour la bonne tâche

Évitez d'utiliser des modèles plus énergivores, tels que « reasoning » ou « pro », lorsqu'ils ne sont pas nécessaires, et privilégiez plutôt des modèles plus légers et plus rapides pour les questions plus simples. [Hugging Face](https://huggingface.co/spaces/AIEnergyScore/Leaderboard) peut constituer un point de départ utile pour comparer les performances énergétiques de différents systèmes d'IA générative selon les tâches. [AI Wattch](https://antarctica.io/ai-wattch) peut également vous aider à suivre la consommation d'énergie et les émissions de CO2 en temps réel tout au long de l'utilisation.

Cette pratique réduit à la fois le coût financier par requête et l'empreinte carbone associée, tout en limitant le risque de surenchère sous la forme de réponses inutilement longues ou complexes. Elle peut contribuer à normaliser des directives de sélection claires pour les équipes.


### 6. Imaginer le résultat final avant d'utiliser l’IAG

Clarifiez votre intention, l'utilisation prévue du résultat, le format final attendu et les informations contextuelles réellement nécessaires. L'objectif est d'obtenir un résultat exploitable avec le moins d'allers-retours possible.
Cette pratique réduit le nombre d'itérations, la puissance de calcul requise et le temps passé à rechercher. Elle améliore aussi la qualité du résultat et la reproductibilité des méthodes.


## Pendant

### 7. Réduire le nombre de générations en optimisant vos prompts

Utilisez une formulation plus précise dès le départ plutôt que d'essayer différentes requêtes à l'infini. Considérez la génération comme une ressource à optimiser, et non comme une conversation sans fin.

Il convient de noter que, pour tous les principaux modèles, la qualité du résultat a tendance à diminuer à mesure que les conversations s'allongent.

Cette pratique réduit considérablement le volume total de calculs, et donc la consommation d'énergie, tout en accélérant le travail. Elle réduit la charge cognitive et améliore la cohérence des résultats entre les personnes utilisatrices


### 8. Limiter les entrées

Plus vous êtes concis, plus vous évitez les informations inutiles, et plus vous filtrez le « bruit » tel que le texte redondant, les pièces jointes non pertinentes ou la politesse excessive avant de soumettre les données au modèle, moins votre requête sera énergivore.

Vous pouvez rendre les requêtes plus concises en évitant les formules de politesse, les répétitions et le contexte non pertinent, et en posant des questions directes et clairement définies. Par exemple, plutôt que de demander « Pourriez-vous me rédiger un résumé détaillé des principaux enjeux et défis en matière de durabilité auxquels est confronté le secteur mondial de l'écran », une formulation plus succincte pourrait être « Résumez les cinq principaux défis en matière de durabilité auxquels est confronté le secteur mondial de l'écran ».

Moins d'entrées signifie moins de calculs et souvent de meilleures réponses.

Cette pratique peut réduire les coûts et les impacts environnementaux au niveau organisationnel.


### 9. Limiter les résultats

Demandez un format précis et proportionné (par exemple, texte/tableau, liste à puces, nombre défini de paragraphes ou limite de caractères) pour éviter des résultats inutilement longs.

Cette pratique réduit directement le nombre de jetons générés, ainsi que la consommation d’énergie et les coûts associés. Elle encourage une communication plus claire et plus exploitable, qui favorise une prise de décision plus rapide.


### 10. Centraliser vos tâches dans un seul fil de discussion

Regroupez les tâches similaires au sein d’une même conversation afin que le contexte puisse être réutilisé et que les mêmes informations n’aient pas à être traitées plusieurs fois, en particulier lorsque des fichiers ont déjà été fournis.

Cette pratique réduit les répétitions, améliore la traçabilité et diminue la consommation liée à la reconstitution du contexte. Elle favorise un meilleur partage des connaissances en interne en préservant la continuité des échanges.


## Après

### 11. Enregistrer et affiner vos requêtes

Pour les tâches récurrentes, réutilisez les messages-guides qui fonctionnent bien, améliorez-les au fil du temps et, idéalement, constituez une bibliothèque partagée organisée par cas d’utilisation ou par profession à l’échelle de l’organisation.
Cette pratique réduit les essais et les erreurs, et donc l’empreinte environnementale, tout en améliorant la qualité et la cohérence des résultats entre les équipes. Elle accélère aussi l’intégration et renforce une culture d’apprentissage continu.


### 12. Organiser vos conversations

Organisez et étiquetez les discussions, et réutilisez le matériel existant au lieu de repartir de zéro avec des demandes qui ont déjà reçu une réponse ou des conversations qui ont déjà répondu à vos besoins.

Cette pratique réduit le volume de demandes répétées, ainsi que les impacts environnementaux et les coûts associés. Elle renforce la mémoire organisationnelle et la cohérence des pratiques en réduisant la perte de solutions déjà développées.


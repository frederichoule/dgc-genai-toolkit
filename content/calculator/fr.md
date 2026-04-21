---
eyebrow: À propos de la méthodologie du calculateur
title: Estimez la consommation d'énergie et l'empreinte carbone de votre utilisation de l'IA générative
---

Les outils d'IA générative s'intègrent de plus en plus dans les flux de travail créatifs quotidiens, qu’il s’agisse de la préparation de documents à la génération d'images, en passant par la production vidéo et audio. Derrière chaque utilisation se cache un impact environnemental qui n'est pas toujours visible.

Ce calculateur est un moyen simple d'estimer la consommation d'énergie et l'empreinte carbone associées aux tâches courantes de l'IA générative, et de mieux comprendre comment les différents types d'utilisation contribuent à votre impact global.


## Comment utiliser le calculateur

Le calculateur se veut être flexible et peut être utilisé à deux niveaux en fonction de vos besoins.

### Mode de base

Estimez rapidement votre impact :
* Saisissez des paramètres d'utilisation simples (texte, image, vidéo, audio).
* Obtenez une estimation globale de la consommation d'énergie et des émissions de carbone.
* Visualisez votre impact à l'aide d'équivalents clairs.

### Mode avancé
Obtenez une estimation plus détaillée:
* Affinez les principaux paramètres (type de modèle, jetons, durée, itérations).
* Reflétez mieux des flux de travail ou des contextes de production spécifiques.
* Comparez différents types d'utilisation de l'IA avec une plus grande précision.

Ce mode est conçu pour les utilisateur.trices qui souhaitent une compréhension granulaire de leur impact.

## Méthodologie du calculateur 

### Estimation de l’impact environnemental de l’IA générative pour différents cas d’utilisation
Comprendre les impacts de l’IA et les principaux paramètres qui les influencent est la première étape vers une utilisation plus consciente et responsable d’une technologie qui façonnera les décennies à venir.
Si l’IA peut entraîner des conséquences profondes sur plusieurs aspects de notre société et de nos écosystèmes, nous nous concentrons ici spécifiquement sur les impacts environnementaux, en particulier la consommation d’énergie et les émissions de carbone. Ces indicateurs sont intrinsèquement liés par la transition énergétique et carbone mise en œuvre par l'Accord de Paris (2015), qui vise à maintenir « l'augmentation de la température moyenne mondiale bien en dessous de 2°C au-dessus des niveaux préindustriels » et à poursuivre les efforts « pour limiter l'augmentation de la température à 1,5°C au-dessus des niveaux préindustriels ».

### Approche
Nous visons à évaluer et à agréger les impacts environnementaux des services d'IA par le biais d’une approche basée sur l'utilisation.
Nous tenions à ce que cette méthodologie soit transparente, crédible, reproductible et aussi représentative que possible en nous appuyant sur des études évaluées par des pairs disponibles au moment de son élaboration (février 2026).
Ce domaine évoluant rapidement, nous améliorerons continuellement la méthodologie et invitons les commentaires.

### Cas d’utilisation de l’IA
Avant d’estimer les impacts, nous avons cherché à comprendre comment les créateur·trices audiovisuel·les intègrent l’IA dans leur travail et quels types de systèmes sont utilisés. Des sondages réalisés en ligne ont révélé divers cas d'utilisation, que nous avons simplifiés et regroupés en quatre catégories principales :
1. Lire un PDF de 100 pages et générer un résumé d'une page.
2. Générer une image photoréaliste en 2K à partir d'une consigne textuelle (itérations multiples).
3. Générer une courte vidéo HD à partir d'une consigne textuelle.
4. Générer un extrait audio à partir d'une consigne textuelle.

Ces cas d'utilisation visent à refléter les flux de travail créatifs réels dans l'industrie audiovisuelle.

### Approche du cycle de vie
Pour estimer correctement l'impact d'un service Internet, il faut inclure tous les éléments du système qui en permettent la fourniture. Les trois principaux éléments d'un système numérique sont généralement les appareils des utilisateur.trices, les réseaux et les centres de données. Pour être exhaustif, il faut également inclure la fabrication ou l'utilisation.

La méthodologie utilisée pour estimer l'impact environnemental d'un service s'appelle l'analyse du cycle de vie (ACV). Elle est décrite dans les normes ISO 14040 et 14044, ainsi que dans la norme ITU L.1410.

Cette approche est bien plus complète que certains calculateurs de carbone en ligne qui s'appuient généralement sur des statistiques mondiales. Elle permet d'estimer l'impact à l'aide d'une analyse multicritères (qui ne se limite pas à l'empreinte carbone) et prend en compte toutes les phases du cycle de vie d'un produit ou d'un service. Dans le cadre de ce projet, nous respecterons autant que possible les exigences de la méthodologie ACV et utiliserons les données environnementales les plus récentes et les plus cohérentes disponibles.

### Approche de modélisation
La collecte de données primaires à tous les niveaux des systèmes d'IA reste un défi, en particulier lorsqu'on s'appuie sur des services tiers. Deux approches sont généralement utilisées, à savoir la modélisation ascendante et la modélisation descendante.
Nous adoptons une approche ascendante qui estime les impacts sur la base d'activités granulaires (telles que l'utilisation au niveau des jetons) et extrapole la consommation au niveau du système.
Bien que plus complexe, cette approche est mieux adaptée aux systèmes d'IA, où l'impact environnemental est largement concentré dans l'infrastructure dorsale (centres de données et calcul).


### Modélisation spécifique à l'IA
Pour estimer l'inférence des grands modèles de langage (GML), nous nous appuyons sur la méthodologie développée par Ecologits / CodeCarbon qui fournit un cadre de référence pour estimer les impacts environnementaux des interactions avec les robots chat.

Nous conservons les limites du système d'origine en nous concentrant uniquement sur l'inférence, notamment :
* La consommation d'énergie des UTG et des serveurs.
* Les frais généraux des centres de données (refroidissement et infrastructure).

Nous excluons:
* La formation de modèles.
* Le stockage des données.
* Les appareils des utilisateur.trices finaux.finales.
* Les impacts sur le réseau.

Ces exclusions reflètent les limites des données et la cohérence méthodologique.
Pour étendre le modèle au-delà des systèmes textuels, nous adaptons la modélisation basée sur les jetons à la génération d'images, d'audio et de vidéo en nous inspirant du « One Token Model » développé par Antarctica.

### De la consommation d'énergie à l'impact environnemental

Une fois la consommation d'énergie estimée pour chaque cas d'utilisation, elle est convertie en indicateurs d'impact environnemental.

L'impact total comprend:
* __Impact intrinsèque__ : une part des émissions associées à la fabrication des UTG et des serveurs, répartie sur leur durée de vie.
* __Impact lié à l'utilisation__ : les émissions associées à la consommation d'électricité pendant l'inférence.

Nous tenons compte des efficacités du centre de données (ECD) et des variations de l'intensité carbone de l'électricité entre les régions afin de garantir que les résultats reflètent les conditions réelles.

__Cette méthodologie vise à fournir des estimations transparentes et pratiques, et non des mesures absolues.__

__Le modèle continuera d'être affiné et optimisé au fil et à mesure que les technologies d'IA évoluent et que de nouvelles données deviennent disponibles.__
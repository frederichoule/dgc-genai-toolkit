---
eyebrow: À propos de la méthodologie du calculateur
title: Estimer l'impact environnemental de l'IA générative selon différents cas d'usage
---

Comprendre les impacts de l'IA et les paramètres clés qui les influencent est la première étape vers un usage plus conscient et responsable d'une technologie qui façonnera les décennies à venir.

Bien que l'IA puisse avoir des impacts sur de nombreux aspects de notre société et de nos écosystèmes, nous nous concentrons ici spécifiquement sur les impacts environnementaux, en particulier la consommation d'énergie et les émissions de carbone, car ces deux indicateurs sont intrinsèquement liés par la transition énergie-carbone amorcée avec l'Accord de Paris (2015), visant à contenir « l'élévation de la température moyenne mondiale nettement en dessous de 2 °C par rapport aux niveaux préindustriels » et à poursuivre les efforts « pour limiter cette hausse à 1,5 °C par rapport aux niveaux préindustriels ».

## Approche

Nous cherchons à évaluer et à agréger les impacts environnementaux des services d'IA au moyen d'une approche basée sur l'usage.

Nous avons conçu cette méthodologie pour qu'elle soit transparente, sourcée, reproductible et aussi représentative que possible, compte tenu des données et des études disponibles au moment de son élaboration (février 2026). Ce domaine évoluant rapidement, nous encourageons les commentaires et l'amélioration continue de la méthodologie.

## Cas d'usage de l'IA

Avant d'estimer les impacts, nous avons cherché à comprendre comment les créateurs audiovisuels intègrent l'IA dans leur travail et quels types de systèmes sont utilisés en conséquence. Des sondages en ligne ont révélé divers cas d'usage, que nous avons simplifiés et regroupés en quatre grandes catégories :

- Lire un PDF de 100 pages et générer un résumé d'une page
- Générer une image photoréaliste 2K à partir d'un prompt textuel (plusieurs itérations)
- Générer une courte vidéo HD à partir d'un prompt textuel
- Générer un extrait audio à partir d'un prompt textuel

Ces cas d'usage visent à refléter des flux de travail créatifs réels dans l'industrie de l'écran.

## Approche cycle de vie

Pour estimer correctement l'impact d'un service web, chaque partie du système qui permet de fournir le service doit être incluse. Les trois principales composantes typiques d'un système numérique sont les appareils des utilisateurs, les réseaux et les centres de données. Pour être exhaustif, la fabrication comme l'usage doivent être pris en compte.

La méthodologie utilisée pour estimer l'impact environnemental d'un service s'appelle l'Analyse du Cycle de Vie (ACV). Elle est décrite dans les normes ISO 14040 et 14044, ainsi que dans l'UIT L.1450.

Cette approche est beaucoup plus complète que les calculateurs de carbone web, qui reposent uniquement sur des statistiques globales. Elle permet d'estimer l'impact au moyen d'une analyse multicritère (tenant compte de plus que la seule empreinte carbone) et prend en compte toutes les phases du cycle de vie d'un produit ou d'un service. Dans ce projet, nous nous conformerons aussi étroitement que possible aux exigences de la méthodologie ACV et utiliserons les données environnementales les plus récentes et les plus cohérentes disponibles.

## Approche de modélisation

La collecte de données primaires sur l'ensemble des couches des systèmes d'IA reste difficile, en particulier lorsqu'on dépend de services tiers. Deux approches sont généralement utilisées : la modélisation ascendante (bottom-up) et la modélisation descendante (top-down).

Nous adoptons une approche ascendante, qui estime les impacts à partir d'une activité granulaire (comme l'usage au niveau des tokens) et extrapole la consommation au niveau du système. Bien que plus complexe, cette approche est mieux adaptée aux systèmes d'IA, où l'impact environnemental se concentre largement dans l'infrastructure dorsale (centres de données et calcul).

## Modélisation spécifique à l'IA

Pour estimer l'inférence des grands modèles de langage (LLM), nous nous appuyons sur la méthodologie développée par **Ecologits / CodeCarbon**, qui fournit un cadre de référence pour estimer les impacts environnementaux des interactions avec des agents conversationnels.

Nous conservons les limites initiales du système, en nous concentrant uniquement sur l'inférence, incluant :

- La consommation énergétique des GPU et des serveurs
- Les coûts indirects des centres de données (refroidissement et infrastructure)

Nous excluons :

- L'entraînement des modèles
- Le stockage des données
- Les appareils des utilisateurs finaux
- Les impacts réseau

Ces exclusions reflètent les limites actuelles des données et la cohérence méthodologique.

Pour étendre le modèle au-delà des systèmes textuels, nous adaptons la modélisation basée sur les tokens à la génération d'images, d'audio et de vidéo, en nous inspirant du « One Token Model » développé par Antarctica.

## De l'énergie à l'impact environnemental

Une fois la consommation énergétique estimée pour chaque cas d'usage, elle est convertie en indicateurs d'impact environnemental. L'impact total inclut :

- **Impact incorporé :** une part des émissions associées à la fabrication des GPU et des serveurs, répartie sur leur durée de vie
- **Impact d'usage :** les émissions associées à la consommation d'électricité durant l'inférence

Nous tenons compte de l'efficacité des centres de données (PUE) et des variations de l'intensité carbone de l'électricité selon les régions, afin que les résultats reflètent les conditions réelles.

Cette méthodologie vise à fournir des estimations transparentes et pratiques, et non des mesures absolues.

À mesure que les technologies d'IA évoluent et que de nouvelles données deviennent disponibles, le modèle continuera d'être affiné et amélioré.

Consulter la [méthodologie complète](#)

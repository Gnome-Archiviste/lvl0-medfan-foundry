export default [
    {
        "id": "bonificationAvancee",
        "name": "Bonification avancée",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "(sur une personne)\n\nL’enchanteur infuse à une cible l’énergie nécessaire pour augmenter une statistique de base de celle-ci. L’enchanteur doit tenir en main le bon type de matériel qui servira de catalyseur au sort*.\n\n(sur un objet)\n\nL’enchanteur infuse dans un objet l’énergie nécessaire pour augmenter une statistique de base du porteur de l’objet. L’objet en question doit être neuf et préalablement traité pour recevoir l’enchantement. De plus il doit être certi du bon type de pierre qui servira de réceptacle au sort*. Pour que l'enchantement ne s’estompe pas à la fin de la première utilisation, il faut le sceller avec le sort de Permanence.\n\nVoici les enchantements à utiliser avec ce sort:.\n\nGrâce féline : Donne un bonus de +2 en Dextérité.\n\nReflet elfique : Donne un bonus de +2 en Charisme.\n\nForce du géant :  Donne un bonus de +2 en Physique.\n\nOeil de l’aigle : Donne un bonus de +2 en Perception.\n\nRuse du renard : Donne un bonus de +2 en Intelligence.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "+2 de bonus dans la statistique choisie"
        },
        "criticalSuccess": {
            "text": "+3 de bonus dans la statistique choisie"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "referezVousALaTableDesPierresPrecieusesEtSemiPrecieuses",
        "name": "* Référez-vous à la table des pierres précieuses et semi-précieuses",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Création primordiale\n\nCe sort crée un objet non magique de matière végétale, pierre, cristal, métal ou pierre précieuse. Le volume de l’objet créé ne peut excéder 40 centimètres cubes par niveau d’arcane de l’enchanteur. Le lanceur doit réussir un ou plusieurs tests d’une habilité spécifiques pour fabriquer un objet complexe. Par exemple, forgeron pour une arme non commune ou ayant plusieurs types d’éléments. La durée de l’objet créé varie avec sa dureté et sa rareté relatives : la matière végétale dure 2 heures/arcane; la pierre, le cristal et les métaux communs durent 1 heure/arcane; les métaux précieux durent 20 minutes/arcane; les pierres précieuses durent 10 minutes/arcane. \n\nOn ne peut pas faire de permanence sur les objets créés par ce sort.",
        "distance": {
            "text": "Touché"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Un objet"
        },
        "criticalSuccess": {
            "text": "&"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "desintegration",
        "name": "Désintégration",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Désintègre des objets fixes. Le magicien doit toucher l’objet pendant une minute.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Après une minute"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Durée instantané"
        },
        "damage": {
            "text": "Détruit"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "potionsUtilitairesClefs",
        "name": "Potions utilitaires clefs",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’enchanteur prépare la potion (de couleur et de consistance variant la potion. Voir le manuel des objets dans un grand chaudron contenant divers ingrédients ainsi qu’une pincée de poudre de perlépipein et qui doit mijoter et être touillée pendant 6 heures. L’enchanteur fait 3 potions par 3 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane. Selon la potion, l'ingrédient principal est le suivant:\n\nGel fantômatique: 2 cuillères à soupe de craie, 1 cuillère à soupe de sel et une pincée\n\n        de charbon. Faire évaporer entièrement.\n\nPotion de chance: 1 choux, 500 g. de flageolets, 1 artichaut et un bouquet de persil. \n\nBrasser avec une plume d’albatros.\n\nPotion de confusion: 1 litre d’eau distillée, 100 ml de vinaigre blanc et 5 g. de sel. Mettre \n\nun quartz clair dans le fond de la marmite.\n\n\n\n\n\nPoudre de sommeil: 100 g. de talc, 50 g. de poudre de magnétite, 6 dahlia roses (fleurs)         et une pincée supplémentaire de poudre de perlépipein. Faire évaporer\n\nentièrement.\n\nPotion de miniaturisation: 100 g. de toile d’araignée, 200 g. de poussière et \n\n12 feuilles mortes tombées naturellement en poudre. \n\nFaire évaporer entièrement.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "Le chaudron"
        },
        "bonus": {
            "text": "Dépends de la potion"
        },
        "criticalSuccess": {
            "text": "fait 4 potions par mana au lieu de 3."
        },
        "dependsOnArcaneLevel": false
    }
]
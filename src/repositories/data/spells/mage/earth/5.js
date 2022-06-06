export default [
    {
        "id": "affutage",
        "name": "Affûtage",
        "icon": "icons/skills/trades/smithing-tongs-metal-red.webp",
        "description": "Augmente les dégâts physiques d’une arme de mêlée pour une scène.",
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
            "text": "Une arme"
        },
        "criticalSuccess": {
            "text": "Permanent"
        },
        "damage": {
            "element": "physic",
            "text": "+1d6 + 2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "auraDePoussiere",
        "name": "Aura de poussière",
        "icon": "icons/magic/defensive/shield-barrier-flaming-pentagone-purple-orange.webp",
        "description": "Le contour du sujet semble flou, accordant un bonus de 1 point d’armure. Comme il est plus dur à voir, ce qui le rend plus difficile à toucher, ajoutant 1 point dans l’habileté Éviter.\n\n\n\n\n\nUn sort de « Voir l’invisibilité » ne neutralise pas l’effet de flou. Les adversaires qui ne peuvent pas voir le sujet ignorent l’effet du sort.\n\n\n\n",
        "distance": {
            "text": "toucher"
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
            "text": "+1 d’armure, +1 éviter"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "defenseDuFeroxyde",
        "name": "Défense du Feroxyde",
        "icon": "icons/commodities/tech/metal-claws.webp",
        "description": "Une couche métallique rappelant la carapace d’un feroxyde recouvre le torse et les bras de la cible, lui donnant une armure pouvant encaisser 15 pts de dégâts. De plus, des griffes de métalliques recouvrent les mains de la cible, lui permettant d’attaquer avec ses deux (2) mains et faire 1d6 par attaque.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "protection de 15 points de résistance, 2 attaques par tour"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience[h][i]"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "passerelle",
        "name": "Passerelle",
        "icon": "icons/environment/settlement/bridge-stone.webp",
        "description": "L'élémentaliste peut faire croître un pont de pierre au dessus d’un espace profond",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "area": {
            "text": "x mètres de long"
        },
        "criticalSuccess": {
            "text": "Double la largeur"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "plierLaPierre",
        "name": "Plier la pierre ",
        "icon": "icons/skills/trades/mining-pickaxe-iron-blue.webp",
        "description": "Vous façonnez la pierre de façon permanente jusqu'à un 3 mètres cube dans une autre forme. Le processus de transformation peut prendre de quelques secondes à quelques minutes, selon le degré de détail impliqué. Un rocher peut avoir la forme d'une épée, d'une boîte, d'une porte, d'un passage ou d'une pièce jusqu'à 3 mètres de profondeur. Des pièces mobiles rudimentaires peuvent être construites, telles que des charnières ou un loquet. Le processus de transformation n'est généralement pas assez rapide pour être utilisé comme attaque (par exemple, il ne serait normalement pas possible de sceller un ennemi dans un mur de pierre).",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Entre 5 tours et une scène (à la discrétion du Maître de jeu)"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Durée instantannée ?[j]"
        },
        "dependsOnArcaneLevel": false
    }
]
export default [
    {
        "id": "affutage",
        "name": "Affûtage",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
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
        }
    },
    {
        "id": "auraDePoussiere",
        "name": "Aura de poussière",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
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
            "text": "une cible"
        },
        "bonus": {
            "text": "+1 d’armure, +1 éviter"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        }
    },
    {
        "id": "passerelle",
        "name": "Passerelle",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
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
            "text": "x mètre de long"
        },
        "criticalSuccess": {
            "text": "Double la largeur"
        }
    },
    {
        "id": "plierLaPierre",
        "name": "Plier la pierre ",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
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
            "text": ""
        }
    }
]
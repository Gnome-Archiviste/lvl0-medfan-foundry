export default [
    {
        "id": "armureNitrique",
        "name": "Armure nitrique",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste fait apparaître une couche gélatineuse blanchâtre et légèrement fumante qui absorbe jusqu’à 15 points de dégâts. Le sort peut être fait sur l’élémentaliste ou un allié. L’élémentaliste doit toucher la cible. De plus, l’attaquant reçoit 1 point de dégât dû aux éclaboussures de l’armure lorsqu’on l’attaque. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Tant que les 15 points ne sont pas utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe 15 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe 30 points de dégâts"
        }
    },
    {
        "id": "auraDacide",
        "name": "Aura d’acide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le contour du sujet semble déformé, accordant un bonus de 1 point d’armure. Comme il est plus dur à voir, ce qui le rend plus difficile à toucher, ajoutant 1 point dans l’habileté Éviter.\nUn sort de « Voir l’invisibilité » ne neutralise pas l’effet de flou. Les adversaires qui ne peuvent pas voir le sujet ignorent l’effet du sort.",
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
        "id": "contactAcide",
        "name": "Contact acide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Les mains de l’élémentaliste sont entourées d’un liquide vert brillant qui semble bouillonner. Le toucher de l’élémentaliste inflige 5d6 points de dégâts d’acide, +1  par niveau d’arcane.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '5d6+' + (1 * context.actorData.computedData.magic.arcaneLevel);",
            "element": "acid",
            "text": "5d6 + (1 par niveau d’arcane)"
        }
    },
    {
        "id": "degatsMarines",
        "name": "Dégâts marinés",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Change les dégâts d’une arme en dégât d’acide provoquant 1d6 de dégât bonus, pour une scène.",
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
        "bonus": {
            "text": "+1d6, tous les dégâts sont d’acide"
        },
        "criticalSuccess": {
            "text": "Permanent"
        }
    },
    {
        "id": "rongeArmure",
        "name": "Ronge armure",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le sort s’attaque à l’armure de la cible et lui enlève un point de protection. Il faut faire réparer l’armure pour lui redonner sa pleine protection.",
        "distance": {
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Jusqu’à ce que l’armure soit réparée"
        },
        "area": {
            "text": "une cible"
        },
        "bonus": {
            "text": "-1 d’armure"
        },
        "resilience": {
            "text": "Annule le sort"
        },
        "criticalSuccess": {
            "text": "La cible lance un d6. Si le résultat est cinq (5) ou six (6), l’armure est détruite."
        }
    }
]
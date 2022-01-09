export default [
    {
        "id": "creationMajeureDeFeu",
        "name": "Création majeure de feu",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Créer une flamme 10 m³ par niveau d’arcane de l'élémentaliste.",
        "distance": {
            "value": 6,
            "unit": "mètre",
            "text": "6 mètres"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "criticalSuccess": {
            "text": "Crée une flamme de 20m³ par arcane"
        }
    },
    {
        "id": "elementaireMajeurDeFeu",
        "name": "Élémentaire majeur de feu",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L'élémentaliste invoque un petit élémentaire de feu à partir d'une source de feu (au moins l’équivalent d’une feu de foyer). L'élémentaire majeur obéit à des ordres complexes et peut se battre pour défendre l'élémentaliste. \n\nPHY 7, DEX 6, INT 4, CHA 6, PER 6\n\nHP 80, Armure : 2, H2H : 9, Lancer/tir : 8\n\nAttaques : H2H = 10 de dégâts, projectile de feu: 2d6+2 (2 fois)\n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "criticalSuccess": {
            "text": "Double les points de vie"
        },
        "damage": {
            "text": "Voir statistique de l’élémental"
        }
    },
    {
        "id": "fascination",
        "name": "Fascination",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le feu est un élément qui a fasciné l'homme depuis le début des temps. L’élémentaliste crée une petite flamme dans la paume de sa main qui bouge avec un mouvement circulaire répétitif qui concentre l’attention de la victime. La victime est figée, concentrée sur la flamme, faisant ainsi abstraction de tout ce qui l'entoure tant que le sort fait effet ou qu’on l’attaque. L’élémentaliste peut laisser la flamme en suspens et se déplacer, la laissant sur place.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "bonus": {
            "text": "Immobilise une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "L’élémentaliste peut fasciner 2 cibles."
        }
    },
    {
        "id": "pareFeu",
        "name": "Pare-feu",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Une flamme vaporeuse et colorée entourant le personnage comme une cape de feu. Toute créature infligeant des dégâts physiques subit 1d6 points de dégâts +1 par arcane de l’élémentaliste en raison des flammes intenses mais la résilience aux sorts s’applique à ces dégâts. Cependant le sort ne bloque aucun dégât physique infligé à l’élémentaliste. Les personnages entourés d’un pare-feu ne subissent que la moitié des dégâts des attaques à froid, et aucun dommage si l’attaque permet une résilience de la moitié des dégâts et que le lanceur réussit.  Le personnage recouvert de flammes émet de la lumière comme une torche tamisée, dont la couleur est choisie par l’élémentaliste (bleu, violet ou orange rougeâtre).\n\n\n\n",
        "distance": {
            "text": "Aucune"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "L’élémentaliste"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "text": "1d6 +(1 par niveau d’arcane) points de dégâts"
        }
    },
    {
        "id": "souffleDuDragon",
        "name": "Souffle du dragon",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L'élémentaliste crache un jet de feu devant lui tel un dragon. ",
        "distance": {
            "text": "20 mètre de long a partir du magicien"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "1 mètre en avant de l'élémentaliste"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '2d6+' + (4 * context.actorData.computedData.magic.arcaneLevel);",
            "element": "fire",
            "text": "2d6 + (4 par niveau d’arcane)"
        }
    }
]
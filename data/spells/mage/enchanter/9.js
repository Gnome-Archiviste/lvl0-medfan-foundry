export default [
    {
        "id": "degatsMaceres",
        "name": "Dégâts macérés",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Change les dégâts d’une arme en dégât d’acide pour une scène.",
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
            "text": "+ 2d6, Transforme les dégâts en dégâts d’acide"
        },
        "criticalSuccess": {
            "text": "+3d6"
        },
        "damage": {
            "element": "acid",
            "text": "+2d6"
        }
    },
    {
        "id": "electrisation",
        "name": "Électrisation",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Change les dégâts d’une arme en dégât électrique pour une scène.",
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
            "text": "Tous les dégâts sont électrique"
        },
        "criticalSuccess": {
            "text": "+3d6"
        },
        "damage": {
            "element": "electric",
            "text": "+2d6"
        }
    },
    {
        "id": "lameIncendiaire",
        "name": "Lame incendiaire",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Allume une lame normale, provoquant + 2d6 de dégâts. Change les dégâts d’une arme en feu pour une scène.\n\n\n\n",
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
            "text": "Tous les dégâts sont de feu"
        },
        "criticalSuccess": {
            "text": "+3d6"
        },
        "damage": {
            "element": "fire",
            "text": "+2d6"
        }
    },
    {
        "id": "surgelation",
        "name": "Surgélation",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Change les dégâts d’une arme en dégât de froid pour une scène.",
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
            "text": "Tous les dégâts sont de froid"
        },
        "criticalSuccess": {
            "text": "+3d6"
        },
        "damage": {
            "element": "water",
            "text": "+2d6"
        }
    },
    {
        "id": "potionsUtilitairesRaresf",
        "name": "Potions utilitaires rares[f]",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’enchanteur prépare la potion (de couleur et de consistance variant la potion. Voir le manuel des objets)  dans un grand chaudron contenant divers ingrédients ainsi qu’une pincée de poudre de perlépipein et qui doit mijoter et être touillée pendant 8 heures. L’enchanteur fait 3 potions par 3 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane. Selon la potion, l'ingrédient principal est le suivant:\n\nCarte liquide: 500 g. d’orge, 1 l. de lait et 25 g. de poudre de charbon de bois. Faire frémir \n\nseulement. Presser et conserver seulement le jus.\n\nEnsemble merveilleux (biscuit)*: 2 cuillères à soupe de craie, 1 cuillère à soupe de sel et une pincée de charbon.\n\nEnsemble merveilleux (jus)*: 2 cuillères à soupe de craie, 1 cuillère à soupe de sel et une pincée de charbon.\n\nPotion du géant: 1 choux, 500 g. de flageolets, 1 artichaut et un bouquet de persil. \n\nBrasser avec une plume d’albatros.\n\nPotion du minotaure: 1 litre d’eau distillée, 100 ml de vinaigre blanc et 5 g. de sel. Mettre \n\nun quartz clair dans le fond de la marmite.\n\n\n\n\n\n*L’ensemble merveilleux se vend toujours de pair.\n\n\n\n",
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
        }
    }
]
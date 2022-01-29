export default [
    {
        "id": "babelfish",
        "name": "Babelfish",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet de comprendre toute langue des créatures pensantes pendant 7 tours.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 7",
            "value": 7,
            "unit": "tours",
            "text": "7 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "cornetDeFroid",
        "name": "Cornet de froid",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Un cône de froid extrême jaillit de la main du magicien, affectant jusqu’à trois (3) victimes dans une zone de 10 mètres de large et jusqu’à 10 mètres de long en avant du magicien, causant 3d6 points de dégâts et les figent sur place.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 2,
            "unit": "tours",
            "text": "2 tours"
        },
        "area": {
            "text": "Trois cibles qui sont dans les 10 mètres"
        },
        "bonus": {
            "text": "Victimes immobiliser"
        },
        "resilience": {
            "text": "Victimes non immobiliser"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '3d6';",
            "element": "water",
            "text": "3d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "dissipationDeLaMagie",
        "name": "Dissipation de la magie",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Annule un sort de magie général d’arcane 5 ou moins. Annule un sort de magie spécialisé d’arcane 2 ou moins. Doit toucher la cible.",
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
        "criticalSuccess": {
            "text": "Annule un sort de magicien d’arcane 6 et non-magicien d’arcane 3"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "illusion",
        "name": "Illusion",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet de faire apparaître une illusion jusqu’à 20 mètres de haut.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 15",
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
        },
        "area": {
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "peauDePierre",
        "name": "Peau de pierre",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permets d’absorber 15 points de dégâts. Le sort peut être fait sur le magicien ou un allié. Le magicien doit toucher la cible. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
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
        },
        "dependsOnArcaneLevel": false,
        "actions": {
            "addEffect": {
                "name": "Ajouter l'effet",
                "type": "addEffect",
                "data": {
                    "duration": {
                        "text": "Tant que les 15 points ne sont pas utilisés"
                    },
                    "effectName": "Peau de pierre",
                    "magicArmor": {
                        "formula": "return context.criticalSuccess ? 30 : 15"
                    }
                }
            }
        }
    },
    {
        "id": "resistanceALacide",
        "name": "Résistance à l’acide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre l’acide. Le sort réduit de moitié le dommage produit par l’acide, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par l’acide"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée à l’acide"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resistanceALelectricite",
        "name": "Résistance à l’électricité",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre l’électricité. Le sort réduit de moitié le dommage produit par l’électricité, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par l’électricité"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée à l’électricité"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resistanceAuFeu",
        "name": "Résistance au feu",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre le feu. Le sort réduit de moitié le dommage produit par le feu, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par le feu"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée au feu"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resistanceAuFroid",
        "name": "Résistance au froid",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre le froid. Le sort réduit de moitié le dommage produit par le froid, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "1 scène (une journée pour le froid ordinaire)"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par le froid"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée au froid."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "voirLinvisible",
        "name": "Voir l’invisible",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet au destinataire de voir tous les êtres invisibles (incluant l’invisibilité magique), éthérés ou astraux comme s’ils étaient normalement visibles. Le sort ne permet pas de reconnaître les illusions ni de détecter les choses cachées par des moyens autres que l’invisibilité.\n\n\n\n",
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
        "criticalSuccess": {
            "text": "La durée devient une journée"
        },
        "dependsOnArcaneLevel": false
    }
]
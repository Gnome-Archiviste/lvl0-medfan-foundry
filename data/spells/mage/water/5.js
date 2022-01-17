export default [
    {
        "id": "douves",
        "name": "Douves",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Créer un anneau d'eau de 3m. de large par 4 m. de profondeur autour de l'élémentaliste, empêchant toute attaque en mêlée. La douve ne se déplace pas.\n\nDe base la douve dure un (1) tour par niveau d’arcane de l'élémentaliste. S’il le veut, l'élémentaliste peut maintenir la douve plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour. \n\n\n\n",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "value": 3,
            "unit": "m",
            "text": "3 mètres"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "fureurDuYeti",
        "name": "Fureur du Yéti",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Une couche de glace recouvre le torse et les bras de la cible, lui donnant une armure pouvant encaisser 15 pts de dégâts. De plus, des griffes de glace recouvrent les mains de la cible, lui permettant d’attaquer avec les deux (2) mains et faire 1d6 par attaque.",
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
            "text": "La cible ne peut pas faire de test de résilience"
        }
    },
    {
        "id": "glaciation",
        "name": "Glaciation",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Change les dégâts d’une arme en dégât de froid pour une scène et ajoute 1d6.",
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
            "text": "+1d6, tous les dégâts sont de  froid"
        },
        "criticalSuccess": {
            "text": "Permanent"
        }
    },
    {
        "id": "marcherSurLeau",
        "name": "Marcher sur l’eau",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet à une cible de marcher sur un liquide comme si elle marchait sur un sol solide. Le sort dure 10 tours.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "separerLesEaux",
        "name": "Séparer les eaux",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Créer un passage dans un bassin d'eau (lac, rivière mais pas une mer) en repoussant l'eau de chaque côté.\n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Jusqu'à ce que le dernier membre de l'équipe soit passé"
        },
        "area": {
            "text": "2 mètres de large par 60 mètre de long"
        },
        "criticalSuccess": {
            "text": "4 mètres de large par 60 mètre de long"
        }
    }
]

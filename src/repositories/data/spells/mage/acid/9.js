export default [
    {
        "id": "perceMuraille",
        "name": "Perce muraille",
        "icon": "icons/magic/acid/orb-bubble-smoke-drip.webp",
        "description": "L'élémentaliste envoie un jet d’acide qui se colle à une paroie et la fait fondre, ce qui crée une brèche dans le mur. Attention, si vous percez un plancher, il se peut que cela aille plus creux que prévu.\n\n\n\n",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "2,5 mètres de haut par 1 mètre de large"
        },
        "bonus": {
            "text": "Créer un trou 2.5 m. de haut par 1 m. de large dans la paroie"
        },
        "criticalSuccess": {
            "text": "Trou de 4 m. de haut par 5 m. de large"
        },
        "damage": {
            "text": "Aucun sauf à la paroie"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "solfatare",
        "name": "Solfatare",
        "icon": "icons/magic/acid/dissolve-pool-bubbles.webp",
        "description": "L'élémentaliste crée une mare de boue bouillonnante qui forme une gigantesque bulle de boue remplie de gaz sulfureux qui finit par exploser projetant tous ceux à 10 mètres, recouvrant les cibles d’une boue toxique.\n\n\n\n",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 11,
            "widthPerArcane": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Recul de 10 mètres"
        },
        "damage": {
            "rollFormula": "return '5d6+10';",
            "element": "acid",
            "text": "5d6 + 10"
        },
        "dependsOnArcaneLevel": false
    }
]
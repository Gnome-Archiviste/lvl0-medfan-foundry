export default [
    {
        "id": "perceMuraille",
        "name": "Perce muraille",
        "description": "L'élémentaliste envoie un jet d’acide qui se colle à une paroie et la fait fondre, ce qui crée une brèche dans le mur. Attention, si vous percez un plancher, il se peut que cela aille plus creux que prévu.",
        "distance": {
            "value": 20,
            "unit": "m"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "2.5 m de haut par 1 m. de large"
        },
        "bonus": {
            "text": "Créer un trou 2.5 m. de haut par 1 m. de large dans la paroie"
        },
        "resilience": {
            "text": "Trou de 4 m. de haut par 5 m. de large"
        },
        "damage": {
            "text": "Aucun sauf à la paroie"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "solfatare",
        "name": "Solfatare",
        "description": "L'élémentaliste crée une mare de boue bouillonnante qui forme une gigantesque bulle de boue remplie de gaz sulfureux qui finit par exploser projetant tous ceux à 10 mètres, recouvrant les cibles d’une boue toxique.",
        "distance": {
            "value": 20,
            "unit": "m"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 5,
            "unit": "m"
        },
        "bonus": {
            "value": 10,
            "unit": "m"
        },
        "damage": {
            "rollFormula": "return '5d6+10';",
            "element": "acid"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
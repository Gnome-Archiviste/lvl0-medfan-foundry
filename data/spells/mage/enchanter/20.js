export default [
    {
        "id": "enchantementAdditionnel",
        "name": "Enchantement additionnel",
        "description": "Permet de mettre un deuxième enchantement sur un objet. Doit-être fait après la première permanence. Le deuxième enchantement doit être fait tout de suite suivi d'une seconde permanence.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Deuxième enchantement."
        },
        "resilience": {
            "text": "Pas besoin d’une permanence pour le 2eme enchantement"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "enchantementSuperieur",
        "name": "Enchantement supérieur",
        "description": "Enchanté une arme pour un combat. Ajouter +5 aux dégâts et les tous les doubles (sauf les 6) sont aussi considérés comme un succès exceptionnel. Besoin de permanence pour conserver l’effet.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "+5 dégâts, double = succès exceptionnel."
        },
        "resilience": {
            "text": "Dégâts +10"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "permanenceSuperieur",
        "name": "Permanence supérieur",
        "description": "Permet à l’élémentaliste de sceller un sort dans un objet sans que l'utilisateur ait besoin de recharger l’objet au bout d’un certain nombre d’utilisations. Il faut faire le sort 10x, avant de lancer le sort Permanence supérieur sur l’objet récepteur. Attention aux doubles 6.\nNe peut se faire que sur un objet préalablement préparé pour recevoir le sort.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "text": "Prend 1 minute à lancer"
        },
        "area": {
            "text": "Une cible"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
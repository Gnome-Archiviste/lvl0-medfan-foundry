export default [
    {
        "id": "enchantementAdditionnel",
        "name": "Enchantement additionnel ",
        "icon": "icons/magic/symbols/circled-gem-pink.webp",
        "description": "Permet de mettre un deuxième enchantement sur un objet. Doit-être fait après la première permanence. Le deuxième enchantement doit être fait tout de suite suivi d'une seconde permanence. ",
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
            "text": "Deuxième enchantement."
        },
        "criticalSuccess": {
            "text": "Pas besoin d’une permanence pour le 2eme enchantement"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "enchantementSuperieur",
        "name": "Enchantement supérieur",
        "icon": "icons/magic/symbols/runes-carved-stone-yellow.webp",
        "description": "Enchanté une arme pour un combat. Ajouter +5 aux dégâts et les tous les doubles (sauf les 6) sont aussi considérés comme un succès exceptionnel. Besoin de permanence pour conserver l’effet.",
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
            "text": "+5 dégâts, double = succès exceptionnel."
        },
        "criticalSuccess": {
            "text": "Dégâts +10"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "permanenceSuperieur",
        "name": "Permanence supérieur",
        "icon": "icons/magic/time/hourglass-tilted-gray.webp",
        "description": "Permet à l’enchanteur de sceller un sort dans un objet sans que l'utilisateur ait besoin de recharger l’objet au bout d’un certain nombre d’utilisations. Il faut faire le sort 10x, avant de lancer le sort Permanence supérieur sur l’objet récepteur. Attention aux doubles 6.\n\nNe peut se faire que sur un objet préalablement préparé pour recevoir le sort.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Prend 1 minute à lancer"
        },
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    }
]
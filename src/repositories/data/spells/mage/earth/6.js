export default [
    {
        "id": "armureDeFer",
        "name": "Armure de fer",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet d’absorber 25 points de dégâts. Le sort peut être fait sur l'élémentaliste ou un allié. L'élémentaliste doit toucher la cible. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Tant que les 25 points ne sont pas utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe 25 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe 50 points de dégâts"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "chevalDePierre",
        "name": "Cheval de pierre",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Créer un cheval puissant magique pour une (1) heure par arcane. Il est puissant, il peut tirer à lui seul un chariot contenant jusqu'à 6 personnes.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "priseTellurique",
        "name": "Prise tellurique",
        "icon": "",
        "description": "L'élémentaliste crée une zone dans laquelle il peut regagner 3 points de mana par tour tant qu’il reste dans la zone sans être déconcentré. Ce sort est utilisable en combat mais si l’élémentaliste est touché (poussé ou blessé), il doit réussir un jet de concentration pour conserver son sort. L’élémentaliste peut faire le sort pour un autre magicien au niveau d’arcane 7.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "1 tour par arcane"
        },
        "area": {
            "value": 1,
            "unit": "cible",
            "text": "1 cible"
        },
        "bonus": {
            "text": "permet de regagner du mana"
        },
        "criticalSuccess": {
            "text": "diminue la durée à 5 minutes"
        },
        "dependsOnArcaneLevel": false
    }
]
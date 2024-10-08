export default [
    {
        "id": "cahotementDePierres",
        "name": "Cahotement de pierres",
        "icon": "icons/magic/earth/projectiles-stone-salvo-red.webp",
        "description": "L'élémentaliste fait sauter les pierres environnantes du sol sur les ennemis dans une zone. Au début, les pierres tout autour se mettent à trembler avant de littéralement se jeter sur l’ennemi le plus proche.",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "tour",
            "text": "1 tour"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "moitié des dégâts"
        },
        "criticalSuccess": {
            "text": "Fait le maximum de dégâts."
        },
        "damage": {
            "rollFormula": "return '3d6';",
            "text": "3d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "jonctionTellurique",
        "name": "Jonction tellurique",
        "icon": "icons/magic/symbols/runes-star-pentagon-orange-purple.webp",
        "description": "L'élémentaliste crée une zone dans laquelle il peut regagner 15 points de mana. L’élémentaliste doit rester dans la zone pendant 10 minutes sans être déconcentré. Si l’élémentaliste est touché (poussé ou blessé), il doit réussir un jet de concentration pour conserver son sort. L’élémentaliste peut faire le sort pour un autre magicien au niveau d’arcane 6.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "10 minutes de jeu"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Permet de regagner du mana"
        },
        "criticalSuccess": {
            "text": "diminue la durée à 5 minutes"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "plusValue",
        "name": "Plus value",
        "icon": "icons/commodities/gems/gem-rough-pendeloque-blue.webp",
        "description": "L'élémentaliste est capable d’augmenter la valeur d’une pierre précieuse de 10% par niveau d’arcane. Ne peut être fait qu’une seule fois sur une pierre.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Effet maximum automatique (100%)"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "pointesDePierre",
        "name": "Pointes de pierre",
        "icon": "icons/magic/earth/barrier-stone-explosion-debris.webp",
        "description": "Ce sort provoque la création de formations en pointes étroites et aiguisées sur un sol déjà en pierre autour de l'élémentaliste. L'élémentaliste peut affecter une zone de un mètre plus deux mètres par niveau d’arcane par niveau d’arcane. Ces pointes de pierre restent discrètes jusqu’à ce que quelqu’un d’autre que l'élémentaliste les traverse. Dans ce cas, ils peuvent infliger des dégâts et réduire le mouvement. Les pierres aiguisées causent 1d6 dégâts aux imprudents. Une créature se déplaçant dans la zone subit des blessures à tous les mètres de mouvement.\n\nDe base, la zone de pointe de pierre dure un (1) tour par niveau d’arcane de l'élémentaliste. S’il le veut, l'élémentaliste peut maintenir l’anneau plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "un (1) tour par niveau d’arcane"
        },
        "area": {
            "text": "(1 + 2 par niveau d’arcane)x(1 + 2 par niveau d’arcane)"
        },
        "bonus": {
            "text": "Moitié du mouvement"
        },
        "resilience": {
            "text": "moitié des dégâts"
        },
        "criticalSuccess": {
            "text": "6 points de dégâts par mètre"
        },
        "damage": {
            "text": "1d6 par mètre"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "poussieresDansLesYeux",
        "name": "Poussières dans les yeux",
        "icon": "icons/magic/air/air-wave-gust-smoke-yellow.webp",
        "description": "L’élémentaliste envoie un jet de sable dans les yeux de sa victime, ce qui rend une tête de la victime aveugle pour un (1) tour par arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "1  tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "-3 perception et toutes habilités de combats."
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "dependsOnArcaneLevel": false
    }
]
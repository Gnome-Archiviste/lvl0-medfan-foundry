export default [
    {
        "id": "plusValue",
        "name": "Plus value",
        "icon": "icons/commodities/gems/gem-rough-pendebloque-blue.webp",
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
            "text": "Effet maximum automatique (100%)[n]"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "pointesDePierre",
        "name": "Pointes de pierre",
        "icon": "icons/magic/earth/barrier-explosion-debris.webp",
        "description": "Ce sort provoque la création de formations en pointes longues, étroites et aiguisées sur un sol déjà en pierre autour de l'élémentaliste. L'élémentaliste peut affecter un rayon de 1 mètre par niveau d’arcane. Ces pointes de pierre restent discrètes jusqu’à ce que quelqu’un d’autre que l'élémentaliste les traverse. Dans ce cas, ils peuvent infliger des dégâts et réduire le mouvement. Les pierres aiguisées causent 1d6 dégâts aux imprudents. Une créature se déplaçant dans la zone subit des blessures à tous les mètres de mouvement.\n\nDe base, la zone de pointe de pierre dure un (1) tour par niveau d’arcane de l'élémentaliste. S’il le veut, l'élémentaliste peut maintenir l’anneau plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "un (1) tour par niveau d’arcane"
        },
        "area": {
            "text": "1 mètre de rayon par niveau d’arcane."
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
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste envoie un jet de sable dans les yeux de sa victime, ce qui rend une tête de la victime aveugle pour un (1) tour par arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "1 tour/arcane"
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
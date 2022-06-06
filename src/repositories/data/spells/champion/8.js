export default [
    {
        "id": "delivranceDesMaledictions",
        "name": "Délivrance des malédictions",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet au champion de supprimer les effets d’une malédiction sur un objet ou une créature. Le sort ne supprime pas la malédiction d’un bouclier, d’une arme ou d’une armure maudits, bien que le sort permette généralement à la personne affectée d’un tel objet maudit de l’enlever et de s’en débarrasser. Certaines malédictions spéciales ne peuvent être contrées par ce sort. Dans ce cas, la description de la malédiction l’indiquera. Un champion ne peut pas se faire le sort de lui-même. La lycanthropie et la zombification sont des exemples de malédictions. ",
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
        "dependsOnArcaneLevel": false
    },
    {
        "id": "destructionDesMortsVivants",
        "name": "Destruction des morts vivants",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le champion frappe le sol avec ses poings et déploie 10d6 de dégâts qui frappent tous les morts-vivants dans une zone de 21 mètres carrés.",
        "distance": {
            "type": "self",
            "text": "Champion"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 21,
            "widthPerArcane": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '10d6';",
            "text": "10d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "dissipationDuMal",
        "name": "Dissipation du mal",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le sort permet au champion de forcer une créature d’une autre dimension (comme les démons et les diablotins) de retourner dans leur monde d’origine. Il oblige aussi les esprits malins (fantômes, spectre, banshee, etc.) à se dissiper. ",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Dissipe"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "sanctuaire",
        "name": "Sanctuaire",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort empêche les créatures d’attaquer le champion ou les alliés qui sont dans la zone du sort. Si un personnage protégé attaque ou lance des sorts offensifs, le sort de sanctuaire est annulé. Ce sort n’empêche pas la créature protégée d’être affectée par les sorts de zone d’effet. La zone d’effet est fixe et ne peut se déplacer.",
        "distance": {
            "type": "self",
            "text": "Champion"
        },
        "duration": {
            "text": "4 heures + 1d6 heure.s (lancer par le maître de jeu)"
        },
        "area": {
            "width": 11,
            "widthPerArcane": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "verite",
        "name": "Vérité",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Force la victime à dire la vérité.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "formula": "if (context.criticalSuccess) { return 10; } return 1",
            "value": 1,
            "unit": "heure",
            "text": "1 heure"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "value": 10,
            "unit": "tours",
            "text": "Durée 10 tours"
        },
        "dependsOnArcaneLevel": false
    }
]
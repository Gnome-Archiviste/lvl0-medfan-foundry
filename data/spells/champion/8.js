export default [
    {
        "id": "delivranceDesMaledictions",
        "name": "Délivrance des malédictions",
        "description": "Ce sort permet au champion de supprimer les effets d’une malédiction sur un objet ou une créature. Le sort ne supprime pas la malédiction d’un bouclier, d’une arme ou d’une armure maudits, bien que le sort permette généralement à la personne affectée d’un tel objet maudit de l’enlever et de s’en débarrasser. Certaines malédictions spéciales ne peuvent être contrées par ce sort. Dans ce cas, la description de la malédiction l’indiquera. Un champion ne peut pas se faire le sort de lui-même. La lycanthropie et la zombification sont des exemples de malédictions.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "destructionDesMortsVivants",
        "name": "Destruction des morts vivants",
        "description": "Le champion frappe le sol avec ses poings et déploie 10d6 de dégâts qui frappent tous les morts-vivants dans un rayon de 10 mètres.",
        "distance": {
            "type": "self"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 10,
            "unit": "m"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '10d6';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "dissipationDuMal",
        "name": "Dissipation du mal",
        "description": "Le sort permet au champion de forcer une créature d’une autre dimension (comme les démons et les diablotins) de retourner dans leur monde d’origine. Il oblige aussi les esprits malins (fantômes, spectre, banshee, etc.) à se dissiper.",
        "distance": {
            "value": 10,
            "unit": "m"
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
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "sanctuaire",
        "name": "Sanctuaire",
        "description": "Ce sort empêche les créatures d’attaquer le champion ou les alliés qui sont dans la zone du sort. Si un personnage protégé attaque ou lance des sorts offensifs, le sort de sanctuaire est annulé. Ce sort n’empêche pas la créature protégée d’être affectée par les sorts de zone d’effet. La zone d’effet est fixe et ne peut se déplacer.",
        "distance": {
            "type": "self"
        },
        "duration": {
            "text": "4 heures + 1d6 (lancer par le maître de jeu)"
        },
        "area": {
            "value": 5,
            "unit": "m"
        },
        "resilience": {
            "text": "Double la durée du sort"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "verite",
        "name": "Vérité",
        "description": "Force la victime à dire la vérité.",
        "distance": {
            "text": "1 mètre"
        },
        "duration": {
            "formula": "if (context.criticalSuccess) { return 10; } return 5",
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "value": 10,
            "unit": "tours"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
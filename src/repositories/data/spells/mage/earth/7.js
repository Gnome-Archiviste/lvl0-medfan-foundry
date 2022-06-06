export default [
    {
        "id": "creationMajeurDeTerre",
        "name": "Création majeur de terre",
        "icon": "icons/magic/earth/projectile-stone-landslide.webp",
        "description": "Créer 10 m² de terre fertile dans n’importe quel terrain, par arcane de l'élémentaliste.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "criticalSuccess": {
            "text": "Créer 20 m² de terre par arcane de l'élémentaliste."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "elementaireMajeurDePierre",
        "name": "Élémentaire majeur de pierre",
        "icon": "icons/magic/earth/construct-stone-long-arms.webp",
        "description": "L'élémentaliste invoque un élémentaire de pierre à partir d'une source de terre ( au moins 2 m² ). L'élémentaire majeur obéit à des ordres complexes et peut se battre pour défendre l'élémentaliste. Attention, on ne peut avoir plus de deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient.\n\nPHY 9, DEX 5, INT 4, CHA 6, PER 5\n\nHP 80, Armure : 2, H2H : 11, Lancer/tir : 8\n\nAttaques : H2H = 11 de dégâts, secousse: 3d6+2 (zone de 7x7 m.), ennemis projeté au sol",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "text": "Double les points de vie"
        },
        "damage": {
            "text": "Voir statistique de l’élémental"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "passeMuraille",
        "name": "Passe-muraille",
        "icon": "icons/commodities/treasure/stone-cracked-lightning-blue.webp",
        "description": "La cible peut traverser les parois solides pendant 15 tours. L'élémentaliste doit toucher la cible.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 15",
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "terraeFusiona",
        "name": "Terrae fusiona",
        "icon": "icons/magic/earth/shield-barrier-blades-teal.webp",
        "description": "L’élémentaliste peut entrer dans la terre ou la roche et fusionner avec, afin de fuire un danger. L’élémentaliste ne peut pas étouffer, avoir faim ou se faire blesser, (pratiquement) indéfiniment mais il ne peut pas se déplacer car l’élémentaliste fait un avec le sol.",
        "distance": {
            "text": "soi-même"
        },
        "duration": {
            "text": "24 heures. L’élémentaliste doit faire un test de concentration afin d’ajouter 12 heures à la durée. Le sort à une durée maximale équivalente en jours à l’intelligence de l’élémentaliste."
        },
        "area": {
            "text": "Élémentaliste"
        },
        "bonus": {
            "text": "Donne une protection infaillible."
        },
        "criticalSuccess": {
            "text": "?"
        },
        "dependsOnArcaneLevel": false
    }
]
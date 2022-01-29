export default [
    {
        "id": "frostArmor",
        "name": "Armure de givre",
        "icon": "icons/magic/defensive/shield-barrier-blue.webp",
        "description": "Le sort recouvre l'élémentaliste d’une mince couche neige (sur lui-même) qui le protège de 10 points de dégât jusqu’à ce que tous les points de protection soient épuisés  ou qu’elle fonde après 4 tours. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "5 tours ou tous utilisés"
        },
        "area": {
            "text": "Élémentaliste"
        },
        "bonus": {
            "text": "10 points de dégâts absorbés"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "snowBall",
        "name": "Boule de neige",
        "icon": "icons/magic/water/projectile-ice-snowball.webp",
        "description": "L'élémentaliste fait apparaître une boule de neige dans sa main qu'il peut lancer.\n\n\n\n",
        "distance": {
            "text": "8 mètres + 1 m par arcane"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '1d6+2';",
            "element": "water",
            "text": "1d6 +2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "mudTrap",
        "name": "Piège de boue",
        "icon": "icons/magic/nature/trap-spikes-thorns-green.webp",
        "description": "Immobilise les victimes pendant trois (3) tours sur une distance de 3 mètres carrés. Les victimes ne peuvent plus se déplacer.\n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 3,
            "unit": "tours",
            "text": "3 tours"
        },
        "area": {
            "value": 3,
            "unit": "m",
            "text": "3 mètres"
        },
        "bonus": {
            "text": "Victimes immobilisées"
        },
        "resilience": {
            "text": "On fait un test par tour pour ne pas avoir l’effet du piège pour ce tour."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "underWaterBreath",
        "name": "Respirer sous l’eau",
        "icon": "icons/magic/water/bubbles-air-water-blue.webp",
        "description": "La cible de ce sort peut respirer sous l’eau librement pendant 10 tours plus un tour par niveau d’arcane de l’élémentaliste.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "10 tours + 1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "source",
        "name": "Source",
        "icon": "icons/magic/water/water-hand.webp",
        "description": "En touchant le sol, l'élémentaliste fait jaillir une petite source. Ceux qui en boivent se font guérir, recevant quelques points de vie. Après un tour, la source se tarit. Si l'eau est récoltée, elle devient de l'eau ordinaire.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "5 tours ou tous utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "+ 1d6 points de vie"
        },
        "criticalSuccess": {
            "text": "6 points de vie"
        },
        "dependsOnArcaneLevel": false
    }
]
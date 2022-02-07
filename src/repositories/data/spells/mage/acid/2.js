export default [
    {
        "id": "citricArmour",
        "name": "Armure citrique",
        "icon": "icons/equipment/chest/breastplate-layered-leather-studded.webp",
        "description": "L’élémentaliste fait apparaitre une couche gélatineuse jaune (sur lui-même) qui absorbe jusqu’à dix (10) points de dégâts et qui dure 5 tours ou dix points de dégâts (la protection disparaît après 5 tours même si tous les points de protection n’ont pas été utilisés). Ce sort ne peut pas s’additionner à d’autres sorts de protections qui absorbent les dégâts.",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "5 tours ou utilisation des 10 points de protection"
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
        "id": "causticBerries",
        "name": "Baies caustiques",
        "icon": "icons/consumables/fruit/nanking-cherry-leaf-red.webp",
        "description": "Avec ce sort, l’élémentaliste utilise des baies (jusqu’à 6 par sort) qui deviennent acides. Il peut utiliser lui-même ces baies ou les offrir à ses alliés. Ces glands ou ces baies sont utilisés comme des billes d’acide.",
        "distance": {
            "text": "1 mètre en avant de l’élémentaliste"
        },
        "duration": {
            "text": "instantanée"
        },
        "area": {
            "text": "1-6 cibles"
        },
        "bonus": {
            "text": "voir les statistiques de la bille d’acide"
        },
        "criticalSuccess": {
            "text": "Double la quantité de baies (les baies manquantes apparaissent)."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "mofette",
        "name": "Mofette",
        "icon": "icons/creatures/mammals/rodent-rat-green.webp",
        "description": "L'élémentaliste crée une fissure dans le sol dégageant des gaz qui finissent par exploser, projetant ceux autour à 2 mètres vers l’arrière.\n\n\n\n",
        "distance": {
            "text": "8 mètres + 1 m par arcane"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "bonus": {
            "text": "Recul de 2 mètres"
        },
        "resilience": {
            "text": "Pas de projection"
        },
        "criticalSuccess": {
            "text": "Double la distance de projection"
        },
        "damage": {
            "rollFormula": "return '1d6';",
            "element": "physic",
            "text": "1d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "repasDuFeroxyde",
        "name": "Repas du feroxyde",
        "icon": "icons/magic/life/heart-cross-green.webp",
        "description": "Avec ce sort, l’élémentaliste peut utiliser manger et digérer des morceaux de métal afin de se guérir de 1d6 points de vie (pour 10 bouchées).",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Guérit 1d6 points de vie"
        },
        "criticalSuccess": {
            "text": "Donne 6 points de vie"
        },
        "heal": {
            "rollFormula": "return '1d6';"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "acideTouch",
        "name": "Toucher acide",
        "icon": "icons/magic/acid/dissolve-arm-flesh.webp",
        "description": "Les mains de l’élémentaliste sont entourées d’une aura vert brillant qui semble bouillonner, comme s’il s’agissait d’un liquide. Le toucher de l’élémentaliste inflige 1d6 points de dégâts d’acide, +1 par niveau d’arcane.",
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
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '1d6+' + (1 * context.arcaneLevel);",
            "text": "1d6 + (1 par niveau d’arcane)"
        },
        "dependsOnArcaneLevel": true
    }
]
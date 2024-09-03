export default [
    {
        "id": "envol",
        "name": "Envol",
        "icon": "icons/creatures/birds/dove-pigeon-flying-white.webp",
        "description": "Ce sort permet à l'élémentaliste de voler dans les airs. Il peut aussi se diriger. Il peut se déplacer de son plein mouvement. Ce vol semble aussi naturel que la marche. \n\nIl permet à l’élémentaliste de se battre, s’il réussit un test de navigation (qui ne compte pas comme l’action du joueur pour ce tour). Il permet aussi de lancer des sorts, s’il réussit un test de concentration  (qui ne compte pas comme l’action du joueur pour ce tour). L’élémentaliste ne peut pas supporter plus de poids qu’une charge maximale normale.",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 8 * context.arcaneLevel",
            "unit": "tours",
            "text": "8 tours par niveau d’arcane"
        },
        "area": {
            "text": "Élémentaliste"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "tornade",
        "name": "Tornade",
        "icon": "icons/magic/air/wind-tornado-funnel-gray.webp",
        "description": "Crée une tornade magique qui se déplace dans la direction que le magicien lui donne, de 10 mètres par tour, mais elle touche tout sur son chemin, faisant 55 points de dégâts (sans armure) à tout ce qu’elle touche.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
        },
        "area": {
            "width": 7,
            "height": 7,
            "text": "7x7 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux. À faire à chaque tour qu’une personne est dans la tornade"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return \"55\";",
            "text": "55"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "immuniteALelectricite",
        "name": "Immunité à l’électricité",
        "icon": "icons/magic/defensive/shield-barrier-flaming-pentagon-blue-yellow.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection complète contre l’électricité. Le sort annule le dommage produit par l'électricité, que la source des dégâts soit naturelle ou magique. L'élémentaliste doit toucher la cible.",
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
            "text": "Annule les dégâts causés par l’acide"
        },
        "criticalSuccess": {
            "text": "Retourne la moitié des dégâts à celui qui les inflige."
        },
        "dependsOnArcaneLevel": false
    }
]
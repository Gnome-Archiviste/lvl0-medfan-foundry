export default [
    {
        "id": "envol",
        "name": "Envol",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet à l'élémentaliste de voler dans les airs. Il peut aussi se diriger. Il peut se déplacer de son plein mouvement. Ce vol semble aussi naturel que la marche. \nIl permet à l’élémentaliste de se battre, s’il réussit un test de navigation (qui ne compte pas comme l’action du joueur pour ce tour). Il permet aussi de lancer des sorts, s’il réussit un test de concentration  (qui ne compte pas comme l’action du joueur pour ce tour). L’élémentaliste ne peut pas supporter plus de poids qu’une charge maximale normale.",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 8 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "tours",
            "text": "8 tours par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "tornade",
        "name": "Tornade",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Crée une tornade magique qui se déplace dans la direction que le magicien lui donne, de 10 mètres par tour, mais elle touche tout sur son chemin, faisant 55 points de dégâts (sans armure) à tout ce qu’elle touche.",
        "distance": {
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "duration": {
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
        },
        "area": {
            "value": 3,
            "unit": "m",
            "text": "3 mètres"
        },
        "resilience": {
            "text": "Divise le dommage par deux. Faire a chaque tour qu’une personne est dans la tornade"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return \"55\";",
            "text": "55"
        }
    }
]
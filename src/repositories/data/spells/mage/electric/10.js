export default [
    {
        "id": "flashBang",
        "name": "Flash-Bang",
        "icon": "icons/magic/lightning/orb-ball-blue.webp",
        "description": "L’élémentaliste crée un éclair de lumière accompagné d'un coup de tonnerre sonore, émanant de n’importe quel point jusqu’à 15 mètres de distance et dans un cercle de 9x9 mètres. Toute créature dans la zone d’effet subit 10d6 +10 dégâts et ont un malus de Perception pendant 5 tours.\n\n* Les victimes peuvent enlever 2 points de malus avec guérison de la surdité ou guérison de l’aveuglement.",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "width": 9,
            "height": 9,
            "text": "9x9 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "- 4 de perception"
        },
        "resilience": {
            "text": "Fait la moitié des dommages seulement."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "text": "10d6 +10 de dégâts"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "tempeteTropicale",
        "name": "Tempête tropicale",
        "icon": "icons/magic/lightning/bolt-salvo-clouds-sky.webp",
        "description": "Une pluie torrentielle s’abat autour d’un bâtiment où se trouve l’élémentaliste pendant 10 tours, rendant le terrain autour impraticable. Le déplacement dans la zone est réduit de moitié, la perception est réduite de -2 et à chaque tour les créatures dans la zone peuvent être foudroyées par la foudre, infligeant 6d6+15 de dégâts. Le joueur lance un d6 à chaque tour pour voir si la foudre frappe. La foudre frappe sur un  un (1) ou un deux (2).",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "61x61 mètres, le bâtiment au centre."
        },
        "bonus": {
            "text": "déplacement et Perception réduits."
        },
        "resilience": {
            "text": "dégâts divisé par 2"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "damage": {
            "rollFormula": "return '6d6+15';",
            "text": "6d6+15"
        },
        "dependsOnArcaneLevel": false
    }
]
export default [
    {
        "id": "eruptionJefoldienne",
        "name": "Éruption jéfoldienne",
        "icon": "icons/magic/fire/projectile-meteor-salvo-heavy-red.webp",
        "description": "L’élémentaliste déclenche la chute d'une incroyable quantité de lave et magma, il faut simplement qu'il y ait quelque chose en hauteur d'où la lave peut tomber (montagne, tour, toit de maison). La lave ensevelit les cibles et elles doivent réussir un test d’athlétique pour s’en sortir.\n\n\n\n",
        "distance": {
            "value": 60,
            "unit": "mètre",
            "text": "60 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 21,
            "height": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise les dégâts par deux"
        },
        "criticalSuccess": {
            "text": "Immobilise les cibles pour 2 tours avant de pouvoir faire leur test d’Athlétique"
        },
        "damage": {
            "rollFormula": "return '10d6+20';",
            "text": "10d6 + 20"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "frappeDeFlamme",
        "name": "Frappe de flamme",
        "icon": "icons/magic/fire/projectile-wave-arrow.webp",
        "description": "L’élémentaliste appelle une colonne verticale rugissante de feu, dans une zone de 11x11 mètres et de 12 mètres de haut, surgissant du sol et infligeant 15d6 + 20 dégâts, à quiconque est pris à l’intérieur tout en les propulsant hors de la zone d’action du sort. \n\n\n\n",
        "distance": {
            "value": 60,
            "unit": "mètre",
            "text": "60 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Expulse les victimes à la limite de la zone du sort."
        },
        "resilience": {
            "text": "Divise les dégâts par deux"
        },
        "criticalSuccess": {
            "text": "Fait 110 points de dégâts"
        },
        "damage": {
            "rollFormula": "return '15d6+20';",
            "text": "15d6 + 20"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "phœnix",
        "name": "Phœnix ",
        "icon": "icons/magic/fire/projectile-feathers-embers-gold.webp",
        "description": "Lorsque l’élémentaliste meurt, s’il lui reste 10 points de mana, le sort se déclenche automatiquement. Dans 1d6 heures, le corps du champion s'enflammera puis, lorsque le feu s’éteindra de lui-même, la cendre tombe du corps du champion qui est revenu à la vie avec la moitié de ses points de vie. L’élémentaliste est alors nu et doit prendre son temps pour se rééquiper.",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "1d6 heures après la mort"
        },
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    }
]
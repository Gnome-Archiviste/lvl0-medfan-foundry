export default [
    {
        "id": "blastOfWind",
        "name": "Coup de vent",
        "icon": "icons/magic/air/weather-wind-gust.webp",
        "description": "Un souffle d’air puissant et hurlant provient de l’élémentaliste vers la direction qu’il fait face, s’étendant jusqu’à 3 mètres et 3 mètres de large. Cette rafale éteint automatiquement les bougies, les torches et autres petites flammes non protégées tandis que les flammes plus grandes telles que les feux de camp et les feux de foyer perdent grandement de leur intensité. Il disperse aussi tous les petits objets légers, comme le ferait normalement un vent, et fait danser follement les flammes protégées, telles que celles des lanternes. Ces dernières s’éteignent sur 1 à 3 avec un lancer d’un d6. ",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "cône de 3 mètre devant Élémentaliste"
        },
        "bonus": {
            "text": "-2 sur perception"
        },
        "criticalSuccess": {
            "text": "Éteint toute flamme dans la zone."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "minorAirElemental",
        "name": "Élémentaire mineur d'air",
        "icon": "icons/magic/lightning/projectile-orb-blue.webp",
        "description": "L’élémentaliste invoque un petit élémentaire d’air, tant qu’il y a de l’air de disponible (donc il ne peut être créé sous l’eau, par exemple). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie. \n\nPHY 4, DEX 6, INT 3, CHA 3, PER 4\n\nHP 20, H2H : 5, Attaque : 3 de dégâts",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
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
        "id": "indistinguishablePassage",
        "name": "Passage sans traces",
        "icon": "Passage sans traces",
        "description": "En recevant ce sort, la cible peut se déplacer sur n’importe quel type de terrain et ne laisser ni empreintes ni odeurs. Pister la cible devient impossible par des moyens non magiques.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * context.arcaneLevel",
            "unit": "minutes",
            "text": "Une minute par niveau du magicien"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "recharge",
        "name": "Recharge[b]",
        "icon": "icons/magic/control/silhouette-hold-change-blue.webp",
        "description": "Le sort capture une partie de l’énergie entrante, réduisant son effet sur vous et la stockant pour votre prochaine attaque de mêlée. Vous avez une résistance à l’électricité jusqu’au début de votre prochain tour. De plus, la première fois que vous frappez avec une attaque de mêlée lors de votre prochain tour, la cible subit 1d6 dégâts électriques supplémentaires, et le sort prend fin.",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "jusqu’à utilisation"
        },
        "area": {
            "text": "Élémentaliste"
        },
        "bonus": {
            "text": "Ajoute 1d6 dégâts électrique"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "electricityResistance",
        "name": "Résistance à l’électricité",
        "icon": "icons/svg/aura.svg",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre l’électricité. Le sort réduit de moitié le dommage produit par l’électricité, que la source des dégâts soit naturelle ou magique. L’élémentaliste doit toucher la cible.",
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
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par l’électricité"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée à l’électricité"
        },
        "dependsOnArcaneLevel": false
    }
]
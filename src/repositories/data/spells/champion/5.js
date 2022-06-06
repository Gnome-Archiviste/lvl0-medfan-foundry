export default [
    {
        "id": "buffetDuHeros",
        "name": "Buffet du héros",
        "icon": "icons/consumables/food/bowl-ribs-meat-rice-mash-brown-white.webp",
        "description": "Le sort fait apparaître un buffet bien garni pour dix convives et guérit de 3d6 points de vie par personnes.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Devant le Champion"
        },
        "bonus": {
            "text": "Guérit 3d6 points de vie"
        },
        "criticalSuccess": {
            "text": "Guérit 18 points de vie"
        },
        "heal": {
            "rollFormula": "if (context.criticalSuccess) { return '18' } return '3d6';"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resistanceALacide",
        "name": "Résistance à l’acide",
        "icon": "icons/magic/defensive/shield-barrier-flaming-diamond-acid.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre l’acide. Le sort réduit de moitié le dommage produit par l’acide, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
            "text": "Divise par deux (arrondi plus bas) les dégâts causés par l’acide"
        },
        "criticalSuccess": {
            "text": "La cible est immunisé à l’acide"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resistanceALelectricite",
        "name": "Résistance à l’électricité",
        "icon": "icons/svg/aura.svg",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre l’électricité. Le sort réduit de moitié le dommage produit par l’électricité, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
    },
    {
        "id": "resistanceAuFeu",
        "name": "Résistance au feu",
        "icon": "icons/magic/defensive/shield-barrier-glowing-triangle-red.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre le feu. Le sort réduit de moitié le dommage produit par le feu, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par le feu"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée au feu"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resistanceAuFroid",
        "name": "Résistance au froid",
        "icon": "icons/magic/defensive/shield-barrier-glowing-triangle-blue.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre le froid. Le sort réduit de moitié le dommage produit par le froid, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "1 scène (une journée pour le froid ordinaire)"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par le froid"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée au froid."
        },
        "dependsOnArcaneLevel": false
    }
]
export default [
    {
        "id": "hotAir",
        "name": "Courant d’air chaud",
        "icon": "icons/magic/fire/barrier-shield-explosion-yellow.webp",
        "description": "Les créatures et les objets affectés par ce sort tombent doucement, dérivant vers le bas dans les airs un peu comme si un jet d’air chaud amortissait leur chute. Les sujets affectés par le sort ne subissent aucun dommage d’une chute de n’importe quelle hauteur. Le sort peut être lancé suffisamment rapidement pour sauver l'élémentaliste en cas de chute inattendue d’une hauteur notable. Un poids total allant jusqu’à 500 kilos peut être affecté. Les créatures et objets affectés par le sort tombent à une vitesse de 15 mètres par tour. Si le sort se termine alors qu’ils tombent encore, ils tombent normalement à partir de ce point et ne subissent des dégâts que pour cette distance tombée.\n\nLe sort ne fonctionne que sur les objets en chute libre. Cela n’affecte pas un coup d’épée, une créature qui charge ou une créature volante.",
        "distance": {
            "text": "2 mètre + 1 mètre/arcane"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
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
        "id": "fireCreation",
        "name": "Création mineure de feu",
        "icon": "icons/magic/fire/flame-burning-campfire-rocks.webp",
        "description": "Créer une flamme 25 cm³ par arcane de l'élémentaliste.",
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
            "text": "Crée une flamme de 50 cm³ par arcane"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "bengalLight",
        "name": "Feu de bengale",
        "icon": "icons/magic/fire/beam-jet-stream-yellow.webp",
        "description": "Créer un jet de flammèches de 2 mètres de long devant l'élémentaliste.",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètre"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "criticalSuccess": {
            "text": "Créer un jet de flammèches de 4 mètres de long devant l'élémentaliste."
        },
        "damage": {
            "text": "3 points de dégâts"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "fireSlap",
        "name": "Gifle enflammée",
        "icon": "icons/magic/fire/beam-strike-whip-red.webp",
        "description": "Avec ce sort, l’élémentaliste peut frapper à distance. Une fine feuille de flammes jaillit de la main du magicien, frappant une créature jusqu’à 5 mètres du magicien et lui fait 1d6 dommage de feu.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '1d6';",
            "element": "fire",
            "text": "1d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "dancingLight",
        "name": "Lumières dansantes",
        "icon": "icons/magic/fire/orb-lightning-sun.webp",
        "description": "Selon la version sélectionnée lors du jet du sort, l’élémentaliste crée jusqu’à quatre lumières qui ressemblent à des lanternes ou des torches (et fournissent la même quantité de lumière), ou jusqu’à quatre petites sphères incandescentes (qui ressemblent à des feux follets). Les lumières dansantes doivent rester à moins de 2 mètres l’une de l’autre, mais se déplacent selon le désir de l’élémentaliste (aucune concentration requise) : vers l’avant ou vers l’arrière, vers le haut ou vers le bas, tout droit ou tournant les coins, etc. Les lumières peuvent se déplacer jusqu’à 10 mètres par tour. Une lumière clignote (et finit par disparaître) si sa distance par rapport à l’élémentaliste dépasse la portée du sort. Une créature qui interagit avec une lumière dansante peut faire un jet de résilience pour reconnaître que c’est une illusion.\n\n\n\n",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "text": "5 tours par arcane"
        },
        "area": {
            "width": 5,
            "widthPerArcane": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "Triple la durée"
        },
        "dependsOnArcaneLevel": false
    }
]
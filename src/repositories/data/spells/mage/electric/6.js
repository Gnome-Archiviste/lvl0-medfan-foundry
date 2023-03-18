export default [
    {
        "id": "anguille",
        "name": "Anguille",
        "icon": "icons/magic/lightning/claws-unarmed-strike-teal.webp",
        "description": "Des arcs électriques parcourent le torse et les bras de la cible, lui donnant une armure pouvant encaisser 15 pts de dégâts. De plus, les arcs électriques s’étendent sur les mains de la cible, lui permettant d’attaquer avec les deux (2) mains et faire 1d6 par attaque. La protection de ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "protection de 15 points de résistance, 2 attaques par tour"
        },
        "criticalSuccess": {
            "text": "Les attaques font 2d6 de dégâts."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "explosionSonore",
        "name": "Explosion sonore",
        "icon": "icons/magic/lightning/bolt-forked-blue.webp",
        "description": "L’élémentaliste invoque un coup de tonnerre sonore, émanant de n’importe quel point jusqu’à 15 mètres, de distance et dans un cercle 9x9 mètres. Toute créature dans la zone d’effet subit 4d6 dégâts et ne peut faire de jet d’Écouter pendant 5 tours.",
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
            "text": "Annule l'habileté Écouter pendant 5 tours"
        },
        "resilience": {
            "text": "Fait la moitié des dommages seulement."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "text": "4d6 de dégâts"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "mainParalysante",
        "name": "Main paralysante",
        "icon": "icons/magic/lightning/fist-unarmed-strike-blue.webp",
        "description": "La main de l’élémentaliste est parcourue de petits arcs électriques ce qui permet à celui-ci d’infliger 5d6 de dégâts à une cible qu’il touche et de la paralyser pour 4 tours.\n\n\n\n",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 4",
            "value": 4,
            "unit": "tours",
            "text": "4 tours"
        },
        "area": {
            "text": "Élémentaliste"
        },
        "bonus": {
            "text": "Paralyse la cible pour 4 tours"
        },
        "resilience": {
            "text": "Aucune paralysie"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "damage": {
            "text": "5d6 de dégâts"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "murDeVent",
        "name": "Mur de vent",
        "icon": "icons/magic/air/air-burst-spiral-blue-gray.webp",
        "description": "Un rideau de vent vertical invisible de 6 mètres de haut  par 1 mètre de large par arcane de l’élémentaliste apparaît. Il mesure 1 mètre d’épaisseur et d’une force considérable. La rafale rugissante est suffisante déchirer les papiers et des matériaux similaires de mains sans méfiance tandis que les tissus amples et les vêtements en tissu volent vers le haut lorsqu’ils sont pris dans un mur de vent. Les flèches et les darts ou toute autre arme à distance normale passant à travers le mur sont déviés et n’atteignent pas leur cible. Les armes à distance massives comme les rochers de catapulte ne sont pas affectées. Les gaz, les petites créatures volantes et les créatures sous forme gazeuse ne peuvent pas traverser le mur et toute créature tentant de traverser sera propulsée vers l’arrière sur 5 mètres.",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "1 mètre de largeur par niveau d’arcane"
        },
        "bonus": {
            "text": "Protection contre les armes de jets"
        },
        "resilience": {
            "text": "Permet de traverser le mur"
        },
        "criticalSuccess": {
            "text": "Projette ceux qui veulent traverser à dix (10) mètres."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "hippogriffe",
        "name": "Hippogriffe",
        "icon": "icons/creatures/abilities/wings-birdlike-blue.webp",
        "description": "Appelle une créature volante mythique comme destrier volant pour traverser une étendue.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    }
]
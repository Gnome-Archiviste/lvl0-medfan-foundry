export default [
    {
        "id": "coursierFantome",
        "name": "Coursier fantôme",
        "icon": "icons/environment/creatures/horse-white.webp",
        "description": "Créer un cheval magique pour une (1) heure par niveau d’arcane. Le cheval est semi-transparent et semble fait de lumière blanche. Le coursier peut emmener son cavalier et un passager (ou 4 fantasques).",
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
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "inspirationDeCombat",
        "name": "Inspiration de combat",
        "icon": "icons/weapons/swords/sword-winged-pink.webp",
        "description": "Le champion donne, dans une zone de 11x11 mètres. autour de lui, un bonus d’un point d’armure à ses compagnons autour de lui ainsi que 2 points de dégâts supplémentaires sur leurs attaques.",
        "distance": {
            "type": "self",
            "text": "Champion"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "+1 d'armure, +2 de dégâts"
        },
        "criticalSuccess": {
            "text": "+2 d’armure, +4 de dégâts"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "marchesDuCiel",
        "name": "Marches du ciel",
        "icon": "icons/environment/settlement/stone-stairs.webp",
        "description": "Des marches apparaissent et peuvent être utilisés par les personnages et leurs alliés. Peut servir de pont. Utilisable avec un destrier ou avec beaucoup de poids sur le personnages. 10 mètres par niveau d’arcane. Disparaît quand les joueurs ont atteint leur destination, le champion doit être le dernier du groupe.",
        "distance": {
            "formula": "return context.arcaneLevel * 10;",
            "unit": "m",
            "text": "10 mètres par niveau d’arcane"
        },
        "duration": {
            "text": "Jusqu’à destination"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Deux personnages peuvent passer de front"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "murDeFeu",
        "name": "Mur de feu",
        "icon": "icons/magic/fire/beam-jet-stream-trails-orange.webp",
        "description": "En lançant ce sort, un mur de feu scintillant jaillit à la demande du champion. Le mur mesure cinq mètres de haut, fait un mètre par niveau d’arcane du champion de largeur et deux mètres de profondeur.\n\nLe mur inflige 5d6 blessures de feu à toute créature entrant ou traversant le mur. Le mur inflige le double de dégâts aux créatures mortes. Si le champion évoque le mur pour qu’il apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers le mur.\n\nLe champion peut maintenir le sort indéfiniment en se concentrant continuellement (faire un test de concentration par tour, et le champion ne peut que faire ce test durant le tour) pour le faire, ou peut renoncer à une concentration continue, auquel cas le mur durera un (1) tour par niveau d’arcane du champion.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "2 mètres de large"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut). Faire a chaque tour qu’une créature est dans le mur de feu"
        },
        "criticalSuccess": {
            "text": "Les créatures dans la zone (ou entrant dans la zone) ne peuvent pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "text": "5d6"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "survolteurDeBollardon",
        "name": "Survolteur de Bollardon",
        "icon": "icons/magic/symbols/runes-star-pentagon-orange.webp",
        "description": "Avec ce sort, le champion peut transformer n’importe lequel de ses sorts en sort de zone. Le champion doit faire ce sort avant de faire le sort qui sera remplacé en sort de zone.",
        "distance": {
            "type": "self",
            "text": "Champion"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5",
            "value": 5,
            "unit": "minutes",
            "text": "5 minutes"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Transforme un sort en sort de zone"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    }
]
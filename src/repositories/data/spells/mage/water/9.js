export default [
    {
        "id": "communiquerAvecLetreMouille",
        "name": "Communiquer avec l’être mouillé",
        "icon": "icons/magic/perception/orb-crystal-ball-scrying.webp",
        "description": "Le sort permet à l’élémentaliste de voir une personne qu’il cherche ainsi qu’une partie de son environnement, lui donnant un indice sur l’endroit où cette personne se trouve. De plus, l’élémentaliste peut dialoguer avec cette personne bien que les sons seront un peu étouffés.\n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5",
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "width": 3,
            "height": 3,
            "text": "3x3 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "mineMarineMajeure",
        "name": "Mine marine majeure",
        "icon": "icons/magic/water/wave-water-explosion.webp",
        "description": "L'élémentaliste crée une gigantesque bulle d'eau qui finit par exploser projetant tous ceux autour à 10 mètres\n\n\n\n",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
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
            "text": "Recul de 10 mètres"
        },
        "damage": {
            "rollFormula": "return '5d6+10';",
            "text": "5d6 + 10"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "murDeGlace",
        "name": "Mur de glace",
        "icon": "icons/magic/water/barrier-ice-wall-snow.webp",
        "description": "Une couche de glace solide et dure apparaît. Le mur s’ancre au sol. Le mur mesure un (1) mètre de hauteur par deux (2) mètres de largeur et 10 cm de profondeur. Chacune de ses valeurs est multipliée par le niveau d’arcane de l’élémentaliste.\n\n\n\n\n\nChaque partie d’un mètre par un mètre on 10 points de vie par 10 cm d’épaisseur. Les créatures peuvent frapper le mur automatiquement et une section de mur dont les points de vie tombent à 0 est brisée. Même lorsque la glace a été percée, il reste une couche d’air glacial qui inflige 1d6 +1 point par niveau d’arcane de dégâts de froid à toute créature qui la traverse. \n\n\n\n",
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
        "criticalSuccess": {
            "text": "Double l’épaisseur et les points de vie"
        },
        "damage": {
            "rollFormula": "return '1d6+1';",
            "text": "1d6 +1"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "velage",
        "name": "Vêlage",
        "icon": "icons/magic/water/projectile-icecicle-glowing.webp",
        "description": "L'élémentaliste envoie un jet d’eau, semblable au sort de siphon, qui s’infiltre dans les fissures d’une paroie. L'élémentaliste transforme rapidement l’eau en glace, ce qui crée une brèche dans le mur.\n\n\n\n",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "2,5 mètres de haut par 1 mètre de large"
        },
        "bonus": {
            "text": "Créer une brèche 2.5 m. de haut par 1 m. de large dans la paroie"
        },
        "criticalSuccess": {
            "text": "Brèche de 4 m. de haut par 5 m. de large"
        },
        "damage": {
            "text": "Aucun sauf à la paroie"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "zoneDeFroid",
        "name": "Zone de froid",
        "icon": "icons/magic/water/snowflake-ice-snow-white.webp",
        "description": "Produit une zone de froid qui enveloppe les ennemis d’une brume qui les glace jusqu’aux os, ce qui les empêche de se concentrer sur leurs attaques tellement ils grelottent.\n\n\n\n",
        "distance": {
            "value": 25,
            "unit": "mètre",
            "text": "25 mètres"
        },
        "duration": {
            "rollFormula": "return '1d6'",
            "unit": "tours",
            "text": "1d6 tours"
        },
        "area": {
            "width": 21,
            "height": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "-1 en attaque, -2 en perceptions"
        },
        "resilience": {
            "text": "Annule les malus seulement"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible."
        },
        "damage": {
            "text": "2d6/tour"
        },
        "dependsOnArcaneLevel": false
    }
]
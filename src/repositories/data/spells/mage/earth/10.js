export default [
    {
        "id": "murDeFer",
        "name": "Mur de fer",
        "icon": "icons/commodities/tech/metal-panel.webp",
        "description": "Ce sort crée un mur de roche qui fusionne avec les surfaces rocheuses adjacentes. Le mur mesure 10 cm d’épaisseur par niveau d’arcane du magicien ainsi que jusqu’à 1 mètre de large par niveau d’arcane du magicien et jusqu’à 1 mètre de haut par niveau d’arcane du magicien. Le mur ne peut pas être évoqué de manière à occuper le même espace qu’une créature ou un autre objet.\n\n\n\n\n\nChaque zone d’un pied carré du mur a 30 points de vie par 10 cm d’épaisseur. Les créatures peuvent frapper le mur automatiquement, mais le mur est si dur que les 10 premiers points de dégâts de chaque coup sont ignorés. Une section de mur dont les points de vie tombent à 0 est fissurée. \n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Combat"
        },
        "area": {
            "text": "1 mètre de largeur par niveau d’arcane"
        },
        "criticalSuccess": {
            "text": "Double la largeur"
        },
        "dependsOnArcaneLevel": false
    }
]
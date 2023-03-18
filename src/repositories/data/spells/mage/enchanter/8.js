export default [
    {
        "id": "potionCabalistique",
        "name": "Potion cabalistique",
        "icon": "icons/consumables/potions/bottle-round-label-cork-blue.webp",
        "description": "L’enchanteur prépare une potion claire et bleuté dans un grand chaudron contenant entre autre des baies miraculeuses (10), une pincée de poudre de perlépipein et de la gelée de coing (1 kilogramme) et qui doit mijoter et être touillée pendant 6 heures. L’enchanteur fait 3 potions cabalistiques par 8 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "le chaudron"
        },
        "bonus": {
            "text": "Donne 50 points de mana à la cible"
        },
        "criticalSuccess": {
            "text": "fait 4 potions par mana au lieu de 3."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "restauration",
        "name": "Restauration",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort répare des fissures ou déchirures de grands objets. Dans les objets métalliques, il soudera un épée, un trou dans une armure, à condition qu’il n’y ait qu’une seule rupture. Les objets en céramique ou en bois avec plusieurs petites cassures ou une grande rupture peuvent être réunis de manière invisible pour être aussi solides que neufs. Un trou dans un bateau ou une voile déchirée est une réparation courante pour restauration. Le sort ne peut pas réparer un objet magique.",
        "distance": {
            "text": "Touché"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "Un objet"
        },
        "criticalSuccess": {
            "text": "TODO"
        },
        "dependsOnArcaneLevel": false
    }
]
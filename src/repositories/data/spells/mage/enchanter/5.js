export default [
    {
        "id": "degatsMarines",
        "name": "Dégâts marinés",
        "icon": "icons/skills/melee/blade-tip-energy-green.webp",
        "description": "Change les dégâts d’une arme en dégât d’acide provoquant 1d6 de dégât bonus, pour une scène.",
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
            "text": "Une arme"
        },
        "bonus": {
            "text": "+1d6, tous les dégâts sont d’acide"
        },
        "criticalSuccess": {
            "text": "+2d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "electrification",
        "name": "Électrification",
        "icon": "icons/skills/melee/blade-tips-double-blue.webp",
        "description": "Change les dégâts d’une arme en dégât électrique provoquant 1d6 de dégât bonus, pour une scène.",
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
            "text": "Une arme"
        },
        "bonus": {
            "text": "+1d6, tous les dégâts sont électrique"
        },
        "criticalSuccess": {
            "text": "+2d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "enchantement",
        "name": "Enchantement",
        "icon": "icons/weapons/swords/sword-runed-glowing.webp",
        "description": "Enchanté une arme pour un combat. Ajoute +2 aux dégâts et les doubles 3 sont aussi considérés comme un succès exceptionnel. Besoin de permanence pour conserver l’effet.",
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
            "text": "Une arme"
        },
        "bonus": {
            "text": "+2 dégâts, double 3 = succès exceptionnel."
        },
        "criticalSuccess": {
            "text": "Dégâts +4"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "glaciation",
        "name": "Glaciation",
        "icon": "icons/weapons/axes/axe-double-ice-blue.webp",
        "description": "Change les dégâts d’une arme en dégât de glace provoquant 1d6 de dégât bonus, pour une scène.",
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
            "text": "Une arme"
        },
        "bonus": {
            "text": "+1d6, tous les dégâts sont de glace"
        },
        "criticalSuccess": {
            "text": "+2d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "lameEnflammee",
        "name": "Lame enflammée",
        "icon": "icons/weapons/swords/sword-jeweled-red.webp",
        "description": "Change les dégâts d’une arme en dégât de feu provoquant 1d6 de dégât bonus, pour une scène",
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
            "text": "Une arme"
        },
        "bonus": {
            "text": "+1d6, tous les dégâts sont de feu"
        },
        "criticalSuccess": {
            "text": "+2d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "permanence",
        "name": "Permanence",
        "icon": "icons/magic/time/hourglass-tilted-gray.webp",
        "description": "Permet de rendre un sort permanent. Grâce au sort de permanence, le sort sur lequel on l’applique n’a plus de limite de temps. \n\nNe peut se faire que sur un objet préparé pour faire le sort.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Prend 1 minute à lancer"
        },
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "potionDeGuerisonDesMaledictions",
        "name": "Potion de guérison des malédictions",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’enchanteur prépare une potion claire et rougeâtre dans un grand chaudron contenant entre autre de l’argent liquide (100 ml), une pincée de poudre de perlépipein, un bouquet de sauge, 1 cristal de sel (50 g.) et qui doit mijoter et être touillée pendant 5 heures. L’enchanteur fait 5 potions de guérison des malédictions par 5 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.",
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
            "text": "enlève les malédictions"
        },
        "criticalSuccess": {
            "text": "fait 7 potions par 5  points de mana au lieu de 5."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "potionTheurgique",
        "name": "Potion théurgique",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’enchanteur prépare une potion claire et bleuté dans un grand chaudron contenant entre autre une amanite (champignon), une pincée de poudre de perlépipein et de la gelée de coing (1 kilogramme) et qui doit mijoter et être touillée pendant 5 heures. L’enchanteur fait 3 potions de soin par 5 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.",
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
            "text": "Donne 20 points de mana à la cible"
        },
        "criticalSuccess": {
            "text": "fait 4 potions par mana au lieu de 3."
        },
        "dependsOnArcaneLevel": false
    }
]
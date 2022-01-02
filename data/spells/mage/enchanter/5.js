export default [
  {
    "id": "degatsMarines",
    "name": "Dégâts marinés",
    "description": "Change les dégâts d’une arme en dégât d’acide provoquant 1d6 de dégât bonus, pour une scène.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Une arme"
    },
    "bonus": {
      "text": "+1d6, tous les dégâts sont d’acide"
    },
    "resilience": {
      "text": "+2d6"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "electrification",
    "name": "Électrification",
    "description": "Change les dégâts d’une arme en dégât électrique provoquant 1d6 de dégât bonus, pour une scène.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Une arme"
    },
    "bonus": {
      "text": "+1d6, tous les dégâts sont électrique"
    },
    "resilience": {
      "text": "+2d6"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "enchantement",
    "name": "Enchantement",
    "description": "Enchanté une arme pour un combat. Ajoute +2 aux dégâts et les doubles 3 sont aussi considérés comme un succès exceptionnel. Besoin de permanence pour conserver l’effet.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "+2 dégâts, double 3 = succès exceptionnel."
    },
    "resilience": {
      "text": "Dégâts +4"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "glaciation",
    "name": "Glaciation",
    "description": "Change les dégâts d’une arme en dégât de glace provoquant 1d6 de dégât bonus, pour une scène.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Une arme"
    },
    "bonus": {
      "text": "+1d6, tous les dégâts sont de glace"
    },
    "resilience": {
      "text": "+2d6"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "lameEnflammee",
    "name": "Lame enflammée",
    "description": "Change les dégâts d’une arme en dégât de feu provoquant 1d6 de dégât bonus, pour une scène",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Une arme"
    },
    "bonus": {
      "text": "+1d6, tous les dégâts sont de feu"
    },
    "resilience": {
      "text": "+2d6"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "permanence",
    "name": "Permanence",
    "description": "Permet de rendre un sort permanent. Grâce au sort de permanence, le sort sur lequel on l’applique n’a plus de limite de temps.\nNe peut se faire que sur un objet préparé pour faire le sort.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Prend 1 minute à lancer"
    },
    "area": {
      "text": "Une cible"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "potionDeGuerisonDesMaledictions",
    "name": "Potion de guérison des malédictions",
    "description": "L’enchanteur prépare une potion claire et rougeâtre dans un grand chaudron contenant entre autre de l’argent liquide (100 ml), une pincée de poudre de perlépipein, un bouquet de sauge, 1 cristal de sel (50 g.) et qui doit mijoter et être touillée pendant 5 heures. L’enchanteur fait 5 potions de guérison des malédictions par 5 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.",
    "distance": {
      "type": "touch"
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
    "resilience": {
      "text": "fait 7 potions par 5  points de mana au lieu de 5."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "potionTheurgique",
    "name": "Potion théurgique",
    "description": "L’enchanteur prépare une potion claire et bleuté dans un grand chaudron contenant entre autre une amanite (champignon), une pincée de poudre de perlépipein et de la gelée de coing (1 kilogramme) et qui doit mijoter et être touillée pendant 5 heures. L’enchanteur fait 3 potions de soin par 5 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.",
    "distance": {
      "type": "touch"
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
    "resilience": {
      "text": "fait 4 potions par mana au lieu de 3."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
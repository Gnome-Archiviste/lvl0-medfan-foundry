export default [
  {
    "id": "antidote",
    "name": "Antidote",
    "description": "Permets de contrer les potions négatives (comme celle de sommeil ou les venins d’animaux).",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Contrer les potions"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "armeEnchantee",
    "name": "Arme enchantée",
    "description": "Transforme les dégâts normaux d’une arme en dégâts magiques et permet ainsi de toucher les créatures qui requièrent ce type de dégâts pour les combattre. ex: fantôme, vampires, morts-vivants.",
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
      "text": "transforme les dégâts normaux en dégâts magiques"
    },
    "resilience": {
      "text": "Ajouté 6 de dégâts"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "guerison",
    "name": "Guérison",
    "description": "Guérit un coéquipier de (4d6) points de vie. Le champion doit toucher la cible. Ne peut pas dépasser le maximum de points de vie de la cible. Ne s’applique pas au champion lui-même",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Guérit 4d6 points de vie"
    },
    "resilience": {
      "text": "Guérit 24 points de vie"
    },
    "heal": {
      "rollFormula": "if (context.criticalSuccess) { return '24' } return '4d6';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "protectionDautrui",
    "name": "Protection d’autrui",
    "description": "Lancé sur un coéquipier, absorbe jusqu’à 10 points de dégâts. Le champion sait que le coéquipier a été attaqué si ce dernier est touché. Ce sort ne peut pas s’additionner à d’autres sorts de protections qui absorbent les dégâts.",
    "distance": {
      "value": 10,
      "unit": "m"
    },
    "duration": {
      "text": "Quand les points ont été absorbés"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Absorbe jusqu’à 10 points de dégâts"
    },
    "resilience": {
      "text": "Absorbe jusqu’à 20 points de dégâts"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "repulsionDesMortsVivants",
    "name": "Répulsion des morts-vivants",
    "description": "Les morts-vivants ne peuvent pas rentrer dans la zone pendant 10 tours. Tous les morts-vivants déjà dans la zone sont éjectés violemment.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
      "unit": "tours"
    },
    "area": {
      "value": 5,
      "unit": "m"
    },
    "resilience": {
      "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
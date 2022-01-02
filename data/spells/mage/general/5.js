export default [
  {
    "id": "babelfish",
    "name": "Babelfish",
    "description": "Permet de comprendre toute langue des créatures pensantes pendant 7 tours.",
    "distance": {
      "type": "self"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 7",
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "cornetDeFroid",
    "name": "Cornet de froid",
    "description": "Un cône de froid extrême jaillit de la main du magicien, affectant jusqu’à trois (3) victimes dans une zone de 10 mètres de large et jusqu’à 10 mètres de long en avant du magicien, causant 3d6 points de dégâts et les figent sur place.",
    "distance": {
      "value": 10,
      "unit": "m"
    },
    "duration": {
      "value": 2,
      "unit": "tours"
    },
    "area": {
      "value": 10,
      "unit": "m"
    },
    "bonus": {
      "text": "Victimes immobiliser"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "damage": {
      "rollFormula": "return '3d6';",
      "element": "water"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "dissipationDeLaMagie",
    "name": "Dissipation de la magie",
    "description": "Annule un sort de magie général d’arcane 5 ou moins. Annule un sort de magie spécialisé d’arcane 2 ou moins. Doit toucher la cible.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "Annule un sort de magicien d’arcane 6 et non-magicien d’arcane 3"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "illusion",
    "name": "Illusion",
    "description": "Permet de faire apparaître une illusion jusqu’à 20 mètres de haut.",
    "distance": {
      "value": 20,
      "unit": "m"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 15",
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
  },
  {
    "id": "peauDePierre",
    "name": "Peau de pierre",
    "description": "Permets d’absorber 15 points de dégâts. Le sort peut être fait sur le magicien ou un allié. Le magicien doit toucher la cible. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Tant que les 15 points ne sont pas utilisés"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Absorbe 15 points de dégâts"
    },
    "resilience": {
      "text": "Absorbe 30 points de dégâts"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "resistanceALacide",
    "name": "Résistance à l’acide",
    "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre l’acide. Le sort réduit de moitié le dommage produit par l’acide, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
      "text": "Divise par deux (arrondis vers le bas) les dégâts causés par l’acide"
    },
    "resilience": {
      "text": "La cible est immunisée à l’acide"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "resistanceALelectricite",
    "name": "Résistance à l’électricité",
    "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre l’électricité. Le sort réduit de moitié le dommage produit par l’électricité, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
      "text": "Divise par deux (arrondis vers le bas) les dégâts causés par l’électricité"
    },
    "resilience": {
      "text": "La cible est immunisée à l’électricité"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "resistanceAuFeu",
    "name": "Résistance au feu",
    "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre le feu. Le sort réduit de moitié le dommage produit par le feu, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
      "text": "Divise par deux (arrondis vers le bas) les dégâts causés par le feu"
    },
    "resilience": {
      "text": "La cible est immunisée au feu"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "resistanceAuFroid",
    "name": "Résistance au froid",
    "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre le froid. Le sort réduit de moitié le dommage produit par le froid, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
    "distance": {
      "type": "touch"
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
    "resilience": {
      "text": "La cible est immunisée au froid."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "voirLinvisible",
    "name": "Voir l’invisible",
    "description": "Ce sort permet au destinataire de voir tous les êtres invisibles (incluant l’invisibilité magique), éthérés ou astraux comme s’ils étaient normalement visibles. Le sort ne permet pas de reconnaître les illusions ni de détecter les choses cachées par des moyens autres que l’invisibilité.",
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
    "resilience": {
      "text": "La durée devient une journée"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
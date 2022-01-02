export default [
  {
    "id": "crisDeGuerre",
    "name": "Cris de guerre",
    "description": "La panique et la terreur traversent le cœur des créatures affectées par ce sort, les obligeant à fuir le champion le plus rapidement possible. Les créatures se recroquevillent dans une horreur abjecte si elles sont acculées, et si elles sont forcées d’affronter le champion, toute créature affectée subit une pénalité de -2 à tous les jets.",
    "distance": {
      "type": "self"
    },
    "duration": {
      "value": 6,
      "unit": "tours"
    },
    "area": {
      "value": 4,
      "unit": "m"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "enchantement",
    "name": "Enchantement",
    "description": "Ce sort permet d’enchanter une arme pour un combat. Ajoute +2 aux dégâts et les doubles 3 sont aussi considérés comme un succès exceptionnel. Besoin de permanence pour conserver l’effet.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Une scène"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "value": 2,
      "unit": "dégâts"
    },
    "resilience": {
      "text": "Dégâts +4"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "liberation",
    "name": "Libération",
    "description": "Annule l’effet des sorts entravant les mouvements de leur victime ou toutes autres entraves magiques (sauf la pétrification).",
    "distance": {
      "value": 15,
      "unit": "m"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "ligneDeVie",
    "name": "Ligne de vie",
    "description": "Le champion est capable de soigner plusieurs de ses compagnons, et à distance. Une flux d’énergie rougeâtre s’échappe de la main du champion et va rejoindre jusqu’à 5 cibles afin de les soigner, leur redonnant 3d6 points de vie.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "marcherSurLeau",
    "name": "Marcher sur l’eau",
    "description": "Ce sort permet à une cible de marcher sur un liquide comme si elle marchait sur un sol solide. Le sort dure 10 tours.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "formula": "if (context.criticalSuccess) { return 20; } return 10",
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "value": 20,
      "unit": "tours"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
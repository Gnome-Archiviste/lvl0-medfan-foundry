export default [
  {
    "id": "bilanDeSante",
    "name": "Bilan de santé",
    "description": "Indique où se trouvent les alliés et quel est leur état de santé. Ce sort requiert un objet personnel (qui lui a appartenu pendant plus d’un an) ou d’une mèche de cheveux d’un allié, ainsi qu’une plume d’une harpie (pour faire le sort).",
    "distance": {
      "type": "self"
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
    "id": "eclatDeRectitude",
    "name": "Éclat de rectitude",
    "description": "Le champion émet une lueur qui guérit les personnages bons de 35 points de vie et qui délivre 35 points de dégâts aux personnages mauvais sur 4 mètres de rayons autour du champion.",
    "distance": {
      "text": "champion"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "value": 10,
      "unit": "m"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "exorcisme",
    "name": "Exorcisme",
    "description": "Certaines créature telles les esprits et les démons peuvent prendre possession du corps d’un mortel et les retourner contre ses coéquipiers. Avec ce sort, le champion délivre une victime autre que lui-même d’une possession.",
    "distance": {
      "value": 3,
      "unit": "m"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "premonition",
    "name": "Prémonition",
    "description": "Lancer au coucher, le sort permet au champion de voir de l’information sur le futur probable durant ses rêves. Le champion se souvient de ses rêves prémonitoires.\nLe maître de jeu donne des indices sur un événement qui devrait (le plus possible) se passer dans la soirée. Permet au maître de jeu de donner des informations importantes que les joueurs auraient ratés.\nComme la prémonition est un rêve, celui-ci peut-être représentatif et non une image précise sur un événement.",
    "distance": {
      "type": "self"
    },
    "duration": {
      "text": "Durant le sommeil"
    },
    "area": {
      "text": "Champion"
    },
    "resilience": {
      "text": "Le prémonition est clair"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "regeneration",
    "name": "Régénération",
    "description": "Ce sort, lancé juste avant ou pendant le combat, permet au champion de guérir ses coéquipiers tout au long du combat, redonnant cinq (5) points de vie par tour. De plus, vingt (20) autres points de vies sont regagnés à la fin du combat.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Une scène (de combat)"
    },
    "area": {
      "value": 8,
      "unit": "m"
    },
    "resilience": {
      "text": "Soigne 10 point de vie par tour"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
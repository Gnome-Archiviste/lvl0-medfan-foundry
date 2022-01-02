export default [
  {
    "id": "clignotement",
    "name": "Clignotement",
    "description": "Déplace un objet ou une personne magiquement par téléportation dans une direction au hasard (avec un temps au hasard).\nDirection:\nNord\nSud\nEst\nOuest\nVertical\nDerrière le magicien (à 1d6 mètres)",
    "distance": {
      "text": ""
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "1d6Metres",
    "name": "1d6 mètres",
    "description": "3d6 mètres\n5d6 mètres\n2d6 x 10 mètres\n2d6 x 100 mètres\n2d6 - 1 kilomètres",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Instantané (le retour prend 2d6 -1)"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "Le sort ne fonctionne pas"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "etatGazeux",
    "name": "État gazeux",
    "description": "Une créature touchée et tout son équipement deviennent immatériel, apparaissant comme une forme brumeuse ressemblant à du brouillard. Dans cet état, le personnage ne peut pas être touché ou interagit physiquement, devenant immunisé contre toute attaque qui n’est pas de nature magique. Le personnage ne peut pas marcher, mais peut voler à 3 mètres par tour. Le personnage peut également passer à travers de petits trous ou des ouvertures étroites, même de simples fissures, avec tout ce qu’il portait ou tenait, tant que le sort persiste. Par contre, il ne peut pas attaquer physiquement ou affecter les autres, ne peut pas lancer de sorts, ne peut pas se déplacer plus rapidement et ne peut pas entrer dans l’eau ou d’autres liquides. Cela n’affecte qu’une créature consentante.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
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
    "id": "forceDuGeant",
    "name": "Force du géant",
    "description": "Donne un bonus de +2 en physique. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
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
      "text": "+2 en physique"
    },
    "resilience": {
      "text": "+4 en physique"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "graceFeline",
    "name": "Grâce féline",
    "description": "Donne un bonus de +2 en dextérité. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
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
      "text": "+2 en dextérité"
    },
    "resilience": {
      "text": "+4 en dextérité"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "identificationDeTresor",
    "name": "Identification de trésor",
    "description": "Ce sort révèle une seule fonction d’un objet magique pour chaque tour où il est en vigueur. Les fonctions les plus élémentaires sont révélées en premier, y compris comment activer cette fonction sur l’objet et combien de charges restent. Pour une arme, ce seront les modificateurs d’attaque et de dégâts. Si un objet magique a plusieurs fonctions différentes qui sont tout aussi basiques, le maître de jeu détermine laquelle est identifiée en premier. Ce sort peut être lancé pour identifier plusieurs objets, ce qui prend 10 minutes au coût de 10 points de mana.",
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
    "id": "jetDacide",
    "name": "Jet d’acide",
    "description": "Le magicien lance un jet d’acide qui touche la première personne sur son trajet.",
    "distance": {
      "value": 20,
      "unit": "m"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "Aucun test de résilience possible"
    },
    "damage": {
      "rollFormula": "return '2d6+' + (4 * context.actorData.computedData.magic.arcaneLevel);",
      "element": "acid"
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
      "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
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
    "id": "obscurite",
    "name": "Obscurité",
    "description": "Englobe un espace de 10 de rayon dans la noirceur la plus totale. La perception et les habiletés de combat dans l’espace est réduite de trois. Il faut utiliser l'habileté « Écouter » pour trouver un nouvel adversaire.",
    "distance": {
      "value": 20,
      "unit": "m"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.actorData.computedData.magic.arcaneLevel",
      "unit": "tours"
    },
    "area": {
      "value": 10,
      "unit": "m"
    },
    "bonus": {
      "text": "-3 perception et toutes habilités de combats."
    },
    "resilience": {
      "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "parlerAuxAnimaux",
    "name": "Parler aux animaux",
    "description": "Ce sort permet au magicien de converser avec des animaux. Ne fonctionnant pas sur les anthropomorphes, il faut utiliser le sort babelfish.  Cela permet au magicien de converser, d’interroger ou d’avoir une discussion amicale avec l’animal affecté. Cet effet se produit quel que soit l’émotion de l’animal et permet à l’animal de répondre. Les réponses sont d’une complexité limitée en fonction de l’intelligence de l’animal et de sa capacité à donner du sens à la communication. L’animal peut même faire une petite faveur au magicien.",
    "distance": {
      "value": 5,
      "unit": "m"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 2 * context.actorData.computedData.magic.arcaneLevel",
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
    "id": "pointeDePierre",
    "name": "Pointe de pierre",
    "description": "Ce sort provoque la création de formations en pointes longues, étroites et aiguisées sur un sol déjà en pierre autour du magicien. Le magicien peut affecter un rayon de 1 mètre par niveau d’arcane. Ces pointes de pierre restent discrètes jusqu’à ce que quelqu’un d’autre que le magicien les traverse. Dans ce cas, ils peuvent infliger des dégâts et réduire le mouvement. Les pierres aiguisées causent 1d6 dégâts aux imprudents. Une créature se déplaçant dans la zone subit des blessures à tous les mètres de mouvement.\nDe base la zone de pointe de pierre dure un (1) tour par niveau d’arcane du magicien. S’il le veut, le magicien peut maintenir l’anneau plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
      "unit": "tours"
    },
    "area": {
      "text": "1 mètre de rayon par niveau d’arcane."
    },
    "resilience": {
      "text": "6 points de dégâts par mètre"
    },
    "damage": {
      "text": "1d6 par mètre"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
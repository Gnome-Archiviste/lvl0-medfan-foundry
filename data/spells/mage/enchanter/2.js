export default [
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
    "id": "auraDePlacebo",
    "name": "Aura de Placébo",
    "description": "Met sur un objet non magique un aura qui semble être magique ainsi qu’une utilité toute aussi fausse. ex: potion de chance sur une bouteille d’eau colorée verte.",
    "distance": {
      "text": "Touché"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Un objet"
    },
    "resilience": {
      "text": "Permanant"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "boulePuante",
    "name": "Boule puante",
    "description": "Dans un contenant composé de 2 ½ sphères se vissant l’une sur l’autre sur lequel il a gravé un glyphe de déclenchement, l’enchanteur verse une concoction d’oeufs pourris et de satyrs puants (champignons) en bouillie, ce qui déclenche une zone nauséabonde de 2 mètres de rayon lorsque  quelqu’un s’en approche à moins de 50 cm. Les victimes ne peuvent plus attaquer ou jeter des sorts. Mais ils peuvent se défendre ou bouger la moitié de leur déplacement normal.",
    "distance": {
      "value": 5,
      "unit": "m"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 3",
      "unit": "tours"
    },
    "area": {
      "value": 2,
      "unit": "m"
    },
    "bonus": {
      "text": "Victimes inoffensives"
    },
    "resilience": {
      "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "braouleDePouvoir",
    "name": "Braoule de pouvoir",
    "description": "L’enchanteur imbue d’énergie magique un objet de la vie de tous les jours, qui habituellement ne fait pas vraiment de dégât, afin que ce dernier devienne une arme qui inflige 1d6-2 de dégât. ex: balai, braoule, louche, brosse à cheveux...",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "value": 1,
      "unit": "objet"
    },
    "bonus": {
      "text": "aucun"
    },
    "resilience": {
      "text": "fait 4 points de dégâts"
    },
    "damage": {
      "text": "1d6-2"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "fixateurMagique",
    "name": "Fixateur magique",
    "description": "L’enchanteur prépare une potion transparente sentant fortement le fixatif à cheveux dans un grand chaudron contenant entre autres un os à moelle, une pincée de poudre de perlépipein et de la résine de conifère (gros comme un œuf). Cette potion doit bouillir pendant 2 heures. L’enchanteur fait 5 fixateurs magiques par 2 points de mana dépensées durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Le chaudron"
    },
    "bonus": {
      "text": "Prépare un objet pour recevoir un sort. Permet de préparer dix (10) feuilles, deux (2) baguettes ou un (1) objet magique."
    },
    "resilience": {
      "text": "Fait 6 potions par 2 points de mana au lieu de 5."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "glypheDeDeclenchement",
    "name": "Glyphe de déclenchement",
    "description": "L’enchanteur grave sur un objet (habituellement contenant un piège) un glyphe représentant un carré avec une flèche pointant vers le bas. Toute personne approchant de l’objet à moins de 50 cm déclenchera le glyphe qui ouvrira ou activera l’objet sur lequel il est gravé.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "tant que le glyph n’est pas activé"
    },
    "area": {
      "text": "un objet"
    },
    "bonus": {
      "text": "Permet d’activer un objet sans être présent"
    },
    "resilience": {
      "text": "Le glyphe est encore bon pour un 2e déclenchement."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "meteorites",
    "name": "Météorites",
    "description": "L’enchanteur ensorcelle jusqu’à 3 petites pierres qui se mettent en orbite autour de sa tête. Lorsqu’il en a besoin, il peut s’en servir comme projectile en faisant un jet de lancer/tir comme action. Chaque pierre fait 1d6-2. L’enchanteur ne peut avoir plus de 5 météorites en orbite autour de lui.",
    "distance": {
      "text": "20 m."
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "1-3 cible"
    },
    "bonus": {
      "text": "Laisse les mains libres"
    },
    "resilience": {
      "text": "Fait 5 météorites (ceux manquants apparaissent comme par magie)."
    },
    "damage": {
      "text": "1d6-2"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "objetAnime",
    "name": "Objet animé",
    "description": "L’enchanteur donne un semblant de vie à un objet qui bouge sur l’ordre de celui-ci selon des actions simples et non-offensives : nettoyer les carreaux, s’empiler, balayer la pièce, s’enrouler, etc.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 5 * context.actorData.computedData.magic.arcaneLevel",
      "unit": "tours"
    },
    "area": {
      "text": "une cible"
    },
    "resilience": {
      "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "potionDeMana",
    "name": "Potion de mana",
    "description": "L’enchanteur prépare une potion claire et bleuté dans un grand chaudron contenant entre autre une amanite (champignon), une pincée de poudre de perlépipein et de la pulpe de coing (1 kilogramme) et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions de soin par point de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.",
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
      "text": "Donne 6 points de mana à la cible"
    },
    "resilience": {
      "text": "fait 4 potions par mana au lieu de 3."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "premiersSoins",
    "name": "Premiers soins",
    "description": "Guérit un coéquipier de 1d6 points de vie. Ne s’applique pas magicien lui-même. Ne peut pas dépasser le maximum de points de vie. Au lieu de guérir, ce sort fait du dommage sur les morts-vivants.",
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
      "text": "Guéris 1d6"
    },
    "resilience": {
      "text": "Guérit 6 points de vie"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
export default [
  {
    "id": "cometes",
    "name": "Comètes",
    "description": "L’enchanteur ensorcelle jusqu’à 3 petites pierres précieuses qui se mettent en orbite autour de sa tête. Lorsqu’il en a besoin, il peut s’en servir comme projectile en faisant un jet de lancer/tir comme action. Chaque pierre fait 1d6-2 et reviens se remettre en orbite. En réussissant un jet de concentration, l’enchanteur peut faire un sort supplémentaire. L’enchanteur ne peut avoir plus de 5 comètes en orbite autour de lui.",
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
      "text": "Fait 5 comètes (ceux manquants apparaissent comme par magie)."
    },
    "damage": {
      "text": "1d6-2"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "creationDobjetIntercaste",
    "name": "Création d’objet intercaste",
    "description": "L’enchanteur infuse un objets d’énergie mystique en le saupoudrant d’une pincée de poudre de perlépipein et incorporant un ingrédient catalyseur afin de donner au porteur 1 seul point dans une habileté de classe qui n’est pas la sienne. Selon l’habileté souhaitée, l'ingrédient catalyseur est le suivant:\nBottes de discrétion (Déplacement silencieux): Semelles souples en cuir de daim\nBouclier d’attaque (Attaque de bouclier): têtes de clous\nBonnet d’érudition (connaissance): hélice (doit être fonctionnelle)\nBrassards d'ambidextrie (combat 2 mains): glyphe en forme de pieuvre\nBrassards d’Elis (maitrise des animaux): glyphe en spirale en repoussé sur cuir vert\nCape de camouflage (camouflage): glyphes en forme de feuille (vert et brun)\nCape du défi (provocation): boutons en cornes de taureau\nCerclet de filature (pister): agate\nCerclet d'empathie (détection des motivations): quartz claire\nCoiffe cinétique (charge): cornes d’auroch\nCollier de commandement (commandement): Topaz impérial\nGantelets de Désarmement (désarmement): magnétite\nGantelets d’effroie (intimidation): cuire noire dentelé\nGants du faussaire (faux-semblant): soie blanche\nGants londoits (larcin): peau de belette\nLunettes du korrigan (Évaluation): disque de mica\nTroisième oeil (sentir la magie): Calcédoine avec un point noir au centre (pierre)",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "instantané"
    },
    "area": {
      "text": "L’objet"
    },
    "bonus": {
      "text": "Permet de faire une habileté réservée à une autre classe"
    },
    "resilience": {
      "text": "donne 2 points dans l’habileté."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "destrierDePoche",
    "name": "Destrier de poche",
    "description": "L’enchanteur infuse le sort dans une figurine de bois représentant un animal (pas nécessairement un cheval) pouvant servir de destrier. La figurine, une fois activé, devient pleine grandeur.",
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
      "text": ""
    },
    "resilience": {
      "text": "fait 4 potions par mana au lieu de 3."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "invocation",
    "name": "Invocation",
    "description": "Fait apparaître une créature sans nom pour combattre à la place de l’enchanteur. Attention on ne peut avoir plus que deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient. Les caractéristiques de la créature : Phy=9, Int=7, Cha=4, Dex=8, Per=6 (aucune habileté), 100 points de vie.",
    "distance": {
      "value": 2,
      "unit": "m"
    },
    "duration": {
      "text": "Un combat ou jusqu’à détruit"
    },
    "damage": {
      "rollFormula": "return '1d6+6';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "resilienceAucune",
    "name": "Résilience  Aucune",
    "description": "Succès remarquable : 150 points de vie\nPotion d’urgence\nL’enchanteur prépare une potion claire et rougeâtre dans un grand chaudron contenant entre autre du sang de troll (100 ml), une pincée de poudre de perlépipein et de la pulpe de papyrus (250 grammes) et qui doit mijoter et être touillée pendant 6 heures. L’enchanteur fait 3 potions de soin par 7 points de mana dépensées durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.",
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
      "text": "Donne 50 pv à la cible"
    },
    "resilience": {
      "text": "fait 4 potions par mana au lieu de 3."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "potionsRehaussantes",
    "name": "Potions rehaussantes",
    "description": "L’enchanteur prépare une potion sirupeuse de couleur variable dans un grand chaudron contenant divers ingrédients ainsi qu’une pincée de poudre de perlépipein et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions par 7 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane. Selon la potion, l'ingrédient principal est le suivant:\nPotion de Force: 1 litre de sève de chêne\nPotion de Dextérité: 3 cuillères à thé de grains moulus de caféier\nPotion d’Intelligence: 1 litre d’huile de foie de morue\nPotion de Perception: 1 litre de jus de carotte\nPotion de Charisme: 3 cuillères à thé d’essence de rose",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "instantané"
    },
    "area": {
      "text": "Le chaudron"
    },
    "bonus": {
      "text": "Donne un bonus de 2 à une statistique de la cible"
    },
    "resilience": {
      "text": "fait 4 potions par mana au lieu de 3."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
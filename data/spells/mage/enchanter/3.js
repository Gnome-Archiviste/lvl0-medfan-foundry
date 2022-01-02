export default [
  {
    "id": "anneauDhabileteGenerale",
    "name": "Anneau d’habileté générale",
    "description": "L’enchanteur grave un petit glyphe, désignant l’habileté générale à bonifier, dans la face intérieure d’une bague en argent sans pierre précieuse ou semi-précieuse. L’habileté ne peut être changée par la suite.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "heure"
    },
    "area": {
      "text": "La bague"
    },
    "bonus": {
      "text": "+1 point dans une habileté générale"
    },
    "resilience": {
      "text": "Donne un bonus d’une seconde habileté choisie par le magicien."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "auraDeBanalite",
    "name": "Aura de Banalité",
    "description": "Met sur un objet magique un aura qui masque l’aura magique de celui-ci. ex: une potion de chance semblera n’être qu’une bouteille d’eau colorée en vert.",
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
      "text": "Aucun jet de résilience possible"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "bonification",
    "name": "Bonification",
    "description": "L’enchanteur infuse à une cible l’énergie nécessaire pour augmenter une statistique de base de celle-ci. L’enchanteur doit tenir en main le bon type de matériel qui servira de catalyseur au sort*.\nL’enchanteur infuse dans un objet l’énergie nécessaire pour augmenter une statistique de base du porteur de l’objet. L’objet en question doit être neuf et préalablement traité pour recevoir l’enchantement. De plus il doit être certi du bon type de pierre qui servira de réceptacle au sort*. Pour que l'enchantement ne s’estompe pas à la fin de la première utilisation, il faut le sceller avec le sort de Permanence.\nVoici les enchantements à utiliser avec ce sort:.\nAgilité du lutin: Donne un bonus de +1 en dextérité.\nÉclat elfique: Donne un bonus de +1 en Charisme.\nForce du nain: Donne un bonus de +1 en Physique.\nNez du haufelin: Donne un bonus de +1 en Perception.\nRuse du gnome: Donne un bonus de +1 en Intelligence.",
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
      "text": "+1 de bonus dans la statistique choisie"
    },
    "resilience": {
      "text": "+2 de bonus dans la statistique choisie"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "cadenasMagique",
    "name": "Cadenas magique",
    "description": "Verrouille magiquement une porte ou une boîte. Ne peut être déverrouillé par Sésame. L’enchanteur doit toucher l’objet.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Jusqu’à l’ouverture"
    },
    "area": {
      "text": "Une cible"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "charmerUneConstruction",
    "name": "Charmer une construction",
    "description": "Ce sort fait qu’une construction considère l’enchanteur comme son un allié. Le sort ne permet pas au personnage de contrôler la construction charmée comme s’il s’agissait d’un automate, mais perturbe sa programmation qui maintenant perçoit les paroles et les actions de l’enchanteur de la manière la plus favorable. Le magicien peut essayer de donner des ordres au sujet, mais il doit réussir un test d’éloquence pour le convaincre de faire tout ce qu’il ne ferait pas d’ordinaire.\nCe sort est efficace contre les golems et toutes les autres constructions. Il n’a aucun effet contre les autres créatures.\nTout acte de l’enchanteur, ou de ses alliés apparents, qui menace la construction charmée brise le sort. Notez également que l’enchanteur doit parler la langue de la construction pour communiquer ou donner des ordres.\nLa construction charmée peut faire des tests de résilience pour se défaire du sort, mais elle doit réussir trois tests de suite un fois charmée.",
    "distance": {
      "value": 5,
      "unit": "m"
    },
    "duration": {
      "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
      "unit": "minutes"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Victime sympathique"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "eclair",
    "name": "Éclair",
    "description": "Un éclair vient frapper la victime désignée par le magicien. Fait 1d6 + 2 de dégâts.",
    "distance": {
      "text": "10 m plus 1 m par niveau"
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
    "damage": {
      "rollFormula": "return '1d6+2';",
      "element": "electric"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "pageSecrete",
    "name": "Page secrète",
    "description": "Ce sort masque toute information sur une page ou un parchemin de telle sorte que la page apparaît vierge ou couverte par d’autres informations. L’enchanteur peut invoquer un mot de commande pour révéler les informations cachées et un autre mot de commande pour remettre l’illusion. Détecter la magie révèle une faible aura magique, mais pas sa nature. Dissiper la magie dissipera le sort, mais peut également affecter l’écriture cachée. Le sort « Effacer » supprimera à la fois l’illusion et toute autre information masquée par la page secrète.",
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
      "text": "&"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "potionsToniques",
    "name": "Potions toniques",
    "description": "L’enchanteur prépare une potion claire de couleur variable dans un grand chaudron contenant divers ingrédients ainsi qu’une pincée de poudre de perlépipein et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions par 3 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane. Selon la potion, l'ingrédient principal est le suivant:\nPotion de Force: 1 litre de sève de chêne\nPotion de Dextérité: 3 cuillères à thé de grains de caféier moulus\nPotion d’Intelligence: 1 litre d’huile de foie de morue\nPotion de Perception: 1 litre de jus de carotte\nShampoing de Charisme: 200 grammes de purée d’abricot frais",
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
      "text": "Donne un bonus de 1 à une statistique de la cible"
    },
    "resilience": {
      "text": "fait 4 potions par mana au lieu de 3."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "potionsUtilitairesCommunes",
    "name": "Potions utilitaires communes",
    "description": "L’enchanteur prépare la potion (de couleur et de consistance variant la potion. Voir le manuel des objets) dans un grand chaudron contenant divers ingrédients ainsi qu’une pincée de poudre de perlépipein et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions par 3 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane. Selon la potion, l'ingrédient principal est le suivant:\nAntidote: 500 g. d’orge, 1 l. de lait et 25 g. de poudre de charbon de bois. Faire frémir\nseulement. Presser et conserver seulement le jus.\nPetite vache: 2 cuillères à soupe de craie, 1 cuillère à soupe de sel et une pincée de\ncharbon. Faire évaporer entièrement.\nPotion de lévitation: 1 choux, 500 g. de flageolets, 1 artichaut et un bouquet de persil.\nBrasser avec une plume d’albatros.\nPotion d’invisibilité: 1 litre d’eau distillée, 100 ml de vinaigre blanc et 5 g. de sel. Mettre\nun quartz clair dans le fond de la marmite.\n*Si l’enchanteur fait un double six (6) lors du jet de sorcellerie, la potion devient une potion d’in-visibiliste.\nPoudre de fée: 100 g. de talc, 50 g. de poudre de magnétite, 6 dahlia roses (fleurs) et\nune pincée supplémentaire de poudre de perlépipein. Faire évaporer\nentièrement.\nPoudre du souffle de l’araignée: 100 g. de toile d’araignée, 200 g. de poussière et\n12 feuilles mortes tombées naturellement en poudre.\nFaire évaporer entièrement.",
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
      "text": "Dépends de la potion"
    },
    "resilience": {
      "text": "fait 4 potions par mana au lieu de 3."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "runeDeKegan",
    "name": "Rune de Kegan",
    "description": "Le magicien dessine sur une surface un symbole. Lorsqu’un ennemi s’en approche à moins de soixante (60) centimètres, une explosion fait deux (2) dés de dégâts sur toutes les créatures se trouvant dans un rayon de deux (2) mètres.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Jusqu’à l’utilisation (Préparation 2 minutes)"
    },
    "area": {
      "value": 2,
      "unit": "m"
    },
    "resilience": {
      "text": "4d6"
    },
    "damage": {
      "rollFormula": "return '2d6';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
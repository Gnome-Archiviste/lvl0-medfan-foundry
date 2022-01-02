export default [
  {
    "id": "bulleDeCRazigloo",
    "name": "Bulle de C. Razigloo",
    "description": "Se colle à la cible et gonfle jusqu'à atteindre 4 mètres de diamètre en 2 tours. La sphère colle sur tout ce qu’elle touche. La cible doit faire un jet de gymnastique pour rester debout au deuxième tour. Toute personne dans la zone de la bulle sera aussi collée à celle-ci. Et pour en ajouter, ça prend une annulation des malédictions pour se décoller... juste pour être pénible.",
    "distance": {
      "value": 15,
      "unit": "m"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "value": 2,
      "unit": "m"
    },
    "resilience": {
      "text": "Aucun test de résilience possible"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "cadenasMagique",
    "name": "Cadenas magique",
    "description": "Verrouille magiquement une porte ou une boîte. Ne peut être déverrouillé par Sésame. Le bouffon doit toucher l’objet.",
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
    "id": "charme",
    "name": "Charme",
    "description": "Ce sort fait qu’une créature considère le bouffon comme un ami et un allié de confiance. Le sort ne permet pas au personnage de contrôler la créature charmée comme s’il s’agissait d’un automate, mais le sujet perçoit les paroles et les actions du bouffon de la manière la plus favorable. Le bouffon peut essayer de donner des ordres au sujet, mais il doit réussir un test d’éloquence pour le convaincre de faire tout ce qu’il ne ferait pas d’ordinaire.\nTout acte du bouffon, ou de ses alliés apparents, qui menace la créature charmée brise le sort. Notez également que le bouffon doit parler la langue de la créature pour communiquer ou donner des ordres.\nLa créature charmée peut faire des tests de résilience pour se défaire du sort, mais elle doit réussir trois tests de suite un fois charmée.",
    "distance": {
      "value": 5,
      "unit": "m"
    },
    "duration": {
      "value": 10,
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Victime sympathique"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "entartrage",
    "name": "Entartrage",
    "description": "Ce sort crée une tarte à la crème dans les airs que le Bouffon peut ensuite envoyer sur qui il veut. La tarte est difficile à éviter en raison de sa vitesse vertigineuse.\nCela aveuglera également la victime jusqu'à ce qu'elle ait une chance d’essuyer toute la crème de son visage.\nRends une tête de la victime aveugle pour un (1) tour par niveau d’arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
    "distance": {
      "value": 20,
      "unit": "m"
    },
    "duration": {
      "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "-3 perception et toutes habilités de combats."
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
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
      "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "tartesALaCreme",
    "name": "Tartes à la crème",
    "description": "Le bouffon envoie une tarte au visage de sa cible et qui se dédouble plusieurs fois au point que la cible reçoit une nuée de tartes à la crème au visage.",
    "distance": {
      "value": 15,
      "unit": "m"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "value": 2,
      "unit": "m"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "damage": {
      "rollFormula": "return context.actorData.computedData.magic.arcaneLevel + 'd6';",
      "element": "physic"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "unBrinInvisible",
    "name": "Un brin invisible",
    "description": "La cible (et tout son équipement) disparaît de toutes les formes de vision naturelle. Les objets lâchés ou déposés par une créature invisible deviennent visibles ; les objets ramassés disparaissent s’ils sont rentrés dans les vêtements ou les pochettes portés par la créature. La lumière, cependant, ne devient jamais invisible, bien qu’une source de lumière puisse le devenir (ainsi, l’effet est celui d’une lumière sans source visible). Toute partie d’un objet que le sujet porte, mais qui s’étend à plus de trois (3) mètres de lui devient visible, comme une corde qui traîne. Le sort prend fin si le sujet attaque une créature. Dans ce cas, est considéré comme une attaque toute action ou sort infligeant des dégâts ou effets négatifs à une cible. Notez que les sorts affectant spécifiquement les alliés, mais pas les ennemis ne sont pas des attaques à cet effet, même lorsqu’ils incluent des ennemis dans leur zone. Les personnes affectées par ce sort ne peuvent se voir entre elles, ni elle-même.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "une (1) scène"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "Double la durée"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]
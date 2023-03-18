export default [
    {
        "id": "appelDeLaNature",
        "name": "Appel de la nature",
        "icon": "icons/environment/wilderness/tree-spruce.webp",
        "description": "Ce sort crée une sensation d’urgence, chez la cible, de se soulager de ses besoins naturels. Pendant 3 tours, la cible ne peut plus se concentrer sur autre chose. Elle doit se retirer pour aller faire ses besoins. Si elle est en combat, elle ne peut plus attaquer ou faire des sorts. Il doit partir du combat ou de la situation, en se déplaçant à la moitié du déplacement normal. ",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 3",
            "value": 3,
            "unit": "tours",
            "text": "3 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "bulleDeCRazigloo",
        "name": "Bulle de C. Razigloo",
        "icon": "icons/skills/melee/sword-stuck-glowing-pink.webp",
        "description": "Se colle à la cible et gonfle jusqu'à atteindre 4 mètres de diamètre en 2 tours. La sphère colle sur tout ce qu’elle touche. La cible doit faire un jet de gymnastique pour rester debout au deuxième tour. Toute personne dans la zone de la bulle sera aussi collée à celle-ci. Et pour en ajouter, ça prend une annulation des malédictions pour se décoller... juste pour être pénible.  ",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Donne droit à un (1) jet d’évasion afin de se sortir de là."
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "cadenasMagique",
        "name": "Cadenas magique",
        "icon": "icons/sundries/misc/lock-steel-blue.webp",
        "description": "Verrouille magiquement une porte ou une boîte. Ne peut être déverrouillé par Sésame. Le bouffon doit toucher l’objet.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Jusqu’à l’ouverture"
        },
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "charme",
        "name": "Charme",
        "icon": "icons/magic/life/heart-shadow-red.webp",
        "description": "Ce sort fait qu’une créature considère le bouffon comme un ami et un allié de confiance. Le sort ne permet pas au personnage de contrôler la créature charmée comme s’il s’agissait d’un automate, mais le sujet perçoit les paroles et les actions du bouffon de la manière la plus favorable. Le bouffon peut essayer de donner des ordres au sujet, mais il doit réussir un test d’éloquence pour le convaincre de faire tout ce qu’il ne ferait pas d’ordinaire.\n\n\n\n\n\nTout acte du bouffon, ou de ses alliés apparents, qui menace la créature charmée brise le sort. Notez également que le bouffon doit parler la langue de la créature pour communiquer ou donner des ordres.\n\n\n\n\n\nLa créature charmée peut faire des tests de résilience pour se défaire du sort, mais elle doit réussir trois tests de suite un fois charmée.\n\n\n\n",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime sympathique"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "detectionDesIllusions",
        "name": "Détection des illusions",
        "icon": "icons/magic/defensive/illusion-evasion-echo-purple.webp",
        "description": "Au moyen de ce sort, le bouffon peut détecter la présence d’illusions dans la direction vers laquelle le lanceur fait face, le long d’un chemin de 15 mètres de long et 3 mètres de large. Contrairement à la détection de magie, ce sort peut être lancé sur une autre créature au toucher.\n\nLe lanceur doit passer un tour à se concentrer le long du chemin pour détecter toute illusion, bien que le lanceur puisse à la fois lancer le sort et commencer à détecter dans le même tour que le sort est lancé. La force de l’illusion détectée sera révélée comme persistante, faible, moyenne, forte ou écrasante. Des zones illusoires, de multiples types d’illusions ou de fortes émanations illusoires peuvent confondre ou dissimuler des illusions plus faibles ; le bouffon doit passer des tours supplémentaires à se concentrer (test de concentration) pour déchiffrer la confusion ou révéler des illusions.",
        "distance": {
            "text": "Vers laquelle le lanceur fait face sur 15 mètres de long et 3 mètres de large."
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Bouffon"
        },
        "criticalSuccess": {
            "text": "Distance de 30 mètres de long et 5 mètres de large."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "entarter",
        "name": "Entarter",
        "icon": "icons/consumables/food/candy-taffy-yellow.webp",
        "description": "Ce sort crée une tarte à la crème dans les airs que le Bouffon peut ensuite envoyer sur qui il veut. La tarte est difficile à éviter en raison de sa vitesse vertigineuse. \n\nCela aveuglera également la victime jusqu'à ce qu'elle ait une chance d’essuyer toute la crème de son visage (La victime perd donc son action pour enlever la crème).\n\nRends une tête de la victime aveugle pour un (1) tour par niveau d’arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "-3 perception et toutes habilités de combats."
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "grelot",
        "name": "Grelôt",
        "icon": "icons/tools/instruments/bell-brass.webp",
        "description": "Fait qu’une cible émet des sons de grelots lorsqu’elle marche.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "une scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Empêche d’utiliser l’habileté Déplacement silencieux"
        },
        "resilience": {
            "text": "Annule le sort"
        },
        "criticalSuccess": {
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "illusion",
        "name": "Illusion",
        "icon": "icons/creatures/magical/spirit-undead-winged-ghost.webp",
        "description": "Permet de faire apparaître une illusion jusqu’à 20 mètres de haut.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return context.arcaneLevel * 2;",
            "unit": "minutes",
            "text": "2 minute par niveau d'arcane"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "tartesALaCreme",
        "name": "Tartes à la crème",
        "icon": "icons/consumables/food/berries-cream-bowl-mint-red.webp",
        "description": "Le bouffon envoie une tarte au visage de sa cible et qui se dédouble plusieurs fois au point que la cible reçoit une nuée de tartes à la crème au visage.",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return context.arcaneLevel + 'd6';",
            "element": "physic",
            "text": "1d6 par niveau d’arcane"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "unBrinInvisible",
        "name": "Un brin invisible",
        "icon": "icons/magic/perception/shadow-stealth-eyes-purple.webp",
        "description": "La cible (et tout son équipement) disparaît de toutes les formes de vision naturelle. Les objets lâchés ou déposés par une créature invisible deviennent visibles ; les objets ramassés disparaissent s’ils sont rentrés dans les vêtements ou les pochettes portés par la créature. La lumière, cependant, ne devient jamais invisible, bien qu’une source de lumière puisse le devenir (ainsi, l’effet est celui d’une lumière sans source visible). Toute partie d’un objet que le sujet porte, mais qui s’étend à plus de trois (3) mètres de lui devient visible, comme une corde qui traîne. Le sort prend fin si le sujet attaque une créature. Dans ce cas, est considéré comme une attaque toute action ou sort infligeant des dégâts ou effets négatifs à une cible. Notez que les sorts affectant spécifiquement les alliés, mais pas les ennemis ne sont pas des attaques à cet effet, même lorsqu’ils incluent des ennemis dans leur zone. Les personnes affectées par ce sort ne peuvent se voir entre elles, ni elle-même. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1",
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": false
    }
]
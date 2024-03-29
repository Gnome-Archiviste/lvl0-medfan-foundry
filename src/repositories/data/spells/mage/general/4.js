export default [
    {
        "id": "antidote",
        "name": "Antidote",
        "icon": "icons/magic/holy/chalice-glowing-gold.webp",
        "description": "Permets de contrer les potions négatives pendant une scène (comme celle de sommeil).",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Contre les potions négatives"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "aveuglement",
        "name": "Aveuglement",
        "icon": "icons/creatures/eyes/humanoid-single-blind.webp",
        "description": "Rends une tête de la victime aveugle pour un tour par niveau d’arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "1 tour par niveau d’arcane du magicien"
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
        "dependsOnArcaneLevel": false
    },
    {
        "id": "bouleDeFeu",
        "name": "Boule de feu",
        "icon": "icons/magic/fire/projectile-fireball-orange-yellow.webp",
        "description": "D’un geste, le magicien envoie une boule de feu dans les airs pour exploser avec un rugissement à la hauteur et à la distance que le magicien désire, tant qu’elle se trouve dans la portée maximale du sort (15 mètres). L’explosion remplit la zone d’effet d’un feu et d’une chaleur intense, causant 1d6 dégâts par niveau d’arcane du magicien à toutes les créatures de la zone. Il affecte une sphère de 3x3 mètres. La boule de feu suit une trajectoire rectiligne et si elle heurte une barrière solide avant d’atteindre la portée prescrite, l’impact provoque une explosion précoce. ",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 3,
            "height": 3,
            "text": "3x3 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux (arrondissement favorable)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "element": "fire",
            "text": "1d6 par niveau d’arcane du magicien"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "charme",
        "name": "Charme",
        "icon": "icons/magic/life/heart-shadow-red.webp",
        "description": "Ce sort fait qu’une créature considère le magicien comme un ami et un allié de confiance. Le sort ne permet pas au personnage de contrôler la créature charmée comme s’il s’agissait d’un automate, mais le sujet perçoit les paroles et les actions du magicien de la manière la plus favorable. Le magicien peut essayer de donner des ordres au sujet, mais il doit réussir un test d’éloquence pour le convaincre de faire tout ce qu’il ne ferait pas d’ordinaire.\n\nTout acte du magicien, ou de ses alliés apparents, qui menace la créature charmée brise le sort. Notez également que le magicien doit parler la langue de la créature pour communiquer ou donner des ordres.\n\nLa créature charmée peut faire des tests de résilience pour se défaire du sort, mais elle doit réussir trois tests de suite un fois charmée.",
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
            "text": "le magicien devient sympathique à la victime"
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
        "id": "guerison",
        "name": "Guérison",
        "icon": "icons/magic/life/cross-flared-green.webp",
        "description": "Guérit un coéquipier ou lui-même de 3d6 points de vie. Doit toucher la cible. Ne peut pas dépasser le maximum de points de vie. Au lieu de guérir, ce sort fait du dommage sur les morts-vivants.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Guérit 3d6 points de vie"
        },
        "resilience": {
            "text": "Aucune (moitié du dommage pour les morts-vivants, arrondissement favorable)"
        },
        "criticalSuccess": {
            "text": "Guérit 18 points de vie."
        },
        "heal": {
            "rollFormula": "return '3d6';"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "invisibilite",
        "name": "Invisibilité",
        "icon": "icons/magic/perception/shadow-stealth-eyes-purple.webp",
        "description": "Le magicien (et tout son équipement) disparaît de toutes les formes de vision naturelle. Les objets lâchés ou déposés par une créature invisible deviennent visibles ; les objets ramassés disparaissent s’ils sont rentrés dans les vêtements ou les pochettes portés par la créature. La lumière, cependant, ne devient jamais invisible, bien qu’une source de lumière puisse le devenir (ainsi, l’effet est celui d’une lumière sans source visible). Toute partie d’un objet que le sujet porte, mais qui s’étend à plus de trois (3) mètres de lui devient visible, comme une corde qui traîne. Si le sujet attaque une créature, le sort prend fin. Dans ce cas, toute action ou tout sort infligeant des dégâts ou effets négatifs à une cible est considéré comme une attaque. Notez que les sorts affectant spécifiquement les alliés, mais pas les ennemis ne sont pas des attaques à cet effet, même lorsqu’ils incluent des ennemis dans leur zone. Les personnes affectées par ce sort ne peuvent se voir entre elles ni elle-même. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "La cible a droit à une seule attaque sans devenir visible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "miroir",
        "name": "Miroir",
        "icon": "icons/sundries/survival/mirror-plain.webp",
        "description": "Ce sort reflète un sort (maximum du niveau d’arcane du magicien) lancé contre le magicien à l’envoyeur.",
        "distance": {
            "text": "Soi même"
        },
        "duration": {
            "text": "Un combat ou utilisation"
        },
        "area": {
            "text": "Magicien"
        },
        "resilience": {
            "text": "Aucune (sauf sur le sort reflété)"
        },
        "criticalSuccess": {
            "text": "Maximise les dégâts du sort reflété"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "nueeGrouillante",
        "name": "Nuée grouillante",
        "icon": "icons/creatures/invertebrates/wasp-swarm-tan.webp",
        "description": "Convoque une nuée d’araignées, chauves-souris, rats ou scorpions, etc qui attaquent la cible. Le type d’animal et son attaque est déterminé par la table ci-dessous. *Le Maître de jeu peut donner un type plus précis selon la région*\n\n\n\n* 1: Oiseaux; dégâts: 4d6+6\n\n* 2: Rats; dégâts: 3d6+6\n\n* 3: Puces; dégâts: 3d6+3\n\n* 4: Araignées; dégâts: 3d6\n\n   * Lancer un dé supplémentaire: sur un 5 ou 6, l’ennemi s’enfuit de dégoût pendant 2 tours\n\n* 5: Moustiques; dégâts: 3d6\n\n   * Lancer un dé supplémentaire: sur un 6, l’ennemi s'endort.\n\n* 6: Insectes rampants; dégâts: 2d6\n\n   * Lancer un dé supplémentaire: sur un 5 ou 6, l’ennemi s’enfuit de dégoût pendant 2 tours",
        "distance": {
            "text": "15 mètres."
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "Selon l’attaque de la nuée."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "passageSansTraces",
        "name": "Passage sans traces",
        "icon": "icons/magic/movement/trail-streak-impact-blue.webp",
        "description": "En recevant ce sort, la cible peut se déplacer sur n’importe quel type de terrain et ne laisser ni empreintes ni odeurs. Pister la cible devient impossible par des moyens non magiques.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * context.arcaneLevel",
            "unit": "minutes",
            "text": "Une minute par niveau du magicien"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "runeDeKegan",
        "name": "Rune de Kegan",
        "icon": "icons/magic/symbols/rune-sigil-red-orange.webp",
        "description": "Le magicien dessine sur une surface un symbole. Lorsqu’un ennemi s’en approche à moins de soixante (60) centimètres, une explosion fait deux (2) dés de dégâts sur toutes les créatures se trouvant dans une zone de 5x5 mètres.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Jusqu’à l’utilisation (Préparation 2 minutes)"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "4d6"
        },
        "damage": {
            "rollFormula": "return '2d6';",
            "element": "fire",
            "text": "2d6"
        },
        "dependsOnArcaneLevel": false
    }
]
export default [
    {
        "id": "bananeRoyale",
        "name": "Banane royale",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le bouffon fait tomber du ciel une banane géante suivie de 3 boules de crème glacée géantes (une à la vanille, une au chocolat et une à la fraise) qui sont ensuite nappées de sirop au caramel chaud, puis 3 cerises confites tout aussi géantes viennent chapeauter les boules de crème glacée.",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 1,
            "height": 3,
            "text": "1x3 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "8d6 + 9 (1d6 / boule de crème glacée + 2d6 pour le sirop + 1d6 / cerise confite + 9 point de dégâts pour la banane)"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "charretteDeBouffon",
        "name": "Charrette de bouffon",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Petite charrette format enfant auquel est attaché à l’avant une piñata en forme de cheval. Le bouffon peut s’y engouffrer avec une autre personne, si cette personne n’est pas un bouffon, et se déplacer. Si toutes les personnes entrant dans le chariot sont des bouffons, 13 personnes peuvent prendre place dans la charrette.\n\n\n\n",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "conscienceFictive",
        "name": "Conscience fictive",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet au bouffon de communiquer par la pensée avec un autre personnage qui est à une distance de cinq (5) mètres par niveau. Cette personne doit être connue ou être visible du bouffon (l’Œil de Dasha fonctionne). La communication est dans les deux directions.",
        "distance": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5 * context.arcaneLevel",
            "unit": "m",
            "text": "5 mètres par niveau d’arcane"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée et distance (pré-calculé)'; } return 'Double la durée et distance';",
            "text": "Double la durée et distance"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "jetPrismatique",
        "name": "Jet prismatique",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort fait jaillir de la main du bouffon sept faisceaux chatoyants et entrelacés de lumière multicolore. Chaque faisceau a une puissance différente. Toutes les créatures de la zone sont frappées au hasard par une ou plusieurs faisceaux, comme déterminés en lançant 2d6 pour chaque cible. La zone d’effet est un cône de 5 mètres de large sur 15 mètres de long.\n\n7        rouge         10 dommages\n\n6, 12         orange        20 dommages\n\n5, 11        jaune        40 dommages\n\n4, 10         vert        80 dommages\n\n3, 9         bleu         Transformation en pierre\n\n8         indigo         Intelligence à 1 \n\n2         mauve        Relancer 2 fois le dé et appliquer les 2 effets. Un autre 2 résulte d'ajouter un autre lancé. \n\n\n\n",
        "distance": {
            "text": "1 mètre (devant le bouffon)"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "width": 5,
            "height": 15,
            "text": "5x15 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "voir la table ci-dessus"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "œilDeDasha",
        "name": "Œil de Dasha",
        "icon": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "description": "Le bouffon crée un œil magique invisible qui envoie des informations visuelles au bouffon. L’œil de Dasha se déplace à 9 mètres par tour et voit exactement comme le bouffon verrait si le bouffon était sur place. Si l’œil examine les murs ou les plafonds, il se déplace à 3 mètres par tour.\n\n\n\n\n\nDes barrières solides empêchent le passage d’un œil de Dasha, bien qu’il puisse traverser un espace pas plus petit qu’un petit trou de souris (trois (3) cm de diamètre). Le bouffon doit se concentrer pour utiliser l’œil. Si le bouffon ne se concentre pas, l’œil devient inerte jusqu’à ce que le bouffon se concentre à nouveau.\n\n\n\n\n\nLes pouvoirs de l’œil ne peuvent pas être améliorés par d’autres sorts ou objets (bien que le bouffon puisse utiliser la magie pour améliorer sa propre vue). \n\n\n\n\n\nL’Œil de Dash permet de faire des sorts en utilisant l’œil comme point d’origine. Avant sa disparition, l’œil commence à perdre la vue. \n\n\n\n\n\nLe bouffon est soumis à toute attaque du regard qu’il rencontre. Une annulation de la magie sur le bouffon ou l’œil met fin au sort. En ce qui concerne la cécité, le sort aveuglement, l’obscurité magique et d’autres phénomènes qui affectent la vision, l’œil de Dasha est considéré comme un organe sensoriel indépendant du bouffon. Des sorts tels que « voir l’invisible » peuvent également détecter l’œil.\n\n\n\n",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "rollFormula": "return '2d6+' + (context.arcaneLevel * 1);",
            "unit": "tours",
            "text": "2d6 + (1 par niveau d’arcane)"
        },
        "area": {
            "width": 1,
            "height": 1,
            "text": "1x1 mètre",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "permanence",
        "name": "Permanence",
        "icon": "icons/magic/time/hourglass-tilted-gray.webp",
        "description": "Ce sort permet de rendre un autre sort permanent. Grâce au sort de permanence, le sort sur lequel on l’applique n’a plus de limite de temps. \n\nNe peut se faire que sur un objet préparé pour faire le sort. Voir la section Création d’objet magique.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Prend 1 minute à lancer"
        },
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "premonition",
        "name": "Prémonition",
        "icon": "icons/commodities/treasure/dreamcatcher-brown.webp",
        "description": "Lancer au coucher, le sort permet au bouffon de voir de l’information sur le futur probable durant ses rêves. Le magicien se souvient de ses rêves prémonitoires. \n\nLe maître de jeu donne des indices sur un événement qui devrait (le plus possible) se passer dans la partie. Le sort permet au maître de jeu de donner des informations importantes que les joueurs auraient ratées.\n\nComme la prémonition est un rêve, celui-ci peut-être représentatif et non une image précise sur un événement.",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "text": "Durant le sommeil"
        },
        "area": {
            "text": "Bouffon"
        },
        "criticalSuccess": {
            "text": "Le prémonition est clair"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "transformation",
        "name": "Transformation",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible prend la forme de n’importe quelle créature connue du bouffon. S’il s’agit d’une personne en particulier, le bouffon doit l’avoir rencontré. Le changement prend un tour. La forme est bien réelle et confère à la cible la plupart des capacités de la créature formée. La cible conserve sa caractéristique d’intelligence, mais prend les autres caractéristiques de la nouvelle forme. Elle garde aussi ses propres points de vie et points de mana. Le personnage conserve ses spécialités et peut les utiliser si c’est possible avec la nouvelle forme. Le personnage ne gagne pas les capacités magiques ou surnaturelles de la nouvelle forme, mais acquiert les spécialités de la nouvelle forme. La taille de la forme prise peut aller jusqu’à deux fois plus petites ou grandes que la cible. Même les états amorphes ou gazeux peuvent être assumés en lançant ce sort. S’il est tué, le personnage reprend sa forme originale, mais reste mort.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 2",
            "value": 2,
            "unit": "scènes",
            "text": "2 scènes"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    }
]
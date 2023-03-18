export default [
    {
        "id": "barriereDeLame",
        "name": "Barrière de lame",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Pour lancer ce sort, le bouffon se met à jongler avec trois dagues mais si rapidement qu’elles semblent se dédoubler. Le sort crée un mur de lames tourbillonnantes. Le mur est immobile et mesure dix (10) mètres de haut, fait un (1) mètre par niveau d’arcane du bouffon de largeur et deux (2) mètres de profondeur. \n\nToute créature qui passe dans la barrière de lame subit 5d6 points de dégâts. Les créatures à l’intérieur de la barrière de lame, lorsqu’elle est invoquée, subissent également les dégâts. Une fois la barrière en place, tout ce qui entre ou passe à travers les lames est automatiquement endommagé.\n\nLe bouffon peut maintenir le mur indéfiniment en se concentrant pour le faire, ou peut renoncer à une concentration continue (faire un test de concentration par tour, et le bouffon ne peut que faire ce test durant le tour), auquel cas le mur durera un (1) tour par niveau d’arcane du bouffon.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "1 mètre de largeur par niveau d’arcane"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "5d6 (Physique)"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "bonneteauAuxNoix",
        "name": "Bonneteau aux noix",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le bouffon peut escamoter un petit objet (grosseur d’une potion) devant les yeux de badeaux ébaillis en utilisant deux ou trois contenants suffisamment grands pour recouvrir l’objet. En intervertissant à répétition les contenants durant le sort, le bouffon téléporte l’objet dans son sac. En dépensant un point de mana supplémentaire, il peut le téléporter dans le sac d’un coéquipier à moins de 5 mètres de lui.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 2,
            "unit": "tours",
            "text": "2 tours"
        },
        "area": {
            "text": "1 mètre devant le bouffon"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "uneGambadeSurLeau",
        "name": "Une gambadé sur l’eau",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet à une cible de se déplacer en sautillant sur un liquide comme si elle était sur un sol solide. Le sort dure 10 tours.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "obscurite",
        "name": "Obscurité",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Englobe un espace de 21x21 mètres dans la noirceur la plus totale. La perception de dans l’espace est réduite de deux et ne peuvent plus utiliser les habiletés « Observer » ou « Lancer/Tir ». Les tests d’habiletés « Combat à mains nues » et « Combat de mêlée » se font avec un moins deux en physique. Il faut utiliser l'habileté « Écouter » pour trouver un nouvel adversaire (sans le -2 de perception).",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "width": 21,
            "height": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "-2 perception. Habilités « Observer » et « Lancer/Tir » impossible. -2 habiletés « Combat à mains nues » et « Combat de mêlée »."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "parlerAuxAnimaux",
        "name": "Parler aux animaux",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet au bouffon de converser avec des animaux. Ne fonctionnant pas sur les anthropomorphes, il faut utiliser le sort babelfish.  Cela permet au bouffon de converser, d’interroger ou d’avoir une discussion amicale avec l’animal affecté. Cet effet se produit quelle que soit l’émotion de l’animal et permet à l’animal de répondre. Les réponses sont d’une complexité limitée en fonction de l’intelligence de l’animal et de sa capacité à donner du sens à la communication. L’animal peut même faire une petite faveur au magicien.\n\n\n\n",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 2 * context.arcaneLevel",
            "unit": "tours",
            "text": "2 tours par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "pyrotechnie",
        "name": "Pyrotechnie",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Lancer ce sort transforme un feu en une rafale de feux d’artifice multicolores et pétaradants. Les projectiles toucheront toute créature dans une zone autour de la source de feu pendant 1d6 tours. Les créatures n’ont pas besoin d’avoir une ligne de vue vers le feu pour être affectées car les projectiles contourneront ce derrière quoi ils pourraient se cacher. Le sort consomme une source de feu, qui s’éteint immédiatement. Les feux magiques ne sont pas affectés.\n\n\n\n",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 9,
            "height": 9,
            "text": "9x9 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible"
        },
        "damage": {
            "rollFormula": "return '2d6+' + (4 * context.arcaneLevel);",
            "element": "fire",
            "text": "2d6 + (4 par niveau d’arcane)"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "singeAile",
        "name": "Singe ailé",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort crée un petit singe avec des ailes, habillé d’une petite veste et un petit chapeau rouges, qui peut transporter le bouffon pour traverser une étendue. Comme l’animal est petit (mais fort), il agrippe le bouffon, par les épaules ou un bras, par exemple, et décolle avec ce dernier.\n\nLe singe peut aussi servir à récupérer un objet à une distance maximum de 15 mètres du bouffon.",
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
        "id": "sonsFantomatiques",
        "name": "Sons fantomatiques",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Des grincements et des gémissements étranges, des hurlements de loups, des rires chaleureux, une conversation silencieuse, le grondement du tonnerre et le choc des épées, le doux pas des pieds nus; tous ces sons peuvent être créés avec ce sort. Ces sons peuvent sembler monter, reculer, s’approcher ou rester constants selon le désir du lanceur de sorts. Pratiquement, n'importe quel type de son peut être produit, émanant de n’importe où dans la portée, bien que le volume ne puisse pas dépasser autant de bruit que quatre humains normaux pourraient produire.",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "21x21 mètres[b]"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "trucDeLaCorde",
        "name": "Truc de la corde",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort attache une section de corde d’au moins 1,50 mètre de long à un espace extradimensionnel suffisamment grand pour contenir jusqu’à huit personnes de taille moyenne ou plus petite. L’extrémité de la corde s’élève dans les airs jusqu’à ce que la corde entière pende perpendiculairement au sol, comme si elle était fixée à l’extrémité supérieure. Les créatures peuvent grimper à la corde dans l’espace et tirer la corde derrière elles, la faisant disparaître. Si la corde est tirée dans l’espace, elle compte comme l’une des huit créatures. L’espace extra dimensionnel est invisible de l’extérieur et ceux à l’intérieur ne peuvent pas voir à l’extérieur. Ceux qui se trouvent à l’intérieur ne peuvent pas être ciblés par des sorts ou affectés par des effets de zone. En contrepartie, ils ne peuvent pas attaquer ou faire de sorts en dehors de l’espace.\n\nLa corde est soumise à sa capacité normale à supporter le poids et à résister aux dégâts. Si la corde n’est pas tirée, une créature en dehors de l’espace extra dimensionnel peut tirer ou libérer la corde, mettant fin instantanément au sort. Tout ce qui se trouve à l’intérieur de l’espace extradimensionnel tombe à la fin du sort, subissant des dégâts de toute chute. La corde peut être utilisée pour l’escalade normale à condition que le grimpeur ne grimpe pas complètement dans l’espace extradimensionnel.",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "voirLaura",
        "name": "Voir l’aura",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet de voir si une personne est bonne ou méchante. ",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
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
            "text": "Distance 10 mètres"
        },
        "dependsOnArcaneLevel": false
    }
]

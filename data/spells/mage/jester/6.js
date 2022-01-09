export default [
    {
        "id": "barriereDeLame",
        "name": "Barrière de lame",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Pour lancer ce sort, le bouffon se met à jongler avec trois dagues mais si rapidement qu’elles semblent se dédoubler. Le sort crée un mur de lames tourbillonnantes. Le mur est immobile et mesure dix (10) mètres de haut, fait un (1) mètre par niveau d’arcane du bouffon de largeur et deux (2) mètres de profondeur. \n\nToute créature qui passe dans la barrière de lame subit 5d6 points de dégâts. Les créatures à l’intérieur de la barrière de lame, lorsqu’elle est invoquée, subissent également les dégâts. Une fois la barrière en place, tout ce qui entre ou passe à travers les lames est automatiquement endommagé.\n\nLe bouffon peut maintenir le mur indéfiniment en se concentrant pour le faire, ou peut renoncer à une concentration continue (faire un test de concentration par tour, et le bouffon ne peut que faire ce test durant le tour), auquel cas le mur durera un (1) tour par niveau d’arcane du bouffon.[a]",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
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
        }
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
        }
    },
    {
        "id": "obscurite",
        "name": "Obscurité",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Englobe un espace de 10 de rayon dans la noirceur la plus totale. La perception de dans l’espace est réduite de deux et ne peuvent plus utiliser les habiletés « Observer » ou « Lancer/Tir ». Les tests d’habiletés « Combat à mains nues » et « Combat de mêlée » se font avec un moins deux en physique. Il faut utiliser l'habileté « Écouter » pour trouver un nouvel adversaire (sans le -2 de perception).",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "bonus": {
            "text": "-2 perception. Habilités « Observer » et « Lancer/Tir » impossible. -2 habiletés « Combat à mains nues » et « Combat de mêlée »."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        }
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
            "formula": "return (context.criticalSuccess ? 2 : 1) * 2 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "tours",
            "text": "2 tours par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        }
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
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        }
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
        }
    }
]
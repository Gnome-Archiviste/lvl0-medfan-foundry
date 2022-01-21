export default [
    {
        "id": "abri",
        "name": "Abri",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Créer un abri d’une seule pièce qui s’adapte au lieu qu’elle est créé. Elle permet de loger jusqu’à 10 personnes. Contient 1 repas par personne qui redonne 10 points de vie. Le sort Alarme automatique enclenché sur l’abri. ",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Jusqu’à tout le monde sorte."
        },
        "area": {
            "text": "10 par 50 mètres"
        },
        "bonus": {
            "text": "10 points de vie, alarme"
        },
        "criticalSuccess": {
            "text": "Repas redonnent 20 points de vie"
        }
    },
    {
        "id": "animus",
        "name": "Animus",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Anime des objets qui peuvent recevoir des commandements plus compliqués. Exemple : va chercher de l’eau, lave les vêtements, etc.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Jusqu’à la fin du commandement (maximum 10 tours en combat)"
        },
        "area": {
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "criticalSuccess": {
            "text": "Maximum 20 tours en combat"
        }
    },
    {
        "id": "espritFaible",
        "name": "Esprit faible",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Pendant 15 tours, la victime du sort ne peut plus faire de test où l’intelligence est requise.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Ne peux plus utilisé d’intelligence"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        }
    },
    {
        "id": "imageMiroir",
        "name": "Image miroir",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Des doubles illusoires du magicien apparaissent et imitent les actions de celui-ci, ce qui rend difficile pour les ennemis de savoir quelle cible attaquer. Le sort crée 1d6 images. Les doubles restent près du lanceur et disparaissent lorsqu’elles sont frappées. Les images restent dans un groupe ou forment une ligne, chacune à un (1) mètre d’un autre double ou du magicien. Les observateurs ne peuvent pas utiliser la vision ou l’ouïe pour différencier le magicien de ses doubles. Les ennemis qui tentent d’attaquer le magicien ou de lancer des sorts sur celui-ci doivent choisir parmi des cibles indiscernables. Généralement, lancez au hasard pour voir si la cible sélectionnée est réelle ou imaginaire. Tout jet d’attaque réussi contre un double le détruit. Un attaquant doit pouvoir voir les doubles pour être dupé.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Magicien"
        },
        "bonus": {
            "text": "1d6 doubles illusoires"
        },
        "criticalSuccess": {
            "text": "6 doubles"
        }
    },
    {
        "id": "levitation",
        "name": "Lévitation",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet au magicien de voler de dans les airs. Il peut aussi se diriger. Il peut se déplacer de seulement huit (8) mètres par tour car ce vol n’est pas aussi naturel que la marche.\n\n\n\n\n\nIl ne permet pas au magicien de se battre, mais il permet de lancer des sorts, s’il réussit un test de concentration (qui ne compte pas comme l’action du joueur pour ce tour). Le magicien ne peut pas supporter plus de poids qu’une charge maximale normale.\n\n\n\n",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 8 * context.arcaneLevel",
            "unit": "tours",
            "text": "8 tours par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "nimbus",
        "name": "Nimbus",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Bateau de nuage qui permet de voyager comme sur un tapis volant. Le sort se fait qu'à l’extérieur et prend 10 minutes à invoquer. Le magicien doit utiliser dix « mousse de nombril », ainsi qu’une mousse de nombril supplémentaire par passager. Après l’utilisation, les « mousse de nombril » disparaissent.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "text": "1 heure par niveau d’arcane ou si le magicien débarque du nimbus"
        },
        "area": {
            "text": "Magicien + (1 passager/arcane)"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "ombrelleDinvisibilite",
        "name": "Ombrelle d’invisibilité",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Toutes les créatures (y compris l’équipement transporté) à moins de trois (3) mètres du magicien disparaissent de toutes les formes de vision naturelle. Les objets lâchés ou déposés par une créature invisible deviennent visibles ; les objets ramassés disparaissent s’ils sont rentrés dans les vêtements ou les pochettes portés par la créature. La lumière ne devient jamais invisible, bien qu’une source de lumière puisse le devenir (ainsi, l’effet est celui d’une lumière sans source visible). Toute partie d’un objet que le sujet porte, mais qui s’étend à plus trois (3) mètres de lui devient visible, comme une corde qui traîne.\n\nLe sort prend fin si le sujet attaque une créature. Dans ce cas, est considéré comme une attaque toute action ou sort infligeant des dégâts ou effets négatifs à une cible. Notez que les sorts affectant spécifiquement les alliés, mais pas les ennemis ne sont pas des attaques à cet effet, même lorsqu’ils incluent des ennemis dans leur zone. Les personnes affectées par ce sort ne peuvent ni se voir ni se voir. Toute créature affectée sortant de la zone devient visible, mais les créatures se déplaçant dans la zone après le lancement du sort ne deviennent pas invisibles.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 3",
            "value": 3,
            "unit": "m",
            "text": "3 mètres"
        },
        "bonus": {
            "text": "Invisibilité"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double le rayon du sort (pré-calculé)'; } return 'Double le rayon du sort';",
            "text": "Double le rayon du sort"
        }
    },
    {
        "id": "passeMuraille",
        "name": "Passe-muraille",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible peut traverser les parois solides pendant 15 tours. Le magicien doit toucher la cible.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 15",
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "telekinesie",
        "name": "Télékinésie",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "En se concentrant, le lanceur peut déplacer un objet ou une créature pesant au maximum 150 kilogrammes jusqu’à 5 mètres par tour par la force de la pensée. Une créature peut annuler l’effet contre elle-même ou un objet qu’elle possède avec un test de résilience réussie.\n\nLe sort dure jusqu’à 1 tour par niveau d’arcane du magicien, mais il se termine si le magicien cesse de se concentrer (faire un test de concentration par tour, s’il fait autre chose que déplacer l’objet ou la personne). Le poids peut être déplacé dans n’importe quelle direction, mais pas au-delà de la portée du sort. Le sort se termine si un objet est forcé au-delà de la portée.\n\n\n\n",
        "distance": {
            "value": 45,
            "unit": "mètre",
            "text": "45 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort et la vitesse"
        }
    },
    {
        "id": "terreur",
        "name": "Terreur",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La panique et la terreur traversent le cœur des créatures affectées par ce sort, les obligeant à fuir le lanceur le plus rapidement possible. Les créatures se recroquevillent dans une horreur abjecte si elles sont acculées, et si elles sont forcées d’affronter le magicien, toute créature affectée subit une pénalité de -2 à tous les jets. Ne fonctionne pas sur les morts-vivants.\n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "rollFormula": "return '5d6'",
            "unit": "tours",
            "text": "5d6 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Fuite de la victime"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        }
    }
]
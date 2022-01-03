export default [
    {
        "id": "blizzard",
        "name": "Blizzard",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Diminue la perception de moitié à cause des flocons fouettant le visage et fait du dommage à tous les tours et à tous ceux qui sont dans la zone de la tempête, alliés comme ennemis. Le déplacement est divisé par deux à cause des vents puissants.",
        "distance": {
            "value": 20,
            "unit": "m",
            "text": "20 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "bonus": {
            "text": "Déplacement et perception divisé par deux."
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut) Faire a chaque tour qu’une personne est dans le blizzard"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "4d6 par tour"
        }
    },
    {
        "id": "murDePierre",
        "name": "Mur de pierre",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort crée un mur de roche qui fusionne avec les surfaces rocheuses adjacentes. Le mur mesure 10 cm d’épaisseur par niveau d’arcane du magicien ainsi que jusqu’à 1 mètre de large par niveau d’arcane du magicien et jusqu’à 1 mètre de haut par niveau d’arcane du magicien. Le mur ne peut pas être évoqué de manière à occuper le même espace qu’une créature ou un autre objet.\nChaque zone d’un pied carré du mur a 15 points de vie par 10 cm d’épaisseur. Les créatures peuvent frapper le mur automatiquement, mais le mur est si dur que les 8 premiers points de dégâts de chaque coup sont ignorés. Une section de mur dont les points de vie tombent à 0 est fissurée. ",
        "distance": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Combat"
        },
        "area": {
            "text": "1 mètre de large/arcane"
        },
        "criticalSuccess": {
            "text": "Double la largeur"
        }
    },
    {
        "id": "œilDeDasha",
        "name": "Œil de Dasha",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le magicien crée un œil magique invisible qui envoie des informations visuelles au magicien. L’œil de Dasha se déplace à 9 mètres par tour et voit exactement comme le magicien verrait si le magicien était sur place. Si l’œil examine les murs ou les plafonds, il se déplace à 3 mètres par tour.\nDes barrières solides empêchent le passage d’un œil de Dasha, bien qu’il puisse traverser un espace pas plus petit qu’un petit trou de souris (trois (3) cm de diamètre). Le magicien doit se concentrer pour utiliser l’œil. Si le magicien ne se concentre pas, l’œil devient inerte jusqu’à ce que le magicien se concentre à nouveau.\nLes pouvoirs de l’œil ne peuvent pas être améliorés par d’autres sorts ou objets (bien que le magicien puisse utiliser la magie pour améliorer sa propre vue). \nL’Œil de Dash permet de faire des sorts en utilisant l’œil comme point d’origine. Le tour précédent sa disparition, l’œil commence à perdre la vue. \nLe magicien est soumis à toute attaque du regard qu’il rencontre. Une annulation de la magie sur le magicien ou l’œil met fin au sort. En ce qui concerne la cécité, le sort aveuglement, l’obscurité magique et d’autres phénomènes qui affectent la vision, l’œil de Dasha est considéré comme un organe sensoriel indépendant du magicien. Des sorts tels que « voir l’invisible » peuvent également détecter l’œil.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "text": "2d6 + Intelligence"
        },
        "area": {
            "text": "Durée"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "orbeEnflammeDeKegan",
        "name": "Orbe enflammé de Kegan",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Sphère de feu que le magicien peut diriger avec un doigt. La boule de feu peut tourner des murs par exemple.",
        "distance": {
            "text": "45 mètres."
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return context.actorData.computedData.magic.arcaneLevel + 'd6';",
            "element": "fire",
            "text": "1d6 par niveau d’arcane"
        }
    },
    {
        "id": "permanence",
        "name": "Permanence",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet de rendre un autre sort permanent. Grâce au sort de permanence, le sort sur lequel on l’applique n’a plus de limite de temps. \nNe peut se faire que sur un objet préparé pour faire le sort. Voir la section Création d’objet magique.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Prend 1 minute à lancer"
        },
        "area": {
            "text": "Une cible"
        }
    },
    {
        "id": "premonition",
        "name": "Prémonition",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Lancer au coucher, le sort permet au magicien de voir de l’information sur le futur probable durant ses rêves. Le magicien se souvient de ses rêves prémonitoires. \nLe maître de jeu donne des indices sur un événement qui devrait (le plus possible) se passer dans la partie. Le sort permet au maître de jeu de donner des informations importantes que les joueurs auraient ratées.\nComme la prémonition est un rêve, celui-ci peut-être représentatif et non une image précise sur un événement.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "text": "Durant le sommeil"
        },
        "area": {
            "text": "Magicien"
        },
        "criticalSuccess": {
            "text": "Le prémonition est clair"
        }
    },
    {
        "id": "souffleDuDragon",
        "name": "Souffle du dragon",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le magicien crache un jet de feu devant lui tel un dragon. ",
        "distance": {
            "text": "20 mètre de long a partir du magicien"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "1 mètre en avant du magicien"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '2d6+' + (4 * context.actorData.computedData.magic.arcaneLevel);",
            "element": "fire",
            "text": "2d6 + (4 par niveau d’arcane)"
        }
    },
    {
        "id": "telepathie",
        "name": "Télépathie",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet au magicien de communiquer par la pensée avec un autre personnage qui est à une distance de dix (10) mètres par niveau d’arcane. Cette personne doit être connue ou être visible du magicien (l’Œil de Dasha fonctionne). La communication est dans les deux directions.",
        "distance": {
            "text": "10 mètres par niveau d’arcane"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "tours",
            "text": "5 tours par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort et distance"
        }
    },
    {
        "id": "transformation",
        "name": "Transformation",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible prend la forme de n’importe quelle créature connue du magicien. S’il s’agit d’une personne en particulier, le magicien doit l’avoir rencontré. Le changement prend un tour. La forme est bien réelle et confère à la cible la plupart des capacités de la créature formée. La cible conserve sa caractéristique d’intelligence, mais prend les autres caractéristiques de la nouvelle forme. Elle garde aussi ses propres points de vie et points de mana. Le personnage conserve ses spécialités et peut les utiliser si c’est possible avec la nouvelle forme. Le personnage ne gagne pas les capacités magiques ou surnaturelles de la nouvelle forme, mais acquiert les spécialités de la nouvelle forme. La taille de la forme prise peut aller jusqu’à deux fois plus petites ou grandes que la cible. Même les états amorphes ou gazeux peuvent être assumés en lançant ce sort. S’il est tué, le personnage reprend sa forme originale, mais reste mort.",
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
        }
    },
    {
        "id": "tremblementDeTerre",
        "name": "Tremblement de terre",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Les personnages, animaux et monstres, dans un rayon de 10 mètres, doivent faire un jet de gymnastique sinon il tombe et doivent refaire le même test pendant 10 tours pour se relever ou ne pas retomber. Ils ne peuvent pas se défendre tant qu’ils sont à terre. Tous reçoivent le dommage lors du premier tour.",
        "distance": {
            "value": 40,
            "unit": "m",
            "text": "40 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "bonus": {
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "text": "5d6"
        }
    }
]
export default [
    {
        "id": "demonDePoussiere",
        "name": "Démon de poussière",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste crée un vortex tourbillonnant de sable et de gravats martelant un rayon de 3 mètres, infligeant 1d6 dégâts par niveau d’arcane. Le sort se nomme ainsi à cause des vents rugissants qui l'accompagnent, donnant l’impression qu’un démon fou se marre au centre.  À cause des débris et des éboulis créés, la zone devient glissante pendant toute la durée du sort. Toute personne se déplaçant de plus d’un mètre doit effectuer un test d’agilité ou tomber à plat ventre.  L’élémentaliste peut  déplacer le Démon de poussière à une vitesse de 5 mètres par tour.",
        "distance": {
            "value": 20,
            "unit": "m",
            "text": "20 mètres"
        },
        "duration": {
            "rollFormula": "return '2d6'",
            "unit": "tours",
            "text": "2d6 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Ralentit les cibles"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut). Il faut faire le jet pour chaque tour qu’une"
        },
        "damage": {
            "text": "1d6 dégâts par niveau d’arcane"
        }
    },
    {
        "id": "personneEstDansLaZoneDuDemonDePoussiere",
        "name": "        personne est dans la zone du Démon de poussière.",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Succès remarquable : La cible ne peut pas faire de test de résilience\nMur de pierre\nCe sort crée un mur de roche qui fusionne avec les surfaces rocheuses adjacentes. Le mur mesure 10 cm d’épaisseur par niveau d’arcane de l'élémentaliste ainsi que jusqu’à 1 mètre de large par niveau d’arcane de l'élémentaliste et jusqu’à 1 mètre de haut par niveau d’arcane de l'élémentaliste. Le mur ne peut pas être évoqué de manière à occuper le même espace qu’une créature ou un autre objet.\nChaque zone d’un pied carré du mur a 15 points de vie par 10 cm d’épaisseur. Les créatures peuvent frapper le mur automatiquement, mais le mur est si dur que les 8 premiers points de dégâts de chaque coup sont ignorés. Une section de mur dont les points de vie tombent à 0 est fissurée. ",
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
        "id": "peauDeDiamant",
        "name": "Peau de diamant",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet d’absorber 50 points de dégâts. Le sort peut être fait sur le magicien ou un allié. L'élémentaliste doit toucher la cible. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Tant que les 50 points ne sont pas utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe 50 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe 100 points de dégâts"
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
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "text": "5d6"
        }
    }
]
export default [
    {
        "id": "icedBerries",
        "name": "Baies glacées",
        "icon": "icons/magic/acid/dissolve-drip-droplet-smoke.webp",
        "description": "Avec ce sort, l’élémentaliste utilise des baies (jusqu’à 6 par sort) qui deviennent glacées. Il peut utiliser lui-même ces baies ou les offrir à ses alliés. Ces baies sont utilisées comme projectiles avec une fronde. Lorsqu’ utilisées, si le succès du tir est exceptionnel, la cible est gelée pour 2 tours.",
        "distance": {
            "text": "1 mètre en avant de l’élémentaliste"
        },
        "duration": {
            "text": "instantanée"
        },
        "area": {
            "text": "1-6 cibles"
        },
        "bonus": {
            "text": "voir le tableau ci-dessous"
        },
        "criticalSuccess": {
            "text": "Double la quantité de baies (les baies manquantes apparaissent)."
        }
    },
    {
        "id": "icedSnowBall",
        "name": "dégâts",
        "icon": "icons/magic/acid/dissolve-drip-droplet-smoke.webp",
        "description": "\t1d6 de glace\n\tAvec tir exceptionnel\n\t1d6 + cible gelée pendant 2 tours\nBoule de neige glacée\nL'élémentaliste fait apparaître une boule de neige très dure dans sa main qu'il peut lancer. Peut figer la cible pour un tour.",
        "distance": {
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Immobilisation de la victime"
        },
        "resilience": {
            "text": "Annule l'immobilisation de la victime"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '1d6';",
            "element": "water",
            "text": "1d6"
        }
    },
    {
        "id": "blotter",
        "name": "Buvard[c]",
        "icon": "icons/equipment/shield/kite-wooden-oak-glow.webp",
        "description": "En touchant une cible, l’élémentaliste imprègne d’énergies magiques protectrices la cible, offrant une protection partielle contre le froid. Le sort réduit de moitié le dommage produit par le froid, que la source des dégâts soit naturelle ou magique, pour une seule fois. \nDe plus, une fois que le sort capture une partie de l’énergie élémentaire, il la stock pour votre prochaine attaque de mêlée, ajoutant 1d6 dégâts de glace supplémentaires.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "jusqu’à utilisation ou une (1) scène"
        },
        "area": {
            "text": "une cible"
        },
        "bonus": {
            "text": "Ajoute 1d6 dégâts de glace"
        },
        "criticalSuccess": {
            "text": "Ajoute 2d6 dégâts de glace"
        }
    },
    {
        "id": "cryogenics",
        "name": "Cryogénie",
        "icon": "icons/magic/acid/dissolve-drip-droplet-smoke.webp",
        "description": "Ce sort congèle le corps d’un coéquipier décédé et permet de le conserver, afin qu’il ne se décompose pas, pendant un mois[d]. Ce sort prolonge le temps pour ressusciter la créature touchée d’entre les morts. Le sort fonctionne sur les parties du corps coupées et autres. \nLe sort se termine lorsque le cadavre est ressuscité des morts ou arrive au bout de sa durée.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "1 mois (ou 3 jours par niveau d’arcane)"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Conserve un corps"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "minorWaterElemental",
        "name": "Élémentaire mineur d'eau",
        "icon": "icons/magic/lightning/projectile-orb-blue.webp",
        "description": "L’élémentaliste invoque un petit élémentaire d’eau à partir d'une source d'eau (au moins 1 litre.). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie. \nPHY 4, DEX 5, INT 3, CHA 3, PER 5\nHP 20, H2H : 5, Attaque : 3 de dégâts",
        "distance": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "criticalSuccess": {
            "text": "Double les points de vie"
        },
        "damage": {
            "text": "Voir statistique de l’élémental"
        }
    }
]
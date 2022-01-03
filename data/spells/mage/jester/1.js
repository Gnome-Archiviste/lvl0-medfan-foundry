export default [
    {
        "id": "rainbow",
        "name": "Arc-en-ciel",
        "icon": "icons/magic/control/buff-luck-fortune-rainbow.webp",
        "description": "La cible devient multicolore pendant un certain temps.",
        "distance": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "La cible ne peut pas utiliser l’habileté « Se cacher »."
        },
        "resilience": {
            "text": "Annule le sort"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience"
        }
    },
    {
        "id": "talithaBuble",
        "name": "Bulle de Talitha",
        "icon": "icons/magic/water/bubbles-air-water-pink.webp",
        "description": "Le sort crée une bulle entourant la cible, la soulevant dans les airs. La bulle ne peut pas être dirigée (sauf par du vent assez fort). La bulle de Talitha est très fragile (la bulle possède 6 points de vie), on peut la faire disparaître en la piquant avec un objet pointu (armes, griffes, roche, etc.). Sa durée est hasardeuse et elle peut disparaître à tout moment.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "3 tours + 2d6 (tirer par le maître de jeu)."
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La bulle est deux fois plus résistante (12 points de vie)"
        }
    },
    {
        "id": "guardRattle",
        "name": "Crécelle de garde",
        "icon": "icons/skills/trades/music-notes-sound-blue.webp",
        "description": "Protège une zone ou une pièce d’un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancer du sort) entre dans la zone, on entend le son d’une crécelle. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "2 heures par niveau"
        },
        "area": {
            "text": "10 mètres (maximum une pièce)"
        },
        "criticalSuccess": {
            "text": "Double la durée"
        }
    },
    {
        "id": "light",
        "name": "Lumière",
        "icon": "icons/magic/light/orb-lightbulb-gray.webp",
        "description": "Fait apparaître une boule de lumière pour éclairer une pièce ou un corridor. La lumière est fixe.\nÀ partir d’arcane 2, le bouffon peut choisir la couleur de la lumière.\nÀ partir d’arcane 5, le bouffon peut l'avoir qui le suit pour le coût de 2 points de magie additionnels.",
        "distance": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "10 mètres (maximum une pièce)"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        }
    },
    {
        "id": "stickyHand",
        "name": "Main collante",
        "icon": "icons/magic/unholy/hand-marked-pink.webp",
        "description": "Ce sort fait apparaître une substance collante et sucrée très similaire à de la confiture. Le sort donne le pouvoir de mouvement le long des murs et des plafonds à la cible. Cette dernière se déplace à un demi-mouvement de base sur des surfaces verticales et inversées. Les mains et les pieds doivent être découverts afin d’entrer en contact direct avec la surface à grimper.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5",
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Déplacement sur toute surface."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        }
    },
    {
        "id": "bananaPeel",
        "name": "Peau de banane ",
        "icon": "icons/consumables/fruit/banana-ripe-yellow.webp",
        "description": "Fais tomber la victime. La victime perd un tour et doit faire un lancer de l’habileté « Gymnastique » pour se relever. Après le tour perdu, la victime peut décider de rester par terre, mais pourrait faire certaines actions comme lancer un sort ou un objet.",
        "distance": {
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "duration": {
            "text": "1 tour + réussite du test d'habileté"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        }
    },
    {
        "id": "caramelizedTrap",
        "name": "Piège caramélisé",
        "icon": "icons/consumables/food/candy-taffy-yellow.webp",
        "description": "Le sort immobilise les victimes pendant trois (3) tours sur une distance de 3 mètres carrés car le sol se transforme en caramel mou dans lequel les victimes s’enfoncent. Les victimes ne peuvent plus se déplacer mais peuvent se défendre ou attaquer avec des armes de jet seulement.",
        "distance": {
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "duration": {
            "value": 3,
            "unit": "tours",
            "text": "3 tours"
        },
        "area": {
            "value": 3,
            "unit": "m",
            "text": "3 mètres"
        },
        "bonus": {
            "text": "Victimes immobilisées"
        },
        "resilience": {
            "text": "On fait un test par tour pour ne pas avoir l’effet du piège pour ce tour."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        }
    },
    {
        "id": "sesame",
        "name": "Sésame",
        "icon": "icons/sundries/misc/lock-open-yellow.webp",
        "description": "Déverrouille les portes qui ne sont pas verrouillées magiquement. Attention, le sort n’enlève pas les pièges.",
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
            "text": "Déverrouille les portes"
        },
        "resilience": {
            "text": "Aucune (sauf cas spéciaux)"
        },
        "criticalSuccess": {
            "text": "La serrure ne fait pas de bruit"
        }
    },
    {
        "id": "suspension",
        "name": "Suspension ",
        "icon": "icons/magic/air/wind-vortex-swirl-blue-purple.webp",
        "description": "Les créatures et les objets affectés par ce sort tombent doucement, descendant vers le bas dans les airs un peu comme s’il dansait dans les airs. Les sujets affectés par le sort ne subissent aucun dommage d’une chute de n’importe quelle hauteur. Le sort peut être lancé suffisamment rapidement pour sauver le bouffon en cas de chute inattendue d’une hauteur minimum de 6 mètres (2 étages). Un poids total allant jusqu’à 500 kilos peut être affecté. Les créatures et objets affectés par le sort tombent à une vitesse de 5 mètres par tour. Si le sort se termine alors qu’ils tombent encore, ils tombent normalement à partir de ce point et ne subissent des dégâts que pour cette distance tombée.\nLe sort ne fonctionne que sur les objets en chute libre. Cela n’affecte pas un coup d’épée ou une créature qui charge ou une créature volante.",
        "distance": {
            "text": "2m + 1m par niveau d’arcane"
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
        "id": "ventriloquism",
        "name": "Ventriloquie",
        "icon": "icons/creatures/abilities/mouth-teeth-tongue-purple.webp",
        "description": "Le bouffon peut faire en sorte que sa voix (ou tout son que le bouffon puisse normalement faire vocalement) semble émettre d’un autre endroit. Le bouffon peut parler dans n’importe quelle langue qu’il connaît. Quiconque entend la voix et effectue un test de résilience reconnaît le son comme illusoire (mais l’entend toujours).",
        "distance": {
            "text": "10m"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "un point fixe"
        },
        "resilience": {
            "text": "Reconnaît le son comme illusoire"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible"
        }
    }
]
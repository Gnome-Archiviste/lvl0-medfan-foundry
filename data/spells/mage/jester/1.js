export default [
    {
        "id": 'rainbow',
        "name": 'Arc-en-ciel',
        "icon": 'icons/magic/control/buff-luck-fortune-rainbow.webp',
        "description": `La cible devient multicolore pendant un certain temps.`,
        "bonus": {
            "text": `La cible ne peut pas utiliser l’habileté « Se cacher ».`
        },
        "distance": {
            "value": 2,
            "unit": 'm'
        },
        "duration": {
            "type": 'Une scène'
        },
        "area": {
            "text": `Une cible`
        }
    },
    {
        "id": 'talithaBuble',
        "name": 'Bulle de Talitha',
        "icon": 'icons/magic/water/bubbles-air-water-pink.webp',
        "description": `Créer une bulle entourant la cible, la soulevant dans les airs. La bulle ne peut pas être dirigée (sauf par du vent assez fort). La bulle de Talitha est très fragile (la bulle possède six (6) points de vie), on peut la faire disparaître en la piquant avec un objet pointu (armes, griffes, roche, etc.). Sa durée est hasardeuse et elle peut disparaître à tout moment.`,
        "distance": {
            "type": `touch`
        },
        "duration": {
            "rollFormula": `return "3+2d6"`,
            "unit": `tours`
        },
        "criticalSuccess": {
            "text": `La bulle est deux fois plus résistante (12 points de vie)`
        },
        "resilience": {
            "text": `Le sort ne fonctionne pas`
        },
        "area": {
            "text": `Une cible`
        }
    },
    {
        "id": 'guardRattle',
        "name": 'Crécelle de garde',
        "icon": 'icons/skills/trades/music-notes-sound-blue.webp',
        "description": `Protège une zone ou une pièce d’un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancer du sort) entre dans la zone, on entend le son d’une crécelle.`,
        "distance": {
            "type": `touch`
        },
        "duration": {
            "formula": `
                if (context.criticalSuccess)
                    return 2 * 2 * context.actorData.computedData.magic.arcaneLevel;
                return 2 * context.actorData.computedData.magic.arcaneLevel;
            `,
            "unit": `tours`
        },
        "criticalSuccess": {
            "formula": `
                if (context.criticalSuccess)
                    return 'Double la durée (pré-calculé)';
                return 'Double la durée';`
        },
        "area": {
            "value": 10,
            "unit": 'm'
        }
    },
    {
        "id": 'light',
        "name": 'Lumière',
        "icon": 'icons/magic/light/orb-lightbulb-gray.webp',
        "description": {
            "formula": `
                        let message = "Fait apparaître une boule de lumière pour éclairer une pièce ou un corridor. La lumière est fixe."
                        if (context.actorData.computedData.magic.arcaneLevel) {
                            message += "<br>La boule de lumière peut suivre le magicien pour 2 points de magie additionnels.";
                        }
                        return message;
                    `
        },
        "distance": {
            "value": 2,
            "unit": 'mètres'
        },
        "duration": {
            "formula": `return (context.criticalSuccess ? 2 : 1) * context.actorData.computedData.magic.arcaneLevel`,
            "unit": 'h'
        },
        "criticalSuccess": {
            "formula": `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
        "area": {
            "value": 10,
            "unit": 'mètres'
        }
    },
    {
        "id": 'stickyHand',
        "name": 'Main collante',
        "icon": 'icons/magic/unholy/hand-marked-pink.webp',
        "description": `Ce sort fait apparaître une substance collante et sucrée très similaire à de la confiture. Le sort donne le pouvoir de mouvement le long des murs et des plafonds à la cible. Cette dernière se déplace à un demi-mouvement de base sur des surfaces verticales et inversées. Les mains et les pieds doivent être découverts afin d’entrer en contact direct avec la surface à grimper.`,
        "bonus": {
            "text": `Déplacement sur toute surface`
        },
        "distance": {
            "type": 'touch'
        },
        "duration": {
            "formula": `return (context.criticalSuccess ? 10 : 5)`,
            "unit": 'tours'
        },
        "criticalSuccess": {
            "formula": `
                if (context.criticalSuccess)
                    return 'Double la durée (pré-calculé)';
                return 'Double la durée';`
        },
        "area": {
            "text": 'Une cible'
        }
    },
    {
        "id": 'bananaPeel',
        "name": 'Peau de banane',
        "icon": 'icons/consumables/fruit/banana-ripe-yellow.webp',
        "description": `Fais tomber la victime. La victime perd un tour et doit faire un lancer de l’habileté « Gymnastique » pour se relever. Après le tour perdu, la victime peut décider de rester par terre, mais pourrait faire certaines actions comme lancer un sort ou un objet.`,
        "distance": {
            "formula": `return 2 + context.actorData.computedData.magic.arcaneLevel`,
            "unit": 'm'
        },
        "duration": {
            "text": `1 tour + réussite du test d'habileté`
        },
        "resilience": {
            "text": 'Le sort ne fonctionne pas'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience.`
        },
        "area": {
            "text": 'Une cible'
        }
    },
    {
        "id": `caramelizedTrap`,
        "name": `Piège caramélisé`,
        "icon": 'icons/consumables/food/candy-taffy-yellow.webp',
        "description": `Le sort immobilise les victimes pendant trois (3) tours sur une distance de 3 mètres carrés car le sol se transforme en caramel mou dans lequel les victimes s’enfoncent. Les victimes ne peuvent plus se déplacer mais peuvent se défendre ou attaquer avec des armes de jet seulement.`,
        "distance": {
            "value": 10,
            "unit": 'm'
        },
        "duration": {
            "value": 3,
            "unit": 'tours'
        },
        "resilience": {
            "text": 'On fait un test par tour pour ne pas avoir l’effet du piège pour ce tour.'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience.`
        },
        "area": {
            "value": 3,
            "unit": 'm'
        }
    },
    {
        "id": 'sesame',
        "name": 'Sésame',
        "icon": 'icons/sundries/misc/lock-open-yellow.webp',
        "description": `Déverrouille les portes qui ne sont pas verrouillées magiquement. Attention, le sort n’enlève pas les pièges.`,
        "distance": {
            "type": 'touch'
        },
        "duration": {
            "text": `Instantané`
        },
        "criticalSuccess": {
            "text": `La serrure ne fait pas de bruit`
        },
        "area": {
            "text": 'Une cible'
        }
    },
    {
        "id": `suspension`,
        "name": `Suspension`,
        "icon": 'icons/magic/air/wind-vortex-swirl-blue-purple.webp',
        "description": `Les créatures et les objets affectés par ce sort tombent doucement, descendant vers le bas dans les airs un peu comme s’il dansait dans les airs. Les sujets affectés par le sort ne subissent aucun dommage d’une chute de n’importe quelle hauteur. Le sort peut être lancé suffisamment rapidement pour sauver le bouffon en cas de chute inattendue d’une hauteur minimum de 6 m. (2 étages). Un poids total allant jusqu’à 500 kilos peut être affecté. Les créatures et objets affectés par le sort tombent à une vitesse de 5 mètres par tour. Si le sort se termine alors qu’ils tombent encore, ils tombent normalement à partir de ce point et ne subissent des dégâts que pour cette distance tombée.<br>
Le sort ne fonctionne que sur les objets en chute libre. Cela n’affecte pas un coup d’épée ou une créature qui charge ou une créature volante.`,
        "distance": {
            "formula": `return 2 + context.actorData.computedData.magic.arcaneLevel`,
            "unit": 'm'
        },
        "duration": {
            "formula": `return (context.criticalSuccess ? 20 : 10)`,
            "unit": 'tours'
        },
        "criticalSuccess": {
            "formula": `
                if (context.criticalSuccess)
                    return 'Double la durée (pré-calculé)';
                return 'Double la durée';`
        },
        "area": {
            "text": `Une cible`
        }
    },
    {
        "id": `ventriloquism`,
        "name": `Ventriloquie`,
        "icon": 'icons/creatures/abilities/mouth-teeth-tongue-purple.webp',
        "description": `Le bouffon peut faire en sorte que sa voix (ou tout son que le bouffon puisse normalement faire vocalement) semble émettre d’un autre endroit. Le bouffon peut parler dans n’importe quelle langue qu’il connaît. Quiconque entend la voix et effectue un test de résilience reconnaît le son comme illusoire (mais l’entend toujours).`,
        "distance": {
            "value": 10,
            "unit": 'm'
        },
        "duration": {
            "text": `Instantané`
        },
        "area": {
            "text": `Un point fixe`
        },
        "resilience": {
            "text": `Reconnaît le son comme illusoire`
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience`
        },
    },
]

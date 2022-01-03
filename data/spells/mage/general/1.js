export default [
    {
        "id": 'alarm',
        "name": 'Alarme',
        "icon": 'icons/magic/sonic/bell-alarm-red-purple.webp',
        "description": `Protège une zone ou une pièce d’un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancer du sort) entre dans la zone, on entend le son d’une cloche. A partir d’arcane 5, l’alarme peut être mental. Elle est entendue dans la tête du magicien et les personnes présentes durant le lancer du sort. `,
        "distance": {
            "type": 'touch'
        },
        "duration": {
            "formula": `
                        if (context.criticalSuccess)
                            return 2 * 2 * context.actorData.computedData.magic.arcaneLevel;
                        return 2 * context.actorData.computedData.magic.arcaneLevel;
                    `,
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
            "unit": 'm'
        }
    },
    {
        "id": 'fog',
        "name": 'Brume',
        "icon": 'icons/magic/air/weather-clouds.webp',
        "description": `Une épaisse brume entoure le magicien, permettant de le cacher ainsi que ses coéquipiers, sur une zone de {{spell.area}}. Donne 2 points de pénalité sur leur perception (il faut faire une perception pour trouver un nouvel adversaire).`,
        "distance": {
            "type": 'self'
        },
        "duration": {
            "value": '3',
            "unit": 'tours'
        },
        "criticalSuccess": {
            "formula": 'return "Rayon de " + (10 + context.actorData.computedData.magic.arcaneLevel) + " mètres";'
        },
        "area": {
            "formula": `
                    if (context.criticalSuccess) {
                        return 10 + context.actorData.computedData.magic.arcaneLevel;
                    }
                    switch (context.actorData.computedData.magic.arcaneLevel) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            return 5;
                        case 5:
                            return 6;
                        case 6:
                            return 7;
                        case 7:
                            return 8;
                        case 8:
                            return 9;
                        case 9:
                            return 10;
                        case 10:
                        case 20:
                            return 11;
                        default:
                            return 11;
                    }`,
            "unit": 'mètres'
        },
        "actions": {
            "addEffect": {
                "name": `Ajouter l'effet`,
                "type": 'addEffect',
                "data": {
                    "duration": {
                        "value": 3,
                        "unit": 'tours'
                    },
                    "effectName": 'Brume',
                    "modifiers": [
                        {
                            "stat": 'per',
                            "value": -2
                        }
                    ]
                }
            }
        }
    },
    {
        "id": 'fireSlap',
        "name": 'Gifle enflammée',
        "icon": 'icons/magic/fire/beam-strike-whip-red.webp',
        "description": `Avec ce sort, le magicien peut frapper à distance. Une fine feuille de flammes jaillit de la main du magicien, frappant une créature jusqu’à 5 mètres du magicien et lui fait 1d6 dommage de feu.`,
        "distance": {
            "value": 5,
            "unit": 'mètres'
        },
        "damage": {
            "rollFormula": 'return "1d6";',
            "element": 'fire'
        },
        "duration": {
            "text": 'Instantané'
        },
        "criticalSuccess": {
            "text": 'La cible ne peut pas faire de test de résilience.'
        },
        "resilience": {
            "text": 'Divise le dommage par deux (arrondi au supérieur)'
        },
        "area": {
            "text": 'Une cible'
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
        "id": 'iceHand',
        "name": 'Main de glace',
        "icon": 'icons/magic/water/snowflake-ice-snow-white.webp',
        "description": `Enveloppe la main du magicien d’une aura glacée. Fait du dégât et immobilise la victime pendant deux (2) tours. Le magicien doit toucher sa victime.`,
        "distance": {
            "type": 'touch'
        },
        "damage": {
            "rollFormula": 'return "1d6-2";',
            "element": 'ice'
        },
        "duration": {
            "value": 2,
            "unit": 'tours'
        },
        "criticalSuccess": {
            "text": 'La cible ne peut pas faire de test de résilience.'
        },
        "resilience": {
            "text": 'Victime non-immobilisée'
        },
        "area": {
            "text": 'Une cible'
        }
    },
    {
        "id": 'spiderHand',
        "name": 'Main de l’araignée',
        "icon": 'icons/creatures/webs/web-spider-glowing-purple.webp',
        "description": `Protège une zone ou une pièce d’un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancer du sort) entre dans la zone, on entend le son d’une cloche. A partir d’arcane 5, l’alarme peut être mental. Elle est entendue dans la tête du magicien et les personnes présentes durant le lancer du sort. `,
        "distance": {
            "type": 'touch'
        },
        "bonus": {
            "text": 'Déplacement sur toute surface.'
        },
        "duration": {
            "formula": `
                        if (context.criticalSuccess)
                            return 10;
                        return 5;
                    `,
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
        "id": 'magicParachute',
        "name": 'Parachute magique',
        "icon": 'icons/magic/air/wind-weather-snow-gusts.webp',
        "description": `Les créatures et les objets affectés par ce sort tombent doucement, dérivant vers le bas dans les airs un peu comme s’il avait un parachute. Les sujets affectés par le sort ne subissent aucun dommage d’une chute de n’importe quelle hauteur. Le sort peut être lancé suffisamment rapidement pour sauver le magicien en cas de chute inattendue d’une hauteur minimum de 6 m. (2 étages). Un poids total allant jusqu’à 500 kilos peut être affecté. Les créatures et objets affectés par le sort tombent à une vitesse de 5 mètres par tour. Si le sort se termine alors qu’ils tombent encore, ils tombent normalement à partir de ce point et ne subissent des dégâts que pour cette distance tombée.<br>
Le sort ne fonctionne que sur les objets en chute libre. Cela n’affecte pas un coup d’épée ou une créature qui charge ou une créature volante.`,
        "distance": {
            "formula": `return 2 + context.actorData.computedData.magic.arcaneLevel`,
            "unit": 'm'
        },
        "duration": {
            "formula": `
                        if (context.criticalSuccess)
                            return 20;
                        return 10;
                    `,
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
        "id": 'personalHeal',
        "name": 'Soins personnels',
        "icon": 'icons/magic/life/cross-area-circle-green-white.webp',
        "description": 'Guérit le magicien de 1d6 points de vie. Ne s’applique pas aux coéquipiers. Ne peut pas dépasser le maximum de points de vie.',
        "distance": {
            "type": 'self'
        },
        "heal": {
            "rollFormula": `
                        if (context.criticalSuccess)
                            return "6";
                        return "1d6";
                    `
        },
        "duration": {
            "text": 'Instantané'
        },
        "criticalSuccess": {
            "text": 'Guérit 6 points de vie'
        }
    }
]

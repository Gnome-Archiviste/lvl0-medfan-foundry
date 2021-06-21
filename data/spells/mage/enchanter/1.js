export default [
    {
        id: 'alarm',
        name: 'Alarme',
        icon: 'icons/magic/sonic/bell-alarm-red-purple.webp',
        description: `Protège une zone ou une pièce d’un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancer du sort) entre dans la zone, on entend le son d’une cloche. A partir d’arcane 5, l’alarme peut être mental. Elle est entendue dans la tête du magicien et les personnes présentes durant le lancer du sort. `,
        distance: {
            type: 'touch'
        },
        duration: {
            formula: `
                        if (context.criticalSuccess)
                            return 2 * 2 * context.actorData.level.value;
                        return 2 * context.actorData.level.value;
                    `,
            unit: 'h'
        },
        criticalSuccess: {
            formula: `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
        area: {
            value: 10,
            unit: 'm'
        }
    },
    {
        // FIXME: Add action to add shield and display the shield (same for diamond / stone armor) in the character sheet
        id: 'waldenArmor',
        name: 'Armure magique de Walden',
        icon: 'icons/magic/fire/beam-strike-whip-red.webp',
        description: `Donne une armure qui absorbe dix (10) points de dégâts au magicien, dure 5 tours ou dix points de dégâts (disparaît après 5 tours même si tous les points de dégâts n’ont pas été utilisés). Ne peut pas s’additionner à d’autres sorts de protections qui absorbent les dégâts`,
        bonus: {
            text: `10 points de dégâts absorbés`
        },
        distance: {
            type: 'self'
        },
        duration: {
            formula: `return (context.criticalSuccess ? 2 : 1) * 5`,
            unit: 'tours'
        },
        criticalSuccess: {
            formula: `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'spark',
        name: 'Étincelle',
        icon: 'icons/magic/light/hand-sparks-glow-yellow.webp',
        description: 'Après avoir frotté ses pieds sur le sol à plusieurs reprises (idéalement sur un tapis), l\'élémentaliste émet une légère décharge électrostatique sur une cible.',
        distance: {
            type: 'touch'
        },
        damage: {
            rollFormula: 'return (context.criticalSuccess ? "4" : "2");',
            element: 'electric'
        },
        duration: {
            text: 'Instantanée'
        },
        criticalSuccess: {
            text: `4 de dégât`
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'spiderHand',
        name: 'Main de l’araignée',
        icon: 'icons/creatures/webs/web-spider-glowing-purple.webp',
        description: `Protège une zone ou une pièce d’un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancer du sort) entre dans la zone, on entend le son d’une cloche. A partir d’arcane 5, l’alarme peut être mental. Elle est entendue dans la tête du magicien et les personnes présentes durant le lancer du sort. `,
        distance: {
            type: 'touch'
        },
        bonus: {
            text: 'Déplacement sur toute surface.'
        },
        duration: {
            formula: `
                        if (context.criticalSuccess)
                            return 10;
                        return 5;
                    `,
            unit: 'tours'
        },
        criticalSuccess: {
            formula: `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'sesame',
        name: 'Sésame',
        icon: 'icons/sundries/misc/lock-open-yellow.webp',
        description: `Déverrouille les portes qui ne sont pas verrouillées magiquement. Attention, le sort n’enlève pas les pièges.`,
        distance: {
            type: 'touch'
        },
        duration: {
            text: `Instantané`
        },
        criticalSuccess: {
            text: `La serrure ne fait pas de bruit`
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'personalHeal',
        name: 'Soins personnels',
        icon: 'icons/magic/life/cross-area-circle-green-white.webp',
        description: 'Guérit le magicien de 1d6 points de vie. Ne s’applique pas aux coéquipiers. Ne peut pas dépasser le maximum de points de vie.',
        distance: {
            type: 'self'
        },
        heal: {
            rollFormula: `
                        if (context.criticalSuccess)
                            return "6";
                        return "1d6";
                    `
        },
        duration: {
            text: 'Instantané'
        },
        criticalSuccess: {
            text: 'Guérit 6 points de vie'
        }
    }
]

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
        id: 'moonStone',
        name: 'Pierres de lune',
        description: `L'enchanteur infuse une lueur dans de petites pierres (maximum 5). Pour activer une pierre, l’utilisateur n'a qu’à la cogner contre une surface dure (la semelle d’une botte, le plat d’une arme ou la boucle d’une ceinture suffit). Une fois activée, la pierre illumine pendant 30 minutes avec la moitié de la force d’une torche puis s'éteint, redevenant une simple pierre à la fin du sort. Ce sort ne requiert pas de fixateur.`,
        bonus: {
            text: `: Permet de voir dans la nuit`
        },
        distance: {
            type: 'touch'
        },
        duration: {
            type: 'Instantané'
        },
        criticalSuccess: {
            text: `crée jusqu’à 8 pierres. Les pierres manquantes apparaissent d’elle-mêmes.`
        }
    },
    {
        id: 'healingPotion',
        name: 'Potion de soin',
        description: `L’enchanteur prépare une potion claire et rougeâtre dans un grand chaudron contenant entre autre du sang de troll (9 gouttes), une pincée de poudre de perlépipein et du jus de pomme (1 litre) et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions de soin par mana dépensées durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.`,
        bonus: {
            text: `Donne 6 pv à la cible`
        },
        distance: {
            type: 'touch'
        },
        duration: {
            type: 'Instantané'
        },
        criticalSuccess: {
            type: 'Prépare 4 potions par mana au lieu de 3.'
        },
    },
    {
        id: 'failedPotion',
        name: 'Potion ratée',
        description: `L’enchanteur utilise n’importe quelle potion (idéalement les inutilisables) et lui infuse de l’énergie magique en la secouant vigoureusement avant de la lancer sur son adversaire. Au contact, elle explose infligeant 1d6-2 points de dégâts. Cependant, comme l’enchanteur lance la potion il doit réussir un jet de lancer/tir.`,
        bonus: {
            text: `Accessoirement fait de la place dans votre inventaire`
        },
        damage: {
            rollFormula: 'return (context.criticalSuccess ? "4" : "1d6-2");',
            element: 'magic'
        },
        distance: {
            type: 'touch'
        },
        duration: {
            type: 'Instantané'
        },
    },
    {
        id: 'healthSyringes',
        name: 'Seringues de santé',
        description: `L'enchanteur infuse un peu d’essence de vie dans de petites fléchettes de sarbacane (maximum 5) en les faisant mariner dans une fiole de potion de soin au moins 8 heures. Les darts s’utilisent avec une sarbacane de portée. Une fois la cible touchée, la cible reçoit 1 seul point de vie qui peut le ramener à la vie puis redevient une simple bout de bois. Ce sort requiert 5 darts en bois de cèdre, une potion de soin mais ne requiert pas de fixateur.`,
        bonus: {
            text: `Donne 1 pv à la cible`
        },
        distance: {
            type: 'touch'
        },
        duration: {
            type: 'Instantané'
        },
        criticalSuccess: {
            text: `Redonne 2 pv à la cible`
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

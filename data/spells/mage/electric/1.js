export default [
    {
        id: 'airPillow',
        name: 'Coussin d’air',
        icon: 'icons/magic/air/air-pressure-shield-blue.webp',
        description: `Les créatures et les objets affectés par ce sort tombent doucement, dérivant vers le bas dans les airs un peu comme s’il avait un parachute. Les sujets affectés par le sort ne subissent aucun dommage d’une chute de n’importe quelle hauteur. Le sort peut être lancé suffisamment rapidement pour sauver l'élémentaliste en cas de chute inattendue d’une hauteur notable. Un poids total allant jusqu’à 500 kilos peut être affecté. Les créatures et objets affectés par le sort tombent à une vitesse de 15 mètres par tour. Si le sort se termine alors qu’ils tombent encore, ils tombent normalement à partir de ce point et ne subissent des dégâts que pour cette distance tombée.<br>
Le sort ne fonctionne que sur les objets en chute libre. Cela n’affecte pas un coup d’épée ou une créature qui charge ou une créature volante.`,
        distance: {
            formula: `return 2 + context.actorData.computedData.magic.arcaneLevel`,
            unit: 'm'
        },
        duration: {
            formula: `return (context.criticalSuccess ? 2 : 1) * 10`,
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
        id: 'airCreation',
        name: 'Création mineure d\'air',
        icon: 'icons/magic/water/bubbles-air-water-blue.webp',
        description: {
            formula: `return 'Créé ' + ((context.criticalSuccess ? 2 : 1) * context.actorData.computedData.magic.arcaneLevel) + ' mètre cube d’air pure'`
        },
        distance: {
            value: 1,
            unit: 'm'
        },
        duration: {
            text: 'Instantanée'
        },
        criticalSuccess: {
            formula: `
                        if (context.criticalSuccess)
                            return 'Double la quantité (pré-calculé)';
                        return 'Double la quantité';`
        },
        area: {
            text: 'Devant l’élémentaliste'
        }
    },
    {
        id: 'airCreation',
        name: 'Création mineure d\'air',
        icon: 'icons/magic/water/bubbles-air-water-blue.webp',
        description: {
            formula: `return 'Créé ' + ((context.criticalSuccess ? 2 : 1) * context.actorData.computedData.magic.arcaneLevel) + ' mètre cube d’air pure'`
        },
        distance: {
            value: 1,
            unit: 'm'
        },
        duration: {
            text: 'Instantanée'
        },
        criticalSuccess: {
            formula: `
                        if (context.criticalSuccess)
                            return 'Double la quantité (pré-calculé)';
                        return 'Double la quantité';`
        },
        area: {
            text: 'Devant l’élémentaliste'
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
        id: 'megaphone',
        name: 'Mégaphone',
        icon: 'icons/tools/instruments/megaphone.webp',
        description: 'L\'élémentaliste augmente considérablement le volume de sa voix, pouvant être entendu très loin.',
        bonus: {
            formula: `return 'Permet d\\’être entendu à ' + (300 * (context.criticalSuccess ? 2 : 1)) + ' m'`,
        },
        distance: {
            type: 'self'
        },
        duration: {
            text: '1 minute par arcane'
        },
        criticalSuccess: {
            formula: `
                if (context.criticalSuccess)
                    return 'Double la distance (pré-calculé)';
                return 'Double la distance';`
        },
        area: {
            formula: 'return 300 * (context.criticalSuccess ? 2 : 1)',
            unit: 'mètres'
        }
    },
]

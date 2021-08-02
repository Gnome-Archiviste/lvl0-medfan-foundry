export default [
    {
        id: 'frostArmor',
        name: 'Armure de givre',
        icon: 'icons/magic/defensive/shield-barrier-blue.webp',
        description: `Le sort recouvre l'élémentaliste d’une mince couche neige qui le protège de 10 points de dégât jusqu’à ce que tous les points de protection soient épuisés ou qu’elle fonde après 4 tours. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts.`,
        bonus: {
            text: `10 points de dégâts absorbés`
        },
        damage: {
            text: `Aucun`
        },
        distance: {
            type: 'self',
        },
        duration: {
            value: 5,
            unit: 'tours'
        },
        area: {
            text: `Une cible`,
        },
        resilience: {
            text: 'Aucune'
        },
        criticalSuccess: {
            text: `Double la durée`
        },
    },
    {
        id: 'snowBall',
        name: 'Boule de neige',
        icon: 'icons/magic/water/projectile-ice-snowball.webp',
        description: `L'élémentaliste fait apparaître une boule de neige dans sa main qu'il peut lancer.`,
        bonus: {
            text: `Aucun`
        },
        damage: {
            rollFormula: 'return "1d6 - 1";',
            element: 'glace'
        },
        distance: {
            value: 10,
            unit: 'm'
        },
        duration: {
            text: 'Instantané'
        },
        area: {
            text: `Une cible`,
        },
        resilience: {
            text: 'Annule les dégâts'
        },
        criticalSuccess: {
            text: `Double les dégâts`
        },
    },
    {
        id: 'mudTrap',
        name: 'Piège de boue',
        icon: 'icons/magic/acid/dissolve-drip-droplet-smoke.webp',
        description: `Immobilise les victimes pendant trois (3) tours sur une distance de 3 mètres carrés. Les victimes ne peuvent plus se déplacer.`,
        bonus: {
            text: `Victimes immobilisées`
        },
        damage: {
            text: `Aucun`
        },
        distance: {
            value: 10,
            unit: 'm'
        },
        duration: {
            value: 3,
            unit: 'tours'
        },
        area: {
            value: 3,
            unit: 'm'
        },
        resilience: {
            text: 'On fait un test par tour pour ne pas avoir l’effet du piège pour ce tour.'
        },
        criticalSuccess: {
            text: `La cible ne peut pas faire de test de résilience.`
        },
    },
    {
        id: 'underWaterBreath',
        name: 'Respirer sous l\'eau',
        icon: 'icons/magic/acid/dissolve-drip-droplet-smoke.webp',
        description: `La cible de ce sort peut respirer sous l’eau librement pendant 10 tours plus un tour par niveau d’arcane de l’élémentaliste.`,
        bonus: {
            text: `Aucun`
        },
        damage: {
            text: `Aucun`
        },
        distance: {
            type: 'touch',
        },
        duration: {
            formula: `return 10 + context.actorData.computedData.magic.arcaneLevel;`,
            unit: 'tours'
        },
        area: {
            text: `Une cible`,
        },
        resilience: {
            text: 'Aucune'
        },
        criticalSuccess: {
            text: `Double la durée`
        },
    },
    {
        id: 'source',
        name: `Source`,
        icon: 'icons/magic/acid/dissolve-drip-droplet-smoke.webp',
        description: `En touchant le sol, l'élémentaliste fait jaillir une petite source. Ceux qui en boivent se font guérir, recevant quelques points de vie. Après un tour, la source se tarit. Si l'eau est récoltée, elle devient de l'eau ordinaire.`,
        bonus: {
            text: `+ 1d6 points de vie`
        },
        damage: {
            text: `Aucun`
        },
        distance: {
            type: 'touch',
        },
        duration: {
            value: 5,
            unit: 'm'
        },
        area: {
            text: `Une cible`,
        },
        resilience: {
            text: 'Aucune'
        },
        criticalSuccess: {
            text: `6 points de vie`
        },
    },
]

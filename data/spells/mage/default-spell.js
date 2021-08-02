export default [
    {
        id: 'englishID',
            name: `Nom du sort`,
        icon: 'icons/magic/acid/dissolve-drip-droplet-smoke.webp',
        description: `Les mains de l’élémentaliste sont entourées d'un liquide vert pâle scintillant qui rend leur toucher très corrosif par nature Le toucher de l’élémentaliste inflige 3d6 points de dégâts d’acide.`,
        bonus: {
            text: `Aucun`
        },
        damage: {
            rollFormula: `return '3d6';`,
                element: 'acid'
        },
        distance: {
            type: 'touch self',
            value: 10,
            unit: 'm'
        },
        duration: {
            text: 'Instantané'
        },
        area: {
            text: `Une cible`,
            value: 1,
            unit: 'm'
        },
        resilience: {
            text: 'Aucune'
        },
        criticalSuccess: {
            text: `Aucun`
        },
    },
]
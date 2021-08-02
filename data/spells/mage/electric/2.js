export default [
    {
        id: 'lightning',
        name: 'Éclair',
        icon: 'icons/magic/lightning/bolt-strike-blue.webp',
        description: `Un éclair vient frapper la victime désignée par l'élémentaliste.`,
        bonus: {
            text: 'Aucun'
        },
        damage: {
            rollFormula: 'return "1d6 + 2";',
            element: 'electric'
        },
        distance: {
            formula: `return 10 + context.actorData.computedData.magic.arcaneLevel`,
            unit: 'm'
        },
        duration: {
            text: `Instantanée`
        },
        resilience: {
            text: 'Divise le dommage par deux'
        },
        criticalSuccess: {
            text: `La cible ne peut pas faire de test de résilience.`
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'dashaWhispering',
        name: 'Murmure de Dasha',
        icon: 'icons/svg/silenced.svg',
        description: `Conversation chuchotée à distance. Il faut pouvoir voir la cible.`,
        bonus: {
            text: 'Aucun'
        },
        damage: {
            text: 'Aucun'
        },
        distance: {
            formula: `return 5 + context.actorData.computedData.magic.arcaneLevel`,
            unit: 'm'
        },
        duration: {
            formula: `return context.actorData.computedData.magic.arcaneLevel`,
            unit: 'tours'
        },
        resilience: {
            text: 'Aucune'
        },
        criticalSuccess: {
            text: `Double la durée`
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'etherealSkates',
        name: 'Patin d’éther',
        icon: 'icons/skills/movement/feet-spurred-boots-brown.webp',
        description: `Permet à la cible de se déplacer sans faire de bruit.`,
        bonus: {
            text: 'Déplacement sans bruit'
        },
        damage: {
            text: 'Aucun'
        },
        distance: {
            text: 'touch'
        },
        duration: {
            formula: `return context.actorData.computedData.magic.arcaneLevel`,
            unit: 'tours'
        },
        resilience: {
            text: 'Aucune'
        },
        criticalSuccess: {
            text: `Double la durée`
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'jump',
        name: 'Saut',
        icon: 'icons/svg/up.svg',
        description: `Ce sort permet au personnage qui en bénéficie de faire des sauts équivalent à son déplacement complet vers l’avant (ou en hauteur); ou l’équivalent à la moitié de son déplacement complet s’il saute vers l’arrière. Cependant il est nécessaire de réussir un test de Gymnastique pour atterrir sécuritairement après un saut si puissant, sinon la personne s'affale par terre et doit se relever au prochain tour.<br>
* Si ce sort est utilisé avec la spécialité Déplacement véloce, le saut est de 2 fois le déplacement complet. Cependant si le test de Gymnastique pour l’atterrissage est raté, le personnage reçoit 3 points de dégâts (l’armure ne compte pas).`,
        bonus: {
            text: 'Permet de sauter sur la distance d’un déplacement complet'
        },
        damage: {
            text: 'Aucun'
        },
        distance: {
            text: 'touch'
        },
        duration: {
            text: 'Instantanée'
        },
        resilience: {
            text: 'Aucune'
        },
        criticalSuccess: {
            text: `Bon pour 3 tours`
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'WindInTheSails',
        name: 'Vent dans les voiles',
        icon: 'icons/magic/air/wind-weather-sailing-ship.webp',
        description: `Le sort permet d’avoir un vent favorable lors des déplacements sur les eaux ou sur les routes. Le déplacement en bateau se verra deux fois plus rapide, et celui sur les routes, il aidera les aventuriers à avancer de 50% plus rapidement.`,
        bonus: {
            text: 'Déplacement 2x en bateau, 1.5x sur les routes'
        },
        damage: {
            text: 'Aucun'
        },
        distance: {
            text: 'self'
        },
        duration: {
            formula: `return context.actorData.computedData.magic.arcaneLevel`,
            unit: 'hour'
        },
        resilience: {
            text: 'Aucune'
        },
        criticalSuccess: {
            text: `Déplacement 2.5x en bateau et 2x sur les routes`
        },
        area: {
            value: 5,
            unit: 'm'
        }
    },
]

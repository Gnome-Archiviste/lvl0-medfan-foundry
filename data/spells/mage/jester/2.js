export default [
    {
        id: 'PlaceboAura',
        name: 'Aura de Placébo',
        icon: 'icons/creatures/abilities/mouth-teeth-tongue-purple.webp',
        description: `Met sur un objet non magique un aura qui semble être magique ainsi qu’une utilité toute aussi fausse. ex: potion de chance sur une bouteille d’eau colorée verte.`,
        distance: {
            type: 'touch'
        },
        duration: {
            type: 'Une scène'
        },
        criticalSuccess: {
            text: `Permanent`
        },
        area: {
            text: `Un objet`
        }
    },
    {
        id: 'stinkingBomb',
        name: 'Bombe puante',
        icon: 'icons/magic/acid/dissolve-pool-bubbles.webp',
        description: `Déclenche une zone nauséabonde de 2 mètres de rayon. Les victimes ne peuvent plus attaquer ou jeter des sorts. Mais ils peuvent se défendre ou bouger la moitié de leur déplacement normal`,
        bonus: {
            text: `Victimes inoffensives`
        },
        distance: {
            value: 5,
            unit: 'm'
        },
        duration: {
            formula: `return (context.criticalSuccess ? 2 : 1) * 3`,
            unit: 'tours'
        },
        resilience: {
            text: 'On fait un test par tour pour ne pas avoir l’effet du nuage pour ce tour'
        },
        criticalSuccess: {
            formula: `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
        area: {
            value: 2,
            unit: 'm'
        }
    },
    {
        id: 'magicMouth',
        name: 'Bouche magique',
        icon: 'icons/creatures/abilities/mouth-teeth-tongue-purple.webp',
        description: `Ce sort imprègne un objet d’une bouche enchantée qui apparaît et prononce son message lorsqu’un événement spécifié se produit. Le message, qui doit contenir un maximum de dix (10) mots par niveaux d'arcane du magicien, peut être rédigé dans n’importe quelle langue connue par le magicien. La bouche ne peut pas lancer de sorts.
        <br>Le sort s’active lorsque les conditions spécifiques définies par le magicien sont remplies. Les commandes peuvent être aussi générales ou détaillées que souhaité, bien que seuls les déclencheurs visuels et sonores puissent être utilisés. Le sort réagit à ce qui semble être réel : les déguisements et les illusions peuvent le tromper. L’obscurité normale n’empêche pas un déclencheur visuel, mais l’obscurité magique ou l’invisibilité le font. Le mouvement silencieux ou le silence magique empêchent les déclencheurs sonores. Les déclencheurs sonores peuvent être attribués à des types généraux de bruits ou à un bruit spécifique ou à un mot prononcé. Une bouche magique ne peut pas distinguer le niveau d’un personnage, ses points de vie ou de mana ou même sa classe. La limite de portée d’un déclencheur est de un (1) mètre par niveau d’arcane du magicien. Le message peut-être délivré un maximum de deux (2) fois par niveau d’arcane du magicien.`,
        distance: {
            type: 'touch'
        },
        duration: {
            formula: `return "jusqu'à ce que le message soit délivré " + ((context.criticalSuccess ? 2 : 1) * context.actorData.computedData.magic.arcaneLevel) + " fois"`
        },
        criticalSuccess: {
            formula: `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
        area: {
            formula: `return context.actorData.computedData.magic.arcaneLevel`,
            unit: 'm'
        },
    },
    {
        id: 'animatedRope',
        name: 'Corde animée',
        icon: 'icons/sundries/survival/rope-coiled-tan.webp',
        description: `Une corde bouge sur ordre du magicien selon des actions simples : se tendre, attacher, s’enrouler, etc.`,
        distance: {
            type: `touch`
        },
        duration: {
            formula: `return (context.criticalSuccess ? 2 : 1) * 5 * context.actorData.computedData.magic.arcaneLevel`,
            unit: `tours`
        },
        criticalSuccess: {
            formula: `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
        area: {
            text: `Longueur de la corde`
        }
    },
    {
        id: 'IceCreamCone',
        name: 'Cornet glacé',
        icon: 'icons/magic/water/projectile-ice-snowball.webp',
        description: `Fait tomber du ciel une boule de crème glacée géante sur l’ennemi (saveur au choix du MdJ), suivi d’un cornet gaufré. Le nombre de boules augmente avec le nombre d’arcane du bouffon.`,
        bonus: {
            text: `Aucun`
        },
        damage: {
            rollFormula: `return (context.actorData.computedData.magic.arcaneLevel) + 'd6/2' + (context.criticalSuccess ? ' + 1d6' : '') ;`,
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
            text: 'Divise les dégâts en 2'
        },
        criticalSuccess: {
            formula: `
                    if (context.criticalSuccess)
                        return 'Ajoute 1d6 de dégât (pré-calculé) car une cerise confite s’additionne à la confection.';
                    return 'Ajoute 1d6 de dégât car une cerise confite s’additionne à la confection.';`
        }
    },
    {
        id: 'talithaSneezing',
        name: 'Éternuement de Talitha',
        icon: 'icons/sundries/survival/rope-coiled-tan.webp',
        description: `En soufflant dans le creux de sa main, le magicien envoie une poussière magique qui déclenche de puissants éternuements chez la victime. La victime est immobilisée pour 2 tours. Empêche un magicien de lancer des sorts.`,
        bonus: {
            text: `Victime immobilisée`
        },
        distance: {
            value: 10,
            unit: 'm'
        },
        duration: {
            value: 2,
            unit: `tours`
        },
        criticalSuccess: {
            text: `La cible ne peut pas faire de test de résilience`
        },
        resilience: {
            text: `Faire un test par tour pour ne pas avoir l’effet du nuage pour ce tour`
        },
        area: {
            text: `Une cible`
        }
    },
    {
        id: 'tmp2',
        name: 'Arcane 2',
        description: 'Sort arcane 2',
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    }
]

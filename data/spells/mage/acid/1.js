export default [
    {
        "id": 'acidCreation',
        "name": 'Création mineure d\'acide',
        "icon": 'icons/magic/acid/pouring-gas-smoke-liquid.webp',
        "description": {
            "formula": `return "Créer " + ((context.criticalSuccess ? 1 : 0.5) * context.actorData.computedData.magic.arcaneLevel) + " litre d'acide"`
        },
        "distance": {
            "value": 1,
            "unit": 'm'
        },
        "duration": {
            "text": 'Instantané'
        },
        "criticalSuccess": {
            "formula": `
                if (context.criticalSuccess)
                    return 'Double la quantité (pré-calculé)';
                return 'Double la quantité';`
        },
        "area": {
            "text": `Devant l’élémentaliste`
        }
    },
    {
        "id": 'cobra',
        "name": 'Cobra',
        "icon": 'icons/magic/death/skeleton-snake-skull-pink.webp',
        "description": `En ouvrant la bouche bien grande, l'élémentaliste crée un projectile acide de ses glandes salivaires. Si la cible est touchée, le magicien lance un dé et si le résultat est 1 (un), l’adversaire est aveuglé pour un tour.`,
        "damage": {
            "rollFormula": 'return "1d6/2";',
            "element": 'acid'
        },
        "bonus": {
            "text": `Chance d’aveugler l’adversaire`
        },
        "distance": {
            "value": 2,
            "unit": 'm'
        },
        "duration": {
            "text": 'Instantané'
        },
        "criticalSuccess": {
            "text": `La cible est automatiquement aveuglée`
        },
        "area": {
            "text": `Devant l’élémentaliste`
        }
    },
    {
        "id": 'stinkingCloud',
        "name": 'Nuage puant',
        "icon": 'icons/magic/acid/dissolve-pool-bubbles.webp',
        "description": `Déclenche une zone nauséabonde de 2 mètres de rayon. Les victimes ne peuvent plus attaquer ou jeter des sorts. Mais ils peuvent se défendre ou bouger la moitié de leur déplacement normal`,
        "damage": {
            "rollFormula": 'return "1d6/2";',
            "element": 'acid'
        },
        "bonus": {
            "text": `Victimes inoffensives`
        },
        "distance": {
            "value": 5,
            "unit": 'm'
        },
        "duration": {
            "formula": `return (context.criticalSuccess ? 2 : 1) * 3`,
            "unit": 'tours'
        },
        "resilience": {
            "text": 'On fait un test par tour pour ne pas avoir l’effet du nuage pour ce tour'
        },
        "criticalSuccess": {
            "formula": `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
        "area": {
            "value": 2,
            "unit": 'm'
        }
    },
    {
        "id": 'toxicCloud',
        "name": 'Nuage toxique',
        "icon": 'icons/magic/acid/dissolve-bone-ribs-skull.webp',
        "description": `L’élémentaliste émet une vapeur verdâtre et nauséabonde de sous sa robe de magie qui vient l’envelopper. Toute personne prise dans le nuage reçoit 2 points de dommage sans tenir compte de l’armure. L’élémentaliste n’est pas affecté par le dommage.`,
        "damage": {
            "rollFormula": 'return "2";',
            "element": 'acid'
        },
        "distance": {
            "type": 'self'
        },
        "duration": {
            "value": 3,
            "unit": 'tours'
        },
        "resilience": {
            "text": 'Divise les dégâts en 2'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience`
        },
        "area": {
            "text": `2 mètres de rayons autour de l’élémentaliste`
        }
    },
    {
        "id": 'corrosiveTouch',
        "name": 'Toucher corrosif',
        "icon": 'icons/magic/acid/dissolve-drip-droplet-smoke.webp',
        "description": `Les mains de l’élémentaliste sont entourées d'un aura vert pâle scintillant qui rend leur toucher très corrosif par nature. Le toucher de l’élémentaliste inflige 1d6 points de dégâts d’acide.`,
        "damage": {
            "rollFormula": 'return "1d6";',
            "element": 'acid'
        },
        "distance": {
            "type": 'touch'
        },
        "duration": {
            "text": 'Instantané'
        },
        "resilience": {
            "text": 'Divise les dégâts en 2'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience`
        },
        "area": {
            "text": `Une cible`
        }
    },
]

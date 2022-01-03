export default [
    {
        "id": 'mud',
        "name": 'Boue au visage',
        "icon": 'icons/magic/earth/projectile-stone-landslide.webp',
        "description": 'L’élémentaliste prend une poignée de boue dans ses mains et l’envoie au visage de son adversaire, la boue entrant dans les yeux, le nez et la bouche, infligeant seulement un peu de dégâts et permettant à l’élémentaliste de s’éloigner un peu.',
        "bonus": {
            "text": `Permet de s’éloigner de deux (2) mètres de l’adversaire après l’attaque.`
        },
        "distance": {
            "value": 3,
            "unit": 'm'
        },
        "damage": {
            "rollFormula": 'return (context.criticalSuccess ? "1d6" : "1d6/2");',
            "element": 'earth'
        },
        "duration": {
            "text": 'Instantanée'
        },
        "criticalSuccess": {
            "formula": `
                if (context.criticalSuccess)
                    return 'Double les dégâts (pré-calculé)';
                return 'Double les dégâts';`
        },
        "area": {
            "text": 'Une cible'
        }
    },
    {
        "id": 'earthCreation',
        "name": 'Création mineure de terre',
        "icon": 'icons/creatures/magical/spirit-earth-stone-magma-yellow.webp',
        "description": {
            "formula": `return "Créer " + ((context.criticalSuccess ? 2 : 1) * context.actorData.computedData.magic.arcaneLevel) + " m² de terre fertile dans n’importe quel terrain"`
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
        "id": 'mitraille',
        "name": 'Mitraille',
        "icon": 'icons/magic/earth/projectiles-stone-salvo.webp',
        "description": {
            "formula": `return "L'élémentaliste projette de petites pierres qui mitraillent sa cible (2 pierres/ arcane) et qui font 1 point de dégât par pierre. Comme la magie opère sur les pierres et non la cible, le sort ne peut être absorbé ou renvoyé. Pour la même raison, il est impossible de faire un jet de résilience."`
        },
        "damage": {
            "rollFormula": 'return (context.actorData.computedData.magic.arcaneLevel * 2).toString();',
            "element": 'earth'
        },
        "distance": {
            "value": 10,
            "unit": 'm'
        },
        "duration": {
            "text": 'Instantané'
        },
        "criticalSuccess": {
            "text": `Les dégâts passent l’armure`
        },
        "area": {
            "text": `Une cible`
        }
    },
    {
        "id": 'earthFist',
        "name": 'Poing de pierre',
        "icon": 'icons/magic/earth/strike-fist-stone-light.webp',
        "description": {
            "formula": `return "Le poing de l’élémentaliste deviennent de pierre, lui permettant de donner un coup de poing plus puissant qu'il ne le pourrait normalement, infligeant son Physique + deux (2) en dégâts à son adversaire."`
        },
        "damage": {
            "rollFormula": 'return context.actorData.computedData.stats.baseStats.phy.value.toString() + " + 2";',
            "element": 'physic'
        },
        "distance": {
            "type": 'self',
        },
        "duration": {
            "text": 'Instantané'
        },
        "resilience": {
            "text": 'Dégâts divisés par deux (2).'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas éviter`
        },
        "area": {
            "text": `Une cible`
        }
    },
    {
        "id": 'quicksand',
        "name": 'Sable mouvant',
        "icon": 'icons/magic/movement/chevrons-down-yellow.webp',
        "description": `Le sol se transforme en sable mouvant et immobilise les victimes pendant trois (3) tours sur une distance de 3 mètres carrés. Les victimes ne peuvent plus se déplacer car si elles bougent, elles s’enfoncent encore plus.`,
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
    }
]

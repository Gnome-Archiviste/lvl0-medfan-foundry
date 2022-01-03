export default [
    {
        "id": 'protectAuraEvil',
        "name": 'Aura de protection contre le mal',
        "icon": 'icons/magic/unholy/barrier-fire-pink.webp',
        "description": 'Empêche les mauvaises créatures de pénétrer dans une zone de 5 mètres de rayon autour du champion. Attention, bien que l’aura ce fait à l’entour du champion, cette dernière ne se déplace pas.',
        "distance": {
            "type": 'self'
        },
        "duration": {
            "rollFormula": `
                        if (context.criticalSuccess)
                            return "(1d6+" + context.actorData.computedData.magic.arcaneLevel + ")*2";
                        return "1d6+" + context.actorData.computedData.magic.arcaneLevel;
                    `,
            "unit": 'tours'
        },
        "area": {
            "value": 5,
            "unit": 'm'
        },
        "criticalSuccess": {
            "formula": `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
    },
    {
        "id": 'blind',
        "name": 'Aveuglement',
        "icon": 'icons/magic/perception/eye-slit-orange.webp',
        "description": {
            "formula": `return "Rends une tête de la victime aveugle pour <em>" + context.actorData.computedData.magic.arcaneLevel + "</em> tour(s)." 
                        + " La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.";`
        },
        "distance": {
            "value": 20,
            "unit": 'm'
        },
        "duration": {
            "formula": `return context.actorData.computedData.magic.arcaneLevel`,
            "unit": 'tours'
        },
        "area": {
            "text": 'Une cible'
        },
        "resilience": {
            "text": 'Le sort ne fonctionne pas'
        },
        "criticalSuccess": {
            "text": 'La cible ne peut pas faire de test de résilience.'
        },
        "actions": {
            "addEffect": {
                "name": `Ajouter l'effet`,
                "type": 'addEffect',
                "data": {
                    "duration": {
                        "formula": `return context.actorData.computedData.magic.arcaneLevel`,
                        "unit": 'tours'
                    },
                    "effectName": 'Aveuglement',
                    "modifiers": [
                        {
                            "stat": 'per',
                            "value": -3
                        },
                        {
                            "skill": 'combat.dodge',
                            "value": -3
                        },
                        {
                            "skill": 'combat.melee_combat',
                            "value": -3
                        },
                        {
                            "skill": 'combat.throw_shoot',
                            "value": -3
                        },
                        {
                            "skill": 'champion.shield_attack',
                            "value": -3
                        },
                        {
                            "skill": 'warrior.charge',
                            "value": -3
                        },
                        {
                            "skill": 'warrior.two_handed_combat',
                            "value": -3
                        },
                        {
                            "skill": 'combat.hand_combat',
                            "value": -3
                        }
                    ]
                }
            }
        }
    },
    {
        "id": 'babelfish',
        "name": 'Babelfish',
        "icon": 'icons/magic/symbols/question-stone-yellow.webp',
        "description": {
            "formula": 'return "Permets de comprendre toute langue des créatures pensantes pendant " + (context.criticalSuccess ? 14 : 7) + " tours."'
        },
        "distance": {
            "type": 'self'
        },
        "duration": {
            "formula": `
                        if (context.criticalSuccess)
                            return 14;
                        return 7;
                    `,

            "unit": 'tours'
        },
        "area": {
            "text": 'Une cible'
        },
        "criticalSuccess": {
            "formula": `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
        },
    },
    {
        "id": 'duel',
        "name": 'Duel',
        "icon": 'icons/equipment/hand/glove-ring-leather-green.webp',
        "description": 'Avec un gant, le champion frappe un adversaire au visage pour un point de dégât direct. Cependant, le champion devient la seule cible de l’adversaire jusqu’à la fin du combat. Les habiletés comme provocation, commandement, intimidation des autres personnages n\'affectent pas les l’adversaire sous le sort Duel.',
        "distance": {
            "type": 'touch'
        },
        "bonus": {
            "text": 'Armure ne protège pas'
        },
        "damage": {
            "formula": '1'
        },
        "resilience": {
            "text": 'Le sort ne fonctionne pas'
        },
        "duration": {
            "text": 'Instantané',
        },
        "area": {
            "text": 'Une cible'
        },
        "criticalSuccess": {
            "text": 'La cible ne peut pas faire de test de résilience.'
        },
    },
    {
        "id": 'heroMeal',
        "name": 'Repas du héros',
        "icon": 'icons/consumables/food/bowl-stew-brown.webp',
        "description": 'Fournit un repas pour un personnage et guérit de 1d6 points de vie. Le repas disparaît à la fin, et ne laisse aucun reste.',
        "distance": {
            "value": 1,
            "unit": 'm'
        },
        "bonus": {
            "text": 'Guérit 1d6 points de vie'
        },
        "duration": {
            "text": 'Instantané',
        },
        "area": {
            "text": 'Devant le Champion'
        },
        "criticalSuccess": {
            "text": 'Guérit de 2d6 points de vie'
        },
    },
]

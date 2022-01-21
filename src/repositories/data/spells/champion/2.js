export default [
    {
        "id": "protectAuraEvil",
        "name": "Aura de protection contre le mal",
        "icon": "icons/magic/unholy/barrier-fire-pink.webp",
        "description": "Empêche les mauvaises créatures de pénétrer dans une zone de 5 mètres de rayon autour du champion. Attention, bien que l’aura ce fait à l’entour du champion, cette dernière ne se déplace pas.",
        "distance": {
            "type": "self",
            "text": "Champion"
        },
        "duration": {
            "rollFormula": "return ((context.criticalSuccess ? 2 : 1) * 1) + 'd6+' + (1 * context.arcaneLevel)",
            "unit": "tours",
            "text": "1d6 tours + 1 tour par niveau d’arcane"
        },
        "area": {
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "blind",
        "name": "Aveuglement",
        "icon": "icons/magic/perception/eye-slit-orange.webp",
        "description": "Rends une tête de la victime aveugle pour un 1 tour par niveau d’arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "-3 perception et toutes habilités de combats"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "actions": {
            "addEffect": {
                "name": "Ajouter l'effet",
                "type": "addEffect",
                "data": {
                    "duration": {
                        "formula": "return context.arcaneLevel",
                        "unit": "tours"
                    },
                    "effectName": "Aveuglement",
                    "modifiers": [
                        {
                            "stat": "per",
                            "value": -3
                        },
                        {
                            "skill": "combat.dodge",
                            "value": -3
                        },
                        {
                            "skill": "combat.melee_combat",
                            "value": -3
                        },
                        {
                            "skill": "combat.throw_shoot",
                            "value": -3
                        },
                        {
                            "skill": "champion.shield_attack",
                            "value": -3
                        },
                        {
                            "skill": "warrior.charge",
                            "value": -3
                        },
                        {
                            "skill": "warrior.two_handed_combat",
                            "value": -3
                        },
                        {
                            "skill": "combat.hand_combat",
                            "value": -3
                        }
                    ]
                }
            }
        }
    },
    {
        "id": "babelfish",
        "name": "Babelfish",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet de comprendre toute langue des créatures pensantes pendant sept tours.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 7",
            "value": 7,
            "unit": "tours",
            "text": "7 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "duel",
        "name": "Duel",
        "icon": "icons/equipment/hand/glove-ring-leather-green.webp",
        "description": "Avec un gant, le champion frappe un adversaire au visage pour un point de dégât direct. Cependant, le champion devient la seule cible de l’adversaire jusqu’à la fin du combat. Les habiletés comme provocation, commandement, intimidation des autres personnages n'affectent pas les l’adversaire sous le sort Duel. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Armure ne protège pas"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "1 (sans armure)"
        }
    },
    {
        "id": "heroMeal",
        "name": "Repas du héros",
        "icon": "icons/consumables/food/bowl-stew-brown.webp",
        "description": "Fournit un repas pour un personnage et guérit de 1d6 points de vie. Le repas disparaît à la fin, et ne laisse aucun reste.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Devant le Champion"
        },
        "bonus": {
            "text": "Guérit 1d6 points de vie"
        },
        "criticalSuccess": {
            "text": "Guérit 2d6 points de vie"
        },
        "heal": {
            "rollFormula": "return '1d6';"
        }
    }
]

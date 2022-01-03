export default [
    {
        "id": 'citricArmour',
        "name": 'Armure citrique',
        "icon": 'icons/equipment/chest/breastplate-layered-leather-studded.webp',
        "description": {
            "formula": `return "L'élémentaliste fait apparaitre une couche gélatineuse jaune qui absorbe jusqu'à dix(10) points de dégât et qui dure 5 tours ou dix points de dégâts (la protection disparait après " + (context.criticalSuccess ? 10 : 5) + " tours même si tous les points de protection n'ont pas été utilisés). Ne peut pas s'additionner à d'autres sorts de protection qui absorbent les dégâts."`
        },
        "bonus": {
            "text": `10 points de dégâts absorbés`
        },
        "distance": {
            "type": 'self'
        },
        "duration": {
            "formula": `return (context.criticalSuccess ? 10 : 5)`,
            "unit": 'tours'
        },

        "criticalSuccess": {
            "formula": `
                    if (context.criticalSuccess)
                        return 'Double la durée (pré-calculé)';
                    return 'Double la durée';`
        },
        "area": {
            "text": `Une cible`
        }

    },
    {
        "id": 'causticBerries',
        "name": 'Baies Caustiques',
        "icon": 'icons/consumables/fruit/nanking-cherry-leaf-red.webp',
        "description": `Avec ce sort, l’élémentaliste utilise des baies (jusqu’à 6 par sort) qui deviennent acides. Il peut utiliser lui-même ces baies ou les offrir à ses alliés. Ces glands ou ces baies sont utilisés comme des billes d’acide.`,
        "bonus": {
            "text": `voir les statistiques de la bille d’acide`
        },
        "distance": {
            "value": 1,
            "unit": 'm'
        },
        "duration": {
            "text": 'Instantané'
        },
        "resilience": {
            "text": 'Aucune'
        },
        "criticalSuccess": {
            "text": `Double la quantité de baies (les baies manquantes apparaissent).`
        },
        "area": {
            "text": `1-6 cibles`
        }
    },
    {
        "id": 'blotter',
        "name": 'Buvard',
        "icon": 'icons/equipment/shield/kite-wooden-oak-glow.webp',
        "description": `En touchant une cible, l’élémentaliste imprègne d’énergies magiques protectrices la cible, offrant une protection partielle contre l’acide. Le sort réduit de moitié le dommage produit par l’acide, que la source des dégâts soit naturelle ou magique, pour une seule fois. De plus, une fois que le sort capture une partie de l’énergie élémentaire, il la stock pour votre prochaine attaque de mêlée, ajoutant 1d6 dégâts d’acides supplémentaires.`,
        "bonus": {
            "text": `Ajoute 1d6 dégâts acides`
        },
        "distance": {
            "type": 'touch'
        },
        "duration": {
            "text": 'Instantané' /* jusqu’à utilisation dans la version Air du sort */
        },
        "resilience": {
            "text": 'Divise les dégâts en 2' /* Aucune dans le sort d'air */
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience`
        },
        "area": {
            "text": `Une cible`
        }
    },
    {
        "id": 'acideTouch',
        "name": 'Touché acide',
        "icon": 'icons/magic/acid/dissolve-arm-flesh.webp',
        "description": `Les mains de l’élémentaliste sont entourées d’un aura vert brillant qui semble bouillonner, comme s’il s’agissait d’un liquide. Le toucher de l’élémentaliste inflige 1d6 points de dégâts d’acide, +1 pour tous les niveaux d’arcane.`,
        "damage": {
            "rollFormula": `return '1d6+' + (context.actorData.computedData.magic.arcaneLevel);`,
            "element": `acid`
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
            "text": `La cible ne peut pas faire de test de résilience.`
        },
        "area": {
            "text": `Une cible`
        }
    },
]

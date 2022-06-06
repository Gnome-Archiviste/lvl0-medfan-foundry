export default [
    {
        "id": "contreCoup",
        "name": "Contre-coup",
        "icon": "icons/magic/defensive/shield-barrier-flaming-pentagon-orange.webp",
        "description": "Le sort capture une partie de l’énergie entrante, réduisant son effet sur vous et la stockant pour votre prochaine attaque de mêlée. Vous avez une résistance aux dégâts physiques jusqu’au début de votre prochain tour. De plus, il la stock pour votre prochaine attaque de mêlée lors de votre prochain tour, ce qui fait que la cible subit 1d6 dégâts supplémentaires.",
        "distance": {
            "text": "Une cible"
        },
        "duration": {
            "text": "Jusqu’à utilisation."
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Ajoute 1d6 dégâts"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "elementaireMineurDePierre",
        "name": "Élémentaire mineur de pierre",
        "icon": "icons/magic/earth/construct-stone.webp",
        "description": "L'élémentaliste invoque un petit élémentaire de pierre  pierre à partir d'une source de terre ( au moins 1 m² ). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie. \n\nPHY 5, DEX 4, INT 3, CHA 3, PER 5\n\nHP 25, H2H : 6, Attaque : 3 de dégâts\n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "text": "Double les points de vie"
        },
        "damage": {
            "text": "Voir statistique de l’élémental"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "passageSansTraces",
        "name": "Passage sans traces",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "En recevant ce sort, la cible peut se déplacer sur n’importe quel type de terrain et ne laisser ni empreintes ni odeurs. Pister la cible devient impossible par des moyens non magiques.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * context.arcaneLevel",
            "unit": "minutes",
            "text": "Une minute par niveau du magicien"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "peauDePierre",
        "name": "Peau de pierre",
        "icon": "icons/magic/defensive/armor-stone-skin.webp",
        "description": "Permets d’absorber 15 points de dégâts. Le sort peut être fait sur l'élémentaliste ou un allié. L'élémentaliste doit toucher la cible. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Tant que les 15 points ne sont pas utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe 15 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe 30 points de dégâts"
        },
        "dependsOnArcaneLevel": false,
        "actions": {
            "addEffect": {
                "name": "Ajouter l'effet",
                "type": "addEffect",
                "data": {
                    "duration": {
                        "text": "Tant que les 15 points ne sont pas utilisés"
                    },
                    "effectName": "Peau de pierre",
                    "magicArmor": {
                        "formula": "return context.criticalSuccess ? 30 : 15"
                    }
                }
            }
        }
    },
    {
        "id": "rocher",
        "name": "Rocher",
        "icon": "icons/magic/earth/projectile-boulder-yellow.webp",
        "description": "D’un geste, l'élémentaliste envoie un rocher dans les airs qui éclate avec un rugissement à la hauteur et à la distance que l’élémentaliste désire, tant qu’elle se trouve dans la portée maximale du sort (15 mètres). Les éclats remplissent la zone d’effet, causant 1d6 dégâts par niveau d’arcane de l’élémentaliste à toutes les créatures de la zone. Il affecte une sphère de 5x5 mètres. Le rocher suit une trajectoire rectiligne et si elle heurte une barrière solide avant d’atteindre la portée prescrite, l’impact provoque une explosion précoce. \n\n\n\n",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return context.arcaneLevel + 'd6';",
            "element": "physic",
            "text": "1d6 par niveau d’arcane"
        },
        "dependsOnArcaneLevel": true
    }
]
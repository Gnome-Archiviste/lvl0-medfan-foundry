export default [
    {
        "id": "fog",
        "name": "Brume",
        "icon": "icons/magic/air/weather-clouds.webp",
        "description": "Une épaisse brume entoure l'élémentaliste, permettant de le cacher ainsi que ses coéquipiers, sur une zone de 5 mètres. Donne 2 points de pénalité sur leur perception (il faut faire une perception pour trouver un nouvel adversaire). On ajoute un mètre par niveau d’arcane de l'élémentaliste à partir du 5e arcane\n\nUne épaisse brume entoure le magicien, permettant de le cacher ainsi que ses coéquipiers. Donne 2 points de pénalité sur la perception de tous ceux affectés par le sort (il faut faire une perception pour trouver un nouvel adversaire).",
        "distance": {
            "text": "Soi-même"
        },
        "duration": {
            "value": 3,
            "unit": "tours",
            "text": "3 tours"
        },
        "area": {
            "width": 3,
            "height": 3,
            "widthPerArcane": 2,
            "heightPerArcane": 2,
            "text": "(3 + 2 par niveau d’arcane)x(3 + 2 par niveau d’arcane) mètres",
            "comment": "",
            "epicSuccess": {
                "width": 6,
                "height": 6,
                "widthPerArcane": 4,
                "heightPerArcane": 4,
                "text": "(6 + 4 par niveau d’arcane)x(6 + 4 par niveau d’arcane) mètres",
                "comment": ""
            }
        },
        "bonus": {
            "text": "-2 sur perception"
        },
        "criticalSuccess": {
            "area": {
                "width": 6,
                "height": 6,
                "widthPerArcane": 4,
                "heightPerArcane": 4,
                "text": "(6 + 4 par niveau d’arcane)x(6 + 4 par niveau d’arcane) mètres",
                "comment": ""
            },
            "formula": "if (context.criticalSuccess) { return 'Zone = (6 + 4 par niveau d’arcane)x(6 + 4 par niveau d’arcane) mètres (pré-calculé)'; } return 'Zone = (6 + 4 par niveau d’arcane)x(6 + 4 par niveau d’arcane) mètres';",
            "text": "Zone = (6 + 4 par niveau d’arcane)x(6 + 4 par niveau d’arcane) mètres"
        },
        "dependsOnArcaneLevel": true,
        "actions": {
            "addEffect": {
                "name": "Ajouter l'effet",
                "type": "addEffect",
                "data": {
                    "duration": {
                        "value": 3,
                        "unit": "tours"
                    },
                    "effectName": "Surdité",
                    "modifiers": [
                        {
                            "stat": "per",
                            "value": -2
                        },
                        {
                            "skill": "general.listening",
                            "value": -10
                        }
                    ]
                }
            }
        }
    },
    {
        "id": "waterCreation",
        "name": "Création mineure d'eau",
        "icon": "icons/magic/water/water-hand.webp",
        "description": "Ce sort génère une eau saine et potable. L’eau doit être créée dans une zone aussi petite qu’elle contiendra réellement le liquide. L’élémentaliste peut créer 1 litre d’eau par niveau d’arcane.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "criticalSuccess": {
            "text": "Double la quantité"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "iceHand",
        "name": "Main de glace",
        "icon": "icons/magic/water/snowflake-ice-snow-white.webp",
        "description": "Enveloppe la main de l'élémentaliste d’une aura glacée. Fait du dégât et immobilise la victime pendant deux (2) tours. L’élémentaliste doit toucher sa victime.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 2,
            "unit": "tours",
            "text": "2 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "Victime non-immobilisée"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "element": "water",
            "text": "1d6 - 2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "splash",
        "name": "Splash",
        "icon": "icons/magic/water/wave-water-blue.webp",
        "description": "En mettant une petite quantité d'eau dans ses mains et en les joignant, l'élémentaliste crée un projectile sous la forme d'un jet d'eau. ",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Annule les dégâts"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double les dégâts (pré-calculé)'; } return 'Double les dégâts';",
            "text": "Double les dégâts"
        },
        "damage": {
            "rollFormula": "if (context.criticalSuccess) { return '(' + ('1d6/2') + ')*2'; } return '1d6/2';",
            "element": "water",
            "text": "1d6/2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "ice",
        "name": "Verglas",
        "icon": "icons/magic/water/snowflake-ice-purple.webp",
        "description": "Rends le sol, sous la cible, glissant, la faisant tomber. La cible doit faire un jet d'habilité gymnastique pour se relever. Si la cible décide de rester au sol, elle pourra faire certaines actions comme lancer un sort ou utiliser une arme de jet après avoir perdu un tour.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "text": "1 tour + réussite du test d'habileté"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "dependsOnArcaneLevel": false
    }
]
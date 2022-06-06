export default [
    {
        "id": "alarm",
        "name": "Alarme",
        "icon": "icons/magic/sonic/bell-alarm-red-purple.webp",
        "description": "Protège une zone ou une pièce avec un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancement du sort) entre dans la zone, on entend le son d’une cloche. À partir d’arcane 5, l’alarme peut être silencieuse, c’est à dire qu’ elle est entendue dans la tête du magicien et des personnes présentes durant le lancement du sort. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 2 * context.arcaneLevel",
            "unit": "heures",
            "text": "2 heures par niveau d’arcane"
        },
        "area": {
            "width": 21,
            "height": 21,
            "text": "21x21 mètres (maximum une pièce)",
            "comment": "maximum une pièce"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "fog",
        "name": "Brume",
        "icon": "icons/magic/air/weather-clouds.webp",
        "description": "Une épaisse brume entoure le magicien, permettant de le cacher ainsi que ses coéquipiers. Donne 2 points de pénalité sur la perception de tous ceux affectés par le sort (il faut faire une perception pour trouver un nouvel adversaire).",
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
        "id": "fireSlap",
        "name": "Gifle enflammée",
        "icon": "icons/magic/fire/beam-strike-whip-red.webp",
        "description": "Avec ce sort, le magicien peut frapper à distance. Une fine feuille de flammes jaillit de la main du magicien, frappant une créature jusqu’à 5 mètres du magicien et lui fait 1d6 dommage de feu.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Divise le dommage par deux (arrondi au supérieur)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '1d6';",
            "element": "fire",
            "text": "1d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "light",
        "name": "Lumière",
        "icon": "icons/magic/light/orb-lightbulb-gray.webp",
        "description": "Fait apparaître une boule de lumière de 30 cm de rayon pour éclairer une pièce ou un corridor. La lumière est fixe.\n\nÀ partir du niveau d’arcane 5, le magicien peut l'avoir qui le suit pour le coût de 2 points de magie additionnels.",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres (maximum une pièce)",
            "comment": "maximum une pièce"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "iceHand",
        "name": "Main de glace",
        "icon": "icons/magic/water/snowflake-ice-snow-white.webp",
        "description": "Enveloppe la main du magicien d’une aura glacée. Fait du dégât et immobilise la victime pendant deux (2) tours. Le magicien doit toucher sa victime.",
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
        "id": "spiderHand",
        "name": "Main de l’araignée",
        "icon": "icons/creatures/webs/web-spider-glowing-purple.webp",
        "description": "Ce sort donne le pouvoir de  se déplacer le long des murs et des plafonds à la cible comme s’il s’agissait d’une araignée. Cette dernière se déplace à un demi-mouvement de base sur des surfaces verticales et inversées. Les mains et les pieds doivent être découverts afin d’entrer en contact direct avec la surface à grimper.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5",
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Déplacement sur toute surface solide."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "magicParachute",
        "name": "Parachute magique ",
        "icon": "icons/magic/air/wind-weather-snow-gusts.webp",
        "description": "Les créatures et les objets affectés par ce sort tombent doucement, dérivant vers le bas dans les airs un peu comme s’il avait un parachute. Les sujets affectés par le sort ne subissent aucun dommage d’une chute de n’importe quelle hauteur. Le sort peut être lancé suffisamment rapidement pour sauver le magicien en cas de chute inattendue d’une hauteur minimum de 6 m. (2 étages). Un poids total allant jusqu’à 500 kilos peut être affecté. Les créatures et objets affectés par le sort tombent à une vitesse de 5 mètres par tour. Si le sort se termine alors qu’ils tombent encore, ils tombent normalement à partir de ce point et ne subissent des dégâts que pour cette distance tombée.\n\nLe sort ne fonctionne que sur les objets en chute libre. Cela n’affecte pas un coup d’épée ou une créature qui charge ou une créature volante.",
        "distance": {
            "text": "2m + 1m par niveau d’arcane du magicien"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "bananaPeel",
        "name": "Peau de banane ",
        "icon": "icons/consumables/fruit/banana-ripe-yellow.webp",
        "description": "Fais tomber la victime. La victime perd un tour et doit faire un lancer de l’habileté « Gymnastique » pour se relever. Après le tour perdu, la victime peut décider de rester par terre, mais pourrait faire certaines actions comme lancer un sort ou un objet.",
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
    },
    {
        "id": "sesame",
        "name": "Sésame",
        "icon": "icons/sundries/misc/lock-open-yellow.webp",
        "description": "Déverrouille les serrures et cadenas qui ne sont pas verrouillés magiquement. Lors du déverrouillage, la serrure fera son déclic habituel. Attention, le sort n’enlève pas les pièges.",
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
            "text": "Déverrouille les serrures et cadenas"
        },
        "resilience": {
            "text": "Aucune (sauf cas spéciaux)"
        },
        "criticalSuccess": {
            "text": "La serrure ne fait pas de bruit"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "personalHeal",
        "name": "Soins personnels ",
        "icon": "icons/magic/life/cross-area-circle-green-white.webp",
        "description": "Guérit le magicien de 1d6 points de vie. Le sort guérit seulement le magicien et ne s’applique pas aux coéquipiers. Ne peut pas dépasser le maximum de points de vie.",
        "distance": {
            "text": "Soi même"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Magicien"
        },
        "bonus": {
            "text": "Guérit 1d6 points de vie"
        },
        "criticalSuccess": {
            "text": "Guérit 6 points de vie"
        },
        "heal": {
            "rollFormula": "if (context.criticalSuccess) { return '6' } return '1d6';"
        },
        "dependsOnArcaneLevel": false
    }
]
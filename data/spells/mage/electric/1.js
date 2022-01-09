export default [
    {
        "id": "blastOfWind",
        "name": "Coussin d’air",
        "icon": "icons/magic/air/weather-wind-gust.webp",
        "description": "Les créatures et les objets affectés par ce sort tombent doucement, dérivant vers le bas dans les airs un peu comme s’il avait un parachute. Les sujets affectés par le sort ne subissent aucun dommage d’une chute de n’importe quelle hauteur. Le sort peut être lancé suffisamment rapidement pour sauver l'élémentaliste en cas de chute inattendue d’une hauteur notable. Un poids total allant jusqu’à 500 kilos peut être affecté. Les créatures et objets affectés par le sort tombent à une vitesse de 15 mètres par tour. Si le sort se termine alors qu’ils tombent encore, ils tombent normalement à partir de ce point et ne subissent des dégâts que pour cette distance tombée.\n\nLe sort ne fonctionne que sur les objets en chute libre. Cela n’affecte pas un coup d’épée ou une créature qui charge ou une créature volante.",
        "distance": {
            "text": "2 mètres + 1 mètre/arcane"
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
        }
    },
    {
        "id": "airPillow",
        "name": "Création mineure d'air",
        "icon": "icons/magic/air/air-pressure-shield-blue.webp",
        "description": "Créé 1 mètre cube d’air pure par arcane de l’élémentaliste. Ne peut être utilisé dans un solide",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "criticalSuccess": {
            "text": "Double la quantité"
        }
    },
    {
        "id": "airCreation",
        "name": "Étincelle",
        "icon": "icons/magic/water/bubbles-air-water-blue.webp",
        "description": "Après avoir frotté ses pieds sur le sol à plusieurs reprises (idéalement sur un tapis), l'élémentaliste émet une légère décharge électrostatique sur une cible.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "1 de dégât"
        },
        "criticalSuccess": {
            "text": "4 de dégât"
        },
        "damage": {
            "rollFormula": "return \"2\";",
            "element": "electric",
            "text": "2"
        }
    },
    {
        "id": "spark",
        "name": "Mégaphone",
        "icon": "icons/magic/light/hand-sparks-glow-yellow.webp",
        "description": "L'élémentaliste augmente considérablement le volume de sa voix, pouvant être entendu très loin.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "text": "1 minute par arcane"
        },
        "area": {
            "value": 300,
            "unit": "m",
            "text": "300 mètres"
        },
        "bonus": {
            "text": "Permet d’être entendu à 300 m."
        },
        "criticalSuccess": {
            "text": "Double la distance"
        }
    },
    {
        "id": "megaphone",
        "name": "Smug",
        "icon": "icons/tools/instruments/megaphone.webp",
        "description": "Un épais nuage de poussière entoure l'élémentaliste, permettant de le cacher ainsi que ses coéquipiers, sur une zone de 5 mètres de diamètre. Donne 2 points de pénalité sur la perception de tous ceux dans la zone. Il faut faire un jet de perception pour trouver une nouvelle cible. ",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "Trois tours"
        },
        "area": {
            "text": "4 mètres. +1 mètre par niveau d’arcane."
        },
        "bonus": {
            "text": "Pénalité de 2 point sur  les jets utilisant la caractéristique de Perception"
        },
        "criticalSuccess": {
            "text": "Double le rayon du sort"
        },
        "actions": {
            "addEffect": {
                "name": "Ajouter l'effet",
                "type": "addEffect",
                "data": {
                    "duration": {
                        "value": "3",
                        "unit": "tours"
                    },
                    "effectName": "Smug",
                    "modifiers": [
                        {
                            "stat": "per",
                            "value": -2
                        }
                    ]
                }
            }
        }
    }
]
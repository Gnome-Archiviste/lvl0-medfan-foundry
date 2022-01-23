export default [
    {
        "id": "waldenArmor",
        "name": "Armure magique de Walden",
        "icon": "icons/magic/fire/beam-strike-whip-red.webp[a]",
        "description": "Donne une armure qui absorbe dix (10) points de dégâts au magicien, dure 5 tours ou dix points de dégâts (l’armure disparaît après 5 tours même si tous les points de dégâts n’ont pas été utilisés). Ne peut pas s’additionner à d’autres sorts de protections qui absorbent les dégâts.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "text": "5 tours ou tous utilisés"
        },
        "area": {
            "text": "Magicien"
        },
        "bonus": {
            "text": "10 points de dégâts absorbés"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "magicMouth",
        "name": "Bouche magique",
        "icon": "icons/creatures/abilities/mouth-teeth-tongue-purple.webp",
        "description": "Ce sort imprègne un objet d’une bouche enchantée qui apparaît et prononce son message lorsqu’un événement spécifié se produit. Le message, qui doit contenir un maximum de dix (10) mots par niveaux d'arcane du magicien, peut être rédigé dans n’importe quelle langue connue par le magicien. La bouche ne peut pas lancer de sorts.\n\nLe sort s’active lorsque les conditions spécifiques définies par le magicien sont remplies. Les commandes peuvent être aussi générales ou détaillées que souhaité, bien que seuls les déclencheurs visuels et sonores puissent être utilisés. Le sort réagit à ce qui semble être réel : les déguisements et les illusions peuvent le tromper. L’obscurité normale n’empêche pas un déclencheur visuel, mais l’obscurité magique ou l’invisibilité le font. Le mouvement silencieux ou le silence magique empêchent les déclencheurs sonores. Les déclencheurs sonores peuvent être attribués à des types généraux de bruits ou à un bruit spécifique ou à un mot prononcé. Une bouche magique ne peut pas distinguer le niveau d’un personnage, ses points de vie ou de mana ou même sa classe. La limite de portée d’un déclencheur est de un (1) mètre par niveau d’arcane du magicien. Le message peut-être délivré un maximum de deux (2) fois par niveau d’arcane du magicien.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "jusqu'à ce que le message soit délivré 2 fois par niveau d’arcane."
        },
        "area": {
            "text": "Déclenche à (1) mètre par niveau du magicien"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "talithaBuble",
        "name": "Bulle de Talitha",
        "icon": "icons/magic/water/bubbles-air-water-pink.webp",
        "description": "Créer une bulle entourant la cible, la soulevant dans les airs. La bulle ne peut pas être dirigée (sauf par du vent assez fort). La bulle de Talitha est très fragile (la bulle possède six (6) points de vie), on peut la faire disparaître en la piquant avec un objet pointu (armes, griffes, roche, etc.). Sa durée est hasardeuse et elle peut disparaître à tout moment.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "3 tours + 2d6 (tiré par le maître de jeu)."
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La bulle est deux fois plus résistante (12 points de vie)"
        }
    },
    {
        "id": "animatedRope",
        "name": "Corde animée",
        "icon": "icons/sundries/survival/rope-coiled-tan.webp",
        "description": "Une corde bouge sur ordre du magicien selon des actions simples : se tendre, attacher, s’enrouler, etc.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5 * context.arcaneLevel",
            "unit": "tours",
            "text": "5 tours par niveau d’arcane"
        },
        "area": {
            "text": "Longueur de la corde"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "talithaSneezing",
        "name": "Éternuement de Talitha",
        "icon": "icons/magic/sonic/scream-wail-shout-teal.webp",
        "description": "En soufflant dans le creux de sa main, le magicien envoie une poussière magique qui déclenche de puissants éternuements chez la victime. La victime est immobilisée pour 2 tours. Empêche un magicien de lancer des sorts.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
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
            "text": "Faire un test par tour pour ne pas avoir l’effet du nuage pour ce tour."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        }
    },
    {
        "id": "illumination",
        "name": "Illumination",
        "icon": "icons/sundries/survival/rope-coiled-tan.webp[b]",
        "description": "Éblouis une créature (une tête seulement) (-1 aux jets d’attaque, -2 aux habiletés observer, pister et détection de la magie). ",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "value": 3,
            "unit": "tours",
            "text": "3 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "-1 aux jets d’attaque, -2 aux habiletés observer, pister et détection de la magie"
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
                        "value": 3,
                        "unit": "tours"
                    },
                    "effectName": "Illumination",
                    "modifiers": [
                        {
                            "skill": "mage.detect_magic",
                            "value": -2
                        },
                        {
                            "skill": "general.observation",
                            "value": -2
                        },
                        {
                            "skill": "ranger.tracking",
                            "value": -2
                        },
                        {
                            "skill": "combat.dodge",
                            "value": -1
                        },
                        {
                            "skill": "combat.melee_combat",
                            "value": -1
                        },
                        {
                            "skill": "combat.throw_shoot",
                            "value": -1
                        },
                        {
                            "skill": "champion.shield_attack",
                            "value": -1
                        },
                        {
                            "skill": "warrior.charge",
                            "value": -1
                        },
                        {
                            "skill": "warrior.two_handed_combat",
                            "value": -1
                        },
                        {
                            "skill": "combat.hand_combat",
                            "value": -1
                        }
                    ]
                }
            }
        }
    },
    {
        "id": "stinkingCloud",
        "name": "Nuage puant",
        "icon": "icons/magic/acid/dissolve-pool-bubbles.webp",
        "description": "Déclenche une zone nauséabonde de 2 mètres de rayon. Les victimes ne peuvent plus attaquer ou jeter des sorts. Mais ils peuvent se défendre ou bouger à la moitié de leur déplacement normal. ",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 3",
            "value": 3,
            "unit": "tours",
            "text": "3 tours"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "bonus": {
            "text": "rends les victimes inoffensives"
        },
        "resilience": {
            "text": "On fait un test par tour pour ne pas avoir l’effet du nuage pour ce tour."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "mudTrap",
        "name": "Piège de boue",
        "icon": "icons/magic/nature/trap-spikes-thorns-green.webp",
        "description": "Immobilise les victimes pendant trois (3) tours sur une distance de 3 mètres carrés. Les victimes ne peuvent plus se déplacer.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 3,
            "unit": "tours",
            "text": "3 tours"
        },
        "area": {
            "value": 3,
            "unit": "m",
            "text": "3 mètres"
        },
        "bonus": {
            "text": "Victimes immobilisées"
        },
        "resilience": {
            "text": "On fait un test par tour pour ne pas avoir l’effet du piège pour ce tour."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        }
    },
    {
        "id": "firstHeal",
        "name": "Premiers soins",
        "icon": "icons/magic/life/crosses-trio-red.webp",
        "description": "Guérit un coéquipier de 1d6 points de vie. Ne s’applique pas magicien lui-même. Ne peut pas dépasser le maximum de points de vie. Au lieu de guérir, ce sort fait du dommage sur les morts-vivants.",
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
            "text": "Guérit 1d6 points de vie"
        },
        "resilience": {
            "text": "Aucune (moitié du dommage pour les morts-vivants)"
        },
        "criticalSuccess": {
            "text": "Guérit 6 points de vie"
        },
        "heal": {
            "rollFormula": "if (context.criticalSuccess) { return '6' } return '1d6';"
        }
    },
    {
        "id": "deafness",
        "name": "Surdité",
        "icon": "icons/svg/deaf.svg",
        "description": "Rends une victime sourde pour trois (3) tour par niveau d’arcane. La perception de la victime est réduite de deux et ne peut plus utiliser l’habileté Écouter.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "3 tours par niveau d’arcane du magicien"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "-2 perceptions. Habilité Écouter impossible."
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
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
    }
]

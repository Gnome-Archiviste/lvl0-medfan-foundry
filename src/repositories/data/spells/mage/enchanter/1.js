export default [
    {
        "id": "alarm",
        "name": "Alarme",
        "icon": "icons/magic/sonic/bell-alarm-red-purple.webp",
        "description": "Protège une zone ou une pièce d’un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancer du sort) entre dans la zone, on entend le son d’une cloche. A partir d’arcane 5, l’alarme peut être mental. Elle est entendue dans la tête du magicien et des personnes présentes durant le lancer du sort. ",
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
        "id": "waldenArmor",
        "name": "Armure magique de Walden",
        "icon": "icons/magic/defensive/shield-barrier-blue.webp",
        "description": "Donne une armure qui absorbe dix (10) points de dégâts au magicien, dure 5 tours ou dix points de dégâts (disparaît après 5 tours même si tous les points de dégâts n’ont pas été utilisés). Ne peut pas s’additionner à d’autres sorts de protections qui absorbent les dégâts.",
        "distance": {
            "text": "Enchanteur"
        },
        "duration": {
            "text": "5 tours ou tous utilisés"
        },
        "area": {
            "text": "Enchanteur"
        },
        "bonus": {
            "text": "10 points de dégâts absorbés"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false,
        "actions": {
            "addEffect": {
                "name": "Ajouter l'effet",
                "type": "addEffect",
                "data": {
                    "duration": {
                        "value": "5",
                        "unit": "tours"
                    },
                    "effectName": "Armure magique de Walden",
                    "magicArmor": {
                        "value": 10
                    }
                }
            }
        }
    },
    {
        "id": "spark",
        "name": "Étincelle",
        "icon": "icons/magic/light/hand-sparks-glow-yellow.webp",
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
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "spiderHand",
        "name": "Main de l’araignée",
        "icon": "icons/creatures/webs/web-spider-glowing-purple.webp",
        "description": "Ce sort donne le pouvoir de se déplacer le long des murs et des plafonds à la cible comme s’il s’agissait d’une araignée. Cette dernière se déplace à un demi-mouvement de base sur des surfaces verticales et inversées. Les mains et les pieds doivent être découverts afin d’entrer en contact direct avec la surface à grimper.\n\n\n\n",
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
            "text": "Déplacement sur toute surface."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "moonStone",
        "name": "Pierres de lune",
        "icon": "icons/commodities/currency/coin-engraved-moon-silver.webp",
        "description": "L'enchanteur infuse une lueur dans de petites pierres (maximum 5). Pour activer une pierre, l’utilisateur n'a qu’à la cogner contre une surface dure (la semelle d’une botte, le plat d’une arme ou la boucle d’une ceinture suffit). Une fois activée, la pierre illumine pendant 30 minutes avec la moitié de la force d’une torche puis s'éteint, redevenant une simple pierre à la fin du sort. Ce sort ne requiert pas de fixateur.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "Jusqu’à 5 pierres"
        },
        "bonus": {
            "text": "Permet de voir dans la nuit"
        },
        "criticalSuccess": {
            "text": "créer jusqu’à 8 pierres. Les pierres manquantes apparaissent d'elles-mêmes."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "healingPotion",
        "name": "Potion de soin",
        "icon": "icons/consumables/potions/potion-tube-corked-red.webp",
        "description": "L’enchanteur prépare une potion claire et rougeâtre dans un grand chaudron contenant entre autres du sang de troll (9 gouttes), une pincée de poudre de perlépipein et du jus de pomme (1 litre) et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions de soin par mana dépensées durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "le chaudron"
        },
        "bonus": {
            "text": "Donne 6 pv à la cible"
        },
        "criticalSuccess": {
            "text": "fait 4 potions par mana au lieu de 3."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "failedPotion",
        "name": "Potion ratée",
        "icon": "icons/consumables/potions/potion-flash-open-blue.webp",
        "description": "L’enchanteur utilise n’importe quelle potion (idéalement les inutilisables) et lui infuse de l’énergie magique en la secouant vigoureusement avant de la lancer sur son adversaire. Au contact, elle explose infligeant 1d6-2 points de dégâts. Cependant, comme l’enchanteur lance la potion il doit aussi réussir un jet de lancer/tir.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "la potion"
        },
        "bonus": {
            "text": "Accessoirement fait de la place dans votre inventaire"
        },
        "criticalSuccess": {
            "text": "fait le maximum de dommage."
        },
        "damage": {
            "rollFormula": "return '1d6-2';",
            "text": "1d6-2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "healthSyringes",
        "name": "Seringues de santé",
        "icon": "icons/weapons/thrown/dart-feathered.webp",
        "description": "L'enchanteur infuse un peu d’essence de vie dans de petites fléchettes de sarbacane (maximum 5) en les faisant mariner dans une fiole de potion de soin au moins 8 heures. Les darts s’utilisent avec une sarbacane de portée. Une fois la cible touchée, la cible reçoit 1 seul point de vie qui peut la ramener à la vie puis redevient une simple bout de bois. Ce sort requiert 5 darts en bois de cèdre, une potion de soin mais ne requiert pas de fixateur.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "jusqu’à 5 darts"
        },
        "bonus": {
            "text": "Guérit 1 point de vie[a]"
        },
        "criticalSuccess": {
            "text": "Guérit 2 points de vie"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "sesame",
        "name": "Sésame",
        "icon": "icons/sundries/misc/lock-open-yellow.webp",
        "description": "Déverrouille les portes qui ne sont pas verrouillées magiquement. Attention, le sort n’enlève pas les pièges.",
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
            "text": "Déverrouille les portes"
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
        "description": "Guérit le magicien de 1d6 points de vie. Ne s’applique pas aux coéquipiers. Ne peut pas dépasser le maximum de points de vie.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Enchanteur"
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
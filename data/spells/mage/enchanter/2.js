export default [
    {
        "id": "armeEnchantee",
        "name": "Arme enchantée",
        "icon": "icons/magic/weapons/daggers/dagger-magical-glowing-blue.webp",
        "description": "Transforme les dégâts normaux d’une arme en dégâts magiques et permet ainsi de toucher les créatures qui requièrent ce type de dégâts pour les combattre. ex: fantôme, vampires, morts-vivants.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "transforme les dégâts normaux en dégâts magiques"
        },
        "criticalSuccess": {
            "text": "Ajouté 6 de dégâts"
        }
    },
    {
        "id": "auraDePlacebo",
        "name": "Aura de Placébo",
        "icon": "icons/consumables/drinks/clay-jar-glowing-orange-blue.webp",
        "description": "Met sur un objet non magique un aura qui semble être magique ainsi qu’une utilité toute aussi fausse. ex: potion de chance sur une bouteille d’eau colorée verte.",
        "distance": {
            "text": "Touché"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Un objet"
        },
        "criticalSuccess": {
            "text": "Permanant"
        }
    },
    {
        "id": "boulePuante",
        "name": "Boule puante",
        "icon": "icons/magic/unholy/orb-smoking-green.webp",
        "description": "Dans un contenant composé de 2 ½ sphères se vissant l’une sur l’autre sur lequel il a gravé un glyphe de déclenchement, l’enchanteur verse une concoction d’oeufs pourris et de satyrs puants (champignons) en bouillie, ce qui déclenche une zone nauséabonde de 2 mètres de rayon lorsque  quelqu’un s’en approche à moins de 50 cm. Les victimes ne peuvent plus attaquer ou jeter des sorts. Mais ils peuvent se défendre ou bouger la moitié de leur déplacement normal. ",
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
            "text": "Victimes inoffensives"
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
        "id": "braoulebDePouvoir",
        "name": "Braoule[b] de pouvoir",
        "icon": "icons/tools/hand/hammer-mallet-brown.webp",
        "description": "L’enchanteur imbue d’énergie magique un objet de la vie de tous les jours, qui habituellement ne fait pas vraiment de dégât, afin que ce dernier devienne une arme qui inflige 1d6-2 de dégât. ex: balai, braoule, louche, brosse à cheveux...",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "value": 1,
            "unit": "objet",
            "text": "1 objet"
        },
        "bonus": {
            "text": "aucun"
        },
        "resilience": {
            "text": "On fait un test par tour pour ne pas avoir l’effet du nuage pour ce tour."
        },
        "criticalSuccess": {
            "text": "fait 4 points de dégâts"
        },
        "damage": {
            "rollFormula": "return '1d6-2';",
            "text": "1d6-2"
        }
    },
    {
        "id": "fixateurMagique",
        "name": "Fixateur magique",
        "icon": "icons/skills/wounds/blood-cells-vessels-blue.webp",
        "description": "L’enchanteur prépare une potion transparente sentant fortement le fixatif à cheveux dans un grand chaudron contenant entre autres un os à moelle, une pincée de poudre de perlépipein et de la résine de conifère (gros comme un œuf). Cette potion doit bouillir pendant 2 heures. L’enchanteur fait 5 fixateurs magiques par 2 points de mana dépensées durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Le chaudron"
        },
        "bonus": {
            "text": "Prépare un objet pour recevoir un sort. Permet de préparer dix (10) feuilles, deux (2) baguettes ou un (1) objet magique."
        },
        "criticalSuccess": {
            "text": "Fait 6 potions par 2 points de mana au lieu de 5."
        }
    },
    {
        "id": "glypheDeDeclenchement",
        "name": "Glyphe de déclenchement",
        "icon": "icons/sundries/scrolls/scroll-runed-white.webp",
        "description": "L’enchanteur grave sur un objet (habituellement contenant un piège) un glyphe représentant un carré avec une flèche pointant vers le bas. Toute personne approchant de l’objet à moins de 50 cm déclenchera le glyphe qui ouvrira ou activera l’objet sur lequel il est gravé.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "tant que le glyph n’est pas activé"
        },
        "area": {
            "text": "un objet"
        },
        "bonus": {
            "text": "Permet d’activer un objet sans être présent"
        },
        "criticalSuccess": {
            "text": "Le glyphe est encore bon pour un 2e déclenchement."
        }
    },
    {
        "id": "meteorites",
        "name": "Météorites",
        "icon": "icons/magic/earth/projectiles-stone-salvo.webp",
        "description": "L’enchanteur ensorcelle jusqu’à 3 petites pierres qui se mettent en orbite autour de sa tête. Lorsqu’il en a besoin, il peut s’en servir comme projectile en faisant un jet de lancer/tir comme action. Chaque pierre fait 1d6-2. L’enchanteur ne peut avoir plus de 5 météorites en orbite autour de lui.",
        "distance": {
            "text": "20 m."
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "1-3 cible"
        },
        "bonus": {
            "text": "Laisse les mains libres"
        },
        "criticalSuccess": {
            "text": "Fait 5 météorites (ceux manquants apparaissent comme par magie)."
        },
        "damage": {
            "rollFormula": "return '1d6-2';",
            "text": "1d6-2"
        }
    },
    {
        "id": "objetAnime",
        "name": "Objet animé",
        "icon": "icons/tools/hand/brush-paint-pink.webp",
        "description": "L’enchanteur donne un semblant de vie à un objet qui bouge sur l’ordre de celui-ci selon des actions simples et non-offensives : nettoyer les carreaux, s’empiler, balayer la pièce, s’enrouler, etc.",
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
            "text": "une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "potionDeMana",
        "name": "Potion de mana",
        "icon": "icons/consumables/potions/bottle-conical-corked-blue.webp",
        "description": "L’enchanteur prépare une potion claire et bleuté dans un grand chaudron contenant entre autre une amanite (champignon), une pincée de poudre de perlépipein et de la pulpe de coing (1 kilogramme) et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions de soin par point de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.\n\n\n\n",
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
            "text": "Donne 6 points de mana à la cible"
        },
        "criticalSuccess": {
            "text": "fait 4 potions par mana au lieu de 3."
        }
    },
    {
        "id": "premiersSoins",
        "name": "Premiers soins",
        "icon": "icons/magic/life/heart-hand-gold-green.webp",
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
    }
]

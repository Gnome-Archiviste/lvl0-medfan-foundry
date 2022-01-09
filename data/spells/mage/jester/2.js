export default [
    {
        "id": "PlaceboAura",
        "name": "Aura de Placébo",
        "icon": "icons/magic/control/voodoo-doll-pain-damage-green.webp",
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
            "text": "Permanent"
        }
    },
    {
        "id": "stinkingBomb",
        "name": "Bombe puante",
        "icon": "icons/magic/acid/projectile-glowing-bubbles.webp",
        "description": "Déclenche une zone nauséabonde de 2 mètres de rayon. Les victimes ne peuvent plus attaquer ou jeter des sorts. Mais ils peuvent se défendre ou bouger la moitié de leur déplacement normal. ",
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
            "text": "On fait un test par tour pour ne pas avoir l’effet du sort pour ce tour."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        }
    },
    {
        "id": "magicMouth",
        "name": "Bouche magique",
        "icon": "icons/creatures/abilities/mouth-teeth-tongue-purple.webp",
        "description": "Ce sort imprègne un objet d’une bouche enchantée qui apparaît et prononce son message lorsqu’un événement spécifié se produit. Le message, qui doit contenir un maximum de dix (10) mots par niveaux d'arcane du bouffon, peut être rédigé dans n’importe quelle langue connue par le bouffon. La bouche ne peut pas lancer de sorts.\n\nLe sort s’active lorsque les conditions spécifiques définies par le bouffon sont remplies. Les commandes peuvent être aussi générales ou détaillées que souhaité, bien que seuls les déclencheurs visuels et sonores puissent être utilisés. Le sort réagit à ce qui semble être réel : les déguisements et les illusions peuvent le tromper. L’obscurité normale n’empêche pas un déclencheur visuel, mais l’obscurité magique ou l’invisibilité le font. Le mouvement silencieux ou le silence magique empêchent les déclencheurs sonores. Les déclencheurs sonores peuvent être attribués à des types généraux de bruits ou à un bruit spécifique ou à un mot prononcé. Une bouche magique ne peut pas distinguer le niveau d’un personnage, ses points de vie ou de mana ou même sa classe. La limite de portée d’un déclencheur est de un (1) mètre par niveau d’arcane du magicien. Le message peut-être délivré un maximum de deux (2) fois par niveau d’arcane du bouffon.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "jusqu'à ce que le message soit délivré 2 fois par niveau d’arcane."
        },
        "area": {
            "text": "Déclenche à (1) mètre par niveau du bouffon"
        },
        "criticalSuccess": {
            "text": "Double la durée"
        }
    },
    {
        "id": "animatedRope",
        "name": "Corde animée",
        "icon": "icons/sundries/survival/rope-coiled-tan.webp",
        "description": "Une corde bouge sur ordre du bouffon selon des actions simples : se tendre, attacher, s’enrouler, etc.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "2 tours + 1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Longueur de la corde"
        },
        "criticalSuccess": {
            "text": "Double la durée"
        }
    },
    {
        "id": "IceCreamCone",
        "name": "Cornet glacé",
        "icon": "icons/magic/water/projectile-ice-snowball.webp",
        "description": "Fait tomber du ciel une boule de crème glacée géante sur l’ennemi (saveur au choix du MdJ), suivi d’un cornet gaufré. Le nombre de boules augmente avec le nombre d’arcane du bouffon.",
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
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "Ajoute 1d6 de dégât car une cerise confite s’additionne à la confection."
        },
        "damage": {
            "rollFormula": "return '(1d6/2) * ' + context.actorData.computedData.magic.arcaneLevel;",
            "text": "1d6/2 par niveau d’arcane"
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
        "id": "TalitaPartialInvisibility",
        "name": "Invisibilité éphémère de Talitha",
        "icon": "'icons/magic/symbols/triangle-glow-purple.webp'",
        "description": "Le sort ne fonctionne que sur les objets non vivants et immobiles pesant moins que le bouffon qui le lance. Cela rend un objet temporairement invisible. Si l’objet est déplacé, le sort est annulé. L’objet ne peut pas mesurer plus d’un mètre de haut ou de large.",
        "distance": {
            "text": "Touché"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "Un objet"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "ChimericWall",
        "name": "Paroie chimérique",
        "icon": "icons/magic/defensive/barrier-shield-dome-blue-purple.webp",
        "description": "Ce sort crée l’illusion d’un mur, d’un sol, d’un plafond ou d’une surface similaire. Il semble absolument vrai, mais les objets physiques peuvent le traverser sans difficulté. Lorsque le sort est utilisé pour cacher des fosses, des pièges ou des portes normales, toutes les capacités de détection qui ne nécessitent pas le sens de la vue fonctionnent normalement. Toucher ou sonder la surface révèle sa nature illusoire, bien que cela ne fasse pas disparaître l’illusion. Il affecte une zone de trois (3) mètres sur trois (3) mètres sur trente (30) cm.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "PainfulLaughter",
        "name": "Rires pénibles",
        "icon": "icons/magic/death/projectile-skull-flaming-yellow.webp",
        "description": "Ce sort inflige le sujet d’un rire incontrôlable. Il s’effondre en rafales de rire maniaque, tombant à plat ventre. Le sujet ne peut rien faire en riant, mais il peut toujours se défendre. La victime rit tellement qu’elle en a mal aux côtes. L’armure est ignorée.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Durée divisée par deux."
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience"
        },
        "damage": {
            "text": "1d6-2 de dégâts"
        }
    },
    {
        "id": "Switcharoo",
        "name": "Switcharoo",
        "icon": "icons/skills/toxins/poison-bottle-open-blood-red.webp",
        "description": "Échanger le contenu de deux bouteilles de liquide (comme des potions). Malheureusement, c’est au hasard entre les bouteilles. Le maître jeu décide quelles bouteilles sont échangées.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "criticalSuccess": {
            "text": "Échange le contenu de trois bouteilles"
        }
    }
]
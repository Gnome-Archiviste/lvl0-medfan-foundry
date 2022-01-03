export default [
    {
        "id": "acidCreation",
        "name": "Création mineure d'acide",
        "icon": "icons/magic/acid/pouring-gas-smoke-liquid.webp",
        "description": "Crée ½ litre d'acide par niveau d’arcane de l’élémentaliste. Ne peut pas être utilisé comme attaque sur un adversaire.",
        "distance": {
            "value": 1,
            "unit": "m",
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
        }
    },
    {
        "id": "cobra",
        "name": "Cobra",
        "icon": "icons/magic/death/skeleton-snake-skull-pink.webp",
        "description": "En ouvrant la bouche bien grande, l'élémentaliste crée un projectile acide de ses glandes salivaires. Si la cible est touchée, le magicien lance un dé et si le résultat est 1 (un), l’adversaire est aveuglé pour un tour. ",
        "distance": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Chance d’aveugler l’adversaire"
        },
        "resilience": {
            "text": "Moitié des dégâts"
        },
        "criticalSuccess": {
            "text": "La cible est automatiquement aveuglée"
        },
        "damage": {
            "rollFormula": "return '1d6/2';",
            "element": "acid",
            "text": "1d6/2"
        }
    },
    {
        "id": "stinkingCloud",
        "name": "Nuage puant",
        "icon": "icons/magic/acid/dissolve-pool-bubbles.webp",
        "description": "Déclenche une zone nauséabonde de 2 mètres de rayon. Les victimes ne peuvent plus attaquer ou jeter des sorts, mais ils peuvent se défendre ou bouger de la moitié de leur déplacement normal. ",
        "distance": {
            "value": 5,
            "unit": "m",
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
        "id": "toxicCloud",
        "name": "Nuage toxique",
        "icon": "icons/magic/acid/dissolve-bone-ribs-skull.webp",
        "description": "L’élémentaliste émet une vapeur verdâtre et nauséabonde de sous sa robe de magie qui vient l’envelopper. Toute personne prise dans le nuage reçoit 2 points de dommage sans tenir compte de l’armure. L’élémentaliste n’est pas affecté par le dommage.",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "value": 3,
            "unit": "tours",
            "text": "3 tours"
        },
        "area": {
            "text": "2 mètres de rayons autour de l’élémentaliste"
        },
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "element": "acid",
            "text": "2 dégâts (passe armure)"
        }
    },
    {
        "id": "corrosiveTouch",
        "name": "Toucher corrosif",
        "icon": "icons/magic/acid/dissolve-drip-droplet-smoke.webp",
        "description": "Les mains de l’élémentaliste sont entourées d'un aura vert pâle scintillant qui rend leur toucher très corrosif par nature. Le toucher de l’élémentaliste inflige 1d6 points de dégâts d’acide.",
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
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '1d6';",
            "element": "acid",
            "text": "1d6"
        }
    }
]
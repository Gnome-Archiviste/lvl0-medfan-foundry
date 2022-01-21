export default [
    {
        "id": "mud",
        "name": "Boue au visage",
        "icon": "icons/magic/earth/projectile-stone-landslide.webp",
        "description": "L’élémentaliste prend une poignée de boue dans ses mains et l’envoie au visage de son adversaire, la boue entrant dans les yeux, le nez et la bouche, infligeant seulement un peu de dégâts et permettant à l’élémentaliste de s’éloigner un peu. ",
        "distance": {
            "text": "Trois (3) mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Permet de s’éloigner de deux (2) mètres de l’adversaire après l’attaque."
        },
        "resilience": {
            "text": "L’élémentaliste ne peut pas fuire."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double les dégâts (pré-calculé)'; } return 'Double les dégâts';",
            "text": "Double les dégâts"
        },
        "damage": {
            "rollFormula": "if (context.criticalSuccess) { return '(' + ('1d6/2') + ')*2'; } return '1d6/2';",
            "text": "1d6/2"
        }
    },
    {
        "id": "earthCreation",
        "name": "Création mineure de terre",
        "icon": "icons/creatures/magical/spirit-earth-stone-magma-yellow.webp",
        "description": "Créer 1 m² de terre fertile dans n’importe quel terrain, par arcane de l'élémentaliste.",
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
            "text": "Créer 2 m² de terre par arcane de l'élémentaliste."
        }
    },
    {
        "id": "mitraille",
        "name": "Mitraille",
        "icon": "icons/magic/earth/projectiles-stone-salvo.webp",
        "description": "L'élémentaliste projette de petites pierres qui mitraillent sa cible (2 pierres par niveau d’arcane) et qui font 1 point de dégât par pierre. Comme la magie opère sur les pierres et non la cible, le sort ne peut être absorbé ou renvoyé. Pour la même raison, il est impossible de faire un jet de résilience.\n\n\n\n",
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
        "criticalSuccess": {
            "text": "Ignore l’armure."
        },
        "damage": {
            "text": "2 dégâts par niveau d’arcane"
        }
    },
    {
        "id": "earthFist",
        "name": "Poing de pierre",
        "icon": "icons/magic/earth/strike-fist-stone-light.webp",
        "description": "Le poing de l’élémentaliste deviennent de pierre, lui permettant de donner un coup de poing plus puissant qu'il ne le pourrait normalement, infligeant son Physique + deux (2) en dégâts à son adversaire.",
        "distance": {
            "text": "L’élémentaliste"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "L’élémentaliste"
        },
        "resilience": {
            "text": "Dégâts divisés par deux (2)."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas éviter."
        },
        "damage": {
            "text": "Physique + deux (2)"
        }
    },
    {
        "id": "quicksand",
        "name": "Sable mouvant",
        "icon": "icons/magic/movement/chevrons-down-yellow.webp",
        "description": "Le sol se transforme en sable mouvant et immobilise les victimes pendant trois (3) tours sur une distance de 3 mètres carrés. Les victimes ne peuvent plus se déplacer car si elles bougent, elles s’enfoncent encore plus.",
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
            "text": "La cible ne peut pas faire de test de résilience"
        }
    }
]
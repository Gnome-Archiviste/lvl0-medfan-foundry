export default [
    {
        "id": "nuageIncendiaire",
        "name": "Nuage incendiaire",
        "icon": "icons/magic/fire/projectile-embers-orange.webp",
        "description": "Ce sort crée un nuage de fumée mouvementée traversé par des braises chauffées à blanc. La fumée obscurcit toute vue, ce qui donne 2 points de pénalité sur leur perception (il faut faire une perception pour trouver un nouvel adversaire). Le sort affecte une zone de 21x21 mètres.\n\n\n\n\n\nDe plus, les braises chauffées à blanc dans le nuage infligent 4d6+3 points de dégâts de feu à chaque tour. Le sort ne fonctionne pas sous l’eau.\n\n\n\n",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "width": 21,
            "height": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Déplacement et perception divisé par deux."
        },
        "resilience": {
            "text": "Divise le dommage par deux. Faire a chaque tour qu’une personne est dans le nuage"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "text": "4d6+3 par tour"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "orbeEnflammeDeKegan",
        "name": "Orbe enflammé de Kegan",
        "icon": "icons/magic/fire/projectile-fireball-orange-yellow.webp",
        "description": "Sphère de feu que l’élémentaliste peut diriger avec un doigt. La boule de feu peut tourner des murs par exemple.",
        "distance": {
            "text": "45 mètres."
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
            "element": "fire",
            "text": "1d6 par niveau d’arcane"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "robeDeFeu",
        "name": "Robe de feu",
        "icon": "icons/magic/fire/elemental-fire-flying.webp",
        "description": "Avec une seule pensée, un cercle de feu scintillant jaillit à l’entour de l’élémentaliste. Le cercle mesure de 5x5 mètres. Ce dernier suit l’élémentaliste.\n\n\n\n\n\nLa robe de feu inflige 5d6 blessures de feu à toute créature entrant ou le traversant. Si l’élémentaliste évoque la robe pour qu’il apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers l’anneau.\n\n\n\n\n\nL’élémentaliste ne peut pas maintenir la robe indéfiniment, la robe dure un (1) tour par niveau d’arcane de l’élémentaliste.\n\n\n\n",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "text": "5d6"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "tempeteDeFeu",
        "name": "Tempête de feu",
        "icon": "icons/magic/fire/beam-jet-stream-spiral-yellow.webp",
        "description": "Une flamme élémentaire déchaînée remplit la zone d'effet de 7x7 mètres et tourbillonnant, causant 55 points de dégâts (sans armure) à tout ce qu’elle touche. \n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
        },
        "area": {
            "width": 7,
            "height": 7,
            "text": "7x7 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux. À faire à chaque tour qu’une personne est dans la tempête de feu."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return \"55\";",
            "text": "55"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "immuniteAuFeu",
        "name": "Immunité au feu",
        "icon": "icons/magic/defensive/shield-barrier-flaming-pentagon-red.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection complète contre le feu. Le sort annule le dommage produit par le feu, que la source des dégâts soit naturelle ou magique. L'élémentaliste doit toucher la cible.",
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
            "text": "Annule les dégâts causés par le feu"
        },
        "criticalSuccess": {
            "text": "Retourne la moitié des dégâts à celui qui les inflige."
        },
        "dependsOnArcaneLevel": false
    }
]
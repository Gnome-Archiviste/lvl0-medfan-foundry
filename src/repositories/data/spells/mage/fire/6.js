export default [
    {
        "id": "basan",
        "name": "Basan",
        "icon": "icons/creatures/birds/chicken-hen-white.webp",
        "description": "Le sort appelle un Basan. Un genre de coq géant qui crache du feu mais il est principalement utilisé comme monture par l’élémentaliste. Le basan apparaît pour une (1) heure par arcane.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "eruptionExplosive",
        "name": "Éruption explosive",
        "icon": "icons/magic/fire/flame-burning-earth-yellow.webp",
        "description": "L'élémentaliste fait jaillir du sol un puissant jet de lave de 3 m. de haut + 3 m. par niveau d’arcane",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "instantanée"
        },
        "area": {
            "width": 5,
            "widthPerArcane": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double les dégâts (pré-calculé)'; } return 'Double les dégâts';",
            "text": "Double les dégâts"
        },
        "damage": {
            "rollFormula": "if (context.criticalSuccess) { return '(' + ('3d6+' + (1 * context.arcaneLevel)) + ')*2'; } return '3d6+' + (1 * context.arcaneLevel);",
            "text": "3d6 + (1 par niveau d’arcane)"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "murDeFeu",
        "name": "Mur de feu",
        "icon": "icons/magic/fire/beam-jet-stream-trails-orange.webp",
        "description": "Avec une seule pensée, un mur de feu scintillant jaillit à la demande de l’élémentaliste. Le mur mesure dix (10) mètres de haut, fait un (1) mètre par niveau d’arcane de l’élémentaliste de largeur et deux (2) mètres de profondeur.\n\nLe mur inflige 5d6 blessures de feu à toute créature entrant ou traversant le mur. Si l’élémentaliste évoque le mur pour qu’il apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers le mur.\n\nL’élémentaliste peut maintenir le mur indéfiniment en se concentrant pour le faire, ou peut renoncer à une concentration continue (faire un test de concentration par tour, et l’élémentaliste ne peut que faire ce test durant le tour), auquel cas le mur durera un (1) tour par niveau d’arcane de l’élémentaliste.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "1 mètre de largeur par niveau d’arcane"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "Les créatures dans la zone (ou entrant dans la zone) ne peuvent pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "text": "5d6"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "petarade",
        "name": "Pétarade",
        "icon": "icons/magic/fire/explosion-fireball-small-red.webp",
        "description": "Voici un sort sournois, souvent utilisé contre les voleurs mais difficile à réaliser car il utilise une combinaison peu commune d’habiletés. L’élémentaliste invoque le sort devant lui, comme à l’habitude mais l’effet, une explosion mineure accompagnée d’un bruit de pétard, se produit juste derrière lui, infligeant 3d6 + 6 points de dégât à la personne derrière lui.",
        "distance": {
            "text": "1 mètres derrière l’élémentaliste"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Élémentaliste"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "Maximum de dégâts"
        },
        "damage": {
            "rollFormula": "return '3d6+6';",
            "text": "3d6 + 6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "runesExplosive",
        "name": "Runes explosive",
        "icon": "icons/magic/symbols/runes-star-pentagon-orange-purple.webp",
        "description": "Le magicien dessine sur une surface un symbole. Lorsqu’un ennemi s’en approche à moins de soixante (60) centimètre, une explosion fait quatre (4) dés de dégâts sur toutes les créatures se trouvant dans une zone de 11x11 mètres.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Jusqu’à l’utilisation (Préparation 2 minutes)"
        },
        "area": {
            "width": 11,
            "widthPerArcane": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "Dégât 8d6"
        },
        "damage": {
            "rollFormula": "return '4d6';",
            "text": "4d6"
        },
        "dependsOnArcaneLevel": false
    }
]
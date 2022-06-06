export default [
    {
        "id": "cubeGelatineuxDeDelatrefliere",
        "name": "Cube gélatineux de Delatrèflière",
        "icon": "icons/magic/acid/dissolve-bone-ribs-skull.webp",
        "description": "Appelle un cube gélatineux docile à odeur de lime comme destrier qui digère tout adversaire sur son passage, parfait pour défendre l’élémentaliste. L’élémentaliste s’asseoit sur une tranche de lime confite sur le dessus du cube. La victime doit faire un épreuve d’évasion pour éviter de se faire digérer.",
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
            "text": "Aucune"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "deflagrationGazeuse",
        "name": "Déflagration gazeuse",
        "icon": "icons/magic/air/fog-gas-smoke-swirling-green.webp",
        "description": "Voici un sort sournois et quelque peu… répugnant, souvent utilisé contre les voleurs mais difficile à réaliser car il doit être fait sans regarder la ou les cibles derrière. L’élémentaliste invoque le sort devant lui, comme à l’habitude mais l’effet, une explosion mineure, accompagnée d’une forte odeur d’oeufs pourris et d’un son de dégonflement se produit juste derrière lui, infligeant 3d6 points de dégât à la cible(s) derrière lui. Les victimes tombent inconscientes et ont besoin d'un antidote pour se réveiller.",
        "distance": {
            "text": "1 mètres derrière l’élémentaliste"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 3,
            "height": 3,
            "text": "3x3 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "victime(s) tombe inconsciente(s)"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "Maximum de dégâts"
        },
        "damage": {
            "rollFormula": "return '3d6';",
            "text": "3d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "desintegration",
        "name": "Désintégration",
        "icon": "icons/magic/earth/strike-body-stone-crumble.webp",
        "description": "Désintègre des objets non vivants fixes. L'élémentaliste doit toucher l’objet pendant une minute.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Après une minute"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Durée instantané"
        },
        "damage": {
            "text": "Détruit"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "emousser",
        "name": "Émousser",
        "icon": "icons/commodities/metal/fragments-sword-steel.webp",
        "description": "Votre contact corrode le fer et les alliages, divisant les dégâts que fait une arme par 2. Il faut faire réparer l’arme pour lui redonner ses pleins dégâts (ne fonctionne qu’une fois par arme).",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Jusqu’à ce que l’arme soit réparée"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Réduit les dégâts des armes de l’ennemi"
        },
        "resilience": {
            "text": "Annule le sort"
        },
        "criticalSuccess": {
            "text": "L’arme est détruite."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "murDacide",
        "name": "Mur d’acide",
        "icon": "icons/magic/defensive/shield-barrier-flaming-pentagon-green.webp",
        "description": "Jaillissant d’une fissure dans le sol, un mur de vapeurs acides apparaît à la demande de l’élémentaliste. Le mur mesure dix (10) mètres de haut, fait un (1) mètre par niveau d’arcane de l’élémentaliste de largeur et deux (2) mètres de profondeur.\n\nLe mur inflige 5d6 blessures d’acide à toute créature entrant ou traversant le mur. Si l’élémentaliste évoque le mur pour qu’il apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers le mur.\n\nL’élémentaliste peut maintenir le mur indéfiniment en se concentrant pour le faire, ou peut renoncer à une concentration continue (faire un test de concentration par tour, et l’élémentaliste ne peut que faire ce test durant le tour), auquel cas le mur durera un (1) tour par niveau d’arcane de l’élémentaliste.",
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
            "text": "Double la largeur"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "element": "acid",
            "text": "5d6"
        },
        "dependsOnArcaneLevel": true
    }
]
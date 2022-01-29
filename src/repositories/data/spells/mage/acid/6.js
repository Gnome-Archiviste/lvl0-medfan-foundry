export default [
    {
        "id": "desintegration",
        "name": "Désintégration",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
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
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
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
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
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
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "element": "acid",
            "text": "5d6"
        },
        "dependsOnArcaneLevel": true
    }
]
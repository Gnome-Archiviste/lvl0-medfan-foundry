export default [
    {
        "id": "desintegration",
        "name": "Désintégration",
        "description": "Désintègre des objets non vivants fixes. L'élémentaliste doit toucher l’objet pendant une minute.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "text": "Après une minute"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Durée instantané"
        },
        "damage": {
            "text": "Détruit"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "emousser",
        "name": "Émousser",
        "description": "Votre contact corrode le fer et les alliages, divisant les dégâts que fait une arme par 2. Il faut faire réparer l’arme pour lui redonner ses pleins dégâts (ne fonctionne qu’une fois par arme).",
        "distance": {
            "type": "touch"
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
            "text": "L’arme est détruite."
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "murDacide",
        "name": "Mur d’acide",
        "description": "Jaillissant d’une fissure dans le sol, un mur de vapeurs acides apparaît à la demande de l’élémentaliste. Le mur mesure dix (10) mètres de haut, fait un (1) mètre par niveau d’arcane de l’élémentaliste de largeur et deux (2) mètres de profondeur.\nLe mur inflige 5d6 blessures d’acide à toute créature entrant ou traversant le mur. Si l’élémentaliste évoque le mur pour qu’il apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers le mur.\nL’élémentaliste peut maintenir le mur indéfiniment en se concentrant pour le faire, ou peut renoncer à une concentration continue (faire un test de concentration par tour, et l’élémentaliste ne peut que faire ce test durant le tour), auquel cas le mur durera un (1) tour par niveau d’arcane de l’élémentaliste.",
        "distance": {
            "value": 5,
            "unit": "m"
        },
        "duration": {
            "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
            "unit": "tours"
        },
        "area": {
            "text": "1 mètre de largeur par niveau d’arcane"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "element": "acid"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
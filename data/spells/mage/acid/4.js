export default [
    {
        "id": "jetDacide",
        "name": "Jet d’acide",
        "description": "L’élémentaliste crache un jet d’acide qui touche la première personne sur son trajet.",
        "distance": {
            "value": 20,
            "unit": "m"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Aucun test de résilience possible"
        },
        "damage": {
            "rollFormula": "return '2d6+' + (4 * context.actorData.computedData.magic.arcaneLevel);",
            "element": "acid"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "pluieDacide",
        "name": "Pluie d’acide",
        "description": "L’élémentaliste déclenche une forte pluie acide qui brûle la peau et ronge l’armure.",
        "distance": {
            "value": 10,
            "unit": "m"
        },
        "duration": {
            "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
            "unit": "tours"
        },
        "area": {
            "value": 5,
            "unit": "m"
        },
        "bonus": {
            "text": "Possibilité d’endommager l’armure"
        },
        "resilience": {
            "text": "L’armure des victimes ne fait plus que la moitié de la protection."
        },
        "damage": {
            "rollFormula": "return '3d6';",
            "element": "acid"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "postillonAcide",
        "name": "Postillon acide",
        "description": "L’élémentaliste envoie un jet d’acide dans les yeux d’une cible. Cela rend une tête de la victime aveugle pour un (1) tour par arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "m"
        },
        "duration": {
            "text": "1 tour/arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "-3 perception et toutes habilités de combats."
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "resistanceALacide",
        "name": "Résistance à l’acide",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre l’acide. Le sort réduit de moitié le dommage produit par l’acide, que la source des dégâts soit naturelle ou magique. L'élémentaliste doit toucher la cible.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par l’acide"
        },
        "resilience": {
            "text": "La cible est immunisée à l’acide"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "sourireScintillant",
        "name": "Sourire scintillant",
        "description": "Certains groupes de héros ont en fait été moins héroïques que leur légende. Ce sort en est partiellement la cause. Il permet d’avoir l’air plus héroïque que nature.\nLes dents de la cible deviennent d’un blanc éclatant et brillent comme celles d’une vedette de cinéma. Donne un + 1 en charisme.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "+ 1 en charisme"
        },
        "resilience": {
            "text": "+2 en charisme"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
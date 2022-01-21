export default [
    {
        "id": "jetDacide",
        "name": "Jet d’acide",
        "icon": "icons/magic/acid/projectile-stream-bubbles.webp",
        "description": "L’élémentaliste crache un jet d’acide qui touche la première personne sur son trajet.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible"
        },
        "damage": {
            "rollFormula": "return '2d6+' + (4 * context.arcaneLevel);",
            "element": "acid",
            "text": "2d6 + (4 par niveau d’arcane)"
        }
    },
    {
        "id": "pluieDacide",
        "name": "Pluie d’acide",
        "icon": "icons/magic/acid/projectile-beams-salvo-green.webp",
        "description": "L’élémentaliste déclenche une forte pluie acide qui brûle la peau et ronge l’armure.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "bonus": {
            "text": "Possibilité d’endommager l’armure"
        },
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "L’armure des victimes ne fait plus que la moitié de la protection."
        },
        "damage": {
            "rollFormula": "return '3d6';",
            "element": "acid",
            "text": "3d6"
        }
    },
    {
        "id": "postillonAcide",
        "name": "Postillon acide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste envoie un jet d’acide dans les yeux d’une cible. Cela rend une tête de la victime aveugle pour un (1) tour par arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
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
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        }
    },
    {
        "id": "resistanceALacide",
        "name": "Résistance à l’acide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre l’acide. Le sort réduit de moitié le dommage produit par l’acide, que la source des dégâts soit naturelle ou magique. L'élémentaliste doit toucher la cible.",
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
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par l’acide"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée à l’acide"
        }
    },
    {
        "id": "sourireScintillant",
        "name": "Sourire scintillant",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Certains groupes de héros ont en fait été moins héroïques que leur légende. Ce sort en est partiellement la cause. Il permet d’avoir l’air plus héroïque que nature. \n\nLes dents de la cible deviennent d’un blanc éclatant et brillent comme celles d’une vedette de cinéma. Donne un + 1 en charisme. ",
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
            "text": "+ 1 en charisme"
        },
        "criticalSuccess": {
            "text": "+2 en charisme"
        }
    }
]

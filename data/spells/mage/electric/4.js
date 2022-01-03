export default [
    {
        "id": "canonAAir",
        "name": "Canon à air",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le sort propulse jusqu’à un maximum de 2 cibles à 10 mètres de l'élémentaliste. N’éloigne pas les très grosses créatures comme les dragons.",
        "distance": {
            "text": "1 m"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "1-2 cible(s) en avant de l’élémentaliste"
        },
        "bonus": {
            "text": "Éloigne les ennemies"
        },
        "resilience": {
            "text": "Divise en deux la distance et les dégâts"
        },
        "criticalSuccess": {
            "text": "Double la distance"
        },
        "damage": {
            "rollFormula": "return '2d6+5';",
            "text": "2d6 +5"
        }
    },
    {
        "id": "flash",
        "name": "Flash",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste crée un éclair de lumière qui rend une tête de la victime aveugle pour un (1) tour par arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "m",
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
        "id": "piedDansLesNuages",
        "name": "Pied dans les nuages",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet à une cible de marcher dans le vide comme s’il avait un pont invisible sous ses pieds.",
        "distance": {
            "text": "2 mètre + 1 mètre/arcane"
        },
        "duration": {
            "text": "Jusqu’à ce que la cible ait traversé (ou fait la distance maximale)"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Marcher dans le vide 10 m. par niveau d’arcane"
        },
        "criticalSuccess": {
            "text": "Double la vitesse du mouvement"
        }
    },
    {
        "id": "ventDansLesCheveux",
        "name": "Vent dans les cheveux",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Certains groupes de héros ont été moins héroïques que leur légende. Ce sort en est partiellement la cause. Il permet d’avoir l’air plus héroïque que nature. \nUn vent tourne à l’entour de la cible et fait virevolter les cheveux de ce dernier comme dans les images de mannequin. Il permet aussi à la cape d’avoir des mouvements de super-héros. Donne un + 1 en charisme. ",
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
    },
    {
        "id": "voleeDeVolees",
        "name": "Volée de volées",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible reçoit une série de claques au visage.",
        "distance": {
            "value": 15,
            "unit": "m",
            "text": "15 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "resilience": {
            "text": "Divise les dégâts par deux"
        },
        "criticalSuccess": {
            "text": "Ignore l’armure"
        },
        "damage": {
            "rollFormula": "return context.actorData.computedData.magic.arcaneLevel + 'd6';",
            "element": "electric",
            "text": "1d6 par niveau d’arcane"
        }
    }
]
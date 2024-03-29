export default [
    {
        "id": "canonAAir",
        "name": "Canon à air",
        "icon": "icons/magic/air/weather-wind-gust.webp",
        "description": "Le sort propulse jusqu’à un maximum de 2 cibles à 10 mètres de l'élémentaliste. N’éloigne pas les créatures gigantesques comme les dragons.",
        "distance": {
            "text": "1 m"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "1 ou 2 cibles devant l’élémentaliste"
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
            "element": "physic",
            "text": "2d6 +5"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "flash",
        "name": "Flash",
        "icon": "icons/magic/light/explosion-star-glow-blue-purple.webp",
        "description": "L’élémentaliste crée un éclair de lumière qui rend une tête de la victime aveugle pour un (1) tour par arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
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
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "piedDansLesNuages",
        "name": "Pied dans les nuages",
        "icon": "icons/magic/air/wind-stream-blue-gray.webp",
        "description": "Ce sort permet à une cible de marcher dans le vide comme s’il avait un pont invisible sous ses pieds.",
        "distance": {
            "text": "2 mètres + 1 mètre par niveau d’arcane"
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
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "ventDansLesCheveux",
        "name": "Vent dans les cheveux",
        "icon": "icons/commodities/materials/hair-braid-gold.webp",
        "description": "Certains groupes de héros ont en réalité été moins héroïques que leur légende. Ce sort en est partiellement la cause. Il permet d’avoir l’air plus héroïque que nature. \n\nUn vent tourne à l’entour de la cible et fait virevolter les cheveux de ce dernier comme dans les images de mannequin. Il permet aussi à la cape d’avoir des mouvements de super-héros. Donne un + 1 en charisme. ",
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
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "voleeDeVolees",
        "name": "Volée de volées",
        "icon": "icons/magic/air/wind-swirl-gray-blue.webp",
        "description": "Les cibles dans la zone du sort reçoivent une série de claques au visage.",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
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
            "text": "Divise les dégâts par deux"
        },
        "criticalSuccess": {
            "text": "Ignore l’armure"
        },
        "damage": {
            "rollFormula": "return context.arcaneLevel + 'd6';",
            "element": "electric",
            "text": "1d6 par niveau d’arcane"
        },
        "dependsOnArcaneLevel": true
    }
]
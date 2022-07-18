export default [
    {
        "id": "berner",
        "name": "Berner",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Un double illusoire du bouffon apparaît, et en même temps, le bouffon est affecté par un sort d’invisibilité. Le bouffon est libre d’aller ailleurs pendant que le double du bouffon s’éloigne. Le double apparaît à portée du sort, mais se déplace ensuite en fonction de l’intention du bouffon au moment de l’incantation. Le bouffon fait apparaître son double parfaitement superposé sur son corps afin que les observateurs ne remarquent pas l’apparition d’une image tandis que le bouffon devient invisible. Le bouffon et le double peuvent alors se déplacer dans des directions différentes. Le double se déplace à la vitesse du bouffon et fait des gestes comme s’il était réel. Le double ne peut ni attaquer ni lancer de sorts, mais il peut prétendre le faire. Le double disparaît lorsqu’il se trouve à 100 mètres de son original.",
        "distance": {
            "text": "Soi-même"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Magicien"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "confusion",
        "name": "Confusion",
        "icon": "icons/creatures/amphibians/frog-confused-green-blue.webp",
        "description": "Désoriente la cible. Tous les jets avec des dés doivent être un succès exceptionnel étendu (double un, deux, trois, quatre ou cinq) pour fonctionner de façon normale (ne pas le compter comme un succès exceptionnel).",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5",
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Cible désorientée"
        },
        "resilience": {
            "text": "Doit être fait a chaque tour et annule l’effet du sort."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "devouement",
        "name": "Dévouement",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Les personnages bénéficient de +1 aux jets d’attaque, jets de dégâts et autres tests.",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1",
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "inondationDeMaisSouffle",
        "name": "Inondation de maïs soufflé",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce vilain tour ralentit même l’ennemi le plus implacable. Ce sort créera une averse de grains de maïs, qui remplira jusqu’à 1 mètre cube par niveau d’arcane du Bouffon. Puis ces grains se mettront à éclater pour devenir du maïs soufflé, infligent des blessures à ceux dans la zone. Le maïs soufflé lui-même est normal et peut avoir n’importe quelle saveur que le Bouffon souhaite. Peut être ramassé pour fournir 1 ration.",
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
            "text": "Déplacement divisé par 2"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "6d6 de dégâts"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "piedDansLaBouche",
        "name": "Pied dans la bouche",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Force la victime à dire la vérité.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "formula": "if (context.criticalSuccess) { return 10; } return 5",
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "value": 10,
            "unit": "tours",
            "text": "Durée 10 tours"
        },
        "dependsOnArcaneLevel": false
    }
]
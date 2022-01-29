export default [
    {
        "id": "creationDunGolemDeChair",
        "name": "Création d’un Golem de chair",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’enchanteur est capable de créer une construction connue sous le nom de golem de chair. L’enchanteur du golem doit travailler au moins 8 heures par jour, pendant au moins 5 jours, dans une pièce spécialement préparée. La chambre coûte 500 oricaux à établir.\n\nLes morceaux d’un golem de chair nécessitent un minimum de 6 parties corps différents, soit deux bras, deux jambes, le torse (comprenant la tête) et le cerveau. Cependant il est possible d’ajouter des membres additionnels. Dans certains cas, plusieurs organes peuvent être nécessaires. Assembler le corps nécessite un test d’Artisanat, de Science et de Soin réussi à chaque journée. Cela prend une journée complète pour assembler deux pièces ensemble.\n\nLorsqu’il ne travaille pas sur le sort et la création, l’enchanteur doit se reposer et ne peut effectuer n’importe quelle autre tâche sauf manger, dormir ou parler. Si l’enchanteur manque un jour, le processus échoue. À la toute fin, il doit réussir son sort de création de golem de chair. Le sort prend 1 heure sans interruption à faire.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Permanent"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Golem de chair"
        },
        "criticalSuccess": {
            "text": "Double le nombre de point de vie"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "maximiserDegat",
        "name": "Maximiser dégât",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet à une arme de toujours faire son maximum de dégâts pendant une scène. ",
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
            "text": "Une arme"
        },
        "bonus": {
            "text": "Dégâts physiques maximums"
        },
        "criticalSuccess": {
            "text": "Une journée"
        },
        "dependsOnArcaneLevel": false
    }
]
export default [
    {
        "id": "creationDunGolemDeChair",
        "name": "Création d’un Golem de chair",
        "description": "L’enchanteur est capable de créer une construction connue sous le nom de golem de chair. L’enchanteur du golem doit travailler au moins 8 heures par jour, pendant au moins 5 jours, dans une pièce spécialement préparée. La chambre coûte 500 oricaux à établir.\nLes morceaux d’un golem de chair nécessitent un minimum de 6 parties corps différents, soit deux bras, deux jambes, le torse (comprenant la tête) et le cerveau. Cependant il est possible d’ajouter des membres additionnels. Dans certains cas, plusieurs organes peuvent être nécessaires. Assembler le corps nécessite un test d’Artisanat, de Science et de Soin réussi à chaque journée. Cela prend une journée complète pour assembler deux pièces ensemble.\nLorsqu’il ne travaille pas sur le sort et la création, l’enchanteur doit se reposer et ne peut effectuer n’importe quelle autre tâche sauf manger, dormir ou parler. Si l’enchanteur manque un jour, le processus échoue. À la toute fin, il doit réussir son sort de création de golem de chair. Le sort prend 1 heure sans interruption à faire.",
        "distance": {
            "type": "touch"
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
        "resilience": {
            "text": "Double le nombre de point de vie"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "maximiserDegat",
        "name": "Maximiser dégât",
        "description": "Permet à une arme de toujours faire son maximum de dégâts pendant une scène.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "text": "Une arme"
        },
        "bonus": {
            "text": "Dégâts physiques maximums"
        },
        "resilience": {
            "text": "Une journée"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
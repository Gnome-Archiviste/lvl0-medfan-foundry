export default [
    {
        "id": "cercleDeTeleportation",
        "name": "Cercle de téléportation",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet de téléporter une personne ou un groupe de personnes vers un autre cercle de téléportation. Chaque cercle peut être relié à plusieurs autres cercles. Pour ce faire, un mot d’activation différent doit être utilisé pour chaque cercle de destination. L’enchanteur doit créer un cercle de 3 mètres de diamètre sur n’importe quelle surface horizontale suffisamment grande. Une fois que l’enchanteur a choisi une destination (et un mot d’activation), elle ne peut pas être modifiée. Mais, un deuxième sort peut-être lancé pour le lier à un autre cercle. Les emplacements des cercles doivent être connus de l’enchanteur.\n\nPour utiliser le cercle, une seule personne doit connaître le mot d’activation, mais chaque personne doit utiliser un point de mana pour activer le cercle. Un point supplémentaire par animal et véhicule qui accompagne les personnes utilisant le cercle.",
        "distance": {
            "text": "Touché"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Un objet"
        },
        "criticalSuccess": {
            "text": "&"
        },
        "dependsOnArcaneLevel": false
    },
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
        "id": "laboratoireMobileDeLuxisys",
        "name": "Laboratoire mobile de Luxisys",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet de créer une tour de deux étages de haut rétractable qui sert de laboratoire à l’enchanteur. L’enchanteur aura besoin d’une petite tour en bois ou en pierre de 4cm de haut ainsi que de la véritable tour (meublée ou non. Prévoir un coût d’au moins 10 000 oricaux), une potion cabalistique, une potion d’urgence ainsi qu’un sort d’alarme et de permanence (les sorts de permanence et d’alarme peuvent être sur parchemin). La construction et la figurine doivent êtres neuves. ",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "la tour"
        },
        "bonus": {
            "text": "Dégâts physiques maximums"
        },
        "criticalSuccess": {
            "text": "Double les points de vie de la tour ou ajouter un étage à la tour, au choix du MdJ."
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
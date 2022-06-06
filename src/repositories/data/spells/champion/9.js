export default [
    {
        "id": "bilanDeSante",
        "name": "Bilan de santé",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Indique où se trouvent les alliés et quel est leur état de santé. Ce sort requiert un objet personnel (qui lui a appartenu pendant plus d’un an) ou d’une mèche de cheveux d’un allié, ainsi qu’une plume d’une harpie (pour faire le sort).",
        "distance": {
            "type": "self",
            "text": "Champion"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "eclatDeRectitude",
        "name": "Éclat de rectitude",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le champion émet une lueur qui guérit les personnages bons de 35 points de vie et qui délivre 35 points de dégâts aux personnages mauvais dans une zone de 9x9 mètres autour du champion.",
        "distance": {
            "text": "champion"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 9,
            "height": 9,
            "text": "9x9 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Moitié des dégâts/ soins"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "exorcisme",
        "name": "Exorcisme",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Certaines créatures telles les esprits et les démons peuvent prendre possession du corps d’un mortel et les retourner contre ses coéquipiers. Avec ce sort, le champion délivre une victime autre que lui-même d’une possession.",
        "distance": {
            "value": 3,
            "unit": "mètre",
            "text": "3 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "premonition",
        "name": "Prémonition",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Lancer au coucher, le sort permet au champion de voir de l’information sur le futur probable durant ses rêves. Le champion se souvient de ses rêves prémonitoires. \n\nLe maître de jeu donne des indices sur un événement qui devrait (le plus possible) se passer dans la soirée. Permet au maître de jeu de donner des informations importantes que les joueurs auraient ratées.\n\nComme la prémonition est un rêve, celui-ci peut-être représentatif et non une image précise sur un événement.",
        "distance": {
            "text": "Soi-même"
        },
        "duration": {
            "text": "Durant le sommeil"
        },
        "area": {
            "text": "Champion"
        },
        "criticalSuccess": {
            "text": "Le prémonition est clair"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "regeneration",
        "name": "Régénération ",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort, lancé juste avant ou pendant le combat, permet au champion de guérir ses coéquipiers tout au long du combat, redonnant cinq (5) points de vie par tour. De plus, vingt (20) autres points de vie sont regagnés à la fin du combat. Le sort prend fin à la fin du combat, et ne il peut pas être lancé en dehors d’un combat",
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
            "width": 17,
            "height": 17,
            "text": "17x17 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "Soigne 10 point de vie par tour"
        },
        "dependsOnArcaneLevel": false
    }
]
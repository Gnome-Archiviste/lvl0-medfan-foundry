export default [
    {
        "id": "armureSulfurique",
        "name": "Armure sulfurique",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste fait apparaître une couche gélatineuse verte qui absorbe jusqu’à 50 points de dégâts. Le sort peut être fait sur l’élémentaliste ou un allié. L’élémentaliste doit toucher la cible. De plus, l’attaquant reçoit ¼ des points de dégâts fait à l’armure dû aux éclaboussures que celle-ci fait lorsqu’on l’attaque. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Tant que les 50 points ne sont pas utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe 50 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe 100 points de dégâts"
        },
        "dependsOnArcaneLevel": false
    }
]
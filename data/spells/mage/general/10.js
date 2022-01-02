export default [
    {
        "id": "annulationDeLaMagie",
        "name": "Annulation de la magie",
        "description": "Annule un sort de magicien d’arcane 10 ou moins. Annule un sort de magie spécialisé d’arcane 5 ou moins. Doit toucher la cible.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Annule un sort de non-magicien d’arcane 7 ou moins."
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "champDeForce",
        "name": "Champ de force",
        "description": "Dôme invulnérable et impénétrable pouvant contenir jusqu’à 6 personnes (collées) durant 5 tours. Ne se déplace pas.",
        "distance": {
            "type": "self"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5",
            "unit": "tours"
        },
        "area": {
            "value": 2,
            "unit": "m"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "depetrification",
        "name": "Dépétrification",
        "description": "Par un touché magique qui prend quelques minutes (environs 10 tours), la dépétrification part de la zone touchée et se répand tranquillement sur le corps.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 10,
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Dépétrification"
        },
        "resilience": {
            "text": "Instantané"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "partoutatis",
        "name": "Partoutatis",
        "description": "Un météore tombe sur la cible. Touche tout sur un 5 mètre de rayon. Ne peut pas se faire à l’intérieur.",
        "distance": {
            "value": 60,
            "unit": "m"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 5,
            "unit": "m"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '20d6+10';",
            "element": "physic"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "peauDeDiamant",
        "name": "Peau de diamant",
        "description": "Permet d’absorber 50 points de dégâts. Le sort peut être fait sur le magicien ou un allié. Le magicien doit toucher la cible. Le sort ne peut pas s’additionner à d’autres sorts de protections qui absorbent les dégâts.",
        "distance": {
            "type": "touch"
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
        "resilience": {
            "text": "Absorbe 100 points de dégâts"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "resurrection",
        "name": "Résurrection",
        "description": "Le magicien redonne vie et santé à une créature décédée. Le sort doit se faire dans les sept (7) jours suivant la mort ou plus longtemps si le mort a reçu un sort de conservation des cadavres. L’état des restes n’est pas un facteur, mais une petite partie du corps de la créature doit exister et être présente avant que la créature puisse être ressuscitée.\nSi la résurrection réussit à restaurer la vie, le sujet est guéri, mais retrouve ses points de vie du niveau 1, les appendices manquants sont restaurés, les maladies sont soignées, la folie est guérie et toutes les malédictions sont supprimées. Les attributs du personnage restent les mêmes qu’au moment de la mort. Les sorts actifs sur la créature avant la mort sont perdus. Aucun équipement ou possession de la créature morte n’est affecté de quelque manière que ce soit par ce sort.\nLa résurrection fonctionnera sur les créatures mortes-vivantes, les ramenant à leur état de vie, si bien sûr leur état date de moins de sept (7) jours. Cependant, la résurrection ne fonctionnera pas sur les créatures mortes depuis plus longtemps que sept (7) jours ou de vieillesse.\nC’est aussi un sort assez long à faire, il prend quelques minutes (environs 10 tours) et ne peut pas se faire durant un combat.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "text": "~10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Ramène à la vie avec le nombre de point de vie du niveau 1 de la cible"
        },
        "resilience": {
            "text": "Instantané"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "teleportation",
        "name": "Téléportation",
        "description": "Ce sort transporte instantanément le magicien, et une certaine quantité de personnes supplémentaires, vers n’importe quelle destination désignée. Toutes ces personnes ne peuvent pas totaliser plus d’une personne par niveau d’arcane du magicien. Le personnage doit avoir une idée claire de l’emplacement et de la disposition de la destination. Pour faire plus simple, l’emplacement doit être bien connu du magicien ou être visible.",
        "distance": {
            "type": "self"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 2,
            "unit": "m"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "tornade",
        "name": "Tornade",
        "description": "Crée une tornade magique qui se déplace dans la direction que le magicien lui donne, de 10 mètres par tour, mais elle touche tout sur son chemin, faisant 55 points de dégâts (sans armure) à tout ce qu’elle touche.",
        "distance": {
            "value": 10,
            "unit": "m"
        },
        "duration": {
            "value": 15,
            "unit": "tours"
        },
        "area": {
            "value": 3,
            "unit": "m"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return \"55\";"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
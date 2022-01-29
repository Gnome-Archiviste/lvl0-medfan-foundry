export default [
    {
        "id": "armageddon",
        "name": "Armageddon",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Créer un globe de 25 m. de rayon à partir du magicien, faisant 20d6 de dégâts. Tout être survivant à l’impact initial sera aussi propulsé à la limite du globe. Le magicien ne reçoit AUCUN dégât.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "value": 1,
            "unit": "tour",
            "text": "1 tour"
        },
        "area": {
            "text": "25 m."
        },
        "bonus": {
            "text": "propulse les adversaires restants à 25 m."
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '20d6';",
            "text": "20d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resurrectionAvance",
        "name": "Résurrection avancé",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le magicien redonne vie et santé à une créature décédée. Le sort doit se faire dans les quatorze (14) jours suivant la mort ou plus longtemps si le mort a reçu un sort de conservation des corps. L’état des restes n’est pas un facteur, mais une petite partie du corps de la créature doit exister et être présente avant que la créature puisse être ressuscitée.\n\nSi la résurrection réussie à restaurer la vie, le sujet est guérie, mais retrouve avec la moitié de ses points de vie (ou ses points de vie du niveau 1, si ceux ci sont plus grand que la moitié de son maximum), les appendices manquants sont restaurés, les maladies sont soignées, la folie est guérie et toutes les malédictions sont supprimées. Les attributs du personnage restent les mêmes qu’au moment de la mort. Les sorts actifs sur la créature avant la mort sont perdus. Aucun équipement ou possession de la créature morte n’est affecté de quelque manière que ce soit par ce sort.\n\nLa résurrection fonctionnera sur les créatures mortes-vivantes, les ramenant à leur état de vie, si bien sûr leur état date de moins de quatorze (14) jours. Cependant, la résurrection ne fonctionnera pas sur les créatures mortes depuis plus longtemps que quatorze (14) jours ou de vieillesse.\n\nC’est aussi un sort assez long à faire, il prend quelques minutes (environ 10 tours) et ne peut pas se faire durant un combat. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "~10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Ramène à la vie"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "rappelDeGroupe",
        "name": "Rappel de groupe",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet de téléporter les alliés jusqu’au au magicien, peu importe où ils sont.",
        "distance": {
            "text": "n/a"
        },
        "duration": {
            "value": 1,
            "unit": "tour",
            "text": "1 tour"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "n/a"
        },
        "dependsOnArcaneLevel": false
    }
]
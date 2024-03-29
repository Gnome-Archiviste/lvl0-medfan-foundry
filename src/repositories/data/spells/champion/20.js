export default [
    {
        "id": "passageALAutreCote",
        "name": "Passage à l’Autre côté",
        "icon": "icons/magic/light/orbs-hand-gray.webp",
        "description": "Le sort permet au champion de forcer un esprit malin (fantômes, spectre, banshee, etc.) à passer de l’Autre côté.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
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
        "id": "resurrectionAvance",
        "name": "Résurrection avancé",
        "icon": "icons/magic/life/heart-area-circle-red-green.webp",
        "description": "Le champion redonne vie et santé à une créature décédée. Le sort doit se faire dans les quatorze (14) jours suivant la mort ou plus longtemps si le mort a reçu un sort de conservation des corps. L’état des restes n’est pas un facteur, mais une petite partie du corps de la créature doit exister et être présente avant que la créature puisse être ressuscitée.\n\nSi la résurrection réussit à restaurer la vie, le sujet est guéri, se retrouve avec tous ses points de vie, les appendices manquants sont restaurés, les maladies sont soignées, la folie est guérie et toutes les malédictions sont supprimées. Les attributs du personnage restent les mêmes qu’au moment de la mort. Les sorts actifs sur la créature avant la mort sont perdus. Aucun équipement ou possession de la créature morte n’est affecté de quelque manière que ce soit par ce sort.\n\nLa résurrection fonctionnera sur les créatures mortes-vivantes, les ramenant à leur état de vie, si bien sûr leur état date de moins de quatorze (14) jours. Cependant, la résurrection ne fonctionnera pas sur les créatures mortes depuis plus longtemps que quatorze (14) jours ou de vieillesse.\n\nC’est aussi un sort assez long à faire, il prend quelques minutes (environ 10 tours) et ne peut pas se faire durant un combat.",
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
        "id": "secondSouffle",
        "name": "Second souffle",
        "icon": "icons/magic/holy/angel-winged-humanoid-blue.webp",
        "description": "Lorsque le champion gratifie un autre personnage de ce sort, si ce personnage meurt le sort se déclenche automatiquement. Dans 1d6 heures, le corps du personnage s'enflammera puis, lorsque le feu s’éteindra de lui-même, la cendre tombe du corps du personnage qui est revenu à la vie avec la moitié de ses points de vie. Le personnage est alors nu et doit prendre son temps pour se rééquiper. L'incantation de ce sort prend une heure.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 1,
            "unit": "heure",
            "text": "1 heure"
        },
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    }
]
export default [
    {
        "id": "baiseDeLaPrincesse",
        "name": "Baisé de la princesse",
        "description": "Sort de dépétrification, qui se fait par un baiser (sur la bouche) qui prend quelques minutes. La dépétrification part de la bouche et se répand tranquillement sur le corps.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "rollFormula": "return '3d6'",
            "unit": "minutes"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Instantané"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "eruptionSolaire",
        "name": "Éruption solaire",
        "description": "Une colonne de feu, de cinq (5) mètres de rayon, tombe du ciel et inflige une quantité effroyable de dégâts à tous ceux qu’elle touche.",
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
            "rollFormula": "return '20d6';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "phœnix",
        "name": "Phœnix",
        "description": "Lorsque le champion meurt, s’il lui reste 10 points de mana, le sort se déclenche automatiquement. Dans 1d6 heures, le corps du champion s'enflamme puis, lorsque le feu s’éteindra de lui-même, la cendre tombe du corps du champion qui est revenu à la vie avec la moitié de ses points de vie. Le champion est alors nu et doit prendre son temps pour se rééquiper.",
        "distance": {
            "type": "self"
        },
        "duration": {
            "text": "1d6 heures après la mort"
        },
        "area": {
            "text": "Une cible"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "resurrection",
        "name": "Résurrection",
        "description": "Le champion redonne vie et santé à une créature décédée. Le sort doit se faire dans les sept (7) jours suivant la mort ou plus longtemps si le mort a reçu un sort de conservation des corps. L’état des restes n’est pas un facteur, mais une petite partie du corps de la créature doit exister et être présente avant que la créature puisse être ressuscitée.\nSi la résurrection réussit à restaurer la vie, le sujet est guéri, mais se retrouve avec la moitié de ses points de vie. Les appendices manquants sont restaurés, les maladies sont soignées et toutes les malédictions sont supprimées. Les attributs du personnage restent les mêmes qu’au moment de la mort. Les sorts actifs sur la créature avant la mort sont perdus. Aucun équipement ou possession de la créature morte n’est affecté de quelque manière que ce soit par ce sort.\nLa résurrection fonctionnera sur les créatures mortes-vivantes, les ramenant à leur état de vie, si bien sûr leur état date de moins de sept (7) jours. Cependant, la résurrection ne fonctionnera pas sur les créatures mortes depuis plus longtemps que sept (7) jours ou de vieillesse.\nC’est aussi un sort assez long à faire, il prend quelques minutes (environ 10 tours) et ne peut pas se faire durant un combat.",
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
            "text": "Ramène à la vie"
        },
        "resilience": {
            "text": "Instantané"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "paramortus",
        "name": "Paramortus",
        "description": "Protections contre la magie nécromantique. Aucun sort nécromantique fonctionne sur la cible.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1",
            "unit": "scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Protection contre la nécromancie"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
export default [
    {
        "id": "cadenasMagique",
        "name": "Cadenas magique",
        "description": "Verrouille magiquement une porte ou une boîte. Ne peut pas être déverrouillé par Sésame. Le magicien doit toucher l’objet.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "text": "Jusqu’à l’ouverture"
        },
        "area": {
            "text": "Une cible"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "conservationDuCadavre",
        "name": "Conservation du cadavre",
        "description": "Ce sort préserve le cadavre ciblé afin qu’il ne se décompose pas, pendant trois (3) jours par niveau d’arcane du magicien. Ce sort prolonge le temps pour ressusciter la créature touchée d’entre les morts. Le sort fonctionne sur les parties du corps coupées et autres.\nLe sort se termine lorsque le cadavre est ressuscité des morts ou que le sort arrive au bout de sa durée.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 3 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "jours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Conserve un corps"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée de conservation (pré-calculé)'; } return 'Double la durée de conservation';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "deguisement",
        "name": "Déguisement",
        "description": "Ce sort fait apparaître une illusion qui donne au magicien l’apparence de son choix. Ce n’est qu’une illusion donc le magicien n’est pas vraiment plus grand, large, fort, etc. Il conserve ses propres caractéristiques.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "text": "1 heure par niveau d’arcane du magicien"
        },
        "area": {
            "text": "Magicien"
        },
        "resilience": {
            "text": "Double la durée du sort"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "detectionDesPassagesSecrets",
        "name": "Détection des passages secrets",
        "description": "Le magicien peut utiliser ce sort pour trouver des portes secrètes, des compartiments cachés, et autres zones cachées, spécialement construites pour échapper à la détection. Lorsque le sort est lancé, un halo doré révèle l'emplacement de la porte, du passage ou du compartiment secret.\nLe sort ne détecte pas les dangers naturels. Il ne détecte pas non plus les pièges magiques, ces derniers peuvent être détectés par un sort de détection de l’enchantement.",
        "distance": {
            "type": "self"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 5,
            "unit": "m"
        },
        "resilience": {
            "text": "Double la durée du sort"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "eclair",
        "name": "Éclair",
        "description": "Un éclair partant de la main du magicien vient frapper la victime désignée par celui-ci. Fait 1d6 + 2 de dégâts.",
        "distance": {
            "text": "10 m plus 1 m par niveau d’arcane du magicien"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '1d6+2';",
            "element": "electric"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "murmureDeDasha",
        "name": "Murmure de Dasha",
        "description": "Permet au magicien d’avoir une conversation chuchotée mais à distance. Cependant, le magicien doit pouvoir voir son interlocuteur.",
        "distance": {
            "value": 5,
            "unit": "m"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "racines",
        "name": "Racines",
        "description": "Fais jaillir des racines du sol qui immobilisent la victime pendant 5 tours. La victime peut se déprendre en réussissant un jet de l'habileté « Évasion ».",
        "distance": {
            "value": 10,
            "unit": "m"
        },
        "duration": {
            "value": 5,
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "respirerSousLeau",
        "name": "Respirer sous l’eau",
        "description": "La cible de ce sort peut respirer sous l’eau librement pendant 10 tours.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "sphereGlaceeDeTalitha",
        "name": "Sphère glacée de Talitha",
        "description": "Créer une boule glacée que le magicien envoie sur une victime. Cette dernière est figée pendant 2 tours.",
        "distance": {
            "value": 5,
            "unit": "m"
        },
        "duration": {
            "value": 2,
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '1d6';",
            "element": "water"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "visionClairObscure",
        "name": "Vision clair-obscure",
        "description": "Le sort permet au personnage touché par le sort de ne pas subir le malus de Perception dû à un éclairage non approprié. Cela veut dire que le sort annule le malus lorsque des personnages diurnes sont dans la noirceur ou que des personnages nocturnes sont dans la clarté.",
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
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
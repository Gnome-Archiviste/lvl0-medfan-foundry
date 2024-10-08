export default [
    {
        "id": "cadenasMagique",
        "name": "Cadenas magique",
        "icon": "icons/sundries/misc/lock-steel-blue.webp",
        "description": "Verrouille magiquement une porte ou une boîte. Ne peut pas être déverrouillé par Sésame. Le magicien doit toucher l’objet.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Jusqu’à l’ouverture"
        },
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "conservationDuCadavre",
        "name": "Conservation du cadavre",
        "icon": "icons/magic/time/clock-stopwatch-white-blue.webp",
        "description": "Ce sort préserve le cadavre ciblé afin qu’il ne se décompose pas, pendant trois (3) jours par niveau d’arcane du magicien. Ce sort prolonge le temps pour ressusciter la créature touchée d’entre les morts. Le sort fonctionne sur les parties du corps coupées et autres. \n\nLe sort se termine lorsque le cadavre est ressuscité des morts ou que le sort arrive au bout de sa durée.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 3 * context.arcaneLevel",
            "unit": "jours",
            "text": "3 jours par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Conserve un corps"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée de conservation (pré-calculé)'; } return 'Double la durée de conservation';",
            "text": "Double la durée de conservation"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "deguisement",
        "name": "Déguisement",
        "icon": "icons/environment/people/cleric-grey.webp",
        "description": "Ce sort fait apparaître une illusion qui donne au magicien l’apparence de son choix. Ce n’est qu’une illusion donc le magicien n’est pas vraiment plus grand, large, fort, etc. Il conserve ses propres caractéristiques.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "Magicien"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "detectionDesPassagesSecrets",
        "name": "Détection des passages secrets",
        "icon": "icons/environment/wilderness/mine-interior-dungeon-door.webp",
        "description": "Le magicien peut utiliser ce sort pour trouver des portes secrètes, des compartiments cachés, et autres zones cachées, spécialement construites pour échapper à la détection. Lorsque le sort est lancé, un halo doré révèle l'emplacement de la porte, du passage ou du compartiment secret. \n\nLe sort ne détecte pas les dangers naturels. Il ne détecte pas non plus les pièges magiques, ces derniers peuvent être détectés par un sort de détection de l’enchantement.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "Double la durée du sort[b]"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "lightning",
        "name": "Éclair",
        "icon": "icons/magic/lightning/bolt-strike-blue.webp",
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
            "text": "Divise le dommage par deux (arrondissement favorable)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '1d6+2';",
            "element": "electric",
            "text": "1d6 + 2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "dashaWhispering",
        "name": "Murmure de Dasha",
        "icon": "icons/svg/silenced.svg",
        "description": "Permet au magicien d’avoir une conversation chuchotée mais à distance. Cependant, le magicien doit pouvoir voir son interlocuteur.",
        "distance": {
            "text": "5 mètres + (3 mètres par niveau d’arcane)."
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "racines",
        "name": "Racines",
        "icon": "icons/magic/nature/root-vine-entangle-foot-green.webp",
        "description": "Fais jaillir des racines du sol qui immobilisent la victime pendant 5 tours. La victime peut se déprendre en réussissant un jet de l'habileté « Évasion ».",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime immobilisée"
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
        "id": "respirerSousLeau",
        "name": "Respirer sous l’eau",
        "icon": "icons/magic/water/bubbles-air-water-blue.webp",
        "description": "La cible de ce sort peut respirer sous l’eau librement pendant 10 tours.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "sphereGlaceeDeTalitha",
        "name": "Sphère glacée de Talitha",
        "icon": "icons/magic/water/orb-ice-opaque.webp",
        "description": "Créer une boule glacée que le magicien envoie sur une victime. Cette dernière est figée pendant 2 tours.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "value": 2,
            "unit": "tours",
            "text": "2 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "La victime n’est pas immobilisée"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '1d6';",
            "element": "water",
            "text": "1d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "visionClairObscure",
        "name": "Vision clair-obscure",
        "icon": "icons/magic/perception/eye-ringed-green.webp",
        "description": "Le sort permet au personnage touché par le sort de ne pas subir le malus de Perception dû à un éclairage non approprié. Cela veut dire que le sort annule le malus lorsque des personnages diurnes sont dans la noirceur ou que des personnages nocturnes sont dans la clarté.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1",
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    }
]
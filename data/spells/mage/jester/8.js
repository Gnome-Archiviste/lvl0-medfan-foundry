export default [
    {
        "id": "espritFaible",
        "name": "Esprit faible",
        "description": "Pendant 15 tours, la victime du sort ne peut plus faire de test où l’intelligence est requise.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 15,
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Ne peux plus utilisé d’intelligence"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "imageMiroir",
        "name": "Image miroir",
        "description": "Des doubles illusoires du bouffon apparaissent et imitent les actions de celui-ci, ce qui rend difficile pour les ennemis de savoir quelle cible attaquer. Le sort crée 1d6 images. Les doubles restent près du bouffon et disparaissent lorsqu’elles sont frappées. Les images restent dans un groupe ou forment une ligne, chacune à un (1) mètre d’un autre double ou du bouffon. Les observateurs ne peuvent pas utiliser la vision ou l’ouïe pour différencier le bouffon de ses doubles. Les ennemis qui tentent d’attaquer le magicien ou de lancer des sorts sur celui-ci doivent choisir parmi des cibles indiscernables. Généralement, lancez au hasard pour voir si la cible sélectionnée est réelle ou imaginaire. Tout jet d’attaque réussi contre un double le détruit. Un attaquant doit pouvoir voir les doubles pour être dupé.",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "text": "Bouffon"
        },
        "bonus": {
            "text": "1d6 doubles illusoires"
        },
        "resilience": {
            "text": "6 doubles"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "levitation",
        "name": "Lévitation",
        "description": "Ce sort permet au bouffon de voler de dans les airs. Il peut aussi se diriger. Il peut se déplacer de seulement huit (8) mètres par tour car ce vol n’est pas aussi naturel que la marche.\nIl ne permet pas au bouffon de se battre, mais il permet de lancer des sorts, s’il réussit un test de concentration (qui ne compte pas comme l’action du joueur pour ce tour). Le bouffon ne peut pas supporter plus de poids qu’une charge maximale normale.",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 8 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "ombrelleDinvisibilite",
        "name": "Ombrelle d’invisibilité",
        "description": "Toutes les créatures (y compris l’équipement transporté) à moins de trois (3) mètres du bouffon disparaissent de toutes les formes de vision naturelle. Les objets lâchés ou déposés par une créature invisible deviennent visibles ; les objets ramassés disparaissent s’ils sont rentrés dans les vêtements ou les pochettes portés par la créature. La lumière ne devient jamais invisible, bien qu’une source de lumière puisse le devenir (ainsi, l’effet est celui d’une lumière sans source visible). Toute partie d’un objet que le sujet porte, mais qui s’étend à plus trois (3) mètres de lui devient visible, comme une corde qui traîne.\nLe sort prend fin si le sujet attaque une créature. Dans ce cas, est considéré comme une attaque toute action ou sort infligeant des dégâts ou effets négatifs à une cible. Notez que les sorts affectant spécifiquement les alliés, mais pas les ennemis ne sont pas des attaques à cet effet, même lorsqu’ils incluent des ennemis dans leur zone. Les personnes affectées par ce sort ne peuvent ni se voir ni se voir. Toute créature affectée sortant de la zone devient visible, mais les créatures se déplaçant dans la zone après le lancement du sort ne deviennent pas invisibles.",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 3",
            "unit": "m"
        },
        "bonus": {
            "text": "Invisibilité"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double le rayon (pré-calculé)'; } return 'Double le rayon';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "passeMuraille",
        "name": "Passe-muraille",
        "description": "La cible peut traverser les parois solides pendant 15 tours. Le bouffon doit toucher la cible.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 15",
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "telekinesie",
        "name": "Télékinésie",
        "description": "En se concentrant, le lanceur peut déplacer un objet ou une créature pesant au maximum 150 kilogrammes jusqu’à 5 mètres par tour par la force de la pensée. Une créature peut annuler l’effet contre elle-même ou un objet qu’elle possède avec un test de résilience réussie.\nLe sort dure jusqu’à 1 tour par niveau d’arcane du bouffon, mais il se termine si le bouffon cesse de se concentrer (faire un test de concentration par tour, s’il fait autre chose que déplacer l’objet ou la personne). Le poids peut être déplacé dans n’importe quelle direction, mais pas au-delà de la portée du sort. Le sort se termine si un objet est forcé au-delà de la portée.",
        "distance": {
            "value": 45,
            "unit": "m"
        },
        "duration": {
            "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Double la durée et la vitesse"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
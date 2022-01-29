export default [
    {
        "id": "anneauDemiSel",
        "name": "Anneau demi-sel",
        "icon": "icons/equipment/finger/ring-cabochon-rounded-gold-teal.webp",
        "description": "L’enchanteur infuse de l’énergie magique dans une bague en or sertie d’une petite sélénite (pierre semi-précieuse transparente), permettant de bonifier une habileté que le joueur choisit au début de la séance de jeu\n\n",
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
            "text": "La bague"
        },
        "bonus": {
            "text": "+1 point dans une habileté générale choisie en début de partie."
        },
        "criticalSuccess": {
            "text": "Donne un bonus d’une seconde habileté choisie par le magicien."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "dissipationDeLaMagie",
        "name": "Dissipation de la magie",
        "icon": "icons/magic/control/silhouette-grow-shrink-tan.webp",
        "description": "Annule un sort de magie générale ou d’enchanteurs d’arcane 5 ou moins. Annule un sort de magie spécialisée d’arcane 2 ou moins. Doit toucher la cible.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Annule un sort de magicien d’arcane 6 et non-magicien d’arcane 3"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "effacer",
        "name": "Effacer",
        "icon": "icons/sundries/documents/paper-plain-white.webp",
        "description": "Ce sort supprime les écritures de nature magique ou non. En passant sa main lentement sur le texte, l’enchanteur  efface autant d’écritures que l’on peut trouver sur un parchemin ou jusqu’à deux pages d’un livre en poussant l’encre jusqu’au bas de la page, ne laissant qu’une goutte d’encre qui tombe au sol. Les écritures non magiques sont automatiquement effacées. ",
        "distance": {
            "text": "Touché"
        },
        "duration": {
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Un objet"
        },
        "criticalSuccess": {
            "text": "efface jusqu’à 4 pages"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "guerison",
        "name": "Guérison",
        "icon": "icons/magic/life/heart-hand-gold-green-light.webp",
        "description": "Guérit un coéquipier ou lui-même de 3d6 points de vie. Doit toucher la cible. Ne peut pas dépasser le maximum de points de vie. Au lieu de guérir, ce sort fait du dommage sur les morts-vivants.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Guérit 3d6 points de vie"
        },
        "resilience": {
            "text": "Aucune (moitié du dommage pour les morts-vivants)"
        },
        "criticalSuccess": {
            "text": "Guérit 18 points de vie"
        },
        "heal": {
            "rollFormula": "if (context.criticalSuccess) { return '18' } return '3d6';"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "invisibilite",
        "name": "Invisibilité",
        "icon": "icons/magic/perception/shadow-stealth-eyes-purple.webp",
        "description": "L’enchanteur (et tout son équipement) disparaît de toutes les formes de vision naturelle. Les objets lâchés ou déposés par une créature invisible deviennent visibles ; les objets ramassés disparaissent s’ils sont rentrés dans les vêtements ou les sacs portés par la créature. La lumière, cependant, ne devient jamais invisible, bien qu’une source de lumière puisse le devenir (ainsi, l’effet est celui d’une lumière sans source visible). Toute partie d’un objet que le sujet porte, mais qui s’étend à plus de trois (3) mètres de lui devient visible, comme une corde qui traîne. Le sort prend fin si le sujet attaque une créature. Dans ce cas, est considéré comme une attaque toute action ou sort infligeant des dégâts ou effets négatifs à une cible. Notez que les sorts affectant spécifiquement les alliés, mais pas les ennemis ne sont pas des attaques à cet effet, même lorsqu’ils incluent des ennemis dans leur zone. Les personnes affectées par ce sort ne peuvent se voir entre elles, ni elle-même. ",
        "distance": {
            "text": "Enchanteur"
        },
        "duration": {
            "text": "une (1) scène"
        },
        "area": {
            "text": "Le magicien"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "objetBelliqueux",
        "name": "Objet belliqueux",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’enchanteur donne un semblant de vie à un objet qui bouge sur l’ordre de celui-ci selon des actions simples mais qui peuvent être offensives : frapper quelqu’un ou quelque chose, hacher, abattre un arbre, fouetter , etc. Les dégâts infligés dépendent de l’objet.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5 * context.arcaneLevel",
            "unit": "tours",
            "text": "5 tours par niveau d’arcane"
        },
        "area": {
            "text": "une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "potionDeGuerison",
        "name": "Potion de guérison",
        "icon": "icons/consumables/potions/bottle-round-corked-red.webp",
        "description": "L’enchanteur prépare une potion claire et rougeâtre dans un grand chaudron contenant entre autre du sang de troll (100 ml), une pincée de poudre de perlépipein et de l’essence de cèdre (1 litre) et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions de soin par 4 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.\n\n*Un shaman peut faire une potion de solanine avec la même recette mais en changeant l’essence de cèdre pour de la purée de belladone.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "le chaudron"
        },
        "bonus": {
            "text": "Donne 20 points de vie à la cible"
        },
        "criticalSuccess": {
            "text": "fait 4 potions par mana au lieu de 3."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resistance",
        "name": "Résistance",
        "icon": "icons/magic/defensive/shield-barrier-flaming-diamond-blue-yellow.webp",
        "description": "L’enchanteur infuse à une cible l’énergie nécessaire pour la protéger contre la moitié des dégâts faits par un élément donné. L’enchanteur doit tenir en main le bon type de matériel qui servira de catalyseur au sort*.\n\nL’enchanteur infuse dans un objet l’énergie nécessaire pour protéger le porteur de l’objet contre la moitié des dégâts faits par un élément donné. L’objet en question doit être neuf et préalablement traité pour recevoir l’enchantement. De plus, il doit être certi du bon type de matériel qui servira de catalyseur au sort*. Pour que l'enchantement ne s’estompe pas à la fin de la première utilisation, il faut le sceller avec le sort de Permanence.\n\nVoici les résistances à utiliser avec ce sort:.\n\n* Résistance à l’acide: protection partielle contre les sorts d’acide.\n\n* Résistance à l’air / électricité: protection partielle contre les sorts d’air et d’électricité.\n\n* Résistance à l’eau / froid: protection partielle contre les sorts d’eau et de froid.\n\n* Résistance au feu: protection partielle contre le feu.\n\n*Liste des matériaux à utiliser:\n\n    * Acide: larme de verre\n\n    * Air/Électricité: morceau d’hématite\n\n    * Eau/froid: Pierre de flocon de neige obsidienne\n\n    * Feu: Pierre de soleil\n\n\n\n",
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
            "text": "Une cible"
        },
        "bonus": {
            "text": "divise les dégâts d’un élément par 2"
        },
        "criticalSuccess": {
            "text": "La résistance devient une immunité, ce qui veut dire que tous les dégâts de l’élément seront ignorés."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "voirLinvisible",
        "name": "Voir l’invisible",
        "icon": "icons/magic/perception/third-eye-blue-red.webp",
        "description": "Ce sort permet au destinataire de voir tous les êtres invisibles (incluant l’invisibilité magique), éthérés ou astraux comme s’ils étaient normalement visibles. Le sort ne permet pas de reconnaître les illusions ni de détecter les choses cachées par des moyens autres que l’invisibilité.\n\n\n\n",
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
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "La durée devient une journée"
        },
        "dependsOnArcaneLevel": false
    }
]
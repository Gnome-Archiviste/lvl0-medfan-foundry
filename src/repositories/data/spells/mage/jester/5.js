export default [
    {
        "id": "captiver",
        "name": "Captiver",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La beauté et les bonnes façons sont un pouvoir en soi. Pour ceux qui en sont favorisés, ils peuvent les utiliser de façons très crues. En lançant ce sort, la cible bénéficie d’une aura indéniablement captivante et la rend meilleure dans toutes les habiletés qui utilisent le charisme. Le sort confère un bonus (+1) aux habiletés qui utilisent le charisme. \n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "formula": "return context.arcaneLevel * 5;",
            "unit": "minutes",
            "text": "5 minutes par niveau d’arcane"
        },
        "area": {
            "text": "une cible"
        },
        "bonus": {
            "text": "+1 sur la statistique de Charisme."
        },
        "criticalSuccess": {
            "text": "double la durée du sort."
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "cordeRaide",
        "name": "Corde raide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet au bouffon de passer d’un point à un autre, séparés par du vide, en marchant sur une corde invisible. Le bouffon doit cependant voir le point d'arrivée et avoir un bâton de sa grandeur qu’il tiendra à l’horizontal pour maintenir son équilibre. Si le fil est invisible pour tous, le bouffon voit la corde comme un trait de lumière dorée. Si le bouffon veut emmener une ou plusieurs personnes avec lui, il doit le(s) transporter sur ses épaules car la corde n’existe pas pour eux. Les voyageurs supplémentaires doivent cependant réussir une épreuve de gymnastique à chaque 100 mètres pour rester en équilibre. Le bouffon peut emmener 1 personne par point supérieur à 3 dans sa statistique de force. ex. : Un bouffon avec 4 de Force peut emmener une seule personne.",
        "distance": {
            "text": "devant le bouffon"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "1x(100 par niveau d’arcane) mètres"
        },
        "resilience": {
            "text": "Aucune résilience"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "danseDuVoile",
        "name": "Danse du voile",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le bouffon danse et virevolte avec de grands voiles colorés, ce qui  rend le contour du sujet déformé, accordant un bonus de 1 point d’armure. Comme il est plus dur à voir, ce qui le rend plus difficile à toucher, ajoutant 1 point dans l’habileté Éviter.\n\nUn sort de « Voir l’invisibilité » ne neutralise pas l’effet de flou. Les adversaires qui ne peuvent pas voir le sujet ignorent l’effet du sort.",
        "distance": {
            "text": "Soi-même"
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
            "text": "+1 d’armure, +1 éviter"
        },
        "resilience": {
            "text": "aucun"
        },
        "criticalSuccess": {
            "text": "+2 d’armure, +2 éviter"
        },
        "damage": {
            "text": "aucun"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "deLaPierreAuxBonbons",
        "name": "De la pierre aux bonbons",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort permet au Bouffon de transformer la roche, le granit ou la pierre en une confiserie dure semi-transparente. Il est toujours délicieux et se décline en une variété de saveurs : raisin, papaye, orange, fraise, framboise, myrtille, cerise, cerise noire, citron, citron vert, réglisse, pomme, menthe poivrée, banane, caramel, vanille, mangue, melon, pastèque, mandarine, fruit de la passion et mélange (diffèrent chaque à mètre carré). Même les fortifications les plus puissantes sont devenues la proie de cette sottise, et les histoires abondent de voleurs qui ont léché leur sortie de prison...",
        "distance": {
            "text": "toucher"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "width": 5,
            "height": 5,
            "widthPerArcane": 2,
            "heightPerArcane": 2,
            "text": "(5 + 2 par niveau d’arcane)x(5 + 2 par niveau d’arcane) mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Peut servir de ration"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "deplacementPernicieux",
        "name": "Déplacement pernicieux",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Pour ce sort, deux créatures doivent être ciblées, le bouffon pouvant être l’une d'elles, changent instantanément de position. Un objet solide tel que le sol, un pont ou une corde doit relier les créatures. Les deux sujets doivent être à portée du sort.\n\nLes objets portés par les créatures (ne dépassant pas la charge maximale des créatures) les accompagnent, mais pas les autres créatures, même si elles sont portées par l’une des cibles. ",
        "distance": {
            "text": "(5+2 par niveau d’arcane)x(5+2 par niveau d’arcane) mètres"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "Aucune"
        },
        "resilience": {
            "text": "Annule le sort si l’une des cibles réussit"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "dissipationDeLaMagie",
        "name": "Dissipation de la magie",
        "icon": "icons/magic/symbols/triangle-glow-purple.webp",
        "description": "Annule un sort de buffon d’arcane 5 ou moins. Annule un sort des autres sortes de magie d’arcane 2 ou moins. Doit toucher la cible.",
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
            "text": "Annule un sort de buffon d’arcane 6 et non-buffon d’arcane 3"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "invisibiliteAccrueDeTalitha",
        "name": "Invisibilité accrue de Talitha",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le sort ne fonctionne que sur les objets non vivants et immobiles pesant moins que le bouffon qui le lance. Cela rend un objet temporairement invisible. Si l’objet est déplacé, le sort est annulé. L’objet ne peut pas mesurer plus d’un mètre de haut ou de large.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "jours",
            "text": "1 jour par niveau d’arcane"
        },
        "area": {
            "text": "un objet"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "invocationDunZanni",
        "name": "Invocation d’un Zanni",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Fait apparaître un type d’un démon servant pour combattre avec le bouffon. La créature a la peau blanche, des pieds et des mains démesurés, une chevelure hirsute flamboyante et un nez vermillon. La créature est habillée de vêtements aux couleurs criardes et ne cesse de rigoler de façon… malaisante. Attention, on ne peut avoir plus de deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient. Les caractéristiques de la créature : Phy=9, Int=7, Cha=4, Dex=8, Per=6 (aucune habileté), 80 points de vie.",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Un combat ou jusqu’à détruit"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "text": "130 points de vie"
        },
        "damage": {
            "rollFormula": "return '1d6+6';",
            "text": "1d6 + 6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "pelican",
        "name": "Pélican",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort crée un pélican qui suit le bouffon et transporte l’équipement, le trésor ou tout autre fardeau. Bien qu’il semble un pélican bien ordinaire, avec le même comportement que le vrai animal, ce dernier peut supporter jusqu’à 20 d’encombrement ou contenir jusqu’à 10 litres de liquide. Le pélican marche ou vole au niveau des épaules du bouffon en tout temps et reste toujours de niveau, bien qu’il ne puisse pas se déplacer plus vite que le bouffon ne marche normalement. Lorsque le sort se termine, qu’on inflige au pélican un total de 15 points de dégât d’un coup ou que le bouffon s’éloigne de plus de 15 mètres du pélican, il disparaît en laissant tomber son contenu.",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "text": "L’incantation peut transporter jusqu’à 40 d’encombrement"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "wedgieAtomique",
        "name": "Wedgie atomique",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Les victimes de ce sort vraiment diabolique trouveront leurs sous-vêtements accrochés de leur postérieur à leur tête pas une main invisible, puis tomberont. Cela fait que la malheureuse personne souffre maintenant d’une éruption cutanée pendant plusieurs jours (devinez où), parle d’une voix aiguë et marche drôlement, ce qui réduit son déplacement, pendant un certain nombre de tours. Sous-vêtements magiques non affectés. Personne n’a réclamé l’honneur de la création de ce sort.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "1d6 tour par arcane"
        },
        "area": {
            "text": "une cible"
        },
        "bonus": {
            "text": "Réduit le déplacement de la cible de moitié pendant 1 tour / arcane du bouffon"
        },
        "resilience": {
            "text": "Réduit les dégâts de moitié"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '2d6';",
            "text": "2d6"
        },
        "dependsOnArcaneLevel": false
    }
]
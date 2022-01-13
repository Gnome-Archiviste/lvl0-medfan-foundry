export default [
    {
        "id": "anneauDeFeu",
        "name": "Anneau de feu",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "En lançant ce sort, un cercle de feu scintillant jaillit à la demande de l’élémentaliste. Le cercle mesure deux (2) mètres de rayon à l’entour de l’élémentaliste. Le cercle ne peut pas se déplacer.\n\nL’anneau inflige 5d6 blessures de feu à toute créature entrant ou traversant. Si le magicien évoque l’anneau pour qu’il apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers l’anneau.\n\nDe base l’anneau dure un (1) tour par niveau d’arcane de l’élémentaliste. S’il le veut, l’élémentaliste peut maintenir l’anneau plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour. ",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "resilience": {
            "text": "Divise le dommage par deux. Faire a chaque tour qu’une créature est dans le feu de l’anneau"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "text": "5d6"
        }
    },
    {
        "id": "auraDeChaleur",
        "name": "Aura de chaleur",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le contour du sujet semble onduler sous l’effet de chaleur, accordant un bonus de 1 point d’armure. Comme il est plus dur à voir, ce qui le rend plus difficile à toucher, ajoutant 1 point dans l’habileté Éviter.\n\nUn sort de « Voir l’invisibilité » ne neutralise pas l’effet de flou. Les adversaires qui ne peuvent pas voir le sujet ignorent l’effet du sort.\n\n\n\n\n\nUn sort de « Voir l’invisibilité » ne neutralise pas l’effet de flou. Les adversaires qui ne peuvent pas voir le sujet ignorent l’effet du sort.\n\n\n\n",
        "distance": {
            "text": "toucher"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "une cible"
        },
        "bonus": {
            "text": "+1 d’armure, +1 éviter"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience[k]"
        }
    },
    {
        "id": "formeDeFeu",
        "name": "Forme de feu",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Une créature touchée et tout son équipement devient insubstantiel ressemblant à une flamme de gaz, générant de la chaleur, et aussi de la lumière équivalent à une torche. Dans cet état, la cible du sort ne peut pas être efficacement touchée ou interagit physiquement, devenant immunisée contre toute attaque qui n’est pas de nature magique. Il est aussi immunisé aux sorts de feux. La cible ne peut pas marcher, mais peut flotter à trois (3) mètres par tour. La cible peut également passer à travers de petits trous ou des ouvertures étroites, même de simples fissures, avec tout ce qu’il portait ou tenait, tant que le sort persiste. Par contre, il ne peut pas attaquer physiquement ou affecter les autres, ne peut pas lancer de sorts autres que ceux de feu. Si la cible tente d’entrer dans un liquide, il prend 3d6 de dégâts.\n\n\n\n",
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
        }
    },
    {
        "id": "lameEnflammee",
        "name": "Lame enflammée",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Allume une lame normale, provoquant + 1d6 de dégâts. Change les dégâts d’une arme en feu de froid pour une scène.\n\n\n\n",
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
            "text": "Une arme"
        },
        "bonus": {
            "text": "Tous les dégâts sont de feu"
        },
        "criticalSuccess": {
            "text": "Permanent"
        },
        "damage": {
            "element": "fire",
            "text": "+1d6"
        }
    },
    {
        "id": "missileThermique",
        "name": "Missile Thermique",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste invoque une boule de feu qui va frapper plusieurs cibles une à la suite de l’autre à moins de 60 mètres du magicien. L’éclair inflige 2d6 +9 points de dégâts à chacune des victimes. Le missile peut atteindre un maximum de victimes égales au niveau  d'arcane de l’élémentaliste. Tous les sujets peuvent tenter des jets de résilience pour la moitié des dégâts. Le magicien choisit les cibles, mais elles doivent toutes être à moins de 60 mètres au total (du magicien à la dernière cible). Aucune cible ne peut être touchée plus d’une fois. Le magicien peut choisir d’affecter moins de cibles que le maximum.\n\n\n\n",
        "distance": {
            "text": "60 mètres maximum"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Maximum de victimes égales à l’arcane du magicien"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut) chaque victime doit faire un test"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '2d6+9';",
            "text": "2d6 + 9"
        }
    }
]
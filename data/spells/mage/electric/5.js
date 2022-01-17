export default [
    {
        "id": "auraDePoussiere",
        "name": "Aura de poussière",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le contour du sujet semble flou, accordant un bonus de 1 point d’armure. Comme il est plus dur à voir, ce qui le rend plus difficile à toucher, ajoutant 1 point dans l’habileté Éviter.\n\nUn sort de « Voir l’invisibilité » ne neutralise pas l’effet de flou. Les adversaires qui ne peuvent pas voir le sujet ignorent l’effet du sort.",
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
            "text": "La cible ne peut pas faire de test de résilience[c]"
        }
    },
    {
        "id": "eclairEnChaine",
        "name": "Éclair en chaîne",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Un éclair jaillit du bout du doigt du magicien, frappant une cible puis se dirigeant vers d’autres cibles à moins de 60 mètres du magicien. L’éclair inflige 2d6 + (3 par victimes) points de dégâts à chacune des victimes (toujours le même nombre). La foudre peut atteindre un maximum de sept (7) victimes. Tous les sujets peuvent tenter des jets de résilience pour la moitié des dégâts. Le magicien choisit les cibles, mais elles doivent toutes être à moins de 60 mètres au total (du magicien à la dernière cible), et aucune cible ne peut être touchée plus d’une fois. Le magicien peut choisir d’affecter moins de cibles que le maximum.",
        "distance": {
            "text": "60 mètres."
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Maximum sept (7) victimes"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut) chaque victime doit faire un test"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "element": "electric",
            "text": "2d6 + (3 par victimes) sur chaque victime"
        }
    },
    {
        "id": "electrification",
        "name": "Électrification",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Change les dégâts d’une arme en dégât électrique pour une scène et ajoute 1d6.",
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
            "text": "+1d6, tous les dégâts sont électrique"
        },
        "criticalSuccess": {
            "text": "Permanent"
        }
    },
    {
        "id": "etatGazeux",
        "name": "État gazeux",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Une créature touchée et tout son équipement deviennent immatériel, apparaissant comme une forme brumeuse ressemblant à du brouillard. Dans cet état, le personnage ne peut pas être touché ou interagit physiquement, devenant immunisé contre toute attaque qui n’est pas de nature magique. Le personnage ne peut pas marcher, mais peut voler à 3 mètres par tour. Le personnage peut également passer à travers de petits trous ou des ouvertures étroites, même de simples fissures, avec tout ce qu’il portait ou tenait, tant que le sort persiste. Par contre, il ne peut pas attaquer physiquement ou affecter les autres, ne peut pas lancer de sorts autres que ceux d’air, et ne peut pas entrer dans l’eau ou d’autres liquides. Cela affecte une créature consentante.",
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
        "id": "sphereDeTesla",
        "name": "Sphère de Tesla",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "En lançant ce sort, une sphère d’énergie jaune scintillant jaillit au dessus de l’élémentaliste qui crée un cercle de protection mesurant deux (2) mètres de rayon à l’entour de l’élémentaliste. Le cercle ne peut pas se déplacer.\n\nL’anneau inflige 5d6 blessures d’électricité à toute créature entrant ou traversant le cercle. Si l’élémentaliste évoque la sphère pour qu'elle apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers l’anneau.\n\nDe base, la sphère et son anneau de protection dure un (1) tour par niveau d’arcane de l’élémentaliste. S’il le veut, l’élémentaliste peut maintenir l’anneau plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour. ",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "resilience": {
            "text": "Divise le dommage par deux (arrondi vers le bas). Faire a chaque tour qu’une créature"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "element": "electric",
            "text": "5d6"
        }
    },
    {
        "id": "estDansLanneau",
        "name": "                est dans l’anneau",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Succès remarquable : Aucun test de résilience possible.\n\nArcane 6\n\nAnguille\n\nExplosion sonore\n\nL’élémentaliste invoque un coup de tonnerre sonore, émanant de n’importe quel point jusqu’à 15 mètres, de distance et dans un cercle de 4 mètres de rayon. Toute créature dans la zone d’effet subit 4d6 dégâts et ne peut faire de jet d’Écouter pendant 5 tours.",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "value": 4,
            "unit": "m",
            "text": "4 mètres"
        },
        "bonus": {
            "text": "Annule l'habileté Écouter pendant 5 tours"
        },
        "resilience": {
            "text": "Fait la moitié des dommages seulement."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "text": "4d6 de dégâts"
        }
    },
    {
        "id": "mainParalysante",
        "name": "Main paralysante",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La main de l’élémentaliste est parcourue de petits arcs électriques ce qui permet à celui-ci d’infliger 5d6 de dégâts à une cible qu’il touche et de la paralyser pour 4 tours.\n\n\n\n",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 4",
            "value": 4,
            "unit": "tours",
            "text": "4 tours"
        },
        "area": {
            "text": "Élémentaliste"
        },
        "bonus": {
            "text": "Paralyse la cible pour 4 tours"
        },
        "resilience": {
            "text": "Aucune paralysie"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "damage": {
            "text": "5d6 de dégâts"
        }
    },
    {
        "id": "murDeVent",
        "name": "Mur de vent",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Un rideau de vent vertical invisible de 6 mètres de haut  par 1 mètre de large par arcane de l’élémentaliste apparaît. Il mesure 1 mètre d’épaisseur et d’une force considérable. La rafale rugissante est suffisante déchirer les papiers et des matériaux similaires de mains sans méfiance tandis que les tissus amples et les vêtements en tissu volent vers le haut lorsqu’ils sont pris dans un mur de vent. Les flèches et les darts ou toute autre arme à distance normale passant à travers le mur sont déviés et n’atteignent pas leur cible. Les armes à distance massives comme les rochers de catapulte ne sont pas affectées. Les gaz, les petites créatures volantes et les créatures sous forme gazeuse ne peuvent pas traverser le mur et toute créature tentant de traverser sera propulsée vers l’arrière sur 5 mètres.",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "1m. de large par niveau d’arcane"
        },
        "bonus": {
            "text": "Protection contre les armes de jets"
        },
        "resilience": {
            "text": "Permet de traverser le mur"
        },
        "criticalSuccess": {
            "text": "Projette ceux qui veulent traverser à dix (10) mètres."
        }
    },
    {
        "id": "hippogriffe",
        "name": "Hippogriffe",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Appelle une créature volante mythique comme destrier volant pour traverser une étendue.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    }
]

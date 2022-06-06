export default [
    {
        "id": "auraDePoussiere",
        "name": "Aura de poussière",
        "icon": "icons/magic/defensive/shield-barrier-flaming-pentagone-blue-yellow.webp",
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
            "text": "Une cible"
        },
        "bonus": {
            "text": "+1 d’armure, +1 éviter"
        },
        "criticalSuccess": {
            "text": "+2 d’armure, +2 éviter"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "eclairEnChaine",
        "name": "Éclair en chaîne",
        "icon": "icons/magic/lightning/bolt-strike-forked-blue.webp",
        "description": "Un éclair jaillit du bout du doigt du magicien, frappant une cible puis se dirigeant vers d’autres cibles à moins de 60 mètres du magicien. L’éclair inflige 2d6 + (3 par victimes) points de dégâts à chacune des victimes (toujours le même nombre). La foudre peut atteindre un maximum de sept (7) victimes. Tous les sujets peuvent tenter des jets de résilience pour la moitié des dégâts. Le magicien choisit les cibles, mais elles doivent toutes être à moins de 60 mètres au total (du magicien à la dernière cible), et aucune cible ne peut être touchée plus d’une fois. Le magicien peut choisir d’affecter moins de cibles que le maximum.",
        "distance": {
            "text": "60 mètres."
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Maximum 7 victimes"
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
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "electrification",
        "name": "Électrification",
        "icon": "icons/skills/melee/blade-tips-double-blue.webp",
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
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "etatGazeux",
        "name": "État gazeux",
        "icon": "icons/magic/air/air-smoke-casting.webp",
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
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "sphereDeTesla",
        "name": "Sphère de Tesla",
        "icon": "icons/magic/lightning/orb-ball-spiral-blue.webp",
        "description": "En lançant ce sort, une sphère d’énergie jaune scintillant jaillit au dessus de l’élémentaliste qui crée un cercle de protection mesurant 5x5 mètres à l’entour de l’élémentaliste. Le cercle ne peut pas se déplacer.\n\nL’anneau inflige 5d6 blessures d’électricité à toute créature entrant ou traversant le cercle. Si l’élémentaliste évoque la sphère pour qu'elle apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers l’anneau.\n\nDe base, la sphère et son anneau de protection dure un (1) tour par niveau d’arcane de l’élémentaliste. S’il le veut, l’élémentaliste peut maintenir l’anneau plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour. ",
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
            "text": "5x5 mètres, l’élémentaliste au centre"
        },
        "resilience": {
            "text": "Divise le dommage par deux (arrondi vers le bas). Faire a chaque tour qu’une créature est dans l’anneau"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible."
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "element": "electric",
            "text": "5d6"
        },
        "dependsOnArcaneLevel": true
    }
]
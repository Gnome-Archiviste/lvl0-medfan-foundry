export default [
    {
        "id": "clignotement",
        "name": "Clignotement",
        "icon": "icons/magic/symbols/symbol-lightning-bolt.webp",
        "description": "Déplace un objet ou une personne magiquement par téléportation dans une direction au hasard (avec un temps au hasard). \n\nDirection: \n\n1. Nord\n\n2. Sud\n\n3. Est \n\n4. Ouest\n\n5. Vertical \n\n6. Derrière le magicien (à 1d6 mètres)\n\n\n\n\n\nDistance :\n\n1. 1d6 mètres\n\n2. 3d6 mètres\n\n3. 5d6 mètres\n\n4. 2d6 x 10 mètres\n\n5. 2d6 x 100 mètres\n\n6. 2d6 - 1 kilomètres\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané (le retour prend 2d6 -1 tours)"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "etatGazeux",
        "name": "État gazeux",
        "icon": "icons/magic/air/fog-gas-smoke-blue-gray.webp",
        "description": "Une créature touchée et tout son équipement deviennent immatériel, apparaissant comme une forme brumeuse ressemblant à du brouillard. Dans cet état, le personnage ne peut pas être touché ou interagit physiquement, devenant immunisé contre toute attaque qui n’est pas de nature magique. Le personnage ne peut pas marcher, mais peut voler à 3 mètres par tour. Le personnage peut également passer à travers de petits trous ou des ouvertures étroites, même de simples fissures, avec tout ce qu’il portait ou tenait, tant que le sort persiste. Par contre, il ne peut pas attaquer physiquement ou affecter les autres, ne peut pas lancer de sorts, ne peut pas se déplacer plus rapidement et ne peut pas entrer dans l’eau ou d’autres liquides. Cela n’affecte qu’une créature consentante.",
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
        "id": "forceDuGeant",
        "name": "Force du géant",
        "icon": "icons/magic/control/buff-strength-muscle-damage.webp",
        "description": "Donne un bonus de +2 en physique. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
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
            "text": "+2 en physique"
        },
        "criticalSuccess": {
            "text": "+4 en physique"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "graceFeline",
        "name": "Grâce féline",
        "icon": "icons/skills/movement/feet-winged-boots-glowing-yellow.webp",
        "description": "Donne un bonus de +2 en dextérité. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
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
            "text": "+2 en dextérité"
        },
        "criticalSuccess": {
            "text": "+4 en dextérité"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "identificationDeTresor",
        "name": "Identification de trésor",
        "icon": "icons/commodities/treasure/glass-cube-teal.webp",
        "description": "Ce sort révèle une seule fonction d’un objet magique pour chaque tour où il est en vigueur. Les fonctions les plus élémentaires sont révélées en premier, y compris comment activer cette fonction sur l’objet et combien de charges restent. Pour une arme, ce seront les modificateurs d’attaque et de dégâts. Si un objet magique a plusieurs fonctions différentes qui sont tout aussi basiques, le maître de jeu détermine laquelle est identifiée en premier. Ce sort peut être lancé pour identifier plusieurs objets, ce qui prend 10 minutes au coût de 10 points de mana.",
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
        "dependsOnArcaneLevel": false
    },
    {
        "id": "jetDacide",
        "name": "Jet d’acide",
        "icon": "icons/magic/acid/projectile-stream-bubbles.webp",
        "description": "Le magicien lance un jet d’acide qui touche la première personne sur son trajet.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible"
        },
        "damage": {
            "rollFormula": "return '2d6+' + (4 * context.arcaneLevel);",
            "element": "acid",
            "text": "2d6 + (4 par niveau d’arcane)"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "marcherSurLeau",
        "name": "Marcher sur l’eau",
        "icon": "icons/magic/water/wave-wave-teal.webp",
        "description": "Ce sort permet à une cible de marcher sur un liquide comme si elle marchait sur un sol solide. Le sort dure 10 tours.",
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
        "id": "obscurite",
        "name": "Obscurité",
        "icon": "eye-ringed-glow-angry-small-teal.webp",
        "description": "Englobe un espace de 21x21 mètres dans la noirceur la plus totale. La perception et les habiletés de combat dans l’espace est réduite de trois. Il faut utiliser l'habileté « Écouter » pour trouver un nouvel adversaire.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "width": 21,
            "height": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "-3 perception et toutes habilités de combats."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "parlerAuxAnimaux",
        "name": "Parler aux animaux",
        "icon": "icons/environment/creatures/horses.webp",
        "description": "Ce sort permet au magicien de converser avec des animaux. Ne fonctionnant pas sur les anthropomorphes, il faut utiliser le sort babelfish.  Cela permet au magicien de converser, d’interroger ou d’avoir une discussion amicale avec l’animal affecté. Cet effet se produit quel que soit l’émotion de l’animal et permet à l’animal de répondre. Les réponses sont d’une complexité limitée en fonction de l’intelligence de l’animal et de sa capacité à donner du sens à la communication. L’animal peut même faire une petite faveur au magicien.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 2 * context.arcaneLevel",
            "unit": "tours",
            "text": "2 tours par niveau d’arcane"
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
        "id": "pointeDePierre",
        "name": "Pointe de pierre",
        "icon": "icons/magic/earth/barrier-stone-explosion-debris.webp",
        "description": "Ce sort provoque la création de formations en pointes longues, étroites et aiguisées sur un sol déjà en pierre autour du magicien. Ces pointes de pierre restent discrètes jusqu’à ce que quelqu’un d’autre que le magicien les traverse. Dans ce cas, ils peuvent infliger des dégâts et réduire le mouvement. Les pierres aiguisées causent 1d6 dégâts aux imprudents. Une créature se déplaçant dans la zone subit des blessures à tous les mètres de mouvement.\n\nDe base la zone de pointe de pierre dure un (1) tour par niveau d’arcane du magicien. S’il le veut, le magicien peut maintenir l’anneau plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "(1 + 2 par niveau d’arcane)x(1 + 2 par niveau d’arcane)."
        },
        "resilience": {
            "text": "moitié des dégâts"
        },
        "criticalSuccess": {
            "text": "6 points de dégâts par mètre"
        },
        "damage": {
            "element": "physic",
            "text": "1d6 par mètre"
        },
        "dependsOnArcaneLevel": true
    }
]
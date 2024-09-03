export default [
    {
        "id": "blizzard",
        "name": "Blizzard",
        "icon": "icons/magic/water/projectile-bolts-salvo-blue.webp",
        "description": "Diminue la perception de moitié à cause des flocons fouettant le visage et fait du dommage à tous les tours et à tous ceux qui sont dans la zone de la tempête, alliés comme ennemis. Le déplacement est divisé par deux à cause des vents puissants.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "width": 21,
            "height": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Déplacement et perception divisé par deux."
        },
        "resilience": {
            "text": "Divise le dommage par deux. Faire a chaque tour qu’une personne est dans le blizzard"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '4d6';",
            "text": "4d6 par tour"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "cephalee",
        "name": "Céphalée",
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp",
        "description": "Provoque une douleur à la tête, empêchant tout jet demandant la caractéristique d'intelligence.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
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
            "text": "Annule tout jet d'intelligence"
        },
        "resilience": {
            "text": "Annule le sort"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible."
        },
        "damage": {
            "rollFormula": "return '2d6+4';",
            "text": "2d6 + 4"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "fantassinDeGlace",
        "name": "Fantassin de glace",
        "icon": "icons/creatures/magical/spirit-undead-horned-blue.webp",
        "description": "L'élémentaliste invoque un élémentaire de glace à partir d'une source d'eau (au moins un baril). L'élémentaire majeur obéit à des ordres complexes et peut se battre pour défendre l'élémentaliste. \n\n\n\n\n\nPHY 8, DEX 6, INT 4, CHA 6, PER 5\n\nHP 100, Armure : 2, H2H : 10, Lancer/tir : 9 \n\nAttaques : H2H = 10 de dégâts, Haleine glacée: 3d6+4 (cône de glace, 2 m., immobilisation), Lance de glace : 2d6 + 2\n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "text": "Double les points de vie"
        },
        "damage": {
            "text": "Voir statistique de l’élémental"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "igloo",
        "name": "Igloo",
        "icon": "icons/magic/water/snowflake-ice-gray.webp",
        "description": "Créer un abri de glace d'une seule pièce, en forme de dôme. Permet d'abriter jusqu'à 10 personnes. Contient 1 repas à base de poisson par personne qui redonne 10 points de vie. Le sort d'Alarme est automatiquement enclenché ainsi qu'une invulnérabilité au froid.\n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Jusqu’à tout le monde sorte."
        },
        "area": {
            "width": 10,
            "height": 10,
            "text": "10x10 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "10 points de vie, alarme, invulnérabilité au froid"
        },
        "criticalSuccess": {
            "text": "Repas redonnent 20 points de vie"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "visionDeLetreMouille",
        "name": "Vision de l’être mouillé",
        "icon": "icons/magic/perception/orb-crystal-ball-scrying.webp",
        "description": "Le sort permet à l’élémentaliste de voir et entendre une personne qu’il cherche ainsi qu’une partie de son environnement, lui donnant un indice sur l’endroit où cette personne se trouve.\n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5",
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "width": 3,
            "height": 3,
            "text": "3x3 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "immuniteALeau",
        "name": "Immunité à l’eau ",
        "icon": "icons/magic/defensive/shield-barrier-flaming-pentagon-blue.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection complète contre l’eau. Le sort annule le dommage produit par l’eau, que la source des dégâts soit naturelle ou magique. L'élémentaliste doit toucher la cible.",
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
            "text": "Annule les dégâts causés par l’eau"
        },
        "criticalSuccess": {
            "text": "Retourne la moitié des dégâts à celui qui les inflige."
        },
        "dependsOnArcaneLevel": false
    }
]
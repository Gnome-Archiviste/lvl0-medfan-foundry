export default [
    {
        "id": "demonDePoussierekl",
        "name": "Démon de poussière[k][l]",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste crée un vortex tourbillonnant de sable et de gravats martelant une zone de 7x7 mètres, infligeant 1d6 dégâts par niveau d’arcane. Le sort se nomme ainsi à cause des vents rugissants qui l'accompagnent, donnant l’impression qu’un démon fou se marre au centre.  À cause des débris et du déplacement d’air, le déplacement est divisé par deux et les victimes ont un malus de 1 sur tout test demandant la statistique de Perception dans la zone pendant toute la durée du sort. L’élémentaliste peut  déplacer le Démon de poussière à une vitesse de 5 mètres par tour.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "rollFormula": "return '2d6'",
            "unit": "tours",
            "text": "2d6 tours"
        },
        "bonus": {
            "text": "Ralentit les cibles et donne un malus de Perception"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut). Il faut faire le jet pour chaque tour qu’une"
        },
        "damage": {
            "text": "1d6 dégâts par niveau d’arcane"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "personneEstDansLaZoneDuDemonDePoussiere",
        "name": "        personne est dans la zone du Démon de poussière.",
        "icon": "icons/magic/air/wind-vortex-swirl-red.webp",
        "description": "Succès remarquable : La cible ne peut pas faire de test de résilience",
        "area": {
            "width": 7,
            "height": 7,
            "text": "7x7 mètres",
            "comment": ""
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "murDePierre",
        "name": "Mur de pierre",
        "icon": "icons/magic/earth/barrier-stone-pillar-purple.webp",
        "description": "Ce sort crée un mur de roche qui fusionne avec les surfaces rocheuses adjacentes. Le mur mesure 10 cm d’épaisseur par niveau d’arcane de l'élémentaliste ainsi que jusqu’à 1 mètre de large par niveau d’arcane de l'élémentaliste et jusqu’à 1 mètre de haut par niveau d’arcane de l'élémentaliste. Le mur ne peut pas être évoqué de manière à occuper le même espace qu’une créature ou un autre objet.\n\n\n\n\n\nChaque zone d’un pied carré du mur a 15 points de vie par 10 cm d’épaisseur. Les créatures peuvent frapper le mur automatiquement, mais le mur est si dur que les 8 premiers points de dégâts de chaque coup sont ignorés. Une section de mur dont les points de vie tombent à 0 est fissurée. \n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Combat"
        },
        "area": {
            "text": "1 mètre de largeur par niveau d’arcane"
        },
        "criticalSuccess": {
            "text": "Double la largeur et les points de vie"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "peauDeDiamant",
        "name": "Peau de diamant",
        "icon": "icons/commodities/gems/gem-faceted-diamond-silver-.webp",
        "description": "Permet d’absorber 50 points de dégâts. Le sort peut être fait sur le magicien ou un allié. L'élémentaliste doit toucher la cible. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Tant que les 50 points ne sont pas utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe 50 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe 100 points de dégâts"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "terrierDuLapin",
        "name": "Terrier du lapin",
        "icon": "icons/tools/hand/pickaxe-worn-steel-grey.webp",
        "description": "Ce sort permet à une cible de créer un tunnel au fur et à mesure que l’élémentaliste avance sous terre, comme s'il marchait sur la terre ferme. Le sort dure 10 tours et le tunnel se remblai après 24 heures.\n\n\n\n",
        "distance": {
            "text": "Soi-même"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "tremblementDeTerre",
        "name": "Tremblement de terre",
        "icon": "icons/magic/earth/explosion-lava-stone-yellow.webp",
        "description": "Les personnages, animaux et monstres, dans une zone de 21x21 mètres, doivent faire un jet de gymnastique sinon il tombe et doivent refaire le même test pendant 10 tours pour se relever ou ne pas retomber. Ils ne peuvent pas se défendre tant qu’ils sont à terre. Tous reçoivent le dommage lors du premier tour.",
        "distance": {
            "value": 40,
            "unit": "mètre",
            "text": "40 mètres"
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
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "text": "5d6"
        },
        "dependsOnArcaneLevel": false
    }
]
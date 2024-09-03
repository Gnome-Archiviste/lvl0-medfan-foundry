export default [
    {
        "id": "creationMajeureDacide",
        "name": "Création majeure d'acide",
        "icon": "icons/magic/acid/dissolve-drip-droplet-smoke.webp",
        "description": "Crée 10 litres d'acide par arcane de l’élémentaliste (Ne peut être utilisé comme attaque sur un ennemi).",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "criticalSuccess": {
            "text": "Double la quantité"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "elementaireMajeurDacide",
        "name": "Élémentaire majeur d'acide",
        "icon": "icons/magic/acid/dissolve-vomit-green-brown.webp",
        "description": "L’élémentaliste invoque un élémentaire d'acide à partir d'une source d'acide (au moins 1l.). L'élémentaire majeur obéit à des ordres complexes et peut se battre pour défendre l'élémentaliste. Attention, on ne peut avoir plus de deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient.\n\nPHY 8, DEX 6, INT 4, CHA 6, PER 5\n\nHP 80, Armure : 2, H2H : 10, Lancer/tir : 9\n\nAttaques : \n\nCombat à main nue = 14 de dégâts, \n\nProjectile d’acide: 2d6+2 (2 fois)",
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
        "id": "poliChloridrique",
        "name": "Poli chloridrique",
        "icon": "icons/equipment/chest/breastplate-helmet-metal.webp",
        "description": "Donne un bonus de +2 en Charisme. Le magicien doit frotter une pièce d’armure ou une arme de métal pour lui redonner temporairement son éclat d’antan, effaçant taches de rouille et égratignures. Si un sort de permanence est fait sur l’objet, il retrouvera sa pleine valeur et pourra être enchanté comme s’il était neuf. Cependant, le bonus de charisme disparaîtra tout de même après la scène.",
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
            "text": "+2 en Charisme"
        },
        "criticalSuccess": {
            "text": "+4 en Charisme"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "projectileSulfurique",
        "name": "Projectile sulfurique",
        "icon": "icons/magic/acid/orb-bubble-smoke-drip.webp",
        "description": "L’élémentaliste invoque une boule de liquide acidulée qui va frapper, en éclatant, plusieurs cibles dans une zone de 7 mètres par 7 mètres à moins de 60 mètres du magicien. Le projectile inflige 2d6 +10 points de dégâts à chacune des victimes. Tous les sujets peuvent tenter des jets de résilience pour la moitié des dégâts. Le point d’impact du sort peut être à 60 mètres maximum de l’élémentaliste.\n\n\n\n",
        "distance": {
            "text": "60 mètres maximum"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "7x7  mètres. Maximum de victimes égales à l’arcane du magicien"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut) chaque victime doit faire un test"
        },
        "criticalSuccess": {
            "text": "réduit les armures des cibles de moitié."
        },
        "damage": {
            "rollFormula": "return '2d6+10';",
            "text": "2d6 + 10"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "souffleDuFeroxide",
        "name": "Souffle du feroxide",
        "icon": "icons/magic/acid/dissolve-arm-flesh.webp",
        "description": "L’élémentaliste crache un jet d’acide qui touche toute personne sur son trajet.",
        "distance": {
            "text": "20 mètres de longs à partir de l’élémentaliste"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 1,
            "height": 20,
            "text": "1x20 mètres (en avant de l’élémentaliste)",
            "comment": "en avant de l’élémentaliste"
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
    }
]
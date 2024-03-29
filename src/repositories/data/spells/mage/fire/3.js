export default [
    {
        "id": "firBall",
        "name": "Boule de feu",
        "icon": "icons/magic/fire/projectile-fireball-orange-yellow.webp",
        "description": "D’un geste, l'élémentaliste envoie une boule de feu dans les airs pour exploser avec un rugissement à la hauteur et à la distance que l'élémentaliste désire, tant qu’elle se trouve dans la portée maximale du sort (15 mètres). L’explosion remplit la zone d’effet d’un feu et d’une chaleur intense, causant 1d6 dégâts par niveau d’arcane de l'élémentaliste à toutes les créatures de la zone. Il affecte une sphère de 5x5 mètres. La boule de feu suit une trajectoire rectiligne et si elle heurte une barrière solide avant d’atteindre la portée prescrite, l’impact provoque une explosion précoce. \n\n\n\n",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return context.arcaneLevel + 'd6';",
            "element": "fire",
            "text": "1d6 par niveau d’arcane"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "minorFireElemental",
        "name": "Élémentaire mineur de feu",
        "icon": "icons/magic/fire/explosion-embers-evade-silhouette.webp",
        "description": "L'élémentaliste invoque un petit élémentaire de feu à partir d'une source de feu (au moins l’équivalent d’une torche). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie. \n\nPHY 4, DEX 5, INT 3, CHA 3, PER 6\n\nHP 20, H2H : 5, Attaque : 3 de dégâts",
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
        "id": "piegeDeFeu",
        "name": "Piège de feu",
        "icon": "icons/magic/fire/explosion-flame-lightning-strike.webp",
        "description": "Installé sur n’importe quel objet pouvant être fermé, un piège de feu s’enflamme lorsque quelqu’un d’autre que l’élémentaliste, ou toute autre personnage sélectionné par celui-ci, ouvre l’objet protégé par le sort. Lorsqu’elle est déclenchée, une explosion de feu remplit la zone à moins de 2 mètres de l’objet. L’explosion inflige 1d6 dégâts + 1 point par niveau d’arcane de l’élémentaliste au lancé du sort. L’objet n’est pas endommagé par le sort.\n\n\n\n\n\nUn sort dissipation de la magie qui n’a pas fonctionné ne déclenchera pas l’explosion mais le sort restera actif.\n\n\n\n",
        "distance": {
            "text": "toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '1d6+' + (1 * context.arcaneLevel);",
            "text": "1d6 + (1 par niveau d’arcane)"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "retourDeFlammes",
        "name": "Retour de flammes",
        "icon": "icons/magic/defensive/shield-barrier-flaming-pentagon-red.webp",
        "description": "Le sort capture une partie de l’énergie entrante, réduisant son effet sur vous et la stockant pour votre prochaine attaque de mêlée. Vous avez une résistance au feu jusqu’au début de votre prochain tour. De plus, la première fois que vous frappez avec une attaque de mêlée lors de votre prochain tour, la cible subit 1d6 dégâts de feu supplémentaires, et le sort prend fin.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "jusqu’à utilisation"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Ajoute 1d6 dégâts de feu"
        },
        "criticalSuccess": {
            "text": "Ajoute 2d6 dégâts de feu"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "runeDeKegan",
        "name": "Rune de Kegan",
        "icon": "icons/magic/symbols/rune-sigil-red-orange.webp",
        "description": "Le magicien dessine sur une surface un symbole. Lorsqu’un ennemi s’en approche à moins de soixante (60) centimètres, une explosion fait deux (2) dés de dégâts sur toutes les créatures se trouvant dans une zone de 5x5 mètres.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Jusqu’à l’utilisation (Préparation 2 minutes)"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "4d6"
        },
        "damage": {
            "rollFormula": "return '2d6';",
            "text": "2d6"
        },
        "dependsOnArcaneLevel": false
    }
]
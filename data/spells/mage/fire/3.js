export default [
    {
        "id": 'firBall',
        "name": `Boule de feu`,
        "icon": 'icons/magic/acid/dissolve-drip-droplet-smoke.webp',
        "description": `D’un geste, l'élémentaliste envoie une boule de feu dans les airs pour exploser avec un rugissement à la hauteur et à la distance que l'élémentaliste désire, tant qu’elle se trouve dans la portée maximale du sort (15 mètres). L’explosion remplit la zone d’effet d’un feu et d’une chaleur intense, causant 1d6 dégâts par niveau d’arcane de l'élémentaliste à toutes les créatures de la zone. Il affecte une sphère de deux mètres de rayon. La boule de feu suit une trajectoire rectiligne et si elle heurte une barrière solide avant d’atteindre la portée prescrite, l’impact provoque une explosion précoce.`,
        "bonus": {
            "text": `Aucun`
        },
        "damage": {
            "rollFormula": `return context.actorData.computedData.magic.arcaneLevel + 'd6' ;`,
            "element": 'feu'
        },
        "distance": {
            "value": 15,
            "unit": 'm'
        },
        "duration": {
            "text": 'Instantané'
        },
        "area": {
            "value": 2,
            "unit": 'm'
        },
        "resilience": {
            "text": 'Divise le dommage par deux (plus haut)'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience.`
        },
    },
    {
        "id": 'minorFireElemental',
        "name": 'Élémentaire mineur de feu',
        "icon": 'icons/creatures/slimes/slime-face-melting-green.webp',
        "description": `L'élémentaliste invoque un petit élémentaire de feu à partir d'une source de feu (au moins l’équivalent d’une torche). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie.<br>
PHY 4, DEX 5, INT 3, CHA 3, PER 6<br>
HP 20, H2H : 5, Attaque : 3 de dégâts`,
        "damage": {
            "text":`Voir statistique de l’élémentaire`
        },
        "distance": {
            "value": 2,
            "unit": 'm'
        },
        "duration": {
            "text":`1 scène ou jusqu'à destruction`
        },
        "area": {
            "text": `Aucun`
        },
        "resilience": {
            "text": 'Aucune'
        },
        "criticalSuccess": {
            "text": `Double les points de vie`
        },

    },
]

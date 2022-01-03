export default [
    {
        "id": 'icedBerries',
        "name": `Baies Glacées`,
        "icon": 'icons/magic/acid/dissolve-drip-droplet-smoke.webp',
        "description": `Avec ce sort, l’élémentaliste utilise des baies (jusqu’à 6 par sort) qui deviennent glacées. Il peut utiliser lui-même ces baies ou les offrir à ses alliés. Ces baies sont utilisées comme projectiles avec une fronde. Lorsqu’utilisées, si le succès du tir est exceptionnel, la cibles est gelées pour 2 tours.`,
        "bonus": {
            "text": `Voir baies glacées (projectile)`
        },
        "damage": {
            "text": `Aucun`
        },
        "distance": {
            "value": 1,
            "unit": 'm'
        },
        "duration": {
            "text": 'Instantané'
        },
        "area": {
            "text": `1-6 cibles`
        },
        "resilience": {
            "text": 'Aucune'
        },
        "criticalSuccess": {
            "text": `Double la quantité de baies (les baies manquantes apparaissent).`
        },
    },
    {
        "id": 'icedSnowBall',
        "name": `Boule de neige glacée`,
        "icon": 'icons/magic/acid/dissolve-drip-droplet-smoke.webp',
        "description": `L'élémentaliste fait apparaître une boule de neige très dure dans sa main qu'il peut lancer. Peut figer la cible pour un tour.`,
        "bonus": {
            "text": `Immobilisation de la victime`
        },
        "damage": {
            "rollFormula": `return '1d6';`,
            "element": 'glace'
        },
        "distance": {
            "value": 10,
            "unit": 'm'
        },
        "duration": {
            "text": 'Instantané'
        },
        "area": {
            "text": `Une cible`,
        },
        "resilience": {
            "text": 'Annule l\'immobilisation de la victime'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience.`
        },
    },
    {
        "id": 'blotter',
        "name": 'Buvard',
        "icon": 'icons/equipment/shield/kite-wooden-oak-glow.webp',
        "description": `En touchant une cible, l’élémentaliste imprègne d’énergies magiques protectrices la cible, offrant une protection partielle contre le froid. Le sort réduit de moitié le dommage produit par le froid, que la source des dégâts soit naturelle ou magique, pour une seule fois. De plus, une fois que le sort capture une partie de l’énergie élémentaire, il la stock pour votre prochaine attaque de mêlée, ajoutant 1d6 dégâts de froid supplémentaires.`,
        "bonus": {
            "text": `Ajoute 1d6 dégâts de froid`
        },
        "distance": {
            "type": 'touch'
        },
        "duration": {
            "value": 1,
            "unit": 'scene',
            "text": 'jusqu’à utilisation ou une (1) scène' /* jusqu’à utilisation dans la version Air  du sort */
        },
        "area": {
            "text": `Une cible`
        },
        "resilience": {
            "text": 'Aucune' /* Aucune dans le sort d'air */
        },
        "criticalSuccess": {
            "text": `+ 2d6 (froid)`
        },
    },
    {
        "id": 'cryogenics',
        "name": `Cryogénie`,
        "icon": 'icons/magic/acid/dissolve-drip-droplet-smoke.webp',
        "description": `Ce sort congèle le corps d’un coéquipier décédé et permet de le conserver, afin qu’il ne se décompose pas, pendant un mois. Ce sort prolonge le temps pour ressusciter la créature touchée d’entre les morts. Le sort fonctionne sur les parties du corps coupées et autres. Le sort se termine lorsque le cadavre est ressuscité des morts ou arrive au bout de sa durée.`,
        "bonus": {
            "text": `Conserve un corps`
        },
        "damage": {
            "text": `Aucun`
        },
        "distance": {
            "type": 'touch',
        },
        "duration": {
            "text": '1 mois (ou 3 jours par niveau d’arcane)'
        },
        "area": {
            "text": `Une cible`,
        },
        "resilience": {
            "text": 'Aucune'
        },
        "criticalSuccess": {
            "text": `Double la durée`
        },
    },
    {
        "id": 'minorWaterElemental',
        "name": `Élémentaire mineur d'eau`,
        "icon": 'icons/magic/lightning/projectile-orb-blue.webp',
        "description": `L’élémentaliste invoque un petit élémentaire d’eau à partir d'une source d'eau (au moins 1 litre.). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie.<br>
PHY 4, DEX 5, INT 3, CHA 3, PER 5<br>
HP 20, H2H : 5, Attaque : 3 de dégâts`,
        "bonus": {
            "text": `Aucun`
        },
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

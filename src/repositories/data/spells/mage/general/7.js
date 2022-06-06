export default [
    {
        "id": "anneauDeFeu",
        "name": "Anneau de feu",
        "icon": "icons/magic/fire/barrier-wall-flame-ring-yellow.webp",
        "description": "En lançant ce sort, un cercle de feu scintillant jaillit à la demande du magicien. Le cercle mesure 5x5 mètres à l’entour du magicien. Le cercle ne peut pas se déplacer.\n\nL’anneau inflige 5d6 blessures de feu à toute créature entrant ou traversant. Si le magicien évoque l’anneau pour qu’il apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers l’anneau.\n\nDe base l’anneau dure un (1) tour par niveau d’arcane du magicien. S’il le veut, le magicien peut maintenir l’anneau plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour. ",
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
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux (arrondi vers le bas). Faire a chaque tour qu’une créature est dans le feu de l’anneau"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '5d6';",
            "element": "fire",
            "text": "5d6"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "confusion",
        "name": "Confusion",
        "icon": "icons/creatures/amphibians/frog-confused-green-blue.webp",
        "description": "Désoriente la cible. Tous les jets avec des dés doivent être un succès exceptionnel étendu[b] (double un, deux, trois, quatre ou cinq) pour fonctionner de façon normale (ne pas le compter comme un succès exceptionnel).",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5",
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Cible désorientée"
        },
        "resilience": {
            "text": "Doit être fait a chaque tour et annule l’effet du sort."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "desintegration",
        "name": "Désintégration",
        "icon": "icons/magic/earth/strike-body-stone-crumble.webp",
        "description": "Désintègre des objets fixes. Le magicien doit toucher l’objet pendant une minute.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Après une minute"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Détruit un object"
        },
        "criticalSuccess": {
            "text": "Durée instantané"
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
            "text": "Maximum sept (7) victimes"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut) chaque victime doit faire un test"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "2d6 + (3 par victimes) sur chaque victime"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "invocation",
        "name": "Invocation",
        "icon": "icons/creatures/magical/spirit-fear-energy-pink.webp",
        "description": "Fait apparaître une créature sans nom pour combattre à la place du magicien. Attention, on ne peut avoir plus de deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient. Les caractéristiques de la créature : Phy=9, Int=7, Cha=4, Dex=8, Per=6 (aucune habileté), 100 points de vie.",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Un combat ou jusqu’à détruit"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "text": "150 points de vie"
        },
        "damage": {
            "rollFormula": "return '1d6+6';",
            "text": "1d6 + 6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "œilDeLaigle",
        "name": "Œil de l’aigle",
        "icon": "icons/creatures/birds/raptor-hawk-flying.webp",
        "description": "Donne un bonus de +2 en Perception. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
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
            "text": "+2 en Perception"
        },
        "criticalSuccess": {
            "text": "+4 en Perception"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "rapetissement",
        "name": "Rapetissement",
        "icon": "icons/magic/control/silhouette-grow-shrink-blue.webp",
        "description": "Ce sort permet au lanceur de réduire une créature ou un objet, en diminuant à la fois sa taille et son poids à 1/3 de sa taille.\n\nTout l’équipement porté par une créature est également modifié par le sort.\n\nLes propriétés magiques ne sont pas diminuées par ce sort. Le poids, la masse et le physique sont cependant affectés. Les points de vie, l’armure et le mana d’une créature ne changent pas. La caractéristique physique est réduite de moitié (arrondi vers le bas pour les ennemis, vers le haut pour les personnages).\n\nLe sort ne peut pas être lancé deux fois sur la même cible, tant que l'effet du premier sort est en action.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Deux (2) tours plus un (1) tour par trois (3) points de magie supplémentaires."
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Caractéristique physique divisée par 2"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "refletElfique",
        "name": "Reflet elfique",
        "icon": "icons/magic/life/heart-hand-gold-green.webp",
        "description": "Donne un bonus de +2 en Charisme. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
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
        "id": "ruseDuRenard",
        "name": "Ruse du renard",
        "icon": "icons/creatures/mammals/humanoid-fox-cat-archer.webp",
        "description": "Donne un bonus de +2 en Intelligence. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
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
            "text": "+2 en Intelligence"
        },
        "criticalSuccess": {
            "text": "+4 en Intelligence."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "runesExplosive",
        "name": "Runes explosive",
        "icon": "icons/magic/symbols/runes-star-pentagon-orange-purple.webp",
        "description": "Le magicien dessine sur une surface un symbole. Lorsqu’un ennemi s’en approche à moins de soixante (60) centimètre, une explosion fait quatre (4) dés de dégâts sur toutes les créatures se trouvant dans une zone de 11x11 mètres.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Jusqu’à l’utilisation (Préparation 2 minutes)"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "criticalSuccess": {
            "text": "Dégât 8d6"
        },
        "damage": {
            "rollFormula": "return '4d6';",
            "text": "4d6"
        },
        "dependsOnArcaneLevel": false
    }
]
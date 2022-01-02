export default [
    {
        "id": "anneauDeFeu",
        "name": "Anneau de feu",
        "description": "En lançant ce sort, un cercle de feu scintillant jaillit à la demande du magicien. Le cercle mesure deux (2) mètres de rayon à l’entour du magicien. Le cercle ne peut pas se déplacer.\nL’anneau inflige 5d6 blessures de feu à toute créature entrant ou traversant. Si le magicien évoque l’anneau pour qu’il apparaisse là où les créatures sont déjà présentes, chaque créature subit des blessures comme si elle passait à travers l’anneau.\nDe base l’anneau dure un (1) tour par niveau d’arcane du magicien. S’il le veut, le magicien peut maintenir l’anneau plus longtemps en se concentrant continuellement. Pour ce faire, il doit faire un test de concentration par tour supplémentaire qui sera sa seule action durant le tour.",
        "distance": {
            "type": "self"
        },
        "duration": {
            "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
            "unit": "tours"
        },
        "area": {
            "value": 2,
            "unit": "m"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '5d6';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "confusion",
        "name": "Confusion",
        "description": "Désoriente la cible. Tous les jets avec des dés doivent être un succès exceptionnel étendu (double un, deux, trois, quatre ou cinq) pour fonctionner de façon normale (ne pas le compter comme un succès exceptionnel).",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 5",
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Cible désorientée"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "desintegration",
        "name": "Désintégration",
        "description": "Désintègre des objets fixes. Le magicien doit toucher l’objet pendant une minute.",
        "distance": {
            "type": "touch"
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
        "resilience": {
            "text": "Durée instantané"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "eclairEnChaine",
        "name": "Éclair en chaîne",
        "description": "Un éclair jaillit du bout du doigt du magicien, frappant une cible puis se dirigeant vers d’autres cibles à moins de 60 mètres du magicien. L’éclair inflige 2d6 + (3 par victimes) points de dégâts à chacune des victimes (toujours le même nombre). La foudre peut atteindre un maximum de sept (7) victimes. Tous les sujets peuvent tenter des jets de résilience pour la moitié des dégâts. Le magicien choisit les cibles, mais elles doivent toutes être à moins de 60 mètres au total (du magicien à la dernière cible), et aucune cible ne peut être touchée plus d’une fois. Le magicien peut choisir d’affecter moins de cibles que le maximum.",
        "distance": {
            "value": 60,
            "unit": "m"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Maximum sept (7) victimes"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "2d6 + (3 par victimes) sur chaque victime"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "invocation",
        "name": "Invocation",
        "description": "Fait apparaître une créature sans nom pour combattre à la place du magicien. Attention, on ne peut avoir plus de deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient. Les caractéristiques de la créature : Phy=9, Int=7, Cha=4, Dex=8, Per=6 (aucune habileté), 100 points de vie.",
        "distance": {
            "value": 2,
            "unit": "m"
        },
        "duration": {
            "text": "Un combat ou jusqu’à détruit"
        },
        "resilience": {
            "text": "150 points de vie"
        },
        "damage": {
            "rollFormula": "return '1d6+6';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "œilDeLaigle",
        "name": "Œil de l’aigle",
        "description": "Donne un bonus de +2 en Perception. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "+2 en Perception"
        },
        "resilience": {
            "text": "+4 en Perception"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "rapetissement",
        "name": "Rapetissement",
        "description": "Ce sort permet au lanceur de réduire une créature ou un objet, en diminuant à la fois sa taille et son poids à 1/3 de sa taille.\nTout l’équipement porté par une créature est également modifié par le sort.\nLes propriétés magiques ne sont pas diminuées par ce sort. Le poids, la masse et le physique sont cependant affectés. Les points de vie, l’armure et le mana d’une créature ne changent pas. La caractéristique physique est réduite de moitié (arrondi vers le bas pour les ennemis, vers le haut pour les personnages).\nLe sort ne peut pas être lancé deux fois sur la même cible, tant que l'effet du premier sort est en action.",
        "distance": {
            "value": 10,
            "unit": "m"
        },
        "duration": {
            "text": "Deux (2) tours plus un (1) tour par trois (3) points de magie supplémentaires."
        },
        "area": {
            "text": "Une cible (un seul fois)"
        },
        "bonus": {
            "text": "Caractéristique physique divisée par 2"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "refletElfique",
        "name": "Reflet elfique",
        "description": "Donne un bonus de +2 en Charisme. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "+2 en Charisme"
        },
        "resilience": {
            "text": "+4 en Charisme"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "ruseDuRenard",
        "name": "Ruse du renard",
        "description": "Donne un bonus de +2 en Intelligence. Le magicien doit toucher la cible. Étrangement, fait sur un objet pour le rendre permanent, la valeur est toujours divisée par deux.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "+2 en Intelligence"
        },
        "resilience": {
            "text": "+4 en Intelligence."
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "runesExplosive",
        "name": "Runes explosive",
        "description": "Le magicien dessine sur une surface un symbole. Lorsqu’un ennemi s’en approche à moins de soixante (60) centimètre, une explosion fait quatre (4) dés de dégâts sur toutes les créatures se trouvant dans un rayon de cinq (5) mètres.",
        "distance": {
            "type": "touch"
        },
        "duration": {
            "text": "Jusqu’à l’utilisation (Préparation 2 minutes)"
        },
        "area": {
            "value": 5,
            "unit": "m"
        },
        "resilience": {
            "text": "Dégât 8d6"
        },
        "damage": {
            "rollFormula": "return '4d6';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
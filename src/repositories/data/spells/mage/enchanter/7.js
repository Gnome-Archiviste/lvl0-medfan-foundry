export default [
    {
        "id": "chaumiereDeWalden",
        "name": "Chaumière de Walden",
        "icon": "icons/environment/settlement/blacksmith.webp",
        "description": "Ce sort permet de créer une chaumière rétractable qui sert de refuge sur la route. L’enchanteur aura besoin d’une petite maison en bois ou en pierre de 4cm de haut ainsi que de la véritable chaumière (meublée ou non. Prévoir un coût d’au moins 10 000 oricaux), une potion théurgique, une potion d’urgence ainsi qu’un sort d’alarme et d’un sort de permanence (le sort de permanence et d’alarme peuvent être sur parchemin). La construction et la figurine doivent êtres neuves. ",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "la chaumière"
        },
        "bonus": {
            "text": "Dégâts physiques maximums"
        },
        "criticalSuccess": {
            "text": "Double les points de vie de la chaumière."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "cometes",
        "name": "Comètes",
        "icon": "icons/commodities/gems/pearls-white.webp",
        "description": "L’enchanteur ensorcelle jusqu’à 3 petites pierres précieuses qui se mettent en orbite autour de sa tête. Lorsqu’il en a besoin, il peut s’en servir comme projectile en faisant un jet de lancer/tir comme action. Chaque pierre fait 1d6-2 et reviens se remettre en orbite. En réussissant un jet de concentration, l’enchanteur peut faire un sort supplémentaire. L’enchanteur ne peut avoir plus de 5 comètes en orbite autour de lui.",
        "distance": {
            "text": "20 m."
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "1 à 3 cibles"
        },
        "bonus": {
            "text": "Laisse les mains libres"
        },
        "criticalSuccess": {
            "text": "Fait 5 comètes (ceux manquants apparaissent comme par magie)."
        },
        "damage": {
            "rollFormula": "return '1d6-2';",
            "text": "1d6-2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "creationDobjetIntercaste",
        "name": "Création d’objet intercaste",
        "icon": "icons/equipment/shield/heater-steel-gray.webp",
        "description": "L’enchanteur infuse un objets d’énergie mystique en le saupoudrant d’une pincée de poudre de perlépipein et incorporant un ingrédient catalyseur afin de donner au porteur 1 seul point dans une habileté de classe qui n’est pas la sienne. Selon l’habileté souhaitée, l'ingrédient catalyseur est le suivant:\n\nBottes de discrétion (Déplacement silencieux): Semelles souples en cuir de daim\n\nBouclier d’attaque (Attaque de bouclier): têtes de clous\n\nBonnet d’érudition (connaissance): hélice (doit être fonctionnelle)\n\nBrassards d'ambidextrie (combat 2 mains): glyphe en forme de pieuvre\n\nBrassards d’Elis (maitrise des animaux): glyphe en spirale en repoussé sur cuir vert\n\nCape de camouflage (camouflage): glyphes en forme de feuille (vert et brun)\n\nCape du défi (provocation): boutons en cornes de taureau\n\nCerclet de filature (pister): agate\n\nCerclet d'empathie (détection des motivations): quartz claire\n\nCoiffe cinétique (charge): cornes d’auroch\n\nCollier de commandement (commandement): Topaz impérial\n\nGantelets de Désarmement (désarmement): magnétite\n\nGantelets d’effroie (intimidation): cuire noire dentelé\n\nGants du faussaire (faux-semblant): soie blanche\n\nGants londoits (larcin): peau de belette\n\nLunettes du korrigan (Évaluation): disque de mica\n\nTroisième oeil (sentir la magie): Calcédoine avec un point noir au centre (pierre)\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "L’objet"
        },
        "bonus": {
            "text": "Permet de faire une habileté réservée à une autre classe"
        },
        "criticalSuccess": {
            "text": "donne 2 points dans l’habileté."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "destrierDePochec",
        "name": "Destrier de poche[c]",
        "icon": "icons/commodities/treasure/figurine-elk.webp",
        "description": "L’enchanteur infuse le sort dans une figurine de bois représentant un animal (pas nécessairement un cheval) pouvant servir de destrier. La figurine, une fois activé, devient pleine grandeur.\n\nBonus : ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "La figurine"
        },
        "criticalSuccess": {
            "text": "fait 4 potions par mana au lieu de 3."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "invocation",
        "name": "Invocation",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Fait apparaître une créature sans nom pour combattre à la place de l’enchanteur. Attention on ne peut avoir plus que deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient. Les caractéristiques de la créature : Phy=9, Int=7, Cha=4, Dex=8, Per=6 (aucune habileté), 100 points de vie.",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Un combat ou jusqu’à détruit"
        },
        "damage": {
            "rollFormula": "return '1d6+6';",
            "text": "1d6 + 6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resilienceAucune",
        "name": "Résilience  Aucune",
        "icon": "icons/creatures/magical/spirit-fear-energy-pink.webp",
        "description": "Succès remarquable : 150 points de vie",
        "area": {
            "text": "Aucune"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "potionDurgence",
        "name": "Potion d’urgence",
        "icon": "icons/consumables/potions/bottle-round-corked-orante-red.webp",
        "description": "L’enchanteur prépare une potion claire et rougeâtre dans un grand chaudron contenant entre autre du sang de troll (100 ml), une pincée de poudre de perlépipein et de la pulpe de papyrus (250 grammes) et qui doit mijoter et être touillée pendant 6 heures. L’enchanteur fait 3 potions de soin par 7 points de mana dépensées durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "instantané"
        },
        "area": {
            "text": "Le chaudron"
        },
        "bonus": {
            "text": "Donne 50 pv à la cible"
        },
        "criticalSuccess": {
            "text": "fait 4 potions par mana au lieu de 3."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "potionsRehaussantes",
        "name": "Potions rehaussantes",
        "icon": "icons/consumables/potions/flask-corked-yellow-glow.webp",
        "description": "L’enchanteur prépare une potion sirupeuse de couleur variable dans un grand chaudron contenant divers ingrédients ainsi qu’une pincée de poudre de perlépipein et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions par 7 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane. Selon la potion, l'ingrédient principal est le suivant:\n\nPotion de Force: 1 litre de sève de chêne\n\nPotion de Dextérité: 3 cuillères à thé de grains moulus de caféier\n\nPotion d’Intelligence: 1 litre d’huile de foie de morue\n\nPotion de Perception: 1 litre de jus de carotte\n\nPotion de Charisme: 3 cuillères à thé d’essence de rose",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Le chaudron"
        },
        "bonus": {
            "text": "Donne un bonus de 2 à une statistique de la cible"
        },
        "criticalSuccess": {
            "text": "fait 4 potions par mana au lieu de 3."
        },
        "dependsOnArcaneLevel": false
    }
]
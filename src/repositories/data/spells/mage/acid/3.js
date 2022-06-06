export default [
    {
        "id": "blotter",
        "name": "Buvard",
        "icon": "icons/equipment/shield/kite-wooden-oak-glow.webp",
        "description": "En touchant une cible, l’élémentaliste imprègne d’énergies magiques protectrices la cible, offrant une protection partielle contre l’acide. Le sort réduit de moitié le dommage produit par l’acide, que la source des dégâts soit naturelle ou magique, pour une seule fois. \n\nDe plus, une fois que le sort capture une partie de l’énergie élémentaire, il la stock pour votre prochaine attaque de mêlée, ajoutant 1d6 dégâts d’acides supplémentaires.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "jusqu’à utilisation ou une (1) scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Ajoute 1d6 dégâts acides"
        },
        "criticalSuccess": {
            "text": "+ 2d6 (acide)"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "marinatedBody",
        "name": "Cadavre mariné",
        "icon": "icons/commodities/treasure/doll-mummy.webp",
        "description": "Ce sort préserve le cadavre ciblé afin qu’il ne se décompose pas, pendant trois (3) jours par niveau d’arcane de l’élémentaliste. Ce sort prolonge le temps pour ressusciter la créature touchée d’entre les morts. Le sort fonctionne sur les parties du corps coupées et autres. Cependant, le corps conservé émane une forte odeur de vinaigre.\n\n\n\n\n\nLe sort se termine lorsque le cadavre est ressuscité des morts ou arrive au bout de sa durée.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 3 * context.arcaneLevel",
            "unit": "jours",
            "text": "3 jours par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Conserve un corps"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "corrosiveContact",
        "name": "Contact corrosif",
        "icon": "icons/magic/acid/dissolve-arm-flesh.webp",
        "description": "Les mains de l’élémentaliste sont entourées d'un liquide vert pâle scintillant qui rend leur toucher très corrosif par nature Le toucher de l’élémentaliste inflige 3d6 points de dégâts d’acide.",
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
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '3d6';",
            "element": "acid",
            "text": "3d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "minorAcidElemental",
        "name": "Élémentaire mineur d'acide",
        "icon": "icons/creatures/slimes/slime-face-melting-green.webp",
        "description": "L’élémentaliste invoque un petit élémentaire d'acide à partir d'une source d'acide (au moins 1L). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie. \n\nPHY 4, DEX 5, INT 3, CHA 3, PER 5\n\nHP 20, H2H : 5, Attaque : 3 de dégâts",
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
        "id": "acidArrow",
        "name": "Flèche d’acide",
        "icon": "icons/skills/ranged/arrow-flying-poisoned-green.webp",
        "description": "Une flèche magique d’acide jaillit de la main de l’élémentaliste et se dirige vers une cible. La flèche acide inflige 1d6 points de dégâts, par niveau d’arcane, d’acide si elle touche.",
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
            "widthPerArcane": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise les dégâts par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "Ignore l’armure"
        },
        "damage": {
            "rollFormula": "return context.arcaneLevel + 'd6';",
            "element": "acid",
            "text": "1d6 par niveau d’arcane"
        },
        "dependsOnArcaneLevel": true
    }
]
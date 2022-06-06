export default [
    {
        "id": "creationMajeureDeau",
        "name": "Création majeure d'eau",
        "icon": "icons/magic/water/wave-water-blue.webp",
        "description": "Ce sort génère une eau saine et potable. L’eau doit être créée dans une zone aussi petite qu’elle contiendra réellement le liquide. L’élémentaliste peut créer 10 litres d’eau par niveau d’arcane.",
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
        "id": "crue",
        "name": "Crue",
        "icon": "icons/magic/water/water-iceberg-bubbles.webp",
        "description": "Ce sort fait augmenter le volume de l’eau (ou tout autre liquide similaire) en hauteur. La profondeur peut être augmentée jusqu’à 50 cm par arcane. Tout objet flottant dans la zone dont le volume est augmenté de cette manière glisse sur les côtés du bouillonnement créé par le sort. Si la zone touchée par le sort est adjacente à la terre, l’eau peut se répandre sur la terre ferme et si c’est dans un contenant, il est fort possible que celui-ci déborde. Lorsqu’il est lancé sur des élémentaires d’eau et d’autres créatures à base d’eau, il double leur déplacement et leur statistique de Physique. Le sort n’a aucun effet sur les autres créatures.\n\n\n\n",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "width": 21,
            "widthPerArcane": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Double le déplacement et la statistique de Physique des élémentaux."
        },
        "resilience": {
            "text": "Le déplacement n’est pas affecté"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "elementaireMajeurDeau",
        "name": "Élémentaire majeur d'eau",
        "icon": "icons/magic/water/water-elemental-blue-teeth.webp",
        "description": "L'élémentaliste invoque un élémentaire d'eau à partir d'une source d'eau (au moins un baril). L'élémentaire majeur obéit à des ordres complexes et peut se battre pour défendre l'élémentaliste. Attention, on ne peut avoir plus de deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient.\n\nPHY 8, DEX 6, INT 4, CHA 6, PER 5\n\nHP 80, Armure : 2, H2H : 10, Lancer/tir : 9\n\nAttaques : H2H = 10 de dégâts, Siphon: 3d6+4 (jet d'eau, 5 m.)\n\n\n\n",
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
        "id": "etiage",
        "name": "Étiage",
        "icon": "icons/magic/water/water-iceberg-bubbles.webp",
        "description": "Ce sort fait descendre l’eau (ou tout autre liquide similaire) à une profondeur minimale de 2 cm. La profondeur peut être abaissée jusqu’à 50 cm par arcane. Lorsqu’il est lancé sur des élémentaires d’eau et d’autres créatures à base d’eau, il réduit leur déplacement et leur statistique de Physique de moitié. Le sort n’a aucun effet sur les autres créatures.\n\n\n\n",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "width": 21,
            "widthPerArcane": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Divise le déplacement et la statistique de Physique des élémentaux de moitié"
        },
        "resilience": {
            "text": "Le déplacement n’est pas affecté"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "siphon",
        "name": "Siphon",
        "icon": "icons/magic/water/pseudopod-teal.webp",
        "description": "L'élémentaliste crache un jet d'eau tel une lance de pompier.",
        "distance": {
            "text": "20 mètre de long a partir de l'élémentaliste"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible."
        },
        "damage": {
            "text": "2d6 + (4 par niveau d’arcane) (eau)"
        },
        "dependsOnArcaneLevel": false
    }
]
export default [
    {
        "id": "laVengeanceDeTharAnys",
        "name": "La vengeance de Thar’Anys",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste déclenche un éclair sur une cible causant 15d6 points de dégâts. Le sort fait alors un arc vers une deuxième cible à moins de dix (10) mètres de la première cible pour 14d6 dégâts, puis vers une troisième cible à moins de dix (10) mètres de la deuxième cible pour 13d6 dégâts, et ainsi de suite, jusqu’à un arc final causant 1d6 dégâts. Chaque cible est momentanément étourdie par la foudre, perdant sa prochaine action. Un jet de résilience réduit de moitié les dégâts et annule toute perte d’action. Aucune cible ne peut être touchée plus d’une fois.",
        "distance": {
            "text": "60 mètres pour la 1ère victime"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "10 mètres par arc (distance, et non rayon)"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "15d6 de dégâts pour toutes les cibles"
        },
        "damage": {
            "text": "15d6 première victime et -1d pour chaque victime suivante"
        },
        "dependsOnArcaneLevel": false
    }
]
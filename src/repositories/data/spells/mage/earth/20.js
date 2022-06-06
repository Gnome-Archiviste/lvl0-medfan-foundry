export default [
    {
        "id": "liberezLeMangeurDeMonde",
        "name": "Libérez le mangeur de monde",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Une zone de 41x41 mètres subit un tremblement de terre féroce et artificiel. Le tremblement de terre renverse des structures, provoque des glissements de terrain et ouvre des fissures béantes dans la terre. Tout humanoïde pris dans la zone doit faire un test de gymnastique ou devenir désespérément enterré dans les décombres (50 % de chance) prenant 1d6 heures pour creuser avec 10d6 de dommages, ou mortellement écrasé (30d6 de dommages) par la chute de matériaux et le broyage des fissures (50 % de chance). Les secousses du tremblement de terre ne s’étendent en aucun cas au-delà de la zone d’effet du sort.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "rollFormula": "return '2d6'",
            "unit": "tours",
            "text": "2d6 tours"
        },
        "area": {
            "width": 41,
            "height": 41,
            "text": "41x41 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "?"
        },
        "criticalSuccess": {
            "text": "?"
        },
        "dependsOnArcaneLevel": false
    }
]
export default [
    {
        "id": "berner",
        "name": "Berner",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Un double illusoire du bouffon apparaît, et en même temps, le bouffon est affecté par un sort d’invisibilité. Le bouffon est libre d’aller ailleurs pendant que le double du bouffon s’éloigne. Le double apparaît à portée du sort, mais se déplace ensuite en fonction de l’intention du bouffon au moment de l’incantation. Le bouffon fait apparaître son double parfaitement superposé sur son corps afin que les observateurs ne remarquent pas l’apparition d’une image tandis que le bouffon devient invisible. Le bouffon et le double peuvent alors se déplacer dans des directions différentes. Le double se déplace à la vitesse du bouffon et fait des gestes comme s’il était réel. Le double ne peut ni attaquer ni lancer de sorts, mais il peut prétendre le faire. Le double disparaît lorsqu’il se trouve à 80 mètres de son original.",
        "distance": {
            "text": "Le bouffon"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "40 mètres (voir texte)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        }
    },
    {
        "id": "confusion",
        "name": "Confusion",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Désoriente la cible. Tous les jets avec des dés doivent être un succès exceptionnel étendu (double un, deux, trois, quatre ou cinq) pour fonctionner de façon normale (ne pas le compter comme un succès exceptionnel).",
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
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        }
    },
    {
        "id": "devouement",
        "name": "Dévouement",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Les personnages bénéficient de +1 aux jets d’attaque, jets de dégâts et autres tests.",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1",
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        }
    },
    {
        "id": "piedDansLaBouche",
        "name": "Pied dans la bouche",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Force la victime à dire la vérité.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "formula": "if (context.criticalSuccess) { return 10; } return 5",
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "value": 10,
            "unit": "tours",
            "text": "Durée 10 tours"
        }
    }
]
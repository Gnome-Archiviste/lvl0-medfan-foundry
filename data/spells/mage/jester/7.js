export default [
    {
        "id": "berner",
        "name": "Berner",
        "description": "Un double illusoire du bouffon apparaît, et en même temps, le bouffon est affecté par un sort d’invisibilité. Le bouffon est libre d’aller ailleurs pendant que le double du bouffon s’éloigne. Le double apparaît à portée du sort, mais se déplace ensuite en fonction de l’intention du bouffon au moment de l’incantation. Le bouffon fait apparaître son double parfaitement superposé sur son corps afin que les observateurs ne remarquent pas l’apparition d’une image tandis que le bouffon devient invisible. Le bouffon et le double peuvent alors se déplacer dans des directions différentes. Le double se déplace à la vitesse du bouffon et fait des gestes comme s’il était réel. Le double ne peut ni attaquer ni lancer de sorts, mais il peut prétendre le faire. Le double disparaît lorsqu’il se trouve à 80 mètres de son original.",
        "distance": {
            "text": "Le bouffon"
        },
        "duration": {
            "value": 1,
            "unit": "scène"
        },
        "area": {
            "value": 40,
            "unit": "m"
        },
        "resilience": {
            "text": "La cible ne peut pas faire de test de résilience."
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
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "devouement",
        "name": "Dévouement",
        "description": "Les personnages bénéficient de +1 aux jets d’attaque, jets de dégâts et autres tests.",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1",
            "unit": "scène"
        },
        "area": {
            "value": 5,
            "unit": "m"
        },
        "resilience": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "piedDansLaBouche",
        "name": "Pied dans la bouche",
        "description": "Force la victime à dire la vérité.",
        "distance": {
            "text": "1 mètre"
        },
        "duration": {
            "formula": "if (context.criticalSuccess) { return 10; } return 5",
            "unit": "tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "value": 10,
            "unit": "tours"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]
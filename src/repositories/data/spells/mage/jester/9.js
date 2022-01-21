export default [
    {
        "id": "conscienceFictive",
        "name": "Conscience fictive",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet au bouffon de communiquer par la pensée avec un autre personnage qui est à une distance de cinq (5) mètres par niveau. Cette personne doit être connue ou être visible du bouffon (l’Œil de Dasha fonctionne). La communication est dans les deux directions.",
        "distance": {
            "text": "5 mètres par niveau d’arcane"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Double la durée et distance"
        }
    },
    {
        "id": "œilDeDasha",
        "name": "Œil de Dasha",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le bouffon crée un œil magique invisible qui envoie des informations visuelles au bouffon. L’œil de Dasha se déplace à 9 mètres par tour et voit exactement comme le bouffon verrait si le bouffon était sur place. Si l’œil examine les murs ou les plafonds, il se déplace à 3 mètres par tour.\n\n\n\n\n\nDes barrières solides empêchent le passage d’un œil de Dasha, bien qu’il puisse traverser un espace pas plus petit qu’un petit trou de souris (trois (3) cm de diamètre). Le bouffon doit se concentrer pour utiliser l’œil. Si le bouffon ne se concentre pas, l’œil devient inerte jusqu’à ce que le bouffon se concentre à nouveau.\n\n\n\n\n\nLes pouvoirs de l’œil ne peuvent pas être améliorés par d’autres sorts ou objets (bien que le bouffon puisse utiliser la magie pour améliorer sa propre vue). \n\n\n\n\n\nL’Œil de Dash permet de faire des sorts en utilisant l’œil comme point d’origine. Avant sa disparition, l’œil commence à perdre la vue. \n\n\n\n\n\nLe bouffon est soumis à toute attaque du regard qu’il rencontre. Une annulation de la magie sur le bouffon ou l’œil met fin au sort. En ce qui concerne la cécité, le sort aveuglement, l’obscurité magique et d’autres phénomènes qui affectent la vision, l’œil de Dasha est considéré comme un organe sensoriel indépendant du bouffon. Des sorts tels que « voir l’invisible » peuvent également détecter l’œil.\n\n\n\n",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "text": "2d6 + Intelligence"
        },
        "area": {
            "text": "Durée"
        },
        "criticalSuccess": {
            "text": "Double la durée"
        }
    },
    {
        "id": "premonition",
        "name": "Prémonition",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Lancer au coucher, le sort permet au bouffon de voir de l’information sur le futur probable durant ses rêves. Le magicien se souvient de ses rêves prémonitoires. \n\nLe maître de jeu donne des indices sur un événement qui devrait (le plus possible) se passer dans la partie. Le sort permet au maître de jeu de donner des informations importantes que les joueurs auraient ratées.\n\nComme la prémonition est un rêve, celui-ci peut-être représentatif et non une image précise sur un événement.",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "text": "Durant le sommeil"
        },
        "area": {
            "text": "Bouffon"
        },
        "criticalSuccess": {
            "text": "Le prémonition est clair"
        }
    }
]
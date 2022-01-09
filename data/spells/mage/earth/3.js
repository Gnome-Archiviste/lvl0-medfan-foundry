export default [
    {
        "id": "contreCoup",
        "name": "Contre-coup",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le sort capture une partie de l’énergie entrante, réduisant son effet sur vous et la stockant pour votre prochaine attaque de mêlée. Vous avez une résistance aux dégâts physiques jusqu’au début de votre prochain tour. De plus, la première fois que vous frappez avec une attaque de mêlée lors de votre prochain tour, la cible subit 1d6 dégâts supplémentaires, et le sort prend fin.[h]",
        "distance": {
            "text": "Une cible"
        },
        "duration": {
            "text": "Un tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Ajoute 1d6 dégâts"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "elementaireMineurDePierre",
        "name": "Élémentaire mineur de pierre",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L'élémentaliste invoque un petit élémentaire de pierre  pierre à partir d'une source de terre ( au moins 1 m² ). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie. \n\nPHY 5, DEX 4, INT 3, CHA 3, PER 5\n\nHP 25, H2H : 6, Attaque : 3 de dégâts\n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "criticalSuccess": {
            "text": "Double les points de vie"
        },
        "damage": {
            "text": "Voir statistique de l’élémental"
        }
    },
    {
        "id": "maledictionDeLacierBrulant",
        "name": "Malédiction de l’acier brûlant ",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Un objet métallique à portée (comme une arme, un morceau d’armure, ou poigné de porte) devient chauffé au rouge. Toute créature touchant l’objet subit 2d6 blessures et échappe ou lâche l’objet. L’objet émet une faible lumière et peut mettre le feu à des objets inflammables.[i]",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return 2 * context.actorData.computedData.magic.arcaneLevel;",
            "unit": "tours",
            "text": "2 tours par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "La cible est capable de conserver l’objet en main."
        },
        "criticalSuccess": {
            "text": "Double les dégâts"
        },
        "damage": {
            "text": "2d6 dégâts"
        }
    },
    {
        "id": "peauDePierre",
        "name": "Peau de pierre",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permets d’absorber 15 points de dégâts. Le sort peut être fait sur l'élémentaliste ou un allié. L'élémentaliste doit toucher la cible. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Tant que les 15 points ne sont pas utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe 15 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe 30 points de dégâts"
        }
    },
    {
        "id": "rocher",
        "name": "Rocher",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "D’un geste, l'élémentaliste envoie un rocher dans les airs qui éclate avec un rugissement à la hauteur et à la distance que l’élémentaliste désire, tant qu’elle se trouve dans la portée maximale du sort (15 mètres). Les éclats remplissent la zone d’effet, causant 1d6 dégâts par niveau d’arcane de l’élémentaliste à toutes les créatures de la zone. Il affecte une sphère de deux mètres de rayon. Le rocher suit une trajectoire rectiligne et si elle heurte une barrière solide avant d’atteindre la portée prescrite, l’impact provoque une explosion précoce. \n\n\n\n",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return context.actorData.computedData.magic.arcaneLevel + 'd6';",
            "element": "physic",
            "text": "1d6 par niveau d’arcane"
        }
    }
]
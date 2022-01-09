export default [
    {
        "id": "avalanche",
        "name": "Avalanche",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste déclenche la chute d'une incroyable quantité de neige et de glace, il faut simplement qu'il y ait quelque chose en hauteur d'où la neige peut tomber (montagne, tour, toit de maison). La neige ensevelit les cibles et elles doivent réussir un test d’athlétique pour s’en sortir.\n\n\n\n",
        "distance": {
            "value": 60,
            "unit": "mètre",
            "text": "60 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 7,
            "unit": "m",
            "text": "7 mètres"
        },
        "resilience": {
            "text": "Divise les dégâts par deux"
        },
        "criticalSuccess": {
            "text": "Immobilise les cibles pour 2 tours avant de pouvoir faire leur test d’Athlétique"
        },
        "damage": {
            "rollFormula": "return '10d6+20';",
            "text": "10d6 + 20"
        }
    },
    {
        "id": "bulleDeProtection",
        "name": "Bulle de protection",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L'élémentaliste lance une vague d’eau qui vient le recouvrir, lui et ses alliés, avant de congeler et de former un dôme solide qui les protège des attaques externes. Le dôme peut impacter 200 points de dégâts (même de feu ou de zone) avant d’éclater comme du verre mais tous ceux à l’intérieur de la bulle ne peuvent en sortir.\n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "value": 6,
            "unit": "m",
            "text": "6 mètres"
        },
        "bonus": {
            "text": "200 point de protection"
        }
    },
    {
        "id": "engloutir",
        "name": "Engloutir",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste fait apparaître une énorme main d’eau qui attrappe navire ou esquif (ou nageur) et l'entraîne au fond de l’eau. L’embarcation est automatiquement coulée et inutilisable alors que les marins reçoivent 4d6 de dégâts. Le capitaine doit faire le test de résilience.\n\n\n\n",
        "distance": {
            "value": 30,
            "unit": "mètre",
            "text": "30 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Destruction de l’embarcation"
        },
        "resilience": {
            "text": "Empêche le bateau de couler"
        },
        "criticalSuccess": {
            "text": "Personne ne survit"
        },
        "damage": {
            "text": "4d6 de dégâts"
        }
    },
    {
        "id": "tempeteDeGresil",
        "name": "Tempête de grésil",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le grésil bloque toute vue à l’intérieur de sa zone et rend le sol de la zone glacée. Une créature peut marcher dans ou à travers la zone de grésil à la moitié de sa vitesse normale avec un test de gymnastique. Un échec signifie qu’il ne peut pas bouger pendant ce tour, tandis qu’un échec critique signifie qu’il tombe et doit faire un autre jet de Gymnastique pour se relever avant de refaire un nouveau test pour se déplacer. Le grésil éteint aussi les torches et les petits feux.\n\n\n\n",
        "distance": {
            "value": 30,
            "unit": "mètre",
            "text": "30 mètres"
        },
        "duration": {
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "value": 15,
            "unit": "m",
            "text": "15 mètres"
        },
        "bonus": {
            "text": "Ralenti l’adversaire"
        },
        "damage": {
            "rollFormula": "return '8d6+10';",
            "element": "water",
            "text": "8d6 + 10"
        }
    },
    {
        "id": "tourbillon",
        "name": "Tourbillon",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L'élémentaliste fait apparaître un tourbillon dans une masse d’eau qui lui permet de se déplacer, lui et son groupe, d’un point d’eau à un autre. La surface d’eau doit être au moins aussi large que le plus gros élément à faire traverser. L'élémentaliste doit être le dernier à passer pour refermer derrière lui.\n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Selon l’étendu d'eau"
        }
    }
]
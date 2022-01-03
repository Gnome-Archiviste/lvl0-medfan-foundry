export default [
    {
        "id": 'marinatedBody',
        "name": 'Cadavre mariné',
        "icon": 'icons/commodities/treasure/doll-mummy.webp',
        "description": `Ce sort préserve le cadavre ciblé afin qu’il ne se décompose pas, pendant trois (3) jours par niveau d’arcane de l’élémentaliste. Ce sort prolonge le temps pour ressusciter la créature touchée d’entre les morts. Le sort fonctionne sur les parties du corps coupées et autres. Cependant, le corps conservé
émane une forte odeur de vinaigre.<br> 
Le sort se termine lorsque le cadavre est ressuscité des morts ou arrive au bout de sa durée.`,
        "bonus": {
            "text": `Conserve un corps`
        },
        "distance": {
            "type": 'touch'
        },
        "duration": {
            "formula": `return 3 * context.actorData.computedData.magic.arcaneLevel`,
            "unit": 'days'
        },
        "resilience": {
            "text": 'Aucune'
        },
        "criticalSuccess": {
            "text": `Double la durée`
        },
        "area": {
            "text": `Une cible`
        }
    },
    {
        "id": 'corrosiveContact',
        "name": 'Contact corrosif',
        "icon": 'icons/magic/acid/dissolve-arm-flesh.webp',
        "description": `Les mains de l’élémentaliste sont entourées d'un liquide vert pâle scintillant qui rend leur toucher très corrosif par nature Le toucher de l’élémentaliste inflige 3d6 points de dégâts d’acide.`,
        "damage": {
            "rollFormula": `return '3d6';`,
            "element": 'acid'
        },
        "distance": {
            "type": 'touch'
        },
        "duration": {
            "text": 'Instantané'
        },
        "resilience": {
            "text": 'Divise les dégâts en 2'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience.`
        },
        "area": {
            "text": `Une cible`
        }
    },
    {
        "id": 'minorAcidElemental',
        "name": 'Élémentaire mineur d\'acide',
        "icon": 'icons/creatures/slimes/slime-face-melting-green.webp',
        "description": `L’élémentaliste invoque un petit élémentaire d'acide à partir d'une source d'acide (au moins 1l.). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie.<br>
PHY 4, DEX 5, INT 3, CHA 3, PER 5`,
        "damage": {
            "text":`Voir statistique de l’élémentaire`
        },
        "distance": {
            "value": 2,
            "unit": 'm'
        },
        "duration": {
            "text":`1 scène ou jusqu'à destruction`
        },
        "resilience": {
            "text": 'Aucune'
        },
        "criticalSuccess": {
            "text": `Double les points de vie`
        },
        "area": {
            "text": `Aucun`
        }
    },
    {
        "id": 'acidArrow',
        "name": 'Flèche d’acide',
        "icon": 'icons/skills/ranged/arrow-flying-poisoned-green.webp',
        "description": `Une flèche magique d’acide jaillit de la main de l’élémentaliste et se dirige vers une cible. La flèche acide inflige 1d6 points de dégâts, par niveau d’arcane, d’acide si elle touche.`,
        "bonus": {
            "text": `Aucun`
        },
        "damage": {
            "rollFormula": `return context.actorData.computedData.magic.arcaneLevel + 'd6' ;`,
            "element": 'acid'
        },
        "distance": {
            "formula": '10 * context.actorData.computedData.magic.arcaneLevel'
        },
        "duration": {
            "text": 'Instantané'
        },
        "resilience": {
            "text": 'Divise les dégâts par deux'
        },
        "criticalSuccess": {
            "text": `Ignore l’armure`
        },
        "area": {
            "text": `Une cible`
        }
    },
    {
        "id": 'mofette',
        "name": 'mofette',
        "icon": 'icons/creatures/mammals/rodent-rat-green.webp',
        "description": `L'élémentaliste crée une fissure dans le sol dégageant des gaz qui finissent par exploser, projetant ceux autour à 2 mètres.`,
        "bonus": {
            "text": `Recule de 2 mètres`
        },
        "damage": {
            "rollFormula": 'return "1d6"+2;',
            "element": 'acid'
        },
        "distance": {
            "value": 10,
            "unit": 'm'
        },
        "duration": {
            "text": 'Instantané'
        },
        "resilience": {
            "text": 'Aucune'
        },
        "criticalSuccess": {
            "text": `Aucun`
        },
        "area": {
            "value": 1,
            "unit": 'm'
        }
    },
]

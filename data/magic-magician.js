export default {
    arcane1: {
        alarm: {
            name: "Alarme",
            description: "Protège une zone ou une pièce d’un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancer du sort) entre dans la zone, on entend le son d’une cloche. A partir d’arcane 5, l’alarme peut être mental. Elle est entendue dans la tête du magicien et les personnes présentes durant le lancer du sort.",
            bonus: null,
            damage: null,
            distance : 'touch',
            time: '2h/arcane',
            area: '10m',
            resilience: 'none',
            critical: 'time: 2 * time'
        },
        mist: {
            name: "Brume",
            description: "Une épaisse brume entoure le magicien, permettant de le cacher ainsi que ses coéquipiers, sur une zone de 5 mètres. Donne 2 points de pénalité sur leur perception (il faut faire une perception pour trouver un nouvel adversaire). On ajoute un mètre par niveau d’arcane du magicien à partir du 5e arcane",
            bonus: '-2 per',
            damage: null,
            distance : 'user',
            time: '3 turn',
            area: '5m + noNegative(1m/arcane - 4m)',
            resilience: 'none',
            critical: 'area: 10m + 1m/arcane'
        },
        flaming_slap: {
            name: "Gifle enflammée",
            description: "Avec ce sort, le magicien peut frapper à distance. Une fine feuille de flammes jaillit de la main du magicien, frappant une créature jusqu’à 5 mètres du magicien et lui fait 1d6 dommage de feu.",
            bonus: null,
            damage: '1d6',
            domage_type: 'fire',
            distance : '5m',
            time: '3 turn',
            area: 'target',
            resilience: 'domage: domage/2',
            resilience_text: 'Divise le dommage par deux (plus haut/ennemie, plus bas/joueur)',
            critical: 'no resilience',
            critical_text: 'La cible ne peut pas faire de test de résilience.'
        },

    },
}

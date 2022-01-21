export interface ElementDefinition {
    readonly name: string;
    readonly nameForWeapon: string;
    readonly elementalistSpeciality: boolean;
}

export default {
    'physic': {
        name: 'Physique',
        nameForWeapon: 'Physique',
        elementalistSpeciality: false,
    },
    'water': {
        name: 'Glace/Eau',
        nameForWeapon: 'Glace',
        elementalistSpeciality: true,
    },
    'electric': {
        name: 'Air/Électricité',
        nameForWeapon: 'Électricité',
        elementalistSpeciality: true,
    },
    'fire': {
        name: 'Feu',
        nameForWeapon: 'Feu',
        elementalistSpeciality: true,
    },
    'acid': {
        name: 'Acide',
        nameForWeapon: 'Acide',
        elementalistSpeciality: true,
    },
    'earth': {
        name: 'Mineraux',
        nameForWeapon: 'Mineraux',
        elementalistSpeciality: true,
    },
    'magic': {
        name: 'Magie',
        nameForWeapon: 'Magique',
        elementalistSpeciality: false,
    }
} as {[elementName: string]: ElementDefinition}

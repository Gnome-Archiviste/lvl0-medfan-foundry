export interface ElementDefinition {
    readonly elementalistSpeciality: boolean;
}

export default {
    'physic': {
        elementalistSpeciality: false,
    },
    'water': {
        elementalistSpeciality: true,
    },
    'electric': {
        elementalistSpeciality: true,
    },
    'fire': {
        elementalistSpeciality: true,
    },
    'acid': {
        elementalistSpeciality: true,
    },
    'earth': {
        elementalistSpeciality: true,
    },
    'magic': {
        elementalistSpeciality: false,
    }
} as { [elementName: string]: ElementDefinition }

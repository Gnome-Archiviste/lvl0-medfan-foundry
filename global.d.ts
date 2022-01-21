import '';

declare interface RollTerm {
    results: DiceTerm.Result[];
}

interface ChatMessageDataConstructorData {
    roll?: Roll | null;
}

declare global {
    interface ColorSet {
        name: string,
        description?: string,
        category: string,
        foreground?: string,
        background?: string,
        texture?: string,
        edge?: string,
        material?: string,
        font?: string,
        fontScale?: Record<string, number>,
        visibility?: 'visible'
    }

    interface Dice3d {
        addColorset: (colorSet: ColorSet, mode: 'default' | 'preferred') => void
    }
}

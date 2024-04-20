export default {
    stats: {
        phy: {
            name: 'Physique',
        },
        dex: {
            name: 'Dextérité',
        },
        int: {
            name: 'Intelligence',
        },
        cha: {
            name: 'Charisme',
        },
        per: {
            name: 'Perception',
        },
        protection: {
            name: 'Protection',
        },
        damage: {
            name: 'Dégâts',
        },
        health: {
            name: 'Vie',
        },
        mana: {
            name: 'Mana',
        },
    } as Record<string, { readonly name: string}>
}

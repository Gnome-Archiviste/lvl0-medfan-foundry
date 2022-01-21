export interface SpecialityDefinition {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface SpecialityData {
    name: string;
    description: string;
    icon: string;
}

export default {
    broadside: {
        name: "Attaque cinglante",
        description: "Permets de reporter sur un prochain adversaire le reste des dommages quand la cible actuelle est morte. Cette spécialité ne se fait qu’avec les armes de jets et que si le prochain adversaire est en ligne directe.",
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    precise_attack: {
        name: "Attaque précise",
        description: "Fais le dommage maximum de son attaque (seulement physique, pas pour les sorts). Ne se combine pas avec une charge.",
        icon: 'icons/skills/targeting/target-strike-gray.webp',
    },
    savage_attack: {
        name: "Attaque sauvage",
        description: "Ajoute la force du personnage au dommage (combat mêlée ou combat main nue). Ne se combine pas avec une charge.",
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    sneak_attack: {
        name: "Attaque sournoise",
        description: "Si un personnage peut attaquer sans se faire voir, il ajoute neuf points aux dommages d’une petite arme tranchante (c.-à-d. dague ou poignard).",
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    ballerina_in_armor: {
        name: "Ballerine en armure",
        description: "Permets d’ignorer les pénalités de l’armure.",
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    blockade: {
        name: "Barrage",
        description: "Permet d'utiliser votre bouclier jusqu'à 5 fois dans un combat, même si vous n’avez pas fait pleine défense. Permet une attaque.",
        icon: 'icons/magic/defensive/shield-barrier-glowing-blue.webp',
    },
    stinging_charge: {
        name: "Charge cinglante",
        description: "Permets de reporter sur un prochain adversaire le reste des dommages quand la cible actuelle est morte. Cette spécialité ne se fait qu’avec une charge et que si le prochain adversaire est en ligne directe.",
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    counter_attack: {
        name: 'Contre-attaque',
        description: `Après avoir évité avec succès (contre une attaque mêlée seulement), le personnage peut contre-attaquer la personne qui l’a attaquée.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    tumble: {
        name: 'Culbute',
        description: `Quand un personnage tombe à cause d’un échec ou d’un sort; il peut utiliser culbute pour se remettre sur ses pieds sans avoir à faire un test de gymnastique. Cette spécialité doit être utilisée dès l’échec et non pas au tour suivant.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    defensive_move: {
        name: 'Déplacement défensif',
        description: `Permets de faire un déplacement complet après une action. Par exemple, une attaque ou un sort. Ne se combine pas avec une charge. Ne doit pas avoir fait un déplacement de combat`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    offensive_move: {
        name: 'Déplacement offensif',
        description: `Permets de faire un déplacement complet suivi d’une action. Par exemple, une attaque ou un sort. Ne se combine pas avec une charge.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    quick_move: {
        name: 'Déplacement véloce',
        description: `Permets de faire un déplacement complet du double de sa vitesse de mouvement. Ne peux pas faire d’action après le déplacement. Ne se combine pas avec une charge.`,
        icon: 'icons/skills/movement/figure-running-gray.webp',
    },
    double_join: {
        name: 'Double-Jointure',
        description: `Permets de se faufiler dans des ouvertures normalement trop petites pour le personnage.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    hit_the_mark: {
        name: 'Faire mouche',
        description: `Permets de faire une attaque avec lancer/tir qui passe les armures.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    master_craftsman: {
        name: 'Maître artisan',
        description: `Permets de recharger ses points d'expertise dans l'habileté artisanat.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    master_blacksmith: {
        name: 'Maître forgeron',
        description: `Permets de recharger ses points d'expertise l'habileté forgeron.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    reel: {
        name: 'Moulinet',
        description: `Permets de faire une attaque sur chaque adversaire près du personnage.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    bargain: {
        name: 'Négocier',
        description: `permets d’économiser 20 % sur le prix d’achat ou de vendre avec un surplus de 20 % sur la vente d’objets après un test de marchandage.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    shock_wave: {
        name: 'Onde de choc',
        description: `Permets au personnage de frapper le sol en avant de lui avec un marteau à deux mains ou une massue à deux mains. Cette onde de choc fait l’effet de peau de banane sur toute personne en face du personnage dans un cône de 2 m du lieu frappé.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    paramedical: {
        name: 'Paramédical',
        description: `Permets de guérir une personne de 20 points de vies après un test de l'habileté soin.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    protection: {
        name: 'Protection',
        description: `Permets au personnage d’utiliser son bouclier pour protéger un allié qui est à ses côtés. Vous pouvez l'utiliser si vous n’avez pas encore utilisé de spécialité durant ce tour.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    swift_spells: {
        name: 'Sortilèges véloces',
        description: `Permets au personnage de faire deux sorts (ne comprends pas l’utilisation de baguettes et de parchemins) durant un tour. Attention, en plus de la dépense de mana pour l’activation de la spécialité, il faut compter le coût du premier sort au niveau normal, et le deuxième sort au prix du double du niveau d’arcane.`,
        icon: 'icons/magic/symbols/question-stone-yellow.webp',
    },
    arrow_volley: {
        name: "Volée de flèches",
        description: "Le personnage peut utiliser quatre flèches qu’il peut utiliser pour attaquer un ou plusieurs adversaires qui sont près l’un de l’autre.",
        icon: 'icons/skills/ranged/arrows-flying-salvo-yellow.webp',
    }
} as { [specialityId: string]: SpecialityData }

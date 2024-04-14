import {SpellClass} from './jobs';

export interface SkillDefinitionBase {
    readonly id: string;
    readonly name: string;
    readonly icon?: string;
    readonly stat: string;
    readonly description: string;
    readonly script?: SkillScriptDefinition;
}

export interface SkillDefinition extends SkillDefinitionBase {
    readonly skillId: string;
    readonly categoryId: string;
}

export type SkillScriptDefinition =
    RollDamageSkillScriptDefinition
    | CastSpellSkillScriptDefinition
    | ShieldRollDamageSkillScriptDefinition
    | RollHandDamageSkillScriptDefinition

export interface RollDamageSkillScriptDefinition {
    readonly name: 'damageRoll';
    readonly data: RollDamageSkillScriptData;
}

export interface RollDamageSkillScriptData {
    readonly weaponType: 'range' | 'melee';
    readonly charge?: boolean;
}

export interface RollHandDamageSkillScriptDefinition {
    readonly name: 'handDamageRoll';
}

export interface CastSpellSkillScriptDefinition {
    readonly name: 'castSpell';
    readonly data: CastSpellSkillScriptData;
}

export interface CastSpellSkillScriptData {
    readonly spellClass: SpellClass;
}

export interface ShieldRollDamageSkillScriptDefinition {
    readonly name: 'shieldDamageRoll';
    readonly data: ShieldRollDamageSkillScriptData;
}

export interface ShieldRollDamageSkillScriptData {
}


export default {
    champion: [
        {
            id: "shield_attack",
            name: "Attaque de bouclier",
            icon: 'icons/magic/defensive/shield-barrier-blue.webp',
            stat: "phy",
            description: "Permet au champion de se battre avec un bouclier.\n\nCette attaque peut se faire comme une seconde attaque durant son tour, il faut cependant faire un jet de dés pour chaque attaque.\n\nLa première se fait toujours avec un Combat de mêlées, la deuxième avec Attaque de bouclier.\n\nSeuls les Champions peuvent faire une attaque de bouclier.",
            script: {
                name: 'shieldDamageRoll',
                data: {}
            }
        }, {
            id: "commandment",
            name: "Commandement",
            icon: 'icons/magic/sonic/scream-wail-shout-teal.webp',
            stat: "cha",
            description: "Données ordres à un personne. Celle-ci peut faire un test de « résilience » pour résister le commandement. Si la résilience ne réussis pas, la personne devra faire l’action commandé. Cette action de devra pas mettre la vie de la personne en danger."
        }, {
            id: "disarm",
            name: "Désarmer",
            stat: "dex",
            description: "Enlever l’arme de l’ennemi. Remplace l’attaque. L’ennemi peut éviter, mais ne peut pas bloquer le désarmement avec son bouclier."
        }, {
            id: "detect_motivation",
            name: "Détection motivation",
            icon: 'icons/commodities/currency/coin-yingyang.webp',
            stat: "int",
            description: "Permet au champion de détecter si un être ment, est bon ou mauvais."
        }, {
            id: "spellcasting",
            name: "Sortilège",
            icon: 'icons/weapons/hammers/hammer-double-glowing-yellow.webp',
            stat: "cha",
            description: "Permet au champion de lancer ses sorts.",
            script: {
                name: 'castSpell',
                data: {
                    spellClass: 'champion'
                }
            }
        }
    ],
    ranger: [
        {
            id: "stealth",
            name: "Camouflage",
            icon: 'icons/magic/nature/stealth-hide-eyes-green.webp',
            stat: "dex",
            description: "Permet au forestier de se dissimuler pour des embuscades."
        }, {
            id: "move_silently",
            name: "Déplacement silencieux",
            stat: "dex",
            description: "Permet au forestier de se déplacer sans être aperçu ou entendu."
        }, {
            id: "amimal_taming",
            name: "Maîtrise des animaux",
            stat: "int",
            description: "Permet au forestier de dompter des animaux sauvages pour en faire des animaux de compagnies. Ne permet pas de créer un familier."
        }, {
            id: "tracking",
            name: "Pister",
            icon: 'icons/creatures/abilities/paw-print-tan.webp',
            stat: "per",
            description: "Permet au forestier de suivre à la trace un animal ou quelqu’un."
        }
    ],
    warrior: [
        {
            id: "charge",
            name: "Charge",
            icon: 'icons/skills/movement/figure-running-gray.webp',
            stat: "phy",
            description: "Double les dégâts de l’attaque, mais le personnage ne peut plus éviter ni utiliser son bouclier pour se protéger.",
            script: {
                name: 'damageRoll',
                data: {
                    weaponType: 'melee',
                    charge: true
                }
            }
        }, {
            id: "two_handed_combat",
            name: "Combat à deux mains",
            stat: "phy",
            description: "Permet au guerrier de se battre avec deux armes (ou ses deux mains). Il faut cependant faire un jet de dés pour chaque arme (ou main). La première avec combat de mêlées ou combats à mains nues, la deuxième avec combat à deux mains. Seuls les guerriers peuvent faire du combat avec deux armes. On doit faire son combat, soit avec deux armes ou soit avec ses deux mains.",
            script: {
                name: 'damageRoll',
                data: {
                    weaponType: 'melee'
                }
            }
        }, {
            id: "intimidation",
            name: "Intimidation",
            icon: 'icons/skills/social/intimidation-impressing.webp',
            stat: "cha",
            description: "Pour intimider un adversaire. L’adversaire doit faire un test de « résilience ». Celui s’enfuit comme un lâche. À chaque tour suivant l’intimidation peut refaire un test de « résilience » pour savoir s’il revient. Le maximum de tours est 1d6/2."
        }, {
            id: "provocation",
            name: "Provocation",
            stat: "cha",
            description: "Pour attirer l’attention des adversaires sur soi. Le guerrier hurle des insultes aux adversaires pour attirer l’attention sur lui. Chaque adversaire doit fair un jet de « résilience » afin de ne pas focaliser sur le guerrier uniquement. S’il rate, le guerrier sera sa seul et unique cible pour 1d6/2 tour."
        }
    ],
    mage: [
        {
            id: "focus",
            name: "Concentration",
            stat: "int",
            description: "Lorsque le magicien prend un tour pour faire un jet de concentration et le réussit, le mage a un bonus de 2 sur le jet de son prochain sort."
        }, {
            id: "knowledge",
            name: "Connaissance",
            icon: "icons/skills/trades/academics-book-study-purple.webp",
            stat: "int",
            description: "Permet de savoir si le magicien a des informations sur un sujet quelconque."
        }, {
            id: "magic_item",
            name: "Création d'items magiques",
            stat: "dex",
            description: "Permet au magicien de créer ses propres objets magiques avec l’approbation du maître de jeu."
        }, {
            id: "detect_magic",
            name: "Détection de la magie",
            stat: "per",
            description: "Grâce à son habitude de travailler avec la magie, le magicien est capable de distinguer l’aura magique des objets."
        }, {
            id: "spell_casting",
            name: "Sortilège",
            icon: 'icons/weapons/wands/wand-gem-blue.webp',
            stat: "int",
            description: "Permet au magicien de lancer ses sorts.",
            script: {
                name: 'castSpell',
                data: {
                    spellClass: 'mage'
                }
            }
        },
    ],
    rogue: [
        {
            id: "move_silently",
            name: "Déplacement silencieux",
            stat: "dex",
            description: "Permet au voleur de se déplacer sans être aperçu ou entendu."
        }, {
            id: "appraisal",
            name: "Évaluation",
            stat: "int",
            description: "Permet au voleur de reconnaître la valeur en oricaux d’un objet."
        }, {
            id: "forgery",
            name: "Faux-semblant",
            icon: 'icons/skills/trades/academics-scribe-quill-gray.webp',
            stat: "int",
            description: "Permet au voleur de faire une copie réaliste d’un objet ou d’un document."
        }, {
            id: "larceny",
            name: "Larcin",
            icon: 'icons/skills/social/theft-pickpocket-bribery-brown.webp',
            stat: "dex",
            description: "Permet au voleur de voler des objets, déverrouillage des serrures, faire du vol à la tire, léger-de-main, crochetage. Permet de trouver des portes secrètes, des compartiments cachés, les pièges et d’autres zones cachées spécialement construites pour échapper à la détection."
        }
    ],
    combat: [
        {
            id: "hand_combat",
            name: "Combat mains nues",
            icon: 'icons/skills/melee/unarmed-punch-fist-white.webp',
            stat: "phy",
            description: "Le personnage a une certaine connaissance des techniques de combat sans arme. S’applique : le combat de rue, la boxe, etc.",
            script: {
                name: 'handDamageRoll'
            }
        }, {
            id: "melee_combat",
            name: "Combat mêlée",
            icon: 'icons/skills/melee/strike-sword-steel-yellow.webp',
            stat: "phy",
            description: "Le personnage a une certaine connaissance des techniques de combat d’arme au poing. Seuls les guerriers peuvent faire du combat avec deux armes. S’applique : épée, gourdin, lance, fléau, hache, dague, etc.",
            script: {
                name: 'damageRoll',
                data: {
                    weaponType: 'melee'
                }
            }
        }, {
            id: "throw_shoot",
            name: "Lancer / tir",
            stat: "dex",
            icon: 'icons/skills/ranged/person-archery-bow-attack-gray.webp',
            description: "Le personnage a une certaine connaissance des techniques de combat armé au tir. S’applique : arc, fronde, dagues de lancé, hache de lancé.",
            script: {
                name: 'damageRoll',
                data: {
                    weaponType: 'range'
                }
            }
        }, {
            id: "dodge",
            name: "Éviter",
            icon: "icons/magic/defensive/shield-barrier-deflect-teal.webp",
            stat: "dex",
            description: "Le personnage a une aisance à éviter les coups."
        }, {
            id: "resilience",
            name: "Résilience",
            stat: "int",
            description: "Le personnage à une aisance à résister les sorts, à « Commandement », « Intimidation » ou « Provocation »"
        }
    ],
    general: [
        {
            id: "crafting",
            name: "Artisanat",
            stat: "dex",
            icon: 'icons/skills/trades/construction-carpentry-hammer-gray.webp',
            description: "Travail du cuir, soufflage du verre, maçonnerie, couture, poterie, peinture, taillage de pierre, fabrication du papier et reliure, etc."
        }, {
            id: "athletic",
            name: "Athlétique",
            icon: 'icons/magic/control/buff-strength-muscle-damage.webp',
            stat: "phy",
            description: "Permet de faire des actions physiques demandant une certaine force (courir, nager, sauter, main de fer, faire trébucher, etc.)."
        }, {
            id: "cooking",
            name: "Cuisiner",
            icon: 'icons/tools/cooking/bowl-steaming-brown.webp',
            stat: "dex",
            description: "Permet de faire à manger sur un poêle à bois, un feu de camp, avec des ressources trouvées, etc… Permet de redonner 1 point de vie en mangeant le repas, si le test de Cuisiner est réussi."
        }, {
            id: "disguise",
            name: "Déguisement",
            icon: 'icons/equipment/head/hood-cowl-mask-purple.webp',
            stat: "cha",
            description: "Permet de se déguiser et de passer inaperçu dans une foule ou un endroit."
        }, {
            id: "listening",
            name: "Écouter",
            stat: "per",
            description: "Permet d’entendre des discussions difficiles à percevoir telle des chuchotements, écouter derrière une porte, écouter au loin, écouter dans une foule, écouter une discussion parmi plusieurs, etc."
        }, {
            id: "eloquence",
            name: "Éloquence",
            stat: "cha",
            description: "Permet d’influencer un interlocuteur, calmer des personnes hostiles, séduire, etc."
        }, {
            id: "riding",
            name: "Équitation",
            icon: 'icons/environment/creatures/horse-tan.webp',
            stat: "dex",
            description: "Permet de faire des actions exceptionnelles à cheval, pas nécessaires pour simplement monter à cheval."
        }, {
            id: "escape",
            name: "Évasion",
            stat: "phy",
            description: "Permet de se défaire de liens ou s’échapper d’une prison."
        }, {
            id: "blacksmith",
            name: "Forgeron",
            icon: 'icons/skills/trades/smithing-anvil-silver-red.webp',
            stat: "phy",
            description: "Permet de travailler le métal (maréchal ferrant, armurier, etc.)"
        }, {
            id: "gymnastic",
            name: "Gymnastique",
            stat: "dex",
            description: "Permet de faire des actions physiques demandant une certaine dextérité (grimper, marcher sur une poutre, marcher sur une corde, sauter au travail d’un orifice étroit, etc.). Permet aussi de se relever quand on est à terre lors d’un combat."
        }, {
            id: "herbalist",
            name: "Herboriste",
            icon: 'icons/consumables/plants/leaf-herb-green.webp',
            stat: "int",
            description: "Permet de trouver des herbes, les cultiver, faire des onguents, faire des tisanes, etc. Ajouté avec le test de soin, il permet aussi d'ajouter un autre point de vie à ce dernier."
        }, {
            id: "langage",
            name: "Langage",
            stat: "int",
            description: "Permet de connaître d’autres langues que sa langue maternelle. Une nouvelle langue par point. Sers aussi à tenter d’interpréter une langue inconnue."
        }, {
            id: "rope_handling",
            name: "Manipulation des cordes",
            icon: 'icons/sundries/survival/rope-wrapped-brown.webp',
            stat: "dex",
            description: "Permet de faire des nœuds solides, des filets, etc."
        }, {
            id: "haggling",
            name: "Marchandage",
            icon: 'icons/skills/social/trading-justice-scale-gold.webp',
            stat: "cha",
            description: "Permet d’avoir des meilleurs prix, lors de ventes et d’achats (10 %)."
        }, {
            id: "monster_lore",
            name: "Monstrologie",
            icon: 'icons/sundries/books/book-symbol-skull-grey.webp',
            stat: "int",
            description: "Permet de savoir si le personnage a des informations sur un monstre."
        }, {
            id: "navigate",
            name: "Naviguer",
            icon: 'icons/tools/navigation/map-chart-tan.webp',
            stat: "int",
            description: "Permet de diriger un bateau. Permet de diriger par la lecture des cartes."
        }, {
            id: "observation",
            name: "Observer",
            icon: 'icons/magic/perception/eye-tendrils-web-purple.webp',
            stat: "per",
            description: "Voir au loin, dans le brouillard, voir des gens qui essayent de se cacher, permet de trouver des indices, etc."
        }, {
            id: "orientation",
            name: "Orientation",
            icon: 'icons/tools/navigation/compass-brass-blue-red.webp',
            stat: "per",
            description: "Connaître les indices qui indiquent le nord, sud, est et ouest. Permet de se retrouver dans une forêt, une ville ou une caverne."
        }, {
            id: "performance",
            name: "Performance",
            stat: "cha",
            description: "Permet de jouer d’un instrument de musique, de chanter ou tout autre art de la scène. Mais c’est aussi l’habileté pour mentir avec succès."
        }, {
            id: "hiding",
            name: "Se cacher",
            icon: 'icons/magic/nature/stealth-hide-beast-eyes-green.webp',
            stat: "dex",
            description: "Permet de passer inaperçu, mais le personnage doit rester immobile."
        }, {
            id: "science",
            name: "Science",
            icon: 'icons/sundries/documents/blueprint-recipe-alchemical.webp',
            stat: "int",
            description: "Pour comprendre, concevoir ou modifier des engins et mécanismes. Faire de l’alchimie et de l’astrologie."
        }, {
            id: "healing",
            name: "Soins",
            icon: 'icons/magic/nature/root-vine-caduceus-healing.webp',
            stat: "int",
            description: "Redonne 2 points de vie à la personne soignée. On peut le faire une fois par «combat», s’il y a eu de nouvelles blessures. Un succès exceptionnel (double 1) permet de faire un autre jet pour permettre de redonner deux autres points de vies. Un échec critique (double 6) fait plus de mal que de biens; la personne soignée reçoit un point de dégât."
        }, {
            id: "survival",
            name: "Survie",
            icon: 'icons/magic/fire/flame-burning-campfire-smoke.webp',
            stat: "per",
            description: "Chasse, pêche, cueillette en milieu sauvage, faire du feu, etc."
        },
    ],
} as Record<string, SkillDefinitionBase[]>

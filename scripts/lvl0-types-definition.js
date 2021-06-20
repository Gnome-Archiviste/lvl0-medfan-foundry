/**
 * @typedef {Object} Value
 * @property {number} value
 */
/**
 * @typedef {Object} MinMaxValue
 * @property {number} min
 * @property {number} value
 * @property {number} max
 */
/**
 * @typedef {Object} Statistics
 * @property {Value} phy
 * @property {Value} dex
 * @property {Value} int
 * @property {Value} cha
 * @property {Value} per
 */
/**
 * @typedef {Object} Lvl0MonsterData
 */
/**
 * @typedef {Object} JobData
 * @property {string} id
 * @property {string} specialization
 * @property {string[]} specializations
 */
/**
 * @typedef {Object} RaceData
 * @property {string} id
 */
/**
 * @typedef {Object} ItemModifierInfo
 * @property {'protection'|'cha'|'int'|'per'|'phy'|'dex'|'health'|'mana'} stat
 * @property {string} value
 */
/**
 * @typedef {Object} CharacterModifierInfo
 * @property {boolean} isPermanent
 * @property {'protection'|'cha'|'int'|'per'|'phy'|'dex'|'health'|'mana'} stat
 * @property {string} value
 * @property {string} name
 */
/**
 * @typedef {Object} Lvl0CharacterData
 * @property {ComputedCharacterData} computedData
 * @property {LevelUpData} levelUpData
 * @property {StaticInventoryData} staticInventory
 * @property {Object.<string, Object.<string, SkillValue>>} skills
 * @property {Statistics} baseStats
 * @property {Object.<string, CharacterModifierInfo>} modifiers
 * @property {MinMaxValue} health
 * @property {MinMaxValue} mana
 * @property {Value} level
 * @property {Value} experience
 * @property {JobData} job
 * @property {RaceData} race
 * @property {Object.<string, Lvl0ActorEffect>} effects
 * @property {Object.<string, String>} specialities
 */
/**
 * @typedef {Object} StaticInventoryData
 * @property {number} rationCount,
 * @property {number} torchCount,
 * @property {number} money,
 * @property {number} money100,
 * @property {number} money500,
 * @property {number} money1000
 */
/**
 * @typedef {Object} LevelUpData
 * @property {Object.<number, LevelData>} levels
 */
/**
 * @typedef {Object} LevelData
 * @property {number} health
 * @property {number} mana
 * @property {number} money
 */
/**
 * @typedef {Object} SkillDefinition
 * @property {string} name
 * @property {string} stat
 * @property {SkillScriptDefinition} script
 */
/**
 * @typedef {Object} SkillScriptDefinition
 * @property {string} name
 * @property {Object} data
 */
/**
 * @typedef {Object} ComputedCharacterData
 * @property {ComputedCharacterBaseData} bases
 * @property {ComputedCharacterLevelingData} leveling
 * @property {ComputedCharacterSkillsData} skills
 * @property {ComputedCharacterStatsData} stats
 * @property {ComputedCharacterMagicData} magic
 * @property {ComputedCharacterClutterData} clutter
 * @property {ComputedCharacterSpecialityData} speciality
 */
/**
 * @typedef {Object} ComputedCharacterSkillsData
 * @property {Object.<string, number>} maximumSkillPoints
 * @property {Object.<string, number>} availableSkillPoints
 * @property {string[]} extraSkills
 * @property {Object.<string, number>} skillModifiers
 */
/**
 * @typedef {Object} ComputedCharacterSpecialityData
 * @property {number} maxSpecialities
 * @property {boolean} canSelectNewSpeciality
 */
/**
 * @typedef {Object} ComputedCharacterClutterData
 * @property {number} totalSpace
 * @property {number} usedSpace
 * @property {number} rowCount
 * @property {number} columnCount
 * @property {Object.<string, string>} usedCells
 */
/**
 * @typedef {Object} ComputedCharacterBaseData
 * @property {RaceDefinition} race
 * @property {JobDefinition} job
 */
/**
 * @typedef {Object} ComputedCharacterMagicData
 * @property {number} arcaneLevel
 */
/**
 * @typedef {Object} ComputedCharacterStatsData
 * @property {ComputedCharacterBaseStatsData} baseStats
 * @property {{value: number}} armor
 * @property {{value: number}} movement
 */
/**
 * @typedef {Object} ComputedCharacterBaseStatsData
 * @property {{value: number, bonus: number}} phy
 * @property {{value: number, bonus: number, armor: number}} dex
 * @property {{value: number, bonus: number}} int
 * @property {{value: number, bonus: number}} cha
 * @property {{value: number, bonus: number}} per
 */
/**
 * @typedef {Object} ComputedCharacterLevelingData
 * @property {number} nextLevelExperience
 * @property {number} maximumSkillLevel
 * @property {boolean} canUseMaster
 * @property {boolean} canUseProdigy
 */
/**
 * @typedef {Object} SkillValue
 * @property {number} value
 * @property {boolean} master
 * @property {boolean} prodigy
 * @property {boolean|undefined} manualMode
 */
/**
 * @typedef {Object} RaceDefinition
 * @property {string} name
 * @property {boolean} display_subrace
 * @property {string} bonusStat
 * @property {string[]} extraSkillIds
 */
/**
 * @typedef {Object} JobDefinition
 * @property {string} name
 * @property {string|null} spellCategory
 * @property {boolean} hasJobSpecialization
 * @property {number|null} maxSpecializations
 * @property {Object.<string, string>|null} specializations
 * @property {{value: number, useStatValue: string, diceCount: number}[]} healthLevels
 * @property {{value: number, useStatValue: string, diceCount: number}[]} manaLevels
 * @property {number[]} arcaneLevels
 * @property {JobRequirement[]} requirements
 * @property {number[]} specialityLevels
 */
/**
 * @typedef {Object} JobRequirement
 * @property {string} stat
 * @property {number} min
 * @property {string[] | undefined} notRaces
 * @property {string[] | undefined} races
 */

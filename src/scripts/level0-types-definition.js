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
 */
/**
 * @typedef {Object} Lvl0CharacterData
 * @property {ComputedCharacterData} computedData
 * @property {Object.<string, Object.<string, SkillValue>>} skills
 * @property {Statistics} baseStats
 * @property {MinMaxValue} health
 * @property {MinMaxValue} mana
 * @property {Value} level
 * @property {Value} experience
 * @property {JobData} job
 * @property {string} race
 */
/**
 * @typedef {Object} SkillDefinition
 * @property {string} name
 * @property {string} stat
 */
/**
 * @typedef {Object} ComputedCharacterData
 * @property {ComputedCharacterLevelingData} leveling
 * @property {ComputedCharacterSkillsData} skills
 * @property {ComputedCharacterStatsData} stats
 */
/**
 * @typedef {Object} ComputedCharacterSkillsData
 * @property {Object.<string, number>} maximumSkillPoints
 * @property {Object.<string, number>} availableSkillPoints
 * @property {string[]} extraSkills
 */
/**
 * @typedef {Object} ComputedCharacterStatsData
 * @property {ComputedCharacterBaseStatsData} baseStats
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
 */

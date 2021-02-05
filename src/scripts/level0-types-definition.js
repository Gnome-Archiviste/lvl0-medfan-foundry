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
 * @typedef {Object} Lvl0CharacterData
 * @property {ComputedCharacterData} computedData
 * @property {Object.<string, Object.<string, SkillValue>>} skills
 * @property {Statistics} baseStats
 * @property {MinMaxValue} health
 * @property {MinMaxValue} mana
 * @property {Value} level
 * @property {Value} experience
 */
/**
 * @typedef {Object} SkillDefinition
 * @property {string} name
 * @property {string} stat
 */
/**
 * @typedef {Object} ComputedCharacterData
 * @property {ComputedCharacterLevelingData} leveling
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

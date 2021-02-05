Hooks.on('preUpdateActor',
    /**
     * @param {Lvl0Actor} actor
     * @param {object} change
     * @param {object} options
     * @param {string} id
     */
    (actor, change, options, id) => {
        if (!('custom-input' in change)) {
            return;
        }
        if (!('skills' in change['custom-input'])) {
            return;
        }
        let skills = change['custom-input']['skills'];
        for (let [skillCategoryId, skillByCategories] of Object.entries(skills)) {
            for (let [skillId, value] of Object.entries(skillByCategories)) {
                console.log(skillCategoryId + '.' + skillId + '.' + value);
            }
        }
    }
);

Hooks.on('renderActorSheet', (sheet, elements) => {
    /**
     * @type {HTMLElement}
     */
    let form = elements[0];
    let checkBoxes = form.querySelectorAll('input[data-checkboxSkillValue]');
    for (let i = 0; i < checkBoxes.length; i++) {
        let checkBox = checkBoxes[i];
        checkBox.addEventListener('click', skillValueUpdateHiddenFieldValue);
    }
})

/**
 * @param {MouseEvent} e
 */
function skillValueUpdateHiddenFieldValue(e) {
    e.stopPropagation();
    /**
     * @type {HTMLInputElement}
     */
    let checkBox = e.target;
    let hiddenField = checkBox.parentElement.querySelector('input[type=hidden]');
    if (checkBox.checked) {
        hiddenField.value = +checkBox.value;
    } else {
        hiddenField.value = +checkBox.value - 1;
    }
}

Handlebars.registerHelper('skill-value',
    /**
     * @param {SkillDefinition} skillDefinition
     * @param {Lvl0CharacterData} characterData
     * @param {string} skillCategoryId
     * @param {string} skillId
     * @return {Handlebars.SafeString|string}
     */
    function (skillDefinition, characterData, skillCategoryId, skillId, options) {
        /**
         * @type {SkillValue}
         */
        let characterSkillData;

        if (!(skillCategoryId in characterData.skills)) {
            characterSkillData = {master: false, prodigy: false, value: 0};
        } else if (!(skillId in characterData.skills[skillCategoryId])) {
            characterSkillData = {master: false, prodigy: false, value: 0};
        } else {
            characterSkillData = characterData.skills[skillCategoryId][skillId];
        }
        if (characterSkillData.value == null)
            characterSkillData.value = 0;

        let checked = [false, false, false];
        for (let i = 0; i < 3; i++) {
            if (characterSkillData.value > i)
                checked[i] = true;
        }

        let skillLevel = +characterSkillData.value;
        let masterEnabled = characterData.computedData.leveling.canUseMaster && skillLevel === 3 && !characterSkillData.prodigy;
        let prodigyEnabled = characterData.computedData.leveling.canUseProdigy && skillLevel === 3 && characterSkillData.master;

        // Only enable checkboxes that make sense
        let availableSkillLevel = [false, false, false];
        if (!characterSkillData.prodigy && !characterSkillData.master) {
            for (let i = 0; i < availableSkillLevel.length; i++) {
                availableSkillLevel[i] = i < characterData.computedData.leveling.maximumSkillLevel;
            }
            for (let i = 1; i < 3; i++) {
                if (!checked[i - 1]) {
                    availableSkillLevel[i] = false;
                }
            }
            for (let i = 0; i < characterSkillData.value - 1; i++)
                availableSkillLevel[i] = false;
        }

        let skillTestValue = skillLevel + characterData.baseStats[skillDefinition.stat].value;

        return new Handlebars.SafeString(`<span class="sheet-skill-value">
            <span class="sheet-skill-levels">
                <input type="hidden" name="data.skills.${skillCategoryId}.${skillId}.value" type="number" data-dtype="number" value="${characterSkillData.value}">
                <input type="checkbox" value="1" data-checkboxSkillValue
                       ${checked[0] ? 'checked' : ''} ${availableSkillLevel[0] ? '' : 'disabled'}/>
                <input type="checkbox" value="2" data-checkboxSkillValue
                       ${checked[1] ? 'checked' : ''} ${availableSkillLevel[1] ? '' : 'disabled'}/>
                <input type="checkbox" value="3" data-checkboxSkillValue
                       ${checked[2] ? 'checked' : ''} ${availableSkillLevel[2] ? '' : 'disabled'}/>
            </span>
            <span class="sheet-skill-stat">
                + <span class="sheet-${skillDefinition.stat}">${skillDefinition.stat.charAt(0).toUpperCase() + skillDefinition.stat.substr(1)}</span>
            </span>
            <span class="sheet-skill-level">
                ${skillTestValue}
            </span>
            <span class="sheet-skill-rerolls">
                <input type="checkbox" data-dtype='boolean' name="data.skills.${skillCategoryId}.${skillId}.master" ${characterSkillData.master ? 'checked' : ''} ${masterEnabled ? '' : 'disabled'}/>
                <input type="checkbox" data-dtype='boolean' name="data.skills.${skillCategoryId}.${skillId}.prodigy" ${characterSkillData.prodigy ? 'checked' : ''} ${prodigyEnabled ? '' : 'disabled'}/>
            </span>
        </span>`);
    }
);

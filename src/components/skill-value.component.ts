import {container} from 'tsyringe';
import {RollSkillManager} from "../managers/skill";
import {SkillDefinition} from '../repositories/data';
import ClickEvent = JQuery.ClickEvent;
import {Lvl0CharacterData, SkillValue} from '../app/data-accessor/models/lvl0-character';

Hooks.on('renderActorSheet', (sheet: ActorSheet, elements) => {
    let form = elements[0];
    let checkBoxes = form.querySelectorAll('input[data-checkboxSkillValue]');
    for (let i = 0; i < checkBoxes.length; i++) {
        let checkBox = checkBoxes[i];
        checkBox.addEventListener('click', skillValueUpdateHiddenFieldValue);
    }
})

function skillValueUpdateHiddenFieldValue(e: ClickEvent) {
    e.stopPropagation();
    let checkBox = e.target;
    let hiddenField = checkBox.parentElement.querySelector('input[type=hidden]');
    if (checkBox.checked) {
        hiddenField.value = +checkBox.value;
    } else {
        hiddenField.value = +checkBox.value - 1;
    }
}

function getAvailableAddPointLevel(
    characterData: Lvl0CharacterData,
    skillCategoryId: string
): 'prodigy' | 'master' | 'normal' | undefined {
    if (characterData.computedData.skills.availableSkillPoints['prodigy'] > 0)
        return 'prodigy';
    if (characterData.computedData.skills.availableSkillPoints['master'] > 0)
        return 'master';
    if (characterData.computedData.skills.availableSkillPoints['all'] > 0)
        return 'normal';
    if (characterData.computedData.skills.availableSkillPoints['job_combat'] > 0 && (skillCategoryId !== 'general'))
        return 'normal';
    if (characterData.computedData.skills.availableSkillPoints['general'] > 0 && (skillCategoryId === 'general'))
        return 'normal';
    return undefined;
}

function renderSkillValueManualMode(
    skillDefinition: SkillDefinition,
    characterData: Lvl0CharacterData,
    characterSkillData: SkillValue,
    skillCategoryId: string,
    skillId: string
): Handlebars.SafeString | string {
    let skillTestValue = container.resolve(RollSkillManager).getSkillSuccessValue(characterData, skillCategoryId + '.' + skillId);

    return new Handlebars.SafeString(`<span class="sheet-skill-value">
            <span class="sheet-skill-levels">
                <input type="text" name="data.skills.${skillCategoryId}.${skillId}.value" type="number" data-dtype="number" value="${characterSkillData.value}">
            </span>
            <span class="sheet-skill-stat">
                + <span class="stat-${skillDefinition.stat}">${skillDefinition.stat.charAt(0).toUpperCase() + skillDefinition.stat.substring(1)}</span>
            </span>
            <span class="sheet-skill-level">
                ${skillTestValue}
            </span>
            <span class="sheet-skill-rerolls">
                <input type="checkbox" data-dtype='boolean' name="data.skills.${skillCategoryId}.${skillId}.master" ${characterSkillData.master ? 'checked' : ''} />
                <input type="checkbox" data-dtype='boolean' name="data.skills.${skillCategoryId}.${skillId}.prodigy" ${characterSkillData.prodigy ? 'checked' : ''} />
            </span>
        </span>`);
}

Handlebars.registerHelper('skill-value',
    function (
        skillDefinition: SkillDefinition,
        characterData: Lvl0CharacterData,
        skillCategoryId: string,
        skillId: string
    ): Handlebars.SafeString | string {
        let characterSkillData: SkillValue;
        let newPointMaxLevel = getAvailableAddPointLevel(characterData, skillCategoryId);

        if (!(skillCategoryId in characterData.skills)) {
            characterSkillData = {master: false, prodigy: false, value: 0};
        } else if (!(skillId in characterData.skills[skillCategoryId])) {
            characterSkillData = {master: false, prodigy: false, value: 0};
        } else {
            characterSkillData = characterData.skills[skillCategoryId][skillId];
        }

        if (characterSkillData.value == null)
            characterSkillData.value = 0;

        if (characterSkillData.manualMode) {
            return renderSkillValueManualMode(skillDefinition, characterData, characterSkillData, skillCategoryId, skillId);
        }

        let skillLevel = +characterSkillData.value;
        let fullSkillId = skillCategoryId + '.' + skillId;
        let isExtra = characterData.computedData.skills.extraSkills.indexOf(fullSkillId) !== -1;
        let useExtra = false;
        if (isExtra) {
            if (skillLevel === 0)
                useExtra = true;
            skillLevel++;
        }

        let checked = [false, false, false];
        for (let i = 0; i < 3; i++) {
            if (skillLevel > i)
                checked[i] = true;
        }

        let masterEnabled = characterData.computedData.leveling.canUseMaster
            && skillLevel === 3
            && !characterSkillData.prodigy
            && (newPointMaxLevel === 'master' || newPointMaxLevel === 'prodigy' || (newPointMaxLevel === undefined && characterSkillData.master));
        let prodigyEnabled = characterData.computedData.leveling.canUseProdigy
            && skillLevel === 3
            && characterSkillData.master
            && (newPointMaxLevel === 'prodigy' || (newPointMaxLevel === undefined && characterSkillData.prodigy));

        // Only enable checkboxes that make sense
        let availableSkillLevel = [false, false, false];
        if (!characterSkillData.prodigy && !characterSkillData.master) {
            for (let i = 0; i < availableSkillLevel.length; i++) {
                if (newPointMaxLevel)
                    availableSkillLevel[i] = i < characterData.computedData.leveling.maximumSkillLevel;
                else
                    availableSkillLevel[i] = (i + 1) === skillLevel;
                if (i === 0 && useExtra)
                    availableSkillLevel[i] = false;
            }
            for (let i = 1; i < 3; i++) {
                if (!checked[i - 1]) {
                    availableSkillLevel[i] = false;
                }
            }
            for (let i = 0; i < characterSkillData.value - 1; i++)
                availableSkillLevel[i] = false;
        }

        let skillTestValue = container.resolve(RollSkillManager).getSkillSuccessValue(characterData, skillCategoryId + '.' + skillId);
        let skillIsEffectedByAModifier = skillCategoryId + '.' + skillId in characterData.computedData.skills.skillModifiers;

        return new Handlebars.SafeString(`<span class="sheet-skill-value">
            <span class="sheet-skill-levels">
                <input type="hidden" name="data.skills.${skillCategoryId}.${skillId}.value" type="number" data-dtype="number" value="${characterSkillData.value}">
                <input type="checkbox" value="${isExtra ? 0 : 1}" data-checkboxSkillValue
                       ${checked[0] ? 'checked' : ''} ${availableSkillLevel[0] ? '' : 'disabled'}/>
                <input type="checkbox" value="${isExtra ? 1 : 2}" data-checkboxSkillValue
                       ${checked[1] ? 'checked' : ''} ${availableSkillLevel[1] ? '' : 'disabled'}/>
                <input type="checkbox" value="${isExtra ? 2 : 3}" data-checkboxSkillValue
                       ${checked[2] ? 'checked' : ''} ${availableSkillLevel[2] ? '' : 'disabled'}/>
            </span>
            <span class="sheet-skill-stat">
                + <span class="stat-${skillDefinition.stat}">${skillDefinition.stat.charAt(0).toUpperCase() + skillDefinition.stat.substring(1)}</span>
            </span>
            <span class="sheet-skill-level ${skillIsEffectedByAModifier ? 'affected-by-modifier' : ''}">
                ${skillTestValue}
            </span>
            <span class="sheet-skill-rerolls">
                <input type="checkbox" data-dtype='boolean' name="data.skills.${skillCategoryId}.${skillId}.master" ${characterSkillData.master ? 'checked' : ''} ${masterEnabled ? '' : 'disabled'}/>
                <input type="checkbox" data-dtype='boolean' name="data.skills.${skillCategoryId}.${skillId}.prodigy" ${characterSkillData.prodigy ? 'checked' : ''} ${prodigyEnabled ? '' : 'disabled'}/>
            </span>
        </span>`);
    }
);

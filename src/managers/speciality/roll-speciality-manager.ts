import {inject, singleton} from 'tsyringe';
import {RollSkillManager} from "../skill";
import {WeaponSelector} from "utils/weapon-selector";
import {WeaponDamageRollUtil} from "utils/weapon-damage-roll-util";
import {RollUtil} from 'utils/roll-util';
import {AmmunitionItemProperties, WeaponType} from 'models/item';
import {SpecialityDefinition} from 'repositories/data';
import {ElementRepository, SpecialityRepository} from 'repositories';
import {assertIsCharacter} from 'models/actor';
import {RollFactory} from 'utils/roll-factory';
import {Evaluated} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/dice/roll';



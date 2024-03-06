import {Lvl0Character} from '../models/lvl0-character';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {CharacterEffect, selectCharacterEffects} from './character-effects-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {Lvl0ActorEffectArmor} from '../actor-effect.service';

export type Lvl0ActorEffectArmorWithEffectId = Lvl0ActorEffectArmor & {
    effectId: string;
};

export class CharacterMagicArmorSelector {
    static computeMagicArmor(
        characterEffects: CharacterEffect[],
    ): Lvl0ActorEffectArmorWithEffectId | undefined {
        for (let characterEffect of characterEffects) {
            if (characterEffect.magicArmor) {
                return {...characterEffect.magicArmor, effectId: characterEffect.effectId};
            }
        }

        return undefined;
    }
}

export function selectCharacterMagicArmor(systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<Lvl0ActorEffectArmorWithEffectId | undefined> {
        return new Observable<Lvl0ActorEffectArmorWithEffectId | undefined>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterEffects(systemDataDatabaseService)),
            ]).subscribe({
                next: ([effects]: [CharacterEffect[]]) => {
                    subscriber.next(CharacterMagicArmorSelector.computeMagicArmor(effects));
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        }).pipe(
            distinctUntilChanged(),
            shareReplay(1)
        );
    };
}

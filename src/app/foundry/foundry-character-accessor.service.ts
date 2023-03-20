import {Injectable, NgZone} from '@angular/core';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {Lvl0Character} from '../data-accessor/models/lvl0-character';
import {Lvl0Actor} from '../../models/actor';
import {Lvl0FoundryItem} from '../../models/item';
import {FoundryToLvl0Mapper} from './foundry-to-lvl0-mapper';

// This allow `game` to be resolved
declare global {
    interface LenientGlobalVariableTypes {
        game: never; // the type doesn't matter
    }
}

@Injectable()
export class FoundryCharacterAccessorService extends CharacterAccessorService {
    private readonly characterSubjectByIds: Map<string, Subject<Lvl0Character>> = new Map<string, Subject<Lvl0Character>>();

    constructor(
        private readonly ngZone: NgZone,
        private readonly foundryToLvl0Mapper: FoundryToLvl0Mapper
    ) {
        super();

        // FIXME: Add hook on actor delete

        Hooks.on('updateActor', (actor: Lvl0Actor, _change: any, _options: { diff: boolean, render: boolean }, _userId: string) => {
            this.ngZone.run(() => {
                this.updateActor(actor);
            })
        })

        Hooks.on('updateItem', (item: Lvl0FoundryItem, _change: any, _options: { diff: boolean, render: boolean }, _userId: string) => {
            this.ngZone.run(() => {
                this.updateActor(item.actor);
            })
        })
    }

    selectCharacter(id: string): Observable<Lvl0Character> {
        if (!id) {
            throw new Error(`Invalid actor id. Undefined or empty: '${id}'`);
        }
        let existingSubject = this.characterSubjectByIds.get(id);
        if (existingSubject) {
            return existingSubject;
        }

        let actor: Lvl0Actor;
        if (id.includes('@')) {
            let tokenId = id.substring(id.indexOf('@') + 1);
            actor = canvas?.tokens?.get(tokenId)?.actor as Lvl0Actor
        } else {
            actor = game.actors?.get(id) as Lvl0Actor;
        }
        if (!actor) {
            throw new Error(`Actor '${id}' not found`);
        }
        let lvl0Character = this.foundryToLvl0Mapper.createLvl0CharacterFromFoundryActor(actor);

        let subject = new BehaviorSubject<Lvl0Character>(lvl0Character);
        this.characterSubjectByIds.set(id, subject);
        return subject;
    }

    private updateActor(actor?: Lvl0Actor | null) {
        if (!actor) {
            return;
        }

        let actorId = actor.lvl0Id;
        if (!actorId) {
            return;
        }

        let subject = this.characterSubjectByIds.get(actorId);
        if (subject) {
            subject.next(this.foundryToLvl0Mapper.createLvl0CharacterFromFoundryActor(actor as Lvl0Actor));
        }
    }
}

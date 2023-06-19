import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CharacterNote, Lvl0Character} from '../data-accessor/models/lvl0-character';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {selectNotes} from '../data-accessor/selectors/character-selectors';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';

@Component({
    selector: 'lvl0-character-sheet-notes',
    templateUrl: './character-sheet-notes.component.html',
    styleUrls: ['./character-sheet-notes.component.scss']
})
export class CharacterSheetNotesComponent implements OnInit {
    @Input() characterId!: string;

    character$: Observable<Lvl0Character>;
    note$: Observable<CharacterNote>;
    editable = false;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly actorUpdaterService: ActorUpdaterService,
    ) {
    }

    ngOnInit() {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
        this.note$ = this.character$.pipe(selectNotes())
    }

    toggleEdit() {
        this.editable = !this.editable;
    }

    updateNodeMode(mode: 'html' | 'markdown') {
        this.actorUpdaterService.updateActor(this.characterId, {data: {notes: {mode: mode}}})
    }

    updateNoteContent(content: string | null) {
        console.warn(content);
        this.actorUpdaterService.updateActor(this.characterId, {data: {notes: {content: content ?? ''}}})
    }
}

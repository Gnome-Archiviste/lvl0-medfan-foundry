import {Component, Input, OnInit} from '@angular/core';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {Observable} from 'rxjs';
import {Lvl0Character} from '../data-accessor/models/lvl0-character';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';

type TabNames = 'character' | 'equipment' | 'inventory' | 'modifiers' | 'notes';

@Component({
    selector: 'lvl0-character-sheet-component',
    templateUrl: './character-sheet.component.html',
    styleUrls: ['./character-sheet.component.scss'],
    standalone: false
})
export class CharacterSheetComponent implements OnInit {
    @Input('characterId')
    characterId: string;

    character$: Observable<Lvl0Character>;
    selectedTab: TabNames = 'character';

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
    ) {

    }

    ngOnInit() {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
    }

    protected readonly screenLeft = screenLeft;

    selectTab(tab: TabNames) {
        this.selectedTab = tab;
    }
}

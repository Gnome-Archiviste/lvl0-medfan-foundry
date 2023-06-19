import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {SpellSelectorComponent} from './spell/spell-selector.component';
import {SpellModule} from './spell/spell.module';
import {FoundryModule} from './foundry/foundry.module';
import {SpellDefinitionSelectorComponent} from './item/spell-definition-selector.component';
import {ItemEditorComponent} from './item/item-editor.component';
import {ItemModule} from './item/item.module';
import {CharacterSheetComponent} from './actor/character-sheet.component';
import {ActorModule} from './actor/actor.module';
import {LevelUpDialogComponent} from './actor/level-up-dialog.component';
import {CharacterInitialStatRollDialogComponent} from './actor/character-initial-stat-roll-dialog.component';
import {SkillRollResultComponent} from './skill/skill-roll-result.component';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        SpellModule,
        ItemModule,
        ActorModule,
        FoundryModule,
    ],
    providers: [],
    bootstrap: []
})
export class AppModule {

    constructor(private injector: Injector) {

        const elements: any[] = [
            [SpellSelectorComponent, 'lvl0-spell-selector'],
            [SpellDefinitionSelectorComponent, 'lvl0-spell-definition-selector'],
            [CharacterInitialStatRollDialogComponent, 'lvl0-character-initial-stat-roll-dialog'],
            [LevelUpDialogComponent, 'lvl0-level-up-dialog'],
            [ItemEditorComponent, 'lvl0-item-editor'],
            [CharacterSheetComponent, 'lvl0-character-sheet'],
            [SkillRollResultComponent, 'lvl0-skill-roll-result'],
        ];

        for (const [component, name] of elements) {
            const el = createCustomElement(component, {injector: this.injector});
            customElements.define(name, el);
        }
    }

    ngDoBootstrap() {
    }

}

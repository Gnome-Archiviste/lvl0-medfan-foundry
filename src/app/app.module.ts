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
import {ItemService} from './data-accessor/item.service';
import {FileSelectorService} from './data-accessor/file-selector.service';
import {ChatWrapperComponent} from './chat/chat-wrapper.component';
import {ChatModule} from './chat/chat.module';
import {SelectSpecialityDialog} from '../ui/dialog';
import {SelectSpecialityDialogComponent} from './speciality/select-speciality-dialog.component';
import {SpecialityService} from './speciality/speciality.service';
import {WeaponSelectorDialogComponent} from './item/weapon-selector-dialog.component';
import {ActorEffectService} from './data-accessor/actor-effect.service';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        SpellModule,
        ItemModule,
        ActorModule,
        FoundryModule,
        ChatModule
    ],
    providers: [],
    bootstrap: []
})
export class AppModule {

    constructor(
        private readonly injector: Injector,
        readonly specialityService: SpecialityService,
        readonly actorEffectService: ActorEffectService
    ) {

        const elements: any[] = [
            [SpellSelectorComponent, 'lvl0-spell-selector'],
            [SpellDefinitionSelectorComponent, 'lvl0-spell-definition-selector'],
            [CharacterInitialStatRollDialogComponent, 'lvl0-character-initial-stat-roll-dialog'],
            [SelectSpecialityDialogComponent, 'lvl0-select-speciality-dialog'],
            [LevelUpDialogComponent, 'lvl0-level-up-dialog'],
            [WeaponSelectorDialogComponent, 'lvl0-weapon-selector-dialog'],
            [ItemEditorComponent, 'lvl0-item-editor'],
            [CharacterSheetComponent, 'lvl0-character-sheet'],
            [SkillRollResultComponent, 'lvl0-skill-roll-result'],
            [ChatWrapperComponent, 'lvl0-chat-message'],
        ];

        for (const [component, name] of elements) {
            const el = createCustomElement(component, {injector: this.injector});
            customElements.define(name, el);
        }
    }

    ngDoBootstrap() {
    }

}

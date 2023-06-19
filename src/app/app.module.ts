import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {SpellSelectorComponent} from './spell/spell-selector.component';
import {SpellModule} from './spell/spell.module';
import {FoundryModule} from './foundry/foundry.module';
import {SpellDefinitionSelectorComponent} from './item/spell-definition-selector.component';
import {ItemEditorComponent} from './item/item-editor.component';
import {ItemModule} from './item/item.module';
import { CharacterSheetComponent } from './actor/character-sheet.component';

@NgModule({
    declarations: [
    CharacterSheetComponent
  ],
    imports: [
        BrowserModule,
        SpellModule,
        ItemModule,
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
            [ItemEditorComponent, 'lvl0-item-editor'],
            [CharacterSheetComponent, 'lvl0-character-sheet'],
        ];

        for (const [component, name] of elements) {
            const el = createCustomElement(component, {injector: this.injector});
            customElements.define(name, el);
        }
    }

    ngDoBootstrap() {
    }

}

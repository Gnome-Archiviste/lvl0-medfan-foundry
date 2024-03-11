import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemEditorComponent} from './item-editor.component';
import {FormsModule} from '@angular/forms';
import {ItemPropertyFieldDirective} from './item-property-field.directive';
import {TextFieldModule} from '@angular/cdk/text-field';
import {SharedModule} from '../shared/shared.module';
import {SpellDefinitionSelectorComponent} from './spell-definition-selector.component';
import {MarkdownModule} from '../markdown/markdown.module';
import {SpellModule} from '../spell/spell.module';
import {WeaponSelectorDialogComponent} from './weapon-selector-dialog.component';
import { WeaponDamageComponent } from './weapon-damage.component';

@NgModule({
    declarations: [
        ItemEditorComponent,
        ItemPropertyFieldDirective,
        SpellDefinitionSelectorComponent,
        WeaponSelectorDialogComponent,
        WeaponDamageComponent,
    ],
    exports: [
        WeaponDamageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TextFieldModule,
        SharedModule,
        MarkdownModule,
        SpellModule,
    ]
})
export class ItemModule {
}

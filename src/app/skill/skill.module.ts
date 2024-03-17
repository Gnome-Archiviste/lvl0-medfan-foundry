import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillRollResultComponent} from './skill-roll-result.component';
import {ItemModule} from '../item/item.module';
import {WandSelectorDialogComponent} from './wand-selector-dialog.component';
import {SpellModule} from '../spell/spell.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        SkillRollResultComponent,
        WandSelectorDialogComponent,
    ],
    imports: [
        CommonModule,
        ItemModule,
        SpellModule,
        FormsModule
    ]
})
export class SkillModule {
}

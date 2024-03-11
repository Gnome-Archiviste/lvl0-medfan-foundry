import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillRollResultComponent} from './skill-roll-result.component';
import {ItemModule} from '../item/item.module';
import { WandSelectorDialogComponent } from './wand-selector-dialog.component';


@NgModule({
  declarations: [
    SkillRollResultComponent,
    WandSelectorDialogComponent,
  ],
    imports: [
        CommonModule,
        ItemModule
    ]
})
export class SkillModule { }

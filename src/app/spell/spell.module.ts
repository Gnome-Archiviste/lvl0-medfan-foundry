import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpellSelectorDialogComponent} from './spell-selector-dialog.component';
import {MarkdownModule} from '../markdown/markdown.module';
import {SpellStatValueComponent} from './spell-stat-value.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {CdkMenuModule} from '@angular/cdk/menu';
import { SpellComponent } from './spell.component';


@NgModule({
    declarations: [
        SpellSelectorDialogComponent,
        SpellStatValueComponent,
        SpellComponent
    ],
    exports: [
        SpellComponent
    ],
    imports: [
        CommonModule,
        MarkdownModule,
        SharedModule,
        FormsModule,
        CdkMenuModule
    ]
})
export class SpellModule {
}

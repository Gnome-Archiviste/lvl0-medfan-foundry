import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import {SharedModule} from '../shared/shared.module';
import {MarkdownModule} from '../markdown/markdown.module';
import {SpellModule} from '../spell/spell.module';
import {CharacterSheetComponent} from './character-sheet.component';
import {ActorPropertyFieldDirective} from './actor-property-field.directive';
import {ActorPropertyArrayFieldDirective} from './actor-property-array-field.directive';
import {CharacterBasicInformationComponent} from './character-basic-information.component';
import {CharacterSheetStatsComponent} from './character-sheet-stats.component';
import {RelativeValueEditorComponent} from './relative-value-editor.component';
import {LevelUpDialogComponent} from './level-up-dialog.component';
import {CharacterInitialStatRollDialogComponent} from './character-initial-stat-roll-dialog.component';
import {CharacterSheetSkillsComponent} from './character-sheet-skills.component';
import {CharacterSkillCategoryComponent} from './character-skill-category.component';
import {CharacterSkillComponent} from './character-skill.component';
import {CdkMenuModule} from '@angular/cdk/menu';
import {CharacterSpecialitiesComponent} from './character-specialities.component';
import {CharacterSheetEffectsComponent} from './character-sheet-effects.component';
import {CharacterSheetEquipmentComponent} from './character-sheet-equipment.component';
import {CharacterSheetInventoryComponent} from './character-sheet-inventory.component';
import {CharacterSheetNotesComponent} from './character-sheet-notes.component';
import {CharacterSheetModifiersComponent} from './character-sheet-modifiers.component';
import {GenerateMissingLevelUpDataDialogComponent} from './generate-missing-level-up-data-dialog.component';
import {ItemModule} from '../item/item.module';

@NgModule({
    declarations: [
        CharacterSheetComponent,
        ActorPropertyFieldDirective,
        ActorPropertyArrayFieldDirective,
        CharacterBasicInformationComponent,
        CharacterSheetStatsComponent,
        RelativeValueEditorComponent,
        LevelUpDialogComponent,
        CharacterInitialStatRollDialogComponent,
        CharacterSheetSkillsComponent,
        CharacterSkillCategoryComponent,
        CharacterSkillComponent,
        CharacterSpecialitiesComponent,
        CharacterSheetEffectsComponent,
        CharacterSheetEquipmentComponent,
        CharacterSheetInventoryComponent,
        CharacterSheetNotesComponent,
        CharacterSheetModifiersComponent,
        GenerateMissingLevelUpDataDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TextFieldModule,
        SharedModule,
        MarkdownModule,
        SpellModule,
        CdkMenuModule,
        ItemModule,
    ]
})
export class ActorModule {

}

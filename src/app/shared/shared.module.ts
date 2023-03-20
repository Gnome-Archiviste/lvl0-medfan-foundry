import {NgModule} from '@angular/core';
import {FoundryModule} from '../foundry/foundry.module';
import {TranslatePipe} from './translate.pipe';

@NgModule({
    imports: [
        FoundryModule
    ],
    exports: [
        TranslatePipe
    ],
    declarations: [
        TranslatePipe
    ]
})
export class SharedModule {

}

import {NgModule} from '@angular/core';
import {FoundryModule} from '../foundry/foundry.module';
import {TranslatePipe} from './translate.pipe';
import {RippleDirective} from './ripple.directive';

@NgModule({
    imports: [
        FoundryModule
    ],
    exports: [
        TranslatePipe,
        RippleDirective
    ],
    declarations: [
        TranslatePipe,
        RippleDirective
    ]
})
export class SharedModule {

}

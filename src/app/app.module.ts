import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {SpellSelectorComponent} from './spell/spell-selector.component';
import {SpellModule} from './spell/spell.module';
import {FoundryModule} from './foundry/foundry.module';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        SpellModule,
        FoundryModule,
    ],
    providers: [],
    bootstrap: []
})
export class AppModule {

    constructor(private injector: Injector) {

        const elements: any[] = [
            [SpellSelectorComponent, 'lvl0-spell-selector'],
        ];

        for (const [component, name] of elements) {
            const el = createCustomElement(component, {injector: this.injector});
            customElements.define(name, el);
        }
    }

    ngDoBootstrap() {
    }

}

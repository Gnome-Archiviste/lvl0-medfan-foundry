import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from './translate.service';

@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {
    constructor(
        private readonly translateService: TranslateService
    ) {
    }

    transform(value: string, prefix?: string, ...args: string[]): string {
        if (!prefix)
            return this.translateService.translate(value);
        return this.translateService.translate(prefix + '.' + value);
    }

}

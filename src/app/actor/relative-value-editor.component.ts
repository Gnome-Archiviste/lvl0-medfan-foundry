import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CdkMenu} from '@angular/cdk/menu';

@Component({
    selector: 'lvl0-relative-value-editor',
    templateUrl: './relative-value-editor.component.html',
    styleUrls: ['./relative-value-editor.component.scss'],
    standalone: false
})
export class RelativeValueEditorComponent implements OnInit, OnDestroy {
    @Output('onChange')
    onChange: EventEmitter<number> = new EventEmitter<number>();
    @Input('value$')
    value$?: Observable<number>;
    @Input('value')
    value?: number;
    @Input({transform: numberAttribute, alias: 'max'})
    max?: number;
    @Input('min')
    min?: number;
    @ViewChild('editField', {static: false})
    editField?: ElementRef<HTMLInputElement>
    @Input('editable')
    editable: boolean;

    fieldValue?: string;
    private subscription = new Subscription();
    private valueSnapshot: number;

    constructor(
        private readonly ngZone: NgZone,
    ) {
    }

    ngOnInit(): void {
        if (this.value$)
            this.subscription.add(this.value$.subscribe(v => this.valueSnapshot = v))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    startEdit() {
        if (this.value$)
            this.fieldValue = this.valueSnapshot.toString();
        else if (this.value !== undefined) {
            this.valueSnapshot = this.value;
            this.fieldValue = this.value.toString();
        }
        setTimeout(() => {
            this.ngZone.run(() => {
                if (this.editField) {
                    this.editField.nativeElement.focus();
                    this.editField.nativeElement.select();
                }
            });
        })
    }

    validChange(menuContent: CdkMenu) {
        menuContent.menuStack.closeAll();
        if (!this.fieldValue)
            return;
        let newValue = NaN;
        if (this.fieldValue === 'max') {
            newValue = this.max ?? NaN;
        } else if (this.fieldValue === 'min') {
            newValue = this.min ?? NaN;
        } else {
            newValue = this.valueSnapshot;
            if (this.fieldValue.startsWith('+')) {
                newValue += parseInt(this.fieldValue.substring(1));
            } else if (this.fieldValue.startsWith('-')) {
                newValue += parseInt(this.fieldValue);
            } else {
                newValue = parseInt(this.fieldValue);
            }
        }
        if (isNaN(newValue))
            return;
        this.onChange.next(newValue);
        this.fieldValue = undefined;
    }
}

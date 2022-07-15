import { inject, injectable } from 'tsyringe';
import { DialogBase, DialogResultCallback } from './dialog-base';
import { RollFactory } from '../../utils/roll-factory';

export interface RollStatDialogData {
}

export interface RollStatDialogResult {
    statsValue: { [statName: string]: number }
}

@injectable()
export class RollStatDialog extends DialogBase<RollStatDialogData, RollStatDialogResult> {
    private state: 'modeSelection' | 'selectColumn' | 'selectValues' = 'modeSelection';
    private rolls: number[][] = [];
    private selectedRoll: number[] = [];
    private diceStats: string[] = ['', '', '', '', ''];

    constructor(
        @inject("DIALOG_DATA") dialogData: RollStatDialogData,
        @inject("DIALOG_RESULT") result: DialogResultCallback<RollStatDialogResult>,
        @inject(RollFactory) private readonly rollFactory: RollFactory,
    ) {
        super(dialogData, result);
    }

    override get title(): string {
        return "Roll stats";
    }

    override getData(options?: Partial<ApplicationOptions>): object | Promise<object> {
        let stats = {
            '': '',
            'int': 'Intelligence',
            'phy': 'Physique',
            'cha': 'Charisme',
            'per': 'Perception',
            'dex': 'Dextérité',
        };

        return {
            ...super.getData(options),
            state: this.state,
            rolls: this.rolls,
            diceStats: this.diceStats,
            selectedRoll: this.selectedRoll,
            stats: stats,
            valid: this.isValid()
        };
    }

    private isValid(): boolean {
        if (this.state != 'selectValues')
            return false;
        if (this.diceStats.filter(x => !x).length > 0)
            return false;
        if ([...new Set(this.diceStats)].length != 5)
            return false;
        return true;
    }

    protected override getResult(): RollStatDialogResult | undefined {
        const statValues = {};
        for (let i = 0; i < 5; i++) {
            statValues[this.diceStats[i]] = this.selectedRoll[i];
        }
        return {statsValue: statValues};
    }

    override activateListeners(html: JQuery): void {
        super.activateListeners(html);

        html.find('[data-select-mode]').on('click', ev => {
            this.selectMode(ev.currentTarget.dataset.selectMode);
        });
        html.find('[data-select-roll]').on('click', ev => {
            let selectedRollIndex = ev.currentTarget.dataset.selectRoll;
            if (selectedRollIndex !== undefined)
                this.selectRoll(+selectedRollIndex);
        });
        html.find('[data-stat-dice]').on('change', ev => {
            const index = ev.currentTarget.dataset.statDice;
            if (index) {
                this.diceStats[+index] = (ev.target as HTMLSelectElement).value;
                console.log(this.diceStats);
                this.render(true);
            }
        });
    }

    private selectRoll(index: number) {
        this.selectedRoll = this.rolls[index];
        this.state = 'selectValues';
        this.render(true);
    }

    private async selectMode(rollMode?: string) {
        switch (rollMode) {
            case 'random-1':
                const values: number[] = [];
                while (values.length < 5) {
                    const roll = await this.rollFactory.createRoll('1d6');
                    if (roll.total != 1)
                        values.push(roll.total);
                }
                this.selectedRoll = values;
                this.state = 'selectValues';
                break;
            case 'random-3':
                const rolls: number[][] = [];
                while (rolls.length < 3) {
                    const values: number[] = [];
                    for (let i = 0; i < 5; i++) {
                        const roll = await this.rollFactory.createRoll('1d6');
                        values.push(roll.total);
                    }
                    rolls.push(values);
                }
                this.rolls = rolls;
                this.state = 'selectColumn';
                break;
        }
        this.render(true)
    }

    static get defaultOptions(): ApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "rollStats",
            template: "systems/lvl0mf-sheet/ui/dialog/roll-stats-dialog.hbs",
            popOut: true,
            width: 400,
            height: 400
        };
    }
}

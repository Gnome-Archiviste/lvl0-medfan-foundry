import {Component, Input, OnInit} from '@angular/core';
import {Lvl0Character} from '../data-accessor/models/lvl0-character';
import {selectCharacterRaceDefinition} from '../data-accessor/selectors/character-race-definition-selector';
import {selectCharacterJobDefinition} from '../data-accessor/selectors/character-job-definition-selector';
import {selectCharacterJobSpecializations} from '../data-accessor/selectors/character-job-specializations-selector';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {map, Observable} from 'rxjs';
import {JobDefinition, RaceDefinition} from '../../repositories';
import {FileSelectorService} from '../data-accessor/file-selector.service';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {UserService} from '../shared/user-service';
import {selectCharacterLevel} from '../data-accessor/selectors/character-selectors';

@Component({
    selector: 'lvl0-character-basic-information',
    templateUrl: './character-basic-information.component.html',
    styleUrls: ['./character-basic-information.component.scss']
})
export class CharacterBasicInformationComponent implements OnInit {
    @Input('characterId')
    characterId: string;

    character$: Observable<Lvl0Character>;
    characterRace$: Observable<RaceDefinition | undefined>;
    characterJob$: Observable<JobDefinition | undefined>;
    characterJobSpecializations$: Observable<string[]>;
    raceDefinitionsByCategories: Record<string, Record<string, RaceDefinition>>;
    jobDefinitionsByCategories: Record<string, Record<string, JobDefinition>>;
    jobCategoryIds: string[];
    canChangeName$: Observable<boolean>;
    canChangeJob$: Observable<boolean>;
    canChangeRace$: Observable<boolean>;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly fileSelectorService: FileSelectorService,
        private readonly actorUpdaterService: ActorUpdaterService,
        private readonly userService: UserService,
    ) {
    }

    ngOnInit() {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
        this.characterRace$ = this.character$.pipe(selectCharacterRaceDefinition(this.systemDataDatabaseService));
        this.characterJob$ = this.character$.pipe(selectCharacterJobDefinition(this.systemDataDatabaseService));
        this.characterJobSpecializations$ = this.character$.pipe(selectCharacterJobSpecializations(this.systemDataDatabaseService));
        this.raceDefinitionsByCategories = this.systemDataDatabaseService.raceRepository.getRacesByCategories();
        this.jobDefinitionsByCategories = this.systemDataDatabaseService.jobRepository.getJobsByCategories();
        this.jobCategoryIds = this.systemDataDatabaseService.jobRepository.getJobCategoryIds();

        let characterLevel$ = this.character$.pipe(selectCharacterLevel());
        this.canChangeName$ = characterLevel$.pipe(map(level => level.value === 0 || this.userService.isGm()))
        this.canChangeJob$ = characterLevel$.pipe(map(level => level.value === 0 || this.userService.isGm()))
        this.canChangeRace$ = characterLevel$.pipe(map(level => level.value === 0 || this.userService.isGm()))
    }

    canSelectImage() {
        return this.fileSelectorService.canSelectImage();
    }

    openSelectAvatarDialog() {
        this.fileSelectorService.selectImage().subscribe((imagePath) => {
            this.actorUpdaterService.updateActor(this.characterId, {
                img: imagePath
            });
        })
    }
}

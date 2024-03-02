import {
    NotificationErrorType,
    NotificationWarningType,
    PlayerNotificationService
} from '../shared/player-notification.service';
import {TranslateService} from '../shared/translate.service';
import {Injectable} from '@angular/core';

@Injectable()
export class FoundryPlayerNotificationService extends PlayerNotificationService {
    constructor(
        private readonly translateService: TranslateService
    ) {
        super();
    }

    showError(errorMessage: NotificationErrorType) {
        ui.notifications?.error(this.translateService.translate(`Notification.Error.${errorMessage}`))
    }

    showWarning(warningMessage: NotificationWarningType) {
        ui.notifications?.warn(this.translateService.translate(`Notification.Error.${warningMessage}`))
    }

}

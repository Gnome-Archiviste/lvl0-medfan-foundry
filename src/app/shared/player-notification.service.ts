export type NotificationErrorType = 'speciality_not_found' | 'not_enough_mana';
export type NotificationWarningType = '';

export abstract class PlayerNotificationService {
    abstract showError(errorMessage: NotificationErrorType) ;
    abstract showWarning(errorMessage: NotificationWarningType) ;
}

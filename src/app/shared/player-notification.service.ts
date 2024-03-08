export type NotificationErrorType = 'speciality_not_found'
    | 'not_enough_mana'
    | 'unknown_spell'
    | 'select_token_first'
    ;
export type NotificationWarningType = 'wand_is_empty';

export abstract class PlayerNotificationService {
    abstract showError(errorMessage: NotificationErrorType) ;

    abstract showWarning(errorMessage: NotificationWarningType) ;
}

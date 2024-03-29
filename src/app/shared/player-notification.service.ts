export type NotificationErrorType = 'speciality_not_found'
    | 'not_enough_mana'
    | 'unknown_spell'
    | 'select_token_first'
    ;
export type NotificationWarningType = 'wand_is_empty'
    | 'no_wand_available'
    | 'no_scroll_available'
    | 'no_shield_equiped'
    | 'no_shield_damage'
    | 'no_weapon_available'
    ;

export abstract class PlayerNotificationService {
    abstract showError(errorMessage: NotificationErrorType) ;

    abstract showWarning(errorMessage: NotificationWarningType) ;
}

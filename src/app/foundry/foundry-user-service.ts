import {UserService} from '../shared/user-service';
import {Injectable} from '@angular/core';

@Injectable()
export class FoundryUserService extends UserService {
    isGm(): boolean {
        return ((game as any).user as User).isGM;
    }
}

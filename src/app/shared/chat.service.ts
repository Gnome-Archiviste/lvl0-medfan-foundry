import {IRoll} from './roll';

export abstract class ChatService {
    abstract addCustomElementMessage(actorId: string, customElementName: string, customElementParameters: any, roll?: IRoll): Promise<void>
}

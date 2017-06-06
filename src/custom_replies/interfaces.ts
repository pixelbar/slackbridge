import { IMessage, IChatInterface } from "../chat_connectors/interfaces";
import Manager from "../manager";

export interface ICustomReply {
    accept(message: IMessage, manager: Manager): boolean;
}

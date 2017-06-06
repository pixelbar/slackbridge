import { IChatInterface, IMessage } from "./chat_connectors/interfaces";
import { ICustomReply } from "./custom_replies/interfaces";

export default class Manager {
    public chats: IChatInterface[];
    public replies: ICustomReply[];

    constructor() {
        this.chats = [];
        this.replies = [];
    }

    public send(message: IMessage): void {
        for(const chat of this.chats) {
            if(message.source !== chat) {
                chat.send(message);
            }
        }
    }

    public messageReceived(message: IMessage): void {
        for(const reply of this.replies){
            if(reply.accept(message, this)) {
                return;
            }
        }
        this.send(message);
    }

    public add_chat(chat_interface: IChatInterface): void {
        this.chats.push(chat_interface);
        chat_interface.messageReceived = this.messageReceived.bind(this);
    }
}
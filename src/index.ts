import IrcChatClient from "./irc";
import SlackChatClient from "./slack";
import { IChatInterface, IMessage } from "./interfaces";

const interfaces: IChatInterface[] = [
    new IrcChatClient(),
    new SlackChatClient(),
];

for (const client of interfaces) {
    client.messageReceived = messageReceived;
}

function messageReceived(message: IMessage): void {
    // for (const client of interfaces) {
    //     if (client !== message.source) {
    //         client.send(message);
    //     }
    // }
}

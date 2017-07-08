import * as irc from "irc";
import config from "../config";
import { IChatInterface, IMessage } from "./interfaces";

export default class IrcChatClient implements IChatInterface {
    private client: irc.Client;
    private authed_names: string[] = [
        "Trangar",
        "TrangarBot",
        "miep",
        "mc.fly"
    ];

    constructor() {
        this.client = new irc.Client("irc.smurfnet.ch", "pixelbar", {
            channels: [config.irc_channel],
        });

        this.client.addListener("message", (from: string, to: string, message: string) => {
            if (to === config.irc_channel) {
                this.messageReceived({
                    source: this,
                    sender: {
                        display_name: from,
                        unique_name: from,
                        is_bot: false,
                    },
                    message: message,
                    time: new Date(),
                });
            }
        });
        this.client.addListener("join", (channel: string, nick: string, message: string) => {
            if(channel == config.irc_channel && this.authed_names.indexOf(nick) != -1){
                console.log('opping ' + nick + " - MODE " + config.irc_channel + " +o " + nick);
                this.client.send("MODE " + config.irc_channel + " +o " + nick);
            }
        });

        this.client.addListener("error", (message: string) => {
            console.log("IRC error: ", message);
        });
    }

    messageReceived: (message: IMessage) => void;
    send(message: IMessage): void {
        this.client.say(config.irc_channel, "<" + message.sender.display_name + "> " + message.message);
    }
}
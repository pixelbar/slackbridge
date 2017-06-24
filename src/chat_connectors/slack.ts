const slack: any = require("slack");
import config from "../config";
import * as assert from "assert";
import { IChatInterface, IMessage } from "./interfaces";

const media_regex: RegExp = /<([^>]+)>\s+(.*?) is added to the Pixelbar Medialibrary by (.*?) at <https:\/\/media.pixelbar.nl>/gmi;

export default class SlackChatClient implements IChatInterface {
    private interval: number;
    private client: any;
    private slack_channel_id: string;
    private self_id: string;
    private slack_data: slack_payload.IRootObject;
    private slack_connecting: boolean;

    constructor() {
        this.client = slack.rtm.client();
        this.client.started((payload: slack_payload.IRootObject) => {
            this.slack_data = payload;
            this.self_id = payload.self.id;
            assert.equal(payload.self.id, config.slack_id, "Slack ID does not match self ID");

            this.slack_channel_id = this.slack_data.channels.find((c: slack_payload.IChannel) => c.name === config.slack_channel).id;
        });
        this.client.message((msg: slack_message.IRootObject) => {
            require("fs").appendFile("slack_messages.json", JSON.stringify(msg) + ",\n", () => {/* ignored */ });
            if (msg.channel !== this.slack_channel_id || !msg.text) {
                return;
            }
            if (!msg.bot_id || msg.username === "spacestate") {
                const user: slack_payload.IUser = this.slack_data.users.find((u: slack_payload.IUser) => u.id === msg.user);
                if(user) {
                    this.messageReceived({
                        message: this.replace_tokens(msg.text),
                        source: this,
                        time: new Date(parseInt(msg.ts, 10) * 1000),
                        sender: {
                            display_name: msg.username || user.name,
                            unique_name: user.id,
                            is_bot: user.is_bot
                        }
                    });
                }
            } else if (msg.username === "Pixelbar Medialist") {
                const result: RegExpExecArray = media_regex.exec(msg.text);
                if (result) {
                    this.messageReceived({
                        message: result[3] + " added \"" + result[2] + "\" to the media list: " + result[1],
                        source: this,
                        time: new Date(parseInt(msg.ts, 10) * 1000),
                        sender: {
                            display_name: "Pixelbar Medialist",
                            unique_name: "Pixelbar Medialist",
                            is_bot: true
                        }
                    });
                }
            } else if (msg.username === "Pixelbar MediaWiki") {
                var matches: RegExpMatchArray = msg.text.match(/^[^|]+\|(\w+).*title=([^&]+)/);
                if (matches && matches[1] && matches[2]) {
                    this.messageReceived({
                        message: matches[1] + " has edited wiki page https://wiki.pixelbar.nl/index.php?title="
                        + encodeURIComponent(matches[2]),
                        source: this,
                        time: new Date(parseInt(msg.ts, 10) * 1000),
                        sender: {
                            display_name: "Pixelbar MediaWiki",
                            unique_name: "Pixelbar MediaWiki",
                            is_bot: true
                        }
                    });
                }
            }
        });
        this.connect();
        this.interval = setInterval(this.connect.bind(this), 1000 * 60 * 60);
    }

    private replace_tokens(message: string): string {
        return message.replace(/<@([^>|]+)(|\w+)?>/g, (token: string, id: string, name: string) => {
            if (name) {
                return name.substring(1);
            }
            var user: slack_payload.IUser = this.slack_data.users.find(u => u.id === id);
            if (user) {
                return "@" + user.name;
            } else {
                return token;
            }
        });
    }

    private connect(): void {
        if (this.slack_connecting) { return; }
        this.slack_connecting = true;
        if (this.client) {
            try { this.client.close(); } catch (e) { /* ignored */ }
        }
        this.client.listen({ token: config.slack_token }, (err: any, d: any) => {
            this.slack_connecting = false;
        });

    }

    messageReceived: (message: IMessage) => void;
    send(message: IMessage): void {
        slack.chat.postMessage({
            token: config.slack_token,
            channel: this.slack_channel_id,
            text: message.message,
            username: message.sender.display_name
        }, (err: any, data: any) => {
            // console.log(err, data);
        });
    }
}

import IrcChatClient from "./chat_connectors/irc";
import SlackChatClient from "./chat_connectors/slack";
import FoodOrder from "./custom_replies/foodorder";
import Manager from "./manager";
import * as fs from "fs";

fs.exists("data", (exists: boolean) => {
    if (!exists) {
        fs.mkdir("data", () => { /* ignored */ });
    }
});

const manager: Manager = new Manager();
manager.add_chat(new IrcChatClient());
manager.add_chat(new SlackChatClient());

manager.replies.push(new FoodOrder());


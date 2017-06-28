import * as fs from "fs";

class Config {
    public irc_channel: string = "#pixelbar";
    public slack_token: string = fs.readFileSync("slack_token.txt", { encoding: "utf8" }).trim();
    public slack_id: string = "U3W134UG7";
    public slack_channel: string = "general";
}

export default new Config();

import * as fs from "fs";

class Config {
    public irc_channel: string = "#trangarbot";
    public slack_token: string = fs.readFileSync("slack_token.txt", { encoding: "utf8" }).trim();
    public slack_id: string = "U3W134UG7";
    public slack_channel: string = "pixelbarbottest";
}

export default new Config();
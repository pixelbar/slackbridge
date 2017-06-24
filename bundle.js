/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require('fs');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(0);
class Config {
    constructor() {
        this.irc_channel = "#trangarbot";
        this.slack_token = fs.readFileSync("slack_token.txt", { encoding: "utf8" }).trim();
        this.slack_id = "U3W134UG7";
        this.slack_channel = "pixelbarbottest";
    }
}
exports.default = new Config();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const irc_1 = __webpack_require__(3);
const slack_1 = __webpack_require__(5);
const foodorder_1 = __webpack_require__(8);
const manager_1 = __webpack_require__(9);
const fs = __webpack_require__(0);
fs.exists("data", (exists) => {
    if (!exists) {
        fs.mkdir("data", () => { });
    }
});
const manager = new manager_1.default();
manager.add_chat(new irc_1.default());
manager.add_chat(new slack_1.default());
manager.replies.push(new foodorder_1.default());


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const irc = __webpack_require__(4);
const config_1 = __webpack_require__(1);
class IrcChatClient {
    constructor() {
        this.authed_names = [
            "Trangar",
            "TrangarBot",
            "miep",
            "mc.fly"
        ];
        this.client = new irc.Client("irc.smurfnet.ch", "pixelbar", {
            channels: [config_1.default.irc_channel],
        });
        this.client.addListener("message", (from, to, message) => {
            if (to === config_1.default.irc_channel) {
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
        this.client.addListener("join", (channel, nick, message) => {
            if (channel == config_1.default.irc_channel && this.authed_names.indexOf(nick) != -1) {
                console.log('opping ' + nick + " - MODE " + config_1.default.irc_channel + " +o " + nick);
                this.client.send("MODE " + config_1.default.irc_channel + " +o " + nick);
            }
        });
        this.client.addListener("error", (message) => {
            console.log("IRC error: ", message);
        });
    }
    send(message) {
        this.client.say(config_1.default.irc_channel, "<" + message.sender.display_name + "> " + message.message);
    }
}
exports.default = IrcChatClient;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require('irc');

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const slack = __webpack_require__(6);
const config_1 = __webpack_require__(1);
const assert = __webpack_require__(7);
const media_regex = /<([^>]+)>\s+(.*?) is added to the Pixelbar Medialibrary by (.*?) at <https:\/\/media.pixelbar.nl>/gmi;
class SlackChatClient {
    constructor() {
        this.client = slack.rtm.client();
        this.client.started((payload) => {
            this.slack_data = payload;
            this.self_id = payload.self.id;
            assert.equal(payload.self.id, config_1.default.slack_id, "Slack ID does not match self ID");
            this.slack_channel_id = this.slack_data.channels.find((c) => c.name === config_1.default.slack_channel).id;
        });
        this.client.message((msg) => {
            __webpack_require__(0).appendFile("slack_messages.json", JSON.stringify(msg) + ",\n", () => { });
            if (msg.channel !== this.slack_channel_id || !msg.text) {
                return;
            }
            if (!msg.bot_id || msg.username === "spacestate") {
                const user = this.slack_data.users.find((u) => u.id === msg.user);
                if (user) {
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
            }
            else if (msg.username === "Pixelbar Medialist") {
                const result = media_regex.exec(msg.text);
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
            }
            else if (msg.username === "Pixelbar MediaWiki") {
                var matches = msg.text.match(/^[^|]+\|(\w+).*title=([^&]+)/);
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
    replace_tokens(message) {
        return message.replace(/<@([^>|]+)(|\w+)?>/g, (token, id, name) => {
            if (name) {
                return name.substring(1);
            }
            var user = this.slack_data.users.find(u => u.id === id);
            if (user) {
                return "@" + user.name;
            }
            else {
                return token;
            }
        });
    }
    connect() {
        if (this.slack_connecting) {
            return;
        }
        this.slack_connecting = true;
        if (this.client) {
            try {
                this.client.close();
            }
            catch (e) { }
        }
        this.client.listen({ token: config_1.default.slack_token }, (err, d) => {
            this.slack_connecting = false;
        });
    }
    send(message) {
        slack.chat.postMessage({
            token: config_1.default.slack_token,
            channel: this.slack_channel_id,
            text: message.message,
            username: message.sender.display_name
        }, (err, data) => {
            // console.log(err, data);
        });
    }
}
exports.default = SlackChatClient;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require('slack');

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require('assert');

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(0);
class FoodOrder {
    constructor() {
        try {
            this.orders = JSON.parse(fs.readFileSync("data/foodorder.json", { encoding: "utf8" })) || [];
        }
        catch (e) {
            this.orders = [];
        }
    }
    accept(message, manager) {
        if (!message.message.startsWith("#foodorder")) {
            return false;
        }
        const split = message.message.split(" ", 2);
        if (split.length === 1 || split[1] === "list") {
            manager.send(this.getFoodOrders());
        }
        else if (split.length > 1 && split[1] === "clear") {
            manager.send(this.clearFoodOrders());
        }
        else {
            manager.send(this.addFoodOrder(message, split[1]));
        }
        return true;
    }
    getFoodOrders() {
        let text;
        if (this.orders.length > 0) {
            text = this.orders.map((o) => o.user + " wants " + o.food).join(", ");
        }
        else {
            text = "No orders placed";
        }
        return {
            message: text,
            time: new Date(),
            sender: {
                display_name: "Foodorder",
                unique_name: "Foodorder",
                is_bot: true
            },
            source: null
        };
    }
    clearFoodOrders() {
        this.orders = [];
        this.save();
        return {
            message: "Orders cleared",
            time: new Date(),
            sender: {
                display_name: "Foodorder",
                unique_name: "Foodorder",
                is_bot: true
            },
            source: null
        };
    }
    addFoodOrder(message, food) {
        this.orders = this.orders.filter((o) => o.user !== message.sender.display_name);
        this.orders.push({
            food: food,
            user: message.sender.display_name
        });
        this.save();
        return {
            message: message.sender.display_name + " wants " + food,
            time: new Date(),
            sender: {
                display_name: "Foodorder",
                unique_name: "Foodorder",
                is_bot: true
            },
            source: null
        };
    }
    save() {
        fs.writeFile("data/foodorder.json", JSON.stringify(this.orders), () => { });
    }
}
exports.default = FoodOrder;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Manager {
    constructor() {
        this.chats = [];
        this.replies = [];
    }
    send(message) {
        for (const chat of this.chats) {
            if (message.source !== chat) {
                chat.send(message);
            }
        }
    }
    messageReceived(message) {
        this.send(message);
        for (const reply of this.replies) {
            if (reply.accept(message, this)) {
                return;
            }
        }
    }
    add_chat(chat_interface) {
        this.chats.push(chat_interface);
        chat_interface.messageReceived = this.messageReceived.bind(this);
    }
}
exports.default = Manager;


/***/ })
/******/ ]);
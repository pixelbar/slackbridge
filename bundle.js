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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(1);
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
/* 1 */
/***/ (function(module, exports) {

module.exports = require('fs');

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const irc = __webpack_require__(6);
const config_1 = __webpack_require__(0);
class IrcChatClient {
    constructor() {
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const slack = __webpack_require__(7);
const config_1 = __webpack_require__(0);
const assert = __webpack_require__(5);
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
            __webpack_require__(1).appendFile("slack_messages.json", JSON.stringify(msg) + ",\n", () => { });
            if (msg.bot_id) {
                return;
            }
            this.messageReceived({
                message: msg.msg,
                source: this,
                time: new Date(),
                sender: {
                    display_name: msg.username,
                    unique_name: "",
                    is_bot: false
                }
            });
        });
        this.connect();
        this.interval = setInterval(this.connect.bind(this), 1000 * 60 * 60);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const irc_1 = __webpack_require__(2);
const slack_1 = __webpack_require__(3);
const interfaces = [
    new irc_1.default(),
    new slack_1.default(),
];
for (const client of interfaces) {
    client.messageReceived = messageReceived;
}
function messageReceived(message) {
    // for (const client of interfaces) {
    //     if (client !== message.source) {
    //         client.send(message);
    //     }
    // }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require('assert');

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require('irc');

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require('slack');

/***/ })
/******/ ]);
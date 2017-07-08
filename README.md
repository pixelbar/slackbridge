# Slack bridge
This project is a small NodeJS bot which will make a bridge between an IRC channel and a Slack channel.

## How to use
First, create a file called ```slack_token.txt```. In this file you will want to add the token for the slack bot integration. For the pixelbar you can get this token [here](https://pixelbar.slack.com/apps/A0F7YS25R-bots)

There are several values you can set in the [index.js](index.js). These values are:
* irc_channel: The IRC channel you're connecting to
* slack_id: The ID of the bot in the slack channel
* slack_channel: The slack channel you're connecting to

## How to run
Clone this repo, make sure you've updated ```slack_token.txt``` and run the following commands
```
npm install
node bundle 
```

## How to build
You need to run webpack to compile the typescript files. For more information, see https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

First you need to install typescript and webpack globally
```
npm install -g webpack typescript
npm install
```

Afterwards you can simply run this in the root directory
```
webpack
```

This should transpile all typescript files into `bundle.js`. After this you can simply run `node bundle` to run the bot.
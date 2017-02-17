var irc = require('irc');
var slack = require('slack');
var fs = require('fs');

var irc_channel = '#pixelbar';
var slack_token = fs.readFileSync('slack_token.txt', { encoding: 'utf8' });
var slack_id = 'U3W134UG7';
var slack_channel = 'general';

// IRC
function sendIRCMessage(user, message){
	irc_client.say(irc_channel, '<' + user + '> ' + message);
}

var irc_client = new irc.Client('irc.smurfnet.ch', 'pixelbar', {
    channels: [irc_channel],
});

irc_client.addListener('message', function (from, to, message) {
	if(to == irc_channel) {
		sendSlackMessage(from, message);
		onMessage(from, message);
	}
});

irc_client.addListener('error', function(message) {
    console.log('IRC error: ', message);
});

// SLACK 
function sendSlackMessage(user, message){
	slack.chat.postMessage({
		token: slack_token,
		channel: slack_channel_id,
		text: message,
		username: user
	}, function(err, data) {
		//console.log(err, data);
	});
}

var slack_client = slack.rtm.client();
slack_client.started(function(payload) {
	slack_data = payload;
	slack_channel_id = slack_data.channels.find(c => c.name == slack_channel).id;
});

var slack_data = {};
var slack_channel_id = '';
var slack_connecting = false;

slack_client.message(function(msg) {
	fs.appendFile("slack_messages.txt", new Date() + "\t" + JSON.stringify(msg) + "\n", function(){});
	if(msg.channel == slack_channel_id && (!msg.bot_id || msg.username == 'spacestate' || msg.username == 'Pixelbar MediaWiki') && msg.text){
		var user_name = slack_data.users.find(u => u.id == msg.user);
		var message = msg.text.replace(/<@([^>|]+)(|\w+)?>/g, function(token, id, name) {
			if(name){
				return name.substring(1);
			}
			var user = slack_data.users.find(u => u.id == id);
			if(user) return '@' + user.name;
			return token;
		});
		
		sendIRCMessage(user_name ? user_name.name : (msg.user || msg.username), message);
		onMessage(user_name ? user_name.name : (msg.user || msg.username), message);
		return;
	}
	fs.appendFile("ignored_slack_messages.txt", new Date() + "\t" + JSON.stringify(msg) + "\n", function(){});
});


function startSlack(){
	if(slack_connecting) return;
	slack_connecting = true;
	if(slack_client){
		try { slack_client.close(); } catch(e) {}
	}
	slack_client.listen({ token: slack_token }, (err, d) => {
		slack_connecting = false;
	});
}
startSlack();
setInterval(startSlack, 1000*60*60);

// other events

var foodorder = [];
function onMessage(name, message) {
	var index = message.indexOf('#foodorder');
	if(index > -1){
		var order = message.substring(index + '#foodorder'.length).trim();
		var message = handleFoodOrder(name, order);
		sendIRCMessage('foodorder', message);
		sendSlackMessage('foodorder', message);
	}
}

function handleFoodOrder(name, order){
	if(!order || order == 'list'){
		if(foodorder.length == 0) return 'No food orders placed';
		return foodorder.map(o => o.name + ' wants ' + o.order).join(', ');
	} else if(order == 'clear') {
		foodorder = [];
		return 'Orders cleared';
	} else if(order == 'help') {
		return "\"#foodorder list\" to show the list, \"#foodorder clear\" to clear the list, \"#foodorder <anything else>\" to place your order";
	} else {
		foodorder = foodorder.filter(o => o.name != name);
		foodorder.push({ name: name, order: order });
		return name + ' wants ' + order;
	}
}


var user = prompt("Please enter your name:");
var currentChannelId = "dbf646dc-5006-4d9f-8815-fd37514818ee";
var	websocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + user);

function updateUsername()
{
	document.getElementById("usernameText").innerHTML = user;
}

var connection = new ConnectionHandler();
	
websocket.onopen = function(){
	console.log("open");
	joinChannel(currentChannelId);
}
//When the websocket receives something send the data over to the connection handler
websocket.onmessage = function(event){
	connection.websocketReceive(event);
}



websocket.onclose = function(){
	console.log("Connection closed")
}

function sendMessage()
{
	var text = document.getElementById("messageInput").value;
	document.getElementById("messageInput").value = "";
	if(text != ""){
	var message = new Message("onMessage", currentChannelId,text,"");
	var jSONmessage = JSON.stringify(message);
	websocket.send(jSONmessage);
	}
}

function joinChannel(channelId)
{
	currentChannelId = channelId;
	var message = new Message("onJoinChannel",channelId, null, user, Date());
	var message2 = new Message("onGetChannel",channelId);
	var jSONmessage = JSON.stringify(message);
	var jSONmessage2 = JSON.stringify(message2);
	websocket.send(jSONmessage);
	websocket.send(jSONmessage2);
	console.log("joined Channel: " + channelId);
}

function leaveChannel(channelID)
{
	var message = new Message("onLeaveChannel", channelID);
	var JSONmessage = JSON.stringify(message);
	websocket.send(JSONmessage);
	console.log("left channel: " + channelID);
}

function createChannel()
{
	var channelName = prompt("Please enter the channel name: ");
	var createChannelMessage = new Message("onCreateChannel", null, channelName, user, Date());
	var JSONCreateChannel = JSON.stringify(createChannelMessage);
	websocket.send(JSONCreateChannel);
}

function test(){
		
	var now = new Date();
	var message = new Message("onJoinChannel","241071d2-7a2d-4070-9732-9094ca70c7cc","this is a test","",now);
	var test = JSON.stringify(message);

	websocket.send(test);
}

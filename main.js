
 var user;

function myFunction() {
    var txt;
    user = prompt("Please enter your name:");

}
myFunction() ;
var websocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username="+user);
var connection = new ConnectionHandler();
	
websocket.onopen = function(){
	console.log("open");
}
//When the websocket receives something send the data over to the connection handler
websocket.onmessage = function(event){
	connection.websocketReceive(event);
}

function inputTest()
{
	var text = document.getElementById("messageInput").value;
	document.getElementById("messageInput").value = "";
	if(text != ""){
	var message = new Message("onMessage","dbf646dc-5006-4d9f-8815-fd37514818ee",text,"");
	var jSONmessage = JSON.stringify(message);
	websocket.send(jSONmessage);
	}
}

function test(){
		
	var now = new Date();
	var message = new Message("onJoinChannel","12aebde1-bb7e-4e63-bcef-3123d14d3f16","this is a test","",now);
	var test = JSON.stringify(message);

	websocket.send(test);
}


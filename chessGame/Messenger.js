
//Messenger sends messages to and receives messages from opponent player.
//Messages of are strings in one of the formats below.
//":CHAT:Hello there my good opponent." starting the string with :CHAT: will send the remaining string to the opponents chatbox
//":MOVE:movestring" starting the string with :MOVE: will send the rest of the string to the opponents move history.

function Messenger(){
	this.messagesSent = [];
	this.messagesToSend = [];
	this.messagesRecieved = [];
	this.addMessageToSend = function(message){
		if(typof message === "string"){
			this.messagesToSend.push(message);
		}
	};
	this.sendMessage = function(){
		//TODO
	};
	this.receiveMessage = function(){
		//TODO
	};
}
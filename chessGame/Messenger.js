
//Messenger sends messages to and receives messages from opponent player.
//Messages of are strings in one of the formats below.
//":CHAT:Hello there my good opponent." starting the string with :CHAT: will send the remaining string to the opponents chatbox
//":MOVE:movestring" starting the string with :MOVE: will send the rest of the string to the opponents move history.

class Messenger {
	
	constructor() {
		var url = "/messages";
		this.messagesSent = [];
		this.messagesToSend = [];
		this.messagesRecieved = [];
		this.socket = io();
	}

	addMessageToSend(message) {
		if(typeof message === "string"){
			this.messagesToSend.push(message);
		}
	}

	sendMessage() {
		//TODO
		this.socket.emit(this.messagesToSend.toString());
	};
	receiveMessage() {
		//TODO
	};
}

function Move(previousSquare, newSquare, isCapture, givesCheck){
	this.previousSquare = previousSquare;
	this.newSquare = newSquare;
	this.isCapture = isCapture;//true if move captures
	this.givesCheck = givesCheck; //true if moves gives check to other player
	
}

function ChessPiece(name, color, rank, file){
	this.name = name;
	this.color = color;
	this.file = file;
	this.rank = rank;	//a string of the name of the square it is at
	this.moveSet = null;//will be null if piece cannot make a move this turn
}


//both rank and files are integers from 1-8
function ChessSquare(rank, file, currentPiece){
	this.rank = rank;
	this.file = file;
	this.currentPiece = currentPiece;
	this.name = function(){
		var fileLetter = "z";
		if(this.file === 1) fileLetter = "a";
		else if(this.file === 2) fileLetter = "b";
		else if(this.file === 3) fileLetter = "c";
		else if(this.file === 4) fileLetter = "d";
		else if(this.file === 5) fileLetter = "e";
		else if(this.file === 6) fileLetter = "f";
		else if(this.file === 7) fileLetter = "g";
		else if(this.file === 8) fileLetter = "h";
		else return "INVALID SQUARE";
		return  fileLetter + this.rank;
	};
	
	this.color = function(){
		var rankEven = rank % 2;
		var fileEven = file % 2;
		if(rankEven === fileEven)return "black";
		else return "white";
	};
	this.highlighted = false;
	this.size = 100;
}

function Player(username, color, isTurn, selectedSquare ){
	this.username = username;
	this.color = color;
	this.isTurn = isTurn;
	this.selectedSquare = selectedSquare;
	this.pieces = [];
}

function ChessBoard(player1, player2){
	this.squares = [];
	this.player1 = player1;
	this.player2 = player2;
	this.getPlayer = function(color){
		if(this.player1.color === color)return this.player1;
		else if(this.player2.color === color)return this.player2;
		else return null;
	};
	
	this.getSquare = function(rank, file){
		for(i = 0; i < this.squares.length; i++){
			if(this.squares[i].rank === rank && this.squares[i].file === file) return this.squares[i];
		}
		return null;
	};
}

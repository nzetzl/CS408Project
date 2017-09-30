var Files = ["a", "b", "c", "d", "e", "f", "g", "h"];
var Ranks = [1, 2, 3, 4, 5, 6, 7, 8];

//use location values to compare not the actual location object!!!!!!
function Location(file, rank){
	this.file = file;
	this.rank = rank;
	this.name = "" + Files[this.file - 1] + Ranks[this.rank - 1];
}

function ChessPiece(name, color, location){
	this.name = name;
	this.color = color;
	this.location = location;
}

function initWhitePieces(){
	var whitePieces = [
	new ChessPiece("pawn", "white", new Location(1,2)),
	new ChessPiece("pawn", "white", new Location(2,2)),
	new ChessPiece("pawn", "white", new Location(3,2)),
	new ChessPiece("pawn", "white", new Location(4,2)),
	new ChessPiece("pawn", "white", new Location(5,2)),
	new ChessPiece("pawn", "white", new Location(6,2)),
	new ChessPiece("pawn", "white", new Location(7,2)),
	new ChessPiece("pawn", "white", new Location(8,2)),
	new ChessPiece("rook", "white", new Location(1,1)),
	new ChessPiece("knight", "white", new Location(2,1)),
	new ChessPiece("bishop", "white", new Location(3,1)),
	new ChessPiece("queen", "white", new Location(4,1)),
	new ChessPiece("king", "white", new Location(5,1)),
	new ChessPiece("bishop", "white", new Location(6,1)),
	new ChessPiece("knight", "white", new Location(7,1)),
	new ChessPiece("rook", "white", new Location(8,1))
	];
	return whitePieces;
}

function initBlackPieces(){
	var blackPieces = [
	new ChessPiece("pawn", "black", new Location(1,7)),
	new ChessPiece("pawn", "black", new Location(2,7)),
	new ChessPiece("pawn", "black", new Location(3,7)),
	new ChessPiece("pawn", "black", new Location(4,7)),
	new ChessPiece("pawn", "black", new Location(5,7)),
	new ChessPiece("pawn", "black", new Location(6,7)),
	new ChessPiece("pawn", "black", new Location(7,7)),
	new ChessPiece("pawn", "black", new Location(8,7)),
	new ChessPiece("rook", "black", new Location(1,8)),
	new ChessPiece("knight", "black", new Location(2,8)),
	new ChessPiece("bishop", "black", new Location(3,8)),
	new ChessPiece("queen", "black", new Location(4,8)),
	new ChessPiece("king", "black", new Location(5,8)),
	new ChessPiece("bishop", "black", new Location(6,8)),
	new ChessPiece("knight", "black", new Location(7,8)),
	new ChessPiece("rook", "black", new Location(8,8))
	];
	return blackPieces;
}

var whitePieces = initWhitePieces();
var blackPieces = initBlackPieces();


function ChessSquare(location, color){
	this.location = location;
	this.color = color;
	this.highlighted = false;
}

function initSquares(){
	var squareSet = [];
	var color = "black";
	for(i = 0; i < Files.length; i++){
		if(color === "white")color = "black";
		else if(color === "black")color = "white";
		for(j = 0; j < Ranks.length; j++){
			if(color === "white")color = "black";
			else if(color === "black")color = "white";
			squareSet.push(new ChessSquare(new Location(i + 1, j + 1), color));
			window.console.log(squareSet[i * Ranks.length + j].location.name);
		}
	}
	return squareSet;
}

var squares = [];
squares = initSquares();

function getSquare(file, rank){
	for(i = 0; i < squares.length; i++){
		if(squares[i].location.file === file && squares[i].location.rank === rank){
			return squares[i];
		}
	}
}
function getSquareByName(name){
	for(i = 0; i < squares.length; i++){
		if(squares[i].location.name === name){
			return squares[i];
		}
	}
}
function getPiece(file, rank){
	for(i = 0; i < whitePieces.length; i++){
		if(whitePieces[i].location.file === file && whitePieces[i].location.rank === rank){
			return whitePieces[i];
		}
	}
	
	for(i = 0; i < blackPieces.length; i++){
		if(blackPieces[i].location.file === file && blackPieces[i].location.rank === rank){
			return blackPieces[i];
		}
	}
	return null;
}
function getPieceByLocationName(name){
	for(i = 0; i < whitePieces.length; i++){
		if(whitePieces[i].location.name === name){
			return whitePieces[i];
		}
	}
	
	for(i = 0; i < blackPieces.length; i++){
		if(blackPieces[i].location.name === name){
			return blackPieces[i];
		}
	}
	return null;
}
function highlightSquare(file, rank){
	getSquare(file,rank).highlighted = true;
}
function unHighlightSquare(file, rank){
	getSquare(file,rank).highlighted = false;
}

var turnCount = 0;
//use location name for prevLocation and nextLocation
function ChessMove(prevLocation, nextLocation){
	this.prevLocation = prevLocation;
	this.nextLocation = nextLocation;
	this.piece = getPieceByLocationName(prevLocation);
	this.moveString = "" + turnCount + " " + this.prevLocation + " " + this.piece.color + " " + this.piece.name + " " + this.nextLocation;
}

var moveHistory = [];

function ChessPlayer(name, color){
	this.name = name;
	this.color = color;
	this.selectedPiece = null;
	this.isTurn = function(){
		if(turnCount % 2 === 0 && this.color === "white")return true;
		else if(turnCount % 2 === 1 && this.color === "black")return true;
		else return false;
	};
}

var whitePlayer = new ChessPlayer("white", "white");
var blackPlayer = new ChessPlayer("black", "black");

function movePiece(prevLocation, nextLocation){
	var piece = getPieceByLocationName(prevLocation);
	if(piece === null)return false;
	var fileLetter = nextLocation.substring(0,1);
	var file = 0;
	if(fileLetter === "a")file = 1;
	else if(fileLetter === "b")file = 2;
	else if(fileLetter === "c")file = 3;
	else if(fileLetter === "d")file = 4;
	else if(fileLetter === "e")file = 5;
	else if(fileLetter === "f")file = 6;
	else if(fileLetter === "g")file = 7;
	else if(fileLetter === "h")file = 8;
	piece.location.file = file;
	piece.location.rank = nextLocation.substring(1);
	piece.location.name = nextLocation;
	return true;
}

function addMove(moveToAdd){
	if(moveToAdd === null)return;
	if(movePiece(moveToAdd.prevLocation,moveToAdd.nextLocation) === false)return;
	turnCount++;
	moveHistory.push(moveToAdd);
}

var canvas = document.getElementById("chessBoardCanvas");
var ctx = canvas.getContext("2d");

function getFileFromX(x){
	var squareWidth = canvas.width / 8;
	return Math.floor(x / squareWidth) + 1;
}
function getRankFromY(y){
	var squareHeight = canvas.height / 8;
	return Math.floor((canvas.height - y) / squareHeight) + 1;
}

function drawSquare(square){
	var squareWidth = canvas.width / 8;
	var squareHeight = canvas.height / 8;
	//(x,y) is the coordinate of the top left corner of the square drawn on the canvas
	var x = (square.location.file - 1) * squareWidth;
	var y = canvas.height - (square.location.rank * squareHeight);
	
	if(square.highlighted === true){
		ctx.fillStyle = "rgba(200,30,30,1)";
		ctx.fillRect(x, y, squareWidth, squareHeight);
	}
	
	if(square.color === "black")ctx.fillStyle = "rgba(0,0,0,1)";
	else if(square.color === "white")ctx.fillStyle = "rgba(230,230,230,1)";
	
	if(square.highlighted === false)ctx.fillRect(x, y, squareWidth, squareHeight);
	else ctx.fillRect(x + 6, y + 6, squareWidth - 12, squareHeight - 12);
}

function drawPiece(piece){
	var squareWidth = canvas.width / 8;
	var squareHeight = canvas.height / 8;
	//(x,y) is the coordinate of the top left corner of the square drawn on the canvas
	var x = (piece.location.file - 1) * squareWidth;
	var y = canvas.height - (piece.location.rank * squareHeight);
	ctx.font = "15px Arial";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText(piece.name,x + squareWidth / 2,y + squareHeight / 2);
}

function drawBoard(){
	for (i = 0; i < squares.length; i++){
		drawSquare(squares[i]);
	}
	for (i = 0; i < whitePieces.length; i++){
		drawPiece(whitePieces[i]);
	}
	for (i = 0; i < blackPieces.length; i++){
		drawPiece(blackPieces[i]);
	}
}

//temp function
function onClick(e){
	var file = getFileFromX(e.pageX)
	var rank = getRankFromY(e.pageY)
	var piece = getPiece(file, rank);
	if(piece === null)return;
	if(getSquare(piece.location.file,piece.location.rank).highlighted === false)highlightSquare(file,rank);
	else if(getSquare(piece.location.file,piece.location.rank).highlighted === true)unHighlightSquare(file,rank);
	window.console.log(file + " " + rank);
	drawBoard();
}

canvas.addEventListener("click", onClick);

function startNewGame(player1, player2){
	whitePlayer = new ChessPlayer(player1, "white");
	blackPlayer = new ChessPlayer(player1, "black");
	drawBoard();
	addMove(new ChessMove("a1","a3"));
	drawBoard();
}
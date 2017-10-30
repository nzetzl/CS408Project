var messenger = null;
var socket = io();
var gameOver = false;

var Files = ["a", "b", "c", "d", "e", "f", "g", "h"];
var Ranks = [1, 2, 3, 4, 5, 6, 7, 8];
var updateBoardPiece = [];

var redrawLocationList = [];
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
	this.moveCount = 0;
	this.alive = true;
	this.img = new Image();
	this.moveSet = [];
}

function initWhitePieces(){
	var whitePieces = [
	new ChessPiece("pawn", "white", new Location(1,2)),
	new ChessPiece("pawn", "white", new Location(2,2)),
	new ChessPiece("pawn", "white", new Location(3,2)),
	new ChessPiece("pawn", "white", new Location(4,2)),
	new ChessPiece("pawn", "white", new Location(6,2)),
	new ChessPiece("pawn", "white", new Location(7,2)),
	new ChessPiece("pawn", "white", new Location(8,2)),
	new ChessPiece("rook", "white", new Location(1,1)),
	new ChessPiece("knight", "white", new Location(2,1)),
	new ChessPiece("bishop", "white", new Location(3,1)),
	new ChessPiece("queen", "white", new Location(4,1)),
	new ChessPiece("king", "white", new Location(5,1)),
	new ChessPiece("bishop", "white", new Location(6,1)),
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
	new ChessPiece("knight", "black", new Location(8,8))
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
	for(var i = 1; i < Files.length; i++){
		if(color === "white")color = "black";
		else if(color === "black")color = "white";
		for(var j = 0; j < Ranks.length; j++){
			if(color === "white")color = "black";
			else if(color === "black")color = "white";
			var sq = new ChessSquare(new Location(i + 1, j + 1), color)
			squareSet.push(sq);
			redrawLocationList.push(sq.location.name);
		}
	}
	return squareSet;
}

var squares = [];

function getSquare(file, rank){
	for(var i = 0; i < squares.length; i++){
		if(squares[i].location.file === file && squares[i].location.rank === rank){
			return squares[i];
		}
	}
	return null;
}
function getSquareByName(name){
	for(var i = 0; i < squares.length; i++){
		if(squares[i].location.name === name){
			return squares[i];
		}
	}
	return null;
}
function getPiece(file, rank){
	for(var i = 0; i < whitePieces.length; i++){
		if(whitePieces[i].alive == true && whitePieces[i].location.file === file && whitePieces[i].location.rank === rank){
			return whitePieces[i];
		}
	}
	
	for(var i = 0; i < blackPieces.length; i++){
		if(blackPieces[i].alive == true && blackPieces[i].location.file === file && blackPieces[i].location.rank === rank){
			return blackPieces[i];
		}
	}
	return null;
}
function getPieceByLocationName(name){
	for(var i = 0; i < whitePieces.length; i++){
		if(whitePieces[i].alive == true && whitePieces[i].location.name === name){
			return whitePieces[i];
		}
	}
	
	for(var i = 0; i < blackPieces.length; i++){
		if(blackPieces[i].alive == true && blackPieces[i].location.name === name){
			return blackPieces[i];
		}
	}
	return null;
}


function highlightSquare(file, rank){
	var sq = getSquare(file,rank);
	if(sq === null)return;
	sq.highlighted = true;
	redrawLocationList.push(sq.location.name);
}

function highlightSquareByLocationName(locationName){
	var sq = getSquareByName(locationName);
	if(sq === null)return;
	sq.highlighted = true;
	redrawLocationList.push(sq.location.name);
}
function unHighlightSquare(file, rank){
	var sq = getSquare(file,rank);
	if(sq === null)return;
	sq.highlighted = false;
	redrawLocationList.push(sq.location.name);
}

function unhighlightSquareByLocationName(locationName){
	var sq = getSquareByName(locationName);
	if(sq === null)return;
	sq.highlighted = false;
	redrawLocationList.push(sq.location.name);
}
function clearHighlights(){
	for(var i = 0; i < squares.length; i++){
		if(squares[i].highlighted === true){
			squares[i].highlighted = true;
			redrawLocationList.push(squares[i].location.name);
		}
	}
}

var turnCount = 0;
//use location name for prevLocation and nextLocation
function ChessMove(prevLocation, nextLocation){
	this.prevLocation = prevLocation;
	this.nextLocation = nextLocation;
	this.piece = getPieceByLocationName(this.prevLocation);
	this.otherPiece = getPieceByLocationName(this.nextLocation);
//	console.log('color 1: ' + this.piece.color);
//	console.log('color 2: ' + this.otherPiece.color);
	this.isCapture = function(){
		if(this.otherPiece !== null && this.piece !== null && this.piece.color !== this.otherPiece.color )return true;
		return false;
	};
	this.givesCheck = function(){
		if(this.isCapture() && this.otherPiece.name === "king"){
			return true;
		}
		return false;
	};
	this.getMoveString = function(){
		var captureString = "to ";
		if(this.isCapture() === true) captureString = "captures ";
		return "" + (turnCount + 1)+ ": " + this.piece.color + " " + this.piece.name + " " + this.prevLocation + " " + captureString + this.nextLocation;
	};
}

function getMoveFromString(moveString){
	var prevLocation;
	var nextLocation;
	var words = moveString.split(" ");
	prevLocation = words[3];
	nextLocation = words[5];
	return new ChessMove(prevLocation,nextLocation);
}

var moveHistory = [];

function setBoardToTurn(turn){
	if(gameOver === true){
		var moves = [];
		for(var i = 0; i < turn; i++){
			moves.push(getMoveFromString(moveHistory[i]));
		}
		startNewGame();
		for(var i = 0; i < moves.length; i++){
			completeMove(moves[i]);
		}
	}
}

function ChessPlayer(name, color){
	this.name = name;
	this.color = color;
	this.selectedPiece = null;
	this.isTurn = function(){
		if(turnCount % 2 === 0 && this.color === "white")return true;
		else if(turnCount % 2 === 1 && this.color === "black")return true;
		else return false;
	};
	this.moveSet = [];
	this.inCheck = false;
}

var whitePlayer = new ChessPlayer("white", "white");
var blackPlayer = new ChessPlayer("black", "black");


function getMoveOffset(fileOffset, rankOffset, piece){
	var square = getSquare(piece.location.file + fileOffset,piece.location.rank + rankOffset);
	if(square === null) return null;
	var pieceOnSquare = getPieceByLocationName(square.location.name);
	if(pieceOnSquare === null){
		return new ChessMove(piece.location.name, square.location.name);
	}else if(pieceOnSquare.color !== piece.color){
		return new ChessMove(piece.location.name, square.location.name);
	}else{
		return null;
	}
	
}

function getPawnMoveSet(piece){
	if(piece === null)return null;
	var moveSet = [];
	var tempMove;
	if(piece.color === "white"){
		tempMove = getMoveOffset(0,1,piece);
		if(tempMove !== null && tempMove.isCapture() === false){
			moveSet.push(tempMove);
			if(piece.moveCount !== 0){
				tempMove = getMoveOffset(0,2,piece);
				if(tempMove !== null && tempMove.isCapture() === false){
					moveSet.push(tempMove);
				}
			}
		}
		tempMove = getMoveOffset(1,1,piece);
		if(tempMove !== null && tempMove.isCapture() === true){
			moveSet.push(tempMove);
		}
		tempMove = getMoveOffset(-1,1,piece);
		if(tempMove !== null && tempMove.isCapture() === true){
			moveSet.push(tempMove);
		}
	}else if(piece.color === "black"){
		tempMove = getMoveOffset(0,-1,piece);
		if(tempMove !== null && tempMove.isCapture() === false){
			moveSet.push(tempMove);
			if(piece.moveCount === 0){
				tempMove = getMoveOffset(0,-2,piece);
				if(tempMove !== null && tempMove.isCapture() === false){
					moveSet.push(tempMove);
				}
			}
		}
		tempMove = getMoveOffset(-1,-1,piece);
		if(tempMove !== null && tempMove.isCapture() === true){
			moveSet.push(tempMove);
		}
		tempMove = getMoveOffset(1,-1,piece);
		if(tempMove !== null && tempMove.isCapture() === true){
			moveSet.push(tempMove);
		}
	}
	return moveSet;
}
function getKnightMoveSet(piece){
	if(piece === null)return null;
	var moveSet = [];
	var tempMove;
	
	tempMove = getMoveOffset(1,2,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(1,-2,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(-1,-2,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(-1,-2,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(2,1,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(2,-1,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(-2,1,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(-2,-1,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	return moveSet;
}
function getRookMoveSet(piece){
	if(piece === null)return null;
	var moveSet = [];
	var tempMove;
	var i = 1;
	while((tempMove = getMoveOffset(i++,0,piece)) !== null){
		moveSet.push(tempMove);
		if(tempMove.isCapture() === true);
	}
	i = -1;
	while((tempMove = getMoveOffset(i--,0,piece)) !== null){
		moveSet.push(tempMove);
		if(tempMove.isCapture() === true)break;
	}
	i = 1;
	while((tempMove = getMoveOffset(0,i++,piece)) !== null){
		moveSet.push(tempMove);
		if(tempMove.isCapture() === true)break;
	}
	i = -1;
	while((tempMove = getMoveOffset(0,i--,piece)) !== null){
		moveSet.push(tempMove);
		if(tempMove.isCapture() === true)break;
	}
	return moveSet;
}
function getBishopMoveSet(piece){
	if(piece === null)return null;
	var moveSet = [];
	var tempMove;
	var i = 1;
	var j = 0;
	while((tempMove = getMoveOffset(i++,j++,piece)) !== null){
		moveSet.push(tempMove);
		if(tempMove.isCapture() === true)break;
	}
	i = 1;
	j = -1;
	while((tempMove = getMoveOffset(i++,j--,piece)) !== null){
		moveSet.push(tempMove);
		if(tempMove.isCapture() === true)break;
	}
	i = -1;
	j = 1;
	while((tempMove = getMoveOffset(i--,j++,piece)) !== null){
		moveSet.push(tempMove);
		if(tempMove.isCapture() === true)break;
	}
	i = -1;
	j = -1;
	while((tempMove = getMoveOffset(i--,j--,piece)) !== null){
		moveSet.push(tempMove);
		if(tempMove.isCapture() === true)break;
	}
	
	return moveSet;
}
function getQueenMoveSet(piece){
	if(piece === null)return null;
	var moveSet = [];
	
	var rookSet = getRookMoveSet(piece);
	var bishopSet = getBishopMoveSet(piece);
	
	moveSet = rookSet.concat(bishopSet);
	
	return moveSet;
}
function getKingMoveSet(piece){
	if(piece === null)return null;
	var moveSet = [];
	var tempMove;
	
	tempMove = getMoveOffset(0,1,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(0,-2,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(1,1,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(1,-1,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(-1,1,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(-1,-1,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(-1,0,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	tempMove = getMoveOffset(1,0,piece);
	if(tempMove !== null){
		moveSet.push(tempMove);
	}
	return moveSet;
}



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
	piece.location.rank = Number(nextLocation.substring(1));
	piece.location.name = nextLocation;
	piece.moveCount++;
	return true;
}

function isInCheck(color){
	
	if(color === "white"){
		for(var i = 0; i < blackPieces.length; i++){
			if(blackPieces[i].alive === true){
				var testMoveSet = blackPieces[i].moveSet;
				for(var j = 0; j < testMoveSet.length; j++){
					if(testMoveSet[j].givesCheck()){
						return true;
					}
				}
			}
		}
	}else if(color === "black"){
		for(var i = 0; i < whitePieces.length; i++){
			if(whitePieces[i].alive === true){
				var testMoveSet = whitePieces[i].moveSet;
				for(var j = 0; j < testMoveSet.length; j++){
					if(testMoveSet[j].givesCheck())return true;
				}
			}
		}
	}
	return false;
}

function capture(moveToAdd){
	if(moveToAdd === null)return;
	var piece = getPieceByLocationName(moveToAdd.nextLocation)
	if(piece === null)return;
	if(piece.color === "black"){
		for(var i = 0; i < blackPieces.length; i++){
			if(blackPieces[i].location.name === piece.location.name){
				blackPieces[i].alive = false;
			}
		}
	}else if(piece.color === "white"){
		for(var i = 0; i < whitePieces.length; i++){
			if(whitePieces[i].location.name === piece.location.name){
				whitePieces[i].alive = false;
			}
		}
		
	}
}


function tryMove(moveToTry){
	if(moveToTry === null)return "invalid move";
	var color = moveToTry.piece.color;
	if(moveToTry.isCapture()){
		if(moveToTry.givesCheck()){
			return "gives check";
		}else {
			capture(moveToTry);
		}
	}
	if(movePiece(moveToTry.prevLocation,moveToTry.nextLocation) === false){
		return "invalid move";
	}
	updateMoveSetColor(color);
	if(color === "white")updateMoveSetColor("black");
	else if(color === "black")updateMoveSetColor("white");
	var incheck = isInCheck(color);
	updateBoardPiece[0] = moveToTry.nextLocation;
	updateBoardPiece[1] = moveToTry.prevLocation;
	//socket.emit('move', updateBoardPiece);
	movePiece(moveToTry.nextLocation,moveToTry.prevLocation);
	moveToTry.piece.moveCount -= 2;
	if(color === "black"){
			for(var i = 0; i < whitePieces.length;i++){
				if(moveToTry.otherPiece !== null && whitePieces[i].location.name === moveToTry.otherPiece.location.name){
					whitePieces[i].alive = true;
					break;
			}
		}
	}else if(color === "white"){
			for(var i = 0; i < blackPieces.length;i++){
				if(moveToTry.otherPiece !== null && blackPieces[i].location.name === moveToTry.otherPiece.location.name){
					blackPieces[i].alive = true;
					break;
			}
		}
	}
	updateMoveSetColor(color);
	if(color === "white")updateMoveSetColor("black");
	else if(color === "black")updateMoveSetColor("white");
	if(incheck){
		return "in check";
	}
	return "valid move";
	
}

function getNumPossibleMoves(color){
	var count = 0;
	if(color === "white"){
		for(var i = 0; i < whitePieces.length; i++){
			if(whitePieces[i].alive === true){
				for(var j = 0; j < whitePieces[i].moveSet.length; j++){
					var tryMov = tryMove(whitePieces[i].moveSet[j]);
					if(tryMov === "valid move" || tryMov === "gives check")count++;
				}
			}
		}
	}else if(color === "black"){
		for(var i = 0; i < blackPieces.length; i++){
			if(blackPieces[i].alive === true){
				for(var j = 0; j < blackPieces[i].moveSet.length; j++){
					var tryMov = tryMove(blackPieces[i].moveSet[j]);
					if(tryMov === "valid move" || tryMov === "gives check")count++;
				}
			}
		}
	}
	return count;
}

function highlightMoveSet(player){
	if(player === null)return;
	for(var i = 0;i < player.moveSet.length; i++){
		var tryMov = tryMove(player.moveSet[i]);
		if(tryMov === "valid move" || tryMov === "gives check")highlightSquareByLocationName(player.moveSet[i].nextLocation);
		
	}
	
}


function getMoveSet(piece){
	if(piece === null)return null;
	var moveSet = [];
	if(piece.name === "pawn")moveSet = getPawnMoveSet(piece);
	else if(piece.name === "knight")moveSet = getKnightMoveSet(piece);
	else if(piece.name === "rook")moveSet = getRookMoveSet(piece);
	else if(piece.name === "bishop")moveSet = getQueenMoveSet(piece);
	else if(piece.name === "queen")moveSet = getQueenMoveSet(piece);
	else if(piece.name === "king")moveSet = getKingMoveSet(piece);
	var i = 0;
	
	piece.moveSet = moveSet;
	return moveSet;
}

function cleanMoveSet(piece){
	var i = 0;
	while(i < piece.moveSet.length){
		if(piece.moveSet[i].valid == false){
			piece.moveSet.splice(i,1);
		}else i++;
	}
	
}

function updateMoveSetColor(color){
	if(color === "white"){
		for(var i = 0; i < whitePieces.length; i++){
			if(whitePieces[i].alive === true)updateMoveSet(whitePieces[i]);
		}
	}else if(color === "black"){
		for(var i = 0; i < blackPieces.length; i++){
			if(blackPieces[i].alive === true)updateMoveSet(blackPieces[i]);
		}
	}
}

function updateMoveSet(piece){
	if(piece === null)return;
	if(piece.alive === true)getMoveSet(piece);
}

function promote(piece){
	if(piece === null)return false;
	var color = piece.color;
	if(piece.name === "pawn"){
		if(piece.color === "white"){
			if(piece.location.rank === 1){
				piece.name = "queen";
				updateMoveSetColor(color);
				if(color === "white")updateMoveSetColor("black");
				else if(color === "black")updateMoveSetColor("white");
				return true;
			}
		}else if(piece.color === "black"){
			if(piece.location.rank === 1){
				piece.name = "queen";
				updateMoveSetColor(color);
				if(color === "white")updateMoveSetColor("black");
				else if(color === "black")updateMoveSetColor("white");
				return true;
			}
		}
	}
	return false;
}

function makeMove(moveToMake){
	var tryMov = tryMove(moveToMake);
	if(tryMov === "invalid move" || tryMov === "in check")return false;
	if(moveToMake.isCapture()){
		capture(moveToMake);
	}
	updateBoardPiece[0] = moveToMake.prevLocation;
	updateBoardPiece[1] = moveToMake.nextLocation;
	socket.emit('move', updateBoardPiece);
	movePiece(moveToMake.prevLocation,moveToMake.nextLocation);
	promote(moveToMake.piece);
	return true;
}

function canMove(color){
	if(getNumPossibleMoves(color) === 0)return "checkmate";
	else if(isInCheck(color) === false && getNumPossibleMoves(color) === 0)return "stalemate";
	else return "" + getNumPossibleMoves(color);
}

function completeMove(moveToAdd){
	if(makeMove(moveToAdd) === false) return false;
	//socket.emit('move', {});
	moveHistory.push(moveToAdd.getMoveString());
	turnCount++;
	redrawLocationList.push(moveToAdd.prevLocation);
	redrawLocationList.push(moveToAdd.nextLocation);
	updateMoveSetColor(moveToAdd.piece.color);
	if(moveToAdd.piece.color === "white")updateMoveSetColor("black");
	else if(moveToAdd.piece.color === "black")updateMoveSetColor("white");
	updateMoveSetColor("black");
	window.console.log(moveHistory[turnCount - 1]);
	if(moveToAdd.piece.color === "white"){
		var moveString = canMove("black");
		if(moveString === "checkmate"){
			messenger.addMessageToSend("white wins!");
			gameOver = true;
			window.console.log("white wins!");
		}else if(moveString === "stalemate"){
			messenger.addMessageToSend("its a draw!");
			gameOver = true;
			window.console.log("its a draw!");
		}else{
			messenger.addMessageToSend(moveToAdd.getMoveString());
		}
	}else if(moveToAdd.piece.color === "black"){
		var moveString = canMove("white");
		if(moveString === "checkmate"){
				messenger.addMessageToSend("black wins!");
				gameOver = true;
				window.console.log("black wins!");
		}else if(moveString === "stalemate"){
			messenger.addMessageToSend("its a draw!");
			gameOver = true;
			window.console.log("its a draw!");
		}else{
			messenger.addMessageToSend(moveToAdd.getMoveString());
		}
	}


	return true;
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
	
	if(square.color === "black")ctx.fillStyle = "rgba(30,30,50,1)";
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
	var c = piece.color.substring(0,1).toLowerCase();
	var n = piece.name.substring(0,1).toUpperCase();
	if(n === "K"){
		if(piece.name === "knight")n = "N";
	}
	var imgSrc = "img/chesspieces/wikipedia/" + c + n + ".png";
	piece.img.src = imgSrc;
	piece.img.onload = function(){
		ctx.drawImage(piece.img, x, y);
	}
}
function drawLocation(locationName){
	var sq = getSquareByName(locationName)
	if(sq !== null)drawSquare(sq);
	var p = getPieceByLocationName(locationName)
	if(p !== null)drawPiece(p);
}

function drawBoard(){
	if(redrawLocationList.length === 0)return;
	for (var i = 0; i < redrawLocationList.length; i++){
		drawLocation(redrawLocationList[i]);
	}
	redrawLocationList = [];
}

//temp function
function onClick(e){
	var file = getFileFromX(e.pageX)
	var rank = getRankFromY(e.pageY)
	var piece = getPiece(file, rank);
	clearHighlights();
	if(whitePlayer.isTurn() === true){
		for(var i = 0; i < whitePlayer.moveSet.length; i++){
			if(whitePlayer.moveSet[i].nextLocation === getSquare(file, rank).location.name){
				if(completeMove(whitePlayer.moveSet[i]) === true){
					whitePlayer.moveSet = [];
					drawBoard();
				}
				return;
			}
		}
	}else if(blackPlayer.isTurn() === true){
		for(var i = 0; i < blackPlayer.moveSet.length; i++){
			if(blackPlayer.moveSet[i].nextLocation === getSquare(file, rank).location.name){
				if(completeMove(blackPlayer.moveSet[i]) === true){
					blackPlayer.moveSet = [];
					drawBoard();
				}
				return;
			}
		}
	}
	if(piece === null){
		return;
	}
	if(whitePlayer.isTurn() === true && piece.color === "white"){
		whitePlayer.moveSet = piece.moveSet;
	}else if(blackPlayer.isTurn() === true && piece.color === "black"){
		blackPlayer.moveSet = piece.moveSet;
		highlightMoveSet(blackPlayer);
	}
	drawBoard();
}

canvas.addEventListener("click", onClick);

function startNewGame(whitePlayerName, blackPlayerName, messenger_){
	messenger = messenger_;
	gameOver = false;
	whitePlayer = new ChessPlayer(whitePlayerName, "white");
	blackPlayer = new ChessPlayer(blackPlayerName, "black");
	whitePieces = initWhitePieces();
	blackPieces = initBlackPieces();
	squares = initSquares();
	moveHistory = [];
	turnCount = 0;
	clearHighlights();
	updateMoveSetColor("white");
	updateMoveSetColor("black");
	completeMove(getMoveFromString("2: black knight g8 to f6"));
	drawBoard();
	
}
function updateNewBoard(from, to) {
	movePiece(from, to);
	redrawLocationList.push(from);
	redrawLocationList.push(to);
	turnCount+=1;
	drawBoard();
}
socket.on('move', function(msg){
	updateNewBoard(msg[0], msg[1]);
});

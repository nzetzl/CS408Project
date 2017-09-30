
//returns a Move object or null if the move is invalid
function getMoveObject(prevSquare, newSquare){
	if(prevSquare === null || newSquare == null)return null;
	
	if(newSquare.currentPiece === null)return new Move(prevSquare, newSquare, false, false);
		
	if(prevSquare.currentPiece.color === newSquare.currentPiece.color)return null;
	else return new Move(prevSquare,newSquare,true,false);
		
}

function getMove(rankOffset, fileOffset, piece, chessBoard){
	var testSquare = chessBoard.getSquare(piece.rank + rankOffset, piece.file + fileOffset);
	var testMove = getMoveObject(chessBoard.getSquare(piece.rank, piece.file).file, testSquare);
	if(testMove !== null)return testMove;
	return null;
}

function addMove(moveSet, move){
	if(move !== null)moveSet.push(move);
}

function getPawnMoveSet(piece, chessBoard){ //TODO add en passant
	var moveSet = [];
	var testMove = null;
	var rankDir = 1;
	if(piece.color === "black")rankDir = -1;
	addMove(moveSet,getMove(1*rankDir,0,piece,chessBoard));
	if(piece.currentSquare.rank === 2){
		addMove(moveSet,getMove(2*rankDir,0,piece,chessBoard));
	}
	testMove = getMove(1*rankDir,-1,piece,chessBoard);
	if(testMove !== null){
		if(testMove.iscapture === true)moveSet.push(testMove);
	}
	testMove = getMove(1*rankDir,1,piece,chessBoard);
	if(testMove !== null){
		if(testMove.iscapture === true)moveSet.push(testMove);
	}
	
	if(moveSet.length == 0)return null;
	return moveSet;
}

function getRookMoveSet(piece, chessboard){
	var moveSet = [];
	var testMove = null;
	var i = 1;
	do{
		testMove = getMove(i,0,piece,chessboard);
		addMove(moveSet, testMove);
		if(testMove.isCapture === true)break;
		i++;
	}while(testMove !== null);
	
	i = -1;
	do{
		testMove = getMove(i,0,piece,chessboard);
		addMove(moveSet, testMove);
		if(testMove.isCapture === true)break;
		i--;
	}while(testMove !== null);
	
	i = 1;
	do{
		testMove = getMove(0,i,piece,chessboard);
		addMove(moveSet, testMove);
		if(testMove.isCapture === true)break;
		i++;
	}while(testMove !== null);
	
	i = -1;
	do{
		testMove = getMove(0,i,piece,chessboard);
		addMove(moveSet, testMove);
		if(testMove.isCapture === true)break;
		i--;
	}while(testMove !== null);
	
	if(moveSet.length == 0)return null;
	return moveSet;
}

function getKnightMoveSet(piece, chessboard){ //TODO
	var moveSet = [];
	var testMove = null;
	
	addMove(moveSet, getMove(1,2,piece,chessBoard));
	addMove(moveSet, getMove(1,-2,piece,chessBoard));
	addMove(moveSet, getMove(-1,2,piece,chessBoard));
	addMove(moveSet, getMove(-1,-2,piece,chessBoard));
	addMove(moveSet, getMove(2,1,piece,chessBoard));
	addMove(moveSet, getMove(2,-1,piece,chessBoard));
	addMove(moveSet, getMove(2,1,piece,chessBoard));
	addMove(moveSet, getMove(2,-1,piece,chessBoard));
	
	if(moveSet.length == 0)return null;
	return moveSet;
}

function getBishopMoveSet(piece, chessboard){
	var moveSet = [];
	var testMove = null;
	
	var i = 1;
	do{
		testMove = getMove(i,i,piece,chessboard);
		addMove(moveSet, testMove);
		if(testMove.isCapture === true)break;
		i++;
	}while(testMove !== null);
	
	i = 1;
	do{
		testMove = getMove(-1 * i, -1 * i,piece,chessboard);
		addMove(moveSet, testMove);
		if(testMove.isCapture === true)break;
		i++;
	}while(testMove !== null);
	
	i = 1;
	do{
		testMove = getMove(-1 * i,i,piece,chessboard);
		addMove(moveSet, testMove);
		if(testMove.isCapture === true)break;
		i++;
	}while(testMove !== null);
	
	i = 1;
	do{
		testMove = getMove(i,-1 * i,piece,chessboard);
		addMove(moveSet, testMove);
		if(testMove.isCapture === true)break;
		i++;
	}while(testMove !== null);
	
	if(moveSet.length == 0)return null;
	return moveSet;
}

function getQueenMoveSet(piece, chessboard){
	var moveSet = [];
	var testMove = null;
	
	moveset = getRookMoveSet(piece, chessboard).concat(getBishopMoveSet(piece, chessboard));
	
	if(moveSet.length == 0)return null;
	return moveSet;
}

function getKingMoveSet(piece, chessboard){ //TODO
	var moveSet = [];
	var testMove = null;
	
	addMove(moveSet, getMove(1,0,piece,chessBoard));
	addMove(moveSet, getMove(1,1,piece,chessBoard));
	addMove(moveSet, getMove(1,-1,piece,chessBoard));
	addMove(moveSet, getMove(0,1,piece,chessBoard));
	addMove(moveSet, getMove(0,-1,piece,chessBoard));
	addMove(moveSet, getMove(-1,1,piece,chessBoard));
	addMove(moveSet, getMove(-1,0,piece,chessBoard));
	addMove(moveSet, getMove(-1,-1,piece,chessBoard));
	
	if(moveSet.length == 0)return null;
	return moveSet;
}

function getMoveSet(piece, chessboard){
	var moveSet = [];
	//get basic moveset of piece
	if(piece.name === "pawn")moveSet = getPawnMoveSet(piece, chessboard);
	else if(piece.name === "rook")moveSet = getRookMoveSet(piece,chessboard);
	else if(piece.name === "knight")moveSet = getKnightMoveSet(piece,chessboard);
	else if(piece.name === "bishop")moveSet = getBishopkMoveSet(piece,chessboard);
	else if(piece.name === "queen")moveSet = getQueenMoveSet(piece,chessboard);
	else if(piece.name === "king")moveSet = getKingMoveSet(piece,chessboard);
	
	//remove nonvalid squares based off of other rules
	
	if(moveSet.length == 0)return null;
	return moveSet;
}




function isInCheck(player){
	if(player.pieces === null)return false;
	for(i = 0; i < player.pieces.length; i++){
		for(j = 0; j < player.pieces.moveSet.length; j++){
			if(player.pieces[i].moveSet[j].givesCheck === true)return true;
		}
	}
	return false;
	
}



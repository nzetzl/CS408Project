function initSquares(){
	var squareSet = [];
	for(i = 1; i <= 8; i++){
		for(j = 1; j <= 8; j++){
			squareSet.push(new ChessSquare(i, j, null));
		}
	}
	return squareSet;
}

function initPiece(name, color, rank, file, chessBoard){
	var piece = new ChessPiece(name,color,rank,file);
	chessBoard.getSquare(rank,file).currentPiece = piece;
	if(color === chessBoard.player1.color)chessBoard.player1.pieces.push(piece);
	else if(color === chessBoard.player2.color)chessBoard.player2.pieces.push(piece);
	window.console.log(name);
}

function initPieces(chessBoard){
	var color = "white";
	initPiece("pawn",color, 2, 1, chessBoard);
	initPiece("pawn",color, 2, 2, chessBoard);
	initPiece("pawn",color, 2, 3, chessBoard);
	initPiece("pawn",color, 2, 4, chessBoard);
	initPiece("pawn",color, 2, 5, chessBoard);
	initPiece("pawn",color, 2, 6, chessBoard);
	initPiece("pawn",color, 2, 7, chessBoard);
	initPiece("pawn",color, 2, 8, chessBoard);
	
	initPiece("rook",color, 1, 1, chessBoard);
	initPiece("rook",color, 1, 8, chessBoard);
	initPiece("knight",color, 1, 7, chessBoard);
	initPiece("knight",color, 1, 1, chessBoard);
	initPiece("bishop",color, 1, 3, chessBoard);
	initPiece("bishop",color, 1, 6, chessBoard);
	initPiece("queen",color, 1, 4, chessBoard);
	initPiece("king",color, 1, 5, chessBoard);
			
	color = "black";	
	initPiece("pawn",color, 7, 1, chessBoard);
	initPiece("pawn",color, 7, 2, chessBoard);
	initPiece("pawn",color, 7, 3, chessBoard);
	initPiece("pawn",color, 7, 4, chessBoard);
	initPiece("pawn",color, 7, 5, chessBoard);
	initPiece("pawn",color, 7, 6, chessBoard);
	initPiece("pawn",color, 7, 7, chessBoard);
	initPiece("pawn",color, 7, 8, chessBoard);
	
	initPiece("rook",color, 8, 1, chessBoard);
	initPiece("rook",color, 8, 8, chessBoard);
	initPiece("knight",color, 8, 7, chessBoard);
	initPiece("knight",color, 8, 1, chessBoard);
	initPiece("bishop",color, 8, 3, chessBoard);
	initPiece("bishop",color, 8, 6, chessBoard);
	initPiece("queen",color, 8, 4, chessBoard);
	initPiece("king",color, 8, 5, chessBoard);
}

function startChessGame(player1, player2){
	var chessBoard = new ChessBoard(new Player(player1, "white", true, null), new Player(player2, "black", false, null));
	chessBoard.squares = initSquares();
	initPieces(chessBoard);
	draw(chessBoard);
}
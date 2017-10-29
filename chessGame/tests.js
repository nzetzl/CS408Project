/*
 * First Test Initialization for White / Black Pieces
 */

test("Init White Pieces", function () {
  var expected = [
	new ChessPiece("pawn", "white", new Location(1, 2)),
	new ChessPiece("pawn", "white", new Location(2, 2)),
	new ChessPiece("pawn", "white", new Location(3, 2)),
	new ChessPiece("pawn", "white", new Location(4, 2)),
	new ChessPiece("pawn", "white", new Location(5, 2)),
	new ChessPiece("pawn", "white", new Location(6, 2)),
	new ChessPiece("pawn", "white", new Location(7, 2)),
	new ChessPiece("pawn", "white", new Location(8, 2)),
	new ChessPiece("rook", "white", new Location(1, 1)),
	new ChessPiece("knight", "white", new Location(2, 1)),
	new ChessPiece("bishop", "white", new Location(3, 1)),
	new ChessPiece("queen", "white", new Location(4, 1)),
	new ChessPiece("king", "white", new Location(5, 1)),
	new ChessPiece("bishop", "white", new Location(6, 1)),
	new ChessPiece("knight", "white", new Location(7, 1)),
	new ChessPiece("rook", "white", new Location(8, 1))
	];
  var result = initWhitePieces();
  deepEqual(expected, result);
})

test("Init Black Pieces", function () {
  var expected = [
	new ChessPiece("pawn", "black", new Location(1, 7)),
	new ChessPiece("pawn", "black", new Location(2, 7)),
	new ChessPiece("pawn", "black", new Location(3, 7)),
	new ChessPiece("pawn", "black", new Location(4, 7)),
	new ChessPiece("pawn", "black", new Location(5, 7)),
	new ChessPiece("pawn", "black", new Location(6, 7)),
	new ChessPiece("pawn", "black", new Location(7, 7)),
	new ChessPiece("pawn", "black", new Location(8, 7)),
	new ChessPiece("rook", "black", new Location(1, 8)),
	new ChessPiece("knight", "black", new Location(2, 8)),
	new ChessPiece("bishop", "black", new Location(3, 8)),
	new ChessPiece("queen", "black", new Location(4, 8)),
	new ChessPiece("king", "black", new Location(5, 8)),
	new ChessPiece("bishop", "black", new Location(6, 8)),
	new ChessPiece("knight", "black", new Location(7, 8)),
	new ChessPiece("rook", "black", new Location(8, 8))
	];
  var result = initBlackPieces();
  deepEqual(expected, result);
})

/*
 * Begin basic tests
 */ 
test("Setting the board", function() {
  var whitePlayer = new ChessPlayer("p1", "white");
  var blackPlayer = new ChessPlayer("p2", "black");
  var whitePieces = initWhitePieces();
  var blackPieces = initBlackPieces();

  var squares = initSquares();
  
  
  // Further testing will be very difficult
  // Nearly every aspect of the game is tied into the front end
  // Will take a LOT of refactoring
  
  // Pawn should have 2 moves
  var pawnMoveTest = getPawnMoveSet(whitePieces[0]);
  console.log(JSON.stringify(pawnMoveTest));
  
  // King is trapped. Shouldn't move
  var kingMoveTest = getKingMoveSet(whitePieces[12]);
  deepEqual(kingMoveTest, []);
  
  
})

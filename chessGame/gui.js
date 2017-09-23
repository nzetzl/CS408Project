function drawSquare(square, ctx){
	if(square === null || ctx === null)return;
	if(square.color() === "black")ctx.fillStyle = "rgba(0,0,0,1)";
	else if(square.color() === "white")ctx.fillStyle = "rgba(240,240,240,1)";
	var y = 800 - (square.rank * square.size);
	var x = square.file * square.size;
	
	ctx.fillRect(x, y, square.size, square.size);
	if(square.currentPiece === null)return;
	ctx.font = "10px Arial";
	ctx.fillStyle = "red";
	ctx.fillText(square.currentPiece.name.substring(0,1),x+square.size/2,y+square.size/2);
}

function draw(chessBoard){
	var canvas = document.getElementById("chessBoardCanvas");
	var ctx = canvas.getContext("2d");
	for(i = 0; i < chessBoard.squares.length; i++){
		drawSquare(chessBoard.squares[i],ctx);
	}
}


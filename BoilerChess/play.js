/*jslint browser: true*/
/*jslint devel: true*/
/*global $, jQuery, Chess, ChessBoard*/
var init = function () {
  "use strict";
  //--- start example JS ---
  var board, game, onDragStart, makeRandomMove, randomIndex, onDrop, onSnapEnd, cfg;
  game = new Chess();

  // do not pick up pieces if the game is over
  // only pick up pieces for White
  onDragStart = function (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true || piece.search(/^b/) !== -1) {
      return false;
    }
  };

  makeRandomMove = function () {
    var possibleMoves = game.moves();

    // game over
    if (possibleMoves.length === 0) {
      return;
    }

    randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    board.position(game.fen());
  };

  onDrop = function (source, target) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {
      return 'snapback';
    }

    // make random legal move for black
    window.setTimeout(makeRandomMove, 250);
  };

  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  onSnapEnd = function () {
    board.position(game.fen());
  };

  cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  };
  board = new ChessBoard('board', cfg);
  //--- end example JS ---

}; // end init()

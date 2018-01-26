/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n}); //the board, whatever it is;

  // var rowArray = [0,0,0,0];
  // get size of board
  var size = n;
  debugger;

  // initialize for first row
  var row = 0;
  // initialize for first col
  var col = 0;


  for (var row = 0; row < size; row++) {
    var recurseRow = function(row, col) {
      if (col = n) {
        return;
      }
    
      // toggle on row,col
      board.togglePiece(row, col); // on
      // check for conflict
      if (board.hasAnyRooksConflicts(row, col)) {
        // toggle off row,col
        board.togglePiece(row, col); // off
        col++;
        recurseRow(row, col);
      }
    };
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
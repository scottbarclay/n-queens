// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


  /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // if rowIndex is in bounds of board
      var size = this.get(rowIndex).length;
      if (rowIndex < size) {
        // set counter to 0
        var counter = 0;
        // get row at rowIndex
        var row = this.get(rowIndex);
        // for each column in row
        for (var col = 0; col < size; col++) {
          // if there is a piece, increment counter
          if (row[col] === 1) {
            counter++;
            // if counter > 1, return true
            if (counter > 1) {
              return true;
            }
          }
        }   
      }
      // else return false      
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // debugger;
      var size = this.get('n');
  
      //iterate row of board...  
      for (var row = 0; row < size; row++) {
        //see if there's conflict in current row
        if (this.hasRowConflictAt(row)) {
          return true;
        }
      }
      // if there's no conflict
      return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //set conflict counter var to 0;
      var counter = 0;
      //abbreviate colIndex in a variable
      var col = colIndex;
      //get board size
      var size = this.get('n');
      //iterate through rows to check col to see if piece exist
      for (var i = 0; i < size; i++) {
        // row = this.get(i);
        if (this.get(i)[col] === 1) {
          //increment counter if there is a piece
          counter++;
          if (counter > 1) {
            //if counter > 1, return true
            return true;
          }
        }
      }
      //if there's no conflict
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // debugger;
      //get board size
      var size = this.get('n');
      //check each row to see if there's conflict
      for (var i = 0; i < size; i++) {
        //if there's a conflict in the col, return true
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      //return false if none
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(rowIndex, columnIndex) {
      //set counter to index passed
      // var counter = majorDiagonalColumnIndexAtFirstRow;
      //set size to board size
      var size = this.get('n');
      //get row that rowIndex references
      var row = this.get(rowIndex);

      //loop throw rows beginning at row index passed in
      for (var row = rowIndex + 1; row < size; row++) {
        //loop through column of the row
        for (var col = columnIndex + 1; col < size; col++) {
          if (this.get(row)[col] === 1) {
            //if it is, return true to show conflict
            return true;
          }
        //check if row sub counter is toggled on
        }
      }
      //return false if no conflict at all
      return false; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //set size of board
      // debugger;
      var size = this.get('n');
      //set temporary array to capture toggle index  coordinates in row
      var toggles = [];
      //loop through row 
      for (var row = 0; row < size; row++) {
        //loop through column
        for (var col = 0; col < size; col++) {
          //if there's a piece there, store piece coordinates in temp. array
          if (this.get(row)[col] === 1) {
            toggles.push([row, col]);
          }
        }
      }
      //loop through temp. array and call hasMajorConflictDiag.. on each coordinate
      for (var j = 0; j < toggles.length; j++) {
        // row coordinate
        var rowIndex = toggles[j][0];
        // column coordinate
        var columnIndex = toggles[j][1];
        if (this.hasMajorDiagonalConflictAt(rowIndex, columnIndex)) {
          //if theres conflict, return true
          return true;
        }
      }
      
      //if no toggles, return false 
      return false; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(rowIndex, columnIndex) {
      //set size to board size
      var size = this.get('n');
      //get row that rowIndex references
      var row = this.get(rowIndex);

      //loop throw rows beginning at row index passed in
      for (var row = rowIndex + 1; row < size; row++) {
        //loop through column of the row
        for (var col = columnIndex - 1; col >= 0; col--) {
          if (this.get(row)[col] === 1) {
            //if it is, return true to show conflict
            return true;
          }
        //check if row sub counter is toggled on
        }
      }
      //return false if no conflict at all
      return false; 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //set size of board
      // debugger;
      var size = this.get('n');
      //set temporary array to capture toggle index  coordinates in row
      var toggles = [];
      //loop through row 
      for (var row = 0; row < size; row++) {
        //loop through column
        for (var col = size - 1; col >= 0; col--) {
          //if there's a piece there, store piece coordinates in temp. array
          if (this.get(row)[col] === 1) {
            toggles.push([row, col]);
          }
        }
      }
      //loop through temp. array and call hasMajorConflictDiag.. on each coordinate
      for (var j = 0; j < toggles.length; j++) {
        // row coordinate
        var rowIndex = toggles[j][0];
        // column coordinate
        var columnIndex = toggles[j][1];
        if (this.hasMajorDiagonalConflictAt(rowIndex, columnIndex)) {
          //if theres conflict, return true
          return true;
        }
      }
      
      //if no toggles, return false 
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

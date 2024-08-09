function calculateWinner(squares) {
  // Array of possible winning combinations
  const lines = [
    [0, 1, 2], // Rows and Columns
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ];

  // Loop through each winning combination to check if a player has won
  for (let i = 0; i < lines.length; i++) {
    // Destructure the indices of the winning line
    const [a, b, c] = lines[i];

    // Check if the current line has the same non-null value (indicating a win)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Return the winner (either 'X' or 'O') and the winning line
      return { winner: squares[a], winningLine: lines[i] };
    }
  }

  // Check if all squares are filled but there is no winner (indicating a draw)
  const isDraw = squares.every(square => square !== null);

  // Return no winner, an empty winning line, and the draw status
  return { winner: null, winningLine: [], isDraw };
}

export default calculateWinner;

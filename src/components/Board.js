import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

// The Board component represents the entire Tic-Tac-Toe board.
// It receives the current state of the board, a function to handle square presses, and the winning line as props.
const Board = ({ board, onPress, winningLine }) => {
  
  // The renderSquare function is used to render each individual square on the board.
  // It checks if the current square is part of the winning line to apply specific styling.
  const renderSquare = (index) => {
    const isWinningSquare = winningLine && winningLine.includes(index);
    return (
      <Square 
        key={index} // Key is required to identify each element in the list.
        value={board[index]} // The current value ('X', 'O', or null) of the square.
        onPress={() => onPress(index)} // Function to handle press events for the square.
        isWinningSquare={isWinningSquare} // Boolean indicating if the square is part of the winning line.
      />
    );
  };

  return (
    // The board is rendered as a View component with a grid layout.
    <View style={styles.board}>
      {board.map((_, index) => renderSquare(index))} 
      {/* Iterates through the board array to render each square using renderSquare. */}
      
      {winningLine && (
        // If there's a winning line, render an overlaying cross line to highlight the winning combination.
        <View style={[styles.crossLine, getCrossLineStyle(winningLine)]} />
      )}
    </View>
  );
};

// The getCrossLineStyle function determines the style of the cross line based on the winning line.
// It returns the style object that defines the position, rotation, and size of the line.
const getCrossLineStyle = (winningLine) => {
  if (winningLine.length === 0) return {}; // If there's no winning line, return an empty style object.

  const [[start, middle, end]] = [winningLine]; // Destructure the winningLine to get the start and end positions.

  switch (start) {
    case 0:
      // Cases for when the winning line starts at position 0.
      if (end === 2) return { top: '16.67%', width: '100%', height: 5 }; // Horizontal top line
      if (end === 8) return { transform: [{ rotate: '45deg' }], width: '101.42%', height: 5, top: '50%' }; // Diagonal line from top-left to bottom-right
      return { left: '16.67%', width: 5, height: '100%' }; // Vertical left line
    case 1:
      // Case for vertical middle line
      return { left: '50%', width: 5, height: '100%' };
    case 2:
      // Cases for when the winning line starts at position 2.
      if (end === 6) return { transform: [{ rotate: '-45deg' }], width: '101.42%', height: 5, top: '50%' }; // Diagonal line from top-right to bottom-left
      return { left: '83.33%', width: 5, height: '100%' }; // Vertical right line
    case 3:
      // Case for horizontal middle line
      return { top: '50%', width: '100%', height: 5 };
    case 6:
      // Case for horizontal bottom line
      return { top: '83.33%', width: '100%', height: 5 };
    default:
      return {}; // Default case returns an empty style object.
  }
};

// Styles for the Board component
const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',// The board is laid out in a row direction.
    flexWrap: 'wrap',// The squares will wrap to form a grid.
    position: 'relative',
  },
  crossLine: {
    position: 'absolute',
    backgroundColor: 'red',
  },
});

export default Board;

import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

// The Square component represents a single square on the Tic-Tac-Toe board.
// It accepts three props:
// - value: The current value of the square, which can be 'X', 'O', or null.
// - onPress: A function to handle the press event when the square is clicked.
// - isWinningSquare: A boolean indicating if this square is part of the winning line.

const Square = ({ value, onPress, isWinningSquare }) => {
  let source;

  // Determine the image source based on the value of the square.
  if (value === 'X') {
    source = require('../assets/x.png'); // Path to the X image asset
  } else if (value === 'O') {
    source = require('../assets/o.png'); // Path to the O image asset
  }

  return (
    // TouchableOpacity is used to make the square clickable.
    // The style combines the default square style and an additional style if the square is part of the winning line.
    <TouchableOpacity 
      style={[styles.square, isWinningSquare && styles.winningSquare]} 
      onPress={onPress} // Trigger the onPress function when the square is clicked
    >
      {/* If the source is defined (i.e., the square has been clicked and has a value), it displays the corresponding image. */}
      {source && <Image source={source} style={styles.squareImage} />}
    </TouchableOpacity>
  );
};

// Styles for the Square component
const styles = StyleSheet.create({
  square: {
    width: '33%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  winningSquare: {
    backgroundColor: 'rgba(00, 00, 0, 0.3)',
  },
  squareImage: {
    width: '55%',
    height: '55%',
    resizeMode: 'contain', // Ensures the image maintains its aspect ratio within the square
  },
});

export default Square;

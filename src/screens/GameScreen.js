import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Board from '../components/Board';
import calculateWinner from '../utils/calculateWinner';

const GameScreen = ({ route }) => {
  // Destructure player information passed from the PlayerSelectionScreen
  const { player1Name, player1Symbol, player2Name, player2Symbol } = route.params;

  // State to manage the board's state (an array of 9 nulls representing the 9 squares)
  const [board, setBoard] = useState(Array(9).fill(null));

  // State to manage which player's turn it is (true if X is next, false if O is next)
  const [xIsNext, setXIsNext] = useState(true);

  // State to manage the background color of the game screen
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  // State to manage the visibility of the winner/draw modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Calculate the winner, draw status, and winning line using the utility function
  const winnerInfo = calculateWinner(board); 
  const winner = winnerInfo.winner;
  const isDraw = winnerInfo.isDraw;
  const winningLine = winnerInfo.winningLine;

  // useEffect hook to get and set the background color from AsyncStorage when the component mounts
  useEffect(() => {
    const getSettings = async () => {
      const color = await AsyncStorage.getItem('backgroundColor');
      if (color) {
        setBackgroundColor(color);
      }
    };
    getSettings();
  }, []);

  // useEffect hook to show the modal and reset the game after 3 seconds if there is a winner or draw
  useEffect(() => {
    if (winner || isDraw) {
      setModalVisible(true);
      setTimeout(() => {
        resetGame();
      }, 3000); // Show the modal for 3 seconds
    }
  }, [winner, isDraw]);

  // Function to handle a player's move
  const handlePress = (index) => {
    // If the square is already filled or there is already a winner or draw, do nothing
    if (board[index] || winner || isDraw) return;

    // Create a new board array and update the clicked square with the current player's symbol
    const newBoard = [...board];
    newBoard[index] = xIsNext ? player1Symbol : player2Symbol;

    // Update the board state and toggle the next player's turn
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Function to reset the game to its initial state
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Reset the board
    setXIsNext(true); // Set the next player to X
    setModalVisible(false); // Hide the modal
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Display the title of the game */}
      <Text style={styles.title}>Tic-Tac-Toe</Text>

      {/* Display the game status: either the winner, draw, or next player */}
      <Text style={styles.status}>
        {winner 
          ? `Winner: ${winner === player1Symbol ? player1Name : player2Name}` 
          : isDraw 
            ? "It's a draw!" 
            : `Next Player: ${xIsNext ? player1Name : player2Name}`}
      </Text>

      {/* Render the game board */}
      <Board board={board} onPress={handlePress} winningLine={winningLine} />

      {/* Button to manually reset the game */}
      <Button title="Reset Game" onPress={resetGame} />

      {/* Modal to show the winner or draw message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            {winner ? `Congratulations ${winner === player1Symbol ? player1Name : player2Name}! You won!` : "It's a draw!"}
          </Text>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the GameScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  status: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // semi-transparent background
  },
  modalText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
});

export default GameScreen;

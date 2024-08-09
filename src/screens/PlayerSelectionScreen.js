import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PlayerSelectionScreen = ({ navigation }) => {
  // State to manage Player 1's name
  const [player1Name, setPlayer1Name] = useState('');

  // State to manage Player 1's symbol
  const [player1Symbol, setPlayer1Symbol] = useState('X');

  // State to manage Player 2's name
  const [player2Name, setPlayer2Name] = useState('');

  // State to manage Player 2's symbol
  const [player2Symbol, setPlayer2Symbol] = useState('O');

  // Ref for the Picker component (optional, not used in this example)
  const pickerRef = useRef(null);

  // Function to handle starting the game
  const handleStartGame = () => {
    // Check if both players have entered their names
    if (!player1Name || !player2Name) {
      Alert.alert('Missing Information', 'Please enter names for both players.');
      return;
    }

    // Check if both players have chosen different symbols
    if (player1Symbol === player2Symbol) {
      Alert.alert('Symbol Conflict', 'Both players cannot have the same symbol.');
      return;
    }

    // Navigate to the Game screen, passing player information as parameters
    navigation.navigate('Game', { player1Name, player1Symbol, player2Name, player2Symbol });
  };

  return (
    <View style={styles.container}>
      {/* Input for Player 1's Name */}
      <Text style={styles.label}>Player 1 Name:</Text>
      <TextInput
        style={styles.input}
        value={player1Name}
        onChangeText={setPlayer1Name}
        placeholder="Enter Player 1 Name"
      />

      {/* Picker for Player 1's Symbol */}
      <Text style={styles.label}>Player 1 Symbol:</Text>
      <Picker
        ref={pickerRef}
        selectedValue={player1Symbol}
        style={styles.picker}
        onValueChange={(itemValue) => setPlayer1Symbol(itemValue)}
      >
        <Picker.Item label="X" value="X" />
        <Picker.Item label="O" value="O" />
      </Picker>

      {/* Input for Player 2's Name */}
      <Text style={styles.label}>Player 2 Name:</Text>
      <TextInput
        style={styles.input}
        value={player2Name}
        onChangeText={setPlayer2Name}
        placeholder="Enter Player 2 Name"
      />

      {/* Picker for Player 2's Symbol */}
      <Text style={styles.label}>Player 2 Symbol:</Text>
      <Picker
        ref={pickerRef}
        selectedValue={player2Symbol}
        style={styles.picker}
        onValueChange={(itemValue) => setPlayer2Symbol(itemValue)}
      >
        <Picker.Item label="X" value="X" />
        <Picker.Item label="O" value="O" />
      </Picker>

      {/* Button to start the game */}
      <Button title="Start Game" onPress={handleStartGame} />
    </View>
  );
};

// Styles for the Player Selection Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
});

export default PlayerSelectionScreen;

import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';

const SettingsScreen = ({ navigation }) => {
  // State to manage the selected background color
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  // State to toggle the visibility of the color picker
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

  // Function to save the selected background color to AsyncStorage
  const saveSettings = async () => {
    // Convert the color to uppercase to match hex color format
    const hexColor = backgroundColor.toUpperCase();

    // Validate if the entered color is a valid hex code
    if (!/^#[0-9A-F]{6}$/.test(hexColor)) {
      Alert.alert('Invalid Color', 'Please enter a valid hex color code.');
      return;
    }

    try {
      // Save the valid hex color to AsyncStorage
      await AsyncStorage.setItem('backgroundColor', hexColor);

      // Navigate to the Player Selection screen
      navigation.navigate('PlayerSelection');
    } catch (error) {
      // Show an error alert if saving fails
      Alert.alert('Error', 'Failed to save settings. Please try again.');
      console.error('Failed to save settings:', error);
    }
  };

  // Function to handle the color selection from the color picker
  const handleColorSelected = (color) => {
    // Convert the selected color from HSV to hex format
    const hexColor = fromHsv(color);
    
    // Update the state with the selected color
    setBackgroundColor(hexColor);
  };

  return (
    <View style={styles.container}>
      {/* Title of the Settings Screen */}
      <Text style={styles.title}>Tic-Tac-Toe</Text>

      {/* Label for the background color input field */}
      <Text style={styles.label}>Set Background Color (Use Hex Code):</Text>

      {/* Input field to manually enter the hex color code */}
      <TextInput
        style={styles.input}
        value={backgroundColor}
        onChangeText={setBackgroundColor}
        placeholder="#FFFFFF"
        placeholderTextColor="#888"
      />

      {/* Label to indicate the color picker option */}
      <Text style={styles.label}>or choose from color picker:</Text>

      {/* Button to toggle the color picker visibility */}
      <TouchableOpacity
        onPress={() => setColorPickerVisible(!isColorPickerVisible)}
        style={styles.openButton}
      >
        <Text style={styles.openButtonText}>
          {isColorPickerVisible ? 'Close Color Picker' : 'Open Color Picker'}
        </Text>
      </TouchableOpacity>

      {/* Render the color picker if the toggle state is true */}
      {isColorPickerVisible && (
        <View style={styles.colorPickerContainer}>
          <TriangleColorPicker
            onColorSelected={handleColorSelected}
            style={styles.colorBoxStyle}
          />
          <Text style={styles.colorPickerInfo}>
            Click on the color bar to confirm the color.
          </Text>
        </View>
      )}

      {/* Button to save the settings and navigate to the Player Selection screen */}
      <Button title="Continue to Player Selection" onPress={saveSettings} />
    </View>
  );
};

// Styles for the Settings Screen
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    fontSize: 18,
  },
  openButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 16,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
  },
  colorPickerContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  colorBoxStyle: {
    width: 300,
    height: 300,
  },
  colorPickerInfo: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default SettingsScreen;

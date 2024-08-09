import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';

const ColorSelect = ({ _handleModal, setSelectedColor }) => {
  // useState hook to manage the selected color value, initialized with white (#ffffff)
  const [value, setValue] = useState('#ffffff'); // Initialize with default color

  // Function to handle the color selected by the user
  const handleColorSelected = (color) => {
    // Convert the HSV color format to a hex color string
    const hexColor = fromHsv(color);
    console.log('Selected Color:', hexColor); // Debugging
    // Update the selected color value
    setValue(hexColor);
    // Pass the selected color back to the parent component
    setSelectedColor(hexColor);
  };

  return (
    // Container view with styling
    <View style={styles.container}>
      {/* Color picker component to allow user to select a color */}
      <TriangleColorPicker
        onColorSelected={handleColorSelected} // Callback for when a color is selected
        style={styles.colorBoxStyle} // Style for the color picker
      />
      {/* Button to close the modal, showing the selected color as the background */}
      <TouchableOpacity
        onPress={_handleModal} // Function to handle closing the modal
        style={[{ backgroundColor: value }, styles.closeButton]} // Dynamic background color
      >
        {/* Button text */}
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorBoxStyle: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ColorSelect;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './src/screens/SettingsScreen';
import PlayerSelectionScreen from './src/screens/PlayerSelectionScreen';
import GameScreen from './src/screens/GameScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PlayerSelection" component={PlayerSelectionScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

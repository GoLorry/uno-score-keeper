/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import StartScreen from './Screens/StartScreen';
import GameScreen from './Screens/GameScreen';
import EndScreen from './Screens/EndScreen';

export const Context = createContext();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
const Stack = createNativeStackNavigator();
const App = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [playerData, setPlayerData] = useState([
    {
      name: 'Player 1',
      score: 0,
    },
    {
      name: 'Player 2',
      score: 0,
    },
  ]);
  const [winPoints, setWinPoints] = useState(100);
  const changeNumber = (val) => {
    setNumberOfPlayers(val);
  };
  const changePlayerData = (data) => {
    setPlayerData(data);
  };
  const changeWinPOints = (val) => {
    setWinPoints(val);
  };
  return (
    <Context.Provider
      value={{
        numberOfPlayers,
        playerData,
        winPoints,
        changeNumber,
        changePlayerData,
        changeWinPoints: setWinPoints,
      }}
    >
      <PaperProvider theme = {theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Start Screen"
            component={StartScreen}
          />
          <Stack.Screen
            name="Game Screen"
            component={GameScreen}
          />
          <Stack.Screen
            name="End Screen"
            component={EndScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
      
    </Context.Provider>
  );
};

export default App;

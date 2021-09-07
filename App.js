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
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper';
import StartScreen from './Screens/StartScreen';
import GameScreen from './Screens/GameScreen';
import EndScreen from './Screens/EndScreen';

export const Context = createContext();
const Stack = createNativeStackNavigator();
const App = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [playerData, setPlayerData] = useState([
    {
      name: 'Player 1',
      score: 0,
      isEliminated: false,
    },
    {
      name: 'Player 2',
      score: 0,
      isEliminated: false,
    },
  ]);
  const [theme, setTheme] = useState(DefaultTheme);
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
  const changeTheme = (theme) => {
    setTheme(theme);
  };
  return (
    <Context.Provider
      value={{
        numberOfPlayers,
        playerData,
        winPoints,
        theme,
        changeNumber,
        changePlayerData,
        changeWinPoints: setWinPoints,
        changeTheme,
      }}
    >
      <PaperProvider theme={theme}>
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

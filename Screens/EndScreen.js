import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { Context } from '../App';

const EndScreen = ({ navigation, theme }) => {
  const state = useContext(Context);
  const winner = state.playerData[0].name;
  const { changePlayerData } = state;
  const { playerData } = state;
  const { numberOfPlayers } = state;
  const { changeNumber } = state;
  const { colors } = theme;

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
      flex: 1,
    },
    textContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
      marginTop: 50,
    },
    text: {
      fontSize: 30,
      textAlign: 'justify',
      color: colors.text,
    },
    button: {
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: colors.primary,
      marginHorizontal: 20,
      height: 50,
      alignItems: 'center',
      borderRadius: 10,
      elevation: 3,
      marginBottom: 10,

    },
    buttonText: {
      fontSize: 24,
      color: colors.text,
      paddingTop: 5,
    },
  });

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {winner}
          {' '}
          is the winner!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          changePlayerData([
            {
              name: 'Player 1',
              score: 0,
            },
            {
              name: 'Player 2',
              score: 0,
            },
          ]);
          changeNumber(2);
          navigation.navigate('Start Screen');
        }}
      >
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          playerData.forEach((part, index) => {
            playerData[index].score = 0;
            playerData[index].isEliminated = false
          });
          playerData.sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
          changePlayerData(playerData);

          navigation.navigate('Game Screen');
        }}
      >
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>

    </View>
  );
};

export default withTheme(EndScreen);

import { ContentWriter } from 'istanbul-lib-report';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  DefaultTheme, withTheme, DarkTheme, TextInput, Button,
} from 'react-native-paper';
import { Context } from '../App';

const StartScreen = (props) => {
  const { colors } = props.theme;
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    headingContainer: {
      alignItems: 'center',
      height: '20%',
      paddingTop: 15,
      zIndex: 1,
    },
    heading: {
      fontFamily: 'inter',
      fontSize: 25,
      color: colors.text,
    },
    detailsContainer: {
      flex: 1,
      marginBottom: 0,
    },
    text: {
      fontSize: 14,
      color: colors.text,
    },
    input: {
      width: 50,
      height: 30,
      fontSize: 12,
      paddingTop: 5,
      color: colors.placeholder,
    },
    startGameButton: {
      backgroundColor: colors.primary,
      height: 35,
      marginHorizontal: 10,
      borderRadius: 15,
      alignItems: 'center',
    },
    buttonText: {
      color: colors.text,
      marginTop: 5,
      fontSize: 16,
    },
    playerText: {
      color: colors.text,
      marginHorizontal: 20,
    },
    playerInput: {
      borderBottomColor: colors.text,
      borderBottomWidth: 0.4,
      width: '80%',
      paddingTop: 4,
      fontSize: 14,
      color: colors.placeholder,
      marginHorizontal: 20,
    },
    playerCard: {
      marginTop: 5,
      marginBottom: 15,
    },
    settingsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: 12,
    },
    list: {
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 15,
      marginHorizontal: 30,
    },
    addButton: {
      backgroundColor: colors.primary,
      height: 30,
      width: 10,
      padding: 5,
      alignItems: 'center',
    },
    removeButton: {
      backgroundColor: colors.primary,
      height: 30,
      width: 30,
      alignItems: 'center',
    },
    addRemoveButtonText: {
      fontSize: 20,
    },
    addPlayerCard: {
      paddingTop: 10,
    },
    addplayerInput: {
      borderBottomColor: colors.primary,
      borderBottomWidth: 0.4,
      marginBottom: 5,
      width: '80%',
      marginHorizontal: 20,
    },

  });
  const state = useContext(Context);
  const { playerData } = state;
  const { changePlayerData } = state;
  const { changeNumber } = state;
  const { numberOfPlayers } = state;
  const { changeWinPoints } = state;
  const { theme, changeTheme } = state;
  const [isAdding, setIsAdding] = useState(false);
  const [newPlayer, setNewPlayer] = useState('');
  console.log('int', numberOfPlayers);
  const renderPlayerInput = (itemData) => {
    const playerIndex = itemData.index;
    const playerName = itemData.item.name;

    const label = `Enter Player ${itemData.index + 1} name`;
    return (
      <View style={styles.playerCard}>
        <TextInput
          mode="outlined"
          label={label}
          right={<TextInput.Affix text="/100" />}
          onblur={() => {

          }}
          onChangeText={(input) => {
            playerData.forEach((part, index, playerData) => {
              if (playerIndex === index) {
                playerData[index].name = input;
              }
              changePlayerData(playerData);
            });
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.screen}>

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Uno Score Keeper</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View>
          <Text style={styles.text}>Number of players</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            maxLength={10}
            onChangeText={(input) => {
              const num = parseInt(input);
              if (input.length == 0) {
                return;
              }
              if (input === '1') {
                return;
              }
              if (num > numberOfPlayers) {
                while (num > playerData.length) {
                  const playerName = `Player ${playerData.length + 1}`;
                  playerData.push({
                    name: playerName,
                    score: 0,
                    isEliminated: false,
                  });
                }
                changeNumber(num);
                changePlayerData(playerData);
              } else if (num < playerData.length) {
                while (playerData.length > num) {
                  playerData.pop();
                }
              }
              changeNumber(num);
              setNumString(toString(num));
              changePlayerData(playerData);
            }}
          />
        </View>
        <View>
          <Text style={styles.text}>Points to win</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            placeholder="2"
            keyboardType="number-pad"
            maxLength={3}
            defaultValue="100"
            onChangeText={(input) => {
              changeWinPoints(input);
            }}
          />
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={playerData}
        renderItem={renderPlayerInput}
      />
      {isAdding && (
      <View style={styles.addPlayerCard}>
        <Text style={styles.playerText}>
          Enter new player name:
        </Text>
        <TextInput
          style={styles.addplayerInput}
          onChangeText={(input) => {
            setNewPlayer(input);
          }}
        />
      </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="account-plus"
          title="+"
          onPress={() => {
            const newData = playerData.slice();
            const playerName = `Player ${numberOfPlayers + 1}`;
            changeNumber(numberOfPlayers + 1);
            newData.push({
              name: playerName,
              score: 0,
              isEliminated: false,
            });
            changePlayerData(newData);
          }}
        />
        <Button
          mode="contained"
          icon="theme-light-dark"
          onPress={() => {
            if (theme === DefaultTheme) changeTheme(DarkTheme);
            else changeTheme(DefaultTheme);
          }}
        />
        <Button
          mode="contained"
          icon="account-minus"
          title="+"
          onPress={() => {
            const newData = playerData.slice();
            changeNumber(numberOfPlayers - 1);
            newData.pop();
            changePlayerData(newData);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.startGameButton}
        onPress={() => props.navigation.navigate('Game Screen')}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withTheme(StartScreen);

import {ContentWriter} from 'istanbul-lib-report';
import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Context} from '../App';
const StartScreen = () => {
  const state = useContext(Context);
  const playerData = state.playerData;
  const changePlayerData = state.changePlayerData;
  const changeNumber = state.changeNumber;
  const numberOfPlayers = state.numberOfPlayers;

  const renderPlayerInput = itemData => {
    const playerIndex = itemData.index;
    const playerName = itemData.item.name;
    return (
      <View style={styles.playerCard}>
        <Text style={styles.playerText}>Player {playerIndex + 1} name:</Text>
        <TextInput
          style={styles.playerInput}
          defaultValue={itemData.item.name}
          onChangeText={input => {
            console.log('fired');

            playerData.forEach(function (part, index, theArray) {
              if (playerIndex === index) {
                theArray[index].name = input;
              }
              changePlayerData(theArray);
            });
            console.log(playerName);
            console.log(playerData);
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
      <View style={styles.detailsContainer}>
        <View style={styles.settingsContainer}>
          <View>
            <Text style={styles.text}>Number of players</Text>
            <TextInput
              style={styles.input}
              defaultValue="2"
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={input => {
                const num = parseInt(input);
                if (input.length == 0) {
                  return;
                }
                if (input === '1') {
                  return;
                }
                if (num > numberOfPlayers) {
                  console.log(toString(playerData.length));
                  while (num > playerData.length) {
                    console.log(playerData.length);
                    var playerName = 'Player ' + (playerData.length + 1);
                    playerData.push({
                      name: playerName,
                      score: 0,
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
                changePlayerData(playerData);
              }}
            />
          </View>
          <View>
            <Text style={styles.text}>Points to win</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={3}
              defaultValue="100"
            />
          </View>
        </View>
        <View style={styles.nameContainer} />
        <View style={styles.optionsContainer} />
      </View>
      <FlatList data={playerData} renderItem={renderPlayerInput} />
      <TouchableOpacity style={styles.startGameButton}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#19193C',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headingContainer: {
    alignItems: 'center',
    height: '20%',
    paddingTop: 33,
  },
  heading: {
    fontFamily: 'inter',
    fontSize: 25,
    color: 'white',
  },
  detailsContainer: {},
  text: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.4,
    width: '40%',
    height: 30,
    fontSize: 12,
    paddingTop: 5,
    color: 'white',
  },
  startGameButton: {
    backgroundColor: 'white',
    height: 35,
    marginHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#2ECC71',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  playerText: {
    color: 'white',
    marginHorizontal: 20,
  },
  playerInput: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.4,
    width: '80%',
    paddingTop: 4,
    fontSize: 14,
    color: '#c0cfc4',
    marginHorizontal: 20,
  },
  playerCard: {
    marginTop: 15,
    marginBottom: 15,
  },
  settingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
export default StartScreen;

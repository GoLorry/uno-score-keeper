import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import { Context } from '../App';
import { withTheme } from 'react-native-paper';
if (
  Platform.OS === 'android'
    && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const PlayerCard = (props) => {
  const {colors} = props.theme
  styles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginVertical: 12,
      height: 110,
      borderRadius: 5,
      elevation: 2,
    },
    buttonsContainer: {
      flex: 3,
      //   backgroundColor : 'blue'
    },
    incrementButtonsContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingTop: 10,
      marginRight: 10,
      height: '60%',
    },
    detailsContainer: {
      flex: 1,
      paddingHorizontal: 30,
      paddingVertical: 30,
      alignItems: 'center',
    },
    button: {
      borderRadius: 10,
      backgroundColor: colors.primary,
      marginBottom: 10,
      marginHorizontal: 5,
      width: 40,
      paddingTop: 10,
      alignItems: 'center',
      elevation: 3,
    },
    buttonText: {
      color: colors.text,
      paddingBottom: 10,
    },
    nameText: {
      fontSize: 14,
    },
    scoreText: {
      fontSize: 25,
      fontWeight: '700',
    },
    customIncrementContainer: {
      // backgroundColor: 'green',
      height: 60,
      paddingBottom: 20,
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: 40,
    },
    input: {
      borderBottomColor: 'black',
      borderBottomWidth: 0.5,
      width: 30,
    },
    customIncrementButton: {
      backgroundColor: colors.accent,
      width: 30,
      height: 30,
      marginLeft: 20,
      padding: 5,
      alignItems: 'center',
      borderRadius: 15,
      elevation: 3,
    },
    customButtonText: {
      color: colors.text,
    },
  });
  const state = useContext(Context);
  const { playerData } = state;
  const currPlayerState = playerData.slice();
  const { changePlayerData } = state;
  const { winPoints } = state;
  const incrementScore = (val) => {
    currPlayerState.forEach((part, index, currPlayerState) => {
      if (currPlayerState[index].name === props.name) {
        currPlayerState[index].score = val + parseInt(currPlayerState[index].score);
        if (playerData[0].score >= winPoints) {
          props.navigation.navigate('End Screen');
          return;
        }
        currPlayerState.sort((a, b) => ((a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0)));
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        changePlayerData(currPlayerState);
      }
    });
  };
  const [customIncrement, setCustomIncrement] = useState(0);
  return (

    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>{props.name}</Text>
        <Text style={styles.scoreText}>{props.score}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.incrementButtonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={incrementScore.bind(this, 1)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>+1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={incrementScore.bind(this, 10)}
          >
            <Text style={styles.buttonText}>+10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={incrementScore.bind(this, 50)}
          >
            <Text style={styles.buttonText}>+50</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.customIncrementContainer}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={(input) => {
              setCustomIncrement(parseInt(input));
            }}
          />
          <TouchableOpacity
            onPress={incrementScore.bind(this, customIncrement)}
            style={styles.customIncrementButton}
          >
            <Text style={styles.customButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



export default withTheme(PlayerCard);

import React from 'react'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native'

const StartScreen = () => {
    return (
        <View style = {styles.screen}>
            <View style = {styles.headingContainer}>
                <Text style = {styles.heading}>Uno Score Keeper</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.settingsContainer}>
                    <Text style = {styles.text}>Number of players</Text>
                    <TextInput style = {styles.input}>

                    </TextInput>
                    <Text style = {styles.text}>Points to win</Text>
                    <TextInput style = {styles.input}>
                        
                    </TextInput>
                </View>
                <View style = {styles.nameContainer}>

                </View>
                <View style = {styles.optionsContainer}>

                </View>
            </View>
            <Button style ={styles.startGameButton} title = 'Start Game'>

            </Button>
        </View>
        
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor : '#2ECC71'
    },
    headingContainer: {
        alignItems: 'center',
        height: '20%',
        paddingTop: 33
    },
    heading: {
        fontFamily: 'inter',
        fontSize: 25,
        color: 'white'
    },
    detailsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    text: {
        fontSize: 14,
        color: 'white',
        
    },
    input: {
        borderBottomColor: 'white',
        borderBottomWidth: .4,
        width: '20%',
        height: 30,
        fontSize: 12,
        paddingTop: 5,
    }
})
export default StartScreen
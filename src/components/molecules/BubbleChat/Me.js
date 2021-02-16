import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const Me = ({message, date}) => {
    return (
        <View style={styles.messages}>
            <Text style={styles.messageText}>{message}</Text>
            <Text style={styles.timestamp}>{date}</Text>
        </View>
    )
}

export default Me;

const styles = StyleSheet.create({
    messages: {
        maxWidth: '80%',
        minWidth: '10%',
        alignSelf: 'flex-end',
        backgroundColor: colors.background.secondary,
        borderRadius: 8,
        marginRight: 10,
        padding: 10,
        paddingBottom: 18,
        marginBottom: 15,
    },
    messageText: {
        fontSize: 14,
        color: colors.text.white2,
        fontFamily: fonts.primary[400]
    },
    timestamp: {
        fontSize: 9,
        fontFamily: fonts.primary[300],
        color: colors.text.white2,
        position: 'absolute',
        bottom: 4,
        right: 4,
    }
})

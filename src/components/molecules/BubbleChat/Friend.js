import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const Friend = ({photo, message, onLongPress, date}) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: photo}} style={styles.profile} />
            <TouchableOpacity style={styles.messages} onLongPress={onLongPress}>
                <Text style={styles.messageText}>{message}</Text>
                <Text style={styles.timestamp}>{date}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Friend;

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        marginRight: 10,
    },
    messages: {
        borderRadius: 8,
        backgroundColor: colors.background.blue,
        padding: 10,
        paddingBottom: 18,
        maxWidth: '80%',
        minWidth: '13%',
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

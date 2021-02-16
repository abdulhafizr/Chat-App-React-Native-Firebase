import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';
import { Avatar } from '../../../assets';

const Friend = ({photo, message, date}) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: photo}} style={styles.profile} />
            <View style={styles.messages}>
                <Text style={styles.messageText}>{message}</Text>
                <Text style={styles.timestamp}>{date}</Text>
            </View>
        </View>
    )
}

export default Friend;

const styles = StyleSheet.create({
    container: {
        maxWidth: '75%',
        marginLeft: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    messageText: {
        fontSize: 14,
        color: colors.text.white2,
        fontFamily: fonts.primary[400]
    },
    timestamp: {
        fontSize: 10,
        fontFamily: fonts.primary[300],
        color: colors.text.white2,
        position: 'relative',
        textAlign: 'right',
        marginTop: 4,
    }
})

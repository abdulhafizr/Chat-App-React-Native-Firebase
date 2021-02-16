import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';
import { Avatar } from '../../../assets';
import { Icon } from '../../atoms';

const HeaderChat = ({name, photo, onPress}) => {
    return (
        <View style={styles.container}>
            <Icon type="back-arrow-ic" onPress={onPress} />
            <Text style={styles.name}>{name}</Text>
            <Image source={{uri: photo}} style={styles.profile} />
        </View>
    )
}

export default HeaderChat;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 24,
        height: 77,
        backgroundColor: colors.background.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    name: {
        flex: 1,
        marginLeft: 26,
        fontSize: 16,
        fontFamily: fonts.primary[400],
        color: colors.text.white2,
        alignContent: 'center',
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
    },
})

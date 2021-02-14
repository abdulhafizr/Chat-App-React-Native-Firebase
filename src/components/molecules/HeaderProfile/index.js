import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, fonts } from '../../../utils';

const HeaderProfile = ({name, profession, photo}) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: photo}} style={styles.profile} />
            <View style={styles.caption}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.profession}>{profession}</Text>
            </View>
        </View>
    )
}

export default HeaderProfile;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        width: 85,
        height: 85,
        borderRadius: 85 / 2,
        overflow: 'hidden',
    },
    caption: {
        marginTop: 20,
    },
    name: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: colors.text.white2,
        textAlign: 'center',
    },
    profession: {
        fontSize: 14,
        fontFamily: fonts.primary[400],
        color: colors.text.white3,
        textAlign: 'center',
        marginTop: 2,
    },
})

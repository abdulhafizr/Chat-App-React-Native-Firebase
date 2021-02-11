import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Avatar, ICEditProfile } from '../../../assets';
import { colors } from '../../../utils';

const AvatarEdit = ({style, onPress}) => {
    return (
        <View style={{...styles.container, ...style}}>
            <Image source={Avatar} style={styles.profile} />
            <TouchableOpacity style={styles.btnEdit} onPress={onPress}>
                <ICEditProfile />
            </TouchableOpacity>
        </View>
    )
}

export default AvatarEdit;

const styles = StyleSheet.create({
    container: {

    },
    profile: {
        width: 85,
        height: 85,
        borderRadius: 85 / 2,
    },
    btnEdit: {
        width: 24,
        height: 24,
        backgroundColor: colors.background.secondary,
        borderRadius: 24 / 2,
        elevation: 1,
        position: 'absolute',
        bottom: 3,
        right: 3,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

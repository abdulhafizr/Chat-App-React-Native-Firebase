import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../utils';

const Button = ({onPress, label}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    container: {
        height: 44,
        backgroundColor: colors.background.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.text.white3,
        borderWidth: 0.3,
        borderRadius: 8,
    },
    label: {
        fontFamily: fonts.primary[600],
        fontSize: 16,
        color: colors.text.white3,
    }
})

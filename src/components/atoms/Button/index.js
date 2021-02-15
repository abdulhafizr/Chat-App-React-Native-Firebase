import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const Button = ({onPress, label, isDisable, isLoading}) => {
    if(isDisable) {
        return (
            <View style={styles.container_disabled}>
                {
                    isLoading ? (
                        <ActivityIndicator size="small" color={colors.text.white3} />
                        ) : (
                        <Text style={styles.label_disabled}>{label}</Text>
                    )
                }
            </View>
        )
    }
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
        borderColor: colors.background.primary,
        borderWidth: 0.3,
        borderRadius: 8,
    },
    label: {
        fontFamily: fonts.primary[600],
        fontSize: 16,
        color: colors.text.white3,
    },
    container_disabled: {
        height: 44,
        backgroundColor: colors.background.disabled,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.border.disable,
        borderWidth: 0.3,
        borderRadius: 8,
    },
    label_disabled: {
        fontFamily: fonts.primary[600],
        fontSize: 16,
        color: colors.text.secondary,
    },
})

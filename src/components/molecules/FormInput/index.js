import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const FormInput = ({label, onChangeText, value}) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                placeholder="Search..." 
                placeholderTextColor ={colors.text.white3}
                onChangeText={(value) => onChangeText(value)} style={styles.FormInput} 
                value={value}
            />
        </View>
    )
}

export default FormInput;

const styles = StyleSheet.create({
    FormInput: {
        height: 44,
        borderColor: colors.border.primary,
        borderWidth: 1,
        padding: 11,
        color: colors.text.white2,
        fontSize: 16,
        fontFamily: fonts.primary[400],
        borderRadius: 8,
        backgroundColor: colors.background.primary,
        
    },
    label: {
        fontSize: 12,
        fontFamily: fonts.primary[300],
        color: colors.text.white3,
    }
})

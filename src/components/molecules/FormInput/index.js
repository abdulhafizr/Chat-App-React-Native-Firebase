import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const FormInput = ({label, onChangeText, value, isDisable}) => {
    return (
        <View>
            <Text style={styles.label(isDisable)}>{label}</Text>
            <TextInput 
                placeholder={label} 
                placeholderTextColor ={colors.text.white3}
                onChangeText={(value) => onChangeText(value)} 
                value={value}
                editable={!isDisable}
                selectTextOnFocus={!isDisable}
                style={styles.FormInput(isDisable)} 
            />
        </View>
    )
}

export default FormInput;

const styles = StyleSheet.create({
    FormInput: (isDisable) => (
        {
            height: 44,
            borderColor: colors.border.primary,
            borderWidth: 1,
            padding: 11,
            color: isDisable ? colors.text.primary : colors.text.white2,
            fontSize: 16,
            fontFamily: fonts.primary[400],
            borderRadius: 8,
            backgroundColor: isDisable ? colors.background.secondary : colors.background.primary,
            
        }
    ),
    label: (isDisable) => (
        {
            fontSize: 12,
            fontFamily: fonts.primary[300],
            color: isDisable ? colors.text.secondary : colors.text.white3,
        }
    ),
})

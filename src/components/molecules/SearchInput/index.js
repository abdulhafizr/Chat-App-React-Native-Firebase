import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { colors, fonts } from '../../../utils';

const SearchInput = ({onChangeText}) => {
    return (
        <TextInput 
            placeholder="Search..." 
            placeholderTextColor ={colors.text.secondary}
            style={styles.SearchInput} 
            onChangeText={(value) => onChangeText(value)} 
        />
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    SearchInput: {
        height: 44,
        borderColor: colors.border.primary,
        borderWidth: 1,
        padding: 11,
        color: colors.text.white2,
        fontSize: 16,
        fontFamily: fonts.primary[400],
        borderRadius: 8,
        marginTop: 2,
    }
})

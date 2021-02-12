import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, fonts } from '../../../utils';
import { Icon } from '../../atoms';

const InputChat = () => {
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Write message..."
                placeholderTextColor={colors.text.secondary}
                style={styles.formInput}
            />
            <Icon type='send-ic' style={{marginBottom: 8}} />
        </View>
    )
}

export default InputChat;

const styles = StyleSheet.create({
    container: {
        height: 55,
        backgroundColor: colors.background.primary,
        borderTopColor: colors.border.primary,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    formInput: {
        fontSize: 16,
        fontFamily: fonts.primary[400],
        color: colors.text.white1,
    }
})

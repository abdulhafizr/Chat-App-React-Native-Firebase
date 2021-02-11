import { StyleSheet } from 'react-native';
import { fonts, colors } from '../../utils';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    card: {
        paddingVertical: 50,
        backgroundColor: colors.background.secondary,
        width: '100%',
        elevation: 2,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.text.white1,
        fontFamily: fonts.primary[600],
    },
    icWrapper: {
        marginTop: 15,
        alignSelf: 'center',
    }
})

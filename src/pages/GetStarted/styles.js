import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

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
        elevation: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.text.white1,
    },
    icWrapper: {
        marginTop: 15,
        alignSelf: 'center',
    }
})

import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        paddingTop: 25,
        paddingBottom: 18,
        alignItems: 'flex-end',
        paddingHorizontal: 16,
    },
    messagesTitle: {
        fontSize: 16,
        color: colors.text.white,
        fontFamily: fonts.primary[600],
        paddingVertical: 10,
    },
    contactWrapper: {
        paddingHorizontal: 16,
    },
})

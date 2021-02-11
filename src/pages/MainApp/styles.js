import { StyleSheet } from 'react-native';
import { colors } from '../../utils';

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
        paddingHorizontal: 16,
    },
    chatHistoryWrapper: {
        marginTop: 15,
        paddingHorizontal: 16,
    },
})

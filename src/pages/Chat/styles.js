import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
        paddingHorizontal: 12,
    },
    header: {
        paddingTop: 25,
    },
    messagesTitle: {
        fontSize: 16,
        color: colors.text.white,
        fontFamily: fonts.primary[600],
        marginBottom: 15,
    },
    ic_profile: {
        alignSelf: 'flex-end',
        marginRight: 2,
    }
})

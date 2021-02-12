import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatBody: {
        flex: 1,
        backgroundColor: colors.background.primary,
        borderColor: colors.border.primary,
        borderWidth: 1,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginTop: -8,
    },
    chatContent: {
        flex: 1,
    },
    timestamp: {
        fontSize: 12,
        textAlign: 'center',
        marginVertical: 8,
        color: colors.text.white2,
        fontFamily: fonts.primary[300],
    }
})

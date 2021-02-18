import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../utils';

export const styles = StyleSheet.create({
    container: {
        padding: 13,
        borderColor: colors.border.primary,
        borderWidth: 1,
        borderRadius: 4,
        overflow: 'hidden',
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: (48 / 2),
        marginRight: 15,
    },
    caption: {
        flex: 1,
    },
    name: {
        fontSize: 14,
        color: colors.text.white,
        fontFamily: fonts.primary[400],
    },
    job: {
        fontSize: 10,
        color: colors.text.white3,
        fontFamily: fonts.primary[300],
    },
    messageWrapper: {
        marginTop: 5,
    },
    message: {
        fontSize: 14,
        color: colors.text.white2,
        fontFamily: fonts.primary[400],
    },
})

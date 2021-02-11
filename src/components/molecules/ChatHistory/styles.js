import { StyleSheet } from 'react-native';
import { colors } from '../../../utils';

export const styles = StyleSheet.create({
    container: {
        padding: 13,
        borderColor: colors.border.primary,
        borderWidth: 1,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
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
    name: {
        fontSize: 14,
        color: colors.text.white,
    },
    job: {
        fontSize: 12,
        color: colors.text.white3,
    },
    messageWrapper: {
        marginTop: 5,
    },
    message: {
        fontSize: 12,
        color: colors.text.white2
    },
})

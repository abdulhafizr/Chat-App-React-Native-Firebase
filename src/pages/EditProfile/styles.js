import { StyleSheet } from 'react-native';
import { colors } from '../../utils';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.secondary,
        zIndex: 99
    },
    content: {
        zIndex: 99,
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 25,
    },
    overlay: {
        height: 720,
        width: 391,
        position: 'absolute',
        backgroundColor: colors.background.primary,
        top: -200,
        left: 100
    },
    avatarEdit: {
        marginVertical: 56,
        alignSelf: 'center',
    },
})

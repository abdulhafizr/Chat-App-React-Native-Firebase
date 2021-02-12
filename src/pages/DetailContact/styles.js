import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        height: 293,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: colors.background.primary,
        marginBottom: -30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        height: 100,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: colors.background.secondary,
        top: 0,
        zIndex: -99,
        paddingTop: 30,
        paddingHorizontal: 118,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconWrapper1: {
        height: 45,
        width: 45,
        borderRadius: (45 / 2),
        backgroundColor: colors.background.primary,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper2: {
        height: 45,
        width: 45,
        borderRadius: (45 / 2),
        backgroundColor: colors.background.primary,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBack: {
        position: 'absolute',
        top: 25,
        left: 16,
    }
})

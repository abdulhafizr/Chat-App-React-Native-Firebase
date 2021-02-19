import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        paddingTop: 25,
    },
    messagesTitle: {
        fontSize: 16,
        color: colors.text.white,
        fontFamily: fonts.primary[600],
        marginVertical: 10,
    },
    contactWrapper: {
        paddingHorizontal: 12,
    },
    ic_addContact: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    actionSheet: {
        backgroundColor: colors.background.secondary
    },
    buttomSheet: {
        maxHeight: '35%',
        backgroundColor: colors.background.secondary,
        paddingTop: 0,
    },
    buttomSheetText: {
        fontSize: 15,
        padding: 10,
        color: colors.text.white1,
        borderColor: colors.border.disable,
        borderWidth: 1,
    }
})

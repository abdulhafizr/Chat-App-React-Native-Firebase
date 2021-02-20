import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        paddingTop: 25,
        paddingBottom: 0,
        paddingHorizontal: 12,
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
        backgroundColor: colors.background.primary,
        paddingTop: 0,
    },
    buttomSheetText: {
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 20,
        color: colors.text.white1,
        borderBottomColor: colors.border.primary,
        borderBottomWidth: 1
    },
})

import React from 'react';
import { StyleSheet } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from '../../../utils';

const Alert = ({showAlert, alertLabel, alertTitle, alertMessage, cancelAction, confirmAction}) => {
    return (
        <AwesomeAlert 
            show={showAlert}
            title={alertTitle}
            message={alertMessage}
            showConfirmButton={true}
            showCancelButton={true}
            confirmText={alertLabel}
            cancelText="Cancel"

            onCancelPressed={cancelAction}
            onConfirmPressed={confirmAction}

            closeOnTouchOutside
            closeOnHardwareBackPress
            titleStyle={styles.titleStyle}
            messageStyle={styles.messageStyle}
            confirmButtonStyle={styles.confirmButtonStyle}
            cancelButtonStyle={styles.cancelButtonStyle}
            contentContainerStyle={styles.contentContainerStyle}
            actionContainerStyle={styles.actionContainerStyle}
            confirmButtonTextStyle={styles.confirmButtonTextStyle}
            cancelButtonTextStyle={styles.cancelButtonTextStyle}
            overlayStyle={styles.overlayStyle}
        />
    )
}

export default Alert;

const styles = StyleSheet.create({
    titleStyle: {
        color: colors.text.white2,
        paddingLeft: 0,
        paddingVertical: 10,
        fontSize: 19,
        alignSelf: 'flex-start',
    },
    messageStyle: {
        color: colors.text.white3,
    },
    confirmButtonStyle: {
        backgroundColor: colors.background.error,
        borderRadius: 2,
    },
    cancelButtonStyle: {
        backgroundColor: colors.background.blue,
        borderRadius: 2,
    },
    contentContainerStyle: {
        backgroundColor: colors.background.secondary,
        borderRadius: 4,
        maxWidth: '93.5%'
    },
    actionContainerStyle: {
        justifyContent: 'flex-start'
    },
    confirmButtonTextStyle: {
        fontSize: 14
    },
    cancelButtonTextStyle: {
        fontSize: 14
    },
    overlayStyle: {
        backgroundColor: 'rgba(0,0,0,.55)', 
        height: '100%'
    },
})

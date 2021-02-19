import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { firebase } from '../../config';
import { colors, fonts } from '../../utils';

const Splash = ({navigation}) => {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '226198834600-r314gdlmqa9o7vrcl9k2o9cf08mn53vs.apps.googleusercontent.com',
            offlineAccess: false,
        })
        const subscribe = firebase.auth().onAuthStateChanged((user) => {
            setTimeout(() => {
                if(user) {
                    navigation.replace('MainApp');
                }else{
                    navigation.replace('GetStarted');
                }
            }, 500)
        })
        return () => subscribe();
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Text style={styles.brand}>AHR Chat</Text>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brand: {
        color: colors.text.white2,
        fontFamily: fonts.primary[600],
        fontSize: 20,
    }
})

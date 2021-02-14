import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { Icon } from '../../components';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { styles } from './styles';

const GetStarted = ({navigation}) => {
    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '226198834600-r314gdlmqa9o7vrcl9k2o9cf08mn53vs.apps.googleusercontent.com',
            offlineAccess: false,
        })
    })
    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUser(userInfo);
            console.log(userInfo);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              console.log(error);
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>LOGIN WITH GOOGLE</Text>
                <View style={styles.icWrapper}>
                    <Icon type="google-ic" onPress={signInWithGoogle} />
                </View>
            </View>
            <View style={styles.bgTop}></View>
            <View style={styles.bgBottom} />
        </View>
    )
}

export default GetStarted;

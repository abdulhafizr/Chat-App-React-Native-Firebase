import React, {useEffect, useState} from 'react';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { Text, View } from 'react-native';
import { Icon } from '../../components';
import { successMessage, errorMessage } from '../../utils';
import { firebase } from '../../config';
import { styles } from './styles';

const GetStarted = ({navigation}) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '226198834600-r314gdlmqa9o7vrcl9k2o9cf08mn53vs.apps.googleusercontent.com',
            offlineAccess: false,
        })
    })
    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            
            // Create a Google credential with the token
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
            
            firebase.auth().signInWithCredential(googleCredential)
                .then((response) => {
                    const data = {
                        uid: response.user.uid,
                        name: response.user.displayName, 
                        email: response.user.email,
                        photo: response.user.photoURL,
                    }
                    
                    firebase.database().ref(`users/${data.uid}`)
                        .set(data);
                    
                    successMessage("Signin with google success");  
                    
                    navigation.navigate("MainApp");   
                })
            
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              errorMessage("user cancelled the login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
              errorMessage("operation (e.g. sign in) is in progress already")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              errorMessage("play services not available or outdated")
            } else {
              errorMessage(error);
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

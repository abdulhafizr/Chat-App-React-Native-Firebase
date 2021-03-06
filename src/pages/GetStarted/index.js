import React, {useState} from 'react';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Icon } from '../../components';
import { successMessage, errorMessage } from '../../utils';
import { storeData } from '../../config';
import { styles } from './styles';

const GetStarted = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);

    const signInWithGoogle = async () => {
        setIsLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            
            auth().signInWithCredential(googleCredential)
            .then(async (response) => {
                const data = {
                    uid: response.user.uid,
                    name: response.user.displayName, 
                    email: response.user.email,
                    photo: response.user.photoURL,
                    profession: 'No Profession',
                }
                database().ref(`users/${response.user.uid}`).once('value')
                .then((userResponse) => {
                    if(!userResponse.val()) {
                        storeData('user', data);
                        database().ref(`users/${data.uid}`).set(data);
                    }else{
                        storeData('user', userResponse);
                    }

                    setIsLoading(false);
                    successMessage("Signin with google success");  
                    navigation.replace("MainApp");   
                })
            })
            .catch((error) => {
                setIsLoading(false);
                successMessage(error.message);
            })
            
          } catch (error) {
            setIsLoading(false);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              errorMessage("User cancelled the login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
              errorMessage("Operation (e.g. sign in) is in progress already")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              errorMessage("Google play services not available or outdated")
            } else {
              errorMessage(error.message);
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>LOGIN WITH GOOGLE</Text>
                <View style={styles.icWrapper}>
                    <Icon type="google-ic" onPress={signInWithGoogle} isLoading={isLoading} sizeIndicator="large" />
                </View>
            </View>
            <View style={styles.bgTop}></View>
            <View style={styles.bgBottom} />
        </View>
    )
}

export default GetStarted;

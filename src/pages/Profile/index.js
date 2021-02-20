import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Alert, HeaderProfile, Icon } from '../../components';
import { GoogleSignin } from '@react-native-community/google-signin';
import { firebase, getData } from '../../config';
import { errorMessage, successMessage } from '../../utils';
import { styles } from './styles';

const Profile = ({navigation}) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [launchSignoutDialog, setLaunchSignoutDialog] = useState(false);

    useEffect(() => {
        getData('user').then((response) => {
            setUser(response);
        })
    }, [])

    const _toggleSignoutDialog = () => {
        setLaunchSignoutDialog(!launchSignoutDialog);
    }
    const _signOut = async () => {
        _toggleSignoutDialog();
        setIsLoading(true);
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            firebase.auth().signOut().then(() => {
                successMessage('Signout success');
                navigation.replace('GetStarted');
                setIsLoading(false);
            })
            .catch((error) => {
                errorMessage(error.message);
                setIsLoading(false);
            })
        } catch (error) {
            errorMessage(error.message);
            setIsLoading(false);
        }
    }
    const _editProfile = () => {
        navigation.navigate('EditProfile', user);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    {
                        user.name !== undefined && (
                            <HeaderProfile 
                                name={user.name}
                                profession={user.profession}
                                photo={user.photo}
                            />
                        )
                    }
                </View>
                <View style={styles.main}>
                    <TouchableOpacity onPress={_editProfile} style={styles.iconWrapper1}>
                        <Icon type="edit-profile-ic" iconOnly />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={_toggleSignoutDialog} style={styles.iconWrapper1}>
                        <Icon type="signout-ic" isLoading={isLoading} iconOnly />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Alert 
                showAlert={launchSignoutDialog}
                alertTitle={`Are you wanna to sign out?`}
                alertMessage={`If you sign out, you will need to log in again to access your account`}
                alertLabel="Sign out"
                cancelAction={_toggleSignoutDialog}
                confirmAction={_signOut}
            />
        </View>
    )
}

export default Profile;

import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { HeaderProfile, Icon } from '../../components';
import { GoogleSignin } from '@react-native-community/google-signin';
import { firebase, getData } from '../../config';
import { errorMessage, successMessage } from '../../utils';
import { styles } from './styles';

const Profile = ({navigation}) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData('user').then((response) => {
            setUser(response);
        })
    }, [])
    const signOut = async () => {
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
    const editProfile = () => {
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
                    <View style={styles.iconWrapper1}>
                        <Icon type="edit-profile-ic" onPress={editProfile} />
                    </View>
                    <View style={styles.iconWrapper1}>
                        <Icon type="signout-ic" onPress={signOut} isLoading={isLoading} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Profile;

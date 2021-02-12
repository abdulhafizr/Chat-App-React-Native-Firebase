import React from 'react';
import { ScrollView, View } from 'react-native';
import { HeaderProfile, Icon } from '../../components';
import { styles } from './styles';

const Profile = ({navigation}) => {
    const editProfile = () => {
        navigation.navigate('EditProfile');
    }
    const signOut = () => {
        navigation.replace('GetStarted');
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <HeaderProfile />
                </View>
                <View style={styles.main}>
                    <View style={styles.iconWrapper1}>
                        <Icon type="edit-profile-ic" onPress={editProfile} />
                    </View>
                    <View style={styles.iconWrapper1}>
                        <Icon type="signout-ic" onPress={signOut} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Profile;

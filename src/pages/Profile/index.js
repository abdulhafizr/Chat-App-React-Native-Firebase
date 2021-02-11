import React from 'react';
import { View } from 'react-native';
import { HeaderProfile, Icon } from '../../components';
import { styles } from './styles';

const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderProfile />
            </View>
            <View style={styles.main}>
                <View style={styles.iconWrapper1}>
                    <Icon type="edit-profile-ic" />
                </View>
                <View style={styles.iconWrapper1}>
                    <Icon type="signout-ic" />
                </View>
            </View>
        </View>
    )
}

export default Profile;

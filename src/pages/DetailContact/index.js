import React from 'react';
import { ScrollView, View } from 'react-native';
import { HeaderProfile, Icon } from '../../components';
import { styles } from './styles';

const DetailContact = ({navigation}) => {
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
                    <Icon type="back-arrow-ic" onPress={() => navigation.goBack()} style={styles.iconBack} />
                    <HeaderProfile />
                </View>
                <View style={styles.main}>
                    <View style={styles.iconWrapper1}>
                        <Icon type="message-ic" onPress={editProfile} />
                    </View>
                    <View style={styles.iconWrapper1}>
                        <Icon type="add-ic" onPress={signOut} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailContact;

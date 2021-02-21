import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import { ScrollView, View } from 'react-native';
import { Button, Gap, Icon, AvatarEdit, FormInput } from '../../components';
import { errorMessage, successMessage } from '../../utils';
import { launchImageLibrary } from 'react-native-image-picker';
import { storeData } from '../../config';
import { styles } from './styles';

const EditProfile = ({navigation, route}) => {
    const [disableButton, setDisableButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [disableForm, setDisableForm] = useState(false);
    const [user, setUser] = useState(route.params);

    const pickImage = () => {
        launchImageLibrary({mediaType: 'photo', maxWidth: 30, includeBase64: true, quality: 0.5}, (response) => {
            if(response.didCancel) {
                errorMessage('Photo failed to select');
            }else{
                const imageBase64 = `data:${response.type};base64, ${response.base64}`;
                setUser({
                    ...user,
                    photo: imageBase64,
                })
                setDisableButton(false);
            }
        })
    }
    const onChangeText = (key, value) => {
        setUser({
            ...user,
            [key]: value
        })
        setDisableButton(false);
    }
    const onUpdate = () => {
        const oldUser = {...route.params};
        if(
            user.name === oldUser.name && 
            user.profession === oldUser.profession &&
            user.photo === oldUser.photo
        ) {
            return errorMessage('Cannot update profile, because no data change');
        }else{
            if(user.name.length == 0 || user.profession.length == 0) {
                return errorMessage('Form Profile cannot be empty');
            }
        }

        setDisableButton(true);
        setDisableForm(true);
        setLoading(true);
        database().ref(`users/${user.uid}`).update(user)
            .then(() => {
                setDisableButton(false);
                setDisableForm(false);
                setLoading(false);
                storeData('user', user);
                successMessage('Profile success updated');
                navigation.replace('MainApp');
            })
            .catch((error) => {
                setDisableButton(false);
                setDisableForm(false);
                setLoading(false);
                errorMessage(error.message);
            })
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{zIndex: 99}} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>

                    <Icon type="back-arrow-ic" onPress={() => navigation.goBack()} />
                    <AvatarEdit 
                        photo={user.photo}
                        style={styles.avatarEdit} 
                        onPress={pickImage}
                    />
                    <View>
                        <FormInput 
                            label="Name" 
                            onChangeText={(value) => onChangeText('name', value)}
                            value={user.name}
                            isDisable={disableForm}
                        />
                        <Gap height={6} />
                        <FormInput 
                            label="Email" 
                            onChangeText={(value) => onChangeText('email', value)}
                            value={user.email}
                            isDisable
                        />
                        <Gap height={6} />
                        <FormInput 
                            label="Profession" 
                            onChangeText={(value) => onChangeText('profession', value)}
                            value={user.profession} 
                            isDisable={disableForm}
                        />
                        <Gap height={20} />
                        <Button 
                            label="Save" 
                            onPress={onUpdate} 
                            isDisable={disableButton}
                            isLoading={loading}
                        />
                    </View>

                </View>
            </ScrollView>
            <View 
                style={[styles.overlay, {
                    transform: [{rotate: '-38deg'}]
                }]} 
            />
        </View>
    )
}

export default EditProfile

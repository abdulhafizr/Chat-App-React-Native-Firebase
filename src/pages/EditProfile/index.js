import React, {useState, useEffect} from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Gap, Icon, AvatarEdit, FormInput } from '../../components';
import { firebase, storeData } from '../../config';
import { errorMessage, successMessage } from '../../utils';
import { styles } from './styles';

const EditProfile = ({navigation, route}) => {
    const [disableButton, setDisableButton] = useState(true);
    const [disableForm, setDisableForm] = useState(false);
    const [user, setUser] = useState(route.params);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const oldUser = {...route.params};

        if(user.name === oldUser.name && user.profession === oldUser.profession) {
            setDisableButton(true);
        }else{
            if(user.name.length == 0 || user.profession.length == 0) {
                setDisableButton(true);
            }else{
                setDisableButton(false);
            }
        }
    }, [user, disableButton])
    const onChangeText = (key, value) => {
        
        setUser({
            ...user,
            [key]: value
        })
    }
    const onUpdate = () => {
        setDisableButton(true);
        setIsLoading(true);
        setDisableForm(true);
        firebase.database().ref(`users/${user.uid}`).update(user)
            .then(() => {
                setDisableButton(false);
                setIsLoading(false);
                setDisableForm(false);
                storeData('user', user);
                successMessage('Profile success updated');
                navigation.replace('MainApp');
            })
            .catch((error) => {
                setDisableButton(false);
                setIsLoading(false);
                setDisableForm(false);
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
                        onPress={() => console.log('edit photo')}
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
                            isLoading={isLoading} 
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

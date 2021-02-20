import React, {useState, useEffect} from 'react';
import { ScrollView, View } from 'react-native';
import { HeaderProfile, Icon, Alert } from '../../components';
import { firebase, getData } from '../../config';
import { addFriend, unFriend, errorMessage, successMessage } from '../../utils';
import { styles } from './styles';

const DetailContact = ({navigation, route}) => {
    const {uid: contactUid, name: contactName, photo: contactPhoto, profession: contactProfession} = route.params;
    const [user, setUser] = useState({});
    const [isFriend, setIsFriend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lauchRemoveContactDialog, setLauchRemoveContactDialog] = useState(false);

    useEffect(() => {
        getData('user').then((currentUser) => {
            setUser(currentUser);
            firebase.database().ref(`contacts/${currentUser.uid}/${contactUid}`).on('value', (snapshot) => {
                if(snapshot.val()) {
                    setIsFriend(true);
                }
            })
        })
    }, [])

    const goToChatting = () => {
        navigation.navigate('Chatting', route.params);
    }
    const _addFriend = () => {
        setIsLoading(true);
        addFriend(user.uid, route.params).then((response) => {
            setIsLoading(false);
            setIsFriend(true);
            successMessage(response);
        })
        .catch((error) => {
            errorMessage(error);
        })            
    }
    const _removeFromMyContact = () => {
        unFriend(user.uid, contactUid, contactName).then((response) => {
            setIsFriend(false);
            successMessage(response);
            _toggleRemoveContactDialog();
        })
        .catch((error) => {
            _toggleRemoveContactDialog();
            errorMessage(error);
        })
    }

    const _toggleRemoveContactDialog = () => {
        setLauchRemoveContactDialog(!lauchRemoveContactDialog);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Icon type="back-arrow-ic" onPress={() => navigation.goBack()} style={styles.iconBack} />
                    <HeaderProfile 
                        name={contactName}
                        profession={contactProfession}
                        photo={contactPhoto}
                    />
                </View>
                <View style={styles.main}>
                    <View style={styles.iconWrapper1}>
                        <Icon type="message-ic" onPress={goToChatting} />
                    </View>
                    <View style={styles.iconWrapper1}>
                        <Icon 
                            type={isFriend ? 'remove-ic' : 'add-ic'} 
                            onPress={isFriend ? _toggleRemoveContactDialog : _addFriend}
                            isLoading={isLoading}
                        />
                    </View>
                </View>
            </ScrollView>
            <Alert 
                showAlert={lauchRemoveContactDialog}
                alertTitle={`Remove ${contactName} from your contact?`}
                alertMessage={`do you wanna remove ${contactName} from your contact`}
                alertLabel="Remove from my contact"
                cancelAction={_toggleRemoveContactDialog}
                confirmAction={_removeFromMyContact}
            />
        </View>
    )
}

export default DetailContact;

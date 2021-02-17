import React, {useState, useEffect} from 'react';
import { ScrollView, View } from 'react-native';
import { HeaderProfile, Icon } from '../../components';
import { firebase, getData } from '../../config';
import { errorMessage, successMessage } from '../../utils';
import { styles } from './styles';

const DetailContact = ({navigation, route}) => {
    const {uid, name, photo, profession} = route.params;
    const [user, setUser] = useState({});
    const [isFriend, setIsFriend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData('user').then((currentUser) => {
            setUser(currentUser);
            firebase.database().ref(`contacts/${currentUser.uid}/${uid}`).on('value', (snapshot) => {
                if(snapshot.val()) {
                    setIsFriend(true);
                }
            })
        })
    }, [])

    const goToChatting = () => {
        navigation.navigate('Chatting', route.params);
    }
    const addToContact = () => {
        setIsLoading(true);
        firebase.database().ref(`contacts/${user.uid}/${uid}`).push(route.params).then((response) => {
            setIsFriend(true);
            setIsLoading(false);
            successMessage(`${name} success add to mycontact`);
        })
        .catch((error) => {
            setIsLoading(false);
            errorMessage(`${name} failed add to mycontact, ${error.message}`);
        })
    }
    const removeContact = () => {
        setIsLoading(true);
        firebase.database().ref(`contacts/${user.uid}/${uid}`).remove().then((response) => {
            setIsFriend(false);
            setIsLoading(false);
            successMessage(`${name} success remove from mycontact`);
        })
        .catch((error) => {
            setIsLoading(false);
            errorMessage(`${name} failed to remove from mycontact, ${error.message}`);
        })
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Icon type="back-arrow-ic" onPress={() => navigation.goBack()} style={styles.iconBack} />
                    <HeaderProfile 
                        name={name}
                        profession={profession}
                        photo={photo}
                    />
                </View>
                <View style={styles.main}>
                    <View style={styles.iconWrapper1}>
                        <Icon type="message-ic" onPress={goToChatting} />
                    </View>
                    <View style={styles.iconWrapper1}>
                        <Icon 
                            type={isFriend ? 'remove-ic' : 'add-ic'} 
                            onPress={isFriend ? removeContact : addToContact}
                            isLoading={isLoading}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailContact;

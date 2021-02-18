import React, {useEffect, useState} from 'react';
import { Text, View, FlatList } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { ChatHistory, Icon } from '../../components';
import { getData, firebase } from '../../config';
import { errorMessage, successMessage } from '../../utils';
import { styles } from './styles';

const Chat = ({navigation}) => {
    const [historyMessages, setHistoryMessages] = useState([]);
    const [lauchDeleteDialog, setLauchDeleteDialog] = useState(false);
    const [messageDeleteDialog, setMessageDeleteDialog] = useState('');
    const [messegesDeleteUID, setMessegesDeleteUID] = useState('');
    const [titleDeleteDialog, setTitleDeleteDialog] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then((currentUser) => {
            if(currentUser) {
                setUser(currentUser);
                const rootDB = firebase.database().ref();
                rootDB.child(`history_chats/${currentUser.uid}`).on('value', async (snapshot) => {
                    const allHistoryMessages = snapshot.val();
                    if(allHistoryMessages) {
                        const data = [];
                        const promises = await Object.keys(allHistoryMessages).map(async (key) => {
                            const friendInfo = await rootDB.child(`users/${allHistoryMessages[key].uid}`).once('value');
                            data.push({
                                ...allHistoryMessages[key],
                                ...friendInfo.val()
                            })
                        })
                        await Promise.all(promises);
                        setHistoryMessages(data);
                    }
                })
            }
        })
    }, []);

    const _renderHeader = () => {
        return (
            <View style={styles.header}>
                <Icon type="user-ic" onPress={() => navigation.navigate('Profile')} style={styles.ic_profile} />
                <Text style={styles.messagesTitle}>Messages</Text>
            </View>
        )
    }
    const _renderAllHistory = ({item}) => {
        return (
            <ChatHistory
                name={item.name}
                profession={item.profession}
                photo={item.photo}
                message={item.message}
                onPress={() => navigation.navigate('Chatting', {...item})} 
                onLongPress={() => showDialogDeleteMessages(item.name, item.uid)}
            />
        )
    }
   
    const deleteMessages = () => {
        Promise.all([
            firebase.database().ref(`history_chats/${user.uid}/${messegesDeleteUID}`).remove(),
            firebase.database().ref(`chatting/${user.uid}_${messegesDeleteUID}`).remove()
        ])
        .then(() => {
            setLauchDeleteDialog(!lauchDeleteDialog);
            successMessage('Messege success deleted!');
        })
        .catch((error) => {
            setLauchDeleteDialog(!lauchDeleteDialog);
            errorMessage(error.message);
        })
    }

    const showDialogDeleteMessages = (name, uid) => {
        setLauchDeleteDialog(!lauchDeleteDialog);
        setMessegesDeleteUID(uid);
        setTitleDeleteDialog(`Delete your messages with ${name}?`);
        setMessageDeleteDialog(`do you wanna delete your messages with ${name}?`);
    }

    return (
        <>
            <FlatList 
                data={historyMessages}
                ListHeaderComponent={_renderHeader}
                style={styles.container}
                renderItem={_renderAllHistory}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
            <AwesomeAlert 
                show={lauchDeleteDialog}
                title={titleDeleteDialog}
                message={messageDeleteDialog}
                showConfirmButton={true}
                showCancelButton={true}
                confirmText="Delete message"
                cancelText="Cancel"

                onCancelPressed={() => setLauchDeleteDialog(!lauchDeleteDialog)}
                onConfirmPressed={deleteMessages}

                closeOnTouchOutside
                closeOnHardwareBackPress
                titleStyle={styles.titleDeleteMessages}
                messageStyle={styles.messageDeleteMessages}
                confirmButtonStyle={styles.buttonDeleteMessages}
                cancelButtonStyle={styles.buttonCancelMessages}
                contentContainerStyle={styles.deleteDialogContainer}
            />
        </>
    )
}

export default Chat;

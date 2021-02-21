import React, {useState,  useEffect} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import database from '@react-native-firebase/database';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { BubbleChat, HeaderChat, InputChat } from '../../components';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { getData } from '../../config';
import { styles } from './styles';
import { successMessage } from '../../utils';
import _ from 'lodash';

const Chatting = ({navigation, route}) => {
    const {uid : friendUid, name : friendName, photo : friendPhoto} = route.params;
    const [isInverted, setIsInverted] = useState(false);
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [messageSelect, setMessageSelect] = useState({});
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    
    useEffect(() => {
        let isMounted = true;
        getData('user').then((currentUser) => {
            setUser(currentUser);
            database().ref(`chatting/${currentUser.uid}_${friendUid}`).on('value', (snapshot) => {
                const allMessages = snapshot.val();
                if(allMessages && isMounted) {
                    let count = 0;
                    const data = [];
                    Object.keys(allMessages).map((keyDate) => {
                        const chatPerDay = [];
                        Object.keys(allMessages[keyDate]).map((keyMessage) => {
                            chatPerDay.push({
                                ...allMessages[keyDate][keyMessage],
                                date: keyDate,
                                idMessage: keyMessage,
                            });
                            count++;
                        })
                        const sort = _.orderBy(chatPerDay, ['key'], ['asc'])
                        data.push({
                            date: keyDate,
                            messages: sort
                        });
                    })
                    
                    if(count < 8) {
                        setIsInverted(false);
                        const sort = _.orderBy(data, ['date'], ['asc']);
                        setMessages(sort);
                    }else{
                        setIsInverted(true);
                        setMessages(data);
                    }
                    
                }
            })
        })
        return () => { isMounted = false};
    }, []);
    
    const _renderAllMessages = (item) => (
        <View>
            <Text style={styles.timestamp}>{item.date}</Text>
            {
                item.messages.map((chat) => (
                    <BubbleChat 
                        key={chat.key}
                        message={chat.message} 
                        date={chat.time}
                        isFriend={friendUid === chat.sentBy}
                        photo={friendPhoto}
                        onLongPress={() => _showActionSheet(chat)}
                    />
                ))
            }
        </View>
    )

    const _showActionSheet = (chat) => {
        setMessageSelect(chat);
        setShowBottomSheet(true);
    }
    const _closeActionSheet = () => {
        setShowBottomSheet(false)
    }

    const _deleteChat = () => {
        _closeActionSheet();
        database().ref(`chatting/${user.uid}_${friendUid}/${messageSelect.date}/${messageSelect.idMessage}`).remove()
        .then(() => {
            const currentChatDate = messages[messages.length - 1];
            const lastChatBeforeDelete = currentChatDate.messages[currentChatDate.messages.length - 1];
            const lastChatAfterDelete = currentChatDate.messages[currentChatDate.messages.length - 2];
            if(lastChatAfterDelete) {
                if(messageSelect.message === lastChatBeforeDelete.message) {
                    database().ref(`history_chats/${user.uid}/${friendUid}`).set({
                        message: lastChatAfterDelete.message,
                        time: new Date().getTime(),
                        uid: friendUid,
                    })
                }
            }else{
                database().ref(`history_chats/${user.uid}/${friendUid}`).remove();
                setMessages([]);
            }
            successMessage('Message deleted successfully');
        })
        .catch((error) => {
            errorMessage(error.message);
        })
    }
    const _copyMessage = () => {
        Clipboard.setString(messageSelect.message);
        successMessage('Message success copy to clipboard');
        _closeActionSheet();
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <HeaderChat 
                    name={friendName} 
                    photo={friendPhoto} 
                    onPress={() => navigation.goBack()} 
                />
                <View style={styles.chatBody}>
                    <FlatList 
                        inverted={isInverted}
                        style={styles.chatContent}
                        data={messages}
                        renderItem={({item}) => _renderAllMessages(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <InputChat data={route.params} />
                </View>
            </View>
            <SwipeablePanel 
                isActive={showBottomSheet}
                fullWidth={true}
                closeOnTouchOutside={true}
                onClose={_closeActionSheet}
                onPressCloseButton={_closeActionSheet}
                style={styles.buttomSheet}
            >
                <TouchableOpacity onPress={_copyMessage}>
                    <Text style={styles.buttomSheetText}>Copy Message</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_deleteChat}>
                    <Text style={styles.buttomSheetText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_closeActionSheet}>
                    <Text style={styles.buttomSheetText}>Cancel</Text>
                </TouchableOpacity>
            </SwipeablePanel>
        </View>
    )
}

export default Chatting;

import React, {useState, useEffect} from 'react';
import { Text, View, FlatList } from 'react-native';
import { BubbleChat, HeaderChat, InputChat } from '../../components';
import { firebase, getData } from '../../config';
import { styles } from './styles';

const Chatting = ({navigation, route}) => {
    const {uid : friendUid, name : friendName, photo : friendPhoto} = route.params;
    const [isInverted, setIsInverted] = useState(false);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        let isMounted = true;
        getData('user').then((currentUser) => {
            firebase.database().ref(`chatting/${currentUser.uid}_${friendUid}`).on('value', (snapshot) => {
                const allMessages = snapshot.val();
                if(allMessages && isMounted) {
                    let count = 0;
                    const data = [];
                    Object.keys(allMessages).map((keyDate) => {
                        const chatPerDay = [];
                        Object.keys(allMessages[keyDate]).map((keyMessage) => {
                            chatPerDay.push(allMessages[keyDate][keyMessage]);
                            count++;
                        })
                        data.push({
                            date: keyDate,
                            messeges: chatPerDay
                        });
                    })
                    setIsInverted(count > 8 && data.length === 1);
                    setMessages(data);
                }
            })
        })
        return () => { isMounted = false};
    }, []);
    
    const _renderAllMessages = (item) => (
        <View>
            <Text style={styles.timestamp}>{item.date}</Text>
            {
                item.messeges.map((chat) => (
                    <BubbleChat 
                        key={chat.key}
                        message={chat.message} 
                        date={chat.time}
                        isFriend={friendUid === chat.sentBy}
                        photo={friendPhoto}
                    />
                ))
            }
        </View>
    )

    return (
        <View style={styles.container}>
            <HeaderChat name={friendName} photo={friendPhoto} onPress={() => navigation.goBack()} />
            <View style={styles.chatBody}>
                <FlatList 
                    inverted={isInverted}
                    style={styles.chatContent} 
                    contentContainerStyle={{flexDirection: 'column-reverse'}}
                    data={messages}
                    renderItem={({item}) => _renderAllMessages(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
                <InputChat data={route.params} />
            </View>
        </View>
    )
}

export default Chatting;

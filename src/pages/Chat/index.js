import React, {useEffect, useState} from 'react';
import { Text, View, FlatList } from 'react-native';
import { ChatHistory, Icon } from '../../components';
import { getData, firebase } from '../../config';
import { styles } from './styles';

const Chat = ({navigation}) => {
    const [historyMessages, setHistoryMessages] = useState([]);
    useEffect(() => {
        navigation.addListener('focus', () => {
            getData('user').then((currentUser) => {
                if(currentUser) {
                    firebase.database().ref(`history_chats/${currentUser.uid}`).on('value', (snapshot) => {
                        const allHistoryMessages = snapshot.val();
                        if(allHistoryMessages) {
                            const data = [];
                            Object.keys(allHistoryMessages).map((key) => {
                                data.push({
                                    ...allHistoryMessages[key],
                                })
                            })
                            setHistoryMessages(data);
                        }
                    })
                }
            })
        })
    }, [navigation]);

    const RenderHeader = () => {
        return (
            <>
                <View style={styles.header}>
                    <Icon type="user-ic" onPress={() => navigation.navigate('Profile')} />
                </View>
                <Text style={styles.messagesTitle}>Messages</Text>
            </>
        )
    }
    const RenderAllHistory = ({item}) => {
        console.log(item);
        return (
            <ChatHistory
                name={item.name}
                profession={item.profession}
                photo={item.photo}
                message={item.message}
                onPress={() => navigation.navigate('Chatting', {...item})} 
            />
        )
    }
    return (
        <View style={styles.container}>
            <FlatList 
                data={historyMessages}
                ListHeaderComponent={() => <RenderHeader />}
                style={styles.chatHistoryWrapper}
                renderItem={({item}) => <RenderAllHistory item={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
            
            {/* <View style={styles.chatHistoryWrapper}>
            </View> */}
        </View>
    )
}

export default Chat;

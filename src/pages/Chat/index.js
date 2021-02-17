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
        })
    }, [navigation]);
    
    const getHistoryMessages = () => {
        
    }

    const _renderHeader = () => {
        return (
            <>
                <View style={styles.header}>
                    <Icon type="user-ic" onPress={() => navigation.navigate('Profile')} />
                </View>
                <Text style={styles.messagesTitle}>Messages</Text>
            </>
        )
    }
    const _renderAllHistory = (item) => {
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
                ListHeaderComponent={_renderHeader}
                style={styles.chatHistoryWrapper}
                renderItem={({item}) => _renderAllHistory(item)}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Chat;

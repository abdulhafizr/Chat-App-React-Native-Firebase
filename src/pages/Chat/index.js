import React, {useEffect} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ChatHistory, Icon } from '../../components';
import { getData } from '../../config';
import { styles } from './styles';

const Chat = ({navigation}) => {
    useEffect(() => {
        getData('user').then((user) => {
            if(user !== null) {
            }
        })
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Icon type="user-ic" onPress={() => navigation.navigate('Profile')} />
                </View>
                <Text style={styles.messagesTitle}>Messages</Text>
                <View style={styles.chatHistoryWrapper}>
                    <ChatHistory onPress={() => navigation.navigate('Chatting')} />
                    <ChatHistory onPress={() => navigation.navigate('Chatting')} />
                    <ChatHistory onPress={() => navigation.navigate('Chatting')} />
                    <ChatHistory onPress={() => navigation.navigate('Chatting')} />
                    <ChatHistory onPress={() => navigation.navigate('Chatting')} />
                    <ChatHistory onPress={() => navigation.navigate('Chatting')} />
                </View>
            </ScrollView>
        </View>
    )
}

export default Chat;

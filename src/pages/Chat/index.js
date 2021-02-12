import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ChatHistory, Icon } from '../../components';
import { styles } from './styles';

const Chat = ({navigation}) => {
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

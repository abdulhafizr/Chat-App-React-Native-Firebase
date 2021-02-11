import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ChatHistory, Icon } from '../../components';
import { styles } from './styles';

const Chat = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Icon type="user-ic" />
                </View>
                <Text style={styles.messagesTitle}>Messages</Text>
                <View style={styles.chatHistoryWrapper}>
                    <ChatHistory />
                    <ChatHistory />
                    <ChatHistory />
                    <ChatHistory />
                    <ChatHistory />
                    <ChatHistory />
                </View>
            </ScrollView>
        </View>
    )
}

export default Chat;

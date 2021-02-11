import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ChatHistory, Icon, SearchInput } from '../../components';
import { styles } from './styles';

const Contact = () => {
    const onChangeText = (value) => {
        console.log(value);
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Icon type="user-plus-ic" />
                </View>
                <View style={styles.contactWrapper}>
                <SearchInput onChangeText={(value) => onChangeText(value)} />
                <Text style={styles.messagesTitle}>MyContacts</Text>
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

export default Contact;

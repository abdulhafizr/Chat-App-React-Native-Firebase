import React from 'react';
import { Text, View, Image } from 'react-native';
import { Avatar } from '../../../assets';
import { styles } from './styles';

const ChatHistory = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={Avatar} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>Abdul Hafiz Ramadan</Text>
                    <Text style={styles.job}>Programmer</Text>
                </View>
            </View>
            <View style={styles.messageWrapper}>
                <Text style={styles.message}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the .....
                </Text>
            </View>
        </View>
    )
}

export default ChatHistory;

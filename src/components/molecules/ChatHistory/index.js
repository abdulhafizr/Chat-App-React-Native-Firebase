import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Avatar } from '../../../assets';
import { styles } from './styles';

const ChatHistory = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.profile}>
                <Image source={Avatar} style={styles.avatar} />
                <View style={styles.caption}>
                    <Text style={styles.name}>Abdul Hafiz Ramadan</Text>
                    <Text style={styles.job}>Programmer</Text>
                </View>
            </View>
            <View style={styles.messageWrapper}>
                <Text style={styles.message}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the .....
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatHistory;

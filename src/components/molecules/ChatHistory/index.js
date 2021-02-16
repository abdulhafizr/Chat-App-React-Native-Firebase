import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Avatar } from '../../../assets';
import { styles } from './styles';

const ChatHistory = ({photo, name, profession, message, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.profile}>
                <Image source={{uri: photo}} style={styles.avatar} />
                <View style={styles.caption}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.job}>{profession}</Text>
                </View>
            </View>
            <View style={styles.messageWrapper}>
                <Text style={styles.message}>
                    {message}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatHistory;

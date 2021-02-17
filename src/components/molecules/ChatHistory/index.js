import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const ChatHistory = ({photo, name, profession, message, onPress, onLongPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
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

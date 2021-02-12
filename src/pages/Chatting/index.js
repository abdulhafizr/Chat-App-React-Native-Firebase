import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BubbleChat, HeaderChat, InputChat } from '../../components';
import { styles } from './styles';

const Chatting = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderChat name="Abdul Hafiz Ramadan" onPress={() => navigation.goBack()} />
            <View style={styles.chatBody}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.chatContent}>
                        <Text style={styles.timestamp}>2021, febuari 02</Text>
                        <BubbleChat />
                        <BubbleChat isFriend />
                        <BubbleChat isFriend />
                        <BubbleChat />
                        <BubbleChat isFriend />
                        <BubbleChat />
                    </View>
                </ScrollView>
                <InputChat />
            </View>
        </View>
    )
}

export default Chatting;

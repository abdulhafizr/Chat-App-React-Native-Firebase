import React, {useState, useEffect} from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BubbleChat, HeaderChat, InputChat } from '../../components';
import { firebase, getData } from '../../config';
import { errorMessage } from '../../utils';
import { styles } from './styles';

const Chatting = ({navigation, route}) => {
    const {uid : friendUid, name : friendName, photo : friendPhoto} = route.params;

    return (
        <View style={styles.container}>
            <HeaderChat name={friendName} photo={friendPhoto} onPress={() => navigation.goBack()} />
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
                <InputChat data={route.params} />
            </View>
        </View>
    )
}

export default Chatting;

import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, View, Keyboard } from 'react-native';
import EmojiBoard from 'react-native-emoji-board';
import { getData, firebase } from '../../../config';
import { colors, errorMessage, fonts } from '../../../utils';
import { Icon } from '../../atoms';

const InputChat = ({data}) => {
    const {uid : friendUid} = data;
    const [currentUser, setCurrentUser] = useState({});
    const [message, setMessage] = useState('');
    const [showIcon, setShowIcon] = useState(false);
    
    useEffect(() => {
        getData('user').then((response) => {
            setCurrentUser(response);
        })
    }, [])

    const onChangeText = (value) => {
        setMessage(value);
    }
    const showIcons = () => {
        setShowIcon(!showIcon);
        Keyboard.dismiss(); // hide keyboard
    }
    const pickIcon = (emoji) => {
        const messageWithEmoji = `${message}${emoji.code}`;
        setMessage(messageWithEmoji);
    }
    const showKeyBoard = () => {
        setShowIcon(false);
    }
    const onSent = () => {
        if(message.length !== 0) {

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = `0${currentDate.getMonth() + 1}`;
            const date = currentDate.getDate();
            const getDate = `${year}-${month}-${date}`;

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const getTime = `${hours < 10 ? `0${hours}` : hours }:${minutes < 10 ? `0${minutes}` : minutes}`;

            const messageSend = {
                message,
                time: getTime,
                sentBy: currentUser.uid,
                key: currentDate.getTime(),
            }
            
            const db = firebase.database();
            
            setMessage('');

            db.ref(`chatting/${currentUser.uid}_${friendUid}/${getDate}/`).push(messageSend)
            .then(() => {

                    const historyChat = {
                        message,
                        time: currentDate.getTime(),
                    }

                    db.ref(`chatting/${friendUid}_${currentUser.uid}/${getDate}/`).push(messageSend).then(() => {
                        const historyCol = firebase.database().ref(`history_chats/`);

                        historyCol.child(`${friendUid}/${currentUser.uid}`).set({
                            ...historyChat,
                            uid: currentUser.uid,
                        })
                        historyCol.child(`${currentUser.uid}/${friendUid}`).set({
                            ...historyChat,
                            uid: friendUid,
                        })
                    })
                    
                })
                .catch((error) => {
                    errorMessage(error.message);
                })
        }
    }
    return (
        <View>
            <View style={styles.container}>
                <Icon 
                    type={showIcon ? 'keyboard_ic' : 'smile-ic'} 
                    onPress={showIcon ? showKeyBoard : showIcons } 
                />
                <TextInput 
                    placeholder="Write message..."
                    placeholderTextColor={colors.text.secondary}
                    style={styles.formInput}
                    onChangeText={(value) => onChangeText(value)}
                    value={message}
                    onFocus={() => setShowIcon(false)}
                    multiline
                />
                <Icon type='send-ic' style={{marginBottom: 8}} onPress={onSent} />
            </View>
            <EmojiBoard showBoard={showIcon} onClick={pickIcon} containerStyle={styles.emojiBoard(!showIcon)} />
        </View>
    )
}

export default InputChat;

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.background.primary,
        borderTopColor: colors.border.primary,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    formInput: {
        fontSize: 16,
        fontFamily: fonts.primary[400],
        color: colors.text.white1,
        flex: 1,
        marginLeft: 10,
    },
    emojiBoard: (active) => (
    {
        position: (active ? 'absolute' : 'relative'),
    })
})

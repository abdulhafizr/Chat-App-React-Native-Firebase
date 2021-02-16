import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { getData, firebase } from '../../../config';
import { colors, errorMessage, fonts } from '../../../utils';
import { Icon } from '../../atoms';

const InputChat = ({data}) => {
    const {uid : friendUid} = data;
    const [currentUser, setCurrentUser] = useState({});
    const [message, setMessage] = useState('');
    const [friendData, setFriendData] = useState({});
    
    useEffect(() => {
        getData('user').then((response) => {
            setCurrentUser(response);
        })
        firebase.database().ref(`users/${friendUid}`).once('value', (response) => {
            if(response.val()) {
                setFriendData(response.val());
            }
        })
    }, [])
    const onChangeText = (value) => {
        setMessage(value);
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
            const getTime = `${hours}:${minutes}`;

            const messageSend = {
                message,
                time: getTime,
                sentBy: currentUser.uid,
            }
            
            const db = firebase.database();
            
            setMessage('');

            db.ref(`chatting/${currentUser.uid}_${friendUid}/${getDate}/`).push(messageSend)
            .then(() => {

                    const historyChat = {
                        message,
                        time: getTime,
                    }

                    db.ref(`chatting/${friendUid}_${currentUser.uid}/${getDate}/`).push(messageSend).then(() => {
                        const historyCol = firebase.database().ref(`history_chats/`);

                        historyCol.child(`${friendUid}/${currentUser.uid}`).set({
                            ...historyChat,
                            ...currentUser,
                        })
                        historyCol.child(`${currentUser.uid}/${friendUid}`).set({
                            ...historyChat,
                            ...friendData,
                        })
                    })
                    
                })
                .catch((error) => {
                    errorMessage(error.message);
                })
        }
    }
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Write message..."
                placeholderTextColor={colors.text.secondary}
                style={styles.formInput}
                onChangeText={(value) => onChangeText(value)}
                value={message}
            />
            <Icon type='send-ic' style={{marginBottom: 8}} onPress={onSent} />
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
    }
})

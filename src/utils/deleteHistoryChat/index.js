import database from '@react-native-firebase/database';

export const deleteHistoryChat = (userUID, friendUID) => {
    return new Promise((resolve, reject) => {
        database().ref(`history_chats/${userUID}/${friendUID}`).remove()
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                reject(error.message);
            })
    })
}

import database from '@react-native-firebase/database';

export const deleteChatting = (userUID, friendUID) => {
    return new Promise((resolve, reject) => {
        database().ref(`chatting/${userUID}_${friendUID}`).remove()
        .then(() => {
            resolve(true);
        })
        .catch((error) => {
            reject(error.message);
        })
    })
}

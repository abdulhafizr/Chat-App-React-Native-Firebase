import { firebase } from '../../config';

export const deleteHistoryChat = (userUID, friendUID) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`history_chats/${userUID}/${friendUID}`).remove()
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                reject(error.message);
            })
    })
}

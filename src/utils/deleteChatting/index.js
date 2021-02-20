import { firebase } from '../../config';

export const deleteChatting = (userUID, friendUID) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`chatting/${userUID}_${friendUID}`).remove()
        .then(() => {
            resolve(true);
        })
        .catch((error) => {
            reject(error.message);
        })
    })
}

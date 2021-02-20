import { firebase } from '../../config';

export const unFriend = (userUID, friendUID, contactName) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`contacts/${userUID}/${friendUID}`).remove().then(() => {
            resolve(`${contactName} success remove from mycontact`);
        })
        .catch((error) => {
            reject(`${contactName} failed to remove from mycontact, ${error.message}`);
        })
    })
}
import { firebase } from '../../config';

export const addFriend = (userUID, friend) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`contacts/${userUID}/${friend.uid}`).push(friend).then(() => {
            resolve(`${friend.name} success add to mycontact`);
        })
        .catch((error) => {
            reject(`${friend.name} failed add to mycontact, ${error.message}`);
        })
    })
}

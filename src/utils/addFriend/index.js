import database from '@react-native-firebase/database';

export const addFriend = (userUID, friend) => {
    return new Promise((resolve, reject) => {
        database().ref(`contacts/${userUID}/${friend.uid}`).push(friend).then(() => {
            resolve(`${friend.name} success add to mycontact`);
        })
        .catch((error) => {
            reject(`${friend.name} failed add to mycontact, ${error.message}`);
        })
    })
}

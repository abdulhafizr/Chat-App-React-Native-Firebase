import React, {useEffect, useState} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Placeholder, PlaceholderLine, Progressive } from 'rn-placeholder';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { ChatHistory, Icon } from '../../components';
import { getData, firebase } from '../../config';
import { errorMessage, successMessage } from '../../utils';
import { styles } from './styles';
import _ from 'lodash';

const Chat = ({navigation}) => {
    const [historyMessages, setHistoryMessages] = useState([]);
    const [historyPlaceholder] = useState([{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}]);
    const [isLoading, setIsLoading] = useState(true);
    const [detailContact, setDetailContact] = useState({});
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [lauchDeleteDialog, setLauchDeleteDialog] = useState(false);
    const [messageDeleteDialog, setMessageDeleteDialog] = useState('');
    const [messegesDeleteUID, setMessegesDeleteUID] = useState('');
    const [titleDeleteDialog, setTitleDeleteDialog] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        let isDidMount = true;
        getData('user').then((currentUser) => {
            if(currentUser) {
                setUser(currentUser);
                const rootDB = firebase.database().ref();
                rootDB.child(`history_chats/${currentUser.uid}`).on('value', async (snapshot) => {
                    const allHistoryMessages = snapshot.val();
                    if(allHistoryMessages && isDidMount) {
                        const data = [];
                        const promises = await Object.keys(allHistoryMessages).map(async (key) => {
                            const friendInfo = await rootDB.child(`users/${allHistoryMessages[key].uid}`).once('value');
                            data.push({
                                ...allHistoryMessages[key],
                                ...friendInfo.val()
                            })
                        })
                        await Promise.all(promises);
                        const sort = _.orderBy(data, ['time'], ['desc'])
                        setHistoryMessages(sort);
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500);
                    }else{
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500);
                    }
                })
            }
        })
        return () => {isDidMount = false};
    }, []);

    const _renderHeader = () => {
        return (
            <View style={styles.header}>
                <Icon type="user-ic" onPress={() => navigation.navigate('Profile')} style={styles.ic_profile} />
                <Text style={styles.messagesTitle}>Messages</Text>
            </View>
        )
    }
    const _renderAllHistory = ({item}) => {
        return (
            <ChatHistory
                name={item.name}
                profession={item.profession}
                photo={item.photo}
                message={item.message}
                onPress={() => navigation.navigate('Chatting', {...item})} 
                onLongPress={() => {
                    _showActionSheet();
                    setDetailContact(item);
                }}
            />
        )
    }
    const _renderPlaceholder = () => {
        return (
            <Placeholder
                Animation={Progressive}
                style={{height: 115}}
            >
                <PlaceholderLine 
                    height={115}
                    width={100}
                    style={{borderRadius: 10, backgroundColor: '#464646'}}
                />
            </Placeholder>
        )
    }
   
    const deleteMessages = () => {
        firebase.database().ref(`history_chats/${user.uid}/${messegesDeleteUID}`).remove()
        .then(() => {
            firebase.database().ref(`chatting/${user.uid}_${messegesDeleteUID}`).remove()
            .then(() => {
                if(historyMessages.length <= 1 ) {
                    navigation.replace('MainApp');
                }
                setLauchDeleteDialog(!lauchDeleteDialog);
                successMessage('Messege success deleted!');
            })
        })
        .catch((error) => {
            setLauchDeleteDialog(!lauchDeleteDialog);
            errorMessage(error.message);
        })    
    }
    const unFriend = () => {
        firebase.database().ref(`contacts/${user.uid}/${detailContact.uid}`).remove().then(() => {
            successMessage(`${detailContact.name} success remove from mycontact`);
            _closeActionSheet();
        })
        .catch((error) => {
            errorMessage(`${detailContact.name} failed to remove from mycontact, ${error.message}`);
        })
    }

    const _showActionSheet = () => {
        setShowBottomSheet(true);
    }
    const _closeActionSheet = () => {
        setShowBottomSheet(false)
    }

    const showDialogDeleteMessages = () => {
        closeModal();
        setLauchDeleteDialog(!lauchDeleteDialog);
        setMessegesDeleteUID(detailContact.uid);
        setTitleDeleteDialog(`Delete your messages with ${detailContact.name}?`);
        setMessageDeleteDialog(`do you wanna delete your messages with ${detailContact.name}?`);
    }
    const closeModal = () => {
        setLauchDeleteDialog(!lauchDeleteDialog)
    }

    return (
        <View style={{flex: 1}}>
            <FlatList 
                data={isLoading ?  historyPlaceholder : historyMessages}
                ListHeaderComponent={_renderHeader}
                style={styles.container}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                renderItem={isLoading ? _renderPlaceholder : _renderAllHistory}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />

            <SwipeablePanel 
                isActive={showBottomSheet}
                fullWidth={true}
                closeOnTouchOutside={true}
                onClose={_closeActionSheet}
                onPressCloseButton={_closeActionSheet}
                style={styles.buttomSheet}
            >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('DetailContact', detailContact)
                    _closeActionSheet();
                }}>
                    <Text style={styles.buttomSheetText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setTimeout(() => {
                        showDialogDeleteMessages();
                    }, 500)
                    _closeActionSheet();
                }}>
                    <Text style={styles.buttomSheetText}>Delete Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Chatting', detailContact)
                    _closeActionSheet();
                }}>
                    <Text style={styles.buttomSheetText}>View Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={unFriend}>
                    <Text style={styles.buttomSheetText}>Unfriend</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_closeActionSheet}>
                    <Text style={styles.buttomSheetText}>Cancel</Text>
                </TouchableOpacity>
            </SwipeablePanel>

            <AwesomeAlert 
                show={lauchDeleteDialog}
                title={titleDeleteDialog}
                message={messageDeleteDialog}
                showConfirmButton={true}
                showCancelButton={true}
                confirmText="Delete message"
                cancelText="Cancel"

                onCancelPressed={closeModal}
                onConfirmPressed={deleteMessages}

                closeOnTouchOutside
                closeOnHardwareBackPress
                titleStyle={styles.titleDeleteMessages}
                messageStyle={styles.messageDeleteMessages}
                confirmButtonStyle={styles.buttonDeleteMessages}
                cancelButtonStyle={styles.buttonCancelMessages}
                contentContainerStyle={styles.deleteDialogContainer}
                actionContainerStyle={styles.actionContainerStyle}
                confirmButtonTextStyle={{fontSize: 14}}
                cancelButtonTextStyle={{fontSize: 14}}
                overlayStyle={{backgroundColor: 'rgba(0,0,0,.55)', height: '100%'}}
            />
        </View>
    )
}

export default Chat;

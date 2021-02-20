import React, {useEffect, useState} from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Placeholder, PlaceholderLine, Progressive } from 'rn-placeholder';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { ChatHistory, Icon, Alert } from '../../components';
import { getData, firebase } from '../../config';
import { deleteChatting, deleteHistoryChat, errorMessage, successMessage } from '../../utils';
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
   
    const _deleteMessagesFromAPI = () => {
        deleteHistoryChat(user.uid, detailContact.uid).then(() => {
            deleteChatting(user.uid, detailContact.uid).then(() => {
                if(historyMessages.length <= 1 ) {
                    navigation.replace('MainApp');
                }
                successMessage('Message success deleted!');
                _toggleModalDeleteChatting();
            })
        })
        .catch((error) => {
            errorMessage(error);
            _toggleModalDeleteChatting();
        })
    }
    const _viewProfile = () => {
        navigation.navigate('DetailContact', detailContact)
        _closeActionSheet();
    }
    const _deleteMessages = () => {
        setTimeout(() => {
            _showDialogDeleteChatting();
        }, 500)
        _closeActionSheet();
    }
    const _viewMessages = () => {
        navigation.navigate('Chatting', detailContact)
        _closeActionSheet();
    }

    const _showActionSheet = () => {
        setShowBottomSheet(true);
    }
    const _closeActionSheet = () => {
        setShowBottomSheet(false)
    }

    const _showDialogDeleteChatting = () => {
        _toggleModalDeleteChatting();
        setTitleDeleteDialog(`Delete your messages with ${detailContact.name}?`);
        setMessageDeleteDialog(`do you wanna delete your messages with ${detailContact.name}?`);
    }
    const _toggleModalDeleteChatting = () => {
        setLauchDeleteDialog(!lauchDeleteDialog);
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
                <TouchableOpacity onPress={_viewProfile}>
                    <Text style={styles.buttomSheetText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_deleteMessages}>
                    <Text style={styles.buttomSheetText}>Delete Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_viewMessages}>
                    <Text style={styles.buttomSheetText}>View Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_closeActionSheet}>
                    <Text style={styles.buttomSheetText}>Cancel</Text>
                </TouchableOpacity>
            </SwipeablePanel>

            <Alert 
                showAlert={lauchDeleteDialog}
                alertTitle={titleDeleteDialog}
                alertMessage={messageDeleteDialog}
                alertLabel="Delete Chat"
                cancelAction={_toggleModalDeleteChatting}
                confirmAction={_deleteMessagesFromAPI}
            />
        </View>
    )
}

export default Chat;

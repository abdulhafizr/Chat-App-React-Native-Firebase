import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Placeholder, PlaceholderLine, Progressive } from 'rn-placeholder';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { ChatHistory, Icon, Alert } from '../../components';
import { getData } from '../../config';
import { deleteChatting, deleteHistoryChat, errorMessage, successMessage, limitText } from '../../utils';
import { styles } from './styles';
import _ from 'lodash';

const Chat = ({navigation}) => {
    const [historyMessages, setHistoryMessages] = useState([]);
    const [historyPlaceholder] = useState([{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}]);
    const [isLoading, setIsLoading] = useState(true);
    const [detailContact, setDetailContact] = useState({});
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [lauchDeleteDialog, setLauchDeleteDialog] = useState(false);
    const [user, setUser] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {
        let isDidMount = true;
        getData('user').then((currentUser) => {
            if(isDidMount) {
                setUser(currentUser);
                _getHistoryMessages(currentUser);
                _requestUserPermission();
                messaging().onMessage(async remoteMessage => {
                    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
                });
            }
        })
        return () => {isDidMount = false};
    }, []);

    const _requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        
        if(authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
            _getFcmToken();
            console.log('Authorization status:', authStatus);
        }
    }

    const _getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
         console.log(fcmToken);
         console.log("Your Firebase Token is:", fcmToken);
        } else {
         console.log("Failed", "No token received");
        }
    }

    const _getHistoryMessages = (currentUser) => {
        setIsLoading(true);
        database().ref(`history_chats/${currentUser.uid}`).on('value', async (snapshot) => {
            const allHistoryMessages = snapshot.val();
            if(allHistoryMessages) {
                const data = [];
                const promises = await Object.keys(allHistoryMessages).map(async (key) => {
                    const friendInfo = await database().ref(`users/${allHistoryMessages[key].uid}`).once('value');
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
                    setIsRefresh(false);
                }, 500);
            }else{
                setTimeout(() => {
                    setIsLoading(false);
                    setIsRefresh(false);
                }, 500);
            }
        })
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
            _toggleModalDeleteChatting();
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

    const _toggleModalDeleteChatting = () => {
        setLauchDeleteDialog(!lauchDeleteDialog);
    }

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
                message={item.message.length > 200 ? limitText(item.message) : item.message}
                style={{marginHorinzontal: 12}}
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
                refreshing={isRefresh}
                onRefresh={() => {
                    setIsRefresh(true);
                    _getHistoryMessages(user);
                }}
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
                alertTitle={`Delete your messages with ${detailContact.name}?`}
                alertMessage={`do you wanna delete your messages with ${detailContact.name}?`}
                alertLabel="Delete Chat"
                cancelAction={_toggleModalDeleteChatting}
                confirmAction={_deleteMessagesFromAPI}
            />
        </View>
    )
}

export default Chat;

import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Placeholder, PlaceholderLine, Progressive } from 'rn-placeholder';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Icon, SearchInput, UserItem } from '../../components';
import { getData, firebase } from '../../config';
import { errorMessage, successMessage } from '../../utils';
import { styles } from './styles';

const Contact = ({navigation}) => {

    const [contacts, setContacts] = useState([]);
    const [contactPlaceholder] = useState([{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [detailContact, setDetailContact] = useState({});
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    useEffect(() => {
        let isDidMount = true;
        getData('user').then((currentUser) => {
            setUser(currentUser);
            firebase.database().ref(`contacts/${currentUser.uid}`).on('value', (snapshot) => {
                const allContacts = snapshot.val();
                if(allContacts && isDidMount) {
                    const data = [];
                    Object.keys(allContacts).map((key) => {
                        Object.keys(allContacts[key]).map((key2) => {
                            data.push(allContacts[key][key2]);
                        })
                        setContacts(data);
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500);
                    })
                }else{
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                }
            })
        })
        
        return () => {isDidMount = false};
    }, [])

    // const onChangeText = (value) => {
    //     console.log(value);
    // }
    const _renderHeader = () => (
        <View style={styles.header}>
            <Icon type="user-plus-ic" onPress={() => navigation.navigate('AddContact')} style={styles.ic_addContact} />
            <SearchInput onChangeText={(value) => null} />
            <Text style={styles.messagesTitle}>MyContacts</Text>
        </View>
    )
    const _renderComponent = ({item}) => (
        <UserItem 
            item={item}
            onPress={() => navigation.navigate('Chatting', item)} 
            onLongPress={() => {
                _showActionSheet();
                setDetailContact(item);
            }}
        />
    )
    const _renderPlaceholder = () => {
        return (
            <Placeholder
                Animation={Progressive}
                style={{height: 105}}
            >
                <PlaceholderLine 
                    height={105}
                    width={100}
                    style={{borderRadius: 10, backgroundColor: '#464646'}}
                />
            </Placeholder>
        )
    }

    const unFriend = () => {
        firebase.database().ref(`contacts/${user.uid}/${detailContact.uid}`).remove().then(() => {
            if(contacts.length <= 1) {
                navigation.replace('MainApp');
            }
            successMessage(`${detailContact.name} success remove from mycontact`);
            _closeActionSheet();
        })
        .catch((error) => {
            errorMessage(`${detailContact.name} failed to remove from mycontact, ${error.message}`);
        })
    }

    const _showActionSheet = (chat) => {
        setShowBottomSheet(true);
    }
    const _closeActionSheet = () => {
        setShowBottomSheet(false)
    }

    return (
        <View style={{flex: 1}}>
            <FlatList 
                data={isLoading ? contactPlaceholder : contacts}
                style={styles.container}
                ListHeaderComponent={_renderHeader}
                contentContainerStyle={styles.contactWrapper}
                renderItem={isLoading ? _renderPlaceholder : _renderComponent}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                keyExtractor={(item, index) => index.toString()}
            />
            <SwipeablePanel 
                isActive={showBottomSheet}
                fullWidth={true}
                openLarge={true}
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
        </View>
    )
}

export default Contact;

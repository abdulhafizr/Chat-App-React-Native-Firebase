import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import { Placeholder, PlaceholderLine, Progressive } from 'rn-placeholder';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Icon, SearchInput, UserItem, Alert } from '../../components';
import { getData } from '../../config';
import { errorMessage, successMessage, unFriend } from '../../utils';
import { styles } from './styles';
import _ from 'lodash';

const Contact = ({navigation}) => {

    const [contacts, setContacts] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [contactPlaceholder] = useState([{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [detailContact, setDetailContact] = useState({});
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [lauchRemoveContactDialog, setLauchRemoveContactDialog] = useState(false);

    useEffect(() => {
        let isDidMount = true; 
        getData('user').then((currentUser) => {
            setUser(currentUser);
            database().ref(`contacts/${currentUser.uid}`).on('value', (snapshot) => {
                const allContacts = snapshot.val();
                if(allContacts && isDidMount) {
                    const data = [];
                    Object.keys(allContacts).map((key) => {
                        Object.keys(allContacts[key]).map((key2) => {
                            data.push(allContacts[key][key2]);
                        })
                    })
                    const sort = _.orderBy(data, ['name'], ['asc']);
                    setContacts(sort);
                    setAllContacts(sort);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);

                }else{
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                }
            })
        })
        
        return () => {isDidMount = false};
    }, [])

    const _handleSearching = (keyword) => {
        const formatedQuery = keyword.toLowerCase();
        if(formatedQuery.length >= 1) {
            const data = _.filter(contacts, (contact) => {
                const name = contact.name.toLowerCase();
                if(name.includes(formatedQuery)) return contact;
            });
            setContacts(data);
        }else{
            setContacts(allContacts);
        }
    }
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

    const _lauchDialogRemoveContact = () => {
        setTimeout(() => {
            _toggleRemoveContactDialog();
        }, 500);
        _closeActionSheet();
    }
    const _removeFromMyContact = () => {
        unFriend(user.uid, detailContact.uid, detailContact.name).then((response) => {
            if(contacts.length <= 1) {
                navigation.replace('MainApp');
            }
            successMessage(response);
            _toggleRemoveContactDialog();
        })
        .catch((error) => {
            errorMessage(error);
            _toggleRemoveContactDialog();
        })
    }

    const _showActionSheet = () => {
        setShowBottomSheet(true);
    }
    const _closeActionSheet = () => {
        setShowBottomSheet(false)
    }

    const _toggleRemoveContactDialog = () => {
        setLauchRemoveContactDialog(!lauchRemoveContactDialog);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon type="user-plus-ic" onPress={() => navigation.navigate('AddContact')} style={styles.ic_addContact} />
                <SearchInput onChangeText={(value) => _handleSearching(value)} />
                <Text style={styles.messagesTitle}>MyContacts</Text>
            </View>
            <FlatList 
                data={isLoading ? contactPlaceholder : contacts}
                contentContainerStyle={styles.contactWrapper}
                renderItem={isLoading ? _renderPlaceholder : _renderComponent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                keyExtractor={(item, index) => index.toString()}
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
                    navigation.navigate('Chatting', detailContact)
                    _closeActionSheet();
                }}>
                    <Text style={styles.buttomSheetText}>View Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_lauchDialogRemoveContact}>
                    <Text style={styles.buttomSheetText}>Remove From My Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_closeActionSheet}>
                    <Text style={styles.buttomSheetText}>Cancel</Text>
                </TouchableOpacity>
            </SwipeablePanel>
            
            <Alert 
                showAlert={lauchRemoveContactDialog}
                alertTitle={`Remove ${detailContact.name} from your contact?`}
                alertMessage={`do you wanna remove ${detailContact.name} from your contact`}
                alertLabel="Remove from my contact"
                cancelAction={_toggleRemoveContactDialog}
                confirmAction={_removeFromMyContact}
            />
        </View>
    )
}

export default Contact;

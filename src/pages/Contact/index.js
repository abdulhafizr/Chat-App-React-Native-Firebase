import React, {useState, useEffect, useRef} from 'react';
import { Text, View, FlatList } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Placeholder, PlaceholderLine, Progressive } from 'rn-placeholder';
import { Icon, SearchInput, UserItem } from '../../components';
import { getData, firebase } from '../../config';
import { errorMessage, successMessage } from '../../utils';
import { styles } from './styles';

const Contact = ({navigation}) => {

    const [contacts, setContacts] = useState([]);
    const [optionsContacts] = useState(['See Messages', 'View Profile', 'Unfriend', 'Cancel']);
    const [contactPlaceholder] = useState([{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [detailContact, setDetailContact] = useState({});
    let actionSheet = useRef();

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
                        setIsLoading(false);
                    })
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
                showActionSheet();
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
    
    const showActionSheet = () => {
        actionSheet.current.show();
    }
    const action = (option) => {
        switch(option) {
            case 'See Messages':
                navigation.navigate('Chatting', detailContact);
                break;
            case 'View Profile':
                navigation.navigate('DetailContact', detailContact);
                break;
            case 'Unfriend':
                unFriend();
                break;
        }
    }
    const unFriend = () => {
        firebase.database().ref(`contacts/${user.uid}/${detailContact.uid}`).remove().then((response) => {
            successMessage(`${detailContact.name} success remove from mycontact`);
        })
        .catch((error) => {
            errorMessage(`${detailContact.name} failed to remove from mycontact, ${error.message}`);
        })
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
            <ActionSheet 
                ref={actionSheet}
                options={optionsContacts}
                cancelButtonIndex={3}
                destructiveButtonIndex={3}
                onPress={(index) => action(optionsContacts[index])}
            />
        </View>
    )
}

export default Contact;

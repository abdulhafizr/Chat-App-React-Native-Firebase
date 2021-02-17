import React, {useState, useEffect} from 'react';
import { Text, View, FlatList } from 'react-native';
import { ChatHistory, Icon, SearchInput, UserItem } from '../../components';
import { getData, firebase } from '../../config';
import { styles } from './styles';

const Contact = ({navigation}) => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getData('user').then((currentUser) => {
            firebase.database().ref(`contacts/${currentUser.uid}`).on('value', (snapshot) => {
                const allContacts = snapshot.val();
                if(allContacts) {
                    const data = [];
                    Object.keys(allContacts).map((key) => {
                        const contact = [];
                        Object.keys(allContacts[key]).map((key2) => {
                            data.push(allContacts[key][key2]);
                        })
                        setContacts(data);
                    })
                }
            })
        })
    }, [])

    // const onChangeText = (value) => {
    //     console.log(value);
    // }
    const _renderHeader = () => (
        <View style={styles.header}>
            <Icon type="user-plus-ic" onPress={() => navigation.navigate('AddContact')} style={styles.ic_addContact} />
            <SearchInput onChangeText={(value) => onChangeText(value)} />
            <Text style={styles.messagesTitle}>MyContacts</Text>
        </View>
    )
    const _renderComponent = (item) => (
        <UserItem 
            item={item}
            onPress={() => navigation.navigate('Chatting', item)} 
        />
    )
    return (
        <FlatList 
            data={contacts}
            style={styles.container}
            ListHeaderComponent={_renderHeader}
            contentContainerStyle={styles.contactWrapper}
            renderItem={({item}) => _renderComponent(item)}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default Contact;

import React, {useEffect, useState} from 'react';
import { View, FlatList } from 'react-native';
import { Gap, SearchInput, UserItem } from '../../components';
import { firebase, getData } from '../../config';
import { styles } from './styles';

const AddContact = ({navigation}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        
        getLocalUser();
        
        getData('user').then((currentUser) => {
            firebase.database().ref('users').once('value', (snapshot) => {
                const oldSnapshot = snapshot.val();
                const data = [];
                Object.keys(oldSnapshot).filter((key) => {
                    if(currentUser.uid !== key) {
                        data.push({
                            uid: key,
                            ...oldSnapshot[key],
                        })
                    }
                })
                setUser(data);
            })
        })

    }, [])
    const getLocalUser = async () => {
        
    }
    const onChangeText = (value) => null;
    const onPress = (item) => {
        navigation.navigate('Chatting', {...item});
    }
    return (
        <View style={styles.container}>
            <Gap height={25} />
            <View style={styles.contactWrapper}>
                <SearchInput onChangeText={(value) => onChangeText(value)} />
                <Gap height={15} />
                <FlatList
                    data={user}
                    renderItem={({item}) => 
                        <UserItem 
                            item={item} 
                            onPress={() => onPress(item)}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{height: 10}} /> }
                />
            </View>
        </View>
    )
}

export default AddContact;

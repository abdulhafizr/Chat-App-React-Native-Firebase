import React, {useEffect, useState} from 'react';
import { View, FlatList } from 'react-native';
import { Gap, SearchInput, UserItem } from '../../components';
import { firebase, getData } from '../../config';
import { styles } from './styles';

const AddContact = ({navigation}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        
        getData('user').then((currentUser) => {
            firebase.database().ref('users').on('value', (snapshot) => {
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
    
    const onChangeText = (value) => null;
    const onPress = (item) => {
        navigation.navigate('DetailContact', {...item});
    }
    const RenderAllUser = ({item}) => (
        <UserItem item={item} onPress={() => onPress(item)} />
    )

    return (
        <View style={styles.container}>
            <Gap height={25} />
            <View style={styles.contactWrapper}>
                <SearchInput onChangeText={(value) => onChangeText(value)} />
                <Gap height={15} />
                <FlatList
                    data={user}
                    renderItem={({item}) => <RenderAllUser item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{height: 10}} /> }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default AddContact;

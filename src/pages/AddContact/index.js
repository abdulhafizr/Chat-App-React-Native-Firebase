import React, {useEffect, useState} from 'react';
import { View, FlatList } from 'react-native';
import { Placeholder, PlaceholderLine, Progressive } from 'rn-placeholder';
import { Gap, SearchInput, UserItem } from '../../components';
import { firebase, getData } from '../../config';
import { styles } from './styles';

const AddContact = ({navigation}) => {
    const [user, setUser] = useState([]);
    const [contactPlaceholder] = useState([{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}, {key: 6}, {key: 7}]);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            })
        })

    }, [])
    
    const onChangeText = (value) => null;
    const onPress = (item) => {
        navigation.navigate('DetailContact', {...item});
    }
    const _renderAllUser = ({item}) => (
        <UserItem item={item} onPress={() => onPress(item)} />
    )
    const _renderPlaceholder = () => {
        return (
            <Placeholder
                Animation={Progressive}
                style={{height: 100}}
            >
                <PlaceholderLine 
                    height={100}
                    width={100}
                    style={{borderRadius: 10, backgroundColor: '#464646'}}
                />
            </Placeholder>
        )
    }

    return (
        <View style={styles.container}>
            <Gap height={25} />
            <View style={styles.contactWrapper}>
                <SearchInput onChangeText={(value) => onChangeText(value)} />
                <Gap height={15} />
                <FlatList
                    data={isLoading ? contactPlaceholder : user}
                    renderItem={isLoading ? _renderPlaceholder : _renderAllUser}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{height: 10}} /> }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default AddContact;

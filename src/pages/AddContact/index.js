import React from 'react';
import { View, ScrollView } from 'react-native';
import { Gap, SearchInput, UserItem } from '../../components';
import { styles } from './styles';

const AddContact = ({navigation}) => {
    const onChangeText = (value) => {
        console.log(value);
    }
    return (
        <View style={styles.container}>
            <Gap height={25} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contactWrapper}>
                    <SearchInput onChangeText={(value) => onChangeText(value)} />
                    <Gap height={15} />
                    <View>
                        <UserItem onPress={() => navigation.navigate('DetailContact')} />
                        <UserItem onPress={() => navigation.navigate('DetailContact')} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default AddContact;

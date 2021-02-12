import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Avatar } from '../../../assets';
import { Icon } from '../../atoms';
import { styles } from './styles';

const UserItem = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.profile}>
                <Image source={Avatar} style={styles.avatar} />
                <View style={styles.caption}>
                    <Text style={styles.name}>Abdul Hafiz Ramadan</Text>
                    <Text style={styles.job}>Programmer</Text>
                </View>
                <Icon type="back-right-arrow-ic" />
            </View>
        </TouchableOpacity>
    )
}

export default UserItem;

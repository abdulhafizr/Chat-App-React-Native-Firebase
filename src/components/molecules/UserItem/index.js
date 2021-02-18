import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Avatar } from '../../../assets';
import { Icon } from '../../atoms';
import { styles } from './styles';

const UserItem = ({item, onPress, onLongPress}) => {
    const {uid, photo, name, profession} = item;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <View style={styles.profile}>
                <Image source={{uri: photo}} style={styles.avatar} />
                <View style={styles.caption}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.job}>{profession}</Text>
                </View>
                <Icon type="back-right-arrow-ic" />
            </View>
        </TouchableOpacity>
    )
}

export default UserItem;

import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from '../../components';
import { styles } from './styles';

const GetStarted = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>LOGIN WITH GOOGLE</Text>
                <View style={styles.icWrapper}>
                    <Icon type="google-ic" onPress={() => navigation.navigate('MainApp')} />
                </View>
            </View>
            <View style={styles.bgTop}></View>
            <View style={styles.bgBottom} />
        </View>
    )
}

export default GetStarted

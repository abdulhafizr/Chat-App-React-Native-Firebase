import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { ILBackground_GetStarted } from '../../assets';
import { Icon } from '../../components';
import { styles } from './styles';

const GetStarted = () => {
    return (
        <ImageBackground source={ILBackground_GetStarted} style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>LOGIN WITH GOOGLE</Text>
                <View style={styles.icWrapper}>
                    <Icon type="google-ic" />
                </View>
            </View>
        </ImageBackground>
    )
}

export default GetStarted

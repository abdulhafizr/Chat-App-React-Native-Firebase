import React from 'react';
import { View } from 'react-native';
import { Button, Gap, Icon, AvatarEdit, FormInput } from '../../components';
import { styles } from './styles';

const EditProfile = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <Icon type="back-arrow-ic" onPress={() => navigation.goBack()} />
                <AvatarEdit style={styles.avatarEdit} />
                <View>
                    <FormInput 
                        label="Name" 
                        onChangeText={() => null}
                        value="Abdul Hafiz Ramadan" 
                    />
                    <Gap height={6} />
                    <FormInput 
                        label="Email" 
                        onChangeText={() => null}
                        value="abdulhafizramadan.17@ahr.com" 
                    />
                    <Gap height={6} />
                    <FormInput 
                        label="Profession" 
                        onChangeText={() => null}
                        value="Programmer" 
                    />
                    <Gap height={10} />
                    <Button label="Save" />
                </View>

            </View>
            <View 
                style={[styles.overlay, {
                    transform: [{rotate: '-38deg'}]
                }]} 
            />
        </View>
    )
}

export default EditProfile

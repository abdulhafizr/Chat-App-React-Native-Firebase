import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { BTNContact, BTNMessage, ICGoogle, ICUser } from '../../../assets'
import BTNIcon from './BTNIcon'

const Icon = ({ type, onPress, onLongPress, label, isFocused}) => {
    const IconChild = () => {
        if(label == 'Chat' || label == 'Contact' || label == 'Profile') {
            return <BTNIcon label={label} isFocused={isFocused} />
        }
        switch(type) {
            case 'google-ic':
                return <ICGoogle />
            case 'user-ic':
                return <ICUser />
            default :
                return <ICGoogle />
        }
    }
    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
            <IconChild />
        </TouchableOpacity>
    )
}

export default Icon

const styles = StyleSheet.create({})
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ICGoogle, ICUser, ICUserPlus, ICEdit, ICSignout, ICBackWhite, ICSend } from '../../../assets'
import BTNIcon from './BTNIcon'

const Icon = ({ type, onPress, onLongPress, label, isFocused, style}) => {
    const IconChild = () => {
        if(label == 'Chat' || label == 'Contact' || label == 'Profile') {
            return <BTNIcon label={label} isFocused={isFocused} />
        }
        switch(type) {
            case 'google-ic':
                return <ICGoogle />
            case 'user-ic':
                return <ICUser />
            case 'user-plus-ic':
                return <ICUserPlus />
            case 'edit-profile-ic':
                return <ICEdit />
            case 'signout-ic':
                return <ICSignout />
            case 'back-arrow-ic':
                return <ICBackWhite />
            case 'send-ic':
                return <ICSend />
            default :
                return <ICUser />
        }
    }
    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={{...style}}>
            <IconChild />
        </TouchableOpacity>
    )
}

export default Icon

const styles = StyleSheet.create({})
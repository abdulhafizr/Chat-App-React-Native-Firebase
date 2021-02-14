import React from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator, View } from 'react-native'
import { 
    ICGoogle, ICUser, ICUserPlus, 
    ICEdit, ICSignout, ICBackWhite, 
    ICSend, ICRightWhite, BTNMessageActive,
    ICAdd, ICRemove
} from '../../../assets'
import { colors } from '../../../utils'
import BTNIcon from './BTNIcon'

const Icon = ({ type, onPress, onLongPress, label, isFocused, isLoading, style, sizeIndicator}) => {
    if(isLoading) {
        return <ActivityIndicator size={sizeIndicator || "small"} color={colors.text.white1} />
    }
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
            case 'message-ic':
                return <BTNMessageActive />
            case 'back-right-arrow-ic':
                return <ICRightWhite />
            case 'send-ic':
                return <ICSend />
            case 'add-ic':
                return <ICAdd />
            case 'remove-ic':
                return <ICRemove />
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
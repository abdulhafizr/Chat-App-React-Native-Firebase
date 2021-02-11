import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ICGoogle, ICUser } from '../../../assets'

const Icon = ({ type, onPress, style}) => {
    const IconChild = () => {
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
        <TouchableOpacity onPress={onPress}>
            <IconChild />
        </TouchableOpacity>
    )
}

export default Icon

const styles = StyleSheet.create({})
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ICGoogle } from '../../../assets'

const Icon = ({ type, onPress, style}) => {
    const IconChild = () => {
        switch(type) {
            case 'google-ic':
                return <ICGoogle />
            
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
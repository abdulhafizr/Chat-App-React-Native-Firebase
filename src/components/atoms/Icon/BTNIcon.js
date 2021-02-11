import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BTNContact, BTNContactActive, BTNMessage, BTNMessageActive, BTNProfile, BTNProfileActive } from '../../../assets'

const BTNIcon = ({label, isFocused}) => {
    const Icon = () => {
        switch(label) {
            case 'Chat':
                return isFocused ? <BTNMessageActive /> : <BTNMessage />
            case 'Contact':
                return isFocused ? <BTNContactActive /> : <BTNContact />
            case 'Profile':
                return isFocused ? <BTNProfileActive /> : <BTNProfile />
            default:
                return <BTNProfile />
        }
    }
    return <Icon />;
}

export default BTNIcon

const styles = StyleSheet.create({})

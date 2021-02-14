import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorMessage } from '../../utils';

export const storeData = async (label, value) => {
    try {
        await AsyncStorage.setItem(label, JSON.stringify(value));
    } catch(error) {
        errorMessage(error);
    }
}

export const getData = async (label) => {
    try {
        const value = await AsyncStorage.getItem(label);
        if(value !== null) {
            return JSON.parse(value);
        }
    } catch(error) {
        errorMessage(error);
    }
}

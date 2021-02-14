import { showMessage } from "react-native-flash-message"
import { colors } from "../colors"

export const successMessage = (message) => (
    showMessage({
        message,
        type: 'default',
        backgroundColor: colors.background.blue,
        color: colors.text.white2,
    })
)

export const errorMessage = (message) => (
    showMessage({
        message,
        type: 'default',
        backgroundColor: colors.background.error,
        color: colors.text.white,
    })
)

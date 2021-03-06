const baseColors = {
    primary: '#343434',
    secondary: '#464646',
    white: '#FFF',
    white1: '#C4C4C4',
    white2: '#CBCBCB',
    white3: '#9E9C9C',
    blue1: '#5D78B0',
    black: '#000000',
    red1: '#E06379',
}

export const colors = {
    background: {
        primary: baseColors.primary,
        secondary: baseColors.secondary,
        blue: baseColors.blue1,
        error: baseColors.red1,
        disabled: baseColors.primary,
    },
    text: {
        primary: baseColors.primary,
        secondary: baseColors.secondary,
        white: baseColors.white,
        white1: baseColors.white1,
        white2: baseColors.white2,
        white3: baseColors.white3,
        black: baseColors.black,
    },
    border: {
        primary: baseColors.secondary,
        disable: baseColors.secondary,
    }
}
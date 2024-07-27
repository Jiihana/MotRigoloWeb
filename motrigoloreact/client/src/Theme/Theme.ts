import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            light: '#BDEAAC',
            main: '#B1EA90',
            dark: '#528341'
        },
        secondary: {
            light: '#f7ced4',
            main: '#ecc7ce',
            dark: '#ef6581'
        }
    },
    typography: { fontFamily: ['TypeWrong', 'cursive'].join(',') }
};

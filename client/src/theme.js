import { createTheme } from '@mui/material/styles'

export const theme = createTheme( {
    palette: {
        primary: {
            main: '#1075d2',
            light: '#4594e0',
            dark: '#0a5193',
        },
        secondary: {
            main: '#ff4081',
            light: '#ff79b0',
            dark: '#c60055',
        },
        favorite: {
            default: '#e0e0e0',
            active: '#498ecd',
        },
        text: {
            primary: '#1d1d1f',
            secondary: '#1d1d1f75',
        },
        custom: {
            buttons: '#1d1d1f75',
            recipe: '#2196f3',
            delete: '#f44336',
            edit: '#4caf50',
        }
    },
} )
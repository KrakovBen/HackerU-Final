import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    direction: 'rtl',
    
    typography: {
        fontFamily: `'Heebo', sans-serif`,
        fontSize: 18,

        h1: {
            fontFamily: `'Karantina', cursive`,
        },
        h2: {
            fontFamily: `'Karantina', cursive`,
        },
        h3: {
            fontFamily: `'Karantina', cursive`,
        },
        h4: {
            fontFamily: `'Karantina', cursive`,
        },
        h5: {
            fontFamily: `'Karantina', cursive`,
        },
        h6: {
            fontFamily: `'Karantina', cursive`,
        },
        body1: {
            letterSpacing: '-0.03em'
        }
    },

    palette: {
        mode: 'light',
        primary: {
            main: '#25619f',
            text: '#1d1d1f'
        },
        secondary: {
            main: '#9d6509',
        }
    },

    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: 'currentColor',
                    textDecoration: 'none',
                    '&:visited': { color: 'currentColor' },
                    '&:hover': { textDecoration: 'underline' },
                },
            },
        }
    }
})

export default theme
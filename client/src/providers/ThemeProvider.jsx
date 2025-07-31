import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import theme from '../theme'

const ThemeProvider = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default ThemeProvider
import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import Router from "./routes/Router"
import ThemeProvider from './providers/ThemeProvider'

const App = () => {
    return (
        <div className='app'>
            <BrowserRouter>
                <ThemeProvider>
                    <Router />
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

App.propTypes = {}

export default App

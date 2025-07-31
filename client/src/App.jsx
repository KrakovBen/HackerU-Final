import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from "./routes/Router"
import ThemeProvider from './providers/ThemeProvider'
import Layout from './layout/Layout'

const App = () => {
    return (
        <div className='app'>
            <BrowserRouter>
                <ThemeProvider>
                    <Layout>
                        <Router />
                    </Layout>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App

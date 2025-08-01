import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from "./routes/Router"
import ThemeProvider from './providers/ThemeProvider'
import Layout from './layout/Layout'
import ScrollToTop from './components/ScrollToTop'
import { SnackbarProvider } from './providers/SnackbarProvider'
import { UserProvider } from './users/providers/UserProvider'

const App = () => {
    return (
        <div className='app'>
            <BrowserRouter>
                <ThemeProvider>
                    <SnackbarProvider>
                        <UserProvider>
                            <Layout>
                                <ScrollToTop />
                                <Router />
                            </Layout>
                        </UserProvider>
                    </SnackbarProvider>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App

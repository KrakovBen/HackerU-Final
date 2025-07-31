import React from 'react'
import { node } from 'prop-types'
import NavBar from './header/NavBar'
import Container from '@mui/material/Container'
import Footer from './footer/Footer'

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <Container maxWidth='1680px' sx={{ minHeight: 'calc(100vh - 300px)', mx: '25px', width: '90vw' }}>
                { children }
            </Container>
            <Footer />
        </>
    )
}

Layout.propTypes = {
    children: node.isRequired,
}

export default Layout

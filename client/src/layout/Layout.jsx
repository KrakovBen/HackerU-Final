import React from 'react'
import { node } from 'prop-types'
import NavBar from './header/NavBar'
import Container from '@mui/material/Container'

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <Container maxWidth='1680px' sx={{ mt: 4, mx: '25px', width: '90vw' }}>
                { children }
            </Container>
        </>
    )
}

Layout.propTypes = {
    children: node.isRequired,
}

export default Layout

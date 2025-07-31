import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Container from '@mui/material/Container'

const Layout = () => {
    return (
        <>
            <NavBar />
            <Container maxWidth={false} sx={{ mt: 4, mx: '25px', width: '90vw' }}>
                <Outlet />
            </Container>
        </>
    )
}

Layout.propTypes = {}

export default Layout

import React from 'react'
import { node } from "prop-types"
import Header from "./header/Header"

const Layout = ({ children }) => {
    return (
        <>
        <Header />
        {children}
        </>
    )
}

Layout.propTypes = {
    children: node.isRequired,
}

export default Layout
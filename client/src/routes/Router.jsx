import React from 'react'
import { Routes, Route } from "react-router-dom"
import ErrorPage from './../pages/ErrorPage'

const Router = () => {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

Router.propTypes = {}

export default Router

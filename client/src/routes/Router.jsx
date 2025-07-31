import React from 'react'
import PropTypes from 'prop-types'
import { Routes, Route } from "react-router-dom"
import { ROUTES } from "./routesModel"
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

import React from 'react'
import PropTypes from 'prop-types'
import { Routes, Route } from "react-router-dom"
import ROUTES from "./routesModel"
import ErrorPage from './../pages/ErrorPage'
import Layout from '../layout/Layout'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

Router.propTypes = {}

export default Router

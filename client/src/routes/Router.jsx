import React from 'react'
import { Routes, Route } from "react-router-dom"
import ErrorPage from './../pages/ErrorPage'
import ROUTES from './routesModel'
import RecipePage from '../recipes/pages/RecipePage'

const Router = () => {
    return (
        <Routes>
            <Route path={ROUTES.RECIPE} element={<RecipePage/>} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

Router.propTypes = {}

export default Router

import React from 'react'
import { Routes, Route } from "react-router-dom"
import ErrorPage from './../pages/ErrorPage'
import ROUTES from './routesModel'
import RecipePage from '../recipes/pages/RecipePage'
import LoginPage from '../users/pages/LoginPage'
import RegisterPage from '../users/pages/RegisterPage'

const Router = () => {
    return (
        <Routes>
            <Route path={ROUTES.RECIPE} element={<RecipePage/>} />
            <Route path={ROUTES.LOGIN} element={<LoginPage/>} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage/>} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

Router.propTypes = {}

export default Router

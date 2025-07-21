import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ROUTES from "./routesModel"
import SignupPage from '../users/pages/SignupPage'
import LoginPage from '../users/pages/LoginPage'
import UpdatePage from '../users/pages/UpdatePage'
import Recipes from '../recipes/components/Recipes'

function Router() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<>home</>} />
            <Route path={ROUTES.NEWS} element={<>news</>} />
            <Route path={ROUTES.FAVORITES} element={<>favorites</>} />
            <Route path={ROUTES.CATEGORIES} element={<>categories</>} />

            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={`${ROUTES.UPDATE}/:user_id`} element={<UpdatePage />} />
            <Route path={ROUTES.TEST} element={<Recipes />} />
        </Routes>
    )
}

Router.propTypes = {}

export default Router
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ROUTES from "./routesModel"
import SignupPage from '../users/pages/SignupPage'

function Router() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<>home</>} />
            <Route path={ROUTES.NEWS} element={<>news</>} />
            <Route path={ROUTES.FAVORITES} element={<>favorites</>} />
            <Route path={ROUTES.CATEGORIES} element={<>categories</>} />

            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        </Routes>
    )
}

Router.propTypes = {}

export default Router
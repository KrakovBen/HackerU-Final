import React from 'react'
import { Routes, Route } from "react-router-dom"
import ErrorPage from './../pages/ErrorPage'
import ROUTES from './routesModel'
import RecipePage from '../recipes/pages/RecipePage'
import LoginPage from '../users/pages/LoginPage'
import RegisterPage from '../users/pages/RegisterPage'
import CRMPage from '../users/pages/CRM_Page'
import UserProfile from '../users/pages/UserProfile'
import RecipesCategoryPage from '../recipes/pages/RecipesCategoryPage'
// import RecipeFormPage from '../recipes/pages/RecipeFormPage'
import EditRecipeFormPage from '../recipes/pages/EditRecipeFormPage'

const Router = () => {
    return (
        <Routes>
            <Route path={`${ROUTES.RECIPES}`} element={<RecipesCategoryPage/>} />
            {/* <Route path={`${ROUTES.RECIPE_EDIT_OR_CREATE}`} element={<CreateRecipeFormPage/>} /> */}
            <Route path={`${ROUTES.RECIPE_EDIT}/:recipeID`} element={<EditRecipeFormPage/>} />
            <Route path={`${ROUTES.RECIPE}/:recipeID`} element={<RecipePage/>} />
            <Route path={ROUTES.LOGIN} element={<LoginPage/>} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage/>} />
            <Route path={ROUTES.CRM} element={<CRMPage/>} />
            <Route path={`${ROUTES.USER_PROFILE}/:userID`} element={<UserProfile/>} />
            <Route path={ROUTES.ROOT} element={<RecipesCategoryPage/>} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

Router.propTypes = {}

export default Router

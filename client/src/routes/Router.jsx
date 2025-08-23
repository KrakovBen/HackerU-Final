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
import EditRecipeFormPage from '../recipes/pages/EditRecipeFormPage'
import CreateRecipePage from '../recipes/pages/CreateRecipePage'
import TermsPage from '../pages/TermsPage'
import PrivacyPage from '../pages/PrivacyPage'
import AboutPage from '../pages/AboutPage'
import MyLikedRecipes from '../users/pages/MyLikedRecipes'
import MainPage from '../pages/MainPage'

const Router = () => {
    return (
        <Routes>
            <Route path={`${ROUTES.RECIPES}`} element={<RecipesCategoryPage/>} />
            <Route path={`${ROUTES.RECIPE_EDIT}/:recipeID`} element={<EditRecipeFormPage/>} />
            <Route path={`${ROUTES.RECIPE_CREATE}`} element={<CreateRecipePage/>} />
            <Route path={`${ROUTES.RECIPE}/:recipeID`} element={<RecipePage/>} />
            <Route path={ROUTES.LOGIN} element={<LoginPage/>} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage/>} />
            <Route path={ROUTES.CRM} element={<CRMPage/>} />
            <Route path={`${ROUTES.USER_PROFILE}/:userID`} element={<UserProfile/>} />
            <Route path={ROUTES.ROOT} element={<MainPage/>} />
            <Route path={ROUTES.TERMS} element={<TermsPage/>} />
            <Route path={ROUTES.PRIVACY} element={<PrivacyPage/>} />
            <Route path={ROUTES.ABOUT} element={<AboutPage/>} />
            <Route path={ROUTES.MY_LIKED_RECIPES} element={<MyLikedRecipes/>} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

Router.propTypes = {}

export default Router

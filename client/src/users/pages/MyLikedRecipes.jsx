import { useEffect, useState } from 'react'
import { useUser } from '../../users/providers/UserProvider'
import useRecipes from '../../recipes/hooks/useRecipes'
import PageHeader from '../../components/PageHeader'
import Container from '@mui/material/Container'
import RecipesFeedback from '../../recipes/components/RecipesFeedback'
import { Navigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'

const MyLikedRecipes = () => {
    const { user } = useUser()
    const { handleGetLikedRecipes, value: { isLoading, error, filteredRecipes }, handleDeleteRecipe } = useRecipes()
    
    useEffect( () => {
        document.title = 'מתכונים אהובים | BisBook'
        handleGetLikedRecipes(user?._id)
    }, [user])

    const onDeleteRecipe = (recipeID) => {
        handleDeleteRecipe(recipeID)
        handleGetLikedRecipes(user?._id)
    }
    
    if (!user) return <Navigate replace to={ROUTES.RECIPES} />

    return (
        <Container maxWidth={false} sx={{ mx: 'auto', maxWidth: '1600px' }}>
            <PageHeader title='מתכונים אהובים' subtitle='מתכונים שסימנת שאתה אוהב' />
            <RecipesFeedback user={user} isLoading={isLoading} error={error} recipes={filteredRecipes} onDelete={onDeleteRecipe}/>
        </Container>
    )
}

export default MyLikedRecipes

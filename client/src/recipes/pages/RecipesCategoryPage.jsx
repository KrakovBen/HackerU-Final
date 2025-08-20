import { useEffect } from 'react'
import useRecipes from '../hooks/useRecipes'
import { Container } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import RecipesFeedback from './../components/RecipesFeedback'
import { useUser } from '../../users/providers/UserProvider'
import ROUTES from '../../routes/routesModel'

const RecipesCategoryPage = () => {
    const { value, handleGetAllRecipes, handleDeleteRecipe } = useRecipes()
    const { isLoading, error, filteredRecipes } = value
    const { user } = useUser()

    const button = {
        path: ROUTES.RECIPE_CREATE,
        text: 'הוספת מתכון'
    }

    useEffect(() => {
        document.title = 'מתכונים | BisBook'
        handleGetAllRecipes()
    }, [handleGetAllRecipes])

    const onDeleteRecipe = async (recipeID) => {
        await handleDeleteRecipe(recipeID)
        await handleGetAllRecipes()
    }

    return (
        <Container maxWidth={false} sx={{ mx: 'auto', maxWidth: '1600px' }}>
            <PageHeader title='מה בא לכם להכין?' subtitle='מתכונים מדויקים לתוצאה בטוחה.' button={button} />

            <RecipesFeedback user={user} isLoading={isLoading} error={error} recipes={filteredRecipes} onDelete={onDeleteRecipe}/>
        </Container>
    )
}

export default RecipesCategoryPage

import { useEffect } from 'react'
import useRecipes from '../hooks/useRecipes'
import { Container } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import RecipesFeedback from './../components/RecipesFeedback'
import { useUser } from '../../users/providers/UserProvider'
import ROUTES from '../../routes/routesModel'

const RecipesCategoryPage = () => {
    const { value, handleGetAllRecipes } = useRecipes()
    const { isLoading, error, filteredRecipes } = value
    const { user } = useUser()

    const button = {
        path: ROUTES.RECIPE_CREATE,
        text: 'הוספת מתכון'
    }

    useEffect(() => {
        handleGetAllRecipes()
    }, [handleGetAllRecipes])

    return (
        <Container maxWidth={false} sx={{ mx: 'auto', maxWidth: '1600px' }}>
            <PageHeader title='קצת הייפ, הרבה טעם.' subtitle='חדש חדש! מתכונים שיגרמו לכם לצלם לפני שתטעמו.' button={button} />

            <RecipesFeedback user={user} isLoading={isLoading} error={error} recipes={filteredRecipes}/>
        </Container>
    )
}

export default RecipesCategoryPage

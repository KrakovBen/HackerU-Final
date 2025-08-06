import { useEffect } from 'react'
import PropTypes from 'prop-types'
import useRecipes from '../hooks/useRecipes'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import RecipesFeedback from './../components/RecipesFeedback'
import { useUser } from '../../users/providers/UserProvider'

const RecipesCategoryPage = () => {
    const { value, handleGetAllRecipes } = useRecipes()
    const { isLoading, error, recipes } = value
    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        handleGetAllRecipes()
    }, [])

    return (
        <Container maxWidth={false} sx={{ mx: 'auto', maxWidth: '1600px' }}>
            <PageHeader title='קצת הייפ, הרבה טעם.' subtitle='חדש חדש! מתכונים שיגרמו לכם לצלם לפני שתטעמו.' />

            <RecipesFeedback user={user} isLoading={isLoading} error={error} recipes={recipes}/>
        </Container>
    )
}

RecipesCategoryPage.propTypes = {}

export default RecipesCategoryPage

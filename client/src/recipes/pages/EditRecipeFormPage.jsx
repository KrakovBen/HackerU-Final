import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import useRecipes from '../hooks/useRecipes'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../users/providers/UserProvider'
import RecipeForm from '../components/RecipeForm'
import ROUTES from '../../routes/routesModel'
import useForm from '../../forms/hooks/useForm'

const RecipeFormPage = () => {
    const { recipeID } = useParams()
    const { handleGetRecipe, handleUpdateRecipe, value: { recipe, isLoading, error } } = useRecipes()
    const { value, ...rest } = useForm()
    const { user } = useUser()
    const navigate = useNavigate()
    
    useEffect( () => {
        handleGetRecipe(recipeID)
    }, [recipeID])

    const handleSubmit = (data) => {
        handleUpdateRecipe(recipeID, data)
    }
    
    if (!recipe || isLoading) return <>LOADING TO UPDATE!</>

    return (
        <RecipeForm title='עריכת מתכון' onSubmit={handleSubmit} data={recipe} errors={error} onFormChange={rest.validateForm} onReset={rest.handleReset} />
    )
}

RecipeFormPage.propTypes = {
    recipeID: PropTypes.string.isRequired
}

export default RecipeFormPage

import { useEffect } from 'react'
import useRecipes from '../hooks/useRecipes'
import { useUser } from '../../users/providers/UserProvider'
import useForm from '../../forms/hooks/useForm'
import initialRecipeForm from '../helpers/initialForms/initialRecipeForm'
import recipeSchema from '../models/joi-schema/recipeSchema'
import { Navigate, useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import RecipeForm from '../components/RecipeForm'

const CreateRecipePage = () => {
    const { handleCreateRecipe, handleUpdateRecipeImage } = useRecipes()
    const { user } = useUser()
    const navigate = useNavigate()
    const { value, ...rest } = useForm(initialRecipeForm, recipeSchema, handleCreateRecipe)
        
    const handleSubmit = async (data) => {
        const recipeID = await handleCreateRecipe(data)
        if (data.__imageFile) await handleUpdateRecipeImage(recipeID, data.__imageFile)
        if (!recipeID) return
        navigate(`${ROUTES.RECIPE}/${recipeID}`)
    }

    useEffect(() => {
        document.title = 'יצירת מתכון | BisBook'
    }, [])
    
    if (!user) return <Navigate replace to={ROUTES.LOGIN} />

    return (
        <RecipeForm title='יצירת מתכון' onSubmit={handleSubmit} data={value.data} errors={value.errors} onInputChange={rest.handleChange} onFormChange={rest.validateForm} onReset={rest.handleReset} />
    )
}

export default CreateRecipePage
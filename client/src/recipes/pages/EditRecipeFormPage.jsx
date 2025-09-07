import { useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useRecipes from '../hooks/useRecipes'
import useForm from '../../forms/hooks/useForm'
import initialRecipeForm from '../helpers/initialForms/initialRecipeForm'
import recipeSchema from '../models/joi-schema/recipeSchema'
import mapRecipeToModel from '../helpers/normalization/recipeMapper'
import RecipeForm from '../components/RecipeForm'
import ROUTES from '../../routes/routesModel'
import Spinner from '../../components/Spinner'

const EditRecipeFormPage = () => {
    const { recipeID } = useParams()
    const { handleGetRecipe, handleUpdateRecipe, handleUpdateRecipeImage } = useRecipes()
    const navigate = useNavigate()
    const originalRecipeRef = useRef(null)
    const { value, ...rest } = useForm(initialRecipeForm, recipeSchema, () => {} )

    const handleSubmit = async (data) => {
        await handleUpdateRecipe(recipeID, data)
        if (data.__imageFile) await handleUpdateRecipeImage(recipeID, data.__imageFile)
        navigate(`${ROUTES.RECIPE}/${recipeID}`)
    }

    const handleGetRecipeFromAPI = useCallback(() => {
        handleGetRecipe(recipeID).then(data => {
            const recipe = mapRecipeToModel(data)
            rest.setData(recipe)
            originalRecipeRef.current = recipe
        })
    }, [recipeID])

    const onResetClick = () => {
        if (originalRecipeRef.current) {
            rest.setData(originalRecipeRef.current)
            window.scrollTo(0, 0)
        }
    }

    useEffect( () => {
        document.title = 'עריכת מתכון | BisBook'
        handleGetRecipeFromAPI()
    }, [recipeID])
    
    if (!value.data) return <Spinner />

    return (
        <RecipeForm title='עריכת מתכון' onSubmit={handleSubmit} data={value.data} errors={value.errors} recipeID={recipeID} onInputChange={rest.handleChange} onFormChange={rest.validateForm} onReset={onResetClick} />
    )
}

export default EditRecipeFormPage

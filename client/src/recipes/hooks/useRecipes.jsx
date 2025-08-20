import { useState, useEffect, useCallback, useMemo } from 'react'
import useAxios from '../../hooks/useAxios'
import { useSnackbar } from '../../providers/SnackbarProvider'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '../../users/providers/UserProvider'
import { getAllRecipes, getRecipe, getRecipesByUser, updateRecipe, changeRecipeLike, updateRecipeImage, createRecipe, deleteRecipe } from '../services/recipesApiService'

const useRecipes = () => {
    const { user } = useUser()
    const [ recipes, setRecipes ] = useState(null)
    const [ recipe, setRecipe ] = useState(null)
    const [ isLoading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ query, setQuery ] = useState('')
    const [ filteredRecipes, setFilterd ] = useState(null)
    const [ searchParams ] = useSearchParams()

    const navigate = useNavigate()
    const snack = useSnackbar()
    
    useAxios()

    useEffect( () => {
        setQuery(searchParams.get('q') ?? '')
    }, [searchParams] )

    useEffect( () => {
        if (recipes && recipes.length > 0) {
            setFilterd(recipes.filter(recipe => recipe.title.includes(query) || recipe.description.includes(query) || recipe.ingredients.includes(query) || recipe.category.includes(query)))

        }
    }, [recipes, query] )

    const requestStatus = useCallback( (loading, errorMessage, recipes, recipe = null) => {
        setLoading(loading)
        setError(errorMessage)
        setRecipes(recipes)
        setRecipe(recipe)
    }, [] )

    const handleGetAllRecipes = useCallback( async (page = 1) => {
        try {
            setLoading(true)
            const recipesFormDB = await getAllRecipes(page)
            requestStatus(false, null, recipesFormDB)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleGetRecipe = useCallback( async (recipeID) => {
        try {
            setLoading(true)
            const recipeFormDB = await getRecipe(recipeID)                        
            requestStatus(false, null, null, recipeFormDB)
            return recipeFormDB
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleGetRecipesByUser = useCallback( async (userID) => {
        try {
            setLoading(true)
            const recipesFormDB = await getRecipesByUser(userID ?? user._id)
            requestStatus(false, null, recipesFormDB)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus, user])

    const handleUpdateRecipe = useCallback( async (recipeID, data) => {
        try {
            setLoading(true)
            const recipeFormDB = await updateRecipe(recipeID, data)
            requestStatus(false, null, null, recipeFormDB)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleLikeRecipe = useCallback( async (recipeID) => {
        try {
            const recipe = await changeRecipeLike(recipeID)
            requestStatus(false, null, recipes, recipe)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleUpdateRecipeImage = useCallback( async (recipeID, imageFile) => {
        try {
            setLoading(true)
            const recipeFormDB = await updateRecipeImage(recipeID, imageFile)
            requestStatus(false, null, null, recipeFormDB)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleCreateRecipe = useCallback( async (data) => {
        try {
            setLoading(true)
            const recipeFormDB = await createRecipe(data)
            requestStatus(false, null, null, recipeFormDB)
            return recipeFormDB
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleDeleteRecipe = useCallback( async (recipeID) => {
        try {
            await deleteRecipe(recipeID)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const value = useMemo( () => {
        return { isLoading, recipes, recipe, error, filteredRecipes }
    }, [isLoading, recipes, recipe, error, filteredRecipes] )

    return { value, handleGetAllRecipes, handleGetRecipe, handleGetRecipesByUser, handleUpdateRecipe, handleLikeRecipe, handleUpdateRecipeImage, handleCreateRecipe, handleDeleteRecipe }
}

useRecipes.propTypes = {}

export default useRecipes
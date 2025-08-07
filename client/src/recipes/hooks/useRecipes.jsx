import { useState, useEffect, useCallback, useMemo } from 'react'
import useAxios from '../../hooks/useAxios'
import { useSnackbar } from '../../providers/SnackbarProvider'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '../../users/providers/UserProvider'
import { getAllRecipes, getRecipe, getRecipesByUser } from '../services/recipesApiService'
import Joi from 'joi'

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
        if (Array.isArray(recipe)) {
            setFilterd(recipe.filter(recipe => recipe.title.toLowerCase().includes(query.toLowerCase())))
        }
    }, [recipe, query] )

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
            console.log(recipeFormDB);
            
            requestStatus(false, null, null, recipeFormDB)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleGetRecipesByUser = useCallback( async () => {
        try {
            setLoading(true)
            const recipesFormDB = await getRecipesByUser(user._id)
            requestStatus(false, null, recipesFormDB)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const value = useMemo( () => {
        return { isLoading, recipes, recipe, error, filteredRecipes }
    }, [isLoading, recipes, recipe, error, filteredRecipes] )

    return { value, handleGetAllRecipes, handleGetRecipe, handleGetRecipesByUser  }
}

useRecipes.propTypes = {}

export default useRecipes
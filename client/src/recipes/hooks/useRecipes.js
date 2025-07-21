import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useUser } from '../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from '../../providers/SnackbarProvider'
import useAxios from '../../hooks/useAxios'
import { getRecipes } from '../services/recipeApiService'

function useRecipes() {
    const { user } = useUser()
    const [recipes, setRecipes] = useState(null)
    const [recipe, setRecipe] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState('')
    const [filteredRecipes, setFilteredRecipes] = useState(null)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const snack = useSnackbar()
    useAxios()

    useEffect( () => {
        setQuery( searchParams.get('q') ?? '' )
    }, [searchParams] )

    useEffect( () => {
        if (recipes) {
            setFilteredRecipes( recipes.filter( (recipe) => recipe.title.includes(query) ) )
        }
    }, [query, recipes] )

    const requestStatus = ( loading, errorMessage, recipes, recipe = null ) => {
        setIsLoading(loading)
        setError(errorMessage)
        setRecipes(recipes)
        setCard(recipe)
    }

    const handleGetRecipes = useCallback( async () => {
        try {
            setIsLoading(true)
            const recipes = await getRecipes()
            requestStatus(false, null, recipes)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [] )

    const value = useMemo( () => {
        return { isLoading, recipes, recipe, error, filteredRecipes }
    }, [isLoading, recipes, recipe, error, filteredRecipes] )

    return {
        value,
        handleGetRecipes
    }
}

useRecipes.propTypes = {}

export default useRecipes

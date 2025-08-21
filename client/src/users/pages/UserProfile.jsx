import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUsers from '../hooks/useUsers'
import { Typography, Container } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import { makeFirstLetterCapital } from '../../utils/algoMethods'
import RecipesFeedback from '../../recipes/components/RecipesFeedback'
import { getRecipesByUser } from '../../recipes/services/recipesApiService'
import useRecipes from '../../recipes/hooks/useRecipes'

const UserProfile = () => {
    const { userID } = useParams()
    const [ userName, setUserName ] = useState(null)
    const { handleGetUser, value: {users: userFromDB, user} } = useUsers()
    const [ recipes, setRecipes ] = useState([])
    const { handleDeleteRecipe } = useRecipes()
    
    useEffect( () => {
        handleGetUser(userID)
    }, [userID, handleGetUser])

    useEffect( () => {
        if (userFromDB && userFromDB.name) {
            document.title = `פרופיל משתמש - ${makeFirstLetterCapital(userFromDB.name.first)} ${makeFirstLetterCapital(userFromDB.name.last)} | BisBook`
            const fullName = makeFirstLetterCapital(userFromDB.name.first) + ' ' + makeFirstLetterCapital(userFromDB.name.last)
            setUserName(fullName)
        }
    }, [userFromDB])

    useEffect( () => {
        if (!userFromDB || !userFromDB._id) return
        let ignore = false

        async function fetchUserRecipes() {
            try {
                const res = await getRecipesByUser(userFromDB._id)
                const data = res?.data ?? res
                const list =
                    Array.isArray(data) ? data :
                        Array.isArray(data?.recipes) ? data.recipes :
                            []

                if (!ignore) {
                    setRecipes(list)
                }
            } catch (error) {
                if (!ignore) setRecipes([])
            }
        }

        fetchUserRecipes()

        return () => { ignore = true }
    }, [userFromDB] )

    const onDeleteRecipe = (recipeID) => {
        handleDeleteRecipe(recipeID)
        setRecipes(recipes.filter((recipe) => recipe._id !== recipeID))
    }

    if(!userFromDB) return (
        <Typography>
            אופס. נראה שאין נתונים להצגה.
        </Typography>
    )

    return (
        <Container maxWidth='1680px' sx={{ mx: 'auto' }}>
            <PageHeader title={userName} subtitle="פרופיל משתמש" />
            {recipes.length > 0 ? (
                <RecipesFeedback user={user} isLoading={false} error={null} recipes={recipes} onDelete={onDeleteRecipe}/>
            ) : (
                <Typography>משתמש זה עדיין לא העלה מתכונים לאתר.</Typography>
            )}
        </Container>
    )
}

export default UserProfile
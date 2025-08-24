import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUsers from '../hooks/useUsers'
import { Typography, Container } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import { makeFirstLetterCapital } from '../../utils/algoMethods'
import RecipesFeedback from '../../recipes/components/RecipesFeedback'
import useRecipes from '../../recipes/hooks/useRecipes'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'

const UserProfile = () => {
    const { userID } = useParams()
    const [ userName, setUserName ] = useState(null)
    const { handleGetUser, value: {users: userFromDB, user} } = useUsers()
    const { handleDeleteRecipe, handleGetRecipesByUser, value: { filteredRecipes, isLoading, error } } = useRecipes()
    const [ value, setValue ] = useState(null)
    
    useEffect( () => {
        if (!userID) return
        handleGetUser(userID)
        handleGetRecipesByUser(userID)
    }, [userID])

    useEffect( () => {
        const fullName = makeFirstLetterCapital(userFromDB?.name?.first) + ' ' + makeFirstLetterCapital(userFromDB?.name?.last)
        setUserName(fullName || null)

        if (fullName) {
            document.title = `פרופיל משתמש - ${fullName} | BisBook`
        }
    }, [userFromDB])
    
    useEffect( () => {
        setValue(filteredRecipes)
    }, [filteredRecipes])

    const onDeleteRecipe = async (recipeID) => {
        await handleDeleteRecipe(recipeID)
        setValue(prev => prev.filter(recipe => recipe._id !== recipeID))
    }

    if(!userFromDB) return (
        <Typography>
            אופס. נראה שאין נתונים להצגה.
        </Typography>
    )

    return (
        <Container maxWidth='1680px' sx={{ mx: 'auto' }}>
            <PageHeader title={userName} subtitle="פרופיל משתמש" />
            {(user._id === userID) && (<Button variant="outlined" sx={{ fontWeight: 700, fontSize:{xs: '15px', md: '20px'} }} color='primary' component={Link} to={ROUTES.RECIPE_CREATE}>הוספת מתכון</Button>)}
            {value?.length > 0 ? (
                <RecipesFeedback user={user} isLoading={isLoading} error={error} recipes={value} onDelete={onDeleteRecipe}/>
            ) : (
                <Typography sx={{ textAlign: 'center' }}>{user._id === userID ? 'טרם העלת מתכונים לאתר.' : 'משתמש זה עדיין לא העלה מתכונים לאתר.'}</Typography>
            )}
        </Container>
    )
}

export default UserProfile
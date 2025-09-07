import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import RecipeHeader from './RecipeHeader'
import { useParams } from 'react-router-dom'
import useRecipes from '../hooks/useRecipes'
import { useUser } from '../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'

const RecipePage = () => {
    const { recipeID } = useParams()
    const { user } = useUser()
    const navigate = useNavigate()
    const { handleGetRecipe, value: { recipe }, handleDeleteRecipe } = useRecipes()
    
    useEffect( () => {
        handleGetRecipe(recipeID)
    }, [] )
    
    useEffect( () => {
        document.title = recipe?.title ? `${recipe.title} | BisBook` : 'BisBook'
    }, [recipe] )

    const onDeleteRecipe = (recipeID) => {
        handleDeleteRecipe(recipeID)
        navigate(ROUTES.RECIPES)
    }

    if (!recipe) return (
        <Container disableGutters maxWidth={false} sx={{ maxWidth: '1680px', mt: 4, px: 5 }}>
            <Typography variant='h3' component='h2' sx={{ fontWeight: 700 }}>
                אופס. נראה שמישהו אכל את המתכון.
            </Typography>
        </Container>
    )

    return (
        <Container disableGutters maxWidth={false} sx={{ maxWidth: '1680px', mt: 4, px: 5 }}>
            <RecipeHeader recipe={recipe} user={user} onDelete={onDeleteRecipe}/>

            <Box>
                <Typography variant='h5' component='h3' sx={{ mt: 5, fontWeight: 700, textDecoration: 'underline' }}>מצרכים</Typography>
                { recipe.ingredients.map((ingredient, index) => (
                    <Typography key={index} variant='body1' component='p'>{ingredient}</Typography>
                )) }

                <Typography variant='h5' component='h3' sx={{ mt: 5, fontWeight: 700, textDecoration: 'underline' }}>הוראות הכנה</Typography>

                { recipe.instructions.map((instruction, index) => (
                    <Box key={index}>
                        <Typography variant='body1' component='h2' sx={{ mt: 5, fontWeight: 900 }}>{index + 1}</Typography>
                        <Typography variant='body1' component='p'>{instruction}</Typography>
                    </Box>
                )) }
            </Box>
        </Container>
    )
}

export default RecipePage

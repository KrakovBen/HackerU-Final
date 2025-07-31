import React from 'react'
import Container from '@mui/material/Container'
import PageHeader from '../../components/PageHeader'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import RecipeHeader from './RecipeHeader'

const RecipePage = () => {
    const recipe = {
        title: "ספגטי בלונז",
        description: "מתכון לספגטי בלונז קלאסי",
        ingredients: [
            "ספגטי",
            "בשר",
            "רוטב עגבניות",
            "בצל",
            "שום"
        ],
        category: "פסטה",
        prepTimeMinutes: 15,
        cookTimeMinutes: 25,
        imageUrl: "https://cdn.goodlifetv.co.il/wp-content/uploads/2021/10/09184603/750-Recovered-22.jpg",
        tags: ["פסטה", "בשר", "עגבניות"],
        createdBy: "Noam Cohen",
        instructions: ['מטגגנים את הבצל עד שמתקרמל', 'מטגגנים את הבצל עד שמתקרמל', 'מטגגנים את הבצל עד שמתקרמל', 'מטגגנים את הבצל עד שמתקרמל']
    }

    return (
        <Container maxWidth='1680px' sx={{ mt: 4, mx: '25px' }}>
            <RecipeHeader title={recipe.title} description={recipe.description} category={recipe.category} prepTimeMinutes={recipe.prepTimeMinutes} cookTimeMinutes={recipe.cookTimeMinutes} createdBy={recipe.createdBy} imageUrl={recipe.imageUrl}/>

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

RecipePage.propTypes = {}

export default RecipePage

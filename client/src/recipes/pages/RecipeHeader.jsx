import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { string, number, object } from 'prop-types'
import Grid from '@mui/material/Grid'
import RecipeActionBar from '../components/RecipeActionBar'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'

const RecipeHeader = ({ recipe, user }) => {
    const navigate = useNavigate()
    const tagsStyle = { fontWeight: 100, fontFamily: 'Karantina', letterSpacing: '0.027em' }
    return (
        <Box>
            <Grid container display="grid" alignItems="end" sx={{ mt: 5, gridTemplateColumns: { xs: 'repeat(12, 1fr)', sm: 'repeat(12, 1fr)' }, gap: 2 }}>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 8' } }}>
                    <Typography variant="h2" component="h1" color='primary' sx={{ fontWeight: 700 }}>{recipe.title}</Typography>
                    <Typography variant="h5" component="h2" color='#144271'>{recipe.description}</Typography>
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' }, display: 'flex', justifyContent: 'flex-end' }}>
                    <RecipeActionBar recipe={recipe} user={user} onDelete={() => {}} />
                </Grid>
            </Grid>

            <Grid container display="grid" sx={{ mt: 5, gridTemplateColumns: { xs: 'repeat(12, 1fr)', sm: 'repeat(12, 1fr)' }, gap: 2 }}>
                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3', sm: 'span 4' } }}>
                    <Typography variant="h5" component="h2">קטגוריה</Typography>
                    <Typography variant="h6" component="p" sx={tagsStyle}>{recipe.category}</Typography>
                </Grid>

                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3', sm: 'span 4' } }}>
                    <Typography variant="h5" component="h2">זמן הכנה</Typography>
                    <Typography variant="h6" component="p" sx={tagsStyle}>{recipe.prepTimeMinutes} דקות</Typography>
                </Grid>

                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3', sm: 'span 4' } }}>
                    <Typography variant="h5" component="h2">זמן בישול</Typography>
                    <Typography variant="h6" component="p" sx={tagsStyle}>{recipe.cookTimeMinutes} דקות</Typography>
                </Grid>
                
                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3', sm: 'span 12' } }}>
                    <Typography variant="h5" component="h2">מאת</Typography>
                    <Typography onClick={() => navigate(`${ROUTES.USER_PROFILE}/${recipe.createdBy}`)} variant="h6" component="p" sx={{ ...tagsStyle, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>{recipe.createdByName}</Typography>
                </Grid>
            </Grid>

            <Box justifyContent="center" alignItems="center" display="flex" overflow="hidden" maxWidth="100%" maxHeight="400px" borderRadius='9px' sx={{ my: 4 }}>
                <img src={recipe.imageUrlFull} alt={recipe.title} width='100%' height='auto' />
            </Box>
        </Box>
    )
}

RecipeHeader.propTypes = {
    recipe: object.isRequired,
    user: object.isRequired
}

export default RecipeHeader

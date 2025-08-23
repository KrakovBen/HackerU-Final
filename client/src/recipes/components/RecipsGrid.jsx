import React from 'react'
import { array, func, object } from 'prop-types'
import Grid from '@mui/material/Grid'
import RecipeGrid from './recipe/RecipeGrid'
import Typography from '@mui/material/Typography'

const RecipsGrid = ({ recipes, onDelete, onLike, user }) => {
    if (!Array.isArray(recipes) || recipes.length === 0) {
        return <Typography>אין מתכונים להצגה</Typography>
    }
    
    return (
        <Grid display="grid" sx={{ gridTemplateColumns: { xs: 'repeat(12, 1fr)' }, gap: '21px' }}>
            {recipes.map(recipe => (
                <Grid key={recipe._id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                    <RecipeGrid recipe={recipe} onDelete={onDelete} onLike={onLike} user={user} />
                </Grid>
            ))}
        </Grid>
    )
}

RecipsGrid.propTypes = {
    recipes: array,
    onDelete: func,
    onLike: func,
    user: object
}

export default RecipsGrid

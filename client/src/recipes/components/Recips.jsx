import React from 'react'
import { array, func, object } from 'prop-types'
import Grid from '@mui/material/Grid'
import Recipe from './recipe/Recipe'
import Typography from '@mui/material/Typography'

const Recips = ({ recipes, onDelete, onLike, user }) => {
    if (!Array.isArray(recipes) || recipes.length === 0) {
        return <Typography>אין מתכונים להצגה</Typography>
    }
    
    return (
        <Grid display="grid" sx={{ gridTemplateColumns: { xs: 'repeat(12, 1fr)' }, gap: '21px' }}>
            {recipes.map(recipe => (
                <Grid key={recipe._id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                    <Recipe recipe={recipe} onDelete={onDelete} onLike={onLike} user={user} />
                </Grid>
            ))}
        </Grid>
    )
}

Recips.propTypes = {
    recipes: array,
    onDelete: func,
    onLike: func,
    user: object
}

export default Recips

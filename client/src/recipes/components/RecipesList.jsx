import React from 'react'
import { array, func, object } from 'prop-types'
import Grid from '@mui/material/Grid'
import RecipeList from './recipe/RecipeList'

const RecipesList = ({ recipes, onDelete, onLike, user }) => {
    return (
        <Grid display="grid" sx={{ gridTemplateColumns: { xs: 'repeat(12, 1fr)' }, gap: '21px' }}>
            {recipes.map(recipe => (
                <Grid key={recipe._id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 12', md: 'span 12' } }}>
                    <RecipeList recipe={recipe} onDelete={onDelete} onLike={onLike} user={user} />
                </Grid>
            ))}
        </Grid>
    )
}

RecipesList.propTypes = {
    recipes: array,
    onDelete: func,
    onLike: func,
    user: object
}

export default RecipesList

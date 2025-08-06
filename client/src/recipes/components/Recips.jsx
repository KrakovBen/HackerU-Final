import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Recipe from './recipe/Recipe'

const Recips = ({ recipes, onDelete, onLike, user }) => {

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

Recips.propTypes = {}

export default Recips

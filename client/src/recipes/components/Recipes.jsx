import React from 'react'
import { array, func } from 'prop-types'
import Recipe from './recipe/recipe'
import { Container } from '@mui/material'

const Recipes = ( {recipes, onDelete, onLike} ) => {
    return (
        <Container sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
            {recipes.map( (recipe) => {
                <Recipe recipe={recipe} onDelete={onDelete} onLike={onLike} />
            } )}
        </Container>
    )
}

Recipes.propTypes = {
    recipes: array.isRequired,
    onDelete: func.isRequired,
    onLike: func.isRequired
}

export default Recipes

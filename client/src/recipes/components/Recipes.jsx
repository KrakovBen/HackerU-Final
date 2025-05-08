import React from 'react'
import PropTypes from 'prop-types'
import Recipe from './recipe/recipe'
import { Container } from '@mui/material'

const Recipes = () => {
    return (
        <Container sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Recipe/>
            <Recipe/>
            <Recipe/>
        </Container>
    )
}

Recipes.propTypes = {}

export default Recipes

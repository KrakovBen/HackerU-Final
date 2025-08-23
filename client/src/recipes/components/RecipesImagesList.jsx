import React from 'react'
import { array, func, object } from 'prop-types'
import RecipeImageList from './recipe/RecipeImageList'
import ImageList from '@mui/material/ImageList'

const RecipsImagesList = ({ recipes }) => {
    return (
        <ImageList sx={{ width: '100%', mt: {xs: '21px', md: '50px'} }}>
            {recipes.map(recipe => (
                <RecipeImageList key={recipe._id} recipe={recipe} />
            ))}
        </ImageList>
    )
}

RecipsImagesList.propTypes = {
    recipes: array
}

export default RecipsImagesList

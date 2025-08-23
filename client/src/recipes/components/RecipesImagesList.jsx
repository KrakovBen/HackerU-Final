import React from 'react'
import { array, func, object } from 'prop-types'
import RecipeImageList from './recipe/RecipeImageList'
import ImageList from '@mui/material/ImageList'

const RecipsImagesList = ({ recipes }) => {
    return (
        <ImageList sx={{ width: '100%', borderRadius: {xs: '7px', md: '15px'}, mt: {xs: '21px', md: '50px'} }}>
            {recipes.map(recipe => (
                <RecipeImageList key={recipe._id} recipe={recipe} />
            ))}
        </ImageList>
    )
}

RecipsImagesList.propTypes = {
    recipes: array,
    onDelete: func,
    onLike: func,
    user: object
}

export default RecipsImagesList

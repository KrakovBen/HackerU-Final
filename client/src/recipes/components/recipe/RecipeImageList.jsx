import React from 'react'
import { object } from 'prop-types'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../routes/routesModel'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'

const RecipeImageList = ({ recipe }) => {
    const navigate = useNavigate()
    return (
        <ImageListItem onClick={() => navigate(`${ROUTES.RECIPE}/${recipe._id}`) } sx={{ cursor: 'pointer' }}>
            <img src={recipe.imageUrlFull} alt={recipe.title} loading="lazy" />
            <ImageListItemBar title={recipe.title} subtitle={<span>מאת: {recipe.createdByName}</span>} />
        </ImageListItem>
    )
}

RecipeImageList.propTypes = {
    recipe: object.isRequired,
}

export default RecipeImageList

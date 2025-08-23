import React from 'react'
import { object, func } from 'prop-types'
import { Card, CardContent, CardHeader, Typography, CardMedia, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../routes/routesModel'
import RecipeActionBar from '../RecipeActionBar'

const RecipeGrid = ({ recipe, onDelete, onLike, onShare, onEdit, user }) => {
    const navigate = useNavigate()
    return (
        <Card sx={{ borderRadius: '9px', overflow: 'hidden', boxShadow: '0px 3px 6px -1px rgba(0,0,0,0.2)' }} key={recipe._id}>
            <Box sx={{ cursor: 'pointer' }} onClick={() => navigate(`${ROUTES.RECIPE}/${recipe._id}`)}>
                <CardHeader title={recipe.title} subheader={recipe.createdByName} />
                <CardMedia loading='lazy' image={recipe.imageUrlFull} alt={recipe.title} height={300} component='img'/>
                <CardContent>
                    <Typography variant='body1' component='p' sx={{ overflow: 'hidden', minHeight: '90px', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{recipe.description}</Typography>
                </CardContent>
            </Box>
            <RecipeActionBar user={user} recipe={recipe} onShare={onShare} onLike={onLike} onDelete={onDelete} onEdit={onEdit}/>
        </Card>
    )
}

RecipeGrid.propTypes = {
    recipe: object.isRequired,
    onDelete: func.isRequired,
    onLike: func.isRequired,
    onShare: func.isRequired,
    onEdit: func.isRequired,
    user: object.isRequired
}

export default RecipeGrid

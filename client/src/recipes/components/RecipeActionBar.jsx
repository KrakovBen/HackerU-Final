import React from 'react'
import { Box, IconButton, CardActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditSquareIcon from '@mui/icons-material/EditSquare'
import { useNavigate } from 'react-router-dom'
import ShareIcon from '@mui/icons-material/Share'

const RecipeActionBar = ({ user, recipe, onShare, onLike, onDelete, onEdit }) => {
    const navigate = useNavigate()

    const handleEditClick = () => {
        navigate(`/recipes/edit/${recipe._id}`)
    }
    return (
        <CardActions>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton aria-label="share" onClick={onShare}>
                    <ShareIcon />
                </IconButton>

                {user && (<IconButton aria-label="לייק" onClick={onLike}>
                    <FavoriteIcon color="error" />
                </IconButton>)}

                {user && (user._id === recipe.createdBy || user.isAdmin) && (<IconButton aria-label="delete" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>)}

                {user && (user._id === recipe.createdBy || user.isAdmin) && (<IconButton aria-label="edit" onClick={handleEditClick}>
                    <EditSquareIcon />
                </IconButton>)}
            </Box>
        </CardActions>
    )
}

export default RecipeActionBar
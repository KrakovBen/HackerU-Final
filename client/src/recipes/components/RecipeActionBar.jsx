import { useState } from 'react'
import { Box, IconButton, CardActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditSquareIcon from '@mui/icons-material/EditSquare'
import { useNavigate } from 'react-router-dom'
import ShareIcon from '@mui/icons-material/Share'
import useRecipes from '../hooks/useRecipes'

const RecipeActionBar = ({ user, recipe, onDelete }) => {
    const navigate = useNavigate()
    const { handleLikeRecipe } = useRecipes()
    const [isLike, setLike] = useState(() => {
        if (!user) return false
        return !!recipe.likes.find(id => id === user._id)
    })

    const handleEditClick = () => {
        navigate(`/recipes/edit/${recipe._id}`)
    }

    const handleLike = () => {
        setLike(prev => !prev)
        handleLikeRecipe(recipe._id)
    }

    const handleShareClick = () => {
        const subject = encodeURIComponent(`המלצה על מתכון: ${recipe.title}`)
        const link = `${window.location.origin}/recipes/${recipe._id}`
        const body = encodeURIComponent(
            `מצאתי מתכון שאני בטוח שתאהב/י ותרצה/י להכין:\n\n${recipe.title}\n${recipe.description}\n${link}`
        )
        const url = `mailto:?subject=${subject}&body=${body}`
        window.location.href = url
    }

    return (
        <CardActions>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton aria-label="share" onClick={handleShareClick}>
                    <ShareIcon />
                </IconButton>

                {user && (<IconButton aria-label="לייק" onClick={handleLike}>
                    <FavoriteIcon color={isLike ? "error" : "inherit"} />
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
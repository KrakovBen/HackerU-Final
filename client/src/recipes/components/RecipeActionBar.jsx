import { useState, useMemo, useEffect } from 'react'
import { Box, IconButton, CardActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditSquareIcon from '@mui/icons-material/EditSquare'
import { useNavigate } from 'react-router-dom'
import ShareIcon from '@mui/icons-material/Share'
import useRecipes from '../hooks/useRecipes'
import ROUTES from '../../routes/routesModel'

const RecipeActionBar = ({ user, recipe, onDelete }) => {
    const navigate = useNavigate()
    const { handleLikeRecipe } = useRecipes()
    const likes = useMemo(() => Array.isArray(recipe?.likes) ? recipe.likes : [], [recipe?.likes])
    const recipeOwnerID = String(recipe?.createdBy?._id ?? recipe?.createdBy ?? '')
    const userID = String(user?._id ?? '')
    
    const initiallyLiked = useMemo( () => likes.some(id => String(id) === userID), [userID, likes] )
    
    const [ isLike, setLike ] = useState(initiallyLiked)

    useEffect( () => {
        setLike(initiallyLiked)
    }, [initiallyLiked] )

    const handleEditClick = () => {
        if (!recipe?._id) return
        navigate(`${ROUTES.RECIPE_EDIT}/${recipe._id}`)
    }

    const handleLike = async () => {
        if (!user || !recipe?._id) return
        setLike(prev => !prev)
        try {
            await handleLikeRecipe(recipe._id)
        } catch {
            setLike(prev => !prev)
        }
    }

    const handleShareClick = () => {
        const subject = encodeURIComponent(`המלצה על מתכון: ${recipe.title || ''}`)
        const link = `${window.location.origin}/recipes/${recipe._id}`
        const body = encodeURIComponent(
            `מצאתי מתכון שאני בטוח שתאהב/י ותרצה/י להכין:\n\n${recipe.title || ''}\n${recipe.description || ''}\n${link}`
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

                {user && (recipeOwnerID === userID || user.isAdmin) && (<IconButton aria-label="delete" onClick={onDelete} disabled={!recipe?._id}>
                    <DeleteIcon />
                </IconButton>)}

                {user && (recipeOwnerID === userID || user.isAdmin) && (<IconButton aria-label="edit" onClick={handleEditClick}>
                    <EditSquareIcon />
                </IconButton>)}
            </Box>
        </CardActions>
    )
}

export default RecipeActionBar
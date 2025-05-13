import React, { useState } from 'react'
import { func, string, arrayOf } from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { Box, CardActions, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IosShareIcon from '@mui/icons-material/IosShare'
import { useUser } from '../../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'

const RecipeActionBar = ({ cardId, onDelete, onLike, cardUserId, cardLikes }) => {
    const { user } = useUser()
    const theme = useTheme()
    const navigate = useNavigate()
    const [isLike, setLike] = useState(() => {
        if (!user) return false
        return !!cardLikes.find(id => id === user._id)
    })

    const handleLike = async () => {
        setLike(prev => !prev)
        // await handleLikeCard(cardId)
        onLike()
    }

    return (
        <>
        <CardActions disableSpacing sx={{ paddingTop: 0, justifyContent: "space-between" }}>
            <Box>
                {user && (user.isAdmin || user._id === cardUserId) && (
                    <IconButton aria-label="עריכת מתכון" onClick={() => navigate(`/recipes/${cardId}/edit`)}>
                        <EditIcon sx={{ color: theme.palette.custom.buttons }} />
                    </IconButton>
                )}

                {user && (user.isAdmin || user._id === cardUserId) && (
                    <IconButton aria-label="מחיקת מתכון" onClick={onDelete}>
                    <DeleteIcon sx={{ color: theme.palette.custom.buttons }} />
                </IconButton>
                )}
            </Box>
            <Box>
                {!!user && (
                    <IconButton aria-label="הוספה למועדפים" onClick={handleLike}>
                        <FavoriteIcon sx={{ color: isLike ? theme.palette.favorite.active : theme.palette.favorite.default }} />
                    </IconButton>
                )}
                <IconButton aria-label="שיתוף מתכון">
                    <IosShareIcon sx={{ color: theme.palette.custom.buttons }} />
                </IconButton>
            </Box>
        </CardActions>
        </>
    )
}

RecipeActionBar.propTypes = {
    cardId: string.isRequired,
    onDelete: func.isRequired,
    onLike: func.isRequired,
    cardUserId: string.isRequired,
    cardLikes: arrayOf(string).isRequired
}

export default RecipeActionBar

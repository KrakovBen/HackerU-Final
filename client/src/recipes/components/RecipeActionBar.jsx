import React from 'react'
import { Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EditSquareIcon from '@mui/icons-material/EditSquare'

const RecipeActionBar = () => {
    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton aria-label="עריכה">
                <EditSquareIcon />
            </IconButton>

            <IconButton aria-label="מחיקה">
                <DeleteIcon />
            </IconButton>

            <IconButton aria-label="לייק">
                <FavoriteIcon color="error" />
            </IconButton>
        </Box>
    )
}

export default RecipeActionBar
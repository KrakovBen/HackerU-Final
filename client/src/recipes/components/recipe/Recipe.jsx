import React from 'react'
import PropTypes from 'prop-types'
import { Card , CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Recipe = ({ recipe }) => {
    return (
        <Card sx={{ maxWidth: 450, width: '100%', minWidth: 300, marginInline: 'auto', borderRadius: 3 }}>
            <CardMedia component="img" height="200" image={recipe?.image?.url || 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png'} alt={recipe?.image?.alt || 'תמונת מתכון'} />
            <CardContent sx={{ textAlign: "start" }}>
                <Typography variant="h5" sx={{ color: 'text.primary' }}>
                    {recipe?.name || 'שם המתכון'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {recipe?.user.name || 'שם משתמש'}
                </Typography>
                <Typography mt={1} variant="body1" sx={{ color: 'text.secondary' }}>
                    {recipe?.description || 'תיאור המתכון'}
                </Typography>
            </CardContent>

            <CardActions>
                <IconButton aria-label="הוספה למועדפים">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

Recipe.propTypes = {}

export default Recipe

import React from 'react'
import PropTypes from 'prop-types'
import { Card , CardContent, CardMedia, Typography} from '@mui/material'
import RecipeActionBar from './RecipeActionBar'
import { useTheme } from '@mui/material/styles'

const Recipe = ({ recipe }) => {
    const theme = useTheme()

    return (
        <Card sx={{ maxWidth: 450, width: '100%', minWidth: 300, marginInline: 'auto', borderRadius: 3 }}>
            <CardMedia component="img" height="200" image={recipe?.image?.url || '/images/default-recipe.jpg'} alt={recipe?.image?.alt || 'תמונת מתכון'} />
            <CardContent sx={{ textAlign: "start" }}>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                    {recipe?.name || 'שם המתכון'}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                    {recipe?.user.name || 'שם משתמש'}
                </Typography>
                <Typography mt={1} variant="body1" sx={{ color: theme.palette.text.secondary, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', maxWidth: '100%', height: 50}}>
                    {recipe?.description || 'תיאור המתכון'}
                </Typography>
            </CardContent>

            <RecipeActionBar/>
        </Card>
    )
}

Recipe.propTypes = {}

export default Recipe

import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { string } from 'prop-types'
import Grid from '@mui/material/Grid'
import RecipeActionBar from '../components/RecipeActionBar'

const RecipeHeader = ({ title, description, category, prepTimeMinutes, cookTimeMinutes, createdBy, imageUrl }) => {
    const tagsStyle = { fontWeight: 100, fontFamily: 'Karantina', letterSpacing: '0.027em' }
    return (
        <Box>
            <Grid container display="grid" alignItems="end" sx={{ mt: 5, gridTemplateColumns: { xs: 'repeat(12, 1fr)', sm: 'repeat(12, 1fr)' }, gap: 2 }}>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 8' } }}>
                    <Typography variant="h2" component="h1" color='#25619f' sx={{ fontWeight: 700 }}>{title}</Typography>
                    <Typography variant="h5" component="h2" color='#144271'>{description}</Typography>
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' }, display: 'flex', justifyContent: 'flex-end' }}>
                    <RecipeActionBar />
                </Grid>
            </Grid>
            

            <Grid container display="grid" sx={{ mt: 5, gridTemplateColumns: { xs: 'repeat(12, 1fr)', sm: 'repeat(12, 1fr)' }, gap: 2 }}>
                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3', sm: 'span 4' } }}>
                    <Typography variant="h5" component="h2">קטגוריה</Typography>
                    <Typography variant="h6" component="p" sx={tagsStyle}>{category}</Typography>
                </Grid>

                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3', sm: 'span 4' } }}>
                    <Typography variant="h5" component="h2">זמן הכנה</Typography>
                    <Typography variant="h6" component="p" sx={tagsStyle}>{prepTimeMinutes} דקות</Typography>
                </Grid>

                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3', sm: 'span 4' } }}>
                    <Typography variant="h5" component="h2">זמן בישול</Typography>
                    <Typography variant="h6" component="p" sx={tagsStyle}>{cookTimeMinutes} דקות</Typography>
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 6', md: 'span 3', sm: 'span 12' } }}>
                    <Typography variant="h5" component="h2">מאת</Typography>
                    <Typography variant="h6" component="p" sx={tagsStyle}>{createdBy}</Typography>
                </Grid>
            </Grid>

            <Box justifyContent="center" alignItems="center" display="flex" overflow="hidden" maxWidth="100%" maxHeight="400px" borderRadius='9px' sx={{ my: 4 }}>
                <img src={imageUrl} alt={title} width='100%' height='auto' />
            </Box>
        </Box>
    )
}

RecipeHeader.propTypes = {
    title: string.isRequired,
    subtitle: string.isRequired
}

export default RecipeHeader

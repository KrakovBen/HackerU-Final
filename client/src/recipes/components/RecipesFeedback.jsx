import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import RecipsGrid from './RecipsGrid'
import RecipsImagesList from './RecipesImagesList'
import Spinner from '../../components/Spinner'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import WindowIcon from '@mui/icons-material/Window'
import ImageIcon from '@mui/icons-material/Image'
import recipeType from '../models/types/recipeType'

const RecipesFeedback = ({ isLoading, error, recipes, onDelete, onLike, user }) => {
    const styleButton = { justifyContent: 'center', display: 'flex', alignItems: 'center',fontWeight: 500, gap: '7px', fontSize:{xs: '15px', md: '20px'} }
    const [ isListDisplay, setIsListDisplay ] = useState(false)
    
    if (isLoading) return ( <Spinner /> )

    if (error) return ( <Typography>{error?.message ? error?.message : error }</Typography> )

    if (recipes && !recipes.length) return ( <Typography>אין מתכונים להצגה</Typography> )

    if (recipes && !!recipes.length) return (
        <>
        <Container maxWidth={false} disableGutters sx={{ mx: 'auto', maxWidth: '1600px', justifyContent: {xs: 'center', md: 'flex-end'}, display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button variant="outlined" color="primary" onClick={() => setIsListDisplay(!isListDisplay)} sx={{ maxWidth: '300px', width: '100%' }}>
                {isListDisplay ? <Typography sx={styleButton}><ImageIcon />תצוגת תמונות</Typography>: <Typography sx={styleButton}><WindowIcon />תצוגת מידע</Typography> }
            </Button>
        </Container>
        {isListDisplay ? <RecipsGrid recipes={recipes} onDelete={onDelete} onLike={onLike} user={user}/>
        : <RecipsImagesList recipes={recipes} />
        }
        </>
    )
}

RecipesFeedback.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    recipes: PropTypes.arrayOf(recipeType).isRequired,
    onDelete: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default RecipesFeedback

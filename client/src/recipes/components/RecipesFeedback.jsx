import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Recips from '../components/Recips'
import Spinner from '../../components/Spinner'

const RecipesFeedback = ({ isLoading, error, recipes, onDelete, onLike, user }) => {  
    if (isLoading) return ( <Spinner /> )

    if (error) return ( <Typography>{error?.message ? error?.message : error }</Typography> )

    if (recipes && !recipes.length) return ( <Typography>אין מתכונים להצגה</Typography> )

    if (recipes && !!recipes.length) return (
        <Recips recipes={recipes} onDelete={onDelete} onLike={onLike} user={user}/>
    )
}

RecipesFeedback.propTypes = {}

export default RecipesFeedback

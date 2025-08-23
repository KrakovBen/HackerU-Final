import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import RecipsGrid from './RecipsGrid'
import RecipsList from './RecipesList'
import Spinner from '../../components/Spinner'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda'
import WindowIcon from '@mui/icons-material/Window'

const RecipesFeedback = ({ isLoading, error, recipes, onDelete, onLike, user }) => {
    const styleButton = { justifyContent: 'center', display: 'flex', alignItems: 'center',fontWeight: 500, gap: '7px', fontSize:{xs: '15px', md: '20px'} }
    const [ isListDisplay, setIsListDisplay ] = useState(true)
    
    if (isLoading) return ( <Spinner /> )

    if (error) return ( <Typography>{error?.message ? error?.message : error }</Typography> )

    if (recipes && !recipes.length) return ( <Typography>אין מתכונים להצגה</Typography> )

    if (recipes && !!recipes.length) return (
        <>
        <Container maxWidth={false} disableGutters sx={{ mx: 'auto', maxWidth: '1600px', justifyContent: {xs: 'center', md: 'flex-end'}, display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button variant="outlined" color="primary" onClick={() => setIsListDisplay(!isListDisplay)} sx={{ maxWidth: '300px', width: '100%' }}>
                {isListDisplay ? <Typography sx={styleButton}><ViewAgendaIcon />הצג כרשימה</Typography>: <Typography sx={styleButton}><WindowIcon />הצג כקוביות</Typography> }
            </Button>
        </Container>
        {isListDisplay ? <RecipsGrid recipes={recipes} onDelete={onDelete} onLike={onLike} user={user}/>
        : <RecipsList recipes={recipes} onDelete={onDelete} onLike={onLike} user={user}/>
        }
        </>
    )
}

RecipesFeedback.propTypes = {}

export default RecipesFeedback

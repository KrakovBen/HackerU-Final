import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import Spinner from '../../components/Spinner'
import ROUTES from '../../routes/routesModel'
import { useNavigate } from 'react-router-dom'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'

const UsersGrid = ({ users, isLoading, error }) => {
    const navigate = useNavigate()
    if (error) return ( <Typography>{error}</Typography> )
    if (isLoading) return ( <Spinner /> )

    if (!users?.length) return null
    
    return (
        <Container maxWidth={false} disableGutters sx={{ mx: 'auto', maxWidth: '1600px', justifyContent: {xs: 'center', md: 'flex-end'}, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', alignItems: 'center', mb: 2 }}>
            {users?.map(user => (
                <Box key={user._id} sx={{ p: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff', borderRadius: '9px', p: '20px 50px', width: '100%', height: '100%', textAlign: 'center' }} onClick={() => navigate(`${ROUTES.USER_PROFILE}/${user._id}`)}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '50px'}}>
                            <PermContactCalendarIcon />
                        </Box>
                        <Box>
                            <Typography>{user.name.first.toUpperCase() + ' ' + user.name.last.toUpperCase()}</Typography>
                            <Typography>{user.recipeCount === 1 ? 'מתכון 1' : user.recipeCount + ' מתכונים'}</Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Container>
    )
}

export default UsersGrid

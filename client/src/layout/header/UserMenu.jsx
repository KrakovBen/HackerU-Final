import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import { useTheme } from '@mui/material'

const UserMenu = ({ user, onLogout, setOpenDrawer }) => {
    const theme = useTheme()
    const handleLogout = () => {
        onLogout()
        setOpenDrawer(false)
    }
    
    return (
        <>
            {!user ? (
                <Button onClick={() => setOpenDrawer(false)} component={Link} to={ROUTES.LOGIN} color="inherit" sx={{ fontWeight: 500, '&:hover': { color: theme.palette.primary.text }, marginInlineEnd: 3 }} >
                    התחברות
                </Button>
            ) : (
                <Button onClick={handleLogout} color="inherit" sx={{ fontWeight: 500, '&:hover': { color: theme.palette.primary.text }, marginInlineEnd: 3 }} >
                    התנתקות
                </Button>
            )}
        </>
    )
}

export default UserMenu
import { useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import ROUTES from '../../routes/routesModel'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useUser } from '../../users/providers/UserProvider'
import useUsers from '../../users/hooks/useUsers'
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'

const pages = [
    { label: 'בית', path: ROUTES.ROOT, adminOnly: false },
    { label: 'כל המתכונים', path: ROUTES.RECIPES, adminOnly: false },
    { label: 'ניהול משתמשים', path: ROUTES.CRM, adminOnly: true }
]

const NavBar = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const { user } = useUser()
    const { handleLogout } = useUsers()
    
    const onLogout = () => {
        handleLogout();
        setOpenDrawer(false);
    }

    return (
        <AppBar position="sticky" elevation={0} sx={{ background: 'transparent', py: 3, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Box sx={{ backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.2)', transition: 'all 0.3s ease-in-out', borderRadius: '16px', boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)', maxWidth: '1680px', mx: 'auto', px: 3, py: 1.5, width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Typography component={Link} to={ROUTES.ROOT} variant="h5" sx={{ fontFamily: 'Karantina', fontWeight: 700, color: theme.palette.primary.main, '&:hover': { color: theme.palette.primary.main }, textDecoration: 'none' }}>
                    <img style={{ width: 25, height: 25, marginInlineEnd: 2, marginBlockEnd: -2 }} src="/bisbook.svg" alt="BisBook" />BisBook
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton onClick={() => setOpenDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                            <List sx={{ width: '80vw', minWidth: '200px', maxWidth: '600px' }}>
                                {pages.map((page) => (
                                    (page.adminOnly && !user?.isAdmin) ? null : (
                                        <ListItem sx={{ textAlign: 'right', direction: 'rtl' }} key={page.path} component={Link} to={page.path} onClick={() => setOpenDrawer(false)}>
                                            <ListItemText primary={page.label} />
                                        </ListItem>
                                    )
                                ))}
                                
                                <UserMenu user={user} onLogout={onLogout} setOpenDrawer={setOpenDrawer} />
                                
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <Stack direction="row" color={theme.palette.primary.text}>
                        {pages.map((page) => (
                            (page.adminOnly && !user?.isAdmin) ? null : (
                                <Button key={page.path} component={Link} to={page.path} color="inherit" sx={{ fontWeight: 500, '&:hover': { color: theme.palette.primary.main }, marginInlineEnd: 3 }} >
                                    {page.label}
                                </Button>
                            )
                        ))}

                        <UserMenu user={user} onLogout={onLogout} />

                        {!showSearch ? (
                            <IconButton onClick={() => setShowSearch(true)} color="inherit">
                                <SearchIcon />
                            </IconButton>
                        ) : (
                            <>
                                <SearchBar />
                                <IconButton onClick={() => setShowSearch(false)} color="inherit">
                                    <CloseIcon />
                                </IconButton>
                            </>
                        )}
                    </Stack>
                )}
            </Box>
        </AppBar>
    )
}

export default NavBar

import { useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import ROUTES from '../../routes/routesModel'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import Collapse from '@mui/material/Collapse'

const pages = [
    { label: 'בית', path: ROUTES.ROOT },
    { label: 'מתכונים', path: ROUTES.RECIPE }
]

const NavBar = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <AppBar position="sticky" elevation={0} sx={{ background: 'transparent', py: 3, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Box sx={{ backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.2)', transition: 'all 0.3s ease-in-out', borderRadius: '16px', boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)', maxWidth: '1680px', mx: 'auto', px: 3, py: 1.5, width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Typography component={Link} to={ROUTES.ROOT} variant="h5" sx={{ fontFamily: 'Karantina', fontWeight: 700, color: '#1d1d1f', '&:hover': { color: '#1d1d1f' }, textDecoration: 'none' }}>
                    🍽️ BisBook
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton onClick={() => setOpenDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                            <List sx={{ width: '80vw', minWidth: '200px', maxWidth: '600px' }}>
                                {pages.map((page) => (
                                    <ListItem button sx={{ textAlign: 'right', direction: 'rtl' }} key={page.path} component={Link} to={page.path} onClick={() => setOpenDrawer(false)}>
                                        <ListItemText primary={page.label} />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <Stack direction="row" spacing={3} color="#1d1d1f">
                        {pages.map((page) => (
                            <Button key={page.path} component={Link} to={page.path} color="inherit" sx={{ fontWeight: 500, '&:hover': { color: '#1d1d1f' } }} >
                                {page.label}
                            </Button>
                        ))}

                        {!showSearch ? (
                            <IconButton onClick={() => setShowSearch(true)} color="inherit">
                                <SearchIcon />
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => setShowSearch(false)} color="inherit">
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Stack>
                )}
            </Box>
        </AppBar>
    )
}

NavBar.propTypes = {}

export default NavBar

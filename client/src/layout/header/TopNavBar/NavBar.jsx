import React, { useState } from "react"
import { AppBar, Toolbar, Typography, Button, IconButton, Box, InputBase, useTheme, useMediaQuery, Menu, Fade } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import DrawerBox from './DrawerBox'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import ROUTES from '../../../routes/routesModel'
import { useUser } from "../../../users/providers/UserProvider"
import useUsers from "../../../users/hooks/useUsers"
import MenuLink from '../../../routes/components/MenuLink'


const NavBar = ({menuItems}) => {

    const [searchMode, setSearchMode] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const isOpen = Boolean(anchorEl)
    const { user } = useUser()
    const { handleLogout } = useUsers()
    
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    
    const handleSearchClick = () => {
        setSearchMode(true);
    }
    
    const handleSearchClose = () => {
        setSearchMode(false);
        setSearchValue('');
    }

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onLogout = () => {
        handleLogout()
        handleClose()
    }
    
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return(
        <>
        <AppBar position="fixed" sx={{ backgroundColor: 'unset', color: '#1d1d1f', boxShadow: 'none', top: '16px' }}>
            <Toolbar sx={{ justifyContent: 'center', minHeight: 64 }}>
                <Box sx={{ overflow: 'hidden', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', borderRadius: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: isMobile ? 'calc(100% / 12 * 11)' : 'calc(100% / 12 * 9)', maxWidth: '1680px', py: 1, px: 3 }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {isMobile ? (
                            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        ) : null}
                    </Box>

                    <Typography variant="h6" component={Link} to={ROUTES.HOME} sx={{ fontWeight: 'bold', display: (searchMode && isMobile) ? 'none' : 'flex' }}>מתכונים</Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        {searchMode? (
                            <Fade in={searchMode} timeout={500}>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '680px' }}>
                                    <InputBase autoFocus placeholder="חיפוש..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} sx={{ color: '1d1d1f', backgroundColor: '#fbfbfd', borderRadius: 1, px: 2, py: 0.5, width: '100%' }} />
                                    {/* <Button onClick={handleSearchClose} sx={{ mr: 2, color: "inherit" }}><SearchIcon /></Button> */}
                                    <Button onClick={handleSearchClose} sx={{ mr: 2, color: "#8e8e93" }}><CancelIcon /></Button>
                                </Box>
                            </Fade>
                        ) : (
                            <>
                            {!isMobile && (
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {menuItems.map((item)=>{
                                        return(
                                            <Button key={item.text} onClick={() => navigate(item.link)} color="inherit" sx={{ textTransform: 'none' }}>
                                                <Box sx={{ borderBottom: '1px solid transparent', borderColor: location.pathname === item.link ? '#b4b4b4' : 'transparent', paddingInline: '4px' }}>
                                                    {item.text}
                                                </Box>
                                            </Button>
                                        )
                                    })}
                                </Box>
                            )}
                            </>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!searchMode && (
                            <IconButton color="inherit" onClick={handleSearchClick}>
                                <SearchIcon />
                            </IconButton>
                        )}
                        {!searchMode && 
                            <IconButton color="inherit" onClick={handleUserClick}>
                                <AccountCircle />
                            </IconButton>
                        }

                        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }} dir="rtl">
                            {!user && [
                                <MenuLink key="signup" navigateTo={ROUTES.SIGNUP} onClick={handleClose} text="הרשמה" />,
                                <MenuLink key="login" navigateTo={ROUTES.LOGIN} onClick={handleClose} text="התחברות" />
                            ]}

                            {user && [
                                <MenuLink key="update-profile" navigateTo={`${ROUTES.UPDATE}/${user._id}`} onClick={handleClose} text="עדכון פרופיל" />,
                                <MenuLink key="logout" onClick={onLogout} text="התנתקות" />
                            ]}
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>

        <DrawerBox menuItems={menuItems} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} navigate={navigate}/>
        <Box sx={{ height: '80px' }}></Box>
        </>    
    )
}

export default NavBar
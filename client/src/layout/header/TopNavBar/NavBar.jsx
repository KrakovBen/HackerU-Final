import React, { useState } from "react"
import { AppBar, Toolbar, Typography, Button, IconButton, Box, InputBase, useTheme, useMediaQuery } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import DrawerBox from './DrawerBox'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import ROUTES from '../../../routes/routesModel'

const NavBar = ({menuItems}) => {

    const [searchMode, setSearchMode] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [drawerOpen, setDrawerOpen] = useState(false)
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
    
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return(
        <>
        <AppBar position="fixed" sx={{ backgroundColor: 'unset', color: '#1d1d1f', boxShadow: 'none', top: '16px' }}>
            <Toolbar sx={{ justifyContent: 'center', minHeight: 64 }}>
                <Box sx={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', borderRadius: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'calc(100% / 12 * 10)', maxWidth: '1680px', py: 1, px: 3 }}>

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
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '500px' }}>
                                <InputBase autoFocus placeholder="חיפוש..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} sx={{ color: '1d1d1f', backgroundColor: '#fbfbfd', borderRadius: 1, px: 2, py: 0.5, width: '100%' }} />
                                <Button onClick={handleSearchClose} color="inherit" sx={{ mr: 2 }}>ביטול</Button>
                            </Box>
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
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
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
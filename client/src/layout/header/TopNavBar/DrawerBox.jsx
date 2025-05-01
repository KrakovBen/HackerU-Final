import React from "react"
import { Drawer } from "@mui/material"
import { Box } from "@mui/material"
import { Button } from "@mui/material"

const DrawerBox = ({menuItems, drawerOpen, setDrawerOpen, navigate}) => {
    return(
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: '90%', backgroundColor: '#fff', p: 3, direction: 'rtl' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {menuItems.map((item) => (
                <Button key={item.text} sx={{ justifyContent: 'flex-start', fontSize: '1.2rem' }} onClick={() => {navigate(item.link); setDrawerOpen(false)}}>
                    {item.text}
                </Button>
                ))}
            </Box>
        </Drawer>
    )
}

export default DrawerBox

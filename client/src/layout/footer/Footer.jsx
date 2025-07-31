import React from 'react'
import Container from '@mui/material/Container'
import { Box, Grid, Typography } from '@mui/material'

const Footer = () => {
    return (
        <Container maxWidth={false} sx={ { backgroundColor: '#000', color: '#fbfbfd', py: 4, mt: 4, width: '100%', maxWidth: '1680px', mx: 'auto', px: 3 } }>
            <Container maxWidth='1680px' sx={{ mt: 4, mx: '25px', width: '90vw' }}>
                <Box>
                    <Grid container sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 6, my: 2 }}>
                        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                            <Typography variant='h5' component='h2'>BisBook</Typography>
                            <Typography variant='body1' component='p'>BisBook הוא אתר שמציג מתכונים לפי קטגוריה.</Typography>
                        </Grid>
                        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                            <Typography variant='h5' component='h2'>מידע</Typography>
                        </Grid>
                        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                            <Typography variant='h5' component='h2'>יצירת קשר</Typography>
                            <Typography variant='body1' component='p'><span style={{ fontWeight: 700 }}>כתובת אי-מייל</span> Admin@gmail.com</Typography>
                            <Typography variant='body1' component='p'><span style={{ fontWeight: 700 }}>מספר טלפון</span> 050-123-4567</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Container>
    )
}

Footer.propTypes = {}

export default Footer

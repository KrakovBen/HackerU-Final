import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ROUTES from './../routes/routesModel'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <Container maxWidth={false}>
            <Typography variant='h1' fontWeight={700}>הדף לא נמצא</Typography>

            <Grid container spacing={2}>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 8' } }}>
                    <Typography variant='body1'  color='initial'>
                        אופס... נראה שהלינק שביקשת לא קיים או שהמנה הלכה לאיבוד בדרך 👨🏻‍🍳
                    </Typography>
                    <Button variant='contained' color='primary' onClick={()=>navigate(ROUTES.ROOT)}>
                        חזרה לדף הבית
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ErrorPage

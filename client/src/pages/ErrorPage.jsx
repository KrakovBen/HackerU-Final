import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <Typography variant="h1">ErrorPage</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                <Typography variant="h5" color="initial">
                    Oops... The requested URL was not found on this server
                </Typography>
                <Button variant="text" color="primary" onClick={()=>navigate(ROUTES.CARDS)}>
                    Click here to return to the home page...
                </Button>
                </Grid>
                <Grid item xs={12} md={4} justifyContent="center">
                <img
                    width="100%"
                    src="/assets/images/broken-robot.png"
                    alt="broken robot"
                />
                </Grid>
            </Grid>
        </Container>
    )
}

ErrorPage.propTypes = {}

export default ErrorPage

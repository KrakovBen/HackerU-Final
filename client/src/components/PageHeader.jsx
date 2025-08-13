import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { string, object } from 'prop-types'
import { useNavigate } from 'react-router-dom'

const PageHeader = ({ title, subtitle, button }) => {
    const navigate = useNavigate()

    return (
        <>
            <Container disableGutters maxWidth={false} sx={{ maxWidth: '1680px', mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box pt={2}>
                    <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>{title}</Typography>
                    <Typography variant="h5" component="h2">{subtitle}</Typography>
                </Box>
                <Box>
                    {button ?  <Button onClick={() => navigate(button.path)} variant="outlined" sx={{ fontWeight: 700 }} color='primary'>{button.text}</Button> : null}
                </Box>
            </Container>
            <Divider sx={{ my: 2 }} />
        </>
    )
}

PageHeader.propTypes = {
    title: string.isRequired,
    subtitle: string.isRequired,
    button: object
}

export default PageHeader

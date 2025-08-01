import React from 'react'
import { node, func, string, number, object } from 'prop-types'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import FormButton from './FormButton'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import LoopIcon from '@mui/icons-material/Loop'

const Form = ({ title, onSubmit, onReset, onChange, to, color, spacing, styles, children }) => {
    const navigate = useNavigate()

    return (
        <Box component='form' color={color} sx={{ mt: 2, p: { xs: 1, sm: 2 }, ...styles }} onSubmit={onSubmit} autoComplete='off' noValidate>
            <Typography align='center' variant='h5' component='h1' mb={2}>
                {title.toUpperCase()}
            </Typography>

            <Grid container display='grid' spacing={spacing}>
                {children}
            </Grid>

            <Grid container sx={{ display: 'grid', gridTemplateColumns: {xs: 'repeat(1, 1fr)', sm: 'repeat(12, 1fr)'}, gap: 1, my: 2 }}>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                    <FormButton node='ביטול' color='error' component='div' variant='outlined' onClick={() => navigate(to)} />
                </Grid>

                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                    <FormButton node={<LoopIcon />} variant='outlined' component='div' onClick={onReset} />
                </Grid>

                <Grid sx={{ gridColumn: 'span 12' }}>
                    <FormButton node='שליחה' onClick={onSubmit} disabled={!!onChange()} size='large' />
                </Grid>
            </Grid>
        </Box>
    )
}

Form.propTypes = {
    children: node.isRequired,
    onSubmit: func.isRequired,
    color: string.isRequired,
    to: string.isRequired,
    spacing: number.isRequired,
    onReset: func.isRequired,
    onChange: func.isRequired,
    title: string.isRequired,
    styles: object.isRequired,
}

Form.defaultProps = {
    color: 'inherit',
    to: '/',
    spacing: 1,
    title: '',
    styles: {},
}

export default React.memo(Form)
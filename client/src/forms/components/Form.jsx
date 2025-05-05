import React from 'react'
import { node, func, string, number, object } from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import LoopIcon from '@mui/icons-material/Loop'
import FormButton from './FormButton'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const Form = ({ title, onSubmit, onReset, onChange, to, color, spacing, styles, children, submitText }) => {
    const navigate = useNavigate()

    return (
        <Box component="form" color={color} sx={{ mt: 2, p: { xs: 1, sm: 2 }, ...styles }}  onSubmit={onSubmit} autoComplete="off" noValidate>
            <Typography align="center" variant="h5" component="h1" mb={2}>
                {title.toUpperCase()}
            </Typography>

            <Grid container spacing={spacing}>
                {children}
            </Grid>

            <Grid container spacing={1} my={2} direction="row" width="100">
                <Grid item size={{ xs: 12, sm: 6}}>
                    <FormButton node={submitText || "שליחה"} color="primary" component="div" onClick={onSubmit} variant="contained" disabled={!!onChange()} size="large"/>
                </Grid>
                <Grid item size={{ xs: 6, sm: 3}}>
                    <FormButton node="איפוס" color="#737373" component="div" variant="outlined" onClick={onReset} size="large"/>
                </Grid>
                <Grid item size={{ xs: 6, sm: 3}}>
                    <FormButton node="ביטול" color="#737373" component="div" variant="outlined" onClick={() => navigate(to)} size="large"/>
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
    styles: object.isRequired
}

Form.defaultProps = {
    color: "inherit",
    to: "/",
    spacing: 1,
    title: "",
    styles: {},
}

export default React.memo(Form)
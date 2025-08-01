import React from 'react'
import { string, bool, object, func } from 'prop-types'
import TextField from '@mui/material/TextField'
import { makeFirstLetterCapital } from '../../utils/algoMethods'
import Grid from '@mui/material/Grid'

const Input = ({ variant, type, name, data, label, required, error, onChange, ...rest }) => {
    return (
        <Grid sx={{ gridColumn: 'span 12', mt: 2 }} {...rest}>
            <TextField variant={variant} label={makeFirstLetterCapital(label)} type={type} id={name} name={name} value={data[name] ? data[name] : ''} required={required} helperText={error} error={Boolean(error)} onChange={onChange} fullWidth autoComplete='off' dir="rtl" />
        </Grid>
    )
}

Input.propTypes = {
    name: string.isRequired,
    required: bool.isRequired,
    type: string.isRequired,
    error: string,
    onChange: func.isRequired,
    variant: string,
    data: object,
}

Input.defaultProps = {
    required: true,
    type: 'text',
    variant: 'standard',
}

export default React.memo(Input)
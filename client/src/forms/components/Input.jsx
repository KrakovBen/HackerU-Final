import React from 'react'
import { string, bool, func, object } from 'prop-types'
import { Grid, TextField } from '@mui/material'
import { makeFirstLetterCapital } from "../utils/algoMethods"

function Input({ variant, label, type, name, data, required, error, onChange, ...rest }) {
    return (
        <Grid item size={12} {...rest}>
            <TextField variant={variant} label={makeFirstLetterCapital(label)} type={type} id={name} name={name} value={data[name] ? data[name] : ""} required={required} helperText={error} error={Boolean(error)} onChange={onChange} fullWidth autoComplete="off" InputLabelProps={{ sx: { right: 0, left: "auto", transformOrigin: "right" } }}/>
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
    data: object
}

Input.defaultProps = {
    required: true,
    type: "text",
    variant: "outlined"
}

export default Input

import React from 'react'
import { string, bool, object, func } from 'prop-types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'

const Input = ({ variant, type, name, data, label, required, error, onChange, ...rest }) => {
    return (
        <Grid sx={{ gridColumn: 'span 12' }} {...rest}>
            <Typography variant='h6' component='p'>{required ? `${label} *` : label}</Typography>
            <InputBase id={name} variant={variant} name={name} type={type} value={data?.[name] ? data[name] : ''} onChange={onChange} required={required} fullWidth sx={{ borderBottom: '1px solid', borderColor: error ? 'error.main' : 'grey.400', '&:focus-within': { borderColor: 'primary.main' } }}/>
                                    
            <Box sx={{ minHeight: 20 }}>
                {error && (
                    <Typography sx={{ fontSize: 12 }} variant="caption" color="error">
                        {error}
                    </Typography>
                )}
            </Box>
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
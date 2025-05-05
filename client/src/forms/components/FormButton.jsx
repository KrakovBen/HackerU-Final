import React from 'react'
import { string, bool, node, func, object } from 'prop-types'
import { Button } from '@mui/material'

function FormButton({ variant, component, size, color, onClick, disabled, node, style }) {
    return (
        <Button sx={{ borderRadius: 2, boxShadow: 0, '&:hover': { boxShadow: 0 }, ...style }} variant={variant} component={component} size={size} color={color} onClick={onClick} disabled={disabled} fullWidth>{node}</Button>
    )
}

FormButton.propTypes = {
    variant: string.isRequired,
    component: string.isRequired,
    size: string.isRequired,
    color: string.isRequired,
    onClick: func.isRequired,
    disabled: bool.isRequired,
    node: node.isRequired,
    style: object.isRequired
}

FormButton.defaultProps = {
    variant: "contained",
    component: "button",
    size: "medium",
    color: "primary",
    disabled: false,
    style: {}
}

export default FormButton

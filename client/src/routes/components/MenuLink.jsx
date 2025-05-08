import React from 'react'
import { string, func } from 'prop-types'
import NavBarLink from './NavBarLink'
import { MenuItem } from '@mui/material'

const MenuLink = ({ text, navigateTo, onClick, styles }) => {
    return (
        <NavBarLink to={navigateTo}>
            <MenuItem sx={{ ...styles }} onClick={onClick}>{text}</MenuItem>
        </NavBarLink>
    )
}

MenuLink.propTypes = {
    navigateTo: string.isRequired,
    onClick: func.isRequired,
    text: string.isRequired
}

MenuLink.defaultProps = {
    styles: {},
}

export default MenuLink

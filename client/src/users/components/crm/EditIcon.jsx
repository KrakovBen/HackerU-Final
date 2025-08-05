import React, { useState } from 'react'
import { func, object } from 'prop-types'
import { IconButton } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const EditIcon = ({ onAdmin, user }) => {
    const [isAdmin, setIsAdmin] = useState(user.isAdmin)

    const handleToggleAdmin = async () => {
        setIsAdmin(!isAdmin)
        await onAdmin(user._id)
    }
    return (
        <IconButton aria-label="edit" onClick={handleToggleAdmin}>
            <AdminPanelSettingsIcon color={isAdmin ? "primary" : "inherit"} />
        </IconButton>
    )
}

EditIcon.propTypes = {
    onAdmin: func.isRequired,
    user: object.isRequired
}

export default EditIcon

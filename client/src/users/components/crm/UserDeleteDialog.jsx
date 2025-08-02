import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { bool, func } from 'prop-types'

const UserDeleteDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ fontSize: '32px', fontWeight: 600 }}>אישור מחיקה</DialogTitle>
            <DialogContent sx={{ fontSize: '21px', fontWeight: 400, letterSpacing: '0.02em' }}>
                האם אתה בטוח שברצונך למחוק משתמש זה?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>ביטול</Button>
                <Button onClick={onClose} color="error">
                    מחיקה
                </Button>
            </DialogActions>
        </Dialog>
    )
}

UserDeleteDialog.propTypes = {
    open: bool.isRequired,
    onClose: func.isRequired
}

export default UserDeleteDialog
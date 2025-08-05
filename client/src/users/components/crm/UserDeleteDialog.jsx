import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { bool, func } from 'prop-types'

const UserDeleteDialog = ({ isDialogOpen, onChangeDialog, onDelete }) => {
    return (
        <Dialog open={isDialogOpen} onClose={onChangeDialog}>
            <DialogTitle sx={{ fontSize: '32px', fontWeight: 600 }}>אישור מחיקה</DialogTitle>
            <DialogContent sx={{ fontSize: '21px', fontWeight: 400, letterSpacing: '0.02em' }}>
                האם אתה בטוח שברצונך למחוק משתמש זה?
            </DialogContent>
            <DialogActions>
                <Button onClick={onChangeDialog}>ביטול</Button>
                <Button onClick={onDelete} color="error">
                    מחיקה
                </Button>
            </DialogActions>
        </Dialog>
    )
}

UserDeleteDialog.propTypes = {
    isDialogOpen: bool.isRequired,
    onChangeDialog: func.isRequired,
    onDelete: func.isRequired
}

export default UserDeleteDialog
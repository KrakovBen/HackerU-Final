import React, { useState } from 'react'
import { TableBody, TableRow, TableCell } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../routes/routesModel'
import { Tooltip, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import UserDeleteDialog from './UserDeleteDialog'
import EditIcon from './EditIcon'

const UserList = ({ users, onDelete, onAdmin }) => {
    const [deleteUser, setDeleteUser] = useState('')
    const [isDialogOpen, setDialog] = useState(false)
    const navigate = useNavigate()

    const handleDialog = (term, id) => {
        if (term === "open") {
            setDeleteUser(id)
            return setDialog(true)
        }
        setDialog(false)
    }

    const handleDeleteUser = () => {
        handleDialog()
        onDelete(deleteUser)
    }

    return (
        <>
        <TableBody>
            {users.map(row => (                
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right">{row.name.first} {row.name.last}</TableCell>
                    <TableCell align="right" component="th" scope="row" onClick={()=>{navigate(`${ROUTES.USER_PROFILE}/${row._id}`)}}>{row.email}</TableCell>
                    <TableCell align="right">
                        <Tooltip title={row.isAdmin ? 'אתה לא מורשה למחוק את המשתמש הזה' : 'מחיקה'}>
                            <IconButton aria-label="delete" onClick={()=>handleDialog("open", row._id)} disabled={row.isAdmin}>
                                <DeleteIcon color={row.isAdmin ? "inherit" : "error"} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={row.isAdmin ? 'הסרת הרשאות ניהול' : 'הוספת הרשאות ניהול'}>
                            <EditIcon onAdmin={onAdmin} user={row} />
                        </Tooltip>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>

        <UserDeleteDialog isDialogOpen={isDialogOpen} onChangeDialog={handleDialog} onDelete={handleDeleteUser} />
        </>
    )
}

UserList.propTypes = {}

export default UserList

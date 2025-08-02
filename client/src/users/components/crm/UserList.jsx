import React, { useState } from 'react'
import { TableBody, TableRow, TableCell } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../routes/routesModel'
import { Tooltip, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import UserDeleteDialog from './UserDeleteDialog'

const UserList = ({ users, onDelete }) => {
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
                        <Tooltip title={row.isAdmin ? 'You are not allowed to DELETE this user' : 'Delete User'}>
                            <IconButton aria-label="delete" onClick={()=>handleDialog("open", row._id)} disabled={row.isAdmin}>
                                <DeleteIcon color={row.isAdmin ? "inherit" : "error"} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={row.isAdmin ? 'You are not allowed to EDIT this user' : 'Edit User'}>
                            <IconButton aria-label="edit" onClick={()=>{}} disabled={row.isAdmin}>
                                <EditIcon color={row.isAdmin ? "inherit" : "primary"} />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>

        <UserDeleteDialog open={isDialogOpen} onClose={handleDialog} />
        </>
    )
}

UserList.propTypes = {}

export default UserList

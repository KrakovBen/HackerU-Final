import React from 'react'
import { bool, string, arrayOf, func } from 'prop-types'
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell } from '@mui/material'
import UserList from './UserList'
import Spinner from '../../../components/Spinner'
import userType from '../../models/types/userType'

const CRM_Feedback = ({ isLoading, error, users, onDelete, onAdmin }) => {
    const style = { fontSize: { xs: 13, md: 16 }, letterSpacing: { xs: 0.02, md: 0.04 } }
    
    if (isLoading) return ( <Spinner /> )
    if (error) return ( <Typography>{error}</Typography> )

    if (users && !users.length) return (
        <Typography my={15} variant="h6" textAlign="center">אופס... נראה שאין משתמשים להצגה</Typography>
    )
    
    if (users && !!users.length) return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right" sx={style}>שם מלא</TableCell>
                        <TableCell align="right" sx={style}>כתובת Email</TableCell>
                        <TableCell align="right" sx={style}>פעולות</TableCell>
                    </TableRow>
                </TableHead>

                <UserList users={users} onDelete={onDelete} onAdmin={onAdmin} style={style}></UserList>
            </Table>
        </TableContainer>
    )
}

CRM_Feedback.propTypes = {
    isLoading: bool.isRequired,
    error: string,
    users: arrayOf(userType).isRequired,
    onDelete: func.isRequired
}

export default CRM_Feedback

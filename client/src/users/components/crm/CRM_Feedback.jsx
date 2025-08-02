import React from 'react'
import { bool, string, arrayOf, func } from 'prop-types'
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell } from '@mui/material'
import UserList from './UserList'

const CRM_Feedback = ({ isLoading, error, users }) => {
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    if (users && !users.length) return (
        <Typography my={15} variant="h6" textAlign="center">אופס... נראה שאין משתמשים להצגה</Typography>
    )
    
    if (users && !!users.length) return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">שם מלא</TableCell>
                        <TableCell align="right">כתובת Email</TableCell>
                        <TableCell align="right">פעולות</TableCell>
                    </TableRow>
                </TableHead>
                <UserList users={users}></UserList>
            </Table>
        </TableContainer>
    )
}

CRM_Feedback.propTypes = {
    isLoading: bool.isRequired,
    error: string,
    // users: arrayOf(userListType),
    onDelete: func.isRequired
}

export default CRM_Feedback

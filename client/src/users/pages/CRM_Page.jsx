import React, { useEffect } from 'react'
import { useUser } from '../providers/UserProvider'
import useUsers from '../hooks/useUsers'
import { Navigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import { Container } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import CRM_Feedback from '../components/crm/CRM_Feedback'

const CRM_Page = () => {
    const { user } = useUser()
    const { handleGetAllUsers, handleDeleteUser, handleToggleAdmin, value } = useUsers()
    const { filteredUsers, isLoading, error } = value

    useEffect(()=>{
        handleGetAllUsers()
    }, [])

    const onDeleteUser = async (userId) => {
        await handleDeleteUser(userId)
        await handleGetAllUsers()
    }

    const onToggleAdmin = async (userId) => {
        await handleToggleAdmin(userId)
    }

    if (!user || !user.isAdmin) return <Navigate replace to={ROUTES.ROOT} />

    return (
        <Container>
            <PageHeader title='משתמשים' subtitle='ניהול משתמשים' />
            <CRM_Feedback isLoading={isLoading} error={error} users={filteredUsers} onDelete={onDeleteUser} onAdmin={onToggleAdmin} />
        </Container>
    )
}

export default CRM_Page
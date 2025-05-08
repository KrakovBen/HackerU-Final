import React from 'react'
import PropTypes from 'prop-types'
import { useUser } from '../../users/providers/UserProvider'
import useUsers from '../hooks/useUsers'
import useForms from '../../forms/hooks/useForms'
import { Navigate, useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import { Box, Container } from '@mui/material'
import UpdateUserForm from '../components/UpdateUserForm'

const UpdatePage = () => {
    const { user } = useUser()
    const { handleUpdate } = useUsers()
    const { value, ...rest } = useForms()

    const navigate = useNavigate()

    console.log(user);
    

    if (!user) return <Navigate replace to={ROUTES.LOGIN} />

    return (
        <>
        <Box></Box>
        <Container sx={{ padding: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <UpdateUserForm title="עדכון פרטים" onSubmit={()=>{}} onReset={()=>{}} onFormChange={()=>{}} onInputChange={()=>{}} setData={()=>{}} errors={()=>{}} data={()=>{}}/>
        </Container>
        </>
    )
}

UpdatePage.propTypes = {}

export default UpdatePage

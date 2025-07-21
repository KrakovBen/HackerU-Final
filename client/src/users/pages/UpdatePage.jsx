import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useUser } from '../../users/providers/UserProvider'
import useUsers from '../hooks/useUsers'
import useForms from '../../forms/hooks/useForms'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import { Box, Container } from '@mui/material'
import UpdateUserForm from '../components/UpdateUserForm'
import initialEditUserForm from '../helpers/initialForms/initialEditUserForm'
import editUserSchema from '../models/joi-schema/editUserSchema'
import mapUserToMadel from '../helpers/normalization/mapUserToMadel'

const UpdatePage = () => {
    const { user_id } = useParams()
    const { user } = useUser()
    const { handleUpdate, handleGetUser } = useUsers()
    const { value, ...rest } = useForms( initialEditUserForm, editUserSchema, handleUpdate )
    const navigate = useNavigate()    

    if (!user) return <Navigate replace to={ROUTES.LOGIN} />
    
    useEffect( ()=>{
        handleGetUser(user_id).then( data => {            
            if (user._id !== data._id) return navigate(ROUTES.HOME)
            const modeledUser = mapUserToMadel(data)
            rest.setData(modeledUser)
            console.log(modeledUser)
        } )
    }, [] )

    return (
        <>
        <Box></Box>
        <Container sx={{ padding: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <UpdateUserForm title="עדכון פרטים" onSubmit={()=>{}} onReset={()=>{}} onFormChange={()=>{}} onInputChange={()=>{}} setData={rest.setData} errors={()=>{}} data={value.data}/>
        </Container>
        </>
    )
}

UpdatePage.propTypes = {}

export default UpdatePage

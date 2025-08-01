import React from 'react'
import { useUser } from '../providers/UserProvider'
import useUsers from '../hooks/useUsers'
import initialLoginForm from '../helpers/initialForms/initialLoginForm'
import useForm from './../../forms/hooks/useForm'
import { Navigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import { Container } from '@mui/material'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'

const LoginPage = () => {
    const { user } = useUser()
    const { handleLogin } = useUsers()

    const { value, ...rest } = useForm(initialLoginForm, null, handleLogin)

    if (user) return <Navigate replace to={ROUTES.ROOT} />
    
    return (
        <Container sx={{ paddingTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form onSubmit={rest.onSubmit} onReset={rest.handleReset} onChange={rest.validateForm} title='התחברות' styles={{ maxWidth: "650px", width: "80vw" }} to={ROUTES.ROOT}>
                <Input label='כתובת Email' name='email' type='email' error={value.errors.email} data={value.data} onChange={rest.handleChange} />
                <Input label='סיסמה' name='password' type='password' error={value.errors.password} data={value.data} onChange={rest.handleChange} />
            </Form>
        </Container>
    )
}

export default LoginPage
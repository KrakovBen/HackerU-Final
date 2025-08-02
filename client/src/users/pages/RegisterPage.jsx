import React from 'react'
import useUsers from '../hooks/useUsers'
import useForm from '../../forms/hooks/useForm'
import initialSignupForm from '../helpers/initialForms/initialSignupForm'
import signupSchema from '../models/joi-schema/signupSchema'
import { useUser } from '../providers/UserProvider'
import { Navigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import { Container } from '@mui/material'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const RegisterPage = () => {
    const { handleSignup } = useUsers()
    const { value, ...rest } = useForm(initialSignupForm, signupSchema, handleSignup)

    const { user } = useUser()

    if (user) return <Navigate replace to={ROUTES.ROOT} />

    return (
        <>
            <Container>
                <Form onSubmit={rest.onSubmit} onReset={rest.handleReset} onChange={rest.validateForm} title='הרשמה' styles={{ maxWidth: "650px", width: "80vw", margin: "auto" }} to={ROUTES.ROOT}>
                    <Input label='שם פרטי' name='firstName' type='text' error={value.errors.firstName} data={value.data} onChange={rest.handleChange} sx={{ gridColumn: 'span 6', marginLeft: 1 }} />
                    <Input label='שם משפחה' name='lastName' type='text' error={value.errors.lastName} data={value.data} onChange={rest.handleChange} sx={{ gridColumn: 'span 6' }} />
                    <Input label='כתובת Email' name='email' type='email' error={value.errors.email} data={value.data} onChange={rest.handleChange} />
                    <Input label='סיסמה' name='password' type='password' error={value.errors.password} data={value.data} onChange={rest.handleChange} />
                </Form>
            </Container>

            <Typography textAlign='center' sx={{ mt: 2 }}>כבר יש לך חשבון? <Link href={ROUTES.LOGIN}>התחבר עכשיו</Link></Typography>
        </>
    )
}

export default RegisterPage
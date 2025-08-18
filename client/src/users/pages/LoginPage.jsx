import React, { useState } from 'react'
import { useUser } from '../providers/UserProvider'
import useUsers from '../hooks/useUsers'
import initialLoginForm from '../helpers/initialForms/initialLoginForm'
import useForm from './../../forms/hooks/useForm'
import { Navigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import { Container, Typography } from '@mui/material'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import Link from '@mui/material/Link'
import loginSchema from '../models/joi-schema/loginSchema'
import otpSchema from '../models/joi-schema/otpSchema'
import Spinner from '../../components/Spinner'
import { useLocation } from 'react-router-dom'

const LoginPage = () => {
    const { state } = useLocation() || {}
    const { user } = useUser()
    const { handleLogin, handleVerifyOtp, value } = useUsers()
    const [ mode, setMode ] = useState(state?.startInOtp ? 'otp' : 'password')
    const [ txId, setTxId ] = useState(state?.txId || null)
    const { isLoading } = value
    
    const submitLogin = async (data) => {
        const res = await handleLogin(data)
        if (res) {
            setTxId(res.txId)
            setMode('otp')
        }
    }
    
    const login = useForm(initialLoginForm, loginSchema, submitLogin)
    const otp = useForm({ otp: '' }, otpSchema, ({ otp }) => handleVerifyOtp({ txId, code: otp }))
    
    if (user) return <Navigate replace to={ROUTES.ROOT} />
    
    return (
        <>
        <Container sx={{ paddingTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isLoading ? <Spinner /> : (
            <Form
                onSubmit={mode === 'password' ? login.onSubmit : otp.onSubmit}
                onReset={mode === 'password' ? login.handleReset : otp.handleReset}
                onChange={mode === 'password' ? login.validateForm : otp.validateForm}
                title={mode === 'password' ? 'התחברות' : 'אימות דו־שלבי'}
                styles={{ maxWidth: "650px", width: "80vw" }}>
                    {mode === 'password' ? (
                        <>
                            <Input label='כתובת Email' name='email' type='email' error={login.value.errors.email} data={login.value.data} onChange={login.handleChange} />
                            <Input label='סיסמה' name='password' type='password' error={login.value.errors.password} data={login.value.data} onChange={login.handleChange} />
                        </>
                    ) : (
                        <Input label='קוד אימות' name='otp' type='text' error={otp.value.errors?.otp} data={otp.value.data} onChange={otp.handleChange} />
                    )}
            </Form>
            )}
            </Container>
            <Typography textAlign='center' sx={{ mt: 2 }}>אין לך חשבון? <Link href={ROUTES.REGISTER}>הירשם עכשיו</Link></Typography>
            </>
            
        )
    }
    
export default LoginPage
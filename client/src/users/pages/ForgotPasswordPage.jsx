import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { useUser } from '../providers/UserProvider'
import Spinner from '../../components/Spinner'
import useUsers from '../hooks/useUsers'
import { useLocation } from 'react-router-dom'
import Form from '../../forms/components/Form'
import Input from '../../forms/components/Input'
import useForm from '../../forms/hooks/useForm'
import emailSchema from '../models/joi-schema/emailSchema'
import otpSchema from '../models/joi-schema/otpSchema'
import passwordSchema from '../models/joi-schema/passwordSchema'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import { Navigate } from 'react-router-dom'

const ForgotPasswordPage = () => {
    const navigate = useNavigate()
    const { state } = useLocation() || {}
    const { user } = useUser()
    const { value, handleGetUserByEmail, handleVerifyOtp, handleUpdatePassword } = useUsers()
    const { isLoading } = value
    const [ mode, setMode ] = useState(state?.startInOtp ? 'otp' : 'email')
    const [ txId, setTxId ] = useState(state?.txId || null)

    const sumbitEmailCheck = async (data) => {
        const res = await handleGetUserByEmail(data)
        if (res) {
            setTxId(res.txId)
            setMode('otp')
        }
    }

    useEffect(() => {
        document.title = 'שכחת סיסמה | BisBook'
    }, [])

    const submitOtp = async (data) => {
        const res = await handleVerifyOtp(data)
        if (res) {
            setMode('password')
        }
    }

    const submitPasswordChange = async (data) => {
        const res = await handleUpdatePassword(data.password, data.verifyPassword, user._id)
        if (res) {
            navigate(ROUTES.ROOT)
        }
    }

    const email = useForm({email: ''}, emailSchema, sumbitEmailCheck)
    const otp = useForm({otp: ''}, otpSchema, ({otp}) => submitOtp({txId, code: otp}))
    const password = useForm({password: '', verifyPassword: ''}, passwordSchema, submitPasswordChange)

    if(user&& (mode ==='email')) return <Navigate replace to={ROUTES.ROOT} />
    
    return (
        <Container sx={{ paddingTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isLoading ? <Spinner /> : (
                <Form title='שכחת סיסמה' styles={{ maxWidth: "650px", width: "80vw" }}
                onSubmit={mode === 'email' ? email.onSubmit : mode === 'otp' ? otp.onSubmit : password.onSubmit}
                onReset={mode === 'email' ? email.handleReset : mode === 'otp' ? otp.handleReset : password.handleReset}
                onChange={mode === 'email' ? email.validateForm : mode === 'otp' ? otp.validateForm : password.validateForm}>
                    {mode === 'email' ? (
                        <Input label='כתובת Email' name='email' type='email' error={email.value.errors.email} data={email.value.data} onChange={email.handleChange} />
                    ) : mode === 'otp' ? (
                        <Input label='קוד אימות' name='otp' type='text' error={otp.value.errors?.otp} data={otp.value.data} onChange={otp.handleChange} />
                    ) : (
                        <>
                        <Input label='סיסמה חדשה' name='password' type='password' error={password.value.errors?.password} data={password.value.data} onChange={password.handleChange} />
                        <Input label='אימות סיסמה חדשה' name='verifyPassword' type='password' error={password.value.errors?.verifyPassword} data={password.value.data} onChange={password.handleChange} />
                        </>
                    )}
                </Form>
            )}  
        </Container>
    )
}

export default ForgotPasswordPage
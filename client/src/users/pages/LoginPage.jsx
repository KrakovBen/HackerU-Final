import React from 'react'
import PropTypes from 'prop-types'
import Container from '@mui/material/Container'
import { Navigate, useNavigate } from 'react-router-dom'
import UserLoginSignupForm from '../components/UserLoginSignupForm'
import useUsers from '../hooks/useUsers'
import signupSchema from '../models/joi-schema/signupSchema'
import initialSignupForm from '../helpers/initialForms/initialSignupForm'
import useForms from '../../forms/hooks/useForms'
import { useUser } from '../../users/providers/UserProvider'
import ROUTES from '../../routes/routesModel'
import { Box, Button } from '@mui/material'

function LoginPage() {
  const { handleLogin } = useUsers()
  const { value, ...rest } = useForms( initialSignupForm, signupSchema, handleLogin)
  const { user } = useUser()
  const navigate = useNavigate()

  if (user) return <Navigate replace to={ROUTES.HOME} />

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
      <Button variant="outlined" onClick={() => navigate(ROUTES.SIGNUP)} sx={{ mb: 2 }} color="#737373">הרשמה</Button>
    </Box>
    <Container sx={{ padding: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <UserLoginSignupForm to={ROUTES.HOME} title="התחברות" onSubmit={rest.onSubmit} onReset={rest.handleReset} onFormChange={rest.validateForm} onInputChange={rest.handleChange} setData={rest.setData} errors={value.errors} data={value.data}/>
    </Container>
    </>
  )
}

LoginPage.propTypes = {}

export default LoginPage

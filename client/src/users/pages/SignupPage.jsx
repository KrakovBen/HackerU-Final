import React from 'react'
import PropTypes from 'prop-types'
import Container from '@mui/material/Container'
import UserLoginSignupForm from '../components/UserLoginSignupForm'

function SignupPage() {
  return (
    <Container sx={{ paddingTop: 8, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <UserLoginSignupForm title="טופס הרשמה" onSubmit={()=>{}} onReset={()=>{}} onFormChange={()=>{}} onInputChange={()=>{}} setData={()=>{}} errors={()=>{}} data={()=>{}}/>
    </Container>
  )
}

SignupPage.propTypes = {}

export default SignupPage

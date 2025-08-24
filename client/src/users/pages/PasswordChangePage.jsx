import React from 'react'
import Container from '@mui/material/Container'
import { useUser } from '../../users/providers/UserProvider'

const PasswordChangePage = () => {
    const { user } = useUser()

    return (
        <Container maxWidth={false} sx={{ mx: 'auto', maxWidth: '1600px' }}>
            שינוי סיסמה
        </Container>
    )
}

export default PasswordChangePage
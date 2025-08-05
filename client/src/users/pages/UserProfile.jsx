import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUsers from '../hooks/useUsers'
import { Typography, Container } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import { makeFirstLetterCapital } from '../../utils/algoMethods'
import UserRecipes from './UserRecipes'

const UserProfile = () => {
    const { userID } = useParams()
    const [ userName, setUserName ] = useState(null)
    const { handleGetUser, value: {users: userFromDB} } = useUsers()
    
    useEffect( () => {
        handleGetUser(userID)
    }, [])

    useEffect( () => {
        if (userFromDB && userFromDB.name) {
            const fullName = makeFirstLetterCapital(userFromDB.name.first) + ' ' + makeFirstLetterCapital(userFromDB.name.last)
            setUserName(fullName)
        }
    }, [userFromDB])

    if(!userFromDB) return (
        <Typography>
            אופס. נראה שאין נתונים להצגה.
        </Typography>
    )    

    return (
        <Container maxWidth='1680px' sx={{ mx: 'auto' }}>
            <PageHeader title={userName} subtitle="פרופיל משתמש" />
            <UserRecipes userID={userID} />
        </Container>
    )
}

export default UserProfile
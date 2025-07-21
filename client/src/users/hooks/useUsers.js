import { useCallback, useMemo, useState } from 'react'
import { useUser } from '../providers/UserProvider'
// import { useSnackbar } from '../../providers/SnackbarProvider'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { getUser, setTokenInLocalStorage, removeToken } from '../services/localStorageService'
import ROUTES from '../../routes/routesModel'
import { login, signup, getUser as getUserFromDB } from '../services/usersApiService'

const useUsers = () => {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // const snack = useSnackbar()
    const navigate = useNavigate()
    const { user, setUser, setToken } = useUser()

    useAxios()

    const requestStatus = useCallback( (loading, errorMessage, users, user) => {
        setLoading(loading)
        setUsers(users)
        setUser(user)
        setError(errorMessage)
    }, [setUser] )

    const handleLogin = useCallback( async (user) => {
        try {
            const token = await login(user)
            setTokenInLocalStorage(token)
            setToken(token)
            const userFromLocalStorage = getUser()
            requestStatus(false, null, null, userFromLocalStorage)
            navigate(ROUTES.HOME)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [] )

    const handleSignup = useCallback(
        async (userFromClient) => {
            try {
                console.log(userFromClient);
                
                // const normalizedUser = normalizeUser(userFromClient);
                // await signup(normalizedUser);
                await signup(userFromClient);
                await handleLogin({
                    email: userFromClient.email,
                    password: userFromClient.password,
                });
            } catch (error) {
                requestStatus(false, error, null);
            }
        },
        [requestStatus, handleLogin]
    )

    const handleLogout = useCallback(() => {
        removeToken()
        setUser(null)
    }, [setUser])

    const handleGetUser = useCallback( async (user_id) => {
        try {
            setLoading(true)
            const userFormDB = await getUserFromDB(user_id)
            requestStatus(false, null, userFormDB, user)
            return userFormDB
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus] )

    const value = useMemo(
        () => ({ isLoading, error, user, users }),
        [isLoading, error, user, users]
    )

    return {
        value,
        handleLogin,
        handleLogout,
        handleSignup,
        // handleEdit,
        handleGetUser,
        // handleGetAllUsers,
        // handleDeleteUser,
        // handleBusinessUser
    }
}

export default useUsers

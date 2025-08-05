import { useState, useCallback, useMemo } from 'react'
import { useSnackbar } from '../../providers/SnackbarProvider'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../providers/UserProvider'
import useAxios from '../../hooks/useAxios'
import { removeToken, setTokenInLocalStorage, getUser } from '../services/localStorageService'
import { login, signup, getAllUsers, deleteUser, toggleAdmin } from '../services/usersApiService'
import ROUTES from '../../routes/routesModel'
import normalizeUser from '../helpers/normalization/normalizeUser'

const useUsers = () => {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const snack = useSnackbar()

    const navigate = useNavigate()
    const { user, setUser, setToken } = useUser()

    useAxios()

    const requestStatus = useCallback( (loading, errorMessage, users, user = null) => {
        setLoading(loading)
        setUsers(users)
        setUser(user)
        setError(errorMessage)
    }, [setUser])

    const handleLogin = useCallback( async (user) => {
        try {
            const token = await login(user)
            setTokenInLocalStorage(token)
            setToken(token)
            
            const userFromLocalStorage = getUser()
            requestStatus(false, null, null, userFromLocalStorage)
            navigate(ROUTES.ROOT)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [])

    const handleLogout = useCallback(() => {
        removeToken();
        setUser(null);
    }, [setUser])

    const handleSignup = useCallback( async (userFromClient) => {
        try {
            const normalizedUser = normalizeUser(userFromClient)            
            await signup(normalizedUser)
            await handleLogin({ email: userFromClient.email, password: userFromClient.password })
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus, handleLogin])

    const handleGetAllUsers = useCallback( async () => {
        try {
            setLoading(true)
            const usersFormDB = await getAllUsers()
            requestStatus(false, null, usersFormDB, user)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleDeleteUser = useCallback( async (userId) => {
        try {
            setLoading(true)
            await deleteUser(userId)
            snack("success", "המשתמש נמחק בהצלחה")
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleToggleAdmin = useCallback( async (userId) => {
        try {
            await toggleAdmin(userId)
            snack("success", "המשתמש עודכן בהצלחה")
            requestStatus(false, null, users, user)
        } catch (error) {
            requestStatus(false, error, null)
        }
    } ,[requestStatus, users])

    const value = useMemo( () => (
        { isLoading, error, user, users }
    ), [isLoading, error, user, users])

    return { value, handleLogin, handleLogout, handleSignup, handleGetAllUsers, handleDeleteUser, handleToggleAdmin }
}

export default useUsers
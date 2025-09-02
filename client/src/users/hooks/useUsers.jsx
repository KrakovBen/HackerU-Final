import { useState, useCallback, useEffect, useMemo } from 'react'
import { useSnackbar } from '../../providers/SnackbarProvider'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '../providers/UserProvider'
import useAxios from '../../hooks/useAxios'
import { removeToken, setTokenInLocalStorage, getUser } from '../services/localStorageService'
import { login, verifyOtp, signup, getAllUsers, deleteUser, toggleAdmin, getUser as getUserFromServer, getAllUsersWithRecipes, getUserByEmail, updateUserPassword } from '../services/usersApiService'
import ROUTES from '../../routes/routesModel'
import normalizeUser from '../helpers/normalization/normalizeUser'

const useUsers = () => {
    const [users, setUsers] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [ query, setQuery ] = useState('')
    const [ filteredUsers, setFilterd ] = useState(null)
    const [ searchParams ] = useSearchParams()

    const navigate = useNavigate()
    const snack = useSnackbar()

    const { user, setUser, setToken } = useUser()

    useAxios()

    useEffect( () => {
        setQuery(searchParams.get('q') ?? '')
    }, [searchParams] )

    useEffect( () => {
        if (users && users.length > 0) {
            setFilterd(users.filter(user => user.name.first.includes(query) || user.name.last.includes(query) || user.email?.includes(query.toLocaleLowerCase())))
        }
    }, [users, query] )

    const requestStatus = useCallback( (loading, errorMessage, users, user = null) => {
        setLoading(loading)
        setUsers(users)
        setUser(user)
        setError(errorMessage)
    }, [setUser])

    const handleLogin = useCallback( async (credentials) => {
        try {
            setLoading(true)
            const res = await login(credentials)
            if (!res?.requiresOtp && !res.txId) throw new Error('שם משתמש או סיסמה שגויים.')
            requestStatus(false, null, null)
            return res
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleVerifyOtp = useCallback(async ({ txId, code }) => {
        try {
            setLoading(true)
            const token = await verifyOtp({ txId, code })
            if (!token) throw new Error('אימות נכשל')
            setTokenInLocalStorage(token)
            setToken(token)
            const userFromLocalStorage = getUser()
            requestStatus(false, null, null, userFromLocalStorage)
            return userFromLocalStorage
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus, navigate, setToken])

    const handleLogout = useCallback(() => {
        removeToken();
        setUser(null);
    }, [setUser])

    const handleSignup = useCallback( async (userFromClient) => {
        try {
            const normalizedUser = normalizeUser(userFromClient)            
            await signup(normalizedUser)
            const res = await handleLogin({ email: userFromClient.email, password: userFromClient.password })
            navigate(ROUTES.LOGIN, { state: { startInOtp: true, txId: res.txId } })
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus, handleLogin, navigate])

    const handleGetAllUsers = useCallback( async () => {
        try {
            setLoading(true)
            const usersFormDB = await getAllUsers()
            requestStatus(false, null, usersFormDB, user)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleDeleteUser = useCallback( async (userID) => {
        try {
            setLoading(true)
            await deleteUser(userID)
            snack("success", "המשתמש נמחק בהצלחה")
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleToggleAdmin = useCallback( async (userID) => {
        try {
            await toggleAdmin(userID)
            snack("success", "המשתמש עודכן בהצלחה")
            requestStatus(false, null, users, user)
        } catch (error) {
            requestStatus(false, error, null)
        }
    } ,[requestStatus, users])

    const handleGetUser = useCallback( async (userID) => {
        try {
            setLoading(true)
            const userFormDB = await getUserFromServer(userID)
            requestStatus(false, null, userFormDB, user)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleGetAllUsersWithRecipes = useCallback( async () => {
        try {
            setLoading(true)
            const usersFormDB = await getAllUsersWithRecipes()
            requestStatus(false, null, usersFormDB, user)
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleGetUserByEmail = useCallback( async (email) => {
        try {
            setLoading(true)
            const res = await getUserByEmail(email)
            if (!res?.requiresOtp && !res.txId) throw new Error('שם משתמש או סיסמה שגויים.')
            requestStatus(false, null, null)
            return res
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const handleUpdatePassword = useCallback( async (password, verifyPassword, userId) => {
        try {
            setLoading(true)
            const user = await updateUserPassword(password, verifyPassword, userId)
            requestStatus(false, null, user)
            return user
        } catch (error) {
            requestStatus(false, error, null)
        }
    }, [requestStatus])

    const value = useMemo( () => (
        { isLoading, error, user, users, filteredUsers }
    ), [isLoading, error, user, users, filteredUsers])

    return { value, handleLogin, handleLogout, handleSignup, handleGetAllUsers, handleDeleteUser, handleToggleAdmin, handleGetUser, handleVerifyOtp, handleGetAllUsersWithRecipes, handleGetUserByEmail, handleUpdatePassword }
}

export default useUsers
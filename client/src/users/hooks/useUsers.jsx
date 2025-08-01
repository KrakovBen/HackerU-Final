import { useState, useCallback, useMemo } from 'react'
import { useSnackbar } from '../../providers/SnackbarProvider'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../providers/UserProvider'
import useAxios from '../../hooks/useAxios'
import { removeToken, setTokenInLocalStorage, getUser } from '../services/localStorageService'
import { login } from '../services/usersApiService'
import ROUTES from '../../routes/routesModel'

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

    const value = useMemo( () => (
        { isLoading, error, user, users }
    ), [isLoading, error, user, users])

    return { value, handleLogin, handleLogout }
}

export default useUsers
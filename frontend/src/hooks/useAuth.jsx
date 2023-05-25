import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Hook that provides authentication information for the application.
 * @function useAuth
 * @returns {object} Returns an object containing the current user ID.
 */

const useAuth = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    const handleStorageChange = useCallback(event => event.key === 'userId' && setUserId(event.newValue), [])

    useEffect(() => {
        !userId && navigate('/')
        window.addEventListener('storage', handleStorageChange)

        return () => window.removeEventListener('storage', handleStorageChange)
    }, [userId, navigate, handleStorageChange])

    return { userId }
}

export default useAuth
import { useState, useEffect, useMemo } from 'react'
import extractActivity from '../utils/extractActivity'
import extractAverageSessions from '../utils/extractAverageSessions'
import extractMainData from '../utils/extractMainData'
import extractPerformance from '../utils/extractPerformance'

import PropTypes from 'prop-types'

const BASE_URL = 'http://localhost:3001/user/'
const MOCK_API = '../../SportSee/mock-api/'

const DATA_URL = process.env.NODE_ENV === 'development' ? BASE_URL : MOCK_API
const extension = process.env.NODE_ENV === 'development' ? '' : '.json'

/**
 * Hook that fetches data from the API.
 * @function useFetchData
 * @param {number} userId - The ID of the user.
 * @returns {object} Returns an object containing the fetched data, loading state, and error state.
 * @see {@link https://github.com/alexperronnet/openclassrooms-p12-sportsee-micro-api|API}
 */

const useFetchData = (userId) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const endpoints = useMemo(
        () => ({
            mainData: `${DATA_URL}${userId}${extension}`,
            activity: `${DATA_URL}${userId}/activity${extension}`,
            averageSessions: `${DATA_URL}${userId}/average-sessions${extension}`,
            performance: `${DATA_URL}${userId}/performance${extension}`
        }),
        [userId]
    )
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mainData, activity, averageSessions, performance] = await Promise.all(
                    Object.values(endpoints).map(url => fetch(url).then(response => response.json()))
                )
            
                setData({
                    mainData: extractMainData(mainData),
                    activity: extractActivity(activity),
                    averageSessions: extractAverageSessions(averageSessions),
                    performance: extractPerformance(performance)
                })
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

            const timeoutId = setTimeout(() => {
                fetchData()
            }, 250)
        
            return () => clearTimeout(timeoutId)
    }, [endpoints, userId])
    return { data, loading, error }
}

useFetchData.propTypes = {
    userId: PropTypes.number.isRequired
}

export default useFetchData
import { createContext } from 'react'
import useAuth from '../hooks/useAuth'
import useFetchData from '../hooks/useFetchData'
import PropTypes from 'prop-types'

const DataContext = createContext()

/**
 * Component that provides data to its children via a context API.
 * @function DataProvider
 * @param {object} children - The child elements that need to access the data.
 * @returns {JSX.Element} Returns a context provider that provides data to its children.
 */

const DataProvider = ({ children }) => {
    const { userId } = useAuth()
    const { data, loading, error } = useFetchData(userId)

    return <DataContext.Provider value={{ data, loading, error }}>{children}</DataContext.Provider>
}

/**
 * Component that consumes data provided by the DataProvider component.
 * @constant
 * @type {object}
 */

const DataConsumer = DataContext.Consumer

DataProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export { DataContext, DataConsumer, DataProvider }
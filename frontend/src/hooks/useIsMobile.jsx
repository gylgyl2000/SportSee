import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Hook that detects whether the viewport is mobile or not.
 * @function useIsMobile
 * @param {number} width - The maximum width for mobile view.
 * @returns {object} Returns an object containing a boolean indicating whether the viewport is mobile or not.
 */

const useIsMobile = width => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < width)

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [width])

    return { isMobile }
}

useIsMobile.propTypes = {
    width: PropTypes.number.isRequired
}

export default useIsMobile
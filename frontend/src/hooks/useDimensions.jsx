import { useState, useRef, useLayoutEffect } from 'react'

/**
 * Hook that provides the dimensions of the parent container.
 * @function useDimensions
 * @returns {array} Returns an array containing a reference to the parent element and its dimensions.
 */
const useDimensions = () => {
  const [parentDimensions, setParentDimensions] = useState({ width: 0, height: 0 })
  const parentReference = useRef(null)

  const handleResize = () => {
    const { width, height } = parentReference.current.getBoundingClientRect()
    setParentDimensions({ width, height })
  }

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return [parentReference, parentDimensions]
}

export default useDimensions
import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'

/**
 * Hook that provides a reference to a D3 chart.
 * @function useD3
 * @param {function} renderChartFunction - The function that renders the D3 chart.
 * @param {array} dependencies - The dependencies array for the hook.
 * @returns {object} Returns an object containing a reference to the D3 chart.
 * @see {@link https://d3js.org/|D3}
 * @see {@link https://wattenberger.com/blog/react-and-d3|How to use React and D3 together}
 */

const useD3 = (renderChartFunction, dependencies) => {
    const chartReference = useRef()

    useEffect(() => {
        const chart = d3.select(chartReference.current)

        renderChartFunction(chart)

        return () => chart.selectAll('*').remove()
    }, [renderChartFunction])

    return { chartReference }
}

export default useD3

useD3.propTypes = {
    renderChartFunction: PropTypes.func.isRequired,
    dependencies: PropTypes.arrayOf(PropTypes.any).isRequired

}
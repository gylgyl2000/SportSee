const PerformanceTranslation = {
    1: 'cardio',
    2: 'énergie',
    3: 'endurance',
    4: 'force',
    5: 'vitesse',
    6: 'intensité'
}

/**
 * Extracts and formats the performance data for the application from the provided object.
 * @function extractPerformance
 * @param {object} data - The object containing the performance data for the application.
 * @param {array} data.data - An array of performance data.
 * @param {string} data.data.kind - The type of performance data.
 * @param {number} data.data.value - The value of the performance data.
 * @returns {array} Returns the formatted array of performance data, with the data reversed.
 */
  
const extractPerformance = ({ data: { data: performance } }) => {
    const performanceFormatted = performance.map(({ kind, value }) => ({
        kind: PerformanceTranslation[kind],
        value
    }))
  
    const performanceReverse = performanceFormatted.reverse()
  
    return performanceReverse
}

export default extractPerformance
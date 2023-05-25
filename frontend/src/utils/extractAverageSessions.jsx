const days = {
    1: 'lundi',
    2: 'mardi',
    3: 'mercredi',
    4: 'jeudi',
    5: 'vendredi',
    6: 'samedi',
    7: 'dimanche'
}
  
/**
 * Extracts and transforms activity sessions data into an array of objects containing day names and session lengths.
 * @function extractAverageSessions
 * @param {object} data - The object containing activity session data.
 * @param {array} data.sessions - An array of activity sessions.
 * @returns {array} Returns the transformed array of objects containing day names and session lengths.
 */

const extractAverageSessions = ({ data: { sessions } }) => {
    const averageSessions = sessions.map(({ day, sessionLength }) => ({
        day: days[day],
        sessionLength
    }))

    return averageSessions
}

export default extractAverageSessions
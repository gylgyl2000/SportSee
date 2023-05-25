/**
 * Extracts activity sessions data from the provided object.
 * @function extractActivity
 * @param {object} data - The object containing activity session data.
 * @param {array} data.sessions - An array of activity sessions.
 * @returns {array} Returns the array of activity sessions data.
 */


const extractActivity = ({ data: { sessions } }) => sessions

export default extractActivity
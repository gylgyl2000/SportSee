/**
 * Extracts and formats the main data for the application from the provided object.
 * @function extractMainData
 * @param {object} data - The object containing the main data for the application.
 * @param {number} data.score - The score of the user.
 * @param {number} data.todayScore - The score of the user for the current day.
 * @param {object} data.userInfos - An object containing user information.
 * @param {object} data.keyData - An object containing key data such as calorie count, protein count, carbohydrate count, and lipid count.
 * @param {number} data.keyData.calorieCount - The total calorie count for the user.
 * @param {number} data.keyData.proteinCount - The total protein count for the user.
 * @param {number} data.keyData.carbohydrateCount - The total carbohydrate count for the user.
 * @param {number} data.keyData.lipidCount - The total lipid count for the user.
 * @returns {object} Returns the formatted main data for the application.
 */

const extractMainData = ({ data: mainData }) => {
    const {
        score,
        todayScore,
        userInfos,
        keyData: { calorieCount, proteinCount, carbohydrateCount, lipidCount }
    } = mainData
    // let kCalWithComma = new Intl.NumberFormat('en-US').format(calorieCount)
    const mainDataFormatted = {
        todayScore: score || todayScore,
        userInfos,
        keyData: [
            {
                name: 'calorie',
                displayedName: 'calories',
                value: calorieCount,
                unit: 'kCal'
            },
            {
                name: 'protein',
                displayedName: 'protéines',
                value: proteinCount,
                unit: 'g'
            },
            {
                name: 'carbohydrate',
                displayedName: 'glucides',
                value: carbohydrateCount,
                unit: 'g'
            },
            {
                name: 'lipid',
                displayedName: 'lipides',
                value: lipidCount,
                unit: 'g'
            }
        ]
    }
  
    return mainDataFormatted
}

export default extractMainData
import PropTypes from 'prop-types'
import caloriesIcon from '../../assets/caloriesIcon.png'
import proteinIcon from '../../assets/proteinIcon.png'
import carbsIcon from '../../assets/carbsIcon.png'
import fatIcon from '../../assets/fatIcon.png'

import Count from "../../views/Count";

import style from './style.module.css'

/**
 * Renders a nutrient component.
 * @function Nutrient
 * @param {Object} nutrient - The nutrient data to display.
 * @param {string} nutrient.name - The name of the nutrient.
 * @param {string} nutrient.displayedName - The displayed name of the nutrient.
 * @param {number} nutrient.value - The value of the nutrient.
 * @param {string} nutrient.unit - The unit of the nutrient.
 * @returns {JSX.Element} - The rendered component.
 */

const UserMainData = ({ nutrient }) => {
    return (
        <article className={`${style.nutrient} ${style[nutrient.name]}`}>
            <div className={style.iconWrapper}>
                {nutrient.name === 'calorie' && <img src={caloriesIcon} className={style.icon} alt='' />}
                {nutrient.name === 'protein' && <img src={proteinIcon} className={style.icon} alt='' />}
                {nutrient.name === 'carbohydrate' && <img src={carbsIcon} className={style.icon} alt='' />}
                {nutrient.name === 'lipid' && <img src={fatIcon} className={style.icon} alt='' />}
            </div>
            <div className={style.infos}>
                <h3 className={style.title}><Count key={nutrient.value} number={nutrient.value}/>{nutrient.unit}</h3>
                <p className={style.description}>{nutrient.displayedName}</p>
            </div>
        </article>
    )
}

UserMainData.propTypes = {
    nutrient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        displayedName: PropTypes.string.isRequired
    }).isRequired
}

export default UserMainData;
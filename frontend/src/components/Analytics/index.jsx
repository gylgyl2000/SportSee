import UserActivity from '../UserActivity'
import UserAverageSessions from '../UserAverageSessions'
import UserPerformance from '../UserPerformance'
import UserScore from '../UserScore'
import UserMainData from '../UserMainData'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * Renders an analytics component.
 * @function Analytics
 * @param {Object} data - The data to display.
 * @param {Array} data.activity - The activity data.
 * @param {Array} data.averageSessions - The average sessions data.
 * @param {Array} data.performance - The performance data.
 * @param {Object} data.mainData - The main data.
 * @param {number} data.mainData.todayScore - The score of the current day.
 * @param {Array} data.mainData.keyData - The data of key nutrients.
 * @returns {JSX.Element} - The rendered component.
 */

const Analytics = ({ data }) => {
    const { activity, averageSessions, performance, mainData } = data

    return (
        <AnalyticsSection id='AnalyticsSection'>
            <UserActivity activity={activity} />
            <UserAverageSessions sessions={averageSessions} />
            <UserPerformance performance={performance} />
            <UserScore score={mainData.todayScore} />
            {mainData.keyData.map((nutrient, index) => (
                <UserMainData key={index} nutrient={nutrient} />
            ))}
        </AnalyticsSection>
    )
}

const AnalyticsSection = styled.section`
    @media (min-width: 640px) {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-areas:
        'act act'
        'ses ses'
        'per per'
        'sco sco'
        'cal pro'
        'car lip';
    }
  
    // @media (min-width: 1024px) {
    //   grid-template-areas:
    //     'act act'
    //     'ses ses'
    //     'per sco'
    //     'cal pro'
    //     'car lip';
    // }
  
    @media (min-width: 1024px) {
      grid-template-columns: repeat(12, minmax(0, 1fr));
      grid-template-areas:
        'act act act act act act act act act act act act'
        'ses ses ses ses per per per per sco sco sco sco'
        'cal cal cal pro pro pro car car car lip lip lip';
    }
  
    @media (min-width: 1280px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-template-areas:
        'act act act cal'
        'act act act pro'
        'ses per sco car'
        'ses per sco lip';
    }
  }
  `

Analytics.propTypes = {
    data: PropTypes.object.isRequired
}

export default Analytics
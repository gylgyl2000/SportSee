import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import D3LineChart from '../../views/LineChart'

import { userAverageSessions } from "../../services/API/__index"

const MainDataContainer = styled.div`
    width: 30%;
    // width: 55vw;
    // width: 835px;
    // height: 20vh;
    // height: 35vh;
    // height: 320px;
`

const UserAverageSessions = ({ sessions }) => {
// const UserAverageSessions = ({userId}) => {
//     const [averageSessions, setAverageSessions] = useState(null)
//     useEffect(() => {
//         const fetchData = async () => {
//             const currentUserAverageSessions = await userAverageSessions(userId)
//             setAverageSessions(currentUserAverageSessions)
//         }
//         fetchData()
//     }, [userId]);
//     if (!averageSessions) return null
    // console.log(averageSessions)
    
    return (
        // <MainDataContainer>
            <D3LineChart Data={sessions} />
        // </MainDataContainer>
    )
}

export default UserAverageSessions
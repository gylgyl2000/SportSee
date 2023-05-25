import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import D3RadialChart from '../../views/RadialChart'

import { userScore } from "../../services/API/__index"

const MainDataContainer = styled.div`
    width: 30%;
    // width: 55vw;
    // width: 835px;
    // height: 20vh;
    // height: 35vh;
    // height: 320px;
`

const UserScore = ({ score }) => {

// const UserScore = ({userId}) => {
//     const [score, setScore] = useState(null)
//     useEffect(() => {
//         const fetchData = async () => {
//             const currentUserPerformance = await userScore(userId)
//             setScore(currentUserPerformance)
//         }
//         fetchData()
//     }, [userId]);
//     if (!score) return null
//     console.log(score)
    
    return (
        // <MainDataContainer>
            <D3RadialChart Data={score} />
        // </MainDataContainer>
    )
}

export default UserScore
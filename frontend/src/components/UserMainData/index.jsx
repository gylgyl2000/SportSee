import React from "react";
// import styled from 'styled-components'
import caloriesIcon from '../../assets/caloriesIcon.png'
import proteinIcon from '../../assets/proteinIcon.png'
import carbsIcon from '../../assets/carbsIcon.png'
import fatIcon from '../../assets/fatIcon.png'

import Count from "../../views/Count";

import style from './style.module.css'

const UserMainData = ({ nutrient }) => {
    // let kCalWithComma = new Intl.NumberFormat('en-US').format(calories)
    console.log(nutrient.value)

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
        // <MainDataContainer id='MainDataContainer'>
        //     <DataContainer>
        //         <DataIcon src={caloriesIcon} />
        //         <KeyData>
        //             <DataCount>{kCalWithComma}kCal</DataCount>
        //             <DataName>Calories</DataName>
        //         </KeyData>
        //     </DataContainer>
        //     <DataContainer>
        //         <DataIcon src={proteinIcon} />
        //         <KeyData>
        //             <DataCount>{protein}g</DataCount>
        //             <DataName>Proteines</DataName>
        //         </KeyData>
        //     </DataContainer>
        //     <DataContainer>
        //         <DataIcon src={carbsIcon} />
        //         <KeyData>
        //             <DataCount>{carbohydrate}g</DataCount>
        //             <DataName>Glucides</DataName>
        //         </KeyData>
        //     </DataContainer>
        //     <DataContainer>
        //         <DataIcon src={fatIcon} />
        //         <KeyData>
        //             <DataCount>{lipid}g</DataCount>
        //             <DataName>Lipides</DataName>
        //         </KeyData>
        //     </DataContainer>
        // </MainDataContainer>
    )
}

// const MainDataContainer = styled.div`
//     width: 258px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     height: 65vh;
//     width: 18vw;
//     max-width: 258px;
// `
// const DataContainer = styled.div`
//     width: 18vw
//     max-width: 258px;
//     display: flex;
//     background-color: rgb(220, 224, 219);
//     height: 124px;
//     align-items: center;
//     justify-content: flex-start;
// `
// const DataIcon = styled.img`
//     width: 60px;
//     margin: 0 30px;
// `
// const DataCount = styled.h2`
//     font-size: 20px;
//     font-weight: bold;
//     margin: 0;
// `
// const KeyData = styled.div`
// `
// const DataName = styled.span`
//     font-size: 14px;
// `

export default UserMainData;
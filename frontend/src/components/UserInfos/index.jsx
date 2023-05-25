import styled from 'styled-components'
import colors from '../../style/colors'

/**
 * Renders a user infos section.
 * @function UserInfos
 * @param {Object} props - The component props.
 * @param {string} props.firstName - The user's first name.
 * @returns {JSX.Element} - The rendered component.
 */

const UserInfos = ({ firstName }) => (
    <UserSection id ='UserSection'>
        <UserTitle id='UserTitle'>Bonjour <span>{firstName}</span></UserTitle>
        <UserSubTitle id='UserSubTitle'>Félicitation ! Vous avez explosé vos objectifs hier 👏</UserSubTitle>
    </UserSection>
)

const UserSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 5vh;
`
const UserTitle = styled.h1`
    font-size: 48px;
    font-weight: bold;
    margin: 0;
    & span {
        color: ${colors.red};
    }
`
const UserSubTitle = styled.p`
    @media (min-width: 768px) {
        font-size: 1.125rem;
    }
`

export default UserInfos;
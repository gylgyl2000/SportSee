import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../style/colors'

const userId = {
    "userList":[
        {id: 12, name: 'Karl'},
        {id: 18, name: 'Cecilia'}
    ]
}

/**
 * Component that renders the home page for the application.
 * @function Home
 * @returns {JSX.Element} Returns the Home component.
 */

const Home = () => {
    const navigate = useNavigate()
    
    const handleLogin = id => localStorage.setItem('userId', id) || navigate('/app')

    return (
        <HomeWrapper>
            <HomeContainer>
                    {userId.userList.map(user => (
                        <StyledLink key={`user-${user.id}`} $isFullLink to={`/user/${user.id}`}>
                            <CardTitle onClick={() => handleLogin(user.id)}>{user.name}</CardTitle>
                        </StyledLink>
                    ))}
            </HomeContainer>
        </HomeWrapper>
    );
}

const HomeWrapper = styled.div`
    display: flex;
`
const HomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 90vw;
`
const StyledLink = styled(Link)`
    padding: 10px 15px;
    color: ${colors.primary};
    text-decoration: none;
    font-size: 24px;
    text-align: center;
    ${(props) =>
        props.$isFullLink &&
        `color: white; 
        border-radius: 30px; 
        background-color: ${colors.primary};`}
`
const CardTitle = styled.button`
    color: red;
    font-size: 48px;
    font-weight: bold;
    height: 125px;
    width: 300px;
    border-radius: 50px;
    &:hover {
        cursor: pointer;
    }
`

export default Home;

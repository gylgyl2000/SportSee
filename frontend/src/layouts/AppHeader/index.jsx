import { Link } from 'react-router-dom'
import styled from "styled-components"
import colors from '../../style/colors'
import Logo from '../../assets/logo.png'

const routes = [
    { path: '/SportSee/', label: 'Accueil' },
    { path: '/SportSee/profil', label: 'Profil' },
    { path: '/SportSee/reglage', label: 'Réglage' },
    { path: '/SportSee/communaute', label: 'Communauté' }
]

/**
 * Component that renders the header of the application when the user is logged in.
 * @function AppHeader
 * @returns {JSX.Element} Returns a React element for the header of the application when the user is logged in.
 */

const AppHeader = () => {

    return (
        <Appheader id='Appheader'>
            <HomeLogo src={Logo} />
            <NavHeader>
                {routes.map(({ path, label }) => (
                    <StyledLink key={path} to={path} end="true">
                        {label}
                    </StyledLink>
                ))}
            </NavHeader>
        </Appheader>
    )
}

const Appheader = styled.header`
    grid-area: header;
    display: flex;
    justify-content: start;
    height: 91px;
    width: 100vw;
    margin: 0 auto;
    // padding: 0 60px 0 20px;
    align-items: center;
    font-weight: bold;
    background-color: ${colors.secondary};
`
const HomeLogo = styled.img`
    width: 178px;
    padding-left: 2vw;
`
const NavHeader = styled.nav`
    display: flex;
    justify-content: space-around;
    width: 100%;
`
const StyledLink = styled(Link)`
    padding: 10px 15px;
    color: ${colors.primary};
    text-decoration: none;
    font-size: 24px;
    text-align: center;
    &:hover {
        color: red;
        background-color: white;
        border-radius: 6px;
    }
`

export default AppHeader
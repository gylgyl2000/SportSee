import styled from "styled-components"
import colors from '../../style/colors'
import Logo from '../../assets/logo.png'

/**
 * Component that renders the main header of the application.
 * @function MainHeader
 * @returns {JSX.Element} Returns a React element for the main header of the application.
 */

const MainHeader = () => (
    <Header id='MainHeader'>
        <HomeLogo src={Logo} />
    </Header>
)

const Header = styled.header`
    display: flex;
    justify-content: space-between;
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

export default MainHeader
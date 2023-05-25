import { NavLink } from 'react-router-dom'
import styled from "styled-components"
import colors from '../../style/colors'

import { ReactComponent as Icon1 } from '../../assets/icon1.svg'
import { ReactComponent as Icon2 } from '../../assets/icon2.svg'
import { ReactComponent as Icon3 } from '../../assets/icon3.svg'
import { ReactComponent as Icon4 } from '../../assets/icon4.svg'

/**
 * Component that renders the sidebar of the application.
 * @function AppSidebar
 * @returns {JSX.Element} Returns a React element for the sidebar of the application.
 */

const currentYear = new Date().getFullYear()

const AppSidebar = () => (
    <AsideNavBar id='AsideNavBar'>
        <Navlink key='méditation' to='méditation' end>
            <Icon1 />
        </Navlink>
        <Navlink key='natation' to='natation' end>
            <Icon2 />
        </Navlink>
        <Navlink key='cyclisme' to='cyclisme' end>
            <Icon3 />
        </Navlink>
        <Navlink key='musculation' to='musculation' end>
            <Icon4 />
        </Navlink>
        <NavContainerP>Copyright, SportSee {currentYear}</NavContainerP>
    </AsideNavBar>
)

const AsideNavBar = styled.aside`
    grid-area: sidebar;
    position: relative;
    width: 117px;
    // height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    color: ${colors.neutral300};
    background-color: ${colors.secondary};
    padding: 0;
`
const Navlink = styled(NavLink)`
    width: 64px;
    height: 64px;
    border-radius: 6px;
    display: grid;
    place-items: center;
    margin: 10px 0;
    color: red;
    background-color: white;
    transition: color .25s cubic-bezier(.4,0,.2,1),background-color .25s cubic-bezier(.4,0,.2,1);
    &:hover {
        color: white;
        background-color: red;
    }
`
const NavContainerP = styled.p`
    font-size: 12px;
    font-weight: bold;
    writing-mode: sideways-lr;
    color: ${colors.primary};
    height: 28vh;
    margin-bottom: 50px;
`

export default AppSidebar
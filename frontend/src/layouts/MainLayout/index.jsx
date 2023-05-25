import { Outlet } from 'react-router-dom'
import MainHeader from '../MainHeader'
import styled from 'styled-components'

/**
 * Component that renders the main layout of the application.
 * @function MainLayout
 * @returns {JSX.Element} Returns a React element for the main layout of the application.
 */

const MainLayout = () => (
    <MainLayoutContainer id='MainLayoutContainer'>
        <MainHeader />
            <main>
                <Outlet />
            </main>
    </MainLayoutContainer>
)

const MainLayoutContainer = styled.div`
    @include mix.container(48rem, 2rem);
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;
`

export default MainLayout
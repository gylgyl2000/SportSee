import { Outlet } from 'react-router-dom'
import { DataProvider } from '../../contexts'
import useIsMobile from '../../hooks/useIsMobile'
import AppHeader from '../AppHeader'
import AppHeaderMob from '../AppHeaderMob'
import AppSidebar from '../AppSidebar'
import styled from "styled-components"

/**
 * Component that renders the layout of the application.
 * @function AppLayout
 * @returns {JSX.Element} Returns a React element for the layout of the application.
 */

const AppLayout = () => {
    const { isMobile } = useIsMobile(768)

    return (
        <DataProvider>
            <AppLayoutContainer id='AppLayoutContainer'>
                {isMobile ? <AppHeaderMob /> : <AppHeader />}
                {!isMobile && <AppSidebar />}
                <AppLayoutMain id='AppLayoutMain'>
                    <Outlet />
                </AppLayoutMain>
            </AppLayoutContainer>
        </DataProvider>
    )
}

const AppLayoutContainer = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto repeat(1, minmax(0, 1fr));
    grid-template-areas: 'header' 'main';
  
    @media (min-width: 768px) {
        grid-template-columns: auto repeat(1, minmax(0, 1fr));
        grid-template-areas: 'header header' 'sidebar main';
    }
`
const AppLayoutMain = styled.main`
@media (min-width: 768px) {
    grid-area: main;
    // padding-block: 3rem;
    // @include mix.container(96rem, 2rem);
    max-width: 96rem;
    width: calc(100% - 3rem * 3);
    margin-inline: auto;
    }
  
    //     @include mix.container(96rem, 3rem);
    // @mixin container($max-width, $gutter) {
    //     max-width: $max-width;
    //     width: calc(100% - $gutter * 2);
    //     margin-inline: auto;
    //   }
`

export default AppLayout
import useIsMobile from '../../hooks/useIsMobile'
import Loader from '../../components/Loader'
import ErrorMessage from '../../components/ErrorMessage'
import UserInfos from '../../components/UserInfos'
import Analytics from '../../components/Analytics'

import { DataConsumer } from '../../contexts'

import styled from 'styled-components'

/**
 * Component that renders the dashboard for the application.
 * @function Dashboard
 * @returns {JSX.Element} Returns the Dashboard component.
 */

const Dashboard = () => {
    const { isMobile } = useIsMobile(640)

    return (
        <DataConsumer>
            {({ loading, error, data }) => {
                if (loading) return <Loader />
                if (error) return <ErrorMessage title="Erreur" message="Impossible de charger les données." />

                const { firstName } = data.mainData.userInfos

                return isMobile ? (
                    <ErrorMessage title="Tableau de bord indisponible" message="Vos statistiques ne sont pas disponibles sur mobile." />
                ) : (
                    <DashboardContainer id='DashboardContainer'>
                        <UserInfos firstName={firstName} />
                        <Analytics data={data} />
                    </DashboardContainer>
                )
            }}
        </DataConsumer>
    )
}

const DashboardContainer = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`

export default Dashboard
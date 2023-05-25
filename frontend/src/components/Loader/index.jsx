import iconGear from '../../assets/icon-gear.svg'
import styled from 'styled-components'

/**
 * Component that renders a loader.
 * @function Loader
 * @returns {JSX.Element} Returns a React element representing a loader.
 */

const Loader = () => (
    <LoaderContainer id='LoaderContainer'>
        <IconGear src={iconGear} />
        <LoaderText>Chargement en cours...</LoaderText>
    </LoaderContainer>
)

const LoaderContainer = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    color: var.$color-red;
`
const IconGear = styled.img`
    height: 2.5rem;
    animation: spin 1.5s linear infinite;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`
const LoaderText = styled.h1`
    font-weight: 500;
`

export default Loader
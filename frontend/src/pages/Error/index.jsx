import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import colors from '../../style/colors'

const layoutOptions = {
    main: 'main',
    app: 'app'
}

/**
 * Component that renders the error page for the application.
 * @function Error
 * @param {string} layout - The layout for the error page, either "app" or "main".
 * @returns {JSX.Element} Returns the Error component.
 */

const Error = ({ layout }) => {
    const userId = localStorage.getItem('userId')
    const dashBoard = "/user/" + userId

    return (
        <ErrorSection id='ErrorSection'>
            <ErrorTitle id='ErrorTitle'>404</ErrorTitle>
            <ErrorText id='ErrorText'>La page que vous recherchez n&apos;existe pas ou a été déplacée...</ErrorText>
            <StyledLink id='StyledLink' to={layout === layoutOptions.app ? dashBoard : '/'}>
                {layout === layoutOptions.app ? 'Tableau de bord' : 'Connexion'}
            </StyledLink>
        </ErrorSection>
    )
}

Error.propTypes = {
    layout: PropTypes.oneOf([layoutOptions.main, layoutOptions.app]).isRequired
}

const ErrorSection = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-align: center;
`
const ErrorTitle = styled.h1`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${colors.red};

    @media (min-width: 640px) {
        font-size: 2.25rem;
    }
`
const ErrorText = styled.p`
    @media (min-width: 640px) {
        font-size: 1.125rem;
    }
`
const StyledLink = styled(Link)`
    margin-block-start: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    background-color: ${colors.red};
    color: ${colors.primary};
    font-size: 0.75rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
    @media (min-width: 640px) {
        margin-block-start: 2rem;
        font-size: 0.875rem;
    }
    & :hover {
        background-color: darken(${colors.red}, 10%);
    }
`

export default Error
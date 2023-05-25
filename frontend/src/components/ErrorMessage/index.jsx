import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * Component that renders an error message.
 * @function ErrorMessage
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the error message.
 * @param {string} props.message - The content of the error message.
 * @returns {JSX.Element} Returns a React element for an error message.
 */

const ErrorMessage = ({ title, message }) => (
    <ErrorMessageContainer id='ErrorMessageContainer'>
        <ErrorMessageTitle>{title}</ErrorMessageTitle>
        <p>{message}</p>
    </ErrorMessageContainer>
)

ErrorMessage.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

const ErrorMessageContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem 2rem;
    color: var.$color-red;
    background-color: rgba(var.$color-red, 0.1);
    border-radius: var.$rounded-sm;
`
const ErrorMessageTitle =styled.h2`
    font-size: var.$text-lg;
    font-weight: var.$font-bold;
`

export default ErrorMessage
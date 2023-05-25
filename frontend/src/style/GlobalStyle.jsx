import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Roboto', Helvetica, sans-serif;
    }

    body, #root {
        background-color: 'white';
        margin: 0 auto;
        // max-width: 1440px;
        min-width: 1024px;
        max-height: 100vh;
        height: 100vh;
    }
`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle
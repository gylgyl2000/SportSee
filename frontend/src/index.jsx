import React from 'react'
import { BrowserRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import GlobalStyle from './style/GlobalStyle'
import Router from './routes/Router'

const root = ReactDOM.createRoot(document.getElementById('root'))

/**
 * Renders the application to the DOM.
 * @function render
 * @returns {void}
 */

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalStyle />
            <Router />
        </BrowserRouter>
    </React.StrictMode>
)
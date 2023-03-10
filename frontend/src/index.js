import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Auth0ProviderWithHistory } from './components/Auth0ProviderWithHistory'

import { createTheme, ThemeProvider } from "@mui/material/styles"

import App from './App';

import { theme as fromConfigTheme } from '../config'
const theme = createTheme(fromConfigTheme)

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>
  , document.getElementById('app')
);


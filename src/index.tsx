import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import AuthContextProvider from './utils/context'
import './utils/language'
import LanguageContextProvider from './utils/language/LanguageContextProvider'
import PartnerDetailsContextProvider from './utils/context/partner/PartnerContextProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <LanguageContextProvider>
    <AuthContextProvider>
      <PartnerDetailsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PartnerDetailsContextProvider>
    </AuthContextProvider>
  </LanguageContextProvider>
)

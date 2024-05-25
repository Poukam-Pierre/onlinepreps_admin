import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import './utils/language'
import LanguageContextProvider from './utils/language/LanguageContextProvider'
import PartnerDetailsContextProvider from './utils/context/partners/PartnerContextProvider'
import AuthContextProvider from './utils/context/login/LoginContextProvider'
import EmployesDetailsContextProvider from './utils/context/employes/EmployesContextProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <LanguageContextProvider>
    <AuthContextProvider>
      <PartnerDetailsContextProvider>
        <EmployesDetailsContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </EmployesDetailsContextProvider>
      </PartnerDetailsContextProvider>
    </AuthContextProvider>
  </LanguageContextProvider>
)

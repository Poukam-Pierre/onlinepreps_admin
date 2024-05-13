import { createContext } from 'react'

import { Language } from './language.interface'

const LanguageContext = createContext<Language>({
  activeLanguage: 'en-US',
  languageDispatch: () => null,
})

export default LanguageContext

import React from 'react'

export type LanguageType = 'en' | 'fr' | string
export type CountryCodeType = 'gb' | 'fr'
export type LabelType = 'Français' | 'Anglais' | 'Frensh' | 'English'

export interface LanguageInfos {
  code: LanguageType
  label: LabelType
  country_code: CountryCodeType
}

export type Action = { type: 'USE_ENGLISH' } | { type: 'USE_FRENSH' }

export interface Language {
  activeLanguage: LanguageType
  languageDispatch: React.Dispatch<Action>
}

export type State = Language

export interface LanguageContextProviderProps {
  children: JSX.Element
}

export interface testCategoryStat {
  [key: string]: string | number
  category: string
  value: number
}
export interface partnersDetails {
  name: string
  uniqueId?: string
  total: number
  testCategory: testCategoryStat[]
}
export interface partnersDetailsType {
  partnersData: partnersDetails[]
  isLoading: boolean
}

export interface PartnersDetails {
  partnersDetails: partnersDetailsType
  partnersDispatch: React.Dispatch<partnersDetails[]>
}
export type State = PartnersDetails

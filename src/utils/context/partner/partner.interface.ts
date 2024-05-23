export interface LanguageContextProviderProps {
  children: JSX.Element
}

interface testCategoryStat {
  [key: string]: string | number
  category: string
  value: number
}
export interface partnersDetailsType {
  name: string
  uniqueId?: string
  total: number
  testCategory: testCategoryStat[]
}

export type Payload = partnersDetailsType[]

export interface PartnersDetails {
  partnersDetails: partnersDetailsType[]
  partnersDispatch: React.Dispatch<partnersDetailsType[]>
}
export type State = PartnersDetails

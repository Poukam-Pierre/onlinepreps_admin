export interface EmployeContextProvider {
  children: JSX.Element
}

interface testCategoryStat {
  [key: string]: string | number
  category: string
  value: number
}

export interface employesDetails {
  name: string
  poste: string
  total: number
  testCategory: testCategoryStat[]
}

interface EmployesDetailsType {
  employesData: employesDetails[]
  isLoading: boolean
}
export interface EmployesDetails {
  employesDetails: EmployesDetailsType
  employesDispatch: React.Dispatch<employesDetails[]>
}
export type State = EmployesDetails

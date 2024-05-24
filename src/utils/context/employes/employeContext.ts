import { createContext } from 'react'
import { EmployesDetails } from './employes.interface'

export const EmployesDetailsContext = createContext<EmployesDetails>({
  employesDetails: {
    employesData: [
      {
        name: '',
        total: 0,
        testCategory: [],
      },
    ],
    isLoading: true,
  },
  employesDispatch: () => null,
})

export default EmployesDetailsContext

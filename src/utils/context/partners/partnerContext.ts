import { createContext } from 'react'
import { PartnersDetails } from './partner.interface'

export const PartnersDetailsContext = createContext<PartnersDetails>({
  partnersDetails: {
    partnersData: [
      {
        name: '',
        uniqueId: '',
        total: 0,
        testCategory: [],
      },
    ],
    isLoading: true,
  },
  partnersDispatch: () => null,
})

export default PartnersDetailsContext

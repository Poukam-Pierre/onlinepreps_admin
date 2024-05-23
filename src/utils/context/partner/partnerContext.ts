import { createContext } from 'react'
import { PartnersDetails } from './partner.interface'

export const PartnersDetailsContext = createContext<PartnersDetails>({
  partnersDetails: [
    {
      name: '',
      uniqueId: '',
      total: 0,
      testCategory: [],
    },
  ],
  partnersDispatch: () => null,
})

export default PartnersDetailsContext
